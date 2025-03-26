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
	roomMemberFactory,
	roomMemberListFactory,
	roomMemberSchoolResponseFactory,
	schoolFactory,
} from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import { RoomMember, useRoomMembers } from "@data-room";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useBoardNotifier } from "@util-board";
import { logger } from "@util-logger";
import { AxiosInstance } from "axios";
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

	const roomId = "room-id";

	beforeEach(() => {
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

	afterEach(() => {
		jest.clearAllMocks();
		consoleErrorSpy.mockRestore();
	});

	describe("fetchMembers", () => {
		describe("when the user is not room owner", () => {
			it("should fetch members and map members with role names", async () => {
				const { fetchMembers, roomMembers } = useRoomMembers(roomId);
				const membersMock = roomMemberFactory(RoleName.Roomadmin).buildList(3);

				roomApiMock.roomControllerGetMembers.mockResolvedValue(
					mockApiResponse({
						data: { data: membersMock },
					})
				);

				await fetchMembers();

				expect(roomMembers.value).toEqual(
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
				const { fetchMembers, roomMembers } = useRoomMembers(roomId);
				const membersMock = roomMemberFactory(RoleName.Roomowner).buildList(3);

				roomApiMock.roomControllerGetMembers.mockResolvedValue(
					mockApiResponse({
						data: {
							data: membersMock,
						},
					})
				);

				await fetchMembers();

				expect(roomMembers.value).toEqual(
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
				const { fetchMembers, roomMembers } = useRoomMembers(roomId);
				const membersMock = roomMemberFactory(RoleName.Roomadmin).buildList(1);
				membersMock[0].schoolRoleNames = [
					RoleName.Administrator,
					RoleName.Teacher,
				];

				roomApiMock.roomControllerGetMembers.mockResolvedValue(
					mockApiResponse({
						data: { data: membersMock },
					})
				);

				await fetchMembers();

				expect(roomMembers.value).toEqual(
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
			const { fetchMembers } = useRoomMembers(roomId);

			const error = new Error("Test error");
			roomApiMock.roomControllerGetMembers.mockRejectedValue(error);

			await fetchMembers();

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.members.error.load"
			);
		});
	});

	describe("getPotentialMembers", () => {
		it("should get potential members", async () => {
			const { getPotentialMembers, potentialRoomMembers } =
				useRoomMembers(roomId);

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

			await getPotentialMembers(RoleName.Teacher);

			expect(potentialRoomMembers.value).toEqual(
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
			const { getPotentialMembers, potentialRoomMembers, roomMembers } =
				useRoomMembers(roomId);

			const membersMock: RoomMember = roomMemberFactory(
				RoleName.Roomeditor
			).build();

			roomMembers.value = [membersMock];

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

			await getPotentialMembers(RoleName.Teacher);

			expect(potentialRoomMembers.value).toEqual([]);
		});

		it("should throw an error if the API call fails", async () => {
			const { getPotentialMembers } = useRoomMembers(roomId);

			const error = new Error("Test error");
			schoolApiMock.schoolControllerGetTeachers.mockRejectedValue(error);

			await getPotentialMembers(RoleName.Teacher);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.members.error.load"
			);
		});
	});

	describe("currentUser", () => {
		it("should set the currentUser", async () => {
			const mockMe = meResponseFactory.build();
			const membersMock = roomMemberFactory(RoleName.Roomviewer).buildList(3);
			authModule.setMe({
				...mockMe,
				user: { ...mockMe.user, id: membersMock[1].userId },
			});
			membersMock[1].roomRoleName = RoleName.Roomowner;
			roomApiMock.roomControllerGetMembers.mockResolvedValue(
				mockApiResponse({
					data: { data: membersMock },
				})
			);

			const { roomMembers, currentUser } = useRoomMembers(roomId);
			roomMembers.value = membersMock;

			expect(currentUser.value).toEqual(membersMock[1]);
		});
	});

	describe("getSchools", () => {
		it("should get schools", async () => {
			const { getSchools, schools } = useRoomMembers(roomId);
			const schoolList = roomMemberSchoolResponseFactory.buildList(3);
			schoolApiMock.schoolControllerGetSchoolListForExternalInvite.mockResolvedValue(
				mockApiResponse({
					data: schoolList,
				})
			);
			await getSchools();

			expect(schools.value).toHaveLength(schoolList.length + 1);
			expect(schools.value[0]).toStrictEqual({
				id: "school-id",
				name: "Paul-Gerhardt-Gymnasium",
			});
		});

		it("should throw an error if the API call fails", async () => {
			const { getSchools } = useRoomMembers(roomId);

			const error = new Error("Test error");
			schoolApiMock.schoolControllerGetSchoolListForExternalInvite.mockRejectedValue(
				error
			);

			await getSchools();

			expect(consoleErrorSpy).toHaveBeenCalledWith(error);
		});
	});

	describe("addMembers", () => {
		it("should add a members to the room", async () => {
			const { addMembers, potentialRoomMembers, roomMembers } =
				useRoomMembers(roomId);

			roomApiMock.roomControllerAddMembers.mockResolvedValue(
				mockApiResponse({ data: { roomRoleName: RoleName.Roomadmin } })
			);

			potentialRoomMembers.value = roomMemberListFactory.buildList(3);
			const firstPotentialMember = potentialRoomMembers.value[0];

			await addMembers([firstPotentialMember.userId]);

			expect(roomApiMock.roomControllerAddMembers).toHaveBeenCalledWith(
				roomId,
				{
					userIds: [firstPotentialMember.userId],
				}
			);
			expect(roomMembers.value).toEqual([
				{
					...firstPotentialMember,
					displayRoomRole: "pages.rooms.members.roomPermissions.admin",
					displaySchoolRole: "common.labels.teacher",
				},
			]);
		});

		it("should throw an error if the API call fails", async () => {
			const { addMembers } = useRoomMembers(roomId);

			const error = new Error("Test error");
			roomApiMock.roomControllerAddMembers.mockRejectedValue(error);

			await addMembers(["id"]);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.members.error.add"
			);
		});
	});

	describe("removeMembers", () => {
		it("should remove a members from the room", async () => {
			const { removeMembers, roomMembers } = useRoomMembers(roomId);

			roomApiMock.roomControllerRemoveMembers.mockResolvedValue(
				mockApiResponse({})
			);

			const membersMock = roomMemberFactory(RoleName.Roomeditor).buildList(3);
			roomMembers.value = membersMock;

			await removeMembers([membersMock[1].userId]);

			expect(roomApiMock.roomControllerRemoveMembers).toHaveBeenCalledWith(
				roomId,
				{
					userIds: [membersMock[1].userId],
				}
			);

			expect(roomMembers.value).not.toContainEqual(membersMock[1]);
		});

		it("should throw an error if the API call fails", async () => {
			const { removeMembers } = useRoomMembers(roomId);

			const error = new Error("Test error");
			roomApiMock.roomControllerRemoveMembers.mockRejectedValue(error);

			await removeMembers(["id"]);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.members.error.remove"
			);
		});
	});

	describe("leaveRoom", () => {
		it("should call the leaveRoom api", async () => {
			const { leaveRoom } = useRoomMembers(roomId);

			roomApiMock.roomControllerLeaveRoom.mockResolvedValue(
				mockApiResponse({})
			);

			await leaveRoom();

			expect(roomApiMock.roomControllerLeaveRoom).toHaveBeenCalledWith(roomId);
		});

		it("should throw an error if the API call fails", async () => {
			const { leaveRoom } = useRoomMembers(roomId);

			const error = new Error("Test error");
			roomApiMock.roomControllerLeaveRoom.mockRejectedValue(error);

			await leaveRoom();

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.members.error.remove"
			);
		});
	});

	describe("updateMembersRole", () => {
		it("should update the role of a member", async () => {
			const { updateMembersRole, roomMembers, selectedIds } =
				useRoomMembers(roomId);

			roomApiMock.roomControllerChangeRolesOfMembers.mockResolvedValue(
				mockApiResponse({})
			);

			const membersMock = roomMemberFactory(RoleName.Roomviewer).buildList(3);
			roomMembers.value = membersMock;

			selectedIds.value = [membersMock[1].userId];

			await updateMembersRole(ChangeRoomRoleBodyParamsRoleNameEnum.Roomadmin);

			expect(
				roomApiMock.roomControllerChangeRolesOfMembers
			).toHaveBeenCalledWith(roomId, {
				userIds: [membersMock[1].userId],
				roleName: RoleName.Roomadmin,
			});

			expect(roomMembers.value[1].roomRoleName).toBe(RoleName.Roomadmin);
			expect(roomMembers.value[1].displayRoomRole).toBe(
				"pages.rooms.members.roomPermissions.admin"
			);
		});

		it("should update the role of a member with 'id' parameter", async () => {
			const { updateMembersRole, roomMembers } = useRoomMembers(roomId);

			roomApiMock.roomControllerChangeRolesOfMembers.mockResolvedValue(
				mockApiResponse({})
			);

			const membersMock = roomMemberFactory(RoleName.Roomviewer).buildList(3);
			roomMembers.value = membersMock;

			await updateMembersRole(
				ChangeRoomRoleBodyParamsRoleNameEnum.Roomadmin,
				membersMock[1].userId
			);

			expect(
				roomApiMock.roomControllerChangeRolesOfMembers
			).toHaveBeenCalledWith(roomId, {
				userIds: [membersMock[1].userId],
				roleName: RoleName.Roomadmin,
			});

			expect(roomMembers.value[1].roomRoleName).toBe(RoleName.Roomadmin);
			expect(roomMembers.value[1].displayRoomRole).toBe(
				"pages.rooms.members.roomPermissions.admin"
			);
		});

		it("should throw an error if the API call fails", async () => {
			const { updateMembersRole } = useRoomMembers(roomId);

			const error = new Error("Test error");
			roomApiMock.roomControllerChangeRolesOfMembers.mockRejectedValue(error);

			await updateMembersRole(ChangeRoomRoleBodyParamsRoleNameEnum.Roomadmin);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.members.error.updateRole"
			);
		});
	});

	describe("changeRoomOwner", () => {
		it("should call the API", async () => {
			const { changeRoomOwner, roomMembers } = useRoomMembers(roomId);

			const membersMock = roomMemberFactory(RoleName.Roomviewer).buildList(3);
			roomMembers.value = membersMock;

			await changeRoomOwner(membersMock[1].userId);

			expect(roomApiMock.roomControllerChangeRoomOwner).toHaveBeenCalledWith(
				roomId,
				{
					userId: membersMock[1].userId,
				}
			);
		});

		it("should swap the ownership in the state", async () => {
			const { changeRoomOwner, roomMembers } = useRoomMembers(roomId);

			const roomViewers = roomMemberFactory(RoleName.Roomviewer).buildList(3);
			const roomOwner = roomMemberFactory(RoleName.Roomowner).build();
			const futureRoomOwner = roomViewers.pop();
			if (futureRoomOwner) {
				roomMembers.value = [roomOwner, futureRoomOwner, ...roomViewers];
			}

			expect(roomOwner.roomRoleName).toBe(RoleName.Roomowner);
			expect(futureRoomOwner?.roomRoleName).toBe(RoleName.Roomviewer);

			await changeRoomOwner(futureRoomOwner?.userId ?? "");

			expect(roomOwner.roomRoleName).toBe(RoleName.Roomadmin);
			expect(futureRoomOwner?.roomRoleName).toBe(RoleName.Roomowner);
		});

		it('should show an error if the "currentOwner" or "memberToBeOwner" is not found', async () => {
			const { changeRoomOwner } = useRoomMembers(roomId);

			const membersMock = roomMemberFactory(RoleName.Roomviewer).buildList(3);
			const futureRoomOwner = membersMock.pop();
			if (futureRoomOwner) {
				roomApiMock.roomControllerChangeRoomOwner.mockResolvedValue(
					mockApiResponse({})
				);
			}

			await changeRoomOwner(futureRoomOwner?.userId ?? "");

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.members.error.updateRole"
			);
		});

		it("should throw an error if the API call fails", async () => {
			const { changeRoomOwner } = useRoomMembers(roomId);

			const error = new Error("Test error");
			roomApiMock.roomControllerChangeRoomOwner.mockRejectedValue(error);

			await changeRoomOwner("test-id");

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.members.error.updateRole"
			);
		});
	});
});
