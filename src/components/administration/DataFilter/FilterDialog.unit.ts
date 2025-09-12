import { ComponentMountingOptions, mount } from "@vue/test-utils";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import FilterDialog from "./FilterDialog.vue";

describe("@components/DataFilter/FilterDialog.vue", () => {
	const mountComponent = (
		options: ComponentMountingOptions<typeof FilterDialog> = {}
	) => {
		return mount(FilterDialog, {
			global: {
				plugins: [createTestingVuetify()],
			},
			...options,
		});
	};

	describe("should render the component", () => {
		it("should render the component", () => {
			const wrapper = mountComponent();
			expect(wrapper.exists()).toBe(true);
		});

		it("should pass the props to dialog component", async () => {
			const wrapper = mountComponent();
			await wrapper.setProps({ isOpen: true });
			const dialog = wrapper.getComponent({ name: "v-dialog" });

			expect(dialog.props("modelValue")).toBe(true);
			expect(dialog.props("maxWidth")).toBe(480);
		});

		it("should emit the 'dialog:close' event on close", async () => {
			const wrapper = mountComponent();
			const dialog = wrapper.getComponent({ name: "v-dialog" });
			await dialog.vm.$emit("update:modelValue", false);

			expect(wrapper.emitted()).toHaveProperty("dialog-closed");
		});
	});
});
