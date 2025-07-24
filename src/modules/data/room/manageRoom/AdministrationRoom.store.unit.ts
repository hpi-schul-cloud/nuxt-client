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
import { roomAdministrationFactory, schoolFactory } from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import SchoolsModule from "@/store/schools";
import { schoolsModule } from "@/store";

jest.mock("vue-i18n");
(useI18n as jest.Mock).mockReturnValue({ t: (key: string) => key });

jest.mock("@util-board/BoardNotifier.composable");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

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
		jest
			.spyOn(serverApi, "RoomApiFactory")
			.mockReturnValue(roomAdministrationApiMock);
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

	describe("sortAndFormatList", () => {
		it("should sort and format the room list correctly", async () => {
			const mockRoomList = {
				data: [
					{
						roomId: "1",
						name: "Room 1",
						owner: "Owner 1",
						schoolName: "z School",
						createdAt: "2025-07-24T14:21:35.425Z",
						updatedAt: "2025-07-24T14:21:35.426Z",
						totalMembers: 10,
						internalMembers: 5,
						externalMembers: 5,
					},
					{
						roomId: "2",
						name: "Room 2",
						owner: undefined,
						schoolName: "b School",
						createdAt: "2025-07-24T14:21:35.426Z",
						updatedAt: "2025-07-24T14:21:35.426Z",
						totalMembers: 10,
						internalMembers: 5,
						externalMembers: 5,
					},
					{
						roomId: "3",
						name: "Room 3",
						owner: "Owner 3",
						schoolName: ownSchool.name,
						createdAt: "2025-07-24T14:21:35.426Z",
						updatedAt: "2025-07-24T14:21:35.426Z",
						totalMembers: 10,
						internalMembers: 5,
						externalMembers: 5,
					},
				],
				limit: 10,
				skip: 0,
				total: 5,
			};

			roomAdministrationApiMock.roomControllerGetRoomStats.mockResolvedValue({
				data: mockRoomList,
			} as unknown as AxiosPromise<RoomStatsListResponse>);

			const roomAdminStore = setup();

			await roomAdminStore.fetchRooms();

			expect(roomAdminStore.roomList).toEqual(mockRoomList.data);
			expect(roomAdminStore.roomList[0].owner).toStrictEqual(undefined);
			expect(roomAdminStore.roomList[0].createdAt).toStrictEqual("24.07.2025");

			const undefinedOwnerIndex = roomAdminStore.roomList.findIndex(
				(room) => room.owner === undefined
			);

			const sameAsOwnerSchoolIndex = roomAdminStore.roomList.findIndex(
				(room) => room.schoolName === ownSchool.name
			);

			const sortedSchoolNameIndex = roomAdminStore.roomList.findIndex(
				(room) => room.schoolName === "z School"
			);

			expect(undefinedOwnerIndex).toBe(0);
			expect(sameAsOwnerSchoolIndex).toBe(1);
			expect(sortedSchoolNameIndex).toBe(2);
		});
	});
});
