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

	describe("file-status-scan-pending", () => {
		it("should exists", () => {
			const { wrapper } = setupWrapper();

			expect(
				wrapper.find('[data-testid="file-status-scan-pending"]').exists()
			).toBe(true);
		});

		it("should have correct text", () => {
			const { wrapper } = setupWrapper();

			expect(
				wrapper.find('[data-testid="file-status-scan-pending"]').text()
			).toBe("components.cardElement.fileElement.awaitingScan");
		});

		it("should have correct icon", () => {
			const { wrapper } = setupWrapper();

			const icon = wrapper
				.find('[data-testid="file-status-scan-pending"]')
				.findComponent(".v-icon")
				.exists();
			expect(icon).toBe(true);
		});
	});

	describe("file-status-scan-wont-check", () => {
		it("should exists", () => {
			const { wrapper } = setupWrapper();

			expect(
				wrapper.find('[data-testid="file-status-scan-wont-check"]').exists()
			).toBe(true);
		});

		it("should have correct text", () => {
			const { wrapper } = setupWrapper();

			expect(
				wrapper.find('[data-testid="file-status-scan-wont-check"]').text()
			).toBe("components.cardElement.fileElement.scanWontCheck");
		});

		it("should have correct icon", () => {
			const { wrapper } = setupWrapper();

			const icon = wrapper
				.find('[data-testid="file-status-scan-wont-check"]')
				.findComponent(".v-icon")
				.exists();
			expect(icon).toBe(true);
		});
	});

	describe("file-status-scan-error", () => {
		it("should exists", () => {
			const { wrapper } = setupWrapper();

			expect(
				wrapper.find('[data-testid="file-status-scan-error"]').exists()
			).toBe(true);
		});

		it("should have correct text", () => {
			const { wrapper } = setupWrapper();

			expect(
				wrapper.find('[data-testid="file-status-scan-error"]').text()
			).toBe("components.cardElement.fileElement.scanError");
		});

		it("should have correct icon", () => {
			const { wrapper } = setupWrapper();

			const icon = wrapper
				.find('[data-testid="file-status-scan-error"]')
				.findComponent(".v-icon")
				.exists();
			expect(icon).toBe(true);
		});
	});

	describe("file-status-scan-virus-detected", () => {
		it("should exists", () => {
			const { wrapper } = setupWrapper();

			expect(
				wrapper.find('[data-testid="file-status-scan-virus-detected"]').exists()
			).toBe(true);
		});

		it("should have correct text", () => {
			const { wrapper } = setupWrapper();

			expect(
				wrapper.find('[data-testid="file-status-scan-virus-detected"]').text()
			).toBe("components.cardElement.fileElement.virusDetected");
		});

		it("should have correct icon", () => {
			const { wrapper } = setupWrapper();

			const icon = wrapper
				.find('[data-testid="file-status-scan-virus-detected"]')
				.findComponent(".v-icon")
				.exists();
			expect(icon).toBe(true);
		});
	});
});
