import BoardGrid from "./BoardGrid.vue";
import BoardGridItem from "./BoardGridItem.vue";
import { roomBoardTileListFactory } from "@@/tests/test-utils";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

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

	it("should render BoardGridItem for each board", () => {
		const { wrapper } = setup();
		const boardTiles = wrapper.findAllComponents(BoardGridItem);

		expect(boardTiles).toHaveLength(3);
	});
});
