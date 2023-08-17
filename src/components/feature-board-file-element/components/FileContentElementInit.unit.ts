import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import FileContentElementInit from "./FileContentElementInit.vue";
import FilePicker from "./FilePicker.vue";
import { useSharedLastCreatedElement } from "@util-board";
import { createMock } from "@golevelup/ts-jest";
import { nextTick } from "vue";

jest.mock("@util-board");
const mockedUse = createMock<ReturnType<typeof useSharedLastCreatedElement>>();
const useSharedLastCreatedElementMock = jest.mocked(
	useSharedLastCreatedElement
);
useSharedLastCreatedElementMock.mockReturnValue(mockedUse);

describe(FileContentElementInit.name, () => {
	const setupProps = (fileName: string) => ({
		fileName,
		elementId: "element 123",
		url: "1/file-record #1.txt",
	});

	const setup = (fileName = "") => {
		document.body.setAttribute("data-app", "true");

		const propsData = setupProps(fileName);

		const wrapper = shallowMount(FileContentElementInit, {
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

		const component = wrapper.findComponent(FileContentElementInit);
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
