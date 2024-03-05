import * as serverApi from "@/serverApi/v3/api";
import { envConfigModule } from "@/store";
import { initializeAxios } from "@/utils/api";
import { mockApiResponse } from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { AxiosError, AxiosInstance } from "axios";
import AuthModule from "./auth";
import EnvConfigModule from "./env-config";
import { Envs } from "./types/env-config";

jest.useFakeTimers();

// We create a new mock object for each test here, because using the mockMe object from test utils lead to a problem.
// When passing the mockMe object to a test, you pass it by reference (even if you spread it, you only get a shallow copy).
// If you then change the mockMe object in one test (i.e. here the addPermission test), it will also be changed in subsequent tests.
const setupMockMe = ({
	user = {
		id: "",
		firstName: "",
		lastName: "",
		customAvatarBackgroundColor: "",
	},
	school = {
		id: "",
		name: "",
		logo: {
			url: "",
			name: "",
		},
	},
	roles = [],
	permissions = [],
	language = "",
	account = {
		id: "",
	},
}: Partial<serverApi.MeResponse>) => {
	const mockMe = {
		user,
		school,
		roles,
		permissions,
		language,
		account,
	};

	return mockMe;
};

describe("auth store module", () => {
	let consoleErrorSpy: any;
	let meApi: DeepMocked<serverApi.MeApiInterface>;

	beforeAll(() => {
		meApi = createMock<serverApi.MeApiInterface>();
		jest.spyOn(serverApi, "MeApiFactory").mockReturnValue(meApi);
	});

	beforeEach(() => {
		consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
	});

	afterEach(() => {
		consoleErrorSpy.mockRestore();
	});

	describe("mutations", () => {
		describe("setMe", () => {
			it("should set the me state", () => {
				const authModule = new AuthModule({});
				const mockMe = setupMockMe({});
				expect(authModule.getMe).not.toStrictEqual(mockMe);

				authModule.setMe(mockMe);

				expect(authModule.getMe).toStrictEqual(mockMe);
			});
		});

		describe("setLocale", () => {
			it("should set the locale state", () => {
				const authModule = new AuthModule({});
				const localeMock = "mock";
				expect(authModule.getLocale).not.toStrictEqual(localeMock);

				authModule.setLocale(localeMock);

				expect(authModule.getLocale).toStrictEqual(localeMock);
			});
		});

		describe("setAccessToken", () => {
			it("should set the accessToken state", () => {
				const authModule = new AuthModule({});
				const tokenMock = "tokenMock";
				expect(authModule.getAccessToken).not.toBe(tokenMock);

				authModule.setAccessToken(tokenMock);

				expect(authModule.getAccessToken).toBe(tokenMock);
			});
		});

		describe("addPermission", () => {
			it("should add the permission to the me state", () => {
				const authModule = new AuthModule({});
				const permissionToBeAdded = "permission_z";
				const mockMe = setupMockMe({});
				authModule.setMe(mockMe);

				authModule.addPermmission(permissionToBeAdded);

				expect(authModule.getPermissions).toContain(permissionToBeAdded);
			});
		});

		describe("clearAuthData", () => {
			it("should clear the auth state", () => {
				const authModule = new AuthModule({});
				const mockMe = setupMockMe({});
				authModule.setMe(mockMe);
				authModule.setAccessToken("test-access-token");

				authModule.clearAuthData();

				expect(authModule.getMe).toBe(undefined);
				expect(authModule.getAccessToken).toBe(null);
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
				const defaultbusinessErrorMock = {
					statusCode: "",
					message: "",
				};
				authModule.setBusinessError(businessErrorMock);
				expect(authModule.businessError).toBe(businessErrorMock);

				authModule.resetBusinessError();

				expect(authModule.businessError.statusCode).toBe(
					defaultbusinessErrorMock.statusCode
				);
				expect(authModule.businessError.message).toBe(
					defaultbusinessErrorMock.message
				);
			});
		});
	});

	describe("getters", () => {
		beforeEach(() => {
			setupStores({
				envConfigModule: EnvConfigModule,
			});
		});
		describe("getMe", () => {
			it("should return the me state", () => {
				const authModule = new AuthModule({});
				const mockMe = setupMockMe({});
				authModule.setMe(mockMe);

				expect(authModule.getMe).toStrictEqual(mockMe);
			});
		});

		describe("getLocale", () => {
			it("should return the set locale", () => {
				const authModule = new AuthModule({});
				authModule.locale = "mock";

				expect(authModule.getLocale).toBe("mock");
			});

			it("should return the default language if locale is not set", () => {
				const authModule = new AuthModule({});
				authModule.locale = "";
				envConfigModule.env.I18N__DEFAULT_LANGUAGE = "fu";

				expect(authModule.getLocale).toBe("fu");
			});

			it("should return the fallback language if neither locale nor default language are set", () => {
				const authModule = new AuthModule({});
				authModule.locale = "";
				envConfigModule.env.I18N__DEFAULT_LANGUAGE = "";

				expect(authModule.getLocale).toBe("de");
			});
		});

		describe("getSchool", () => {
			it("should return the school state", () => {
				const authModule = new AuthModule({});
				const mockMe = setupMockMe({
					school: { id: "test-school-id", name: "test school", logo: {} },
				});
				authModule.setMe(mockMe);

				expect(authModule.getSchool?.id).toStrictEqual("test-school-id");
				expect(authModule.getSchool?.name).toStrictEqual("test school");
			});
		});

		describe("getRoleNames", () => {
			it("should return the userRoles state", () => {
				const authModule = new AuthModule({});
				const mockMe = setupMockMe({ roles: [{ id: "", name: "test-role" }] });
				authModule.setMe(mockMe);

				expect(authModule.getRoleNames).toStrictEqual(["test-role"]);
			});
		});

		describe("getPermissions", () => {
			it("should return the userPermissions state", () => {
				const authModule = new AuthModule({});
				const mockMe = setupMockMe({ permissions: ["test-permission"] });
				authModule.setMe(mockMe);

				expect(authModule.getPermissions).toStrictEqual(["test-permission"]);
			});
		});

		describe("getAuthenticated", () => {
			it("should return true if accessToken is set", () => {
				const authModule = new AuthModule({});
				expect(authModule.getAuthenticated).toBe(false);
				authModule.setAccessToken("test-access-token");

				expect(authModule.getAuthenticated).toStrictEqual("test-access-token");
			});
		});

		describe("isLoggedIn", () => {
			it("should return true if accessToken is set", () => {
				const authModule = new AuthModule({});
				expect(authModule.isLoggedIn).toBe(false);
				authModule.setAccessToken("test-access-token");

				expect(authModule.isLoggedIn).toBe(true);
			});
		});
	});

	describe("actions", () => {
		beforeEach(() => {
			setupStores({
				envConfigModule: EnvConfigModule,
			});
			envConfigModule.setEnvs({
				FEATURE_EXTENSIONS_ENABLED: true,
				FEATURE_TEAMS_ENABLED: true,
			} as Envs);
		});

		describe("login", () => {
			it("should set the me state", async () => {
				const mockMe = setupMockMe({
					user: { id: "test-id", firstName: "", lastName: "" },
				});
				meApi.meControllerMe.mockResolvedValueOnce(
					mockApiResponse({ data: mockMe })
				);
				const authModule = new AuthModule({});

				await authModule.login("sample-jwt");

				expect(authModule.getLocale).toStrictEqual("de");
				expect(authModule.getPermissions).toStrictEqual([
					"addons_enabled",
					"teams_enabled",
				]);
				expect(authModule.getUser?.id).toStrictEqual("test-id");
			});

			it("should set the access token", async () => {
				const mockMe = setupMockMe({});
				const mockReturnValue = {
					data: mockMe,
				};
				meApi.meControllerMe.mockResolvedValueOnce(
					mockApiResponse(mockReturnValue)
				);
				const authModule = new AuthModule({});

				await authModule.login("sample-jwt");

				expect(authModule.getAccessToken).toStrictEqual("sample-jwt");
			});
		});

		describe("updateUserLanguage", () => {
			afterEach(() => {
				jest.clearAllMocks();
			});

			it("should call backend succesfully", () => {
				const mockApi = {
					userControllerChangeLanguage: jest.fn().mockReturnValue({
						data: { successful: true },
					}),
				};
				jest
					.spyOn(serverApi, "UserApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.UserApiInterface);
				const authModule = new AuthModule({});

				authModule.updateUserLanguage(
					serverApi.ChangeLanguageParamsLanguageEnum.De
				);

				expect(mockApi.userControllerChangeLanguage).toHaveBeenCalled();
			});

			it("should catch error", () => {
				const mockApi = {
					userControllerChangeLanguage: jest.fn().mockImplementation(() => {
						throw new AxiosError("I'm an error");
					}),
				};
				jest
					.spyOn(serverApi, "UserApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.UserApiInterface);
				const authModule = new AuthModule({});

				authModule.updateUserLanguage(
					serverApi.ChangeLanguageParamsLanguageEnum.De
				);

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

				const mockReplace = jest.fn();
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
	});
});
