import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { createMock } from "@golevelup/ts-jest";
import * as utilBoard from "@util-board";
import { shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";
import FilePicker from "./file-picker/FilePicker.vue";
import FileUpload from "./FileUpload.vue";

const setupUseSharedLastCreatedElementMock = () => {
	const mockedUse =
		createMock<ReturnType<typeof utilBoard.useSharedLastCreatedElement>>();
	jest
		.spyOn(utilBoard, "useSharedLastCreatedElement")
		.mockReturnValue(mockedUse);
};

describe(FileUpload.name, () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when isEditMode is true", () => {
		describe("when file is not picked", () => {
			const setup = (fileName = "") => {
				document.body.setAttribute("data-app", "true");

				setupUseSharedLastCreatedElementMock();

				const propsData = {
					fileName,
					elementId: "element 123",
					url: "1/file-record #1.txt",
					isEditMode: true,
					isUploading: false,
				};
				const testSlot = "testSlot";
				const wrapper = shallowMount(FileUpload, {
					...createComponentMocks({ i18n: true }),
					propsData,
					slots: {
						default: testSlot,
					},
				});

				return {
					wrapper,
					fileNameProp: propsData.fileName,
					urlProp: propsData.url,
					elementId: propsData.elementId,
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

				expect(wrapper.text()).toContain(testSlot);
			});

			it("should not show notification on page unload", async () => {
				setup();

				const beforeUnloadEvent = new Event("beforeunload");
				const preventDefaultSpy = jest.fn();
				preventDefaultSpy.mockClear();

				beforeUnloadEvent.preventDefault = preventDefaultSpy;
				window.dispatchEvent(beforeUnloadEvent);

				expect(preventDefaultSpy).not.toHaveBeenCalled();
			});
		});

		describe("when file gets picked and is uploading", () => {
			const setup = (fileName = "") => {
				document.body.setAttribute("data-app", "true");

				setupUseSharedLastCreatedElementMock();

				const propsData = {
					fileName,
					elementId: "element 123",
					url: "1/file-record #1.txt",
					isEditMode: true,
					isUploading: false,
				};
				const testSlot = "testSlot";
				const wrapper = shallowMount(FileUpload, {
					...createComponentMocks({ i18n: true }),
					propsData,
					slots: {
						default: testSlot,
					},
				});

				return {
					wrapper,
					fileNameProp: propsData.fileName,
					urlProp: propsData.url,
					elementId: propsData.elementId,
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

				const progressLinear = wrapper.find("v-progress-linear-stub");
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
				const preventDefaultSpy = jest.fn();

				beforeUnloadEvent.preventDefault = preventDefaultSpy;
				window.dispatchEvent(beforeUnloadEvent);

				expect(preventDefaultSpy).toHaveBeenCalled();
			});
		});

		describe("when file is already uploading", () => {
			const setup = (fileName = "") => {
				document.body.setAttribute("data-app", "true");

				setupUseSharedLastCreatedElementMock();

				const propsData = {
					fileName,
					elementId: "element 123",
					url: "1/file-record #1.txt",
					isEditMode: true,
					isUploading: true,
				};
				const testSlot = "testSlot";
				const wrapper = shallowMount(FileUpload, {
					...createComponentMocks({ i18n: true }),
					propsData,
					slots: {
						default: testSlot,
					},
				});

				return {
					wrapper,
					fileNameProp: propsData.fileName,
					urlProp: propsData.url,
					elementId: propsData.elementId,
					testSlot,
				};
			};

			it("should render v-progress-linear component", async () => {
				const { wrapper } = setup();

				const progressLinear = wrapper.find("v-progress-linear-stub");
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
				const preventDefaultSpy = jest.fn();

				beforeUnloadEvent.preventDefault = preventDefaultSpy;
				window.dispatchEvent(beforeUnloadEvent);

				expect(preventDefaultSpy).toHaveBeenCalled();
			});
		});
	});

	describe("when isEditMode is false and already uploading", () => {
		const setup = (fileName = "") => {
			document.body.setAttribute("data-app", "true");

			setupUseSharedLastCreatedElementMock();

			const propsData = {
				fileName,
				elementId: "element 123",
				url: "1/file-record #1.txt",
				isEditMode: false,
				isUploading: true,
			};
			const testSlot = "testSlot";
			const wrapper = shallowMount(FileUpload, {
				...createComponentMocks({ i18n: true }),
				propsData,
				slots: {
					default: testSlot,
				},
			});

			return {
				wrapper,
				fileNameProp: propsData.fileName,
				urlProp: propsData.url,
				elementId: propsData.elementId,
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

			const progressLinear = wrapper.find("v-progress-linear-stub");
			expect(progressLinear.exists()).toBe(false);
		});

		it("should show notification on page unload", async () => {
			setup();

			const beforeUnloadEvent = new Event("beforeunload");
			const preventDefaultSpy = jest.fn();

			beforeUnloadEvent.preventDefault = preventDefaultSpy;
			window.dispatchEvent(beforeUnloadEvent);

			expect(preventDefaultSpy).toHaveBeenCalled();
		});
	});
});
