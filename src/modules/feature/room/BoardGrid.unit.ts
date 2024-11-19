import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { ComponentProps } from "vue-component-type-helpers";
import BoardGrid from "./BoardGrid.vue";
import { BoardLayout } from "@/serverApi/v3";
import { RoomBoardItem } from "@/types/room/Room";
import { roomBoardTileListFactory } from "@@/tests/test-utils";

const mockBoard: RoomBoardItem = {
	id: "59cce2c61113d1132c98dc06",
	title: "A11Y for Beginners",
	layout: BoardLayout.Columns,
	isVisible: true,
	createdAt: "2017-09-28T11:49:39.924Z",
	updatedAt: "2017-09-28T11:49:39.924Z",
};

const mockBoards = roomBoardTileListFactory.buildList(3);

describe("@feature-room/BoardGrid", () => {
	const setup = (props: ComponentProps<typeof BoardGrid>) => {
		const wrapper = mount(BoardGrid, {
			sync: false,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
			attachTo: document.body,
		});

		return { wrapper };
	};

	it("should render list of BoardTiles", async () => {
		const { wrapper } = setup({ boards: mockBoards });

		const boardTiles = wrapper.findAllComponents({ name: "BoardTile" });

		expect(boardTiles.length).toStrictEqual(3);
	});
});
