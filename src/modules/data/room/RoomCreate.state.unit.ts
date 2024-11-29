import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useRoomCreateState } from "./RoomCreate.state";
import * as serverApi from "@/serverApi/v3/api";
import { AxiosInstance } from "axios";
import { useApplicationError } from "@/composables/application-error.composable";
import { initializeAxios, mapAxiosErrorToResponseError } from "@/utils/api";
import setupStores from "@@/tests/test-utils/setupStores";
import ApplicationErrorModule from "@/store/application-error";
import { RoomCreateParams } from "@/types/room/Room";
import { ref } from "vue";
import {
	apiResponseErrorFactory,
	axiosErrorFactory,
} from "@@/tests/test-utils";

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

describe("useRoomCreateState", () => {
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
		jest.resetAllMocks();
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
			color: serverApi.RoomColor.BlueGrey,
			startDate: undefined,
			endDate: undefined,
		});

		it("should call roomApi.roomControllerCreateRoom with the provided params", async () => {
			const { createRoom, isLoading } = setup();
			expect(isLoading.value).toBe(true);

			await createRoom(roomData.value);
			expect(roomApiMock.roomControllerCreateRoom).toHaveBeenCalledWith(
				roomData.value
			);
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
