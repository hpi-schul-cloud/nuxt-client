import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import ExternalToolElementMenu from "./ExternalToolElementMenu.vue";

describe("ExternalToolElementMenu", () => {
	const getWrapper = (props: {
		isFirstElement: boolean;
		isLastElement: boolean;
		hasMultipleElements: boolean;
	}) => {
		document.body.setAttribute("data-app", "true");

		const wrapper: Wrapper<Vue> = shallowMount(
			ExternalToolElementMenu as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				propsData: props,
			}
		);

		return {
			wrapper,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when the element can move up", () => {
		const setup = () => {
			const { wrapper } = getWrapper({
				hasMultipleElements: true,
				isFirstElement: false,
				isLastElement: false,
			});

			return {
				wrapper,
			};
		};

		it("should have a menu option to move up", () => {
			const { wrapper } = setup();

			const menuItem = wrapper.find(
				'[data-testid="board-external-tool-element-edit-menu-move-up"]'
			);

			expect(menuItem.exists()).toEqual(true);
		});

		it("should emit the move up event on click", () => {
			const { wrapper } = setup();

			const menuItem = wrapper.find(
				'[data-testid="board-external-tool-element-edit-menu-move-up"]'
			);

			menuItem.vm.$emit("click");

			expect(wrapper.emitted("move-up:element")).toBeDefined();
		});
	});

	describe("when the element can move down", () => {
		const setup = () => {
			const { wrapper } = getWrapper({
				hasMultipleElements: true,
				isFirstElement: false,
				isLastElement: false,
			});

			return {
				wrapper,
			};
		};

		it("should have a menu option to move down", () => {
			const { wrapper } = setup();

			const menuItem = wrapper.find(
				'[data-testid="board-external-tool-element-edit-menu-move-down"]'
			);

			expect(menuItem.exists()).toEqual(true);
		});

		it("should emit the move down event on click", () => {
			const { wrapper } = setup();

			const menuItem = wrapper.find(
				'[data-testid="board-external-tool-element-edit-menu-move-down"]'
			);

			menuItem.vm.$emit("click");

			expect(wrapper.emitted("move-down:element")).toBeDefined();
		});
	});

	describe("when the element cannot move up or down", () => {
		const setup = () => {
			const { wrapper } = getWrapper({
				hasMultipleElements: false,
				isFirstElement: true,
				isLastElement: true,
			});

			return {
				wrapper,
			};
		};

		it("should not have a menu option to move up", () => {
			const { wrapper } = setup();

			const menuItem = wrapper.find(
				'[data-testid="board-external-tool-element-edit-menu-move-up"]'
			);

			expect(menuItem.exists()).toEqual(false);
		});

		it("should not have a menu option to move down", () => {
			const { wrapper } = setup();

			const menuItem = wrapper.find(
				'[data-testid="board-external-tool-element-edit-menu-move-down"]'
			);

			expect(menuItem.exists()).toEqual(false);
		});
	});

	describe("Edit Button", () => {
		const setup = () => {
			const { wrapper } = getWrapper({
				hasMultipleElements: true,
				isFirstElement: false,
				isLastElement: false,
			});

			return {
				wrapper,
			};
		};

		it("should have a menu option to edit", () => {
			const { wrapper } = setup();

			const menuItem = wrapper.find(
				'[data-testid="board-external-tool-element-edit-menu-edit"]'
			);

			expect(menuItem.exists()).toEqual(true);
		});

		it("should emit the edit event on click", () => {
			const { wrapper } = setup();

			const menuItem = wrapper.find(
				'[data-testid="board-external-tool-element-edit-menu-edit"]'
			);

			menuItem.vm.$emit("click");

			expect(wrapper.emitted("edit:element")).toBeDefined();
		});
	});

	describe("Delete Button", () => {
		const setup = () => {
			const { wrapper } = getWrapper({
				hasMultipleElements: true,
				isFirstElement: false,
				isLastElement: false,
			});

			return {
				wrapper,
			};
		};

		it("should have a menu option to delete", () => {
			const { wrapper } = setup();

			const menuItem = wrapper.find(
				'[data-testid="board-external-tool-element-edit-menu-delete"]'
			);

			expect(menuItem.exists()).toEqual(true);
		});

		it("should emit the delete event on click", () => {
			const { wrapper } = setup();

			const menuItem = wrapper.find(
				'[data-testid="board-external-tool-element-edit-menu-delete"]'
			);

			menuItem.vm.$emit("click");

			expect(wrapper.emitted("delete:element")).toBeDefined();
		});
	});
});
