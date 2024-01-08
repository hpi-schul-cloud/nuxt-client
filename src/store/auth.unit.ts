import { envConfigModule, schoolsModule } from "@/store";
import setupStores from "@@/tests/test-utils/setupStores";
import { mockUser } from "@@/tests/test-utils/mockObjects";
import AuthModule from "./auth";
import EnvConfigModule from "./env-config";
import SchoolsModule from "./schools";
import * as axios from "axios";
import { initializeAxios } from "@/utils/api";
import { Envs } from "./types/env-config";
import * as serverApi from "@/serverApi/v3/api";

const axiosInitializer = (options: object) => {
	initializeAxios({
		defaults: {
			headers: {
				common: {
					Authorization: "",
				},
			},
		},
		get: async (path: string) => {
			if (path === "/v1/me") {
				return options;
			}
			if (path === "/v1/roles/user/test-id") {
				return {
					data: [
						{
							permissions: [],
						},
					],
				};
			}
		},
	} as axios.AxiosInstance);
};

jest.useFakeTimers();

describe("auth store module", () => {
	let consoleErrorSpy: any;
	beforeEach(() => {
		consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
	});
	afterEach(() => {
		consoleErrorSpy.mockRestore();
	});

	describe("mutations", () => {
		describe("setUser", () => {
			it("should set the user state", () => {
				const authModule = new AuthModule({});
				const mockValue = { ...mockUser, name: "mockName" };
				expect(authModule.getUser).not.toStrictEqual(mockValue);
				authModule.setUser(mockValue);
				expect(authModule.getUser).toStrictEqual(mockValue);
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

		describe("addUserPermission", () => {
			it("should add the userPermission state", () => {
				const authModule = new AuthModule({});
				const permissionToBeAdded = "permission_z";
				authModule.addUserPermmission(permissionToBeAdded);
				expect(authModule.getUser?.permissions).toContain(permissionToBeAdded);
			});
		});

		describe("clearAuthData", () => {
			it("should clear the auth state", () => {
				const authModule = new AuthModule({});
				expect(authModule.getUser).not.toBe(null);
				expect(authModule.getAccessToken).not.toBe(null);
				authModule.clearAuthData();
				expect(authModule.getUser).toBe(null);
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
				schoolsModule: SchoolsModule,
				envConfigModule: EnvConfigModule,
			});
		});
		describe("locale", () => {
			it("should return the user's language", () => {
				const authModule = new AuthModule({});
				authModule.locale = "mock";
				expect(authModule.getLocale).toBe("mock");
			});

			it("should return the school's language", () => {
				const authModule = new AuthModule({});
				authModule.locale = "";
				schoolsModule.school.language = "fi";
				expect(authModule.getLocale).toBe("fi");
			});

			it("should return the instance language", () => {
				const authModule = new AuthModule({});
				authModule.locale = "";
				schoolsModule.school.language = "";
				envConfigModule.env.I18N__DEFAULT_LANGUAGE = "fu";
				expect(authModule.getLocale).toBe("fu");
			});

			it("should return the default language", () => {
				const authModule = new AuthModule({});
				authModule.locale = "";
				schoolsModule.school.language = "";
				envConfigModule.env.I18N__DEFAULT_LANGUAGE = "";
				expect(authModule.getLocale).toBe("de");
			});
		});

		describe("getSchool", () => {
			it("should return the school state", () => {
				const authModule = new AuthModule({});
				authModule.locale = "";
				schoolsModule.school.id = "test-school-id";
				schoolsModule.school.name = "test school";
				expect(authModule.getSchool.id).toStrictEqual("test-school-id");
				expect(authModule.getSchool.name).toStrictEqual("test school");
			});
		});

		describe("getUserRoles", () => {
			it("should return the userRoles state", () => {
				const authModule = new AuthModule({});
				const mockValue = { ...mockUser, name: "mockName" };
				authModule.setUser(mockValue);

				expect(authModule.getUserRoles).toStrictEqual(["test-role"]);
			});
		});

		describe("getUserRolesDisplayName", () => {
			it("should return the userDisplayName state", () => {
				const authModule = new AuthModule({});
				const mockValue = { ...mockUser, name: "mockName" };
				authModule.setUser(mockValue);

				expect(authModule.getUserRolesDisplayName).toStrictEqual([
					"test-display-name",
				]);
			});
		});

		describe("getUserPermissions", () => {
			it("should return the userPermissions state", () => {
				const authModule = new AuthModule({});
				const mockValue = { ...mockUser, name: "mockName" };
				authModule.setUser(mockValue);

				expect(authModule.getUserPermissions).toStrictEqual([
					"test-permission",
				]);
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

		describe("userIsExternallyManaged", () => {
			it("should return true if the user is externally managed", () => {
				const authModule = new AuthModule({});
				authModule.setUser(mockUser);

				expect(authModule.userIsExternallyManaged).toBe(false);
				authModule.setUser({ ...mockUser, externallyManaged: true });
				expect(authModule.userIsExternallyManaged).toBe(true);
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
		const fetchSchoolMock = jest.fn().mockReturnValue({});
		beforeEach(() => {
			setupStores({
				schoolsModule: SchoolsModule,
				envConfigModule: EnvConfigModule,
			});
			schoolsModule.fetchSchool = fetchSchoolMock;
			envConfigModule.setEnvs({
				FEATURE_EXTENSIONS_ENABLED: true,
				FEATURE_TEAMS_ENABLED: true,
			} as Envs);
		});

		const defaultUserData = {
			...mockUser,
			id: "test-id",
			firstName: "returned name",
		};

		describe("login", () => {
			describe("when the login process is successful", () => {
				it("should set the user state", async () => {
					axiosInitializer({
						data: { ...defaultUserData, schoolId: "school-id", language: "de" },
					});
					const authModule = new AuthModule({});

					expect(authModule?.getUser?.firstName).toStrictEqual("");

					await authModule.login("sample-jwt");
					expect(fetchSchoolMock).toHaveBeenCalled();
					expect(authModule?.getLocale).toStrictEqual("de");
					expect(authModule?.getUserPermissions).toStrictEqual([
						"addons_enabled",
						"teams_enabled",
					]);
					expect(authModule?.getUser?.firstName).toStrictEqual("returned name");
				});
			});

			describe("when the login process is not successful", () => {
				it("should not set the user state", async () => {
					axiosInitializer({ data: undefined });
					const authModule = new AuthModule({});

					expect(authModule?.getUser?.firstName).toStrictEqual("");

					await authModule.login("sample-jwt");
					expect(authModule?.getUser).toBe(null);
				});
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
						throw new axios.AxiosError("I'm an error");
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
			const mockReplace = jest.fn();
			window.location.replace = mockReplace;

			describe("when logout action is called", () => {
				it("should replace the window.location", () => {
					axiosInitializer({
						data: defaultUserData,
					});
					const authModule = new AuthModule({});
					authModule.logout();
					expect(mockReplace).toHaveBeenCalledWith("/logout");

					jest.clearAllMocks();
					authModule.logout("/to_another_path");
					expect(mockReplace).toHaveBeenCalledWith("/to_another_path");
				});
			});
		});
	});
});
