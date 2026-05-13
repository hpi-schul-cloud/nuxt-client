import SvsLoading from "./SvsLoading.vue";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { VProgressCircular } from "vuetify/components";

describe("SvsLoading", () => {
	const setup = (props = {}, slots = {}) =>
		mount(SvsLoading, {
			props,
			slots: { default: "<p>Content</p>", ...slots },
			global: {
				plugins: [createTestingVuetify()],
			},
		});

	it("should render default slot content when not loading", () => {
		const wrapper = setup({ isLoading: false });

		expect(wrapper.find("p").exists()).toBe(true);
		expect(wrapper.findComponent(VProgressCircular).exists()).toBe(false);
	});

	it("should show spinner and hide content when loading", () => {
		const wrapper = setup({ isLoading: true });

		expect(wrapper.findComponent(VProgressCircular).exists()).toBe(true);
		expect(wrapper.find("p").exists()).toBe(false);
	});

	it("should default to not loading", () => {
		const wrapper = setup();

		expect(wrapper.find("p").exists()).toBe(true);
		expect(wrapper.findComponent(VProgressCircular).exists()).toBe(false);
	});

	it("should pass size prop to VProgressCircular", () => {
		const wrapper = setup({ isLoading: true, size: 50 });

		const spinner = wrapper.findComponent(VProgressCircular);
		expect(spinner.props("size")).toBe(50);
	});

	it("should render custom loading slot when loading", () => {
		const wrapper = mount(SvsLoading, {
			props: { isLoading: true },
			slots: { loading: "<span>Custom Spinner</span>" },
			global: { plugins: [createTestingVuetify()] },
		});

		expect(wrapper.find("span").text()).toBe("Custom Spinner");
		expect(wrapper.findComponent(VProgressCircular).exists()).toBe(false);
	});
});
