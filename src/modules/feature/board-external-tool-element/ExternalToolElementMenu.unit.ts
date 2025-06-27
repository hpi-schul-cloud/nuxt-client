import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { KebabMenuAction, KebabMenuActionDelete } from "@ui-kebab-menu";
import { shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";
import ExternalToolElementMenu from "./ExternalToolElementMenu.vue";

describe("ExternalToolElementMenu", () => {
	const getWrapper = (propsData: {
		isFirstElement: boolean;
		isLastElement: boolean;
		hasMultipleElements: boolean;
		columnIndex: number;
		rowIndex: number;
		elementIndex: number;
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
				hasMultipleElements: true,
				isFirstElement: false,
				isLastElement: false,
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
