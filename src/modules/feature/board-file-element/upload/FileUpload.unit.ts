import FilePicker from "./file-picker/FilePicker.vue";
import FileUpload from "./FileUpload.vue";
import { mockComposable } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import * as utilBoard from "@util-board";
import { mount } from "@vue/test-utils";

const setupUseSharedLastCreatedElementMock = () => {
	const mockedUse = mockComposable(utilBoard.useSharedLastCreatedElement);
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
		});

		describe("when file gets picked", () => {
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
	});
});
