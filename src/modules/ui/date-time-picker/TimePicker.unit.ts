import { ComponentMountingOptions, mount } from "@vue/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import TimePicker from "./TimePicker.vue";

describe("TimePicker", () => {
	const mountComponent = (
		options: ComponentMountingOptions<typeof TimePicker> = {}
	) => {
		return mount(TimePicker, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			...options,
			attachTo: document.body,
		});
	};

	it("should render component with empty value", () => {
		const wrapper = mountComponent({
			props: { time: "" },
		});
		expect(wrapper.findComponent(TimePicker).exists()).toBe(true);
	});

	it("should render component with given value", () => {
		const wrapper = mountComponent({
			props: { time: "12:30" },
		});
		expect(wrapper.findComponent(TimePicker).exists()).toBe(true);
	});

	describe("when picking a time through typing", () => {
		it("should emit event on input", async () => {
			const wrapper = mountComponent({
				props: { time: "12:30" },
			});

			const input = wrapper
				.findComponent({ name: "v-text-field" })
				.find("input");

			await input.setValue("16:45");

			expect(wrapper.emitted("update:time")).not.toBeUndefined();
			expect(wrapper.emitted("update:time")!.length).toBeGreaterThan(0);
		});
	});

	describe("validation", () => {
		describe("when time is required", () => {
			it("should no emit update:time event but error event on empty input", async () => {
				const wrapper = mountComponent({
					props: { time: "12:30", required: true },
				});

				const input = wrapper
					.findComponent({ name: "v-text-field" })
					.find("input");

				await input.trigger("focus");
				await input.setValue("");
				await wrapper.vm.$nextTick();

				expect(wrapper.emitted("update:time")).toBeUndefined();
				expect(wrapper.emitted("error")).not.toBeUndefined();
			});
		});

		describe("when time is not required and value is empty", () => {
			it("should emit update:time event", async () => {
				const wrapper = mountComponent({
					props: { time: "12:30" },
				});

				const input = wrapper
					.findComponent({ name: "v-text-field" })
					.find("input");

				await input.setValue("");

				expect(wrapper.emitted("update:time")).not.toBeUndefined();
				expect(wrapper.emitted("update:time")!.length).toBeGreaterThan(0);
			});
		});

		describe("when time does not fit format", () => {
			it("should no emit update:time event", async () => {
				const wrapper = mountComponent({
					props: { time: "12:30" },
				});

				const input = wrapper
					.findComponent({ name: "v-text-field" })
					.find("input");

				await input.trigger("focus");
				await input.setValue("25:65");

				expect(wrapper.emitted("update:time")).toBeUndefined();

				expect(wrapper.emitted("error")).not.toBeUndefined();
				expect(wrapper.emitted("error")!.length).toBeGreaterThan(0);
			});
		});
	});
});
