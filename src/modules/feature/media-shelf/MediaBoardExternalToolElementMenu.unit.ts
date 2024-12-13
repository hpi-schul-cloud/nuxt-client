import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { BoardMenuAction } from "@ui-board";
import { shallowMount } from "@vue/test-utils";
import MediaBoardExternalToolElementMenu from "./MediaBoardExternalToolElementMenu.vue";

describe("MediaBoardExternalToolElementMenu", () => {
	const getWrapper = () => {
		const wrapper = shallowMount(MediaBoardExternalToolElementMenu, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return {
			wrapper,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("Delete Button", () => {
		it("should have a menu option to delete", () => {
			const { wrapper } = getWrapper();

			const menuItem = wrapper.findComponent(BoardMenuAction);

			expect(menuItem.exists()).toEqual(true);
		});

		it("should emit the delete event on click", async () => {
			const { wrapper } = getWrapper();

			const menuItem = wrapper.findComponent(BoardMenuAction);

			await menuItem.trigger("click");

			expect(wrapper.emitted("delete:element")).toBeDefined();
		});
	});
});
