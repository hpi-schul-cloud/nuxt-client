import * as serverApi from "@/serverApi/v3/api";
import { useAdministrationRoomStore } from "@data-room";

import { useI18n } from "vue-i18n";
import { useBoardNotifier } from "@util-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { AxiosInstance, AxiosPromise } from "axios";
import { createPinia, setActivePinia } from "pinia";
import { initializeAxios } from "@/utils/api";
import {
	RoomStatsItemResponse,
	RoomStatsListResponse,
} from "@/serverApi/v3/api";
import { roomAdministrationFactory } from "@@/tests/test-utils";

jest.mock("vue-i18n");
(useI18n as jest.Mock).mockReturnValue({ t: (key: string) => key });

jest.mock("@util-board/BoardNotifier.composable");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

describe("useAdministrationRoomStore", () => {
	let roomAdministrationApiMock: DeepMocked<serverApi.RoomApiInterface>;
	let axiosMock: DeepMocked<AxiosInstance>;
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	beforeEach(() => {
		setActivePinia(createPinia());
		roomAdministrationApiMock = createMock<serverApi.RoomApiInterface>();
		jest
			.spyOn(serverApi, "RoomApiFactory")
			.mockReturnValue(roomAdministrationApiMock);
		axiosMock = createMock<AxiosInstance>();
		initializeAxios(axiosMock);

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const setup = (roomList: RoomStatsItemResponse[] = []) => {
		const roomAdminStore = useAdministrationRoomStore();
		roomAdminStore.roomList = roomList;
		return roomAdminStore;
	};

	describe("fetchRooms", () => {
		it("should fetch rooms and update roomList", async () => {
			const mockRooms: RoomStatsListResponse =
				roomAdministrationFactory.build();

			const { log } = console;

			log(mockRooms);

			roomAdministrationApiMock.roomControllerGetRoomStats.mockResolvedValue({
				data: mockRooms,
			} as unknown as AxiosPromise<RoomStatsListResponse>);

			const roomAdminStore = setup();
			await roomAdminStore.fetchRooms();

			expect(
				roomAdministrationApiMock.roomControllerGetRoomStats
			).toHaveBeenCalled();
			expect(roomAdminStore.isLoading).toBe(false);
			expect(roomAdminStore.roomList).toEqual(mockRooms.data);
			expect(roomAdminStore.isEmptyList).toBe(false);
		});

		it("should handle errors and show failure notification", async () => {
			const roomAdminStore = setup();
			roomAdministrationApiMock.roomControllerGetRoomStats.mockRejectedValue(
				new Error("API Error")
			);

			await roomAdminStore.fetchRooms();

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.administration.error.load"
			);
			expect(roomAdminStore.isEmptyList).toBe(true);
			expect(roomAdminStore.roomList).toEqual([]);
			expect(roomAdminStore.isLoading).toBe(false);
		});
	});
});
