import { PreviewStatus } from "@/fileStorageApi/v3";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import FileAlert from "./FileAlert.vue";

describe("FileAlert", () => {
	const mount = (previewStatus: PreviewStatus) => {
		document.body.setAttribute("data-app", "true");

		const wrapper = shallowMount(FileAlert, {
			propsData: { previewStatus },
			...createComponentMocks({ i18n: true }),
		});

		return {
			wrapper,
		};
	};

	describe("When preview status is AWAITING_SCAN_STATUS", () => {
		const setup = () => {
			const { wrapper } = mount(PreviewStatus.AWAITING_SCAN_STATUS);

			return {
				wrapper,
			};
		};

		it("should pass correct color to v-alert", () => {
			const { wrapper } = setup();
			const color = wrapper.find("v-alert-stub").attributes("color");

			expect(color).toBe("info");
		});

		it("should pass correct icon to v-alert", () => {
			const { wrapper } = setup();

			const icon = wrapper.find("v-alert-stub").attributes("icon");

			expect(icon).toBe("$info");
		});

		it("should display correct text", () => {
			const { wrapper } = setup();

			const text = wrapper.find("v-alert-stub").text();

			expect(text).toContain(
				wrapper.vm.$t("components.cardElement.fileElement.awaitingScan")
			);
		});

		it("should display correct actionText", () => {
			const { wrapper } = setup();

			const text = wrapper.find("v-alert-stub").text();

			expect(text).toContain(
				wrapper.vm.$t("components.cardElement.fileElement.reloadStatus")
			);
		});

		describe("When reload is clicked", () => {
			it("should emit on-status-reload", () => {
				const { wrapper } = setup();

				wrapper.find("a").trigger("click");

				expect(wrapper.emitted("on-status-reload")).toBeTruthy();
			});
		});
	});

	describe("When preview status is PREVIEW_NOT_POSSIBLE_SCAN_STATUS_ERROR", () => {
		const setup = () => {
			const { wrapper } = mount(
				PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_ERROR
			);

			return {
				wrapper,
			};
		};

		it("should pass correct color to v-alert", () => {
			const { wrapper } = setup();

			const color = wrapper.find("v-alert-stub").attributes("color");

			expect(color).toBe("warning");
		});

		it("should pass correct icon to v-alert", () => {
			const { wrapper } = setup();

			const icon = wrapper.find("v-alert-stub").attributes("icon");

			expect(icon).toBe("$warning");
		});

		it("should display correct text", () => {
			const { wrapper } = setup();

			const text = wrapper.find("v-alert-stub").text();

			expect(text).toContain(
				wrapper.vm.$t("components.cardElement.fileElement.scanError")
			);
		});

		it("should not display reload link", () => {
			const { wrapper } = setup();

			const text = wrapper.find("v-alert-stub").text();

			expect(text).not.toContain(
				wrapper.vm.$t("components.cardElement.fileElement.reloadStatus")
			);
		});
	});

	describe("When preview status is PREVIEW_NOT_POSSIBLE_SCAN_STATUS_WONT_CHECK", () => {
		const setup = () => {
			const { wrapper } = mount(
				PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_WONT_CHECK
			);

			return {
				wrapper,
			};
		};

		it("should pass correct color to v-alert", () => {
			const { wrapper } = setup();

			const color = wrapper.find("v-alert-stub").attributes("color");

			expect(color).toBe("info");
		});

		it("should pass correct icon to v-alert", () => {
			const { wrapper } = setup();

			const icon = wrapper.find("v-alert-stub").attributes("icon");

			expect(icon).toBe("$info");
		});

		it("should display correct text", () => {
			const { wrapper } = setup();

			const text = wrapper.find("v-alert-stub").text();

			expect(text).toContain(
				wrapper.vm.$t("components.cardElement.fileElement.scanWontCheck")
			);
		});

		it("should not display reload link", () => {
			const { wrapper } = setup();

			const text = wrapper.find("v-alert-stub").text();

			expect(text).not.toContain(
				wrapper.vm.$t("components.cardElement.fileElement.reloadStatus")
			);
		});
	});

	describe("When preview status is PREVIEW_NOT_POSSIBLE_SCAN_STATUS_BLOCKED", () => {
		const setup = () => {
			const { wrapper } = mount(
				PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_BLOCKED
			);

			return {
				wrapper,
			};
		};

		it("should pass correct color to v-alert", () => {
			const { wrapper } = setup();

			const color = wrapper.find("v-alert-stub").attributes("color");

			expect(color).toBe("error");
		});

		it("should pass correct icon to v-alert", () => {
			const { wrapper } = setup();

			const icon = wrapper.find("v-alert-stub").attributes("icon");

			expect(icon).toBe("$error");
		});

		it("should display correct text", () => {
			const { wrapper } = setup();

			const text = wrapper.find("v-alert-stub").text();

			expect(text).toContain(
				wrapper.vm.$t("components.cardElement.fileElement.virusDetected")
			);
		});

		it("should not display reload link", () => {
			const { wrapper } = setup();

			const text = wrapper.find("v-alert-stub").text();

			expect(text).not.toContain(
				wrapper.vm.$t("components.cardElement.fileElement.reloadStatus")
			);
		});
	});
});
