import { useAppStore } from "./application.store";
import {
	LanguageType,
	MeApiFactory,
	MeResponse,
	Permission,
	RoleName,
	SuccessfulResponse,
	UserApiFactory,
} from "@/serverApi/v3";
import { ApplicationError } from "@/store/types/application-error";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { initializeAxios } from "@/utils/api";
import { meResponseFactory, mockApiResponse } from "@@/tests/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { logger } from "@util-logger";
import { AxiosInstance, AxiosPromise } from "axios";
import { DeepPartial } from "fishery";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, vi } from "vitest";

const mockBroadcastChannel = {
	post: vi.fn(),
	close: vi.fn(),
	data: { value: null as string | null },
};

vi.mock("@vueuse/core", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@vueuse/core")>();
	return {
		...actual,
		useBroadcastChannel: vi.fn(() => mockBroadcastChannel),
	};
});

vi.mock("@/serverApi/v3");
const mockedMeApi = vi.mocked(MeApiFactory);

vi.mock("@/fileStorageApi/v3");
const mockedUserApi = vi.mocked(UserApiFactory);

describe("useApplicationStore", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({ createSpy: vi.fn }));
		vi.clearAllMocks();

		mockBroadcastChannel.data.value = null;

		Object.defineProperty(window, "location", {
			value: { replace: vi.fn() },
			writable: true,
		});

		Object.defineProperty(window, "localStorage", {
			value: { clear: vi.fn() },
			writable: true,
		});

		Object.defineProperty(document, "cookie", {
			set: vi.fn(),
			configurable: true,
		});
	});

	const doMockMeApiData = (data: MeResponse) => {
		mockedMeApi.mockReturnValue({
			meControllerMe(): AxiosPromise<MeResponse> {
				return Promise.resolve(mockApiResponse({ data }));
			},
		});
	};

	const doMockUserApiData = (data: SuccessfulResponse) => {
		const mockChangeLanguage = vi.fn().mockResolvedValue(mockApiResponse({ data }));

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
			expect(useAppStore().isExternalPerson).toBe(false);
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
			expect(useAppStore().userRoles).toEqual([RoleName.Teacher, RoleName.Superhero]);
			expect(useAppStore().userPermissions).toEqual([Permission.CourseCreate, Permission.HomeworkCreate]);
			expect(useAppStore().systemId).toEqual("system-super-hero");
		});

		describe("role checks", () => {
			it("should correctly identify teacher role", async () => {
				await setup({ roles: [{ id: "any", name: RoleName.Teacher }] });

				expect(useAppStore().isTeacher).toBe(true);
				expect(useAppStore().isStudent).toBe(false);
				expect(useAppStore().isExternalPerson).toBe(false);
			});

			it("should correctly identify student role", async () => {
				await setup({ roles: [{ id: "any", name: RoleName.Student }] });

				expect(useAppStore().isTeacher).toBe(false);
				expect(useAppStore().isStudent).toBe(true);
				expect(useAppStore().isExternalPerson).toBe(false);
			});

			it("should correctly identify external person role", async () => {
				await setup({
					roles: [
						{ id: "any", name: RoleName.ExternalPerson },
						{ id: "any", name: RoleName.Teacher },
					],
				});

				expect(useAppStore().isTeacher).toBe(true);
				expect(useAppStore().isStudent).toBe(false);
				expect(useAppStore().isExternalPerson).toBe(true);
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
			const store = useAppStore();

			mockedMeApi.mockReturnValue({
				meControllerMe: vi.fn().mockRejectedValue(new Error("Me data not available.")),
			});

			expect(store.isLoggedIn).toBe(false);

			try {
				await store.login();
			} catch {
				expect(store.isLoggedIn).toBe(false);
			}
		});
	});

	describe("logout action", () => {
		beforeEach(() => {
			initializeAxios({
				defaults: {
					headers: {
						common: {
							Authorization: "",
						},
					},
				},
			} as AxiosInstance);
		});

		it("should redirect to default logout URL", () => {
			Object.defineProperty(window, "location", {
				value: { replace: vi.fn() },
			});

			useAppStore().logout();
			expect(window.location.replace).toHaveBeenCalledWith("/logout");
		});

		it("should redirect to custom logout URL", () => {
			Object.defineProperty(window, "location", {
				value: { replace: vi.fn() },
			});

			useAppStore().logout("/logout-to");
			expect(window.location.replace).toHaveBeenCalledWith("/logout-to");
		});

		it("should post logout message to broadcast channel", () => {
			useAppStore().logout();

			expect(mockBroadcastChannel.post).toHaveBeenCalledWith("logout");
		});

		it("should clean up to ensure garbage collection pristine storage", () => {
			useAppStore().logout();

			expect(mockBroadcastChannel.close).toHaveBeenCalled();
			expect(localStorage.clear).toHaveBeenCalled();
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

	describe("handleApplicationError", () => {
		it("handles known status codes", () => {
			const store = useAppStore();

			store.handleApplicationError(HttpStatusCode.BadRequest);
			expect(store.applicationError?.translationKeyOrText).toBe("error.400");

			store.handleApplicationError(HttpStatusCode.InternalServerError);
			expect(store.applicationError?.translationKeyOrText).toBe("error.generic");
		});

		it.each([
			[HttpStatusCode.Unauthorized, "error.401"],
			[HttpStatusCode.Forbidden, "error.403"],
			[HttpStatusCode.NotFound, "error.404"],
			[HttpStatusCode.RequestTimeout, "error.408"],
		])("handles status code %s and returns translation key %s", (statusCode, expectedTranslationKey) => {
			const store = useAppStore();

			store.handleApplicationError(statusCode);

			expect(store.applicationError?.translationKeyOrText).toBe(expectedTranslationKey);
		});

		it("puts unknown error codes to generic", () => {
			useAppStore().handleApplicationError(999 as HttpStatusCode);
			expect(useAppStore().applicationError).toEqual({ status: 999, translationKeyOrText: "error.generic" });
		});

		it("overwrites error text messages when given", () => {
			useAppStore().handleApplicationError(HttpStatusCode.BadRequest, "custom.key");
			expect(useAppStore().applicationError).toEqual({
				status: HttpStatusCode.BadRequest,
				translationKeyOrText: "custom.key",
			});
		});
	});

	describe("handleUnknownError", () => {
		it("handles ApplicationError error objects", () => {
			const error: ApplicationError = {
				name: "ApplicationError",
				statusCode: HttpStatusCode.Forbidden,
				translationKey: "error.403",
				message: "",
			};
			useAppStore().handleUnknownError(error);
			expect(useAppStore().applicationError).toEqual({
				status: HttpStatusCode.Forbidden,
				translationKeyOrText: "error.403",
			});
		});

		it("puts generic error for unknown errors", () => {
			useAppStore().handleUnknownError(new Error("any error"));
			expect(useAppStore().applicationError).toEqual({
				status: HttpStatusCode.InternalServerError,
				translationKeyOrText: "error.generic",
			});
		});
	});

	describe("Broadcast Channel", () => {
		describe("when receiving logout message", () => {
			it("should set isJwtExpired to true", async () => {
				const store = useAppStore();
				expect(store.isJwtExpired).toBe(false);

				// Difficult to test without mocking the entire BroadcastChannel implementation
				mockBroadcastChannel.data.value = "logout";
				store.setJwtExpired();

				expect(store.isJwtExpired).toBe(true);
			});

			it("should handle non-logout broadcast messages", async () => {
				const store = useAppStore();
				expect(store.isJwtExpired).toBe(false);

				// Simulate broadcast channel receiving other message
				mockBroadcastChannel.data.value = "other-message";

				expect(store.isJwtExpired).toBe(false);
			});
		});
	});
});
