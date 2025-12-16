import FileStatistic from "./FileStatistic.vue";
import { FolderAlert } from "./FolderAlert.enum";
import { useFolderAlerts } from "./useFolderAlerts.composable";
import { parentStatisticFactory } from "@@/tests/test-utils/factory/parentStatisticFactory";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import * as FileStorageApi from "@data-file";
import { createMock } from "@golevelup/ts-vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { computed } from "vue";

vi.mock("./useFolderAlerts.composable");

describe("FileStatistic", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("when file statistics are available", () => {
		const setup = () => {
			const statistic = parentStatisticFactory.build({
				fileCount: 3,
				totalSizeInBytes: 3000000,
			});
			const getStatisticByParentId = vi.fn(() => statistic);
			const tryGetParentStatisticFromApi = vi.fn(() => Promise.resolve());
			const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>({
				getStatisticByParentId,
				tryGetParentStatisticFromApi,
			});
			vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValue(fileStorageApiMock);

			vi.mocked(useFolderAlerts).mockReturnValue({
				addAlert: vi.fn(),
				alerts: computed(() => []),
			});

			const wrapper = mount(FileStatistic, {
				props: { elementId: "test-folder-id" },
				global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			});

			return {
				wrapper,
				getStatisticByParentId,
				tryGetParentStatisticFromApi,
				statistic,
			};
		};

		it("should render file count, translation, and human readable size", async () => {
			const { wrapper, statistic } = setup();

			const expectedText = `${statistic.fileCount} common.files ⋅ 2.86 MB`;
			expect(wrapper.text()).toContain(expectedText);
		});
	});

	describe("when file count is 1", () => {
		const setup = () => {
			const statistic = parentStatisticFactory.build({
				fileCount: 1,
				totalSizeInBytes: 2000,
			});
			const getStatisticByParentId = vi.fn(() => statistic);
			const tryGetParentStatisticFromApi = vi.fn(() => Promise.resolve());
			const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>({
				getStatisticByParentId,
				tryGetParentStatisticFromApi,
			});
			vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValue(fileStorageApiMock);

			vi.mocked(useFolderAlerts).mockReturnValue({
				addAlert: vi.fn(),
				alerts: computed(() => []),
			});

			const wrapper = mount(FileStatistic, {
				props: { elementId: "test-folder-id" },
				global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			});
			return {
				wrapper,
				getStatisticByParentId,
				tryGetParentStatisticFromApi,
				statistic,
			};
		};

		it("should use the singular translation", async () => {
			const { wrapper, statistic } = setup();

			const expectedText = `${statistic.fileCount} common.file ⋅ 1.95 KB`;
			expect(wrapper.text()).toContain(expectedText);
		});
	});

	describe("when file statistics are not available", () => {
		const setup = () => {
			const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
			vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValue(fileStorageApiMock);
			fileStorageApiMock.tryGetParentStatisticFromApi.mockRejectedValueOnce(new Error());
			fileStorageApiMock.getStatisticByParentId.mockReturnValueOnce(undefined);

			const addAlertMock = vi.fn();
			vi.mocked(useFolderAlerts).mockReturnValue({
				addAlert: addAlertMock,
				alerts: computed(() => []),
			});

			mount(FileStatistic, {
				props: { elementId: "test-folder-id" },
				global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			});

			return {
				addAlertMock,
			};
		};

		it("should add an alert", async () => {
			const { addAlertMock } = setup();
			await flushPromises();

			expect(addAlertMock).toHaveBeenCalledWith(FolderAlert.FILE_STORAGE_ERROR);
		});
	});
});
