import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mdiCheck } from "@mdi/js";
import { shallowMount } from "@vue/test-utils";
import SpeedMenu from "./SpeedMenu.vue";

describe("SpeedMenu", () => {
	describe("when rate is 0.5", () => {
		const setup = () => {
			document.body.setAttribute("data-app", "true");

			const rate = 0.5;
			const wrapper = shallowMount(SpeedMenu, {
				attachTo: document.body,
				propsData: {
					rate,
				},
				...createComponentMocks({}),
			});
			return {
				wrapper,
				rate,
			};
		};

		it("should display check icon on listitem with value 0.5", () => {
			const { wrapper, rate } = setup();

			const listItem = wrapper
				.findAllComponents({ name: "v-list-item" })
				.filter((listItem) => listItem.text().includes(`${rate}`))
				.at(0);
			const icon = listItem.findComponent({ name: "v-list-item-icon" });

			expect(icon.text()).toBe(mdiCheck);
		});

		describe("when selecting 1.25 value", () => {
			it("should emit updateRate", () => {
				const { wrapper } = setup();
				const value = 1.25;
				const listItem = wrapper
					.findAllComponents({ name: "v-list-item" })
					.filter((listItem) => listItem.text().includes(`${value}`))
					.at(0);
				listItem.vm.$emit("click");

				const emits = wrapper.emitted("updateRate");
				expect(emits).toHaveLength(1);
				expect(emits?.[0]).toEqual([value]);
			});
		});
	});

	describe("when rate is 0.75", () => {
		const setup = () => {
			document.body.setAttribute("data-app", "true");

			const rate = 0.75;
			const wrapper = shallowMount(SpeedMenu, {
				attachTo: document.body,
				propsData: {
					rate,
				},
				...createComponentMocks({}),
			});
			return {
				wrapper,
				rate,
			};
		};

		it("should display check icon on listitem with value 0.75", () => {
			const { wrapper, rate } = setup();

			const listItem = wrapper
				.findAllComponents({ name: "v-list-item" })
				.filter((listItem) => listItem.text().includes(`${rate}`))
				.at(0);
			const icon = listItem.findComponent({ name: "v-list-item-icon" });

			expect(icon.text()).toBe(mdiCheck);
		});
	});
});
