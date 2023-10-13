import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { BoardMenuAction, BoardMenuActionDelete } from "@ui-board";
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

			const menuItem = wrapper.findComponent(BoardMenuAction);

			expect(menuItem.exists()).toEqual(true);
		});

		it("should emit the edit event on click", () => {
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(BoardMenuAction);

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

			const menuItem = wrapper.findComponent(BoardMenuActionDelete);

			expect(menuItem.exists()).toEqual(true);
		});

		it("should emit the delete event on click", () => {
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(BoardMenuActionDelete);

			menuItem.vm.$emit("click");

			expect(wrapper.emitted("delete:element")).toBeDefined();
		});
	});
});
