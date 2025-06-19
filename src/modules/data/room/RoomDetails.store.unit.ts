import { createPinia, setActivePinia } from "pinia";
import { useRoomDetailsStore, RoomVariant } from "./RoomDetails.store";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { AxiosInstance } from "axios";
import * as serverApi from "@/serverApi/v3/api";
import { useApplicationError } from "@/composables/application-error.composable";
import { initializeAxios, mapAxiosErrorToResponseError } from "@/utils/api";
import {
	apiResponseErrorFactory,
	axiosErrorFactory,
	mockApiResponse,
} from "@@/tests/test-utils";

vi.mock("@/utils/api");
const mockedMapAxiosErrorToResponseError = vi.mocked(
	mapAxiosErrorToResponseError
);

vi.mock("@/composables/application-error.composable");
const mockedCreateApplicationError = vi.mocked(useApplicationError);

const setupErrorResponse = (message = "NOT_FOUND", code = 404) => {
	const expectedPayload = apiResponseErrorFactory.build({
		message,
		code,
	});
	const responseError = axiosErrorFactory.build({
		response: { data: expectedPayload },
	});

	return {
		responseError,
		expectedPayload,
	};
};

describe("useRoomDetailsStore", () => {
	let roomApiMock: DeepMocked<serverApi.RoomApiInterface>;
	let boardApiMock: DeepMocked<serverApi.BoardApiInterface>;
	let axiosMock: DeepMocked<AxiosInstance>;
	let mockedCreateApplicationErrorCalls: ReturnType<typeof useApplicationError>;

	beforeEach(() => {
		setActivePinia(createPinia());
		roomApiMock = createMock<serverApi.RoomApiInterface>();
		boardApiMock = createMock<serverApi.BoardApiInterface>();
		axiosMock = createMock<AxiosInstance>();
		mockedCreateApplicationErrorCalls =
			createMock<ReturnType<typeof useApplicationError>>();
		mockedCreateApplicationError.mockReturnValue(
			mockedCreateApplicationErrorCalls
		);

		vi.spyOn(serverApi, "RoomApiFactory").mockReturnValue(roomApiMock);
		vi.spyOn(serverApi, "BoardApiFactory").mockReturnValue(boardApiMock);
		initializeAxios(axiosMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (
		options: { errorCode: number } = {
			errorCode: 404,
		}
	) => {
		const store = useRoomDetailsStore();

		const { expectedPayload } = setupErrorResponse();
		if (options.errorCode !== 404) {
			expectedPayload.code = options.errorCode;
		}

		mockedMapAxiosErrorToResponseError.mockReturnValue(expectedPayload);

		return { store };
	};

	describe("fetchRoom", () => {
		it("should call fetchRoom api", async () => {
			const { store } = setup();

			expect(store.isLoading).toBe(true);
			await store.fetchRoom("room-id");

			expect(roomApiMock.roomControllerGetRoomDetails).toHaveBeenCalledWith(
				"room-id"
			);
			expect(roomApiMock.roomControllerGetRoomBoards).toHaveBeenCalledWith(
				"room-id"
			);
			expect(store.isLoading).toBe(false);
		});

		describe("when fetching room fails with 404", () => {
			it("should set roomVariant to COURSE_ROOM", async () => {
				const { store } = setup();
				expect(store.isLoading).toBe(true);
				roomApiMock.roomControllerGetRoomDetails.mockRejectedValue({
					code: 404,
				});

				await store.fetchRoom("room-id");

				expect(store.roomVariant).toBe(RoomVariant.COURSE_ROOM);
				expect(store.isLoading).toBe(false);
			});
		});

		describe("when fetching room fails with other errors", () => {
			it("should throw an error", async () => {
				const { store } = setup({ errorCode: 401 });
				expect(store.isLoading).toBe(true);
				roomApiMock.roomControllerGetRoomDetails.mockRejectedValue({
					code: 401,
				});

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

	describe("deactivateRoom", () => {
		it("should reset the state", () => {
			const { store } = setup();
			store.deactivateRoom();
			expect(store.isLoading).toBe(false);
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
});
