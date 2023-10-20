import {
	isAudioMimeType,
	isPdfMimeType,
	isVideoMimeType,
} from "@/utils/fileHelper";
import { fileElementResponseFactory } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import AudioDisplay from "./audio-display/AudioDisplay.vue";
import FileDescription from "./file-description/FileDescription.vue";
import FileDisplay from "./FileDisplay.vue";
import ImageDisplay from "./image-display/ImageDisplay.vue";
import VideoDisplay from "./video-display/VideoDisplay.vue";

jest.mock("@/utils/fileHelper");
const isVideoMimeTypeMock = jest.mocked(isVideoMimeType);
const isAudioMimeTypeMock = jest.mocked(isAudioMimeType);
const isPdfMimeTypeMock = jest.mocked(isPdfMimeType);

describe("FileDisplay", () => {
	describe("when previewUrl is defined", () => {
		describe("when mimeType is not a video type", () => {
			const setup = () => {
				document.body.setAttribute("data-app", "true");

				const element = fileElementResponseFactory.build();
				const propsData = {
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
					propsData,
					...createComponentMocks({}),
				});

				return {
					wrapper,
					fileNameProp: propsData.fileProperties.name,
					previewUrlProp: propsData.fileProperties.previewUrl,
					srcProp: propsData.fileProperties.url,
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

				expect(props.showtitle).toBeFalsy();
			});
		});

		describe("when mimeType is a video type", () => {
			const setup = () => {
				document.body.setAttribute("data-app", "true");

				const element = fileElementResponseFactory.build();
				const propsData = {
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
					propsData,
					...createComponentMocks({}),
				});

				return {
					wrapper,
					fileNameProp: propsData.fileProperties.name,
					previewUrlProp: propsData.fileProperties.previewUrl,
					srcProp: propsData.fileProperties.url,
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

				expect(props.showtitle).toBeFalsy();
			});
		});
	});

	describe("when previewUrl is undefined", () => {
		describe("when mimeType is a video type", () => {
			const setup = () => {
				document.body.setAttribute("data-app", "true");

				const element = fileElementResponseFactory.build();
				const propsData = {
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
					propsData,
					...createComponentMocks({}),
				});

				return {
					wrapper,
					fileNameProp: propsData.fileProperties.name,
					previewUrlProp: propsData.fileProperties.previewUrl,
					url: propsData.fileProperties.url,
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

				expect(props.showtitle).toBeFalsy();
			});
		});

		describe("when mimeType is a audio type", () => {
			const setup = () => {
				document.body.setAttribute("data-app", "true");

				const element = fileElementResponseFactory.build();
				const propsData = {
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
					propsData,
					...createComponentMocks({}),
				});

				return {
					wrapper,
					fileNameProp: propsData.fileProperties.name,
					srcProp: propsData.fileProperties.url,
				};
			};

			it("should be found in dom", () => {
				const { wrapper } = setup();

				const fileDisplay = wrapper.findComponent(FileDisplay);

				expect(fileDisplay.exists()).toBe(true);
			});

			it("should pass correct props to audio display component", () => {
				const { wrapper, srcProp } = setup();
				console.log(wrapper.html());
				const props = wrapper.findComponent(AudioDisplay).attributes();

				expect(props.src).toBe(srcProp);
			});

			it("should pass showTitle false to file description", () => {
				const { wrapper } = setup();

				const props = wrapper.findComponent(FileDescription).attributes();

				expect(props.showtitle).toBeFalsy();
			});
		});

		describe("when mimeType is pdf type", () => {
			const setup = () => {
				document.body.setAttribute("data-app", "true");

				const element = fileElementResponseFactory.build();
				const propsData = {
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

				isPdfMimeTypeMock.mockReset();
				isPdfMimeTypeMock.mockReturnValueOnce(true);

				const wrapper = shallowMount(FileDisplay, {
					propsData,
					...createComponentMocks({}),
				});

				return {
					wrapper,
					fileNameProp: propsData.fileProperties.name,
					previewUrlProp: propsData.fileProperties.previewUrl,
					url: propsData.fileProperties.url,
				};
			};

			it("should pass correct props to file description", () => {
				const { wrapper, url } = setup();

				const props = wrapper.findComponent(FileDescription).attributes();

				expect(props.src).toBe(url);
			});
		});

		describe("when mimeType is not a video or audio or pdf type", () => {
			const setup = () => {
				document.body.setAttribute("data-app", "true");

				const element = fileElementResponseFactory.build();
				const propsData = {
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
					propsData,
					...createComponentMocks({}),
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
