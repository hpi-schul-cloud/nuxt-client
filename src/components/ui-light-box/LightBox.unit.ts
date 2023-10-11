import { downloadFile } from "@/utils/fileHelper";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mdiClose, mdiFileDocumentOutline, mdiTrayArrowDown } from "@mdi/js";
import { MountOptions, shallowMount } from "@vue/test-utils";
import Vue, { nextTick, ref } from "vue";
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
		document.body.setAttribute("data-app", "true");

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

		const wrapper = shallowMount(LightBox as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
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

			const src = wrapper.find("img").attributes("src");

			expect(src).toEqual(lightBoxOptions.value.previewUrl);
		});

		it("should set image alt correctly", () => {
			const { lightBoxOptions, wrapper } = setup({});

			const alt = wrapper.find("img").attributes("alt");

			expect(alt).toEqual(lightBoxOptions.value.alt);
		});

		it("should show close button", () => {
			const { wrapper } = setup({});

			const closeButton = wrapper.findAllComponents({ name: "v-btn" }).at(0);

			expect(closeButton.text()).toEqual(mdiClose);
		});

		describe("when close button is clicked", () => {
			it("should call close function", async () => {
				const { close, wrapper } = setup({});

				const closeButton = wrapper.findAllComponents({ name: "v-btn" }).at(0);
				await closeButton.vm.$emit("click");

				expect(close).toBeCalled();
			});
		});

		describe("when file name is set", () => {
			it("should show toolbar title", () => {
				const { wrapper } = setup({});

				const toolbarTitle = wrapper.findComponent({ name: "v-toolbar-title" });

				expect(toolbarTitle.exists()).toBe(true);
			});

			it("should show file icon", () => {
				const { wrapper } = setup({});

				const fileIcon = wrapper.find("contentelementtitleicon-stub");

				expect(fileIcon.exists()).toBe(true);
				expect(fileIcon.attributes("icon")).toEqual(mdiFileDocumentOutline);
			});

			it("should show file name", () => {
				const { wrapper } = setup({});

				const title = wrapper.find("contentelementtitle-stub");

				expect(title.exists()).toBe(true);
			});

			it("should set file name correctly", () => {
				const { lightBoxOptions, wrapper } = setup({});

				const title = wrapper.find("contentelementtitle-stub");

				expect(title.text()).toEqual(lightBoxOptions.value.name);
			});
		});

		describe("when file name is empty", () => {
			it("should not show toolbar title", () => {
				const { wrapper } = setup({ name: "" });

				const toolbarTitle = wrapper.findComponent({ name: "v-toolbar-title" });

				expect(toolbarTitle.exists()).toBe(false);
			});
		});

		describe("when download url is set", () => {
			it("should show download button", () => {
				const { wrapper } = setup({});

				const downloadButton = wrapper
					.findAllComponents({ name: "v-btn" })
					.at(1);

				expect(downloadButton.text()).toEqual(mdiTrayArrowDown);
			});

			describe("when download button is clicked", () => {
				it("should call downloadFile function", async () => {
					const { lightBoxOptions, mockedDownloadFile, wrapper } = setup({});

					const downloadButton = wrapper
						.findAllComponents({ name: "v-btn" })
						.at(1);
					await downloadButton.vm.$emit("click");

					expect(mockedDownloadFile).toBeCalledWith(
						lightBoxOptions.value.downloadUrl,
						lightBoxOptions.value.name
					);
				});
			});
		});

		describe("when download url is empty", () => {
			it("should not show download button", () => {
				const { wrapper } = setup({ downloadUrl: "" });

				const buttons = wrapper.findAllComponents({ name: "v-btn" });

				expect(buttons).toHaveLength(1);
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

			const overlay = wrapper.findComponent({ name: "v-overlay" });
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
