import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mdiCheck } from "@icons/material";
import { shallowMount } from "@vue/test-utils";
import SpeedMenu from "./SpeedMenu.vue";

describe("SpeedMenu", () => {
	const listItemSelektor = "v-list-item";

	describe("when rate is 0.5", () => {
		const setup = () => {
			const rate = 0.5;
			const wrapper = shallowMount(SpeedMenu, {
				props: {
					rate,
				},
				global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			});

			return {
				wrapper,
				rate,
			};
		};

		it("should display check icon on listitem with value 0.5", () => {
			const { wrapper, rate } = setup();

			const listItem = wrapper
				.findAllComponents({ name: listItemSelektor })
				.filter((listItem) => listItem.text().includes(`${rate}`))
				.at(0);

			const icon = listItem?.vm.$slots
				.append()[0]
				.children.default()[0].children;

			expect(icon).toBe(mdiCheck);
		});

		describe("when selecting 1.25 value", () => {
			it("should emit updateRate", async () => {
				const { wrapper } = setup();
				const value = 1.25;
				const listItem = wrapper
					.findAllComponents({ name: listItemSelektor })
					.filter((listItem) => listItem.text().includes(`${value}`))
					.at(0);

				listItem?.vm.$emit("click");

				const emits = wrapper.emitted("updateRate");
				expect(emits).toHaveLength(1);
				expect(emits?.[0]).toEqual([value]);
			});
		});
	});

	describe("when rate is 0.75", () => {
		const setup = () => {
			const rate = 0.75;
			const wrapper = shallowMount(SpeedMenu, {
				props: {
					rate,
				},
				global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			});
			return {
				wrapper,
				rate,
			};
		};

		it("should display check icon on listitem with value 0.75", () => {
			const { wrapper, rate } = setup();

			const listItem = wrapper
				.findAllComponents({ name: listItemSelektor })
				.filter((listItem) => listItem.text().includes(`${rate}`))
				.at(0);
			const icon = listItem?.vm.$slots
				.append()[0]
				.children.default()[0].children;

			expect(icon).toBe(mdiCheck);
		});
	});
});
