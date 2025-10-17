import FilterChips from "./FilterChips.vue";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { ComponentMountingOptions, mount } from "@vue/test-utils";

describe("@components/DataFilter/filterComponents/FilterChips.vue", () => {
	const mockProps = [
		{ item: "classes", title: "Klasse(n) = 1C, 1D" },
		{ item: "consentStatus", title: "Schülereinverständnis fehlt" },
	];
	const mountComponent = (options: ComponentMountingOptions<typeof FilterChips> = {}) =>
		mount(FilterChips, {
			global: {
				plugins: [createTestingVuetify()],
			},
			props: {
				filters: [],
			},
			...options,
		});

	describe("should render the component", () => {
		it("should render the chips", async () => {
			const wrapper = mountComponent();
			await wrapper.setProps({ filters: mockProps });
			const chips = wrapper.findAllComponents(".v-chip");
			expect(chips.length).toBe(2);
			expect(chips[0].text()).toBe(mockProps[0].title);
			expect(chips[1].text()).toBe(mockProps[1].title);
		});
	});

	describe("should emit the event", () => {
		it("should emit remove:filter on close event", async () => {
			const wrapper = mountComponent();
			await wrapper.setProps({ filters: mockProps });

			const chipComponent = wrapper.getComponent({ name: "v-chip" });
			await chipComponent.vm.$emit("click:close");

			expect(wrapper.emitted()).toHaveProperty("remove:filter");
			expect(wrapper.emitted()["remove:filter"]).toStrictEqual([[mockProps[0].item]]);
		});

		it("should emit click:filter on click event", async () => {
			const wrapper = mountComponent();
			await wrapper.setProps({ filters: mockProps });

			const chips = wrapper.findAllComponents(".v-chip");
			await chips[1].trigger("click");

			expect(wrapper.emitted()).toHaveProperty("click:filter");
			expect(wrapper.emitted()["click:filter"]).toStrictEqual([[mockProps[1].item]]);
		});
	});
});
