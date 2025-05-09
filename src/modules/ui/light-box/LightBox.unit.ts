import { downloadFile } from "@/utils/fileHelper";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mdiClose, mdiTrayArrowDown } from "@icons/material";
import { PreviewImage } from "@ui-preview-image";
import { shallowMount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import {
	VProgressCircular,
	VRow,
	VToolbarTitle,
} from "vuetify/lib/components/index.mjs";
import { LightBoxOptions, useInternalLightBox } from "./LightBox.composable";
import LightBox from "./LightBox.vue";

jest.mock("./LightBox.composable");
jest.mock("@/utils/fileHelper");

const mockedUseInternalLightBox = jest.mocked(useInternalLightBox);

describe("LightBox", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	const setup = (props: {
		downloadUrl?: string;
		previewUrl?: string;
		alt?: string;
		name?: string;
	}) => {
		const close = jest.fn();
		const isLightBoxOpen = ref(true);
		const lightBoxOptions = ref<LightBoxOptions>({
			downloadUrl: props.downloadUrl ?? "test-downloadUrl",
			previewUrl: props.previewUrl ?? "test-previewUrl",
			alt: props.alt ?? "test-alt",
			name: props.name ?? "test-name",
		});

		const mockedDownloadFile = jest.mocked(downloadFile).mockReturnValueOnce();

		mockedUseInternalLightBox.mockReturnValue({
			close: close,
			isLightBoxOpen: isLightBoxOpen,
			lightBoxOptions: lightBoxOptions,
			openInternal: jest.fn(),
		});

		const wrapper = shallowMount(LightBox, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

		return {
			close,
			isLightBoxOpen,
			lightBoxOptions,
			mockedDownloadFile,
			wrapper,
		};
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({});

			const lightBox = wrapper.findComponent(LightBox);

			expect(lightBox.exists()).toBe(true);
		});

		it("should set image src correctly", () => {
			const { lightBoxOptions, wrapper } = setup({});

			const src = wrapper.findComponent(PreviewImage).attributes("src");

			expect(src).toEqual(lightBoxOptions.value.previewUrl);
		});

		it("should set image alt correctly", () => {
			const { lightBoxOptions, wrapper } = setup({});

			const alt = wrapper.findComponent(PreviewImage).attributes("alt");

			expect(alt).toEqual(lightBoxOptions.value.alt);
		});

		it("should show close button", () => {
			const { wrapper } = setup({});

			const closeButton = wrapper.findComponent(
				"[data-testid=light-box-close-btn]"
			);

			expect(closeButton.attributes().icon).toEqual(mdiClose);
			expect(closeButton.attributes("aria-label")).toEqual(
				"common.labels.close"
			);
		});

		describe("when close button is clicked", () => {
			it("should call close function", async () => {
				const { close, wrapper } = setup({});

				const closeButton = wrapper.findComponent(
					"[data-testid=light-box-close-btn]"
				);
				await closeButton.trigger("click");

				expect(close).toBeCalled();
			});
		});

		describe("when file name is set", () => {
			it("should show toolbar title", () => {
				const { wrapper } = setup({ name: "Esmeralda" });

				const toolbarTitle = wrapper.findComponent(VToolbarTitle);

				expect(toolbarTitle.exists()).toBe(true);
			});

			it("should show file name", () => {
				const { wrapper } = setup({ name: "Esmeralda" });

				const title = wrapper.findComponent(VToolbarTitle);

				expect(title.exists()).toBe(true);
			});

			it("should set file name correctly", () => {
				const { lightBoxOptions, wrapper } = setup({});

				const title = wrapper.findComponent(VToolbarTitle);

				expect(title.text()).toEqual(lightBoxOptions.value.name);
			});
		});

		describe("when file name is empty", () => {
			it("should not show toolbar title", () => {
				const { wrapper } = setup({ name: "" });

				const toolbarTitle = wrapper.findComponent(VToolbarTitle);

				expect(toolbarTitle.exists()).toBe(false);
			});
		});

		describe("when download url is set", () => {
			it("should show download button", () => {
				const { wrapper } = setup({});

				const downloadButton = wrapper.findComponent(
					"[data-testid=light-box-download-btn]"
				);

				expect(downloadButton.attributes().icon).toEqual(mdiTrayArrowDown);
				expect(downloadButton.attributes("aria-label")).toEqual(
					"components.board.action.download"
				);
			});

			describe("when download button is clicked", () => {
				it("should call downloadFile function", async () => {
					const { lightBoxOptions, mockedDownloadFile, wrapper } = setup({});

					const downloadButton = wrapper.findComponent(
						"[data-testid=light-box-download-btn]"
					);
					await downloadButton.trigger("click");

					expect(mockedDownloadFile).toHaveBeenCalledWith(
						lightBoxOptions.value.downloadUrl,
						lightBoxOptions.value.name
					);
				});
			});
		});

		describe("when download url is empty", () => {
			it("should not show download button", () => {
				const { wrapper } = setup({ downloadUrl: "" });

				const downloadButton = wrapper.findComponent(
					"[data-testid=light-box-download-btn]"
				);
				expect(downloadButton.exists()).toBe(false);
			});
		});

		describe("when image emits onLoad", () => {
			it("should hide loading spinner", async () => {
				const { wrapper } = setup({});

				const image = wrapper.findComponent(PreviewImage);
				image.trigger("load");

				await wrapper.vm.$nextTick();

				const loadingSpinner = wrapper.findComponent(VProgressCircular);

				expect(loadingSpinner.exists()).toBe(false);
			});
		});
	});

	describe("when Escape button is pressed", () => {
		it("should call close function", async () => {
			const { close } = setup({});

			// simulate keypress on document
			const event = new KeyboardEvent("keydown", { key: "Escape" });
			window.dispatchEvent(event);
			await nextTick();

			expect(close).toBeCalled();
		});
	});

	describe("when area outside of the image is clicked", () => {
		it("should call close function", async () => {
			const { close, wrapper } = setup({});

			const overlay = wrapper.findComponent(VRow);
			await overlay.vm.$emit("click");

			expect(close).toBeCalled();
		});
	});

	describe("when isLightBoxOpen is set to false", () => {
		it("should hide the LightBox", async () => {
			const { isLightBoxOpen, wrapper } = setup({});

			isLightBoxOpen.value = false;
			const lightBox = wrapper.findComponent(LightBox);

			expect(lightBox.isVisible()).toBe(true);
		});
	});
});
