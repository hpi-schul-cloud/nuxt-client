import { downloadFile } from "@/utils/fileHelper";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { nextTick, ref } from "vue";
import { VRow, VToolbarTitle } from "vuetify/lib/components/index.mjs";
import {
	LightBoxContentType,
	LightBoxOptions,
	useLightBox,
} from "./LightBox.composable";
import LightBox from "./LightBox.vue";
import { PreviewImage } from "@ui-preview-image";
import { AudioPlayer } from "@ui-audio-player";

jest.mock("./LightBox.composable");
jest.mock("@/utils/fileHelper");

const mockedUseLightBox = jest.mocked(useLightBox);

describe("LightBox", () => {
	const setup = (props: {
		isLightBoxOpen?: boolean;
		type?: LightBoxContentType;
		downloadUrl?: string;
		previewUrl?: string;
		alt?: string;
		name?: string;
	}) => {
		const close = jest.fn();
		const isLightBoxOpen = ref(props.isLightBoxOpen ?? true);
		const lightBoxOptions = ref<LightBoxOptions>({
			type: props.type ?? LightBoxContentType.IMAGE,
			downloadUrl: props.downloadUrl ?? "test-downloadUrl",
			name: props.name ?? "test-name",
			previewUrl: props.previewUrl ?? "test-previewUrl",
			alt: props.alt ?? "test-alt",
		});

		const mockedDownloadFile = jest.mocked(downloadFile).mockReturnValueOnce();

		mockedUseLightBox.mockReturnValue({
			close: close,
			isLightBoxOpen,
			lightBoxOptions,
			open: jest.fn(),
		});

		const wrapper = mount(LightBox, {
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

	describe("when lightbox is closed", () => {
		it("should not render it", () => {
			const { wrapper } = setup({ isLightBoxOpen: false });

			const closeButton = wrapper.findComponent(
				"[data-testid=light-box-close-btn]"
			);

			expect(closeButton.exists()).toBe(false);
		});
	});

	describe("when lightbox is open", () => {
		it("should show close button", () => {
			const { wrapper } = setup({});

			const closeButton = wrapper.findComponent(
				"[data-testid=light-box-close-btn]"
			);

			expect(closeButton.exists()).toBe(true);
		});

		it("should show file name", () => {
			const { lightBoxOptions, wrapper } = setup({});

			const title = wrapper.findComponent(VToolbarTitle);

			expect(title.text()).toEqual(lightBoxOptions.value.name);
		});

		it("should show download button", () => {
			const { wrapper } = setup({});

			const downloadButton = wrapper.findComponent(
				"[data-testid=light-box-download-btn]"
			);

			expect(downloadButton.exists()).toBe(true);
		});

		describe("when close button is clicked", () => {
			it("should call close function", async () => {
				const { close, wrapper } = setup({});

				const closeButton = wrapper.findComponent(
					"[data-testid=light-box-close-btn]"
				);
				await closeButton.trigger("click");

				expect(close).toHaveBeenCalled();
			});
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

		describe("when Escape key is pressed", () => {
			it("should call close function", async () => {
				const { close } = setup({});

				const event = new KeyboardEvent("keydown", { key: "Escape" });
				window.dispatchEvent(event);
				await nextTick();

				expect(close).toHaveBeenCalled();
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

		describe("when content is an image", () => {
			it("should render preview image with correct props", () => {
				const { lightBoxOptions, wrapper } = setup({});

				const previewImage = wrapper.findComponent(PreviewImage);

				expect(previewImage.exists()).toBe(true);
				expect(previewImage.props("src")).toEqual(
					lightBoxOptions.value.previewUrl
				);
				expect(previewImage.props("alt")).toEqual(lightBoxOptions.value.alt);
			});
		});

		describe("when content is an audio", () => {
			it("should render audio player with correct props", () => {
				const { lightBoxOptions, wrapper } = setup({
					type: LightBoxContentType.AUDIO,
				});

				const audioPlayer = wrapper.findComponent(AudioPlayer);

				expect(audioPlayer.exists()).toBe(true);
				expect(audioPlayer.props("src")).toEqual(
					lightBoxOptions.value.downloadUrl
				);
			});
		});
	});
});
