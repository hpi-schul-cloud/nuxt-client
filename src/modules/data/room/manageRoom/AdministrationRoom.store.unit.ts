import * as serverApi from "@/serverApi/v3/api";
import { useAdministrationRoomStore } from "@data-room";
import { useI18n } from "vue-i18n";
import { useBoardNotifier } from "@util-board";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { AxiosInstance, AxiosPromise } from "axios";
import { createPinia, setActivePinia } from "pinia";
import { initializeAxios } from "@/utils/api";
import {
	RoomStatsItemResponse,
	RoomStatsListResponse,
} from "@/serverApi/v3/api";
import {
	mockedPiniaStoreTyping,
	schoolFactory,
	roomStatsItemResponseFactory,
	roomStatsListResponseFactory,
} from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import SchoolsModule from "@/store/schools";
import { schoolsModule } from "@/store";
import { Mock } from "vitest";
import { printFromStringUtcToFullDate } from "@/plugins/datetime";

vi.mock("vue-i18n");
(useI18n as Mock).mockReturnValue({ t: (key: string) => key });

vi.mock("@util-board/BoardNotifier.composable");
const mockedUseBoardNotifier = vi.mocked(useBoardNotifier);

describe("useAdministrationRoomStore", () => {
	let roomAdministrationApiMock: DeepMocked<serverApi.RoomApiInterface>;
	let axiosMock: DeepMocked<AxiosInstance>;
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	const ownSchool = {
		id: "school-id",
		name: "Paul-Gerhardt-Gymnasium",
	};

	beforeEach(() => {
		setActivePinia(createPinia());
		roomAdministrationApiMock = createMock<serverApi.RoomApiInterface>();
		vi.spyOn(serverApi, "RoomApiFactory").mockReturnValue(
			roomAdministrationApiMock
		);
		axiosMock = createMock<AxiosInstance>();
		initializeAxios(axiosMock);

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

		setupStores({
			schoolsModule: SchoolsModule,
		});

		schoolsModule.setSchool(schoolFactory.build(ownSchool));
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (roomList?: RoomStatsItemResponse[]) => {
		const roomAdminStore = mockedPiniaStoreTyping(useAdministrationRoomStore);
		roomAdminStore.roomList = roomList ?? [];
		return { roomAdminStore };
	};

	describe("fetchRooms", () => {
		it("should fetch rooms", async () => {
			const mockRoomList = roomStatsListResponseFactory.build();
			const { roomAdminStore } = setup();

			roomAdministrationApiMock.roomControllerGetRoomStats.mockResolvedValue({
				data: mockRoomList,
			} as unknown as AxiosPromise<RoomStatsListResponse>);

			await roomAdminStore.fetchRooms();

			expect(
				roomAdministrationApiMock.roomControllerGetRoomStats
			).toHaveBeenCalled();
			expect(roomAdminStore.isLoading).toBe(false);
			expect(roomAdminStore.isEmptyList).toBe(false);
		});

		it("should return empty list if no rooms are found", async () => {
			const { roomAdminStore } = setup();

			roomAdministrationApiMock.roomControllerGetRoomStats.mockResolvedValue({
				data: { data: [] },
			} as unknown as AxiosPromise<RoomStatsListResponse>);

			await roomAdminStore.fetchRooms();

			expect(roomAdminStore.roomList).toEqual([]);
		});

		it("should update roomList", async () => {
			const mockRoomList = roomStatsListResponseFactory.build();
			const { roomAdminStore } = setup();

			roomAdministrationApiMock.roomControllerGetRoomStats.mockResolvedValue({
				data: mockRoomList,
			} as unknown as AxiosPromise<RoomStatsListResponse>);

			await roomAdminStore.fetchRooms();

			const expectedRoomList = mockRoomList.data.map((room) => ({
				...room,
				createdAt: printFromStringUtcToFullDate(room.createdAt),
			}));

			expect(roomAdminStore.roomList).toEqual(expectedRoomList);
		});

		it("should handle errors and show failure notification", async () => {
			const { roomAdminStore } = setup();
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

		describe("sortAndFormatList", () => {
			it("should format createdAt date", async () => {
				const mockRoomList = roomStatsListResponseFactory.build();
				const { roomAdminStore } = setup();

				roomAdministrationApiMock.roomControllerGetRoomStats.mockResolvedValue({
					data: mockRoomList,
				} as unknown as AxiosPromise<RoomStatsListResponse>);

				await roomAdminStore.fetchRooms();

				const expectedDate = printFromStringUtcToFullDate(
					mockRoomList.data[0].createdAt
				);

				expect(roomAdminStore.roomList[0].createdAt).toBe(expectedDate);
			});

			it("should sort and format the room list correctly", async () => {
				roomStatsItemResponseFactory.rewindSequence(); // to have rooms eunumerated from 1 to make alphabetical sorting easier
				const { roomAdminStore } = setup();

				const roomsWithoutOwner = roomStatsItemResponseFactory.buildList(2, {
					owner: "",
				});

				const roomsFromAnotherSchool = roomStatsItemResponseFactory.buildList(
					2,
					{ schoolName: "C School" }
				);

				const roomsFromOwnSchool = roomStatsItemResponseFactory.buildList(2, {
					schoolName: ownSchool.name,
				});

				const roomList = roomStatsListResponseFactory.build({
					data: [
						roomsFromOwnSchool[0],
						roomsFromAnotherSchool[0],
						roomsWithoutOwner[0],
						roomsFromAnotherSchool[1],
						roomsFromOwnSchool[1],
						roomsWithoutOwner[1],
					],
				});

				roomAdministrationApiMock.roomControllerGetRoomStats.mockResolvedValue({
					data: roomList,
				} as unknown as AxiosPromise<RoomStatsListResponse>);
				await roomAdminStore.fetchRooms();

				// Sorting order:
				// 1. Ownerless rooms (sorted by school name, then room name)
				// 2. Own school rooms (sorted by room name)
				// 3. Other school rooms (sorted by school name, then room name)
				const sortedList = roomStatsListResponseFactory.build({
					data: [
						roomsWithoutOwner[0],
						roomsWithoutOwner[1],
						roomsFromOwnSchool[0],
						roomsFromOwnSchool[1],
						roomsFromAnotherSchool[0],
						roomsFromAnotherSchool[1],
					],
				});
				const sortedAndFormattedRoomList = sortedList.data.map((room) => ({
					...room,
					createdAt: printFromStringUtcToFullDate(room.createdAt),
				}));

				expect(roomAdminStore.roomList).toEqual(sortedAndFormattedRoomList);
			});
		});
	});

	describe("deleteRoom", () => {
		it("should delete a room and update roomList", async () => {
			const mockRooms = roomStatsListResponseFactory.build();
			const { roomAdminStore } = setup(mockRooms.data);

			roomAdministrationApiMock.roomControllerGetRoomStats.mockResolvedValue({
				data: mockRooms,
			} as unknown as AxiosPromise<RoomStatsListResponse>);

			const roomIdToDelete = mockRooms.data[0].roomId;
			await roomAdminStore.deleteRoom(roomIdToDelete);

			expect(
				roomAdministrationApiMock.roomControllerDeleteRoom
			).toHaveBeenCalledWith(roomIdToDelete);
			expect(roomAdminStore.roomList).toEqual(
				mockRooms.data.filter((room) => room.roomId !== roomIdToDelete)
			);
			expect(roomAdminStore.isLoading).toBe(false);
		});

		it("should handle errors during room deletion", async () => {
			const { roomAdminStore } = setup();

			const roomIdToDelete = "room-id";
			roomAdministrationApiMock.roomControllerDeleteRoom.mockRejectedValue(
				new Error("API Error")
			);

			await roomAdminStore.deleteRoom(roomIdToDelete);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.administration.error.delete"
			);
			expect(roomAdminStore.isLoading).toBe(false);
		});
	});
});
