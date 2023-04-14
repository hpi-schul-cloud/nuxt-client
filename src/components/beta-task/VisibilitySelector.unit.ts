import Vue from "vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, mount, Wrapper } from "@vue/test-utils";
import VisibilitySelector from "@/components/beta-task/VisibilitySelector.vue";
import DateTimePicker from "@/components/date-time-picker/DateTimePicker.vue";

describe("@components/beta-task/VisibilitySelector", () => {
	let wrapper: Wrapper<Vue>;

	const defaultProps = {
		value: "",
	};

	const setup = (props = defaultProps) => {
		document.body.setAttribute("data-app", "true");

		wrapper = mount(VisibilitySelector as MountOptions<Vue>, {
			...createComponentMocks({}),
			provide: {
				i18n: { t: (key: string) => key },
			},
			propsData: props,
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup();
			expect(wrapper.findComponent(VisibilitySelector).exists()).toBe(true);
		});
	});

	describe("prop values", () => {
		describe("when component is mounted with empty date", () => {
			it("should render with 'not visible' option selected", () => {
				setup();
				const selection = wrapper
					.findComponent(VisibilitySelector)
					.find(".v-select__selection");
				expect(selection.text()).toEqual("common.labels.notVisible");
			});

			it("should not render with DateTimePicker", () => {
				setup();
				const dateTimePicker = wrapper.findComponent(DateTimePicker);
				expect(dateTimePicker.exists()).toBe(false);
			});
		});

		describe("when component is mounted with date in the future", () => {
			it("should render with 'visible at' option selected", () => {
				const dateInFuture = new Date();
				dateInFuture.setDate(dateInFuture.getDate() + 1);
				setup({
					value: dateInFuture.toISOString(),
				});

				const selection = wrapper
					.findComponent(VisibilitySelector)
					.find(".v-select__selection");
				expect(selection.text()).toEqual("common.labels.visibleAt");
			});

			it("should render with DateTimePicker", () => {
				const dateInFuture = new Date();
				dateInFuture.setDate(dateInFuture.getDate() + 1);
				setup({
					value: dateInFuture.toISOString(),
				});

				const dateTimePicker = wrapper.findComponent(DateTimePicker);
				expect(dateTimePicker.exists()).toBe(true);
			});
		});

		describe("when component is mounted with date in the past", () => {
			it("should render with 'visible' option selected", () => {
				const dateInPast = new Date();
				dateInPast.setDate(dateInPast.getDate() - 1);
				setup({
					value: dateInPast.toISOString(),
				});

				const selection = wrapper
					.findComponent(VisibilitySelector)
					.find(".v-select__selection");
				expect(selection.text()).toEqual("common.labels.visible");
			});

			it("should not render with DateTimePicker", () => {
				const dateInFuture = new Date();
				dateInFuture.setDate(dateInFuture.getDate() - 1);
				setup({
					value: dateInFuture.toISOString(),
				});

				const dateTimePicker = wrapper.findComponent(DateTimePicker);
				expect(dateTimePicker.exists()).toBe(false);
			});
		});
	});

	describe("event emits", () => {
		describe("when option 'not visible' is chosen", () => {
			it("should emit input with empty date", async () => {
				setup();

				const select = wrapper.findComponent({ name: "v-select" });
				await select.vm.$emit("change", "notVisible");

				expect(wrapper.emitted("input")).toHaveLength(1);
				const emits = wrapper.emitted("input") || [[]];
				expect(emits[0][0]).toEqual("");
			});
		});

		describe("when option 'visible' is chosen", () => {
			it("should emit input with date iso string", async () => {
				setup();

				const select = wrapper.findComponent({ name: "v-select" });
				await select.vm.$emit("change", "visible");

				expect(wrapper.emitted("input")).toHaveLength(1);
				const emits = wrapper.emitted("input") || [[]];
				expect(emits[0][0]).toHaveLength(24);
			});
		});

		describe("when option 'visible at' is chosen", () => {
			it("should emit input with date iso string", async () => {
				const dateInFuture = new Date();
				dateInFuture.setDate(dateInFuture.getDate() + 1);
				setup({
					value: dateInFuture.toISOString(),
				});

				const dateTimePicker = wrapper.findComponent(DateTimePicker);
				await dateTimePicker.vm.$emit("input", dateInFuture.toISOString());

				expect(wrapper.emitted("input")).toHaveLength(1);
				const emits = wrapper.emitted("input") || [[]];
				expect(emits[0][0]).toHaveLength(24);
			});
		});
	});
});
