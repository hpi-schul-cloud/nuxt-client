import { ComponentMountingOptions, mount } from "@vue/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import DataFilter from "./DataFilter.vue";

const mountComponent = (
	options: ComponentMountingOptions<typeof DataFilter> = {}
) => {
	return mount(DataFilter, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
		},
		...options,
	});
};

describe("@components/DataFilter/DataFilter.vue", () => {
	describe("should render the component", () => {
		it("should render the component", () => {
			const wrapper = mountComponent();
			wrapper.setProps({ filterFor: "student" });

			expect(wrapper.exists()).toBe(true);
			expect(wrapper.vm.userType).toBe("student");
		});

		it("should emit 'update:filter' when chip components be closed", async () => {
			const wrapper = mountComponent();
			const filterChipsComponent = wrapper.getComponent({
				name: "FilterChips",
			});
			filterChipsComponent.vm.$emit("remove:filter");

			expect(wrapper.emitted()).toHaveProperty("update:filter");
		});

		it("should emit 'update:filter' when chip components be closed", async () => {
			const wrapper = mountComponent();
			const filterChipsComponent = wrapper.getComponent({
				name: "FilterChips",
			});
			filterChipsComponent.vm.$emit("remove:filter");

			expect(wrapper.emitted()).toHaveProperty("update:filter");
		});

		it("should set the 'dialogOpen' false when 'close' event be emitted", async () => {
			const wrapper = mountComponent();
			wrapper.vm.dialogOpen = true;
			const filterDialogComponent = wrapper.getComponent({
				name: "FilterDialog",
			});
			await filterDialogComponent.vm.$emit("dialog-closed");

			expect(wrapper.vm.dialogOpen).toBe(false);
		});

		it("should set filter title", async () => {
			const wrapper = mountComponent();

			expect(wrapper.vm.filterTitle).toStrictEqual(
				"components.organisms.DataFilter.add"
			);
		});
	});
});
