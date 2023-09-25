import { downloadFile } from "@/utils/fileHelper";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount } from "@vue/test-utils";
import Vue, { nextTick, ref } from "vue";
import { useInternalLightBox } from "./LightBox.composable";
import LightBox from "./LightBox.vue";

jest.mock("./LightBox.composable");
jest.mock("@/utils/fileHelper");

const mockedUseInternalLightBox = jest.mocked(useInternalLightBox);

describe("LightBox", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const close = jest.fn();
		const isLightBoxOpen = ref(true);
		const lightBoxOptions = ref({
			url: "test-url",
			previewUrl: "test-previewUrl",
			alt: "test-alt",
			name: "test-name",
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
			const { wrapper } = setup();

			const lightBox = wrapper.findComponent(LightBox);

			expect(lightBox.exists()).toBe(true);
		});

		it("should set image src correctly", () => {
			const { lightBoxOptions, wrapper } = setup();

			const src = wrapper.find("img").attributes("src");

			expect(src).toEqual(lightBoxOptions.value.previewUrl);
		});

		it("should set image alt correctly", () => {
			const { lightBoxOptions, wrapper } = setup();

			const alt = wrapper.find("img").attributes("alt");

			expect(alt).toEqual(lightBoxOptions.value.alt);
		});

		it("should set file name correctly", () => {
			const { lightBoxOptions, wrapper } = setup();

			const name = wrapper.find(".subtitle-1").text();

			expect(name).toEqual(lightBoxOptions.value.name);
		});
	});

	describe("when Escape button is pressed", () => {
		it("should call close function", async () => {
			const { close } = setup();

			// simulate keypress on document
			const event = new KeyboardEvent("keydown", { key: "Escape" });
			window.dispatchEvent(event);
			await nextTick();

			expect(close).toBeCalled();
		});
	});

	describe("when area outside of the image is clicked", () => {
		it("should call close function", async () => {
			const { close, wrapper } = setup();

			const cardText = wrapper.findComponent({ name: "v-card-text" });
			await cardText.trigger("click");

			expect(close).toBeCalled();
		});
	});

	describe("when close button on the toolbar is clicked", () => {
		it("should call close function", async () => {
			const { close, wrapper } = setup();

			const button = wrapper.findAllComponents({ name: "v-btn" }).at(0);
			await button.vm.$emit("click");

			expect(close).toBeCalled();
		});
	});

	describe("when download button on the toolbar is clicked", () => {
		it("should call downloadFile function", async () => {
			const { lightBoxOptions, mockedDownloadFile, wrapper } = setup();

			const button = wrapper.findAllComponents({ name: "v-btn" }).at(1);
			await button.vm.$emit("click");

			expect(mockedDownloadFile).toBeCalledWith(
				lightBoxOptions.value.url,
				lightBoxOptions.value.name
			);
		});
	});

	describe("when isLightBoxOpen is set to false", () => {
		it("should hide the LightBox", async () => {
			const { isLightBoxOpen, wrapper } = setup();

			isLightBoxOpen.value = false;
			const lightBox = wrapper.findComponent(LightBox);

			expect(lightBox.isVisible()).toBe(true);
		});
	});
});
