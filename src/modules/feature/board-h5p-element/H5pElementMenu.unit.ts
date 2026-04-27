import * as confirmDialogUtils from "@/utils/confirmation-dialog.utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { KebabMenuAction, KebabMenuActionDelete, KebabMenuActionMoveDown, KebabMenuActionMoveUp } from "@ui-kebab-menu";
import { shallowMount } from "@vue/test-utils";
import { ComponentProps } from "vue-component-type-helpers";
import H5pElementMenu from "./H5pElementMenu.vue";

describe("H5pElementMenu", () => {
	const getWrapper = (propsData: ComponentProps<typeof H5pElementMenu>) => {
		const wrapper = shallowMount(H5pElementMenu, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: propsData,
		});

		return {
			wrapper,
		};
	};

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("Move Up Button", () => {
		const setup = () => {
			const { wrapper } = getWrapper({
				isNotFirstElement: true,
				isNotLastElement: true,
				columnIndex: 0,
				rowIndex: 1,
				elementIndex: 2,
				hasLinkedContent: false,
			});

			return {
				wrapper,
			};
		};

		it("should have a menu option to move element up", () => {
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(KebabMenuActionMoveUp);

			expect(menuItem.exists()).toEqual(true);
		});

		it("should emit the move-up event on click", async () => {
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(KebabMenuActionMoveUp);

			await menuItem.trigger("click");

			expect(wrapper.emitted("move-up:element")).toBeDefined();
		});
	});

	describe("Move Down Button", () => {
		const setup = () => {
			const { wrapper } = getWrapper({
				isNotFirstElement: true,
				isNotLastElement: true,
				columnIndex: 0,
				rowIndex: 1,
				elementIndex: 2,
				hasLinkedContent: false,
			});

			return {
				wrapper,
			};
		};

		it("should have a menu option to move element down", () => {
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(KebabMenuActionMoveDown);

			expect(menuItem.exists()).toEqual(true);
		});

		it("should emit the move-down event on click", async () => {
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(KebabMenuActionMoveDown);

			await menuItem.trigger("click");

			expect(wrapper.emitted("move-down:element")).toBeDefined();
		});
	});

	describe("Settings Button", () => {
		const setup = () => {
			const { wrapper } = getWrapper({
				isNotFirstElement: true,
				isNotLastElement: true,
				columnIndex: 0,
				rowIndex: 1,
				elementIndex: 2,
				hasLinkedContent: false,
			});

			return {
				wrapper,
			};
		};

		it("should have a menu option to move element down", () => {
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(KebabMenuAction);

			expect(menuItem.exists()).toEqual(true);
		});

		it("should emit the move-down event on click", async () => {
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(KebabMenuAction);
			await menuItem.trigger("click");

			expect(wrapper.emitted("edit:element")).toBeDefined();
		});
	});

	describe("Edit Button", () => {
		const setup = () => {
			const { wrapper } = getWrapper({
				isNotFirstElement: true,
				isNotLastElement: true,
				columnIndex: 0,
				rowIndex: 1,
				elementIndex: 2,
				hasLinkedContent: false,
			});

			return {
				wrapper,
			};
		};

		it("should have a menu option to edit", () => {
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(KebabMenuAction);

			expect(menuItem.exists()).toEqual(true);
		});

		it("should emit the edit event on click", async () => {
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(KebabMenuAction);
			await menuItem.trigger("click");

			expect(wrapper.emitted("edit:element")).toBeDefined();
		});
	});

	describe("Download Button", () => {
		describe("when hasLinkedContent is true", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					isNotFirstElement: true,
					isNotLastElement: true,
					columnIndex: 0,
					rowIndex: 1,
					elementIndex: 2,
					hasLinkedContent: true,
				});

				return {
					wrapper,
				};
			};

			it("should have a menu option to download", () => {
				const { wrapper } = setup();

				const menuItems = wrapper.findAllComponents(KebabMenuAction);
				const downloadItem = menuItems.find((item) => item.text().includes("download"));

				expect(downloadItem?.exists()).toEqual(true);
			});

			it("should emit the download event on click", async () => {
				const { wrapper } = setup();

				const menuItems = wrapper.findAllComponents(KebabMenuAction);
				const downloadItem = menuItems.find((item) => item.text().includes("download"));

				await downloadItem?.trigger("click");

				expect(wrapper.emitted("download:content")).toBeDefined();
			});
		});

		describe("when hasLinkedContent is false", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					isNotFirstElement: true,
					isNotLastElement: true,
					columnIndex: 0,
					rowIndex: 1,
					elementIndex: 2,
					hasLinkedContent: false,
				});

				return {
					wrapper,
				};
			};

			it("should not have a menu option to download", () => {
				const { wrapper } = setup();

				const menuItems = wrapper.findAllComponents(KebabMenuAction);
				const downloadItem = menuItems.find((item) => item.text().includes("download"));

				expect(downloadItem).toBeUndefined();
			});
		});
	});

	describe("Delete Button", () => {
		const setup = () => {
			const { wrapper } = getWrapper({
				isNotFirstElement: true,
				isNotLastElement: true,
				columnIndex: 0,
				rowIndex: 1,
				elementIndex: 2,
				hasLinkedContent: false,
			});

			return {
				wrapper,
			};
		};

		it("should have a menu option to delete", () => {
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(KebabMenuActionDelete);

			expect(menuItem.exists()).toEqual(true);
		});

		it("should emit the delete event on click", async () => {
			vi.spyOn(confirmDialogUtils, "askDeletionForType").mockResolvedValue(true);
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(KebabMenuActionDelete);
			await menuItem.trigger("click");

			expect(wrapper.emitted("delete:element")).toBeDefined();
		});
	});
});
