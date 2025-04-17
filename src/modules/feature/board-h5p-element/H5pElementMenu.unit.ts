import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import {
	KebabMenuAction,
	KebabMenuActionDelete,
	KebabMenuActionMoveDown,
	KebabMenuActionMoveUp,
} from "@ui-kebab-menu";
import { shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";
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
		jest.resetAllMocks();
	});

	describe("Move Up Button", () => {
		const setup = () => {
			const { wrapper } = getWrapper({
				isNotFirstElement: true,
				isNotLastElement: true,
				columnIndex: 0,
				rowIndex: 1,
				elementIndex: 2,
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

			menuItem.vm.$emit("click");
			await nextTick();

			expect(wrapper.emitted("edit:element")).toBeDefined();
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
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(KebabMenuActionDelete);

			menuItem.vm.$emit("click", Promise.resolve(true));
			await nextTick();

			expect(wrapper.emitted("delete:element")).toBeDefined();
		});
	});
});
