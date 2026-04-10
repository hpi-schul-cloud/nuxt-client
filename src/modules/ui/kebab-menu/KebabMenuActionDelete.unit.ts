import KebabMenuAction from "./KebabMenuAction.vue";
import KebabMenuActionDelete from "./KebabMenuActionDelete.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";

describe("KebabMenuActionMoveDown Component", () => {
	const setup = () =>
		mount(KebabMenuActionDelete, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				scopeLanguageKey: "components.board.action.delete",
			},
		});

	describe("when component is mounted", () => {
		it("should render", () => {
			const wrapper = setup();
			const action = wrapper.findComponent(KebabMenuAction);
			expect(action.exists()).toBe(true);
		});

		it("should render title", async () => {
			const wrapper = setup();

			expect(wrapper.text()).toContain("components.board.action.delete");
		});
		it("should emit click on taskConfirmationDialog confirmation (its a Promise)", async () => {
			const wrapper = setup();

			const action = wrapper.findComponent(KebabMenuAction);
			action.vm.$emit("click");
			await nextTick();

			expect(wrapper.emitted("click")).toBeTruthy();
		});
	});
});
