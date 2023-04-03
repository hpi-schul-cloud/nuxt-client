import Vue from "vue";
import { MountOptions, mount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import TimePicker from "@/components/date-time-picker/TimePicker.vue";

type TimePickerProps = {
	time: string;
	label?: string;
	ariaLabel?: string;
	required?: boolean;
	allowPast?: boolean;
};

describe("@components/date-time-picker/TimePicker", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (props: TimePickerProps) => {
		document.body.setAttribute("data-app", "true");
		wrapper = mount(TimePicker as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: props,
			provide: {
				i18n: { t: (key: string) => key },
			},
		});
	};

	it("should render component with empty value", () => {
		setup({ time: "" });
		expect(wrapper.findComponent(TimePicker).exists()).toBe(true);
	});

	it("should render component with given value", () => {
		setup({ time: "12:30" });
		expect(wrapper.findComponent(TimePicker).exists()).toBe(true);
	});

	describe("when picking a time through typing", () => {
		it("should emit event on input", async () => {
			setup({ time: "12:30" });

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
			setup({ time: "12:30" });

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
		beforeEach(() => {
			const mockedDate = new Date("2023-01-01T03:10:05"); // 03:00
			jest.useFakeTimers("modern");
			jest.setSystemTime(mockedDate);
		});

		afterEach(() => {
			jest.useRealTimers();
		});

		describe("when time is required", () => {
			it("should emit error event on clear", async () => {
				setup({
					time: "12:30",
					required: true,
				});

				const textField = wrapper.findComponent({ name: "v-text-field" });
				const clearBtn = textField.find(".v-icon");
				expect(clearBtn.exists()).toBe(true);
				clearBtn.trigger("click");

				textField.vm.$emit("blur");
				await wrapper.vm.$nextTick();

				expect(wrapper.emitted("error")).toHaveLength(1);
			});

			it("should emit error event on empty input", async () => {
				setup({
					time: "12:30",
					required: true,
				});

				const textField = wrapper.findComponent({ name: "v-text-field" });
				const input = textField.find("input");
				input.setValue("");
				await wrapper.vm.$nextTick();

				expect(wrapper.emitted("error")).toHaveLength(1);
			});
		});

		describe("when time is not required and value is empty", () => {
			it("should not emit error event", () => {
				setup({ time: "12:30" });

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
				setup({ time: "12:30" });

				const textField = wrapper.findComponent({ name: "v-text-field" });
				const input = textField.find("input");
				input.setValue("25:65");
				await wrapper.vm.$nextTick();

				expect(wrapper.emitted("error")).toHaveLength(1);
			});
		});

		describe("when time in the past is not allowed", () => {
			it("should disable selection of time in the past", async () => {
				setup({
					time: "12:30",
					allowPast: false,
				});

				const textField = wrapper.findComponent({ name: "v-text-field" });
				const input = textField.find("input");
				expect(input.exists()).toBe(true);
				await input.trigger("click");

				const oneOClockListItem = wrapper
					.findAll({ name: "v-list-item" })
					.at(0); // 00:00
				expect(oneOClockListItem.attributes()["aria-disabled"]).toBeDefined();
			});

			it("should enable selection of time in the future", async () => {
				setup({
					time: "12:30",
					allowPast: false,
				});

				const textField = wrapper.findComponent({ name: "v-text-field" });
				const input = textField.find("input");
				expect(input.exists()).toBe(true);
				await input.trigger("click");

				const fiveOClockListItem = wrapper
					.findAll({ name: "v-list-item" })
					.at(10); // 05:00
				expect(
					fiveOClockListItem.attributes()["aria-disabled"]
				).toBeUndefined();
			});

			it("should emit error event when time inserted is in the past", async () => {
				setup({
					time: "12:30",
					allowPast: false,
				});

				const textField = wrapper.findComponent({ name: "v-text-field" });
				const input = textField.find("input");
				input.setValue("03:01");
				await wrapper.vm.$nextTick();

				expect(wrapper.emitted("error")).toHaveLength(1);
			});

			it("should emit input event when time inserted is in the future", async () => {
				setup({
					time: "12:30",
					allowPast: false,
				});

				const textField = wrapper.findComponent({ name: "v-text-field" });
				const input = textField.find("input");
				input.setValue("03:11");

				textField.vm.$emit("blur");
				await wrapper.vm.$nextTick();

				expect(wrapper.emitted("input")).toHaveLength(1);
			});
		});

		describe("when time in the past is allowed", () => {
			it("should enable selection of time in the past", async () => {
				setup({ time: "12:30" });

				const textField = wrapper.findComponent({ name: "v-text-field" });
				const input = textField.find("input");
				expect(input.exists()).toBe(true);
				await input.trigger("click");

				const oneOClockListItem = wrapper
					.findAll({ name: "v-list-item" })
					.at(0); // 00:00
				expect(oneOClockListItem.attributes()["aria-disabled"]).toBeUndefined();
			});

			it("should emit input event when time inserted is in the past", async () => {
				setup({ time: "12:30" });

				const textField = wrapper.findComponent({ name: "v-text-field" });
				const input = textField.find("input");
				input.setValue("02:00");

				textField.vm.$emit("blur");
				await wrapper.vm.$nextTick();

				expect(wrapper.emitted("input")).toHaveLength(1);
			});
		});
	});
});
