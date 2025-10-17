import { useRoomCreateState } from "./RoomCreate.state";
import * as serverApi from "@/serverApi/v3/api";
import { RoomColor, RoomCreateParams } from "@/types/room/Room";
import { initializeAxios, mapAxiosErrorToResponseError } from "@/utils/api";
import { apiResponseErrorFactory, axiosErrorFactory } from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { AxiosInstance } from "axios";
import { ref } from "vue";

vi.mock("@/utils/api");
const mockedMapAxiosErrorToResponseError = vi.mocked(mapAxiosErrorToResponseError);

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

describe("useRoomCreateState", () => {
	let roomApiMock: DeepMocked<serverApi.RoomApiInterface>;
	let axiosMock: DeepMocked<AxiosInstance>;

	beforeEach(() => {
		roomApiMock = createMock<serverApi.RoomApiInterface>();
		axiosMock = createMock<AxiosInstance>();

		vi.spyOn(serverApi, "RoomApiFactory").mockReturnValue(roomApiMock);
		initializeAxios(axiosMock);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	const setup = () => {
		const { createRoom, isLoading, roomData } = useRoomCreateState();
		const { expectedPayload } = setupErrorResponse();
		mockedMapAxiosErrorToResponseError.mockReturnValueOnce(expectedPayload);
		return { createRoom, isLoading, roomData };
	};

	describe("createRoom", () => {
		const roomData = ref<RoomCreateParams>({
			name: "Room 1",
			color: RoomColor.BlueGrey,
			startDate: undefined,
			endDate: undefined,
			features: [],
		});

		it("should call roomApi.roomControllerCreateRoom with the provided params", async () => {
			const { createRoom, isLoading } = setup();
			expect(isLoading.value).toBe(true);

			await createRoom(roomData.value);
			expect(roomApiMock.roomControllerCreateRoom).toHaveBeenCalledWith(roomData.value);
			expect(isLoading.value).toBe(false);
		});

		it("should throw an error when fetching room data fails", async () => {
			const { createRoom, isLoading } = setup();
			expect(isLoading.value).toBe(true);
			roomApiMock.roomControllerCreateRoom.mockRejectedValue({ code: 404 });

			await createRoom(roomData.value).catch(() => {
				expect(mockedMapAxiosErrorToResponseError).toHaveBeenCalledWith({
					code: 404,
				});
			});
			expect(isLoading.value).toBe(false);
		});
	});
});
