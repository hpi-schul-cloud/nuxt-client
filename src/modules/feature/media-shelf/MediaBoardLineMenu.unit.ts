import MediaBoardLineMenu from "./MediaBoardLineMenu.vue";
import { MediaBoardColors } from "@/serverApi/v3";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mdiChevronDown, mdiChevronUp } from "@icons/material";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { ComponentProps } from "vue-component-type-helpers";
import { VColorPicker, VListItem } from "vuetify/lib/components/index";
import colors from "vuetify/lib/util/colors";

describe("MediaBoardLineMenu", () => {
	const getWrapper = (
		props: ComponentProps<typeof MediaBoardLineMenu> = {
			lineId: "lineId",
		}
	) => {
		const wrapper = mount(MediaBoardLineMenu, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					VMenu: true,
					VColorPicker: true,
				},
			},
			props,
		});

		return {
			wrapper,
		};
	};

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("when opening the menu for a line", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			return {
				wrapper,
			};
		};

		it("should have all menu points", async () => {
			const { wrapper } = setup();

			const menuItems = wrapper.findAllComponents(VListItem);

			expect(menuItems.length).toEqual(3);
			expect(menuItems[0].text()).toEqual("common.actions.rename");
			expect(menuItems[1].text()).toEqual("common.actions.pickColor");
			expect(menuItems[2].text()).toEqual("common.actions.delete");
		});
	});

	describe("when opening the menu for the available line", () => {
		const setup = () => {
			const { wrapper } = getWrapper({ lineId: undefined });

			return {
				wrapper,
			};
		};

		it("should have all menu points", async () => {
			const { wrapper } = setup();

			const menuItems = wrapper.findAllComponents(VListItem);

			expect(menuItems.length).toEqual(1);
			expect(menuItems[0].text()).toEqual("common.actions.pickColor");
		});
	});

	describe("when deleting a line", () => {
		it("should emit the delete:line event", async () => {
			const { wrapper } = getWrapper();

			const deleteListItem = wrapper.findComponent("[data-testid=action-delete-line]");
			await deleteListItem.trigger("click");

			expect(wrapper.emitted("delete:line")).toEqual([["lineId"]]);
		});
	});

	describe("when renaming a line", () => {
		it("should emit the rename-title event", async () => {
			const { wrapper } = getWrapper();

			const renameListItem = wrapper.findComponent("[data-testid=action-update-line-title]");
			await renameListItem.trigger("click");

			expect(wrapper.emitted("rename-title")).toEqual([["lineId"]]);
		});
	});

	describe("when changing the color of a line", () => {
		it("should emit the update event for the color-model", async () => {
			const { wrapper } = getWrapper();

			const colorListItem = wrapper.findComponent("[data-testid=action-update-line-title]");
			await colorListItem.trigger("click");

			const colorPicker = wrapper.getComponent(VColorPicker);
			colorPicker.vm.$emit("update:model-value", colors.red.lighten4);
			await nextTick();

			expect(wrapper.emitted("update:color")).toEqual([[MediaBoardColors.Red]]);
		});
	});

	describe("when collapsing a line", () => {
		it("should emit the update event for the collapsed-model", async () => {
			const { wrapper } = getWrapper();

			const colorListItem = wrapper.findComponent("[data-testid=collapse-line-btn]");
			await colorListItem.trigger("click");

			expect(wrapper.emitted("update:collapsed")).toEqual([[true]]);
		});

		it("should use the correct icon", async () => {
			const { wrapper } = getWrapper();

			const svg = wrapper.findComponent("[data-testid=collapse-line-btn]").find("svg");
			const path = svg.find("path");

			expect(path.attributes("d")).toEqual(mdiChevronUp);

			const colorListItem = wrapper.findComponent("[data-testid=collapse-line-btn]");
			await colorListItem.trigger("click");

			expect(path.attributes("d")).toEqual(mdiChevronDown);
		});
	});
});
