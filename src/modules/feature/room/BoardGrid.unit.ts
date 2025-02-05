import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { ComponentProps } from "vue-component-type-helpers";
import BoardGrid from "./BoardGrid.vue";
import { roomBoardTileListFactory } from "@@/tests/test-utils";

const mockBoards = roomBoardTileListFactory.buildList(3, { isVisible: true });

describe("@feature-room/BoardGrid", () => {
	const setup = (props: ComponentProps<typeof BoardGrid>) => {
		const wrapper = mount(BoardGrid, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
		});

		return { wrapper };
	};

	it("should render list of BoardTiles", async () => {
		const { wrapper } = setup({ boards: mockBoards });

		const boardTiles = wrapper.findAllComponents({ name: "BoardTile" });

		expect(boardTiles.length).toStrictEqual(3);
	});
});
