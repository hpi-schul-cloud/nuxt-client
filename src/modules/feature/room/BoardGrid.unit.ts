import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import BoardGrid from "./BoardGrid.vue";
import { roomBoardTileListFactory } from "@@/tests/test-utils";
import BoardTile from "./BoardTile.vue";
import { useRoomAuthorization } from "./roomAuthorization.composable";
import { ref } from "vue";
import { createTestingPinia } from "@pinia/testing";

jest.mock("@feature-room/roomAuthorization.composable");
const roomPermissions: ReturnType<typeof useRoomAuthorization> = {
	canAddRoomMembers: ref(false),
	canChangeOwner: ref(false),
	canCreateRoom: ref(false),
	canViewRoom: ref(false),
	canEditRoom: ref(false),
	canDeleteRoom: ref(false),
	canLeaveRoom: ref(false),
	canRemoveRoomMembers: ref(false),
	canEditRoomContent: ref(false),
};
(useRoomAuthorization as jest.Mock).mockReturnValue(roomPermissions);

describe("@feature-room/BoardGrid", () => {
	const setup = () => {
		const boards = roomBoardTileListFactory.buildList(3, { isVisible: true });
		boards[2].isVisible = false;

		const wrapper = mount(BoardGrid, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					createTestingPinia(),
				],
			},
			props: {
				boards,
			},
		});

		return { wrapper };
	};

	describe("when current user has ROOM_EDIT permission", () => {
		it("should show boards in draft mode", () => {
			roomPermissions.canEditRoom.value = true;
			const { wrapper } = setup();

			const boardTiles = wrapper.findAllComponents(BoardTile);

			expect(boardTiles.length).toStrictEqual(3);
		});
	});

	describe("when current user does not have ROOM_EDIT permission", () => {
		it("should not show boards in draft mode", () => {
			roomPermissions.canEditRoom.value = false;
			const { wrapper } = setup();

			const boardTiles = wrapper.findAllComponents(BoardTile);

			expect(boardTiles.length).toStrictEqual(2);
		});
	});
});
