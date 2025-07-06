import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import FilePicker from "./FilePicker.vue";

describe("FilePicker", () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("when isFilePickerOpen is false", () => {
		const setup = () => {
			const wrapper = mount(FilePicker, {
				global: { plugins: [createTestingVuetify(), createTestingI18n()] },
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
			const wrapper = mount(FilePicker, {
				global: { plugins: [createTestingVuetify(), createTestingI18n()] },
				props: {
					isFilePickerOpen: false,
					maxFileSizeInByte: 100,
				},
			});

			const input = wrapper.findComponent({ name: "v-file-input" });

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
			await nextTick();

			expect(input.emitted("update:focused")).toBeDefined();
		});
	});

	describe("when file is selected", () => {
		describe("when file size possible", () => {
			const setup = () => {
				const wrapper = mount(FilePicker, {
					global: { plugins: [createTestingVuetify(), createTestingI18n()] },
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

				const input = wrapper.findComponent({ name: "v-file-input" });
				// this also triggers the "change event"
				await input.setValue(file);
				await nextTick();

				expect(wrapper.emitted("update:file")).toHaveLength(1);
			});
		});
	});
});
