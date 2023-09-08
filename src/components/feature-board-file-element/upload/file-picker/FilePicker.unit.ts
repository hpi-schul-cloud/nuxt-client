import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import Vue, { nextTick } from "vue";
import FilePicker from "./FilePicker.vue";

describe("FilePicker", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when isFilePickerOpen is false", () => {
		const setup = () => {
			document.body.setAttribute("data-app", "true");

			const wrapper: Wrapper<Vue> = mount(FilePicker as MountOptions<Vue>, {
				...createComponentMocks({}),
				propsData: {
					isFilePickerOpen: false,
					maxFileSizeInByte: 100,
				},
			});

			return { wrapper };
		};

		it("should be found in dom", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent(FilePicker).exists()).toBe(true);
		});
	});

	describe("when isFilePickerOpen is changed from false to true", () => {
		const setup = () => {
			document.body.setAttribute("data-app", "true");

			const wrapper = mount(FilePicker as MountOptions<Vue>, {
				...createComponentMocks({}),
				attachTo: document.body,
				propsData: {
					isFilePickerOpen: false,
					maxFileSizeInByte: 100,
				},
			});

			const input = (wrapper.vm.$refs.inputRef as any).$refs?.input;
			input.click = jest.fn();

			return { wrapper, input };
		};

		it("should emit update:isFilePickerOpen", async () => {
			const { wrapper } = setup();

			await wrapper.setProps({ isFilePickerOpen: true });
			await nextTick();

			expect(wrapper.emitted("update:isFilePickerOpen")).toHaveLength(1);

			await wrapper.setProps({ isFilePickerOpen: false });
			await nextTick();

			await wrapper.setProps({ isFilePickerOpen: true });
			await nextTick();

			expect(wrapper.emitted("update:isFilePickerOpen")).toHaveLength(2);
		});

		it("should click input element", async () => {
			const { wrapper, input } = setup();

			await wrapper.setProps({ isFilePickerOpen: true });
			await nextTick();

			expect(input.click).toHaveBeenCalledTimes(1);
		});
	});

	describe("when file is selected", () => {
		describe("when file size possible", () => {
			const setup = () => {
				document.body.setAttribute("data-app", "true");

				const wrapper = mount(FilePicker as MountOptions<Vue>, {
					...createComponentMocks({}),
					attachTo: document.body,
					propsData: {
						isFilePickerOpen: false,
						maxFileSizeInByte: 100000,
					},
				});
				const file = new File([""], "filename", { type: "text/plain" });

				return { wrapper, file };
			};

			it("should emit update:fileOpen", async () => {
				const { wrapper, file } = setup();

				const input = wrapper.findComponent({ ref: "inputRef" });
				// this also triggers the "change event"
				await input.setData({ internalValue: file });
				await nextTick();

				expect(wrapper.emitted("update:file")).toHaveLength(1);
			});
		});
	});
});
