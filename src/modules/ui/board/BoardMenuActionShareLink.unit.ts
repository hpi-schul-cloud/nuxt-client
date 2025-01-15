import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { BoardMenuScope } from "./board-menu-scope";
import BoardMenuActionShareLink from "./BoardMenuActionShareLink.vue";
import { MENU_SCOPE } from "./injection-tokens";

describe("BoardMenuActionShareLink", () => {
	const setup = (scope: BoardMenuScope) => {
		const wrapper = mount(BoardMenuActionShareLink, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[MENU_SCOPE]: scope,
				},
			},
		});

		return {
			wrapper,
		};
	};

	describe("when the scope is a card", () => {
		it("should show the card share text", async () => {
			const { wrapper } = setup(BoardMenuScope.CARD);

			expect(wrapper.text()).toBe("components.board.action.shareLink.card");
		});
	});

	describe("when the scope is a unknown", () => {
		it("should show a generic share text", async () => {
			const { wrapper } = setup(BoardMenuScope.BOARD);

			expect(wrapper.text()).toBe("common.actions.share");
		});
	});
});
