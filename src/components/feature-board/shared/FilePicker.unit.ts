import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import Vue, { nextTick, ref } from "vue";
import { useFilePicker } from "./FilePicker.composable";
import FilePicker from "./FilePicker.vue";
jest.mock("./FilePicker.composable");

describe("FilePicker", () => {
	const setupFilePickerComposableMock = () => {
		const isFilePickerOpen = ref(false);
		const triggerFilePicker = jest.fn();

		const mockedUseFilePicker = jest.mocked(useFilePicker);
		mockedUseFilePicker.mockReturnValue({
			isFilePickerOpen,
			triggerFilePicker,
		});

		return { isFilePickerOpen, triggerFilePicker };
	};

	describe("when isFilePickerOpen is false", () => {
		const setup = () => {
			document.body.setAttribute("data-app", "true");

			setupFilePickerComposableMock();

			const wrapper: Wrapper<Vue> = mount(FilePicker as MountOptions<Vue>, {
				...createComponentMocks({}),
			});

			return { wrapper };
		};

		it("should be found in dom", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent(FilePicker).exists()).toBe(true);
		});
	});

	describe("when isFilePickerOpen is changed from false to true", () => {
		const setup = async () => {
			document.body.setAttribute("data-app", "true");

			const { isFilePickerOpen, triggerFilePicker } =
				setupFilePickerComposableMock();

			const wrapper: Wrapper<Vue> = mount(FilePicker as MountOptions<Vue>, {
				...createComponentMocks({}),
				attachTo: document.body,
			});

			isFilePickerOpen.value = true;
			await nextTick();

			return { triggerFilePicker, wrapper };
		};

		it("should call triggerFilePicker", async () => {
			const { triggerFilePicker } = await setup();

			expect(triggerFilePicker).toBeCalled();
		});

		it("should click input element", async () => {
			const { wrapper } = await setup();

			const input = (wrapper.vm.$refs.inputRef as any).$refs?.input;
			const focusedElement = document.activeElement;

			// Checks if the input element was clicked implicitly by checking if it is focused
			expect(focusedElement === input).toBe(true);
		});
	});
});
