import FileStatistic from "./FileStatistic.vue";
import { parentStatisticFactory } from "@@/tests/test-utils/factory/parentStatisticFactory";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

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

			const wrapper = mount(FileStatistic, {
				props: { fileStatistics: statistic },
				global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			});

			return {
				wrapper,
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

			const wrapper = mount(FileStatistic, {
				props: { fileStatistics: statistic },
				global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			});
			return {
				wrapper,
				statistic,
			};
		};

		it("should use the singular translation", async () => {
			const { wrapper, statistic } = setup();

			const expectedText = `${statistic.fileCount} common.file ⋅ 1.95 KB`;
			expect(wrapper.text()).toContain(expectedText);
		});
	});
});
