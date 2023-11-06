import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { createMock } from "@golevelup/ts-jest";
import { useSharedLastCreatedElement } from "@util-board";
import { shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";
import FilePicker from "./file-picker/FilePicker.vue";
import FileUpload from "./FileUpload.vue";

jest.mock("@util-board");
const mockedUse = createMock<ReturnType<typeof useSharedLastCreatedElement>>();
const useSharedLastCreatedElementMock = jest.mocked(
	useSharedLastCreatedElement
);
useSharedLastCreatedElementMock.mockReturnValue(mockedUse);

describe(FileUpload.name, () => {
	describe("when isEditMode is true", () => {
		const setup = (fileName = "") => {
			document.body.setAttribute("data-app", "true");

			const propsData = {
				fileName,
				elementId: "element 123",
				url: "1/file-record #1.txt",
				isEditMode: true,
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

		describe("when file is not picked", () => {
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

				beforeUnloadEvent.preventDefault = preventDefaultSpy;
				window.dispatchEvent(beforeUnloadEvent);

				expect(preventDefaultSpy).not.toHaveBeenCalled();
			});
		});

		describe("when file gets picked", () => {
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
	});

	describe("when isEditMode is false", () => {
		const setup = (fileName = "") => {
			document.body.setAttribute("data-app", "true");

			const propsData = {
				fileName,
				elementId: "element 123",
				url: "1/file-record #1.txt",
				isEditMode: false,
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
	});
});
