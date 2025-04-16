import * as serverApi from "@/serverApi/v3/api";
import {
	RoleName,
	SchoolUserListResponse,
	ChangeRoomRoleBodyParamsRoleNameEnum,
} from "@/serverApi/v3/api";
import { authModule, schoolsModule } from "@/store";
import AuthModule from "@/store/auth";
import SchoolsModule from "@/store/schools";
import { initializeAxios } from "@/utils/api";
import {
	meResponseFactory,
	mockApiResponse,
	mockedPiniaStoreTyping,
	roomFactory,
	roomMemberFactory,
	roomMemberListFactory,
	roomMemberSchoolResponseFactory,
	schoolFactory,
} from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import { useRoomDetailsStore, useRoomMembersStore } from "@data-room";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useBoardNotifier } from "@util-board";
import { logger } from "@util-logger";
import { AxiosInstance } from "axios";
import { createPinia, setActivePinia } from "pinia";
import { useI18n } from "vue-i18n";

jest.mock("vue-i18n");
(useI18n as jest.Mock).mockReturnValue({ t: (key: string) => key });

jest.mock("@util-board/BoardNotifier.composable");
jest.mock("@util-board/LastCreatedElement.composable");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

describe("useRoomMembers", () => {
	let roomApiMock: DeepMocked<serverApi.RoomApiInterface>;
	let schoolApiMock: DeepMocked<serverApi.SchoolApiInterface>;
	let axiosMock: DeepMocked<AxiosInstance>;
	let consoleErrorSpy: jest.SpyInstance;
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	beforeEach(() => {
		setActivePinia(createPinia());

		roomApiMock = createMock<serverApi.RoomApiInterface>();
		schoolApiMock = createMock<serverApi.SchoolApiInterface>();
		axiosMock = createMock<AxiosInstance>();
		consoleErrorSpy = jest.spyOn(logger, "error").mockImplementation();

		jest.spyOn(serverApi, "RoomApiFactory").mockReturnValue(roomApiMock);
		jest.spyOn(serverApi, "SchoolApiFactory").mockReturnValue(schoolApiMock);
		initializeAxios(axiosMock);

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

		setupStores({
			schoolsModule: SchoolsModule,
			authModule: AuthModule,
		});

		schoolsModule.setSchool(
			schoolFactory.build({
				id: "school-id",
				name: "Paul-Gerhardt-Gymnasium",
			})
		);

		const mockMe = meResponseFactory.build();
		authModule.setMe(mockMe);
	});

	const setup = () => {
		const roomDetailsStore = mockedPiniaStoreTyping(useRoomDetailsStore);
		roomDetailsStore.room = roomFactory.build();

		const roomMembersStore = mockedPiniaStoreTyping(useRoomMembersStore);

		return { roomMembersStore, roomDetailsStore };
	};

	afterEach(() => {
		jest.clearAllMocks();
		consoleErrorSpy.mockRestore();
	});

	it("should throw an error if the roomId is undefined", async () => {
		const roomMembersStore = mockedPiniaStoreTyping(useRoomMembersStore);

		await roomMembersStore.fetchMembers();

		expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
			"pages.rooms.members.error.load"
		);
	});

	describe("fetchMembers", () => {
		describe("when the user is not room owner", () => {
			it("should fetch members and map members with role names", async () => {
				const { roomMembersStore } = setup();

				const membersMock = roomMemberFactory.buildList(3, {
					roomRoleName: RoleName.Roomadmin,
				});

				roomApiMock.roomControllerGetMembers.mockResolvedValue(
					mockApiResponse({
						data: { data: membersMock },
					})
				);

				await roomMembersStore.fetchMembers();

				expect(roomMembersStore.roomMembers).toEqual(
					membersMock.map((member) => ({
						...member,
						displayRoomRole: "pages.rooms.members.roomPermissions.admin",
						displaySchoolRole: "common.labels.teacher",
						isSelectable: true,
					}))
				);
			});
		});

		describe("when the user is room owner", () => {
			it("should fetch members and map members with role names", async () => {
				const { roomMembersStore } = setup();
				const membersMock = roomMemberFactory.buildList(3, {
					roomRoleName: RoleName.Roomowner,
				});

				roomApiMock.roomControllerGetMembers.mockResolvedValue(
					mockApiResponse({
						data: {
							data: membersMock,
						},
					})
				);

				await roomMembersStore.fetchMembers();

				expect(roomMembersStore.roomMembers).toEqual(
					membersMock.map((member) => ({
						...member,
						displayRoomRole: "pages.rooms.members.roomPermissions.owner",
						displaySchoolRole: "common.labels.teacher",
						isSelectable: false,
					}))
				);
			});
		});

		describe("when the user has school role administrator and teacher", () => {
			it("should map the school role to teacher", async () => {
				const { roomMembersStore } = setup();
				const membersMock = roomMemberFactory.buildList(1, {
					roomRoleName: RoleName.Roomadmin,
				});
				membersMock[0].schoolRoleNames = [
					RoleName.Administrator,
					RoleName.Teacher,
				];

				roomApiMock.roomControllerGetMembers.mockResolvedValue(
					mockApiResponse({
						data: { data: membersMock },
					})
				);

				await roomMembersStore.fetchMembers();

				expect(roomMembersStore.roomMembers).toEqual(
					membersMock.map((member) => ({
						...member,
						displayRoomRole: "pages.rooms.members.roomPermissions.admin",
						displaySchoolRole: "common.labels.teacher",
						isSelectable: true,
					}))
				);
			});
		});

		it("should throw an error if the API call fails", async () => {
			const { roomMembersStore } = setup();

			const error = new Error("Test error");
			roomApiMock.roomControllerGetMembers.mockRejectedValue(error);

			await roomMembersStore.fetchMembers();

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.members.error.load"
			);
		});
	});

	describe("getPotentialMembers", () => {
		it("should get potential members", async () => {
			const { roomMembersStore } = setup();

			const schoolTeachersList: SchoolUserListResponse = {
				data: [
					{
						firstName: "Carl",
						lastName: "Cord",
						id: "1",
						schoolName: "Paul-Gerhardt-Gymnasium",
					},
					{
						firstName: "John",
						lastName: "Doe",
						id: "2",
						schoolName: "Paul-Gerhardt-Gymnasium",
					},
				],
			};
			schoolApiMock.schoolControllerGetTeachers.mockResolvedValue(
				mockApiResponse({
					data: schoolTeachersList,
				})
			);

			await roomMembersStore.getPotentialMembers(RoleName.Teacher);

			expect(roomMembersStore.potentialRoomMembers).toEqual(
				schoolTeachersList.data.map((user) => ({
					...user,
					userId: user.id,
					fullName: `${user.lastName}, ${user.firstName}`,
					schoolRoleNames: [RoleName.Teacher],
					schoolName: "Paul-Gerhardt-Gymnasium",
					displayRoomRole: "pages.rooms.members.roomPermissions.admin",
					displaySchoolRole: "common.labels.teacher",
				}))
			);
		});

		it("should filter out members that are already in the room", async () => {
			const { roomMembersStore } = setup();

			const membersMock = roomMemberFactory.build({
				roomRoleName: RoleName.Roomeditor,
			});

			roomMembersStore.roomMembers = [membersMock];

			const schoolTeachersList: SchoolUserListResponse = {
				data: [
					{
						firstName: membersMock.firstName,
						lastName: membersMock.lastName,
						id: membersMock.userId,
						schoolName: membersMock.schoolName,
					},
				],
			};
			schoolApiMock.schoolControllerGetTeachers.mockResolvedValue(
				mockApiResponse({
					data: schoolTeachersList,
				})
			);

			await roomMembersStore.getPotentialMembers(RoleName.Teacher);

			expect(roomMembersStore.potentialRoomMembers).toEqual([]);
		});

		it("should throw an error if the API call fails", async () => {
			const { roomMembersStore } = setup();

			const error = new Error("Test error");
			schoolApiMock.schoolControllerGetTeachers.mockRejectedValue(error);

			await roomMembersStore.getPotentialMembers(RoleName.Teacher);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.members.error.load"
			);
		});
	});

	describe("currentUser", () => {
		it("should set the currentUser", async () => {
			const mockMe = meResponseFactory.build();
			const membersMock = roomMemberFactory.buildList(3, {
				roomRoleName: RoleName.Roomviewer,
			});
			authModule.setMe({
				...mockMe,
				user: { ...mockMe.user, id: membersMock[1].userId },
			});
			membersMock[1].roomRoleName = RoleName.Roomowner;

			const { roomMembersStore } = setup();

			roomMembersStore.roomMembers = membersMock;

			expect(roomMembersStore.currentUser).toEqual(membersMock[1]);
		});
	});

	describe("getSchools", () => {
		it("should get schools", async () => {
			const { roomMembersStore } = setup();
			const schoolList = roomMemberSchoolResponseFactory.buildList(3);
			schoolApiMock.schoolControllerGetSchoolListForExternalInvite.mockResolvedValue(
				mockApiResponse({
					data: schoolList,
				})
			);
			await roomMembersStore.getSchools();

			expect(roomMembersStore.schools).toHaveLength(schoolList.length + 1);
			expect(roomMembersStore.schools[0]).toStrictEqual({
				id: "school-id",
				name: "Paul-Gerhardt-Gymnasium",
			});
		});

		it("should throw an error if the API call fails", async () => {
			const { roomMembersStore } = setup();

			const error = new Error("Test error");
			schoolApiMock.schoolControllerGetSchoolListForExternalInvite.mockRejectedValue(
				error
			);

			await roomMembersStore.getSchools();

			expect(consoleErrorSpy).toHaveBeenCalledWith(error);
		});
	});

	describe("addMembers", () => {
		it("should add members to the room", async () => {
			const { roomMembersStore, roomDetailsStore } = setup();

			roomApiMock.roomControllerAddMembers.mockResolvedValue(
				mockApiResponse({ data: { roomRoleName: RoleName.Roomadmin } })
			);

			roomMembersStore.potentialRoomMembers =
				roomMemberListFactory.buildList(3);
			const firstPotentialMember = roomMembersStore.potentialRoomMembers[0];

			await roomMembersStore.addMembers([firstPotentialMember.userId]);

			expect(roomApiMock.roomControllerAddMembers).toHaveBeenCalledWith(
				roomDetailsStore.room!.id,
				{
					userIds: [firstPotentialMember.userId],
				}
			);
			expect(roomMembersStore.roomMembers).toEqual([
				{
					...firstPotentialMember,
					displayRoomRole: "pages.rooms.members.roomPermissions.admin",
					displaySchoolRole: "common.labels.teacher",
				},
			]);
		});

		it("should throw an error if the API call fails", async () => {
			const { roomMembersStore } = setup();

			const error = new Error("Test error");
			roomApiMock.roomControllerAddMembers.mockRejectedValue(error);

			await roomMembersStore.addMembers(["id"]);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.members.error.add"
			);
		});
	});

	describe("removeMembers", () => {
		it("should remove a members from the room", async () => {
			const { roomMembersStore, roomDetailsStore } = setup();

			roomApiMock.roomControllerRemoveMembers.mockResolvedValue(
				mockApiResponse({})
			);

			const membersMock = roomMemberFactory.buildList(3, {
				roomRoleName: RoleName.Roomeditor,
			});
			roomMembersStore.roomMembers = membersMock;

			await roomMembersStore.removeMembers([membersMock[1].userId]);

			expect(roomApiMock.roomControllerRemoveMembers).toHaveBeenCalledWith(
				roomDetailsStore.room!.id,
				{
					userIds: [membersMock[1].userId],
				}
			);

			expect(roomMembersStore.roomMembers).not.toContainEqual(membersMock[1]);
		});

		it("should throw an error if the API call fails", async () => {
			const { roomMembersStore } = setup();

			const error = new Error("Test error");
			roomApiMock.roomControllerRemoveMembers.mockRejectedValue(error);

			await roomMembersStore.removeMembers(["id"]);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.members.error.remove"
			);
		});
	});

	describe("leaveRoom", () => {
		it("should call the leaveRoom api", async () => {
			const { roomMembersStore, roomDetailsStore } = setup();

			roomApiMock.roomControllerLeaveRoom.mockResolvedValue(
				mockApiResponse({})
			);

			await roomMembersStore.leaveRoom();

			expect(roomApiMock.roomControllerLeaveRoom).toHaveBeenCalledWith(
				roomDetailsStore.room!.id
			);
		});

		it("should throw an error if the API call fails", async () => {
			const { roomMembersStore } = setup();

			const error = new Error("Test error");
			roomApiMock.roomControllerLeaveRoom.mockRejectedValue(error);

			await roomMembersStore.leaveRoom();

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.members.error.remove"
			);
		});
	});

	describe("updateMembersRole", () => {
		it("should update the role of a member", async () => {
			const { roomMembersStore, roomDetailsStore } = setup();

			roomApiMock.roomControllerChangeRolesOfMembers.mockResolvedValue(
				mockApiResponse({})
			);

			const membersMock = roomMemberFactory.buildList(3, {
				roomRoleName: RoleName.Roomviewer,
			});
			roomMembersStore.roomMembers = membersMock;

			roomMembersStore.selectedIds = [membersMock[1].userId];

			await roomMembersStore.updateMembersRole(
				ChangeRoomRoleBodyParamsRoleNameEnum.Roomadmin
			);

			expect(
				roomApiMock.roomControllerChangeRolesOfMembers
			).toHaveBeenCalledWith(roomDetailsStore.room!.id, {
				userIds: [membersMock[1].userId],
				roleName: RoleName.Roomadmin,
			});

			expect(roomMembersStore.roomMembers[1].roomRoleName).toBe(
				RoleName.Roomadmin
			);
			expect(roomMembersStore.roomMembers[1].displayRoomRole).toBe(
				"pages.rooms.members.roomPermissions.admin"
			);
		});

		it("should update the role of a member with 'id' parameter", async () => {
			const { roomMembersStore, roomDetailsStore } = setup();

			roomApiMock.roomControllerChangeRolesOfMembers.mockResolvedValue(
				mockApiResponse({})
			);

			const membersMock = roomMemberFactory.buildList(3, {
				roomRoleName: RoleName.Roomviewer,
			});
			roomMembersStore.roomMembers = membersMock;

			await roomMembersStore.updateMembersRole(
				ChangeRoomRoleBodyParamsRoleNameEnum.Roomadmin,
				membersMock[1].userId
			);

			expect(
				roomApiMock.roomControllerChangeRolesOfMembers
			).toHaveBeenCalledWith(roomDetailsStore.room!.id, {
				userIds: [membersMock[1].userId],
				roleName: RoleName.Roomadmin,
			});

			expect(roomMembersStore.roomMembers[1].roomRoleName).toBe(
				RoleName.Roomadmin
			);
			expect(roomMembersStore.roomMembers[1].displayRoomRole).toBe(
				"pages.rooms.members.roomPermissions.admin"
			);
		});

		it("should throw an error if the API call fails", async () => {
			const { roomMembersStore } = setup();

			const error = new Error("Test error");
			roomApiMock.roomControllerChangeRolesOfMembers.mockRejectedValue(error);

			await roomMembersStore.updateMembersRole(
				ChangeRoomRoleBodyParamsRoleNameEnum.Roomadmin
			);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.members.error.updateRole"
			);
		});
	});

	describe("changeRoomOwner", () => {
		it("should call the API", async () => {
			const { roomMembersStore, roomDetailsStore } = setup();

			const membersMock = roomMemberFactory.buildList(3, {
				roomRoleName: RoleName.Roomviewer,
			});
			roomMembersStore.roomMembers = membersMock;

			await roomMembersStore.changeRoomOwner(membersMock[1].userId);

			expect(roomApiMock.roomControllerChangeRoomOwner).toHaveBeenCalledWith(
				roomDetailsStore.room!.id,
				{
					userId: membersMock[1].userId,
				}
			);
		});

		it("should swap the ownership in the state", async () => {
			const { roomMembersStore } = setup();

			const roomViewers = roomMemberFactory.buildList(3, {
				roomRoleName: RoleName.Roomviewer,
			});
			const roomOwner = roomMemberFactory.build({
				roomRoleName: RoleName.Roomowner,
			});
			const futureRoomOwner = roomViewers.pop();
			if (futureRoomOwner) {
				roomMembersStore.roomMembers = [
					roomOwner,
					futureRoomOwner,
					...roomViewers,
				];
			}

			expect(roomOwner.roomRoleName).toBe(RoleName.Roomowner);
			expect(futureRoomOwner?.roomRoleName).toBe(RoleName.Roomviewer);

			await roomMembersStore.changeRoomOwner(futureRoomOwner?.userId ?? "");

			expect(roomOwner.roomRoleName).toBe(RoleName.Roomadmin);
			expect(futureRoomOwner?.roomRoleName).toBe(RoleName.Roomowner);
		});

		it('should show an error if the "currentOwner" or "memberToBeOwner" is not found', async () => {
			const { roomMembersStore } = setup();

			const membersMock = roomMemberFactory.buildList(3, {
				roomRoleName: RoleName.Roomviewer,
			});
			const futureRoomOwner = membersMock.pop();
			if (futureRoomOwner) {
				roomApiMock.roomControllerChangeRoomOwner.mockResolvedValue(
					mockApiResponse({})
				);
			}

			await roomMembersStore.changeRoomOwner(futureRoomOwner?.userId ?? "");

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.members.error.updateRole"
			);
		});

		it("should throw an error if the API call fails", async () => {
			const { roomMembersStore } = setup();

			const error = new Error("Test error");
			roomApiMock.roomControllerChangeRoomOwner.mockRejectedValue(error);

			await roomMembersStore.changeRoomOwner("test-id");

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.members.error.updateRole"
			);
		});
	});
});
