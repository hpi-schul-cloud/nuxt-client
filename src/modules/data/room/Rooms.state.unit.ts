import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { useRoomsState } from "./Rooms.state";
import * as serverApi from "@/serverApi/v3/api";
import { AxiosInstance } from "axios";
import { useApplicationError } from "@/composables/application-error.composable";
import { initializeAxios, mapAxiosErrorToResponseError } from "@/utils/api";
import setupStores from "@@/tests/test-utils/setupStores";
import ApplicationErrorModule from "@/store/application-error";
import {
	apiResponseErrorFactory,
	axiosErrorFactory,
} from "@@/tests/test-utils";
import { RoomColor } from "@/types/room/Room";

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

describe("useRoomsState", () => {
	let roomApiMock: DeepMocked<serverApi.RoomApiInterface>;
	let axiosMock: DeepMocked<AxiosInstance>;
	let mockedCreateApplicationErrorCalls: ReturnType<typeof useApplicationError>;

	beforeEach(() => {
		roomApiMock = createMock<serverApi.RoomApiInterface>();
		axiosMock = createMock<AxiosInstance>();

		vi.spyOn(serverApi, "RoomApiFactory").mockReturnValue(roomApiMock);
		initializeAxios(axiosMock);

		mockedCreateApplicationErrorCalls =
			createMock<ReturnType<typeof useApplicationError>>();
		mockedCreateApplicationError.mockReturnValue(
			mockedCreateApplicationErrorCalls
		);

		setupStores({
			applicationErrorModule: ApplicationErrorModule,
		});
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	const setup = () => {
		const { fetchRooms, isLoading, deleteRoom } = useRoomsState();
		const { expectedPayload } = setupErrorResponse();
		mockedMapAxiosErrorToResponseError.mockReturnValueOnce(expectedPayload);

		return { fetchRooms, isLoading, deleteRoom };
	};

	describe("fetchRooms", () => {
		it("should call fetchRooms api", async () => {
			const { fetchRooms, isLoading } = setup();
			expect(isLoading.value).toBe(true);

			await fetchRooms();

			expect(roomApiMock.roomControllerGetRooms).toHaveBeenCalled();
			expect(isLoading.value).toBe(false);
		});

		it("should throw an error when fetching room data fails", async () => {
			const { fetchRooms, isLoading } = setup();
			expect(isLoading.value).toBe(true);
			roomApiMock.roomControllerGetRooms.mockRejectedValue({ code: 404 });

			await expect(fetchRooms()).rejects.toThrow();
			expect(isLoading.value).toBe(false);
		});
	});

	describe("deleteRoom", () => {
		it("should call deleteRoom api", async () => {
			const { deleteRoom, isLoading } = setup();
			expect(isLoading.value).toBe(true);

			await deleteRoom("room-id");
			expect(roomApiMock.roomControllerDeleteRoom).toHaveBeenCalledWith(
				"room-id"
			);
			expect(isLoading.value).toBe(false);
		});

		it("should throw an error when fetching room data fails", async () => {
			const { deleteRoom, isLoading } = setup();
			expect(isLoading.value).toBe(true);
			roomApiMock.roomControllerDeleteRoom.mockRejectedValue({ code: 404 });

			await expect(deleteRoom("room-id")).rejects.toThrow();
			expect(isLoading.value).toBe(false);
		});
	});

	describe("leaveRoom", () => {
		it("should call leaveRoom api", async () => {
			const { leaveRoom, isLoading } = useRoomsState();
			const roomId = "room-id";

			await leaveRoom(roomId);
			expect(roomApiMock.roomControllerLeaveRoom).toHaveBeenCalledWith(roomId);
			expect(isLoading.value).toBe(false);
		});

		it("should throw an error when leaving room fails", async () => {
			const { leaveRoom, isLoading } = useRoomsState();
			const roomId = "room-id";

			roomApiMock.roomControllerLeaveRoom.mockRejectedValue({
				code: 404,
			});

			await expect(leaveRoom(roomId)).rejects.toThrow();
			expect(isLoading.value).toBe(false);
		});
	});

	describe("isEmpty", () => {
		it("should return true when there are no rooms", () => {
			const { isEmpty, rooms } = useRoomsState();
			rooms.value = [];
			expect(isEmpty.value).toBe(true);
		});

		it("should return false when there are rooms", () => {
			const { isEmpty, rooms } = useRoomsState();
			rooms.value = [
				{
					id: "1",
					name: "Room 1",
					color: RoomColor.BlueGrey,
					schoolId: "6749dd4e657d98af622e370c",
					createdAt: "2024.11.18",
					updatedAt: "2024.11.18",
				},
			];
			expect(isEmpty.value).toBe(false);
		});
	});

	describe("copyRoom", () => {
		it("should call copyRoom api", async () => {
			const { copyRoom, isLoading } = useRoomsState();
			expect(isLoading.value).toBe(true);

			await copyRoom("room-id");
			expect(roomApiMock.roomControllerCopyRoom).toHaveBeenCalledWith(
				"room-id"
			);
			expect(isLoading.value).toBe(false);
		});

		it("should throw an error when copying room fails", async () => {
			const { copyRoom, isLoading } = useRoomsState();
			expect(isLoading.value).toBe(true);
			roomApiMock.roomControllerCopyRoom.mockRejectedValue({ code: 404 });

			await expect(copyRoom("room-id")).rejects.toThrow();
			expect(isLoading.value).toBe(false);
		});
	});
});
