import FilePicker from "./file-picker/FilePicker.vue";
import FileUpload from "./FileUpload.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-vitest";
import * as utilBoard from "@util-board";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";

const setupUseSharedLastCreatedElementMock = () => {
	const mockedUse = createMock<ReturnType<typeof utilBoard.useSharedLastCreatedElement>>();
	vi.spyOn(utilBoard, "useSharedLastCreatedElement").mockReturnValue(mockedUse);
};

describe("FileUpload", () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("when isEditMode is true", () => {
		describe("when file is not picked", () => {
			const setup = (fileName = "") => {
				setupUseSharedLastCreatedElementMock();

				const props = {
					fileName,
					elementId: "element 123",
					url: "1/file-record #1.txt",
					isEditMode: true,
					isUploading: false,
				};
				const testSlot = "testSlot";
				const wrapper = mount(FileUpload, {
					global: { plugins: [createTestingVuetify(), createTestingI18n()] },
					props,
					slots: {
						default: testSlot,
					},
				});

				return {
					wrapper,
					fileNameProp: props.fileName,
					urlProp: props.url,
					elementId: props.elementId,
					testSlot,
				};
			};

			it("should render FilePicker component", () => {
				const { wrapper } = setup();

				const filePicker = wrapper.findComponent(FilePicker);
				expect(filePicker.exists()).toBe(true);
			});

			it("should render default slot", () => {
				const { wrapper, testSlot } = setup();

				expect(wrapper.html()).toContain(testSlot);
			});

			it("should not show notification on page unload", async () => {
				setup();

				const beforeUnloadEvent = new Event("beforeunload");
				const preventDefaultSpy = vi.fn();
				preventDefaultSpy.mockClear();

				beforeUnloadEvent.preventDefault = preventDefaultSpy;
				window.dispatchEvent(beforeUnloadEvent);

				expect(preventDefaultSpy).not.toHaveBeenCalled();
			});
		});

		describe("when file gets picked and is uploading", () => {
			const setup = (fileName = "") => {
				setupUseSharedLastCreatedElementMock();

				const props = {
					fileName,
					elementId: "element 123",
					url: "1/file-record #1.txt",
					isEditMode: true,
					isUploading: false,
				};
				const testSlot = "testSlot";
				const wrapper = mount(FileUpload, {
					global: { plugins: [createTestingVuetify(), createTestingI18n()] },
					props,
					slots: {
						default: testSlot,
					},
				});

				return {
					wrapper,
					fileNameProp: props.fileName,
					urlProp: props.url,
					elementId: props.elementId,
					testSlot,
				};
			};

			it("should be emitted as an upload:file event", async () => {
				const { wrapper } = setup();

				const filePicker = wrapper.findComponent(FilePicker);
				expect(filePicker.exists()).toBe(true);

				filePicker.vm.$emit("update:file", { fileName: "Test.jpg" });

				expect(wrapper.emitted("upload:file")).toHaveLength(1);
			});

			it("should render v-progress-linear component", async () => {
				const { wrapper } = setup();

				const filePicker = wrapper.findComponent(FilePicker);
				expect(filePicker.exists()).toBe(true);

				filePicker.vm.$emit("update:file", { fileName: "Test.jpg" });

				await nextTick();

				const progressLinear = wrapper.findComponent({
					name: "v-progress-linear",
				});
				expect(progressLinear.exists()).toBe(true);
			});

			it("should not render FilePicker component", async () => {
				const { wrapper } = setup();

				const filePicker = wrapper.findComponent(FilePicker);
				expect(filePicker.exists()).toBe(true);

				filePicker.vm.$emit("update:file", { fileName: "Test.jpg" });

				await nextTick();

				expect(filePicker.exists()).toBe(false);
			});

			it("should show notification on page unload", async () => {
				const { wrapper } = setup();

				const filePicker = wrapper.findComponent(FilePicker);
				expect(filePicker.exists()).toBe(true);

				filePicker.vm.$emit("update:file", { fileName: "Test.jpg" });

				const beforeUnloadEvent = new Event("beforeunload");
				const preventDefaultSpy = vi.fn();

				beforeUnloadEvent.preventDefault = preventDefaultSpy;
				window.dispatchEvent(beforeUnloadEvent);

				expect(preventDefaultSpy).toHaveBeenCalled();
			});
		});

		describe("when file is already uploading", () => {
			const setup = (fileName = "") => {
				setupUseSharedLastCreatedElementMock();

				const props = {
					fileName,
					elementId: "element 123",
					url: "1/file-record #1.txt",
					isEditMode: true,
					isUploading: true,
				};
				const testSlot = "testSlot";
				const wrapper = mount(FileUpload, {
					global: { plugins: [createTestingVuetify(), createTestingI18n()] },
					props,
					slots: {
						default: testSlot,
					},
				});

				return {
					wrapper,
					fileNameProp: props.fileName,
					urlProp: props.url,
					elementId: props.elementId,
					testSlot,
				};
			};

			it("should render v-progress-linear component", async () => {
				const { wrapper } = setup();

				const progressLinear = wrapper.findComponent({
					name: "v-progress-linear",
				});
				expect(progressLinear.exists()).toBe(true);
			});

			it("should not render FilePicker component", () => {
				const { wrapper } = setup();

				const filePicker = wrapper.findComponent(FilePicker);
				expect(filePicker.exists()).toBe(false);
			});

			it("should show notification on page unload", async () => {
				setup();

				const beforeUnloadEvent = new Event("beforeunload");
				const preventDefaultSpy = vi.fn();

				beforeUnloadEvent.preventDefault = preventDefaultSpy;
				window.dispatchEvent(beforeUnloadEvent);

				expect(preventDefaultSpy).toHaveBeenCalled();
			});
		});
	});

	describe("when isEditMode is false and already uploading", () => {
		const setup = (fileName = "") => {
			setupUseSharedLastCreatedElementMock();

			const props = {
				fileName,
				elementId: "element 123",
				url: "1/file-record #1.txt",
				isEditMode: false,
				isUploading: true,
			};
			const testSlot = "testSlot";
			const wrapper = mount(FileUpload, {
				global: { plugins: [createTestingVuetify(), createTestingI18n()] },
				props,
				slots: {
					default: testSlot,
				},
			});

			return {
				wrapper,
				fileNameProp: props.fileName,
				urlProp: props.url,
				elementId: props.elementId,
				testSlot,
			};
		};

		it("should not render FilePicker component", () => {
			const { wrapper } = setup();

			const filePicker = wrapper.findComponent(FilePicker);
			expect(filePicker.exists()).toBe(false);
		});

		it("should not render default slot", () => {
			const { wrapper, testSlot } = setup();

			expect(wrapper.text()).not.toContain(testSlot);
		});

		it("should not render progress bar", () => {
			const { wrapper } = setup();

			const progressLinear = wrapper.findComponent({
				name: "v-progress-linear",
			});
			expect(progressLinear.exists()).toBe(false);
		});

		it("should show notification on page unload", async () => {
			setup();

			const beforeUnloadEvent = new Event("beforeunload");
			const preventDefaultSpy = vi.fn();

			beforeUnloadEvent.preventDefault = preventDefaultSpy;
			window.dispatchEvent(beforeUnloadEvent);

			expect(preventDefaultSpy).toHaveBeenCalled();
		});
	});
});
