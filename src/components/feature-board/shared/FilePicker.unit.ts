import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import Vue, { nextTick, ref } from "vue";
import { useFilePicker } from "./FilePicker.composable";
import FilePicker from "./FilePicker.vue";
jest.mock("./FilePicker.composable");

describe("FilePicker", () => {
	let wrapper: Wrapper<Vue>;
	const mockedUseFilePicker = jest.mocked(useFilePicker);

	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const isFilePickerOpen = ref(false);
		const triggerFilePicker = jest.fn();

		mockedUseFilePicker.mockReturnValue({
			isFilePickerOpen,
			triggerFilePicker,
		});

		wrapper = mount(FilePicker as MountOptions<Vue>, {
			...createComponentMocks({}),
		});
		const filePicker = wrapper.findComponent({ name: "FilePicker" });

		return { filePicker, isFilePickerOpen, triggerFilePicker };
	};

	it("should be found in dom", () => {
		setup();
		expect(wrapper.findComponent(FilePicker).exists()).toBe(true);
	});

	describe("when isFilePickerOpen is changed from false to true", () => {
		it("should call triggerFilePicker", async () => {
			const { isFilePickerOpen, triggerFilePicker } = setup();
			isFilePickerOpen.value = true;
			await nextTick();

			expect(triggerFilePicker).toBeCalled();
		});
	});
});
