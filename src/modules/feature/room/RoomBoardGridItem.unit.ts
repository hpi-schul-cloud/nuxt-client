import RoomBoardGridItem from "./RoomBoardGridItem.vue";
import { BoardLayout } from "@/types/board/Board";
import { RoomBoardItem } from "@/types/room/Room";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { ComponentProps } from "vue-component-type-helpers";

const mockBoard: RoomBoardItem = {
	id: "59cce2c61113d1132c98dc06",
	title: "A11Y for Beginners",
	layout: BoardLayout.COLUMNS,
	isVisible: false,
	createdAt: "2017-09-28T11:49:39.924Z",
	updatedAt: "2017-09-28T11:49:39.924Z",
	allowedOperations: {},
};

describe("@feature-room/RoomBoardGridItem", () => {
	const setup = (props: ComponentProps<typeof RoomBoardGridItem> = { board: mockBoard, index: 0, roomId: "Mathe" }) => {
		const wrapper = mount(RoomBoardGridItem, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: { RouterLink: true },
			},
			props,
		});

		return { wrapper };
	};

	describe("title", () => {
		it("should display the board title", () => {
			const { wrapper } = setup();

			const title = wrapper.get("[data-testid='board-grid-title-0']");
			expect(title.text()).toContain("A11Y for Beginners");
		});
	});

	describe("when board is column board in draft state", () => {
		it("should compute correct subtitle", () => {
			const { wrapper } = setup();

			const subtitle = wrapper.get("[data-testid='board-grid-item-subtitle-0']");
			expect(subtitle.text()).toStrictEqual("pages.room.boardCard.label.columnBoard - common.words.draft");
		});
	});

	describe("when board is visible (not draft)", () => {
		it("should not show draft suffix in subtitle", () => {
			const board = { ...mockBoard, isVisible: true };
			const { wrapper } = setup({ board, index: 0, roomId: "Mathe" });

			const subtitle = wrapper.get("[data-testid='board-grid-item-subtitle-0']");
			expect(subtitle.text()).toStrictEqual("pages.room.boardCard.label.columnBoard");
		});
	});

	describe("kebab menu", () => {
		it("should not render menu when no operations are allowed", () => {
			const board = { ...mockBoard, allowedOperations: {} };
			const { wrapper } = setup({ board, index: 0, roomId: "Mathe" });

			expect(wrapper.find("[data-testid='board-dot-menu-0']").exists()).toBe(false);
		});

		it("should render menu when operations are allowed", () => {
			const board = {
				...mockBoard,
				allowedOperations: { deleteBoard: true, copyBoard: true, updateBoardVisibility: true },
			};
			const { wrapper } = setup({ board, index: 0, roomId: "Mathe" });

			expect(wrapper.find("[data-testid='board-dot-menu-0']").exists()).toBe(true);
		});
	});
});
