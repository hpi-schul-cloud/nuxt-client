import { PreviewStatus } from "@/fileStorageApi/v3";
import {
	createTestEnvStore,
	fileElementResponseFactory,
} from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";
import AudioDisplay from "./audio-display/AudioDisplay.vue";
import CollaboraDisplay from "./collabora-display/CollaboraDisplay.vue";
import FileDisplay from "./FileDisplay.vue";
import ImageDisplay from "./image-display/ImageDisplay.vue";
import PdfDisplay from "./pdf-display/PdfDisplay.vue";
import VideoDisplay from "./video-display/VideoDisplay.vue";
import { beforeEach } from "vitest";
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";

describe("FileDisplay", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestEnvStore({ FEATURE_COLUMN_BOARD_COLLABORA_ENABLED: false });
	});

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
						isCollaboraEditable: false,
					},
					isEditMode: true,
					showMenu: true,
				};
				const wrapper = shallowMount(FileDisplay, {
					props,
					global: {
						plugins: [createTestingVuetify(), createTestingI18n()],
					},
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
						isCollaboraEditable: false,
					},
					isEditMode: true,
					showMenu: true,
				};
				const wrapper = shallowMount(FileDisplay, {
					props,
					global: {
						plugins: [createTestingVuetify(), createTestingI18n()],
					},
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
						isCollaboraEditable: false,
					},
					isEditMode: true,
					showMenu: true,
				};
				const wrapper = shallowMount(FileDisplay, {
					props,
					global: {
						plugins: [createTestingVuetify(), createTestingI18n()],
					},
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
						isCollaboraEditable: false,
					},
					isEditMode: true,
					showMenu: true,
				};

				createTestEnvStore({ FEATURE_COLUMN_BOARD_COLLABORA_ENABLED: false });

				const wrapper = shallowMount(FileDisplay, {
					props,
					global: {
						plugins: [createTestingVuetify(), createTestingI18n()],
					},
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
						isCollaboraEditable: false,
					},
					isEditMode: true,
					showMenu: true,
				};

				createTestEnvStore({ FEATURE_COLUMN_BOARD_COLLABORA_ENABLED: false });

				const wrapper = shallowMount(FileDisplay, {
					props,
					global: {
						plugins: [createTestingVuetify(), createTestingI18n()],
					},
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
						isCollaboraEditable: false,
					},
					isEditMode: true,
					showMenu: true,
				};

				createTestEnvStore({ FEATURE_COLUMN_BOARD_COLLABORA_ENABLED: false });

				const wrapper = shallowMount(FileDisplay, {
					props,
					global: {
						plugins: [createTestingVuetify(), createTestingI18n()],
					},
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

		describe("when mimeType is office type and collabora feature enabled", () => {
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
						mimeType:
							"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
						isCollaboraEditable: true,
					},
					isEditMode: true,
					showMenu: true,
				};

				createTestEnvStore({ FEATURE_COLUMN_BOARD_COLLABORA_ENABLED: true });

				const wrapper = mount(FileDisplay, {
					props,
					global: {
						plugins: [createTestingVuetify(), createTestingI18n()],
					},
				});

				return {
					wrapper,
				};
			};

			it("should render collabora display", () => {
				const { wrapper } = setup();

				const collaboraDisplay = wrapper.findComponent(CollaboraDisplay);

				expect(collaboraDisplay.exists()).toBe(true);
			});
		});

		describe("when mimeType is office type and collabora feature disabled", () => {
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
						mimeType:
							"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
						isCollaboraEditable: true,
					},
					isEditMode: true,
					showMenu: true,
				};

				createTestEnvStore({ FEATURE_COLUMN_BOARD_COLLABORA_ENABLED: false });

				const wrapper = mount(FileDisplay, {
					props,
					global: {
						plugins: [createTestingVuetify(), createTestingI18n()],
					},
				});

				return {
					wrapper,
				};
			};

			it("should render collabora display", () => {
				const { wrapper } = setup();

				const collaboraDisplay = wrapper.findComponent(CollaboraDisplay);

				expect(collaboraDisplay.exists()).toBe(false);
			});
		});

		describe("when mimeType is other", () => {
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
						isCollaboraEditable: false,
					},
					isEditMode: true,
					showMenu: true,
				};

				createTestEnvStore({ FEATURE_COLUMN_BOARD_COLLABORA_ENABLED: false });

				const wrapper = shallowMount(FileDisplay, {
					props,
					global: {
						plugins: [createTestingVuetify(), createTestingI18n()],
					},
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

			it("should not render pdf display component", () => {
				const { wrapper } = setup();

				const pdfDisplay = wrapper.findComponent(PdfDisplay);

				expect(pdfDisplay.exists()).toBe(false);
			});

			it("should not render collabora display component", () => {
				const { wrapper } = setup();

				const collaboraDisplay = wrapper.findComponent(CollaboraDisplay);

				expect(collaboraDisplay.exists()).toBe(false);
			});
		});
	});
});
