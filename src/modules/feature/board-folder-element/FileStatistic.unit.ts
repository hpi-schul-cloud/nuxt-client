import { parentStatisticFactory } from "@@/tests/test-utils/factory/parentStatisticFactory";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import * as FileStorageApi from "@data-file";
import { createMock } from "@golevelup/ts-jest";
import { describe, expect, it, jest } from "@jest/globals";
import { mount } from "@vue/test-utils";
import FileStatistic from "./FileStatistic.vue";

describe("FileStatistic", () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("when file statistics are available", () => {
		const setup = () => {
			const statistic = parentStatisticFactory.build({
				fileCount: 3,
				totalSizeInBytes: 3000000,
			});
			const getStatisticByParentId = jest.fn(() => statistic);
			const tryGetParentStatisticFromApi = jest.fn(() => Promise.resolve());
			const fileStorageApiMock = createMock<
				ReturnType<typeof FileStorageApi.useFileStorageApi>
			>({
				getStatisticByParentId,
				tryGetParentStatisticFromApi,
			});
			jest
				.spyOn(FileStorageApi, "useFileStorageApi")
				.mockReturnValue(fileStorageApiMock);

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
			const getStatisticByParentId = jest.fn(() => statistic);
			const tryGetParentStatisticFromApi = jest.fn(() => Promise.resolve());
			const fileStorageApiMock = createMock<
				ReturnType<typeof FileStorageApi.useFileStorageApi>
			>({
				getStatisticByParentId,
				tryGetParentStatisticFromApi,
			});
			jest
				.spyOn(FileStorageApi, "useFileStorageApi")
				.mockReturnValue(fileStorageApiMock);

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
			const getStatisticByParentId = jest.fn(() => undefined);
			const tryGetParentStatisticFromApi = jest.fn(() => Promise.resolve());
			const fileStorageApiMock = createMock<
				ReturnType<typeof FileStorageApi.useFileStorageApi>
			>({
				getStatisticByParentId,
				tryGetParentStatisticFromApi,
			});
			jest
				.spyOn(FileStorageApi, "useFileStorageApi")
				.mockReturnValue(fileStorageApiMock);

			const wrapper = mount(FileStatistic, {
				props: { elementId: "test-folder-id" },
				global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			});

			return {
				wrapper,
				getStatisticByParentId,
				tryGetParentStatisticFromApi,
			};
		};

		it("should not render any statistic information", async () => {
			const { wrapper } = setup();

			expect(wrapper.text()).toBe("");
		});
	});
});
