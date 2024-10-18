import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { ComponentMountingOptions, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { VTooltip } from "vuetify/lib/components/index.mjs";
import ExtendedIconBtn from "./ExtendedIconBtn.vue";

describe("@ui-extended-icon-btn/ExtendedIconBtn.vue", () => {
	const mountComponent = (
		options: ComponentMountingOptions<typeof ExtendedIconBtn> = {}
	) => {
		return mount(ExtendedIconBtn, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: { VTooltip: true },
			},
			...options,
		});
	};

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

	// TODO N21-2167 find tooltip
	it("should not show tooltip when hovered over", () => {});

	it("should render a clickable button", async () => {
		const wrapper = mountComponent({
			props: { icon: "example-icon", label: "example-label" },
		});

		await wrapper.get("button").trigger("click");

		expect(wrapper.emitted("click")).toBeDefined();
	});

	// TODO N21-2167 find tooltip
	describe("when label text is too long", () => {
		it("should show tooltip when hovered over", async () => {
			const wrapper = mountComponent({
				props: { icon: "example-icon", label: "too-long-example-label" },
			});

			const displayStyle = wrapper.getComponent(VTooltip).find("div").element
				.style.display;
			wrapper.get("button").trigger("mouseover");

			await nextTick();

			expect(displayStyle).toBe("none");
		});
	});
});
