import { PreviewStatus } from "@/fileStorageApi/v3";
import { fileElementResponseFactory } from "@@/tests/test-utils";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { shallowMount } from "@vue/test-utils";
import { FileAlert } from "../shared/types/FileAlert.enum";
import FileContent from "./FileContent.vue";
import FileAlerts from "./alert/FileAlerts.vue";
import FileDisplay from "./display/FileDisplay.vue";
import FileDescription from "./display/file-description/FileDescription.vue";
import ContentElementFooter from "./footer/ContentElementFooter.vue";
import FileInputs from "./inputs/FileInputs.vue";

describe("FileContent", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
	});

	const setup = (options?: {
		isListBoard?: boolean;
		mimeType?: string;
		previewUrl?: string;
		windowWidth?: number;
	}) => {
		const { isListBoard, mimeType, previewUrl, windowWidth } = {
			isListBoard: false,
			mimeType: "testMimeType",
			previewUrl: "testPreviewUrl",
			windowWidth: 1280,
			...options,
		};

		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: windowWidth,
		});

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
			isCollaboraEditable: false,
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

	describe("when board is a list board", () => {
		describe("when file content is a pdf", () => {
			it.each`
				screenSize  | px
				${"small"}  | ${600}
				${"medium"} | ${960}
				${"large"}  | ${1280}
			`(
				"content should have row style for $screenSize display sizes",
				({ px: windowWidth }) => {
					const { wrapper } = setup({
						mimeType: "application/pdf",
						isListBoard: true,
						windowWidth,
					});

					expect(wrapper.classes()).toContain("flex-row");
				}
			);

			it("content should have column style when display size is smaller than 600px", () => {
				const { wrapper } = setup({
					mimeType: "application/pdf",
					isListBoard: true,
					windowWidth: 599,
				});

				expect(wrapper.classes()).toContain("flex-column");
			});

			it.each`
				screenSize  | px
				${"small"}  | ${600}
				${"medium"} | ${960}
				${"large"}  | ${1280}
			`(
				"file display container should have a width of 33% for $screenSize display sizes",
				({ px: windowWidth }) => {
					const { wrapper } = setup({
						mimeType: "application/pdf",
						isListBoard: true,
						windowWidth,
					});

					const fileDisplayContainer =
						wrapper.getComponent(FileDisplay).element.parentElement;

					expect(fileDisplayContainer.classList).toContain("w-33");
				}
			);

			it("file display container should not have a width of 33% when display size is smaller than 600px", () => {
				const { wrapper } = setup({
					mimeType: "application/pdf",
					isListBoard: true,
					windowWidth: 599,
				});

				const fileDisplayContainer =
					wrapper.getComponent(FileDisplay).element.parentElement;

				expect(fileDisplayContainer.classList).not.toContain("w-33");
			});

			it.each`
				screenSize  | px
				${"small"}  | ${600}
				${"medium"} | ${960}
				${"large"}  | ${1280}
			`(
				"should have class 'file-information' for $screenSize display sizes",
				({ px: windowWidth }) => {
					const { wrapper } = setup({
						mimeType: "application/pdf",
						isListBoard: true,
						windowWidth,
					});

					const fileDisplayContainer =
						wrapper.getComponent(FileDescription).element.parentElement;

					expect(fileDisplayContainer.classList).toContain("file-information");
				}
			);

			it("should not have class 'file-information' when display size is smaller than 600px", () => {
				const { wrapper } = setup({
					mimeType: "application/pdf",
					isListBoard: true,
					windowWidth: 599,
				});

				const fileDisplayContainer =
					wrapper.getComponent(FileDescription).element.parentElement;

				expect(fileDisplayContainer.classList).not.toContain(
					"file-information"
				);
			});
		});

		describe("when file content is not a pdf", () => {
			it.each`
				screenSize       | px
				${"extra small"} | ${599}
				${"small"}       | ${600}
				${"medium"}      | ${960}
				${"large"}       | ${1280}
			`(
				"content should have column style for $screenSize display sizes",
				({ px: windowWidth }) => {
					const { wrapper } = setup({
						isListBoard: true,
						windowWidth,
					});

					expect(wrapper.classes()).toContain("flex-column");
				}
			);

			it.each`
				screenSize       | px
				${"extra small"} | ${599}
				${"small"}       | ${600}
				${"medium"}      | ${960}
				${"large"}       | ${1280}
			`(
				"file display container should not have a width of 33% for $screenSize display sizes",
				({ px: windowWidth }) => {
					const { wrapper } = setup({
						isListBoard: true,
						windowWidth,
					});

					const fileDisplayContainer =
						wrapper.getComponent(FileDisplay).element.parentElement;

					expect(fileDisplayContainer.classList).not.toContain("w-33");
				}
			);

			it.each`
				screenSize       | px
				${"extra small"} | ${599}
				${"small"}       | ${600}
				${"medium"}      | ${960}
				${"large"}       | ${1280}
			`(
				"should not have class file-information for $screenSize display sizes",
				({ px: windowWidth }) => {
					const { wrapper } = setup({
						isListBoard: true,
						windowWidth,
					});

					const fileDisplayContainer =
						wrapper.getComponent(FileDescription).element.parentElement;

					expect(fileDisplayContainer.classList).not.toContain(
						"file-information"
					);
				}
			);
		});
	});

	describe("when board is not a list board", () => {
		it.each`
			screenSize       | px
			${"extra small"} | ${599}
			${"small"}       | ${600}
			${"medium"}      | ${960}
			${"large"}       | ${1280}
		`(
			"content should have column style for $screenSize display sizes",
			({ px: windowWidth }) => {
				const { wrapper } = setup({
					isListBoard: false,
					windowWidth,
				});

				expect(wrapper.classes()).toContain("flex-column");
			}
		);

		it.each`
			screenSize       | px
			${"extra small"} | ${599}
			${"small"}       | ${600}
			${"medium"}      | ${960}
			${"large"}       | ${1280}
		`(
			"file display container should not have a width of 33% for $screenSize display sizes",
			({ px: windowWidth }) => {
				const { wrapper } = setup({
					isListBoard: false,
					windowWidth,
				});

				const fileDisplayContainer =
					wrapper.getComponent(FileDisplay).element.parentElement;

				expect(fileDisplayContainer.classList).not.toContain("w-33");
			}
		);

		it.each`
			screenSize       | px
			${"extra small"} | ${599}
			${"small"}       | ${600}
			${"medium"}      | ${960}
			${"large"}       | ${1280}
		`(
			"should not have class file-information for $screenSize display sizes",
			({ px: windowWidth }) => {
				const { wrapper } = setup({
					isListBoard: false,
					windowWidth,
				});

				const fileDisplayContainer =
					wrapper.getComponent(FileDescription).element.parentElement;

				expect(fileDisplayContainer.classList).not.toContain(
					"file-information"
				);
			}
		);
	});

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
				showMenu: true,
			});
		});

		describe("show menu", () => {
			it("should pass false when preview file is undefined", () => {
				const { wrapper } = setup({
					previewUrl: undefined,
				});

				const props = wrapper.findComponent(FileDisplay).attributes();

				expect(props.showmenu).toBe("false");
			});
			it("should pass true when preview file is defined", () => {
				const { wrapper } = setup();

				const props = wrapper.findComponent(FileDisplay).attributes();

				expect(props.showmenu).toBe("true");
			});

			it("should pass true when video file", () => {
				const { wrapper } = setup({
					mimeType: "video/mp4",
				});

				const props = wrapper.findComponent(FileDisplay).attributes();

				expect(props.showmenu).toBe("true");
			});

			it("should pass true when audio file", () => {
				const { wrapper } = setup({
					mimeType: "audio/mp4",
				});

				const props = wrapper.findComponent(FileDisplay).attributes();

				expect(props.showmenu).toBe("true");
			});

			it("should pass true when pdf file is not on a listboard", () => {
				const { wrapper } = setup({
					mimeType: "application/pdf",
					isListBoard: false,
				});

				const props = wrapper.findComponent(FileDisplay).attributes();

				expect(props.showmenu).toBe("true");
			});

			it("should pass true when pdf file is on a listboard with a screensize smaller than 600 px", () => {
				const { wrapper } = setup({
					mimeType: "application/pdf",
					isListBoard: true,
					windowWidth: 599,
				});

				const props = wrapper.findComponent(FileDisplay).attributes();

				expect(props.showmenu).toBe("true");
			});

			it("should pass false when pdf file is on a listboard with small or larger screensize", () => {
				const { wrapper } = setup({
					mimeType: "application/pdf",
					isListBoard: true,
					windowWidth: 900,
				});

				const props = wrapper.findComponent(FileDisplay).attributes();

				expect(props.showmenu).toBe("false");
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

		describe("show menu", () => {
			it("should pass true when preview url is not defined", () => {
				const { wrapper } = setup({
					previewUrl: undefined,
				});

				const props = wrapper.findComponent(FileDescription).attributes();

				expect(props.showmenu).toBe("true");
			});

			it("should pass true when the file is a PDF and on a listboard with a screensize small or larger", () => {
				const { wrapper } = setup({
					mimeType: "application/pdf",
					isListBoard: true,
					windowWidth: 600,
				});

				const props = wrapper.findComponent(FileDescription).attributes();

				expect(props.showmenu).toBe("true");
			});

			it("should pass false when the file is a PDF and on a listboard with a xs screensize", () => {
				const { wrapper } = setup({
					mimeType: "application/pdf",
					isListBoard: true,
					windowWidth: 599,
				});

				const props = wrapper.findComponent(FileDescription).attributes();

				expect(props.showmenu).toBe("false");
			});

			it("should pass false when preview url is defined and file is not a pdf on a listbaord", () => {
				const { wrapper } = setup();

				const props = wrapper.findComponent(FileDescription).attributes();

				expect(props.showmenu).toBe("false");
			});

			it("should pass false when pdf file is not on a listboard", () => {
				const { wrapper } = setup({
					mimeType: "application/pdf",
					isListBoard: false,
				});

				const props = wrapper.findComponent(FileDescription).attributes();

				expect(props.showmenu).toBe("false");
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

	describe("file inputs", () => {
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
			vi.runAllTimers();

			expect(wrapper.emitted("update:alternativeText")).toHaveLength(1);
		});

		it("should emit update:caption event, when it receives update:caption event from file inputs component", async () => {
			const { wrapper } = setup();

			const fileInputs = wrapper.findComponent(FileInputs);

			fileInputs.vm.$emit("update:caption");
			vi.runAllTimers();

			expect(wrapper.emitted("update:caption")).toHaveLength(1);
		});
	});

	describe("content element footer", () => {
		it("should pass props to ContentElementFooter", () => {
			const { wrapper, fileProperties } = setup();

			const contentElementFooter = wrapper.findComponent(ContentElementFooter);

			expect(contentElementFooter.props()).toEqual({
				fileProperties,
			});
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
