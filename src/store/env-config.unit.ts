import {
	FileConfigApiInterface,
	FilesStorageConfigResponse,
} from "@/fileStorageApi/v3";
import * as fileConfigApi from "@/fileStorageApi/v3/api/file-config-api";
import * as serverApi from "@/serverApi/v3/api";
import {
	ConfigResponse,
	LanguageType,
	SchulcloudTheme,
	Timezone,
} from "@/serverApi/v3/api";
import { businessErrorFactory, envsFactory } from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import { createMock } from "@golevelup/ts-jest";
import { AxiosResponse } from "axios";
import ApplicationErrorModule from "./application-error";
import ContentModule from "./content";
import EnvConfigModule from "./env-config";
import FilePathsModule from "./filePaths";

const mockFileEnvs: FilesStorageConfigResponse = {
	MAX_FILE_SIZE: 10,
};

jest.useFakeTimers();

describe("env-config module", () => {
	let consoleWarnSpy: jest.SpyInstance;
	let consoleErrorSpy: jest.SpyInstance;

	beforeEach(() => {
		consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
		consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
		jest.resetAllMocks();
	});

	afterEach(() => {
		consoleWarnSpy.mockRestore();
		consoleErrorSpy.mockRestore();
	});

	describe("actions", () => {
		describe("loadConfiguration", () => {
			describe("when configs loaded successfully", () => {
				const setup = () => {
					const serverConfigresponse = createMock<
						AxiosResponse<ConfigResponse, unknown>
					>({
						data: envsFactory.build(),
					});
					const fileStorageConfigResponse = createMock<
						AxiosResponse<FilesStorageConfigResponse, unknown>
					>({
						data: mockFileEnvs,
					});

					const defaultApi = createMock<serverApi.ServerConfigApiInterface>();
					jest
						.spyOn(serverApi, "ServerConfigApiFactory")
						.mockReturnValue(defaultApi);
					defaultApi.serverConfigControllerPublicConfig.mockResolvedValueOnce(
						serverConfigresponse
					);

					const fileApi = createMock<FileConfigApiInterface>();
					jest
						.spyOn(fileConfigApi, "FileConfigApiFactory")
						.mockReturnValue(fileApi);
					fileApi.publicConfig.mockResolvedValueOnce(fileStorageConfigResponse);

					const contentInitMock = jest.fn();
					const contentModuleMock = {
						...ContentModule,
						actions: {
							...ContentModule.actions,
							init: contentInitMock,
						},
					};

					const filePathsInitMock = jest.fn();
					const filePathsModuleMock = {
						...FilePathsModule,
						actions: {
							...FilePathsModule.actions,
							init: filePathsInitMock,
						},
					};

					setupStores({
						contentModule: contentModuleMock,
						filePathsModule: filePathsModuleMock,
					});

					return { defaultApi, fileApi, contentInitMock, filePathsInitMock };
				};

				it("should reset business error", async () => {
					setup();
					const envConfigModule = new EnvConfigModule({});
					const businessError = businessErrorFactory.build();
					envConfigModule.setBusinessError(businessError);

					await envConfigModule.loadConfiguration();

					expect(envConfigModule.businessError.statusCode).toBe("");
					expect(envConfigModule.businessError.message).toBe("");
				});

				it("should handle status", async () => {
					setup();
					const envConfigModule = new EnvConfigModule({});
					const setStatusSpy = jest.spyOn(envConfigModule, "setStatus");

					await envConfigModule.loadConfiguration();

					expect(setStatusSpy).toHaveBeenNthCalledWith(1, "pending");
					expect(setStatusSpy).toHaveBeenNthCalledWith(2, "completed");
				});

				it("should load configs", async () => {
					const { defaultApi, fileApi } = setup();
					const envConfigModule = new EnvConfigModule({});

					await envConfigModule.loadConfiguration();

					expect(
						defaultApi.serverConfigControllerPublicConfig
					).toHaveBeenCalledTimes(1);
					expect(fileApi.publicConfig).toHaveBeenCalledTimes(1);
				});

				it("should set envs", async () => {
					setup();
					const envConfigModule = new EnvConfigModule({});

					await envConfigModule.loadConfiguration();

					expect(envConfigModule.env).toStrictEqual(envsFactory.build());
					expect(envConfigModule.envFile).toStrictEqual(mockFileEnvs);
				});

				it("should call init on contentModule and filePathsModule", async () => {
					const { contentInitMock, filePathsInitMock } = setup();
					const envConfigModule = new EnvConfigModule({});

					await envConfigModule.loadConfiguration();

					expect(contentInitMock).toHaveBeenCalledTimes(1);
					expect(filePathsInitMock).toHaveBeenCalledTimes(1);
				});
			});

			describe("when loadFileConfig throws error", () => {
				const setup = () => {
					const serverConfigresponse = createMock<
						AxiosResponse<ConfigResponse, unknown>
					>({
						data: envsFactory.build(),
					});
					const error = new Error("testError");

					const defaultApi = createMock<serverApi.ServerConfigApiInterface>();
					jest
						.spyOn(serverApi, "ServerConfigApiFactory")
						.mockReturnValue(defaultApi);
					defaultApi.serverConfigControllerPublicConfig.mockResolvedValueOnce(
						serverConfigresponse
					);

					const fileApi = createMock<FileConfigApiInterface>();
					jest
						.spyOn(fileConfigApi, "FileConfigApiFactory")
						.mockReturnValue(fileApi);
					fileApi.publicConfig.mockRejectedValueOnce(error);

					const contentModuleInitMock = jest.fn();
					const contentModuleMock = {
						...ContentModule,
						actions: {
							...ContentModule.actions,
							init: contentModuleInitMock,
						},
					};

					const filePathsModuleInitMock = jest.fn();
					const filePathsModuleMock = {
						...FilePathsModule,
						actions: {
							...FilePathsModule.actions,
							init: filePathsModuleInitMock,
						},
					};

					const setErrorMock = jest.fn();
					const applicationErrorModuleMock = {
						...ApplicationErrorModule,
						actions: {
							...ApplicationErrorModule.actions,
							setError: setErrorMock,
						},
					};

					setupStores({
						contentModule: contentModuleMock,
						filePathsModule: filePathsModuleMock,
						applicationErrorModule: applicationErrorModuleMock,
					});

					return {
						defaultApi,
						fileApi,
						filePathsModuleInitMock,
						contentModuleInitMock,
						setErrorMock,
					};
				};

				it("should load configs", async () => {
					const { defaultApi, fileApi } = setup();
					const envConfigModule = new EnvConfigModule({});

					await envConfigModule.loadConfiguration();

					expect(
						defaultApi.serverConfigControllerPublicConfig
					).toHaveBeenCalledTimes(1);
					expect(fileApi.publicConfig).toHaveBeenCalledTimes(1);
				});

				it("should handle status", async () => {
					setup();
					const envConfigModule = new EnvConfigModule({});
					const setStatusSpy = jest.spyOn(envConfigModule, "setStatus");

					await envConfigModule.loadConfiguration();

					expect(setStatusSpy).toHaveBeenNthCalledWith(1, "pending");
					expect(setStatusSpy).toHaveBeenNthCalledWith(2, "completed");
				});

				it("should load configs", async () => {
					const { defaultApi, fileApi } = setup();
					const envConfigModule = new EnvConfigModule({});

					await envConfigModule.loadConfiguration();

					expect(
						defaultApi.serverConfigControllerPublicConfig
					).toHaveBeenCalledTimes(1);
					expect(fileApi.publicConfig).toHaveBeenCalledTimes(1);
				});

				it("should call init on contentModule and filePathsModule", async () => {
					const { contentModuleInitMock, filePathsModuleInitMock } = setup();
					const envConfigModule = new EnvConfigModule({});

					await envConfigModule.loadConfiguration();

					expect(contentModuleInitMock).toHaveBeenCalledTimes(1);
					expect(filePathsModuleInitMock).toHaveBeenCalledTimes(1);
				});

				it("should not set application error", async () => {
					const { setErrorMock } = setup();
					const envConfigModule = new EnvConfigModule({});

					await envConfigModule.loadConfiguration();

					expect(setErrorMock).not.toHaveBeenCalled();
				});
			});

			describe("when loadCoreConfig throws error", () => {
				const setup = () => {
					const fileStorageConfigResponse = createMock<
						AxiosResponse<FilesStorageConfigResponse, unknown>
					>({
						data: mockFileEnvs,
					});
					const error = new Error("testError");

					const defaultApi = createMock<serverApi.ServerConfigApiInterface>();
					jest
						.spyOn(serverApi, "ServerConfigApiFactory")
						.mockReturnValue(defaultApi);
					defaultApi.serverConfigControllerPublicConfig.mockRejectedValueOnce(
						error
					);

					const fileApi = createMock<FileConfigApiInterface>();
					jest
						.spyOn(fileConfigApi, "FileConfigApiFactory")
						.mockReturnValue(fileApi);
					fileApi.publicConfig.mockResolvedValueOnce(fileStorageConfigResponse);

					const contentInitMock = jest.fn();
					const contentModuleMock = {
						...ContentModule,
						actions: {
							...ContentModule.actions,
							init: contentInitMock,
						},
					};

					const filePathsInitMock = jest.fn();
					const filePathsModuleMock = {
						...FilePathsModule,
						actions: {
							...FilePathsModule.actions,
							init: filePathsInitMock,
						},
					};

					setupStores({
						contentModule: contentModuleMock,
						filePathsModule: filePathsModuleMock,
					});

					return {
						defaultApi,
						fileApi,
						contentInitMock,
						filePathsInitMock,
						error,
					};
				};

				it("should not set status to completed", async () => {
					setup();
					const envConfigModule = new EnvConfigModule({});
					const setStatusSpy = jest.spyOn(envConfigModule, "setStatus");

					await envConfigModule.loadConfiguration();

					expect(setStatusSpy).not.toHaveBeenCalledWith("completed");
				});

				it("should load configs", async () => {
					const { defaultApi, fileApi } = setup();
					const envConfigModule = new EnvConfigModule({});

					await envConfigModule.loadConfiguration();

					expect(
						defaultApi.serverConfigControllerPublicConfig
					).toHaveBeenCalledTimes(1);
					expect(fileApi.publicConfig).toHaveBeenCalledTimes(1);
				});

				it("should not call init on contentModule and filePathsModule", async () => {
					const { filePathsInitMock, contentInitMock } = setup();
					const envConfigModule = new EnvConfigModule({});

					await envConfigModule.loadConfiguration();

					expect(contentInitMock).not.toHaveBeenCalled();
					expect(filePathsInitMock).not.toHaveBeenCalled();
				});

				/* it("should set application error", async () => {
                        const { setErrorMock } = setup();
                        const envConfigModule = new EnvConfigModule({});

                        await envConfigModule.loadConfiguration();

                        const applicationError = createApplicationError(
                            HttpStatusCode.GatewayTimeout
                        );

                        expect(setErrorMock).toHaveBeenCalledTimes(1);
                        expect(setErrorMock).toHaveBeenCalledWith(applicationError);
                    }); */

				it("should call setStatus with error", async () => {
					setup();
					const envConfigModule = new EnvConfigModule({});
					const setStatusSpy = jest.spyOn(envConfigModule, "setStatus");

					await envConfigModule.loadConfiguration();

					expect(setStatusSpy).toHaveBeenNthCalledWith(1, "pending");
					expect(setStatusSpy).toHaveBeenNthCalledWith(2, "error");
				});
			});
		});
	});

	describe("mutations", () => {
		it("setEnvs should set envs", () => {
			const envConfigModule = new EnvConfigModule({});
			expect(envConfigModule.env.SC_THEME).not.toBe(SchulcloudTheme.Thr);

			const envsMock = envsFactory.build();
			envConfigModule.setEnvs(envsMock);

			expect(envConfigModule.env.JWT_TIMEOUT_SECONDS).toBe(
				envsMock.JWT_TIMEOUT_SECONDS
			);
		});

		it("setFileEnvs should set fileEnvs", () => {
			const envConfigModule = new EnvConfigModule({});
			expect(envConfigModule.envFile.MAX_FILE_SIZE).not.toBe(10);

			envConfigModule.setFileEnvs(mockFileEnvs);

			expect(envConfigModule.envFile.MAX_FILE_SIZE).toBe(10);
		});

		it("increaseLoadingErrorCount should increase loadingErrorCount value by 1", () => {
			const envConfigModule = new EnvConfigModule({});
			expect(envConfigModule.loadingErrorCount).toBe(0);

			envConfigModule.increaseLoadingErrorCount();

			expect(envConfigModule.loadingErrorCount).toBe(1);
		});

		it("setBusinessError should set businessError", () => {
			const envConfigModule = new EnvConfigModule({});
			expect(envConfigModule.businessError.message).toBe("");

			envConfigModule.setBusinessError({
				statusCode: "mockValue",
				message: "mockValue",
			});

			expect(envConfigModule.businessError.message).toBe("mockValue");
		});

		it("resetBusinessError should reset businessError", () => {
			const envConfigModule = new EnvConfigModule({});
			envConfigModule.setBusinessError({
				statusCode: "mockValue",
				message: "mockValue",
			});
			expect(envConfigModule.businessError.message).toBe("mockValue");

			envConfigModule.resetBusinessError();

			expect(envConfigModule.businessError.message).toBe("");
		});

		it("setStatus should set status", () => {
			const envConfigModule = new EnvConfigModule({});
			expect(envConfigModule.status).toBe("");

			envConfigModule.setStatus("completed");

			expect(envConfigModule.status).toBe("completed");
		});
	});

	describe("getters", () => {
		describe("getFallbackLanguage", () => {
			describe("when I18N__FALLBACK_LANGUAGE is defined", () => {
				it("should return I18N__FALLBACK_LANGUAGE", () => {
					const envConfigModule = new EnvConfigModule({});
					envConfigModule.env.I18N__FALLBACK_LANGUAGE = LanguageType.En;

					expect(envConfigModule.getFallbackLanguage).toBe(LanguageType.En);
				});
			});

			describe("when I18N__FALLBACK_LANGUAGE is not defined", () => {
				it("should return I18N__DEFAULT_LANGUAGE", () => {
					const envConfigModule = new EnvConfigModule({});

					// @ts-expect-error: Logic should be removed
					envConfigModule.env.I18N__FALLBACK_LANGUAGE = undefined;

					expect(envConfigModule.getFallbackLanguage).toBe(LanguageType.De);
				});
			});
		});

		it("getFallbackLanguage should get 'de' if I18N__FALLBACK_LANGUAGE is not defined", () => {
			const envConfigModule = new EnvConfigModule({});

			expect(envConfigModule.getFallbackLanguage).toBe(LanguageType.De);
		});

		it("getDefaultTimeZone should get 'Europe/Berlin' if I18N__DEFAULT_TIMEZONE is not defined", () => {
			const envConfigModule = new EnvConfigModule({});

			expect(envConfigModule.getDefaultTimezone).toBe(Timezone.EuropeBerlin);
		});

		describe("getAdminToggleStudentLernstoreViewEnabled", () => {
			describe("when FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED and FEATURE_LERNSTORE_ENABLED are true", () => {
				it("should return true", () => {
					const envConfigModule = new EnvConfigModule({});
					envConfigModule.env.FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED =
						true;
					envConfigModule.env.FEATURE_LERNSTORE_ENABLED = true;

					expect(
						envConfigModule.getAdminToggleStudentLernstoreViewEnabled
					).toBe(true);
				});
			});

			describe("when FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED is false", () => {
				it("should return false", () => {
					const envConfigModule = new EnvConfigModule({});
					envConfigModule.env.FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED =
						false;
					envConfigModule.env.FEATURE_LERNSTORE_ENABLED = true;

					expect(
						envConfigModule.getAdminToggleStudentLernstoreViewEnabled
					).toBe(false);
				});
			});

			describe("when FEATURE_LERNSTORE_ENABLED is false", () => {
				it("should return false", () => {
					const envConfigModule = new EnvConfigModule({});
					envConfigModule.env.FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED =
						true;
					envConfigModule.env.FEATURE_LERNSTORE_ENABLED = false;

					expect(
						envConfigModule.getAdminToggleStudentLernstoreViewEnabled
					).toBe(false);
				});
			});
		});

		it("getFeatureSchoolSanisUserMigrationEnabled should get FEATURE_SCHOOL_SANIS_USER_MIGRATION_ENABLED", () => {
			const envConfigModule = new EnvConfigModule({});
			envConfigModule.env.FEATURE_SCHOOL_SANIS_USER_MIGRATION_ENABLED = true;

			expect(envConfigModule.getFeatureSchoolSanisUserMigrationEnabled).toBe(
				true
			);
		});

		it("getTheme should get SC_THEME", () => {
			const envConfigModule = new EnvConfigModule({});
			envConfigModule.env = envsFactory.build();

			expect(envConfigModule.getTheme).toBe(SchulcloudTheme.Default);
		});

		it("getMigrationEndGracePeriod should get MIGRATION_END_GRACE_PERIOD_MS", () => {
			const envConfigModule = new EnvConfigModule({});
			envConfigModule.env = envsFactory.build();

			expect(envConfigModule.getMigrationEndGracePeriod).toStrictEqual(
				envsFactory.build().MIGRATION_END_GRACE_PERIOD_MS
			);
		});

		it("getTeacherStudentVisibilityIsConfigurable should get TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE", () => {
			const envConfigModule = new EnvConfigModule({});
			const mockEnvs = envsFactory.build();
			envConfigModule.env = mockEnvs;

			expect(
				envConfigModule.getTeacherStudentVisibilityIsConfigurable
			).toStrictEqual(mockEnvs.TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE);
		});

		it("getTeacherStudentVisibilityIsEnabledByDefault should get TEACHER_STUDENT_VISIBILITY__IS_ENABLED_BY_DEFAULT", () => {
			const envConfigModule = new EnvConfigModule({});
			const mockEnvs = envsFactory.build();
			envConfigModule.env = mockEnvs;

			expect(
				envConfigModule.getTeacherStudentVisibilityIsEnabledByDefault
			).toStrictEqual(
				mockEnvs.TEACHER_STUDENT_VISIBILITY__IS_ENABLED_BY_DEFAULT
			);
		});

		it("getTeacherStudentVisibilityIsVisible should get TEACHER_STUDENT_VISIBILITY__IS_VISIBLE", () => {
			const envConfigModule = new EnvConfigModule({});
			const mockEnvs = envsFactory.build();
			envConfigModule.env = mockEnvs;

			expect(
				envConfigModule.getTeacherStudentVisibilityIsVisible
			).toStrictEqual(mockEnvs.TEACHER_STUDENT_VISIBILITY__IS_VISIBLE);
		});

		it("getVideoConferenceEnabled should get FEATURE_VIDEOCONFERENCE_ENABLED", () => {
			const envConfigModule = new EnvConfigModule({});
			const mockEnvs = envsFactory.build();
			envConfigModule.env = mockEnvs;

			expect(envConfigModule.getVideoConferenceEnabled).toStrictEqual(
				mockEnvs.FEATURE_VIDEOCONFERENCE_ENABLED
			);
		});

		it("getLoginLinkEnabled should get FEATURE_LOGIN_LINK_ENABLED", () => {
			const envConfigModule = new EnvConfigModule({});
			const mockEnvs = envsFactory.build();
			envConfigModule.env = mockEnvs;

			expect(envConfigModule.getLoginLinkEnabled).toStrictEqual(
				mockEnvs.FEATURE_LOGIN_LINK_ENABLED
			);
		});

		it("getRocketChatEnabled should get ROCKETCHAT_SERVICE_ENABLED", () => {
			const envConfigModule = new EnvConfigModule({});
			const mockEnvs = envsFactory.build();
			envConfigModule.env = mockEnvs;

			expect(envConfigModule.getRocketChatEnabled).toStrictEqual(
				mockEnvs.ROCKETCHAT_SERVICE_ENABLED
			);
		});

		it("getNewSchoolAdminPageAsDefault should get FEATURE_NEW_SCHOOL_ADMINISTRATION_PAGE_AS_DEFAULT_ENABLED", () => {
			const envConfigModule = new EnvConfigModule({});
			const mockEnvs = envsFactory.build();

			envConfigModule.env = mockEnvs;

			expect(envConfigModule.getNewSchoolAdminPageAsDefault).toStrictEqual(
				mockEnvs.FEATURE_NEW_SCHOOL_ADMINISTRATION_PAGE_AS_DEFAULT_ENABLED
			);
		});

		it("getSchoolPolicyEnabled should get FEATURE_SCHOOL_POLICY_ENABLED_NEW", () => {
			const envConfigModule = new EnvConfigModule({});
			const mockEnvs = envsFactory.build();
			envConfigModule.env = mockEnvs;

			expect(envConfigModule.getSchoolPolicyEnabled).toStrictEqual(
				mockEnvs.FEATURE_SCHOOL_POLICY_ENABLED_NEW
			);
		});

		it("getFeatureSchoolTermsOfUseEnabled should get FEATURE_SCHOOL_TERMS_OF_USE_ENABLED", () => {
			const envConfigModule = new EnvConfigModule({});
			const mockEnvs = envsFactory.build();
			envConfigModule.env = mockEnvs;

			expect(envConfigModule.getSchoolTermsOfUseEnabled).toStrictEqual(
				mockEnvs.FEATURE_SCHOOL_TERMS_OF_USE_ENABLED
			);
		});

		it("getAvailableLanguages should get I18N__AVAILABLE_LANGUAGES", () => {
			const envConfigModule = new EnvConfigModule({});
			const mockEnvs = envsFactory.build();
			envConfigModule.env = mockEnvs;

			expect(envConfigModule.getAvailableLanguages).toStrictEqual(
				mockEnvs.I18N__AVAILABLE_LANGUAGES
			);
		});

		it("getGhostBaseUrl should get GHOST_BASE_URL", () => {
			const envConfigModule = new EnvConfigModule({});
			const mockEnvs = envsFactory.build();
			envConfigModule.env = mockEnvs;

			expect(envConfigModule.getGhostBaseUrl).toStrictEqual(
				mockEnvs.GHOST_BASE_URL
			);
		});

		it("getShowNewClassViewEnabled should get FEATURE_SHOW_NEW_CLASS_VIEW_ENABLED", () => {
			const envConfigModule = new EnvConfigModule({});
			const mockEnvs = envsFactory.build();
			envConfigModule.env = mockEnvs;

			expect(envConfigModule.getShowNewClassViewEnabled).toStrictEqual(
				mockEnvs.FEATURE_SHOW_NEW_CLASS_VIEW_ENABLED
			);
		});

		it("getContactEmail should get SC_CONTACT_EMAIL", () => {
			const envConfigModule = new EnvConfigModule({});
			const mockEnvs = envsFactory.build();
			envConfigModule.env = mockEnvs;

			expect(envConfigModule.getContactEmail).toStrictEqual(
				mockEnvs.SC_CONTACT_EMAIL
			);
		});

		it("getAccessiblityReportEmail should get ACCESSIBILITY_REPORT_EMAIL", () => {
			const envConfigModule = new EnvConfigModule({});
			const mockEnvs = envsFactory.build();
			envConfigModule.env = mockEnvs;

			expect(envConfigModule.getAccessibilityReportEmail).toStrictEqual(
				mockEnvs.ACCESSIBILITY_REPORT_EMAIL
			);
		});

		it("getShowOutdatedUsers should get FEATURE_SHOW_OUTDATED_USERS", () => {
			const envConfigModule = new EnvConfigModule({});
			envConfigModule.env = envsFactory.build();

			expect(envConfigModule.getShowOutdatedUsers).toStrictEqual(
				envsFactory.build().FEATURE_SHOW_OUTDATED_USERS
			);
		});

		it("getEnableLdapSyncDuringMigration should get FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION", () => {
			const envConfigModule = new EnvConfigModule({});
			const mockEnvs = envsFactory.build();
			envConfigModule.env = mockEnvs;

			expect(envConfigModule.getEnableLdapSyncDuringMigration).toStrictEqual(
				mockEnvs.FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION
			);
		});

		it("getCtlToolsCopyEnabled should get FEATURE_CTL_TOOLS_COPY_ENABLED", () => {
			const envConfigModule = new EnvConfigModule({});
			const mockEnvs = envsFactory.build();
			envConfigModule.env = mockEnvs;

			expect(envConfigModule.getCtlToolsCopyEnabled).toStrictEqual(
				mockEnvs.FEATURE_CTL_TOOLS_COPY_ENABLED
			);
		});

		it("getEnv should get env", () => {
			const envConfigModule = new EnvConfigModule({});
			const mockEnvs = envsFactory.build();

			expect(envConfigModule.getEnv).toStrictEqual(mockEnvs);
		});

		describe("getMaxFileSize", () => {
			describe("when MAX_FILE_SIZE is -1", () => {
				it("should return defaultFileSize", () => {
					const envConfigModule = new EnvConfigModule({});
					const MAX_FILE_SIZE = 1;
					envConfigModule.envFile.MAX_FILE_SIZE = MAX_FILE_SIZE;

					expect(envConfigModule.getMaxFileSize).toBe(MAX_FILE_SIZE);
				});
			});

			describe("when MAX_FILE_SIZE is not -1", () => {
				it("should return MAX_FILE_SIZE", () => {
					const envConfigModule = new EnvConfigModule({});
					envConfigModule.envFile.MAX_FILE_SIZE = 100;

					expect(envConfigModule.getMaxFileSize).toBe(100);
				});
			});
		});
	});
});
