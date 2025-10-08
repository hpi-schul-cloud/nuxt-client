import { RoomVariant, useRoomDetailsStore } from "./RoomDetails.store";
import * as serverApi from "@/serverApi/v3/api";
import { RoomColor } from "@/serverApi/v3/api";
import { RoomUpdateParams } from "@/types/room/Room";
import { initializeAxios, mapAxiosErrorToResponseError } from "@/utils/api";
import { apiResponseErrorFactory, mockApiResponse } from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { AxiosInstance } from "axios";
import { createPinia, setActivePinia } from "pinia";

vi.mock("@/utils/api");
const mockedMapAxiosErrorToResponseError = vi.mocked(mapAxiosErrorToResponseError);

describe("useRoomDetailsStore", () => {
	let roomApiMock: DeepMocked<serverApi.RoomApiInterface>;
	let boardApiMock: DeepMocked<serverApi.BoardApiInterface>;
	let axiosMock: DeepMocked<AxiosInstance>;

	beforeEach(() => {
		setActivePinia(createPinia());
		roomApiMock = createMock<serverApi.RoomApiInterface>();
		boardApiMock = createMock<serverApi.BoardApiInterface>();
		axiosMock = createMock<AxiosInstance>();

		vi.spyOn(serverApi, "RoomApiFactory").mockReturnValue(roomApiMock);
		vi.spyOn(serverApi, "BoardApiFactory").mockReturnValue(boardApiMock);
		initializeAxios(axiosMock);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	const setup = () => {
		const store = useRoomDetailsStore();

		return { store };
	};

	const mockErrorResponse = ({ code, type, message }: { code: number; type?: string; message?: string }) => {
		const expectedPayload = apiResponseErrorFactory.build({
			code,
			type,
			message,
		});

		mockedMapAxiosErrorToResponseError.mockReturnValue(expectedPayload);
	};

	describe("fetchRoom", () => {
		it("should call fetchRoom api", async () => {
			const { store } = setup();

			expect(store.isLoading).toBe(true);
			await store.fetchRoom("room-id");

			expect(roomApiMock.roomControllerGetRoomDetails).toHaveBeenCalledWith("room-id");
			expect(roomApiMock.roomControllerGetRoomBoards).toHaveBeenCalledWith("room-id");
			expect(store.isLoading).toBe(false);
		});

		describe("when fetching room fails with 404", () => {
			it("should set roomVariant to COURSE_ROOM", async () => {
				const { store } = setup();
				expect(store.isLoading).toBe(true);
				roomApiMock.roomControllerGetRoomDetails.mockRejectedValue();
				mockErrorResponse({ code: 404 });

				await store.fetchRoom("room-id");

				expect(store.roomVariant).toBe(RoomVariant.COURSE_ROOM);
				expect(store.isLoading).toBe(false);
			});
		});

		describe('when fetching room fails with 403 and type "LOCKED_ROOM"', () => {
			it("should set lockedRoomName to the error message", async () => {
				const { store } = setup();
				expect(store.isLoading).toBe(true);
				roomApiMock.roomControllerGetRoomDetails.mockRejectedValue();
				mockErrorResponse({
					code: 403,
					type: "LOCKED_ROOM",
					message: "Locker Room",
				});

				await store.fetchRoom("room-id");

				expect(store.lockedRoomName).toBe("Locker Room");
				expect(store.isLoading).toBe(false);
			});
		});

		describe("when fetching room fails with other errors", () => {
			it("should throw an error", async () => {
				const { store } = setup();
				expect(store.isLoading).toBe(true);
				roomApiMock.roomControllerGetRoomDetails.mockRejectedValue();

				await expect(store.fetchRoom("room-id")).rejects.toThrow();
				expect(store.isLoading).toBe(false);
			});
		});
	});

	describe("resetState", () => {
		it("should reset the state", () => {
			const { store } = setup();
			store.resetState();
			expect(store.isLoading).toBe(true);
			expect(store.room).toBeUndefined();
		});
	});

	describe("createBoard", () => {
		it("should call createBoard api", async () => {
			const { store } = setup();
			const boardId = "board-id";
			const roomId = "room-id";
			const layout = serverApi.BoardLayout.Columns;
			const title = "title";

			boardApiMock.boardControllerCreateBoard.mockResolvedValue(
				mockApiResponse({
					data: { id: boardId },
				})
			);

			const result = await store.createBoard(roomId, layout, title);

			expect(result).toBe(boardId);
			expect(boardApiMock.boardControllerCreateBoard).toHaveBeenCalledWith({
				title,
				parentId: roomId,
				parentType: serverApi.BoardParentType.Room,
				layout,
			});
		});
	});

	describe("updateRoom", () => {
		it("should call updateRoom api", async () => {
			const { store } = setup();
			expect(store.isLoading).toBe(true);
			const params: RoomUpdateParams = {
				name: "room-name",
				color: RoomColor.BlueGrey,
				features: [],
			};

			await store.updateRoom("room-id", params);

			expect(roomApiMock.roomControllerUpdateRoom).toHaveBeenCalledWith("room-id", params);

			expect(store.isLoading).toBe(false);
		});
	});

	it("should throw an error when updating room data fails", async () => {
		const { store } = setup();
		const params: RoomUpdateParams = {
			name: "room-name",
			color: RoomColor.BlueGrey,
			features: [],
		};
		roomApiMock.roomControllerUpdateRoom.mockRejectedValue({ code: 404 });

		expect(roomApiMock.roomControllerUpdateRoom).not.toHaveBeenCalledWith("room-id", params);

		await store.updateRoom("room-id", params).catch(() => {
			expect(mockedMapAxiosErrorToResponseError).toHaveBeenCalledWith({
				code: 404,
			});
		});
		expect(store.isLoading).toBe(false);
	});
});
