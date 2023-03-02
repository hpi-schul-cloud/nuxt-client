import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import TimePicker from "@/components/date-time-picker/TimePicker.vue";

const getWrapper = (props?: object, options?: object) => {
	return mount(TimePicker, {
		...createComponentMocks({
			i18n: true,
		}),
		provide: {
			i18n: { t: (key: string) => key },
		},
		propsData: props,
		...options,
	});
};

describe("@components/date-time-picker/TimePicker", () => {
	it("should render component with empty value", () => {
		const wrapper = getWrapper({
			time: "",
		});
		expect(wrapper.findComponent(TimePicker).exists()).toBe(true);
	});

	it("should render component with given value", () => {
		const wrapper = getWrapper({
			time: "12:30",
		});
		expect(wrapper.findComponent(TimePicker).exists()).toBe(true);
	});

	describe("when picking a time through typing", () => {
		it("should emit event on input", async () => {
			const wrapper = getWrapper({
				time: new Date().toISOString(),
			});

			const textField = wrapper.findComponent({ name: "v-text-field" });
			const input = textField.find("input");
			input.setValue("13:12");

			textField.vm.$emit("blur");
			await wrapper.vm.$nextTick();

			expect(wrapper.emitted("input")).toHaveLength(1);
		});
	});

	describe("when picking a time through select", () => {
		it("should emit event on input", async () => {
			const wrapper = getWrapper({
				time: "12:30",
			});

			const textField = wrapper.findComponent({ name: "v-text-field" });
			const input = textField.find("input");
			expect(input.exists()).toBe(true);
			await input.trigger("click");

			const listItem = wrapper.findComponent({ name: "v-list-item" });
			expect(listItem.exists()).toBe(true);
			await listItem.trigger("click");

			expect(wrapper.emitted("input")).toHaveLength(1);
		});
	});

	describe("validation", () => {
		describe("when time is required", () => {
			it("should emit error event on clear", async () => {
				const wrapper = getWrapper({
					time: "12:30",
					required: true,
				});

				const textField = wrapper.findComponent({ name: "v-text-field" });
				const clearBtn = textField.find(".v-icon");
				expect(clearBtn.exists()).toBe(true);
				await clearBtn.trigger("click");

				textField.vm.$emit("blur");
				await wrapper.vm.$nextTick();

				expect(wrapper.emitted("error")).toHaveLength(1);
			});

			it("should emit error event on empty input", async () => {
				const wrapper = getWrapper({
					time: "12:30",
					required: true,
				});

				const textField = wrapper.findComponent({ name: "v-text-field" });
				const input = textField.find("input");
				input.setValue("");

				textField.vm.$emit("blur");
				await wrapper.vm.$nextTick();

				expect(wrapper.emitted("error")).toHaveLength(1);
			});
		});

		describe("when time is not required and value is empty", () => {
			it("should not emit error event", () => {
				const wrapper = getWrapper({
					time: "",
				});

				const textField = wrapper.findComponent({ name: "v-text-field" });
				const input = textField.find("input");
				input.setValue("");

				expect(textField.emitted("input")).toHaveLength(1);
				jest.advanceTimersByTime(1000);

				expect(wrapper.emitted("error")).toBe(undefined);
			});
		});

		describe("when time does not fit format", () => {
			it("should emit error event", async () => {
				const wrapper = getWrapper({
					time: "02:00",
				});

				const textField = wrapper.findComponent({ name: "v-text-field" });
				const input = textField.find("input");
				input.setValue("25:65");

				textField.vm.$emit("blur");
				await wrapper.vm.$nextTick();

				expect(wrapper.emitted("error")).toHaveLength(1);
			});
		});
	});
});
