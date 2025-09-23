import { beforeEach, describe, expect, vi } from "vitest";
import { setActivePinia } from "pinia";
import { useAppStore } from "./Application.store";
import {
	LanguageType,
	MeApiFactory,
	MeResponse,
	Permission,
	RoleName,
	SuccessfulResponse,
	UserApiFactory,
} from "@/serverApi/v3";
import { createTestingPinia } from "@pinia/testing";
import { AxiosInstance, AxiosPromise } from "axios";
import { meResponseFactory, mockApiResponse } from "@@/tests/test-utils";
import { DeepPartial } from "fishery";
import { initializeAxios } from "@/utils/api";
import { logger } from "@util-logger";

vi.mock("@/serverApi/v3");
const mockedMeApi = vi.mocked(MeApiFactory);

vi.mock("@/fileStorageApi/v3");
const mockedUserApi = vi.mocked(UserApiFactory);

describe("useApplicationStore", () => {
	const doMockMeApiData = (data: MeResponse) => {
		mockedMeApi.mockReturnValue({
			meControllerMe(): AxiosPromise<MeResponse> {
				return Promise.resolve(mockApiResponse({ data }));
			},
		});
	};

	const doMockUserApiData = (data: SuccessfulResponse) => {
		const mockChangeLanguage = vi
			.fn()
			.mockResolvedValue(mockApiResponse({ data }));

		mockedUserApi.mockReturnValue({
			userControllerChangeLanguage: mockChangeLanguage,
		});

		return { mockChangeLanguage };
	};

	const setup = async (meResponseData?: DeepPartial<MeResponse>) => {
		const meResponse = meResponseFactory.build(meResponseData);
		doMockMeApiData(meResponse);
		await useAppStore().login();
		return { meResponse };
	};

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
	});

	describe("state", () => {
		it("should return default locale when no user locale is set", () => {
			expect(useAppStore().locale).toBe(LanguageType.De);
		});

		it("should return false for role checks initially", () => {
			expect(useAppStore().isTeacher).toBe(false);
			expect(useAppStore().isStudent).toBe(false);
			expect(useAppStore().isExpert).toBe(false);
		});

		it("should return correct computed from meResponse", async () => {
			const { meResponse } = await setup({
				user: { id: "test-user-id", firstName: "Test" },
				school: { id: "school-123", name: "Test School" },
				roles: [
					{ id: "1", name: RoleName.Teacher },
					{ id: "2", name: RoleName.Superhero },
				],
				permissions: [Permission.CourseCreate, Permission.HomeworkCreate],
				systemId: "system-super-hero",
			});

			expect(useAppStore().user).toStrictEqual(meResponse.user);
			expect(useAppStore().school).toEqual(meResponse.school);
			expect(useAppStore().userRoles).toEqual([
				RoleName.Teacher,
				RoleName.Superhero,
			]);
			expect(useAppStore().userPermissions).toEqual([
				Permission.CourseCreate,
				Permission.HomeworkCreate,
			]);
			expect(useAppStore().systemId).toEqual("system-super-hero");
		});

		describe("role checks", () => {
			it("should correctly identify teacher role", async () => {
				await setup({ roles: [{ id: "any", name: RoleName.Teacher }] });

				expect(useAppStore().isTeacher).toBe(true);
				expect(useAppStore().isStudent).toBe(false);
				expect(useAppStore().isExpert).toBe(false);
			});

			it("should correctly identify teacher role", async () => {
				await setup({ roles: [{ id: "any", name: RoleName.Student }] });

				expect(useAppStore().isTeacher).toBe(false);
				expect(useAppStore().isStudent).toBe(true);
				expect(useAppStore().isExpert).toBe(false);
			});

			it("should correctly identify expert role", async () => {
				await setup({
					roles: [
						{ id: "any", name: RoleName.Expert },
						{ id: "any", name: RoleName.Teacher },
					],
				});

				expect(useAppStore().isTeacher).toBe(true);
				expect(useAppStore().isStudent).toBe(false);
				expect(useAppStore().isExpert).toBe(true);
			});
		});
	});

	describe("hasPermission helper", () => {
		it("should return computed that checks if user has specific permission", () => {
			const hasSchoolEdit = useAppStore().hasPermission(Permission.SchoolEdit);
			const hasUserUpdate = useAppStore().hasPermission(Permission.UserUpdate);

			expect(hasSchoolEdit.value).toBe(false);
			expect(hasUserUpdate.value).toBe(false);

			useAppStore().$patch({
				meResponse: {
					permissions: [Permission.SchoolEdit, Permission.UserCreate],
				},
			});

			expect(hasSchoolEdit.value).toBe(true);
			expect(hasUserUpdate.value).toBe(false);
		});
	});

	describe("login action", () => {
		it("should successfully login and update store state", async () => {
			await setup({ language: LanguageType.Es });

			expect(useAppStore().isLoggedIn).toBe(true);
			expect(useAppStore().locale).toBe(LanguageType.Es);
		});

		it("should not log in on api error", async () => {
			mockedMeApi.mockReturnValue({
				meControllerMe: vi
					.fn()
					.mockRejectedValue(new Error("Me data not available.")),
			});

			try {
				await useAppStore().login();
			} catch {
				expect(useAppStore().isLoggedIn).toBe(false);
			}
		});
	});

	describe("logout action", () => {
		it("should logout with default redirect URL", () => {
			initializeAxios({
				defaults: {
					headers: {
						common: {
							Authorization: "",
						},
					},
				},
			} as AxiosInstance);

			Object.defineProperty(window, "location", {
				value: { replace: vi.fn() },
			});

			useAppStore().logout("/logout-to");
			expect(window.location.replace).toHaveBeenCalledWith("/logout-to");
		});
	});

	describe("updateUserLanguage action", () => {
		it("should successfully update user language", async () => {
			const { mockChangeLanguage } = doMockUserApiData({ successful: true });
			await useAppStore().updateUserLanguage(LanguageType.Es);
			expect(mockChangeLanguage).toHaveBeenCalled();
			expect(useAppStore().locale).toBe(LanguageType.Es);
		});

		it("should not update locale when API returns unsuccessful", async () => {
			doMockUserApiData({ successful: false });
			await useAppStore().updateUserLanguage(LanguageType.Es);
			expect(useAppStore().locale).toEqual(LanguageType.De);
		});

		it("should handle API error and log it", async () => {
			const error = new Error("Cannot change user language.");
			mockedUserApi.mockReturnValue({
				userControllerChangeLanguage: vi.fn().mockRejectedValue(error),
			});

			logger.error = vi.fn();

			await useAppStore().updateUserLanguage(LanguageType.Es);

			expect(logger.error).toHaveBeenCalledWith(error);
			expect(useAppStore().locale).toEqual(LanguageType.De);
		});
	});
});
