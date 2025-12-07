import SpeedDialMenu from "./SpeedDialMenu.vue";
import { FabAction } from "./types";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { logger } from "@util-logger";
import { mount, VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { VBtn, VFab, VIcon, VSpeedDial } from "vuetify/lib/components/index";

describe("SpeedDialMenu", () => {
	window.scrollTo = vi.fn();

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

			// 1 primary action button + 6 speed dial action buttons
			expect(buttons).toHaveLength(7);
		});

		// TODO: sr-only is visible in dom and therefor counts as text content
		it.skip("should render close btn while open", async () => {
			const { wrapper } = setup({ actions: multipleActions });

			await toggleSpeedDialMenu(wrapper);
			const fab = wrapper.findComponent(VFab);

			expect(fab.findComponent(VIcon).exists()).toBe(true);
			expect(fab.text().length).toBe(0);
		});

		it("should render a label and icon button per action", async () => {
			const { wrapper } = setup({ actions: multipleActions });

			await toggleSpeedDialMenu(wrapper);
			const buttons = wrapper.findAllComponents(VBtn).slice(1);

			const labelButtons = buttons.filter((btn, index) => index % 2 === 0);
			const iconButtons = buttons.filter((btn, index) => index % 2 !== 0);
			expect(labelButtons).toHaveLength(3);
			expect(iconButtons).toHaveLength(3);

			for (const btn of labelButtons) {
				expect(btn.classes()).not.toContain("v-btn--icon");
				expect(btn.text().length).toBeGreaterThan(0);
			}

			for (const btn of iconButtons) {
				expect(btn.classes()).toContain("v-btn--icon");
				expect(btn.text().length).toBe(0);
			}
		});
	});

	describe("on large screens", () => {
		beforeEach(() => {
			defineWindowWidth(1300);
		});

		it("should be positioned absolutely at the top right", () => {
			const { wrapper } = setup({ actions: multipleActions });

			expect(wrapper.classes()).toContain("positioning-lg");
			expect(wrapper.classes()).toContain("v-fab--absolute");
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

		it("should be positioned absolutely at the top right", () => {
			const { wrapper } = setup({ actions: multipleActions });

			expect(wrapper.classes()).toContain("positioning-sm-md");
			expect(wrapper.classes()).toContain("position-fixed");
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

				const btn = wrapper.getComponent(VFab).getComponent(VBtn);
				expect(btn.classes()).toContain("rounded-pill");
			});

			it("should only render an icon and label", () => {
				const { wrapper } = setup({ actions: singleAction });

				const fab = wrapper.getComponent(VFab);
				expect(fab.findComponent(VIcon).exists()).toBe(true);
				expect(fab.text()).toStrictEqual("Add Item");
			});
		});

		describe("when collapsed", () => {
			// TODO: figure out how to trigger/mock scroll behavior
			it.skip("should have circular shape", async () => {
				const { wrapper } = setup({ actions: singleAction });
				window.scrollTo({ top: 1000, behavior: "smooth" });
				await nextTick();

				const btn = wrapper.getComponent(VFab).getComponent(VBtn);
				logger.log(btn.classes());
				expect(btn.classes()).toContain("rounded-circle");
			});

			// TODO: sr-only is visible in dom and therefor counts as text content
			it.skip("should only render an icon", () => {
				const { wrapper } = setup({ actions: singleAction });

				const fab = wrapper.getComponent(VFab);
				expect(fab.findComponent(VIcon).exists()).toBe(true);
				expect(fab.text().length).toBe(0);
			});
		});
	});
});
