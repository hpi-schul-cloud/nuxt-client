import { PreviewStatus } from "@/fileStorageApi/v3";
import { fileElementResponseFactory } from "@@/tests/test-utils";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";
import { FileAlert } from "../shared/types/FileAlert.enum";
import FileContent from "./FileContent.vue";
import FileAlerts from "./alert/FileAlerts.vue";
import FileDisplay from "./display/FileDisplay.vue";
import FileDescription from "./display/file-description/FileDescription.vue";
import ContentElementFooter from "./footer/ContentElementFooter.vue";
import FileInputs from "./inputs/FileInputs.vue";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";

describe("FileContent", () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
	});

	const setup = (options?: {
		isListBoard?: boolean;
		mimeType?: string;
		previewUrl?: string;
	}) => {
		const { isListBoard, mimeType, previewUrl } = {
			isListBoard: false,
			mimeType: "testMimeType",
			previewUrl: "testPreviewUrl",
			...options,
		};

		const element = fileElementResponseFactory.build();

		const fileProperties = {
			name: "fileName",
			size: 100,
			url: "testUrl",
			previewUrl,
			previewStatus: PreviewStatus.PREVIEW_POSSIBLE,
			isDownloadAllowed: true,
			element,
			mimeType,
		};
		const alerts = [FileAlert.AWAITING_SCAN_STATUS];

		const wrapper = shallowMount(FileContent, {
			props: {
				fileProperties,
				isEditMode: true,
				alerts,
			},
			global: {
				plugins: [createTestingVuetify()],
				provide: {
					[BOARD_IS_LIST_LAYOUT as symbol]: isListBoard,
				},
			},
		});

		return {
			wrapper,
			fileProperties,
			alerts,
		};
	};

	describe("file display", () => {
		it("should render file display component", () => {
			const { wrapper } = setup();

			const fileDisplay = wrapper.findComponent(FileDisplay);

			expect(fileDisplay.exists()).toBe(true);
		});

		it("should pass props to FileDisplay", () => {
			const { wrapper, fileProperties } = setup();

			const fileContent = wrapper.findComponent(FileDisplay);

			expect(fileContent.props()).toEqual({
				fileProperties,
				isEditMode: true,
			});
		});

		it("should emit add:alert event", async () => {
			const { wrapper } = setup();

			const fileDisplay = wrapper.findComponent(FileDisplay);

			fileDisplay.vm.$emit("add:alert");

			expect(wrapper.emitted("add:alert")).toHaveLength(1);
		});
	});

	describe("file description", () => {
		it("should render file description ", () => {
			const { wrapper } = setup();

			const fileDescription = wrapper.findComponent(FileDescription);

			expect(fileDescription.exists()).toBe(true);
		});

		describe("show title", () => {
			it("should pass true when pdf file", () => {
				const { wrapper } = setup({ mimeType: "application/pdf" });

				const props = wrapper.findComponent(FileDescription).attributes();

				expect(props.showtitle).toBe("true");
			});

			it("should pass true when not video or audio and previewUrl is undefined", () => {
				const { wrapper } = setup({ previewUrl: undefined });

				const props = wrapper.findComponent(FileDescription).attributes();

				expect(props.showtitle).toBe("true");
			});

			it("should pass false when video file", () => {
				const { wrapper } = setup({ mimeType: "video/mp4" });

				const props = wrapper.findComponent(FileDescription).attributes();

				expect(props.showtitle).toBe("false");
			});

			it("should pass false when audio file", () => {
				const { wrapper } = setup({ mimeType: "audio/mp4" });

				const props = wrapper.findComponent(FileDescription).attributes();

				expect(props.showtitle).toBe("false");
			});

			it("should pass false when preview url is definied", () => {
				const { wrapper } = setup({ previewUrl: "test" });

				const props = wrapper.findComponent(FileDescription).attributes();

				expect(props.showtitle).toBe("false");
			});
		});

		describe("file description src", () => {
			it("should be undefined when not a pdf file", () => {
				const { wrapper } = setup();
				const props = wrapper.findComponent(FileDescription).attributes();

				expect(props.src).toBe(undefined);
			});

			it("should pass url to src when pdf file", () => {
				const { wrapper, fileProperties } = setup({
					mimeType: "application/pdf",
				});
				const props = wrapper.findComponent(FileDescription).attributes();

				expect(props.src).toBe(fileProperties.url);
			});
		});
	});

	it("should pass props to ContentElementFooter", () => {
		const { wrapper, fileProperties } = setup();

		const contentElementFooter = wrapper.findComponent(ContentElementFooter);

		expect(contentElementFooter.props()).toEqual({
			fileProperties,
		});
	});

	describe(" file inputs", () => {
		it("should pass props to FileInputs", () => {
			const { wrapper, fileProperties } = setup();

			const fileInputs = wrapper.findComponent(FileInputs);

			expect(fileInputs.props()).toEqual({
				fileProperties,
				isEditMode: true,
			});
		});

		it("should emit update:alternativeText", async () => {
			const { wrapper } = setup();

			const fileInputs = wrapper.findComponent(FileInputs);

			fileInputs.vm.$emit("update:alternativeText");
			jest.runAllTimers();

			expect(wrapper.emitted("update:alternativeText")).toHaveLength(1);
		});

		it("should emit update:caption event, when it receives update:caption event from file inputs component", async () => {
			const { wrapper } = setup();

			const fileInputs = wrapper.findComponent(FileInputs);

			fileInputs.vm.$emit("update:caption");
			jest.runAllTimers();

			expect(wrapper.emitted("update:caption")).toHaveLength(1);
		});
	});

	describe("file alerts", () => {
		it("should pass props to FileAlert", () => {
			const { wrapper, alerts } = setup();

			const fileAlert = wrapper.findComponent(FileAlerts);

			expect(fileAlert.props()).toEqual({
				alerts,
			});
		});

		describe("when file alerts emits on-status-reload", () => {
			it("should emit fetch:file event", async () => {
				const { wrapper } = setup();

				const fileAlert = wrapper.findComponent(FileAlerts);

				await fileAlert.vm.$emit("on-status-reload");

				expect(wrapper.emitted("fetch:file")).toBeTruthy();
			});
		});
	});
});

// TODO: add test for row style
