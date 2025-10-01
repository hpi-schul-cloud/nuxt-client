import AuthModule from "./auth";
import * as serverApi from "@/serverApi/v3/api";
import { LanguageType } from "@/serverApi/v3/api";
import { initializeAxios } from "@/utils/api";
import { createTestEnvStore, meResponseFactory, mockApiResponse } from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { AxiosError, AxiosInstance } from "axios";
import { beforeAll, MockInstance } from "vitest";

vi.useFakeTimers();

describe("auth store module", () => {
	let consoleErrorSpy: MockInstance;
	let meApi: DeepMocked<serverApi.MeApiInterface>;

	beforeAll(() => {
		meApi = createMock<serverApi.MeApiInterface>();
		vi.spyOn(serverApi, "MeApiFactory").mockReturnValue(meApi);
	});

	beforeEach(() => {
		consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
	});

	afterEach(() => {
		consoleErrorSpy.mockRestore();
	});

	describe("mutations", () => {
		describe("setMe", () => {
			it("should set the me and locale state", () => {
				const authModule = new AuthModule({});
				const mockMe = meResponseFactory.build({ language: LanguageType.Es });
				expect(authModule.getMe).not.toStrictEqual(mockMe);

				authModule.setMe(mockMe);

				expect(authModule.getMe).toStrictEqual(mockMe);
				expect(authModule.getLocale).toStrictEqual(LanguageType.Es);
			});
		});

		describe("setLocale", () => {
			it("should set the locale state", () => {
				const authModule = new AuthModule({});
				const localeMock = LanguageType.Uk;

				authModule.setLocale(localeMock);

				expect(authModule.getLocale).toStrictEqual(localeMock);
			});
		});

		describe("addUserPermission", () => {
			it("should add the permission to the me state", () => {
				const authModule = new AuthModule({});
				const permissionToBeAdded = "permission_z";
				const mockMe = meResponseFactory.build();
				authModule.setMe(mockMe);

				authModule.addUserPermission(permissionToBeAdded);

				expect(authModule.getUserPermissions).toContain(permissionToBeAdded);
			});
		});

		describe("clearAuthData", () => {
			it("should clear the auth state", () => {
				const authModule = new AuthModule({});
				const mockMe = meResponseFactory.build();
				authModule.setMe(mockMe);
				authModule.setLoggedIn(true);

				authModule.clearAuthData();

				expect(authModule.getMe).toBeUndefined();
				expect(authModule.isLoggedIn).toBe(false);
			});
		});

		describe("setStatus", () => {
			it("should set the status state", () => {
				const authModule = new AuthModule({});
				const statusMock = "pending";

				authModule.setStatus(statusMock);

				expect(authModule.status).toBe(statusMock);
			});
		});

		describe("setBusinessError", () => {
			it("should set the businessError state", () => {
				const authModule = new AuthModule({});
				const businessErrorMock = {
					statusCode: "418",
					message: "I'm a teapot",
				};

				authModule.setBusinessError(businessErrorMock);

				expect(authModule.businessError).toBe(businessErrorMock);
			});
		});

		describe("resetBusinessError", () => {
			it("should reset the businessError state", () => {
				const authModule = new AuthModule({});
				const businessErrorMock = {
					statusCode: "418",
					message: "I'm a teapot",
				};
				const defaultBusinessErrorMock = {
					statusCode: "",
					message: "",
				};
				authModule.setBusinessError(businessErrorMock);
				expect(authModule.businessError).toBe(businessErrorMock);

				authModule.resetBusinessError();

				expect(authModule.businessError.statusCode).toBe(defaultBusinessErrorMock.statusCode);
				expect(authModule.businessError.message).toBe(defaultBusinessErrorMock.message);
			});
		});
	});

	describe("getters", () => {
		describe("getMe", () => {
			it("should return the me state", () => {
				const authModule = new AuthModule({});
				const mockMe = meResponseFactory.build();
				authModule.setMe(mockMe);

				expect(authModule.getMe).toStrictEqual(mockMe);
			});
		});

		describe("getLocale", () => {
			it("should return the set locale", () => {
				const authModule = new AuthModule({});
				const localeMock = LanguageType.Uk;
				authModule.locale = localeMock;

				expect(authModule.getLocale).toBe(localeMock);
			});

			it("should return the default language if locale is not set", () => {
				createTestEnvStore({ I18N__DEFAULT_LANGUAGE: LanguageType.Uk });
				const authModule = new AuthModule({});
				authModule.locale = "" as LanguageType;

				expect(authModule.getLocale).toBe(LanguageType.Uk);
			});

			it("should return the fallback language if neither locale nor default language are set", () => {
				const authModule = new AuthModule({});
				authModule.locale = "" as LanguageType;
				createTestEnvStore({ I18N__DEFAULT_LANGUAGE: "" as LanguageType });

				expect(authModule.getLocale).toBe("de");
			});
		});

		describe("getSchool", () => {
			it("should return the school state", () => {
				const authModule = new AuthModule({});
				const mockMe = meResponseFactory.build({
					school: { id: "test-school-id", name: "test school" },
				});
				authModule.setMe(mockMe);

				expect(authModule.getSchool?.id).toStrictEqual("test-school-id");
				expect(authModule.getSchool?.name).toStrictEqual("test school");
			});
		});

		describe("getUserRoles", () => {
			it("should return the userRoles state", () => {
				const authModule = new AuthModule({});
				const mockMe = meResponseFactory.build({
					roles: [{ id: "", name: "test-role" }],
				});
				authModule.setMe(mockMe);

				expect(authModule.getUserRoles).toStrictEqual(["test-role"]);
			});
		});

		describe("getUserPermissions", () => {
			it("should return the userPermissions state", () => {
				const authModule = new AuthModule({});
				const mockMe = meResponseFactory.build({
					permissions: ["test-permission"],
				});
				authModule.setMe(mockMe);

				expect(authModule.getUserPermissions).toStrictEqual(["test-permission"]);
			});
		});

		describe("isLoggedIn", () => {
			it("should return true if accessToken is set", () => {
				const authModule = new AuthModule({});
				expect(authModule.isLoggedIn).toBe(false);
				authModule.setLoggedIn(true);

				expect(authModule.isLoggedIn).toBe(true);
			});
		});

		describe("loginSystem", () => {
			it("should system info of the user", () => {
				const authModule = new AuthModule({});

				const mockMe = meResponseFactory.build({
					systemId: "test-system-id",
				});
				authModule.setMe(mockMe);

				expect(authModule.loginSystem).toStrictEqual("test-system-id");
			});
		});
	});

	describe("actions", () => {
		beforeAll(() => {
			setupStores(); // Kept until other modules are als migrated to pinia
			createTestEnvStore({
				FEATURE_EXTENSIONS_ENABLED: true,
				FEATURE_TEAMS_ENABLED: true,
			});
		});

		describe("login", () => {
			it("should set the me state", async () => {
				const languageMock = LanguageType.Uk;
				const mockMe = meResponseFactory.build({
					user: { id: "test-id" },
					language: languageMock,
				});
				meApi.meControllerMe.mockResolvedValueOnce(mockApiResponse({ data: mockMe }));
				const authModule = new AuthModule({});

				await authModule.login();

				expect(authModule.getLocale).toStrictEqual(languageMock);
				expect(authModule.getUserPermissions).toStrictEqual(["addons_enabled", "teams_enabled"]);
				expect(authModule.getUser?.id).toStrictEqual("test-id");
			});
		});

		describe("updateUserLanguage", () => {
			afterEach(() => {
				vi.clearAllMocks();
			});

			it("should call backend succesfully", () => {
				const mockApi = {
					userControllerChangeLanguage: vi.fn().mockReturnValue({
						data: { successful: true },
					}),
				};
				vi.spyOn(serverApi, "UserApiFactory").mockReturnValue(mockApi as unknown as serverApi.UserApiInterface);
				const authModule = new AuthModule({});

				authModule.updateUserLanguage(LanguageType.De);

				expect(mockApi.userControllerChangeLanguage).toHaveBeenCalled();
			});

			it("should catch error", () => {
				const mockApi = {
					userControllerChangeLanguage: vi.fn().mockImplementation(() => {
						throw new AxiosError("I'm an error");
					}),
				};
				vi.spyOn(serverApi, "UserApiFactory").mockReturnValue(mockApi as unknown as serverApi.UserApiInterface);
				const authModule = new AuthModule({});

				authModule.updateUserLanguage(LanguageType.De);

				expect(authModule.businessError.message).toStrictEqual("I'm an error");
			});
		});

		describe("logout", () => {
			const setup = () => {
				initializeAxios({
					defaults: {
						headers: {
							common: {
								Authorization: "",
							},
						},
					},
				} as AxiosInstance);

				const authModule = new AuthModule({});

				const mockReplace = vi.fn();
				Object.defineProperty(window, "location", {
					configurable: true,
					value: { replace: mockReplace },
				});

				return { authModule, mockReplace };
			};

			describe("when logout action is called", () => {
				it("should replace the window.location", () => {
					const { authModule, mockReplace } = setup();

					authModule.logout();
					expect(mockReplace).toHaveBeenLastCalledWith("/logout");

					authModule.logout("/to_another_path");
					expect(mockReplace).toHaveBeenLastCalledWith("/to_another_path");
				});
			});
		});

		describe("externalLogout", () => {
			const setup = () => {
				initializeAxios({
					defaults: {
						headers: {
							common: {
								Authorization: "",
							},
						},
					},
				} as AxiosInstance);

				const authModule = new AuthModule({});

				const mockReplace = vi.fn();
				Object.defineProperty(window, "location", {
					configurable: true,
					value: { replace: mockReplace },
				});

				return { authModule, mockReplace };
			};

			describe("when external logout action is called", () => {
				it("should replace the window.location", () => {
					const { authModule, mockReplace } = setup();

					authModule.externalLogout();
					expect(mockReplace).toHaveBeenLastCalledWith("/logout/external");
				});
			});
		});
	});
});
