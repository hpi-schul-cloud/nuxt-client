import SpeedDialMenu from "./SpeedDialMenu.vue";
import SpeedDialMenuAction from "./SpeedDialMenuAction.vue";
import { FabAction } from "./types";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount, VueWrapper } from "@vue/test-utils";
import { VBtn, VFab, VIcon, VSpeedDial } from "vuetify/components";

describe("@ui-speed-dial-menu/SpeedDialMenu", () => {
	const setup = ({ actions }: { actions: FabAction[] }) => {
		const wrapper = mount(SpeedDialMenu, {
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify()],
			},
			props: {
				actions,
			},
		});

		return {
			wrapper,
		};
	};

	const defineWindowWidth = (width: number) => {
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: width,
		});
	};

	const toggleSpeedDialMenu = async (wrapper: VueWrapper) => {
		const fab = wrapper.findComponent(VBtn);
		await fab.trigger("click");
	};

	const singleAction: FabAction[] = [
		{
			icon: "mdi-plus",
			label: "Add Item",
			ariaLabel: "Add Item",
			to: "/add-item",
		},
	];

	const multipleActions: FabAction[] = [
		{
			icon: "mdi-plus",
			label: "Add Item",
			ariaLabel: "Add Item",
			to: "/add-item",
		},
		{
			icon: "mdi-pencil",
			label: "Edit Item",
			ariaLabel: "Edit Item",
			to: "/edit-item",
		},
		{
			icon: "mdi-delete",
			label: "Delete Item",
			ariaLabel: "Delete Item",
			to: "/delete-item",
		},
		{
			icon: "mdi-share",
			label: "Share Item",
			ariaLabel: "Share Item",
			to: "/share-item",
		},
	];

	describe("when only one action is provided", () => {
		it("should only render a single fab", () => {
			const { wrapper } = setup({ actions: singleAction });

			const buttons = wrapper.findAllComponents(VBtn);

			expect(buttons).toHaveLength(1);
		});
	});

	describe("when multiple actions are provided", () => {
		it("should render the speed dial with all action buttons", async () => {
			const { wrapper } = setup({ actions: multipleActions });

			await toggleSpeedDialMenu(wrapper);
			const buttons = wrapper.findAllComponents(VBtn);

			expect(buttons).toHaveLength(7);
		});

		it("should render close btn while open", async () => {
			const { wrapper } = setup({ actions: multipleActions });

			await toggleSpeedDialMenu(wrapper);
			const fab = wrapper.findComponent(VFab);

			expect(fab.findComponent(VIcon).exists()).toBe(true);
			expect(fab.find("#fab-label").exists()).toBe(false);
		});

		it("should render a SpeedDialMenuAction component per action", async () => {
			const { wrapper } = setup({ actions: multipleActions });

			await toggleSpeedDialMenu(wrapper);
			const actions = wrapper.findAllComponents(SpeedDialMenuAction);
			expect(actions).toHaveLength(multipleActions.length - 1); // minus primary action
		});
	});

	describe("on large screens", () => {
		beforeEach(() => {
			defineWindowWidth(1300);
		});

		it("should open speed dial downwards", async () => {
			const { wrapper } = setup({ actions: multipleActions });
			await toggleSpeedDialMenu(wrapper);

			const speedDialMenu = wrapper.findComponent(VSpeedDial);
			expect(speedDialMenu.props("location")).toBe("bottom center");
		});
	});

	describe("on small to medium screens", () => {
		beforeEach(() => {
			defineWindowWidth(800);
		});

		it("should open speed dial downwards", async () => {
			const { wrapper } = setup({ actions: multipleActions });
			await toggleSpeedDialMenu(wrapper);

			const speedDialMenu = wrapper.findComponent(VSpeedDial);
			expect(speedDialMenu.props("location")).toBe("top center");
		});

		describe("when not collapsed", () => {
			it("should have pill shape", () => {
				const { wrapper } = setup({ actions: singleAction });

				const fab = wrapper.getComponent(VFab);
				expect(fab.props("rounded")).toBe("pill");
			});

			it("should only render an icon and label", () => {
				const { wrapper } = setup({ actions: singleAction });

				const fab = wrapper.getComponent(VFab);
				expect(fab.findComponent(VIcon).exists()).toBe(true);
				expect(fab.text()).toStrictEqual("Add Item");
			});
		});
	});
});
