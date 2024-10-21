import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { BoardMenuActionDelete } from "@ui-board";
import { shallowMount } from "@vue/test-utils";
import DeletedElementMenu from "./DeletedElementMenu.vue";

describe("DeletedElementMenu", () => {
	const getWrapper = () => {
		document.body.setAttribute("data-app", "true");

		const wrapper = shallowMount(DeletedElementMenu, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return {
			wrapper,
		};
	};

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("Delete Button", () => {
		it("should have a menu option to delete", () => {
			const { wrapper } = getWrapper();

			const menuItem = wrapper.findComponent(BoardMenuActionDelete);

			expect(menuItem.exists()).toEqual(true);
		});

		it("should emit the delete event on click", async () => {
			const { wrapper } = getWrapper();

			const menuItem = wrapper.findComponent(BoardMenuActionDelete);

			await menuItem.trigger("click");

			expect(wrapper.emitted("delete:element")).toBeDefined();
		});
	});
});
