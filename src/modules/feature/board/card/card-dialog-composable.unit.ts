import { useCardDialogData } from "./card-dialog-composable";
import { Permission } from "@/serverApi/v3";
import {
	columnResponseFactory,
	mockApiResponse,
	mockedPiniaStoreTyping,
	roomBoardGridItemFactory,
	roomItemFactory,
} from "@@/tests/test-utils";
import { useBoardApi } from "@data-board";
import { useRoomDetailsStore, useRoomStore } from "@data-room";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { defineComponent } from "vue";

vi.mock("@data-board");

describe("useCardDialogData", () => {
	let useBoardApiMock: DeepMocked<ReturnType<typeof useBoardApi>>;
	let result: ReturnType<typeof useCardDialogData>;

	const mockRooms = [
		roomItemFactory.build({ permissions: [Permission.RoomEditContent] }),
		roomItemFactory.build({ permissions: [Permission.RoomEditContent] }),
		roomItemFactory.build({ permissions: [] }),
	];

	const mockBoards = [roomBoardGridItemFactory.build(), roomBoardGridItemFactory.build()];

	const mockColumns = [columnResponseFactory.build({ title: "Col 1" }), columnResponseFactory.build({ title: "" })];

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		useBoardApiMock = createMock<ReturnType<typeof useBoardApi>>();
		vi.mocked(useBoardApi).mockReturnValue(useBoardApiMock);
	});

	const setup = (selectedRoomId?: string) => {
		const roomStore = mockedPiniaStoreTyping(useRoomStore);
		const roomDetailsStore = mockedPiniaStoreTyping(useRoomDetailsStore);

		roomStore.fetchRoomsPlain.mockResolvedValue(mockApiResponse({ data: { data: mockRooms } }));
		roomDetailsStore.fetchBoardsOfRoom.mockResolvedValue({ boards: mockBoards });

		const TestComponent = defineComponent({
			setup() {
				result = useCardDialogData(selectedRoomId);
				return {};
			},
			template: "<div></div>",
		});

		const wrapper = mount(TestComponent);
		return { roomStore, roomDetailsStore, wrapper };
	};

	it("should initialize and fetch rooms with edit permission only", async () => {
		setup();
		await flushPromises();

		expect(result.rooms.value).toHaveLength(2);
		expect(result.rooms.value?.map((r) => r.id)).toEqual(["room1", "room2"]);
	});

	it("should set selectedRoomId when initialRoomId is provided and exists", async () => {
		setup("room1");
		await flushPromises();

		expect(result.selectedRoomId.value).toBe("room1");
	});

	it("should not set selectedRoomId when initialRoomId does not exist", async () => {
		setup("non-existent");
		await flushPromises();

		expect(result.selectedRoomId.value).toBeUndefined();
	});

	it("should fetch boards when selectedRoomId changes", async () => {
		const { roomDetailsStore } = setup();

		const { selectedRoomId, boards } = result;
		await flushPromises();

		selectedRoomId.value = "room-1";
		await flushPromises();

		expect(roomDetailsStore.fetchBoardsOfRoom).toHaveBeenCalledWith("room-1");
		expect(boards.value).toEqual(mockBoards);
	});

	it("should fetch columns when selectedBoardId changes and add default titles", async () => {
		setup();
		useBoardApiMock.fetchBoardCall.mockResolvedValue({ columns: mockColumns });

		const { selectedBoardId, columns } = result;
		await flushPromises();

		selectedBoardId.value = "board-1";
		await flushPromises();

		expect(useBoardApiMock.fetchBoardCall).toHaveBeenCalledWith("board-1");
		expect(columns.value?.[0].title).toBe("Col 1");
		expect(columns.value?.[1].title).toBe("Abschnitt 2");
	});

	it("should reset board and column selection", async () => {
		setup();
		result.selectedBoardId.value = "board-1";
		result.selectedColumnId.value = "col-1";

		result.resetBoardSelection();

		expect(result.selectedBoardId.value).toBeUndefined();
		expect(result.selectedColumnId.value).toBeUndefined();
	});
});
