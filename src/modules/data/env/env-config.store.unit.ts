import { defaultConfigEnvs, useEnvConfig, useEnvFileConfig, useEnvStore } from "./env-config.store";
import { mockApiResponse } from "@@/tests/test-utils";
import { FileConfigApiFactory } from "@api-file-storage";
import { FilesStorageConfigResponse } from "@api-file-storage";
import {
	ConfigResponse,
	LanguageType,
	RuntimeConfigApiFactory,
	RuntimeConfigListResponse,
	SchulcloudTheme,
	ServerConfigApiFactory,
} from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { AxiosResponse } from "axios";
import { setActivePinia } from "pinia";
import { beforeAll, beforeEach, expect, vi } from "vitest";
import { ref } from "vue";

vi.mock("@api-server");
const mockedServerApi = vi.mocked(ServerConfigApiFactory);
const mockedRuntimeConfigApi = vi.mocked(RuntimeConfigApiFactory);

vi.mock("@api-file-storage");
const mockedFileConfigApi = vi.mocked(FileConfigApiFactory);

const mockLocale = ref("de");
vi.mock("@/plugins/i18n", () => ({
	useI18nGlobal: () => ({
		locale: mockLocale,
	}),
}));

vi.mock("@data-app", () => ({
	useAppStore: () => ({
		userRoles: ["teacher"],
		handleApplicationError: vi.fn(),
	}),
}));

