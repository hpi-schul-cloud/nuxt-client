import SvsLoadingSpinner from "./SvsLoadingSpinner.vue";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { flushPromises, mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { VProgressCircular } from "vuetify/components";

describe("SvsLoadingSpinner", () => {
	beforeEach(() => vi.useFakeTimers());
	afterEach(() => vi.useRealTimers());

	const advanceInTime = async (ms: number) => {
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

	it("should show content immediately when not loading", () => {
		const wrapper = setup(false);

		expect(wrapper.find("p").exists()).toBe(true);
		expect(wrapper.findComponent(VProgressCircular).exists()).toBe(false);
	});

	it("should not show spinner before debounce delay", async () => {
		const wrapper = setup(true);

		await advanceInTime(100);

		expect(wrapper.findComponent(VProgressCircular).exists()).toBe(false);
		expect(wrapper.find("p").exists()).toBe(false);
	});

	it("should show spinner after debounce delay when loading", async () => {
		const wrapper = setup(true);

		await advanceInTime(200);

		expect(wrapper.findComponent(VProgressCircular).exists()).toBe(true);
		expect(wrapper.find("p").exists()).toBe(false);
	});

	it("should show content immediately when loading finishes, regardless of debounce", async () => {
		const wrapper = setup(true);

		await advanceInTime(100);
		expect(wrapper.findComponent(VProgressCircular).exists()).toBe(false);

		await wrapper.setProps({ loading: false });
		await nextTick();

		expect(wrapper.find("p").exists()).toBe(true);
		expect(wrapper.findComponent(VProgressCircular).exists()).toBe(false);
	});

	it("should hide spinner immediately when loading finishes after debounce", async () => {
		const wrapper = setup(true);

		await advanceInTime(200);
		expect(wrapper.findComponent(VProgressCircular).exists()).toBe(true);

		await wrapper.setProps({ loading: false });
		await nextTick();

		expect(wrapper.find("p").exists()).toBe(true);
		expect(wrapper.findComponent(VProgressCircular).exists()).toBe(false);
	});
});
