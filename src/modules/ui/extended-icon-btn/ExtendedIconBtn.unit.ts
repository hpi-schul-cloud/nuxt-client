import ExtendedIconBtn from "./ExtendedIconBtn.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ComponentMountingOptions, mount } from "@vue/test-utils";

describe("@ui-extended-icon-btn/ExtendedIconBtn.vue", () => {
	const mountComponent = (options: ComponentMountingOptions<typeof ExtendedIconBtn> = {}) =>
		mount(ExtendedIconBtn, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: { VTooltip: true },
			},
			...options,
		});

	it("should render component", () => {
		const wrapper = mountComponent({
			props: { icon: "example-icon", label: "example-label" },
		});
		expect(wrapper.findComponent(ExtendedIconBtn).exists()).toEqual(true);
	});

	it("should render the icon", () => {
		const wrapper = mountComponent({
			props: { icon: "example-icon", label: "example-label" },
		});
		expect(wrapper.get(".v-icon path").html()).toContain("example-icon");
	});

	it("should render the label", () => {
		const wrapper = mountComponent({
			props: { icon: "example-icon", label: "example-label" },
		});
		expect(wrapper.html()).toContain("example-label");
	});

	it("should render a clickable button", async () => {
		const wrapper = mountComponent({
			props: { icon: "example-icon", label: "example-label" },
		});

		await wrapper.get("button").trigger("click");

		expect(wrapper.emitted("click")).toBeDefined();
	});
});
