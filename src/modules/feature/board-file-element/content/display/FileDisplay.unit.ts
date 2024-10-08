import { fileElementResponseFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";
import AudioDisplay from "./audio-display/AudioDisplay.vue";
import FileDisplay from "./FileDisplay.vue";
import ImageDisplay from "./image-display/ImageDisplay.vue";
import PdfDisplay from "./pdf-display/PdfDisplay.vue";
import VideoDisplay from "./video-display/VideoDisplay.vue";
import { PreviewStatus } from "@/fileStorageApi/v3";

describe("FileDisplay", () => {
	describe("when previewUrl is defined", () => {
		describe("when mimeType is not a video type", () => {
			const setup = () => {
				const element = fileElementResponseFactory.build();
				const props = {
					fileProperties: {
						name: "test",
						size: 100,
						url: "test",
						previewUrl: "test",
						previewStatus: PreviewStatus.PREVIEW_POSSIBLE,
						isDownloadAllowed: true,
						element,
						mimeType: "test",
					},
					isEditMode: true,
					showMenu: true,
				};

				const wrapper = shallowMount(FileDisplay, {
					props,
					global: { plugins: [createTestingVuetify(), createTestingI18n()] },
				});

				return {
					wrapper,
					fileNameProp: props.fileProperties.name,
					previewUrlProp: props.fileProperties.previewUrl,
					srcProp: props.fileProperties.url,
				};
			};

			it("should be found in dom", () => {
				const { wrapper } = setup();

				const fileDisplay = wrapper.findComponent(FileDisplay);

				expect(fileDisplay.exists()).toBe(true);
			});

			it("should pass correct props to image display component", async () => {
				const { wrapper, fileNameProp, previewUrlProp, srcProp } = setup();

				const props = wrapper.findComponent(ImageDisplay).attributes();
				expect(props.name).toBe(fileNameProp);
				expect(props.previewsrc).toBe(previewUrlProp);
				expect(props.src).toBe(srcProp);
				expect(props.iseditmode).toBe("true");
				expect(props.element).toBeDefined();
			});
		});

		describe("when mimeType is a video type", () => {
			const setup = () => {
				const element = fileElementResponseFactory.build();
				const props = {
					fileProperties: {
						name: "test",
						size: 100,
						url: "test",
						previewUrl: "test",
						previewStatus: PreviewStatus.PREVIEW_POSSIBLE,
						isDownloadAllowed: true,
						element,
						mimeType: "video/mp4",
					},
					isEditMode: true,
					showMenu: true,
				};

				const wrapper = shallowMount(FileDisplay, {
					props,
					global: { plugins: [createTestingVuetify(), createTestingI18n()] },
				});

				return {
					wrapper,
					fileNameProp: props.fileProperties.name,
					previewUrlProp: props.fileProperties.previewUrl,
					srcProp: props.fileProperties.url,
				};
			};

			it("should be found in dom", () => {
				const { wrapper } = setup();

				const fileDisplay = wrapper.findComponent(FileDisplay);

				expect(fileDisplay.exists()).toBe(true);
			});

			it("should pass correct props to image display component", () => {
				const { wrapper, fileNameProp, previewUrlProp, srcProp } = setup();

				const props = wrapper.findComponent(ImageDisplay).attributes();

				expect(props.name).toBe(fileNameProp);
				expect(props.previewsrc).toBe(previewUrlProp);
				expect(props.src).toBe(srcProp);
				expect(props.iseditmode).toBe("true");
				expect(props.element).toBeDefined();
			});
		});

		describe("when mimeType is pdf type", () => {
			const setup = () => {
				const element = fileElementResponseFactory.build();
				const props = {
					fileProperties: {
						name: "test",
						size: 100,
						url: "test",
						previewUrl: "previewUrl",
						previewStatus: PreviewStatus.PREVIEW_POSSIBLE,
						isDownloadAllowed: true,
						element,
						mimeType: "application/pdf",
					},
					isEditMode: true,
					showMenu: true,
				};

				const wrapper = shallowMount(FileDisplay, {
					props,
					global: { plugins: [createTestingVuetify(), createTestingI18n()] },
				});

				return {
					wrapper,
					fileNameProp: props.fileProperties.name,
					previewUrlProp: props.fileProperties.previewUrl,
					url: props.fileProperties.url,
					srcProp: props.fileProperties.url,
				};
			};

			it("should pass correct props to pdf display component", () => {
				const { wrapper, fileNameProp, previewUrlProp, srcProp } = setup();

				const props = wrapper.findComponent(PdfDisplay).attributes();

				expect(props.name).toBe(fileNameProp);
				expect(props.previewsrc).toBe(previewUrlProp);
				expect(props.src).toBe(srcProp);
				expect(props.element).toBeDefined();
			});
		});
	});

	describe("when previewUrl is undefined", () => {
		describe("when mimeType is a video type", () => {
			const setup = () => {
				const element = fileElementResponseFactory.build();
				const props = {
					fileProperties: {
						name: "test",
						size: 100,
						url: "test",
						previewUrl: undefined,
						previewStatus: PreviewStatus.PREVIEW_POSSIBLE,
						isDownloadAllowed: true,
						element,
						mimeType: "video/mp4",
					},
					isEditMode: true,
					showMenu: true,
				};

				const wrapper = shallowMount(FileDisplay, {
					props,
					global: { plugins: [createTestingVuetify(), createTestingI18n()] },
				});

				return {
					wrapper,
					fileNameProp: props.fileProperties.name,
					previewUrlProp: props.fileProperties.previewUrl,
					url: props.fileProperties.url,
				};
			};

			it("should render video display component", async () => {
				const { wrapper } = setup();

				const videoDisplay = wrapper.findComponent(VideoDisplay);

				expect(videoDisplay.exists()).toBe(true);
			});

			it("should pass correct props to video display component", () => {
				const { wrapper, fileNameProp, url } = setup();

				const props = wrapper.findComponent(VideoDisplay).attributes();

				expect(props.src).toBe(url);
				expect(props.name).toBe(fileNameProp);
			});
		});

		describe("when mimeType is a audio type", () => {
			const setup = () => {
				const element = fileElementResponseFactory.build();
				const props = {
					fileProperties: {
						name: "test",
						size: 100,
						url: "test",
						previewStatus: PreviewStatus.PREVIEW_POSSIBLE,
						isDownloadAllowed: true,
						element,
						mimeType: "audio/mp3",
					},
					isEditMode: true,
					showMenu: true,
				};

				const wrapper = shallowMount(FileDisplay, {
					props,
					global: { plugins: [createTestingVuetify(), createTestingI18n()] },
				});

				return {
					wrapper,
					fileNameProp: props.fileProperties.name,
					srcProp: props.fileProperties.url,
				};
			};

			it("should be found in dom", () => {
				const { wrapper } = setup();

				const fileDisplay = wrapper.findComponent(FileDisplay);

				expect(fileDisplay.exists()).toBe(true);
			});

			it("should pass correct props to audio display component", () => {
				const { wrapper, srcProp } = setup();

				const props = wrapper.findComponent(AudioDisplay).attributes();

				expect(props.src).toBe(srcProp);
			});
		});

		describe("when mimeType is pdf type", () => {
			const setup = () => {
				const element = fileElementResponseFactory.build();
				const props = {
					fileProperties: {
						name: "test",
						size: 100,
						url: "test",
						previewUrl: undefined,
						previewStatus: PreviewStatus.PREVIEW_POSSIBLE,
						isDownloadAllowed: true,
						element,
						mimeType: "application/pdf",
					},
					isEditMode: true,
					showMenu: true,
				};

				const wrapper = shallowMount(FileDisplay, {
					props,
					global: { plugins: [createTestingVuetify(), createTestingI18n()] },
				});

				return {
					wrapper,
					fileNameProp: props.fileProperties.name,
					previewUrlProp: props.fileProperties.previewUrl,
					url: props.fileProperties.url,
					srcProp: props.fileProperties.url,
				};
			};

			it("should not render pdf display", () => {
				const { wrapper } = setup();

				const pdfDisplay = wrapper.findComponent(PdfDisplay);

				expect(pdfDisplay.exists()).toBe(false);
			});
		});

		describe("when mimeType is not a video or audio type", () => {
			const setup = () => {
				const element = fileElementResponseFactory.build();
				const props = {
					fileProperties: {
						name: "test",
						size: 100,
						url: "test",
						previewUrl: undefined,
						previewStatus: PreviewStatus.PREVIEW_POSSIBLE,
						isDownloadAllowed: true,
						element,
						mimeType: "test",
					},
					isEditMode: true,
					showMenu: true,
				};

				const wrapper = shallowMount(FileDisplay, {
					props,
					global: { plugins: [createTestingVuetify(), createTestingI18n()] },
				});

				return {
					wrapper,
				};
			};

			it("should not render image display component", () => {
				const { wrapper } = setup();

				const imageDisplay = wrapper.findComponent(ImageDisplay);

				expect(imageDisplay.exists()).toBe(false);
			});

			it("should not render audio display component", () => {
				const { wrapper } = setup();

				const audioDisplay = wrapper.findComponent(AudioDisplay);

				expect(audioDisplay.exists()).toBe(false);
			});

			it("should not render video display component", () => {
				const { wrapper } = setup();

				const videoDisplay = wrapper.findComponent(VideoDisplay);

				expect(videoDisplay.exists()).toBe(false);
			});
		});
	});
});
