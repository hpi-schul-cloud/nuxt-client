import SvsLoadingSpinner from "./SvsLoadingSpinner.vue";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { flushPromises, mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { VProgressCircular } from "vuetify/components";

describe("SvsLoadingSpinner", () => {
	beforeEach(() => vi.useFakeTimers());
	afterEach(() => vi.useRealTimers());

	const advanceInTime = async (ms = 350) => {
		await flushPromises();
		vi.advanceTimersByTime(ms);
		await nextTick();
	};

	const setup = (loading: boolean) =>
		mount(SvsLoadingSpinner, {
			props: { loading },
			slots: { default: "<p>Content</p>" },
			global: {
				plugins: [createTestingVuetify()],
			},
		});

	it("should show content, not spinner when not loading", () => {
		const wrapper = setup(false);

		expect(wrapper.find("p").exists()).toBe(true);
		expect(wrapper.findComponent(VProgressCircular).exists()).toBe(false);
	});

	it("should show spinner after debounce when loading", async () => {
		const wrapper = setup(true);

		expect(wrapper.findComponent(VProgressCircular).exists()).toBe(true);
		expect(wrapper.find("p").exists()).toBe(false);

		await wrapper.setProps({ loading: false });
		await advanceInTime(200);

		expect(wrapper.findComponent(VProgressCircular).exists()).toBe(false);
		expect(wrapper.find("p").exists()).toBe(true);
	});

	it("should show spinner if loading turns false before debounce", async () => {
		const wrapper = setup(true);

		await wrapper.setProps({ loading: false });
		await advanceInTime(100);

		expect(wrapper.findComponent(VProgressCircular).exists()).toBe(true);
		expect(wrapper.find("p").exists()).toBe(false);
	});
});