describe("useEnvStore", () => {
	const doMockServerApiData = (data: ConfigResponse) => {
		mockedServerApi.mockReturnValue({
			serverConfigControllerPublicConfig(): Promise<AxiosResponse<ConfigResponse>> {
				return Promise.resolve(mockApiResponse({ data }));
			},
		});
	};

	const doMockFileConfigApiData = (data: FilesStorageConfigResponse) => {
		mockedFileConfigApi.mockReturnValue({
			publicConfig(): Promise<AxiosResponse<FilesStorageConfigResponse>> {
				return Promise.resolve(mockApiResponse({ data }));
			},
		});
	};

	const doMockRuntimeConfigApiData = (data: { data: Array<{ key: string; value: unknown }> | undefined }) => {
		mockedRuntimeConfigApi.mockReturnValue({
			runtimeConfigControllerGetRuntimeConfig(): Promise<AxiosResponse<RuntimeConfigListResponse>> {
				return Promise.resolve(mockApiResponse({ data: data as RuntimeConfigListResponse }));
			},
			runtimeConfigControllerUpdateRuntimeConfigValue: vi.fn(),
		});
	};

	const setup = async (
		loadConfig = true,
		dataServerApi: Partial<ConfigResponse> = {},
		dataFileApi: FilesStorageConfigResponse = {
			MAX_FILE_SIZE: 10,
			COLLABORA_MAX_FILE_SIZE_IN_BYTES: 20,
			FILES_STORAGE_MAX_FILES_PER_PARENT: 30,
		}
	) => {
		doMockServerApiData({ ...defaultConfigEnvs, ...dataServerApi });
		doMockFileConfigApiData(dataFileApi);
		if (loadConfig) {
			await useEnvStore().loadConfiguration();
		}
	};

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		mockLocale.value = "de";
	});

	describe("initialization", () => {
		it("should load configuration and update status accordingly", async () => {
			await setup(false);
			const success = await useEnvStore().loadConfiguration();
			expect(success).toEqual(true);
		});
	});

	describe("fallBackLanguage", () => {
		it("should return fallback language when available", async () => {
			await setup(true, {
				I18N__DEFAULT_LANGUAGE: "en" as LanguageType,
				I18N__FALLBACK_LANGUAGE: "de" as LanguageType,
			});

			expect(useEnvStore().fallBackLanguage).toBe("de");
		});

		it("should return default language when fallback is not available", async () => {
			await setup(true, {
				I18N__FALLBACK_LANGUAGE: undefined,
				I18N__DEFAULT_LANGUAGE: "en" as LanguageType,
			});

			expect(useEnvStore().fallBackLanguage).toBe("en");
		});
	});

	describe("instituteTitle", () => {
		it("should render default title when the theme is default", async () => {
			await setup(true, {
				SC_THEME: SchulcloudTheme.DEFAULT,
			});

			expect(useEnvStore().instituteTitle).toBe("Dataport");
		});

		it("should render brb title when the theme is brb", async () => {
			await setup(true, {
				SC_THEME: SchulcloudTheme.BRB,
			});

			expect(useEnvStore().instituteTitle).toBe("Ministerium für Bildung, Jugend und Sport des Landes Brandenburg");
		});

		it("should render thr title when the theme is thr", async () => {
			await setup(true, {
				SC_THEME: SchulcloudTheme.THR,
			});

			expect(useEnvStore().instituteTitle).toBe(
				"Thüringer Institut für Lehrerfortbildung, Lehrplanentwicklung und Medien"
			);
		});

		it("should render n21 title when the theme is n21", async () => {
			await setup(true, {
				SC_THEME: SchulcloudTheme.N21,
			});

			expect(useEnvStore().instituteTitle).toBe(
				"Niedersächsisches Landesinstitut für schulische Qualitätsentwicklung (NLQ)"
			);
		});
	});

	describe("loadConfiguration", () => {
		it("should request, process and provide env data.", async () => {
			const mockData: ConfigResponse = {
				...defaultConfigEnvs,
				SC_THEME: SchulcloudTheme.DEFAULT,
				ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true,
				SC_TITLE: "SomeThing",
			};
			await setup(true, mockData);
			expect(useEnvStore().env).toEqual(mockData);
		});

		it("should request, process and provide env file data.", async () => {
			const mockFileData: FilesStorageConfigResponse = {
				MAX_FILE_SIZE: 1,
				FILES_STORAGE_MAX_FILES_PER_PARENT: 1000,
				COLLABORA_MAX_FILE_SIZE_IN_BYTES: 2,
			};
			await setup(true, undefined, mockFileData);
			expect(useEnvStore().envFile).toEqual(mockFileData);
		});

		it("should handle error on file configuration gracefully", async () => {
			doMockServerApiData(defaultConfigEnvs);

			mockedFileConfigApi.mockReturnValue({
				publicConfig: vi.fn().mockRejectedValue(new Error("File config not available")),
			});

			await useEnvStore().loadConfiguration();
		});

		it("should handle server configuration failure", async () => {
			mockedServerApi.mockReturnValue({
				serverConfigControllerPublicConfig: vi.fn().mockRejectedValue(new Error("Server configuration failure")),
			});

			const success = await useEnvStore().loadConfiguration();
			expect(success).toEqual(false);
		});
	});

	describe("dashboardAnnouncement", () => {
		describe("when dashboard announcement is disabled", () => {
			it("should return undefined", async () => {
				doMockRuntimeConfigApiData({
					data: [{ key: "DASHBOARD_ANNOUNCEMENT_ENABLED", value: false }],
				});
				await setup();

				await useEnvStore().fetchRuntimeAnnouncement();

				expect(useEnvStore().dashboardAnnouncement).toBeUndefined();
			});
		});

		describe("when locale text is not available", () => {
			it("should return undefined", async () => {
				doMockRuntimeConfigApiData({
					data: [
						{ key: "DASHBOARD_ANNOUNCEMENT_ENABLED", value: true },
						{ key: "DASHBOARD_ANNOUNCEMENT_FOR_ROLES", value: "teacher" },
						{ key: "DASHBOARD_ANNOUNCEMENT_TEXT_DE", value: "German text" },
					],
				});
				await setup();
				mockLocale.value = "fr";

				await useEnvStore().fetchRuntimeAnnouncement();

				expect(useEnvStore().dashboardAnnouncement).toBeUndefined();
			});
		});

		it.each([
			{ locale: "de", key: "DASHBOARD_ANNOUNCEMENT_TEXT_DE", expected: "German announcement" },
			{ locale: "en", key: "DASHBOARD_ANNOUNCEMENT_TEXT_EN", expected: "English announcement" },
			{ locale: "es", key: "DASHBOARD_ANNOUNCEMENT_TEXT_ES", expected: "Spanish announcement" },
			{ locale: "uk", key: "DASHBOARD_ANNOUNCEMENT_TEXT_UK", expected: "Ukrainian announcement" },
		])("should return $expected when locale is $locale", async ({ locale, key, expected }) => {
			doMockRuntimeConfigApiData({
				data: [
					{ key: "DASHBOARD_ANNOUNCEMENT_ENABLED", value: true },
					{ key: "DASHBOARD_ANNOUNCEMENT_FOR_ROLES", value: "teacher" },
					{ key, value: expected },
				],
			});
			await setup();
			mockLocale.value = locale;

			await useEnvStore().fetchRuntimeAnnouncement();

			expect(useEnvStore().dashboardAnnouncement).toBe(expected);
		});
	});

	describe("fetchRuntimeAnnouncement", () => {
		it("should fetch and set runtime announcement config", async () => {
			doMockRuntimeConfigApiData({
				data: [
					{ key: "DASHBOARD_ANNOUNCEMENT_ENABLED", value: true },
					{ key: "DASHBOARD_ANNOUNCEMENT_FOR_ROLES", value: "teacher,student" },
					{ key: "DASHBOARD_ANNOUNCEMENT_TEXT_DE", value: "Test announcement" },
				],
			});
			await setup();
			mockLocale.value = "de";

			await useEnvStore().fetchRuntimeAnnouncement();

			expect(useEnvStore().dashboardAnnouncement).toBe("Test announcement");
		});

		it("should handle empty data gracefully", async () => {
			doMockRuntimeConfigApiData({ data: undefined as unknown as [] });
			await setup();

			await useEnvStore().fetchRuntimeAnnouncement();

			expect(useEnvStore().dashboardAnnouncement).toBeUndefined();
		});
	});
});

describe("useEnvConfig", () => {
	beforeAll(() => {
		setActivePinia(createTestingPinia());
	});

	it("should proxy env config as ref from useEnvStore", () => {
		useEnvStore().$patch({ env: { SC_TITLE: "School" } });
		expect(useEnvConfig().value.SC_TITLE).toEqual("School");
	});
});

describe("useEnvFileConfig", () => {
	beforeAll(() => {
		setActivePinia(createTestingPinia());
	});

	it("should proxy envFile config as ref from useEnvStore", () => {
		useEnvStore().$patch({
			envFile: {
				MAX_FILE_SIZE: 500,
				COLLABORA_MAX_FILE_SIZE_IN_BYTES: 100,
				FILES_STORAGE_MAX_FILES_PER_PARENT: 200,
			},
		});
		expect(useEnvFileConfig().value.MAX_FILE_SIZE).toEqual(500);
		expect(useEnvFileConfig().value.COLLABORA_MAX_FILE_SIZE_IN_BYTES).toEqual(100);
		expect(useEnvFileConfig().value.FILES_STORAGE_MAX_FILES_PER_PARENT).toEqual(200);
	});
});
