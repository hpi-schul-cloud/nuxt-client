import { createPinia, setActivePinia } from "pinia";
import { beforeAll, beforeEach, expect } from "vitest";
import {
	defaultConfigEnvs,
	useEnvConfig,
	useEnvStore,
} from "./env-config.store";
import { AxiosResponse } from "axios";
import {
	ConfigResponse,
	LanguageType,
	SchulcloudTheme,
	ServerConfigApiFactory,
} from "@/serverApi/v3";
import {
	FileConfigApiFactory,
	FilesStorageConfigResponse,
} from "@/fileStorageApi/v3";

vi.mock("@/store", () => ({
	applicationErrorModule: {
		setError: vi.fn(),
	},
}));

vi.mock("@/serverApi/v3");
const mockedServerApi = vi.mocked(ServerConfigApiFactory);

vi.mock("@/fileStorageApi/v3");
const mockedFileConfigApi = vi.mocked(FileConfigApiFactory);

const createMockAxiosResponse = <T>(data: T): AxiosResponse<T> => ({
	data,
	status: 200,
	statusText: "OK",
	headers: {},
	config: {} as never,
});

describe("useEnvStore", () => {
	const doMockServerApiData = (data: ConfigResponse) => {
		mockedServerApi.mockReturnValue({
			serverConfigControllerPublicConfig(): Promise<
				AxiosResponse<ConfigResponse>
			> {
				return Promise.resolve(createMockAxiosResponse(data));
			},
		});
	};

	const doMockFileConfigApiData = (data: FilesStorageConfigResponse) => {
		mockedFileConfigApi.mockReturnValue({
			publicConfig(): Promise<AxiosResponse<FilesStorageConfigResponse>> {
				return Promise.resolve(createMockAxiosResponse(data));
			},
		});
	};

	const setup = async (
		loadConfig = true,
		dataServerApi: Partial<ConfigResponse> = {},
		dataFileApi: FilesStorageConfigResponse = {
			MAX_FILE_SIZE: 10,
			COLLABORA_MAX_FILE_SIZE_IN_BYTES: 20,
		}
	) => {
		doMockServerApiData({ ...defaultConfigEnvs, ...dataServerApi });
		doMockFileConfigApiData(dataFileApi);
		if (loadConfig) {
			await useEnvStore().loadConfiguration();
		}
	};

	beforeEach(() => {
		setActivePinia(createPinia());
		vi.resetAllMocks();
	});

	describe("initialization", () => {
		it("should load configuration and update status accordingly", async () => {
			await setup(false);
			expect(useEnvStore().status).toBe("pending");
			const success = await useEnvStore().loadConfiguration();
			expect(useEnvStore().status).toBe("completed");
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
				SC_THEME: SchulcloudTheme.Default,
			});

			expect(useEnvStore().instituteTitle).toBe("Dataport");
		});

		it("should render brb title when the theme is brb", async () => {
			await setup(true, {
				SC_THEME: SchulcloudTheme.Brb,
			});

			expect(useEnvStore().instituteTitle).toBe(
				"Ministerium für Bildung, Jugend und Sport des Landes Brandenburg"
			);
		});

		it("should render thr title when the theme is thr", async () => {
			await setup(true, {
				SC_THEME: SchulcloudTheme.Thr,
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
				SC_THEME: SchulcloudTheme.Default,
				ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true,
				SC_TITLE: "SomeThing",
			};
			await setup(true, mockData);
			expect(useEnvStore().env).toEqual(mockData);
		});

		it("should request, process and provide env file data.", async () => {
			const mockFileData: FilesStorageConfigResponse = {
				MAX_FILE_SIZE: 1,
				COLLABORA_MAX_FILE_SIZE_IN_BYTES: 2,
			};
			await setup(true, undefined, mockFileData);
			expect(useEnvStore().envFile).toEqual(mockFileData);
		});

		it("should handle error on file configuration gracefully", async () => {
			doMockServerApiData(defaultConfigEnvs);

			mockedFileConfigApi.mockReturnValue({
				publicConfig: vi
					.fn()
					.mockRejectedValue(new Error("File config not available")),
			});

			await useEnvStore().loadConfiguration();
			expect(useEnvStore().status).toEqual("completed");
		});

		it("should handle server configuration failure", async () => {
			mockedServerApi.mockReturnValue({
				serverConfigControllerPublicConfig: vi
					.fn()
					.mockRejectedValue(new Error("Server configuration failure")),
			});

			const success = await useEnvStore().loadConfiguration();
			expect(useEnvStore().status).toEqual("error");
			expect(success).toEqual(false);
		});
	});
});

describe("useEnvConfig", () => {
	beforeAll(() => {
		setActivePinia(createPinia());
	});

	it("should proxy env config as ref from useEnvStore", async () => {
		useEnvStore().$patch({ env: { SC_TITLE: "School" } });
		expect(useEnvConfig().value.SC_TITLE).toEqual("School");
	});
});
