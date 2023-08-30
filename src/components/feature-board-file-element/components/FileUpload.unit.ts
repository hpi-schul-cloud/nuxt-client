import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { createMock } from "@golevelup/ts-jest";
import { useSharedLastCreatedElement } from "@util-board";
import { shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";
import FilePicker from "./FilePicker.vue";
import FileUpload from "./FileUpload.vue";

jest.mock("@util-board");
const mockedUse = createMock<ReturnType<typeof useSharedLastCreatedElement>>();
const useSharedLastCreatedElementMock = jest.mocked(
	useSharedLastCreatedElement
);
useSharedLastCreatedElementMock.mockReturnValue(mockedUse);

describe(FileUpload.name, () => {
	const setupProps = (fileName: string) => ({
		fileName,
		elementId: "element 123",
		url: "1/file-record #1.txt",
	});

	const setup = (fileName = "") => {
		document.body.setAttribute("data-app", "true");

		const propsData = setupProps(fileName);

		const wrapper = shallowMount(FileUpload, {
			...createComponentMocks({ i18n: true }),
			propsData,
		});

		return {
			wrapper,
			fileNameProp: propsData.fileName,
			urlProp: propsData.url,
			elementId: propsData.elementId,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const component = wrapper.findComponent(FileUpload);
		expect(component.exists()).toBe(true);
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
	});
});
