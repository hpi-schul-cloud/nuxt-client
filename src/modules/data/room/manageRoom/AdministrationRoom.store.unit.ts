import { initializeAxios } from "@/utils/api";
import {
	expectNotification,
	mockApi,
	mockApiResponse,
	mockAxiosInstance,
	mockedPiniaStoreTyping,
	roomStatsItemResponseFactory,
	roomStatsListResponseFactory,
	schoolFactory,
} from "@@/tests/test-utils";
import { createTestSchoolStore } from "@@/tests/test-utils/factory/school-test.utils";
import * as serverApi from "@api-server";
import { RoomStatsItemResponse, RoomStatsListResponse } from "@api-server";
import { useAdministrationRoomStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { AxiosInstance } from "axios";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

describe("useAdministrationRoomStore", () => {
	let roomAdministrationApiMock: Mocked<serverApi.RoomApiInterface>;
	let axiosMock: Mocked<AxiosInstance>;
	const ownSchool = schoolFactory.build({
		id: "school-id",
		name: "Paul-Gerhardt-Gymnasium",
	});

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		roomAdministrationApiMock = mockApi<serverApi.RoomApiInterface>();
		vi.spyOn(serverApi, "RoomApiFactory").mockReturnValue(roomAdministrationApiMock);
		axiosMock = mockAxiosInstance();
		initializeAxios(axiosMock);

		createTestSchoolStore({ schoolDetails: ownSchool });
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

			roomAdministrationApiMock.roomControllerGetRoomStats.mockResolvedValue(
				mockApiResponse<RoomStatsListResponse>({
					data: mockRoomList,
				})
			);

			await roomAdminStore.fetchRooms();

			expect(roomAdministrationApiMock.roomControllerGetRoomStats).toHaveBeenCalledWith(0, 500);
			expect(roomAdminStore.isLoading).toBe(false);
			expect(roomAdminStore.isEmptyList).toBe(false);
		});

		it("should fetch all room pages", async () => {
			const firstPage = roomStatsListResponseFactory.build({
				data: roomStatsItemResponseFactory.buildList(500),
				total: 600,
				skip: 0,
				limit: 500,
			});
			const secondPage = roomStatsListResponseFactory.build({
				data: roomStatsItemResponseFactory.buildList(100),
				total: 600,
				skip: 500,
				limit: 500,
			});
			const { roomAdminStore } = setup();

			roomAdministrationApiMock.roomControllerGetRoomStats
				.mockResolvedValueOnce(
					mockApiResponse<RoomStatsListResponse>({
						data: firstPage,
					})
				)
				.mockResolvedValueOnce(
					mockApiResponse<RoomStatsListResponse>({
						data: secondPage,
					})
				);

			await roomAdminStore.fetchRooms();

			expect(roomAdministrationApiMock.roomControllerGetRoomStats).toHaveBeenNthCalledWith(1, 0, 500);
			expect(roomAdministrationApiMock.roomControllerGetRoomStats).toHaveBeenNthCalledWith(2, 500, 500);
			expect(roomAdminStore.roomList).toHaveLength(600);
		});

		it("should return empty list if no rooms are found", async () => {
			const { roomAdminStore } = setup();

			roomAdministrationApiMock.roomControllerGetRoomStats.mockResolvedValue(
				mockApiResponse<RoomStatsListResponse>({
					data: {
						data: [],
						total: 0,
						skip: 0,
						limit: 0,
					},
				})
			);

			await roomAdminStore.fetchRooms();

			expect(roomAdminStore.roomList).toEqual([]);
		});

		it("should update roomList", async () => {
			const mockRoomList = roomStatsListResponseFactory.build();
			const { roomAdminStore } = setup();

			roomAdministrationApiMock.roomControllerGetRoomStats.mockResolvedValue(
				mockApiResponse<RoomStatsListResponse>({
					data: mockRoomList,
				})
			);

			await roomAdminStore.fetchRooms();

			expect(roomAdminStore.roomList).toEqual(mockRoomList.data);
		});

		it("should handle errors and show failure notification", async () => {
			const { roomAdminStore } = setup();
			roomAdministrationApiMock.roomControllerGetRoomStats.mockRejectedValue(new Error("API Error"));

			await roomAdminStore.fetchRooms();

			expectNotification("error");
			expect(roomAdminStore.isEmptyList).toBe(true);
			expect(roomAdminStore.roomList).toEqual([]);
			expect(roomAdminStore.isLoading).toBe(false);
		});

		describe("sortAndFormatList", () => {
			it("should keep createdAt as raw ISO string", async () => {
				const mockRoomList = roomStatsListResponseFactory.build();
				const { roomAdminStore } = setup();

				roomAdministrationApiMock.roomControllerGetRoomStats.mockResolvedValue(
					mockApiResponse<RoomStatsListResponse>({
						data: mockRoomList,
					})
				);

				await roomAdminStore.fetchRooms();

				expect(roomAdminStore.roomList[0].createdAt).toBe(mockRoomList.data[0].createdAt);
			});

			it("should sort and format the room list correctly", async () => {
				roomStatsItemResponseFactory.rewindSequence(); // to have rooms eunumerated from 1 to make alphabetical sorting easier
				const { roomAdminStore } = setup();

				const roomsWithoutOwner = roomStatsItemResponseFactory.buildList(2, {
					owner: "",
				});

				const roomsFromAnotherSchool = roomStatsItemResponseFactory.buildList(2, { schoolName: "C School" });

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

				roomAdministrationApiMock.roomControllerGetRoomStats.mockResolvedValue(
					mockApiResponse<RoomStatsListResponse>({
						data: roomList,
					})
				);
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
				expect(roomAdminStore.roomList).toEqual(sortedList.data);
			});
		});
	});

	describe("deleteRoom", () => {
		it("should delete a room and update roomList", async () => {
			const mockRooms = roomStatsListResponseFactory.build();
			const { roomAdminStore } = setup(mockRooms.data);

			roomAdministrationApiMock.roomControllerGetRoomStats.mockResolvedValue(
				mockApiResponse<RoomStatsListResponse>({
					data: mockRooms,
				})
			);

			const roomIdToDelete = mockRooms.data[0].roomId;
			await roomAdminStore.deleteRoom(roomIdToDelete);

			const remainingRooms = mockRooms.data.filter((room) => room.roomId !== roomIdToDelete);

			expect(roomAdministrationApiMock.roomControllerDeleteRoom).toHaveBeenCalledWith(roomIdToDelete);
			expect(roomAdminStore.roomList).toEqual(remainingRooms);
			expect(roomAdminStore.isLoading).toBe(false);
		});

		it("should handle errors during room deletion", async () => {
			const { roomAdminStore } = setup();

			const roomIdToDelete = "room-id";
			roomAdministrationApiMock.roomControllerDeleteRoom.mockRejectedValue(new Error("API Error"));

			await roomAdminStore.deleteRoom(roomIdToDelete);

			expectNotification("error");
			expect(roomAdminStore.isLoading).toBe(false);
		});
	});
});
