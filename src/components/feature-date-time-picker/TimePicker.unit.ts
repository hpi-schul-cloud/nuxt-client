import Vue from "vue";
import { MountOptions, mount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import TimePicker from "./TimePicker.vue";
import { I18N_KEY } from "@/utils/inject";
import { i18nMock } from "@@/tests/test-utils";

type TimePickerProps = {
	time: string;
	label?: string;
	ariaLabel?: string;
	required?: boolean;
	allowPast?: boolean;
};

describe("TimePicker", () => {
	let wrapper: Wrapper<Vue>;

	// Fully mount component in the document so that trigger("focus") really focuses
	// https://v1.test-utils.vuejs.org/api/wrapper/trigger.html
	const attachToDOM = () => {
		const div = document.createElement("div");
		div.id = "root";
		document.body.appendChild(div);
	};

	const setup = (props: TimePickerProps) => {
		document.body.setAttribute("data-app", "true");
		attachToDOM();

		wrapper = mount(TimePicker as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: props,
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
			},
			attachTo: "#root",
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
			jest.useFakeTimers();
			setup({ time: "12:30" });

			const input = wrapper
				.findComponent({ name: "v-text-field" })
				.find("input");

			await input.setValue("16:45");

			jest.advanceTimersByTime(1000);
			expect(wrapper.emitted("update:time")).toHaveLength(1);
		});
	});

	describe("when picking a time through select", () => {
		it("should emit event on click", async () => {
			jest.useFakeTimers();
			setup({ time: "12:30" });

			const input = wrapper
				.findComponent({ name: "v-text-field" })
				.find("input");
			await input.trigger("click");

			const listItem = wrapper.findComponent({ name: "v-list-item" });
			expect(listItem.exists()).toBe(true);
			await listItem.trigger("click");

			jest.advanceTimersByTime(1000);
			expect(wrapper.emitted("update:time")).toHaveLength(1);
		});
	});

	describe("while scrolling through times when arrow key up or down is pressed", () => {
		it.each([
			["ArrowUp", 38],
			["ArrowDown", 40],
		])(
			"should NOT emit move-keyboard:edit when arrow key %s is pressed",
			async (key, code) => {
				const inputField = wrapper.findComponent({ name: "v-text-field" });
				inputField.vm.$emit(
					"keydown",
					new KeyboardEvent("keydown", {
						key: `${key}`,
						keyCode: code,
					})
				);

				await wrapper.vm.$nextTick();

				const listItem = wrapper.findComponent({ name: "v-list-item" });
				expect(listItem.exists()).toBe(true);
				expect(wrapper.emitted("move-keyboard:edit")).toBeUndefined();
			}
		);

		it.each([
			["ArrowUp", 38],
			["ArrowDown", 40],
		])(
			"should scroll the highlighted element into view when arrow key %s is pressed",
			async (key, code) => {
				const scrollIntoViewMock = jest.fn();
				HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

				// open the time list via keyboard
				const inputField = wrapper.findComponent({ name: "v-text-field" });
				inputField.vm.$emit(
					"keydown",
					new KeyboardEvent("keydown", {
						key: `${key}`,
						keyCode: code,
					})
				);

				await wrapper.vm.$nextTick();

				// change to the next available time via keyboard
				inputField.vm.$emit(
					"keydown",
					new KeyboardEvent("keydown", {
						key: `${key}`,
						keyCode: code,
					})
				);

				const highlightedTimes = wrapper.findAll(".v-list-item--highlighted");
				expect(highlightedTimes.length).toEqual(1);
				expect(scrollIntoViewMock).toHaveBeenCalledTimes(2);
			}
		);
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
			it("should no emit update:time event on empty input", async () => {
				setup({
					time: "12:30",
					required: true,
				});
				const input = wrapper
					.findComponent({ name: "v-text-field" })
					.find("input");

				await input.trigger("focus");
				await input.setValue("");
				await wrapper.vm.$nextTick();

				expect(wrapper.emitted("update:time")).toBeUndefined();
			});
		});

		describe("when time is not required and value is empty", () => {
			it("should not emit update:time event", async () => {
				setup({ time: "12:30" });

				const input = wrapper
					.findComponent({ name: "v-text-field" })
					.find("input");

				await input.trigger("focus");
				await input.setValue("");
				await input.trigger("blur");
				await wrapper.vm.$nextTick();

				expect(wrapper.emitted("update:time")).toBe(undefined);
			});
		});

		describe("when time does not fit format", () => {
			it("should no emit update:time event", async () => {
				setup({ time: "12:30" });

				const input = wrapper
					.findComponent({ name: "v-text-field" })
					.find("input");

				await input.trigger("focus");
				await input.setValue("25:65");
				await wrapper.vm.$nextTick();

				expect(wrapper.emitted("update:time")).toBeUndefined();
			});
		});
	});
});
