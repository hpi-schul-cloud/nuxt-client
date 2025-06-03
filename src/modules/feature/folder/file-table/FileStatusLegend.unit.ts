import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import FileStatusLegend from "./FileStatusLegend.vue";

describe("FileStatusLegend", () => {
	const setupWrapper = () => {
		const wrapper = mount(FileStatusLegend, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});
		return { wrapper };
	};

	it("renders without crashing", () => {
		const { wrapper } = setupWrapper();

		expect(wrapper.exists()).toBe(true);
	});

	describe("legend-file-status-scan-pending", () => {
		it("should exists", () => {
			const { wrapper } = setupWrapper();

			expect(
				wrapper.find('[data-testid="legend-file-status-scan-pending"]').exists()
			).toBe(true);
		});

		it("should have correct text", () => {
			const { wrapper } = setupWrapper();

			expect(
				wrapper.find('[data-testid="legend-file-status-scan-pending"]').text()
			).toBe("common.file.awaitingScan");
		});

		it("should have correct icon", () => {
			const { wrapper } = setupWrapper();

			const icon = wrapper
				.find('[data-testid="legend-file-status-scan-pending"]')
				.findComponent(".v-icon")
				.exists();
			expect(icon).toBe(true);
		});
	});

	describe("legend-file-status-scan-wont-check", () => {
		it("should exists", () => {
			const { wrapper } = setupWrapper();

			expect(
				wrapper
					.find('[data-testid="legend-file-status-scan-wont-check"]')
					.exists()
			).toBe(true);
		});

		it("should have correct text", () => {
			const { wrapper } = setupWrapper();

			expect(
				wrapper
					.find('[data-testid="legend-file-status-scan-wont-check"]')
					.text()
			).toBe("common.file.scanWontCheck");
		});

		it("should have correct icon", () => {
			const { wrapper } = setupWrapper();

			const icon = wrapper
				.find('[data-testid="legend-file-status-scan-wont-check"]')
				.findComponent(".v-icon")
				.exists();
			expect(icon).toBe(true);
		});
	});

	describe("legend-file-status-scan-error", () => {
		it("should exists", () => {
			const { wrapper } = setupWrapper();

			expect(
				wrapper.find('[data-testid="legend-file-status-scan-error"]').exists()
			).toBe(true);
		});

		it("should have correct text", () => {
			const { wrapper } = setupWrapper();

			expect(
				wrapper.find('[data-testid="legend-file-status-scan-error"]').text()
			).toBe("common.file.scanError");
		});

		it("should have correct icon", () => {
			const { wrapper } = setupWrapper();

			const icon = wrapper
				.find('[data-testid="legend-file-status-scan-error"]')
				.findComponent(".v-icon")
				.exists();
			expect(icon).toBe(true);
		});
	});

	describe("legend-file-status-scan-virus-detected", () => {
		it("should exists", () => {
			const { wrapper } = setupWrapper();

			expect(
				wrapper
					.find('[data-testid="legend-file-status-scan-virus-detected"]')
					.exists()
			).toBe(true);
		});

		it("should have correct text", () => {
			const { wrapper } = setupWrapper();

			expect(
				wrapper
					.find('[data-testid="legend-file-status-scan-virus-detected"]')
					.text()
			).toBe("common.file.virusDetected");
		});

		it("should have correct icon", () => {
			const { wrapper } = setupWrapper();

			const icon = wrapper
				.find('[data-testid="legend-file-status-scan-virus-detected"]')
				.findComponent(".v-icon")
				.exists();
			expect(icon).toBe(true);
		});
	});
});
