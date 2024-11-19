import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { ComponentProps } from "vue-component-type-helpers";
import BoardTile from "./BoardTile.vue";
import { BoardLayout } from "@/serverApi/v3";
import { RoomBoardItem } from "@/types/room/Room";

const mockBoard: RoomBoardItem = {
	id: "59cce2c61113d1132c98dc06",
	title: "A11Y for Beginners",
	layout: BoardLayout.Columns,
	isVisible: false,
	createdAt: "2017-09-28T11:49:39.924Z",
	updatedAt: "2017-09-28T11:49:39.924Z",
};

describe("@feature-room/BoardTile", () => {
	const setup = (props: ComponentProps<typeof BoardTile>) => {
		const wrapper = mount(BoardTile, {
			sync: false,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
			attachTo: document.body,
		});

		return { wrapper };
	};

	describe("when board is column board in draft state", () => {
		it("should compute correct subtitle", () => {
			const { wrapper } = setup({ board: mockBoard, index: 0 });

			const subtitle = wrapper.get("[data-testid='board-tile-subtitle-0']");
			expect(subtitle.text()).toStrictEqual(
				"pages.room.boardCard.label.columnBoard - common.words.draft"
			);
		});

		it("should display tile in draft style", () => {
			const { wrapper } = setup({ board: mockBoard, index: 0 });

			expect(wrapper.classes()).toContain("board-is-draft");
		});
	});
});
