import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import BoardGrid from "./BoardGrid.vue";
import { roomBoardTileListFactory } from "@@/tests/test-utils";
import BoardTile from "./BoardTile.vue";

describe("@feature-room/BoardGrid", () => {
	const setup = () => {
		const boards = roomBoardTileListFactory.buildList(3);

		const wrapper = mount(BoardGrid, {
			global: {
				plugins: [createTestingVuetify()],
				stubs: { BoardTile: true },
			},
			props: {
				boards,
			},
		});

		return { wrapper };
	};

	it("should render BoardTile for each board", () => {
		const { wrapper } = setup();
		const boardTiles = wrapper.findAllComponents(BoardTile);

		expect(boardTiles).toHaveLength(3);
	});
});
