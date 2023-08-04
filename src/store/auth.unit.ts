import { envConfigModule, schoolsModule } from "@/store";
import setupStores from "@@/tests/test-utils/setupStores";
import { mockUser } from "@@/tests/test-utils/mockObjects";
import AuthModule from "./auth";
import EnvConfigModule from "./env-config";
import SchoolsModule from "./schools";
import * as axios from "axios";
import { initializeAxios } from "@/utils/api";

jest.mock("axios");
initializeAxios({
	defaults: {
		headers: {
			common: {
				Authorization: "",
			},
		},
	},
} as axios.AxiosInstance);

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
			it("should set user data", () => {
				const authModule = new AuthModule({});
				const mockValue = { ...mockUser, name: "mockName" };
				expect(authModule.getUser).not.toStrictEqual(mockValue);
				authModule.setUser(mockValue);
				expect(authModule.getUser).toStrictEqual(mockValue);
			});
		});

		describe("setLocale", () => {
			it("should set locale data", () => {
				const authModule = new AuthModule({});
				const localeMock = "mock";
				expect(authModule.getLocale).not.toStrictEqual(localeMock);
				authModule.setLocale(localeMock);
				expect(authModule.getLocale).toStrictEqual(localeMock);
			});
		});

		describe("setAccessToken", () => {
			it("should set accessToken data", () => {
				const authModule = new AuthModule({});
				const tokenMock = "tokenMock";
				expect(authModule.getAccessToken).not.toBe(tokenMock);
				authModule.setAccessToken(tokenMock);
				expect(authModule.getAccessToken).toBe(tokenMock);
			});
		});

		describe("addUserPermission", () => {
			it("should add user permission data", () => {
				const authModule = new AuthModule({});
				const permissionToBeAdded = "permission_z";
				authModule.addUserPermmission(permissionToBeAdded);
				expect(authModule.getUser?.permissions).toContain(permissionToBeAdded);
			});
		});

		describe("clearAuthData", () => {
			it("should clear the auth data", () => {
				const authModule = new AuthModule({});
				expect(authModule.getUser).not.toBe(null);
				expect(authModule.getAccessToken).not.toBe(null);
				authModule.clearAuthData();
				expect(authModule.getUser).toBe(null);
				expect(authModule.getAccessToken).toBe(null);
			});
		});
	});

	describe("getters", () => {
		describe("locale", () => {
			beforeEach(() => {
				setupStores({
					schoolsModule: SchoolsModule,
					envConfigModule: EnvConfigModule,
				});
			});

			it("returns the user's language", () => {
				const authModule = new AuthModule({});
				authModule.locale = "mock";
				expect(authModule.getLocale).toBe("mock");
			});

			it("returns the school's language", () => {
				const authModule = new AuthModule({});
				authModule.locale = "";
				schoolsModule.school.language = "fi";
				expect(authModule.getLocale).toBe("fi");
			});

			it("returns the instance language", () => {
				const authModule = new AuthModule({});
				authModule.locale = "";
				schoolsModule.school.language = "";
				envConfigModule.env.I18N__DEFAULT_LANGUAGE = "fu";
				expect(authModule.getLocale).toBe("fu");
			});

			it("returns the default language", () => {
				const authModule = new AuthModule({});
				authModule.locale = "";
				schoolsModule.school.language = "";
				envConfigModule.env.I18N__DEFAULT_LANGUAGE = "";
				expect(authModule.getLocale).toBe("de");
			});
		});
	});

	describe("actions", () => {
		describe("logout", () => {
			beforeEach(() => {
				setupStores({
					schoolsModule: SchoolsModule,
					envConfigModule: EnvConfigModule,
				});
			});

			const mockReplace = jest.fn();
			window.location.replace = mockReplace;

			describe("when logout action is called", () => {
				it("should replace the window.location", () => {
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
