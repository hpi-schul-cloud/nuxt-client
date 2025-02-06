import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import ActionMenu from "./ActionMenu.vue";
import {
	KebabMenuActionRemoveMember,
	KebabMenuActionChangePermission,
} from "@ui-kebab-menu";

describe("ActionMenu", () => {
	const setup = (selectedIds: string[] = ["test-id#1", "test-id#2"]) => {
		const wrapper = mount(ActionMenu, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				selectedIds,
			},
		});

		return { wrapper };
	};

	it("should be rendered", () => {
		const { wrapper } = setup();
		expect(wrapper).toBeDefined();
	});

	it("should show selected count", async () => {
		const { wrapper } = setup();
		const selectedCount = wrapper.find(".selected-count");
		expect(selectedCount.html()).toContain("2 pages.administration.selected");
	});

	it("should emit 'remove:selected' event when 'Remove' menu button is clicked", async () => {
		const { wrapper } = setup();
		const menuButton = wrapper.find('[data-testid="action-menu-button"]');
		await menuButton.trigger("click");
		const removeMenuItem = wrapper.findComponent(KebabMenuActionRemoveMember);
		await removeMenuItem.trigger("click");

		const emitted = wrapper.emitted("remove:selected");
		expect(wrapper.emitted()).toHaveProperty("remove:selected");
		expect(emitted![0][0]).toStrictEqual(["test-id#1", "test-id#2"]);
	});

	it("should emit 'change:role' event when 'Change Role' menu button is clicked", async () => {
		const { wrapper } = setup();
		const menuButton = wrapper.find('[data-testid="action-menu-button"]');
		await menuButton.trigger("click");
		const removeMenuItem = wrapper.findComponent(
			KebabMenuActionChangePermission
		);
		await removeMenuItem.trigger("click");

		const emitted = wrapper.emitted("change:role");
		expect(wrapper.emitted()).toHaveProperty("change:role");
		expect(emitted![0][0]).toStrictEqual(["test-id#1", "test-id#2"]);
	});

	it("should emit 'reset:selected' event when 'Reset' button is clicked", async () => {
		const { wrapper } = setup();
		await wrapper
			.findComponent({ ref: "resetSelectedMembers" })
			.trigger("click");

		expect(wrapper.emitted()).toHaveProperty("reset:selected");
	});
});
