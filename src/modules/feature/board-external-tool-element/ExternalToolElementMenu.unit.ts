import { BoardMenuAction, BoardMenuActionDelete } from "@ui-board";
import { shallowMount } from "@vue/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import ExternalToolElementMenu from "./ExternalToolElementMenu.vue";

describe("ExternalToolElementMenu", () => {
	const getWrapper = (propsData: {
		isFirstElement: boolean;
		isLastElement: boolean;
		hasMultipleElements: boolean;
	}) => {
		document.body.setAttribute("data-app", "true");

		const wrapper = shallowMount(ExternalToolElementMenu, {
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

		it("should emit the delete event on click", async () => {
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(BoardMenuActionDelete);

			await menuItem.trigger("click");

			expect(wrapper.emitted("delete:element")).toBeDefined();
		});
	});
});
