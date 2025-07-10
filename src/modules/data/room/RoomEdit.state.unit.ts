import { useRoomEditState } from "./RoomEdit.state";
import * as serverApi from "@/serverApi/v3/api";
import { initializeAxios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { AxiosInstance } from "axios";
import setupStores from "@@/tests/test-utils/setupStores";
import ApplicationErrorModule from "@/store/application-error";
import { useApplicationError } from "@/composables/application-error.composable";
import {
	apiResponseErrorFactory,
	axiosErrorFactory,
} from "@@/tests/test-utils";
import { RoomColor } from "@/types/room/Room";

// TODO-BC-9734: remove this file, we use the RoomDetails store , so move tests to RoomDetails.state.unit.ts
jest.mock("@/utils/api");
const mockedMapAxiosErrorToResponseError = jest.mocked(
	mapAxiosErrorToResponseError
);

jest.mock("@/composables/application-error.composable");
const mockedCreateApplicationError = jest.mocked(useApplicationError);

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

describe("useRoomEditState", () => {
	let roomApiMock: DeepMocked<serverApi.RoomApiInterface>;
	let axiosMock: DeepMocked<AxiosInstance>;
	let mockedCreateApplicationErrorCalls: ReturnType<typeof useApplicationError>;

	beforeEach(() => {
		roomApiMock = createMock<serverApi.RoomApiInterface>();
		axiosMock = createMock<AxiosInstance>();

		jest.spyOn(serverApi, "RoomApiFactory").mockReturnValue(roomApiMock);
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
		jest.clearAllMocks();
	});

	const setup = () => {
		const { fetchRoom, isLoading, updateRoom, roomData } = useRoomEditState();

		const { expectedPayload } = setupErrorResponse();
		mockedMapAxiosErrorToResponseError.mockReturnValueOnce(expectedPayload);

		return {
			fetchRoom,
			isLoading,
			updateRoom,
			roomData,
		};
	};

	describe("fetchRoom", () => {
		it("should fetchRoom api", async () => {
			const { fetchRoom, isLoading } = setup();
			expect(isLoading.value).toBe(true);

			await fetchRoom("room-id");
			expect(roomApiMock.roomControllerGetRoomDetails).toHaveBeenCalledWith(
				"room-id"
			);
			expect(isLoading.value).toBe(false);
		});

		it("should throw an error when fetching room data fails", async () => {
			const { fetchRoom, isLoading } = setup();
			roomApiMock.roomControllerGetRoomDetails.mockRejectedValue({ code: 404 });

			expect(roomApiMock.roomControllerGetRoomDetails).not.toHaveBeenCalledWith(
				"room-id"
			);
			await expect(fetchRoom("room-id")).rejects.toThrow();
			expect(isLoading.value).toBe(false);
		});
	});

	describe("updateRoom", () => {
		it("should call updateRoom api", async () => {
			const { updateRoom, isLoading } = setup();
			expect(isLoading.value).toBe(true);
			const params = {
				name: "room-name",
				color: RoomColor.BlueGrey,
			};

			await updateRoom("room-id", params);

			expect(roomApiMock.roomControllerUpdateRoom).toHaveBeenCalledWith(
				"room-id",
				params
			);

			expect(isLoading.value).toBe(false);
		});
	});

	it("should throw an error when updating room data fails", async () => {
		const { updateRoom, isLoading } = setup();
		const params = {
			name: "room-name",
			color: RoomColor.BlueGrey,
		};
		roomApiMock.roomControllerUpdateRoom.mockRejectedValue({ code: 404 });

		expect(roomApiMock.roomControllerUpdateRoom).not.toHaveBeenCalledWith(
			"room-id",
			params
		);

		await updateRoom("room-id", params).catch(() => {
			expect(mockedMapAxiosErrorToResponseError).toHaveBeenCalledWith({
				code: 404,
			});
		});
		expect(isLoading.value).toBe(false);
	});
});
