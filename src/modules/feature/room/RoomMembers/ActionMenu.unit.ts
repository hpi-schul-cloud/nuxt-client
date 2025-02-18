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
	const setup = (isVisibleChangeRoleButton = false) => {
		const wrapper = mount(ActionMenu, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				selectedIds: ["test-id#1", "test-id#2"],
				isVisibleChangeRoleButton,
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

	describe("when user is allowed to change room roles", () => {
		it("should emit 'change:role' event when 'Change Role' menu button is clicked", async () => {
			const { wrapper } = setup(true);
			const menuButton = wrapper.find('[data-testid="action-menu-button"]');
			await menuButton.trigger("click");
			const changePermissionMenuItem = wrapper.getComponent(
				KebabMenuActionChangePermission
			);
			await changePermissionMenuItem.trigger("click");

			const emitted = wrapper.emitted("change:role");
			expect(wrapper.emitted()).toHaveProperty("change:role");
			expect(emitted![0][0]).toStrictEqual(["test-id#1", "test-id#2"]);
		});
	});

	describe("when user is not allowed to change room roles", () => {
		it("should emit 'change:role' event when 'Change Role' menu button is clicked", async () => {
			const { wrapper } = setup(false);
			const menuButton = wrapper.find('[data-testid="action-menu-button"]');
			await menuButton.trigger("click");
			const changePermssionMenuItem = wrapper.findComponent(
				KebabMenuActionChangePermission
			);
			expect(changePermssionMenuItem.exists()).toBe(false);
		});
	});

	it("should emit 'reset:selected' event when 'Reset' button is clicked", async () => {
		const { wrapper } = setup();
		await wrapper
			.findComponent({ ref: "resetSelectedMembers" })
			.trigger("click");

		expect(wrapper.emitted()).toHaveProperty("reset:selected");
	});
});
