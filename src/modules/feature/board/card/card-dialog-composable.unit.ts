import { useCardDialogData } from "./card-dialog-composable";
import {
	boardResponseFactory,
	columnResponseFactory,
	mockComposable,
	mockedPiniaStoreTyping,
	roomBoardGridItemFactory,
} from "@@/tests/test-utils";
import { useBoardApi } from "@data-board";
import { useRoomDetailsStore, useRoomStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, Mocked, vi } from "vitest";
import { defineComponent, nextTick, ref } from "vue";

vi.mock("@data-board");

describe("useCardDialogData", () => {
	let useBoardApiMock: Mocked<ReturnType<typeof useBoardApi>>;
	let result: ReturnType<typeof useCardDialogData>;

	const mockBoards = [roomBoardGridItemFactory.build(), roomBoardGridItemFactory.build()];

	const mockColumns = [columnResponseFactory.build({ title: "Col 1" }), columnResponseFactory.build({ title: "" })];

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		useBoardApiMock = mockComposable(useBoardApi);
		vi.mocked(useBoardApi).mockReturnValue(useBoardApiMock);
	});

	const setup = () => {
		const roomStore = mockedPiniaStoreTyping(useRoomStore);
		const roomDetailsStore = mockedPiniaStoreTyping(useRoomDetailsStore);

		roomDetailsStore.fetchBoardsOfRoom.mockResolvedValue({ boards: mockBoards, error: undefined });

		const TestComponent = defineComponent({
			setup() {
				result = useCardDialogData(ref(true));
				return {};
			},
			template: "<div></div>",
		});

		const wrapper = mount(TestComponent);
		return { roomStore, roomDetailsStore, wrapper };
	};

	it("should fetch boards when selectedRoomId changes", async () => {
		const { roomDetailsStore } = setup();

		const { selectedRoomId, boards } = result;

		selectedRoomId.value = "room-1";
		await nextTick();

		expect(roomDetailsStore.fetchBoardsOfRoom).toHaveBeenCalledWith("room-1");
		expect(boards.value).toEqual(mockBoards);
	});

	it("should fetch columns when selectedBoardId changes and add default titles", async () => {
		setup();
		useBoardApiMock.fetchBoardCall.mockResolvedValue(boardResponseFactory.build({ columns: mockColumns }));

		const { selectedBoardId, columns } = result;

		selectedBoardId.value = "board-1";
		await nextTick();

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
