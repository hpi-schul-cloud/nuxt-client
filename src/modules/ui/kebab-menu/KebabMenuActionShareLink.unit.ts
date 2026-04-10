import KebabMenuActionShareLink from "./KebabMenuActionShareLink.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { BoardMenuScope } from "@ui-board";
import { mount } from "@vue/test-utils";

describe("BoardMenuActionShareLink", () => {
	const setup = (scope: BoardMenuScope) => {
		const wrapper = mount(KebabMenuActionShareLink, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				scope,
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

			expect(wrapper.text()).toBe("common.actions.shareLink");
		});
	});
});
