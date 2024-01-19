import {
	isAudioMimeType,
	isPdfMimeType,
	isVideoMimeType,
} from "@/utils/fileHelper";
import { fileElementResponseFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";
import AudioDisplay from "./audio-display/AudioDisplay.vue";
import FileDescription from "./file-description/FileDescription.vue";
import FileDisplay from "./FileDisplay.vue";
import ImageDisplay from "./image-display/ImageDisplay.vue";
import PdfDisplay from "./pdf-display/PdfDisplay.vue";
import VideoDisplay from "./video-display/VideoDisplay.vue";

jest.mock("@/utils/fileHelper");
const isVideoMimeTypeMock = jest.mocked(isVideoMimeType);
const isAudioMimeTypeMock = jest.mocked(isAudioMimeType);
const isPdfMimeTypeMock = jest.mocked(isPdfMimeType);

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
						previewStatus: "test",
						isDownloadAllowed: true,
						element,
					},
					isEditMode: true,
				};

				isVideoMimeTypeMock.mockReset();
				isVideoMimeTypeMock.mockReturnValueOnce(false);

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

			it("should pass showTitle true to file description", () => {
				const { wrapper } = setup();

				const props = wrapper.findComponent(FileDescription).attributes();

				expect(props.showtitle).toBe("false");
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
						previewStatus: "test",
						isDownloadAllowed: true,
						element,
					},
					isEditMode: true,
				};

				isVideoMimeTypeMock.mockReset();
				isVideoMimeTypeMock.mockReturnValueOnce(true);

				isAudioMimeTypeMock.mockReset();
				isAudioMimeTypeMock.mockReturnValueOnce(false);

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

			it("should render file description display component", () => {
				const { wrapper } = setup();

				const fileDescription = wrapper.findComponent(FileDescription);

				expect(fileDescription.exists()).toBe(true);
			});

			it("should pass showTitle true to file description", () => {
				const { wrapper } = setup();

				const props = wrapper.findComponent(FileDescription).attributes();

				expect(props.showtitle).toBe("false");
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
						previewStatus: "test",
						isDownloadAllowed: true,
						element,
					},
					isEditMode: true,
				};

				isAudioMimeTypeMock.mockReset();
				isAudioMimeTypeMock.mockReturnValueOnce(false);

				isVideoMimeTypeMock.mockReset();
				isVideoMimeTypeMock.mockReturnValueOnce(false);

				isPdfMimeTypeMock.mockReset();
				isPdfMimeTypeMock.mockReturnValueOnce(true);

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

			it("should pass correct props to file description", () => {
				const { wrapper, url } = setup();

				const props = wrapper.findComponent(FileDescription).attributes();

				expect(props.src).toBe(url);
				expect(props.showtitle).toBeTruthy();
			});

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
						previewStatus: "test",
						isDownloadAllowed: true,
						element,
					},
					isEditMode: true,
				};

				isVideoMimeTypeMock.mockReset();
				isVideoMimeTypeMock.mockReturnValueOnce(true);

				isAudioMimeTypeMock.mockReset();
				isAudioMimeTypeMock.mockReturnValueOnce(false);

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

			it("should pass showTitle false to file description", () => {
				const { wrapper } = setup();

				const props = wrapper.findComponent(FileDescription).attributes();

				expect(props.showtitle).toBe("false");
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
						previewStatus: "test",
						isDownloadAllowed: true,
						element,
					},
					isEditMode: true,
				};

				isVideoMimeTypeMock.mockReset();
				isVideoMimeTypeMock.mockReturnValueOnce(false);

				isAudioMimeTypeMock.mockReset();
				isAudioMimeTypeMock.mockReturnValueOnce(true);

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

			it("should pass showTitle false to file description", () => {
				const { wrapper } = setup();

				const props = wrapper.findComponent(FileDescription).attributes();

				expect(props.showtitle).toBe("false");
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
						previewStatus: "test",
						isDownloadAllowed: true,
						element,
					},
					isEditMode: true,
				};

				isAudioMimeTypeMock.mockReset();
				isAudioMimeTypeMock.mockReturnValueOnce(false);

				isVideoMimeTypeMock.mockReset();
				isVideoMimeTypeMock.mockReturnValueOnce(false);

				isPdfMimeTypeMock.mockReset();
				isPdfMimeTypeMock.mockReturnValueOnce(true);

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

			it("should pass correct props to file description", () => {
				const { wrapper, url } = setup();

				const props = wrapper.findComponent(FileDescription).attributes();

				expect(props.src).toBe(url);
			});

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
						previewStatus: "test",
						isDownloadAllowed: true,
						element,
					},
					isEditMode: true,
				};

				isVideoMimeTypeMock.mockReset();
				isVideoMimeTypeMock.mockReturnValueOnce(false);

				isAudioMimeTypeMock.mockReset();
				isAudioMimeTypeMock.mockReturnValueOnce(false);

				isPdfMimeTypeMock.mockReset();
				isPdfMimeTypeMock.mockReturnValueOnce(false);

				const wrapper = shallowMount(FileDisplay, {
					props,
					global: { plugins: [createTestingVuetify(), createTestingI18n()] },
				});

				return {
					wrapper,
				};
			};

			it("should pass showTitle true to file description", () => {
				const { wrapper } = setup();

				const props = wrapper.findComponent(FileDescription).attributes();

				expect(props.showtitle).toBeTruthy();
			});

			it("should pass src to file description", () => {
				const { wrapper } = setup();

				const props = wrapper.findComponent(FileDescription).attributes();

				expect(props.src).toBe(undefined);
			});

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
