import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { KebabMenuList } from "@ui-kebab-menu";
import { nextTick } from "vue";
import BatchActionMenu from "./BatchActionMenu.vue";

describe("BatchActionMenu", () => {
	const setup = (isVisibleChangeRoleButton = false) => {
		const defaultSlotElement = `<div class="test-slot">Test Slot</div>`;
		const wrapper = mount(BatchActionMenu, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				selectedIds: ["test-id#1", "test-id#2"],
				isVisibleChangeRoleButton,
			},
			slots: {
				default: defaultSlotElement,
			},
		});

		return { wrapper, defaultSlotElement };
	};

	it("should be rendered", () => {
		const { wrapper } = setup();

		expect(wrapper).toBeDefined();
	});

	it("should show selected count", async () => {
		const { wrapper } = setup();

		const selectedCount = wrapper.find("span");

		expect(selectedCount.html()).toContain("2 pages.administration.selected");
	});

	describe("when 'Reset' button is clicked", () => {
		it("should emit 'reset:selected' event", async () => {
			const { wrapper } = setup();

			const resetButton = wrapper.find(
				'[aria-label="ui.actionMenu.select.none"]'
			);
			resetButton.trigger("click");

			expect(wrapper.emitted()).toHaveProperty("reset:selected");
		});
	});

	describe("when action menu button is clicked and menu opened", () => {
		it("should render default slot", async () => {
			const { wrapper, defaultSlotElement } = setup();

			const actionMenuButton = wrapper.find(
				'[data-testid="action-menu-button"]'
			);
			actionMenuButton.trigger("click");

			await nextTick();

			const kebabMenu = wrapper.findComponent(KebabMenuList);
			expect(kebabMenu.html()).toContain(defaultSlotElement);
		});
	});
});
