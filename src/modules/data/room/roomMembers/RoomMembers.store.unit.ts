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
	roomMemberSchoolResponseFactory,
	roomMemberSchoolListResponseFactory,
	schoolFactory,
} from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import {
	RoomMember,
	useRoomDetailsStore,
	useRoomMembersStore,
} from "@data-room";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { useBoardNotifier } from "@util-board";
import { logger } from "@util-logger";
import { AxiosInstance } from "axios";
import { createPinia, setActivePinia } from "pinia";
import { Mock, MockInstance } from "vitest";
import { nextTick } from "vue";
import { useI18n } from "vue-i18n";

vi.mock("vue-i18n");
(useI18n as Mock).mockReturnValue({ t: (key: string) => key });

vi.mock("@util-board/BoardNotifier.composable");
const mockedUseBoardNotifier = vi.mocked(useBoardNotifier);

describe("useRoomMembers", () => {
	let roomApiMock: DeepMocked<serverApi.RoomApiInterface>;
	let schoolApiMock: DeepMocked<serverApi.SchoolApiInterface>;
	let axiosMock: DeepMocked<AxiosInstance>;
	let consoleErrorSpy: MockInstance;
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	const ownSchool = {
		id: "school-id",
		name: "Paul-Gerhardt-Gymnasium",
	};

	beforeEach(() => {
		setActivePinia(createPinia());

		roomApiMock = createMock<serverApi.RoomApiInterface>();
		schoolApiMock = createMock<serverApi.SchoolApiInterface>();
		axiosMock = createMock<AxiosInstance>();
		consoleErrorSpy = vi.spyOn(logger, "error").mockImplementation(vi.fn());

		vi.spyOn(serverApi, "RoomApiFactory").mockReturnValue(roomApiMock);
		vi.spyOn(serverApi, "SchoolApiFactory").mockReturnValue(schoolApiMock);
		initializeAxios(axiosMock);

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

		setupStores({
			schoolsModule: SchoolsModule,
			authModule: AuthModule,
		});

		schoolsModule.setSchool(schoolFactory.build(ownSchool));

		const mockMe = meResponseFactory.build();
		authModule.setMe(mockMe);
	});

	const setup = (members: RoomMember[] = []) => {
		const roomDetailsStore = mockedPiniaStoreTyping(useRoomDetailsStore);
		roomDetailsStore.room = roomFactory.build();

		const roomMembersStore = mockedPiniaStoreTyping(useRoomMembersStore);
		roomMembersStore.roomMembers = members;

		return { roomMembersStore, roomDetailsStore };
	};

	afterEach(() => {
		vi.clearAllMocks();
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
			it("should fetch teacher members and map members with role names", async () => {
				const { roomMembersStore } = setup();

				const membersMock = roomMemberFactory.buildList(3, {
					roomRoleName: RoleName.Roomadmin,
					schoolRoleNames: [RoleName.Teacher],
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
						displaySchoolRole: "common.labels.teacher.neutral",
						isSelectable: true,
					}))
				);
			});

			it("should fetch student members and map members with role names", async () => {
				const { roomMembersStore } = setup();

				const membersMock = roomMemberFactory.buildList(3, {
					roomRoleName: RoleName.Roomviewer,
					schoolRoleNames: [RoleName.Student],
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
						displayRoomRole: "pages.rooms.members.roomPermissions.viewer",
						displaySchoolRole: "common.labels.student.neutral",
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
						displaySchoolRole: "common.labels.teacher.neutral",
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
					schoolRoleNames: [RoleName.Administrator, RoleName.Teacher],
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
						displaySchoolRole: "common.labels.teacher.neutral",
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
		it("should get potential teacher members", async () => {
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
					displaySchoolRole: "common.labels.teacher.neutral",
				}))
			);
		});

		it("should get potential student members", async () => {
			const { roomMembersStore } = setup();

			const schoolStudentList: SchoolUserListResponse = {
				data: [
					{
						firstName: "Marla",
						lastName: "Mathe",
						id: "1",
						schoolName: "Paul-Gerhardt-Gymnasium",
					},
					{
						firstName: "Waldemar",
						lastName: "Wunderlich",
						id: "2",
						schoolName: "Paul-Gerhardt-Gymnasium",
					},
				],
			};
			schoolApiMock.schoolControllerGetStudents.mockResolvedValue(
				mockApiResponse({
					data: schoolStudentList,
				})
			);

			await roomMembersStore.getPotentialMembers(RoleName.Student);

			expect(roomMembersStore.potentialRoomMembers).toEqual(
				schoolStudentList.data.map((user) => ({
					...user,
					userId: user.id,
					fullName: `${user.lastName}, ${user.firstName}`,
					schoolRoleNames: [RoleName.Student],
					schoolName: "Paul-Gerhardt-Gymnasium",
					displaySchoolRole: "common.labels.student.neutral",
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

	describe("isCurrentUserStudent", () => {
		describe("when the current user is a student", () => {
			it("should return true", () => {
				const currentUser = meResponseFactory.build({
					roles: [{ id: "student-id", name: RoleName.Student }],
				});
				authModule.setMe(currentUser);

				const { roomMembersStore } = setup();

				const roomMembers = roomMemberFactory.buildList(2, {
					roomRoleName: RoleName.Roomviewer,
				});

				roomMembers[0].schoolRoleNames = [RoleName.Student];
				roomMembers[0].userId = currentUser.user.id;
				roomMembersStore.roomMembers = [...roomMembers];

				expect(roomMembersStore.isCurrentUserStudent).toBe(true);
			});
		});
		describe("when the current user is not a student", () => {
			it("should return false", () => {
				const currentUser = meResponseFactory.build({
					roles: [{ id: "teacher-id", name: RoleName.Teacher }],
				});
				authModule.setMe(currentUser);

				const { roomMembersStore } = setup();

				const roomMembers = roomMemberFactory.buildList(2, {
					roomRoleName: RoleName.Roomviewer,
				});

				roomMembers[0].schoolRoleNames = [RoleName.Teacher];
				roomMembers[0].userId = currentUser.user.id;
				roomMembersStore.roomMembers = [...roomMembers];

				expect(roomMembersStore.isCurrentUserStudent).toBe(false);
			});
		});
	});

	describe("loadSchoolList", () => {
		it("should get schools", async () => {
			const { roomMembersStore } = setup();
			const schoolList = roomMemberSchoolListResponseFactory.build({
				total: 3,
			});
			schoolApiMock.schoolControllerGetSchoolList.mockResolvedValue(
				mockApiResponse({
					data: schoolList,
				})
			);
			await roomMembersStore.loadSchoolList();

			expect(roomMembersStore.schools).toHaveLength(schoolList.total);
			expect(roomMembersStore.schools[0]).toStrictEqual(ownSchool);
		});

		it("should get schools pagewise if more than 1000 schools", async () => {
			const { roomMembersStore } = setup();

			const totalCount = 3600;
			let skip = 0;
			while (skip < totalCount) {
				const schools = roomMemberSchoolResponseFactory.buildList(
					Math.min(1000, totalCount - skip)
				);

				schoolApiMock.schoolControllerGetSchoolList.mockResolvedValueOnce(
					mockApiResponse({
						data: {
							data: schools,
							total: totalCount,
							skip,
							limit: 1000,
						},
					})
				);
				skip += 1000;
			}

			await roomMembersStore.loadSchoolList();

			expect(roomMembersStore.schools).toHaveLength(totalCount + 1);
			expect(roomMembersStore.schools[0]).toStrictEqual(ownSchool);
			expect(schoolApiMock.schoolControllerGetSchoolList).toHaveBeenCalledTimes(
				4
			);
		});

		it("should throw an error if the API call fails", async () => {
			const { roomMembersStore } = setup();

			const error = new Error("Test error");
			schoolApiMock.schoolControllerGetSchoolList.mockRejectedValue(error);

			await roomMembersStore.loadSchoolList();

			expect(consoleErrorSpy).toHaveBeenCalledWith(error);
		});

		describe("when the current user is a student", () => {
			it("should not fetch the school list", async () => {
				const currentUser = meResponseFactory.build({
					roles: [{ id: "student-id", name: RoleName.Student }],
				});
				authModule.setMe(currentUser);
				const { roomMembersStore } = setup();

				const roomMembers = roomMemberFactory.buildList(2, {
					roomRoleName: RoleName.Roomviewer,
				});

				roomMembers[0].schoolRoleNames = [RoleName.Student];
				roomMembers[0].userId = currentUser.user.id;
				roomMembersStore.roomMembers = [...roomMembers];

				await roomMembersStore.loadSchoolList();

				const schoolList = roomMembersStore.schools;

				expect(
					schoolApiMock.schoolControllerGetSchoolList
				).not.toHaveBeenCalled();
				expect(schoolList).toHaveLength(1);
				expect(schoolList[0]).toStrictEqual(ownSchool);
			});
		});
	});

	describe("addMembers", () => {
		it("should add teachers to the room", async () => {
			const { roomMembersStore, roomDetailsStore } = setup();

			roomApiMock.roomControllerAddMembers.mockResolvedValue(
				mockApiResponse({ data: { roomRoleName: RoleName.Roomadmin } })
			);

			roomMembersStore.potentialRoomMembers = roomMemberFactory.buildList(3, {
				roomRoleName: RoleName.Roomadmin,
				schoolRoleNames: [RoleName.Teacher],
			});
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
					displaySchoolRole: "common.labels.teacher.neutral",
				},
			]);
		});

		it("should add students to the room", async () => {
			const { roomMembersStore, roomDetailsStore } = setup();

			roomApiMock.roomControllerAddMembers.mockResolvedValue(
				mockApiResponse({ data: { roomRoleName: RoleName.Roomviewer } })
			);

			roomMembersStore.potentialRoomMembers = roomMemberFactory.buildList(3, {
				roomRoleName: RoleName.Roomviewer,
				schoolRoleNames: [RoleName.Student],
			});
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
					displayRoomRole: "pages.rooms.members.roomPermissions.viewer",
					displaySchoolRole: "common.labels.student.neutral",
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

	describe("confirmInvitations", () => {
		it("should call the 'updateMembersRole' method with 'Roomviewer' role", async () => {
			const { roomMembersStore, roomDetailsStore } = setup();

			const membersMock = roomMemberFactory.buildList(3, {
				roomRoleName: RoleName.Roomapplicant,
			});
			roomMembersStore.roomMembers = membersMock;

			await roomMembersStore.confirmInvitations([membersMock[0].userId]);

			expect(
				roomApiMock.roomControllerChangeRolesOfMembers
			).toHaveBeenCalledWith(roomDetailsStore.room!.id, {
				userIds: [membersMock[0].userId],
				roleName: ChangeRoomRoleBodyParamsRoleNameEnum.Roomviewer,
			});
		});

		it("should update the role of the member to 'Roomviewer'", async () => {
			const { roomMembersStore } = setup();

			const membersMock = roomMemberFactory.buildList(3, {
				roomRoleName: RoleName.Roomapplicant,
			});
			roomMembersStore.roomMembers = membersMock;

			expect(roomMembersStore.roomMembers[0].displayRoomRole).not.toBe(
				"pages.rooms.members.roomPermissions.viewer"
			);

			await roomMembersStore.confirmInvitations([membersMock[0].userId]);

			expect(roomMembersStore.roomMembers[0].roomRoleName).toBe(
				RoleName.Roomviewer
			);
			expect(roomMembersStore.roomMembers[0].displayRoomRole).toBe(
				"pages.rooms.members.roomPermissions.viewer"
			);
		});

		it("should throw an error if the API call fails", async () => {
			const { roomMembersStore } = setup();

			const error = new Error("Test error");
			roomApiMock.roomControllerChangeRolesOfMembers.mockRejectedValue(error);

			await roomMembersStore.confirmInvitations(["id"]);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.members.error.updateRole"
			);
		});
	});

	describe("rejectInvitations", () => {
		it("should call the 'removeMembers' method", async () => {
			const { roomMembersStore, roomDetailsStore } = setup();

			const membersMock = roomMemberFactory.buildList(3, {
				roomRoleName: RoleName.Roomapplicant,
			});
			roomMembersStore.roomMembers = membersMock;

			await roomMembersStore.rejectInvitations([membersMock[0].userId]);

			expect(roomApiMock.roomControllerRemoveMembers).toHaveBeenCalledWith(
				roomDetailsStore.room!.id,
				{
					userIds: [membersMock[0].userId],
				}
			);
		});

		it("should remove the member from the room members", async () => {
			const { roomMembersStore } = setup();

			const membersMock = roomMemberFactory.buildList(3, {
				roomRoleName: RoleName.Roomapplicant,
			});
			roomMembersStore.roomMembers = membersMock;

			expect(roomMembersStore.roomMembers).toHaveLength(3);

			await roomMembersStore.rejectInvitations([membersMock[0].userId]);

			expect(roomMembersStore.roomMembers).toHaveLength(2);
		});

		it("should throw an error if the API call fails", async () => {
			const { roomMembersStore } = setup();

			const error = new Error("Test error");
			roomApiMock.roomControllerRemoveMembers.mockRejectedValue(error);

			await roomMembersStore.rejectInvitations(["id"]);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.members.error.remove"
			);
		});
	});

	describe("showNotification", () => {
		describe("when confirmation is successful", () => {
			describe("with single action", () => {
				it("should show a success notification", async () => {
					const { roomMembersStore } = setup();

					const membersMock = roomMemberFactory.buildList(3, {
						roomRoleName: RoleName.Roomapplicant,
					});
					roomMembersStore.roomMembers = membersMock;

					await roomMembersStore.confirmInvitations([membersMock[0].userId]);

					expect(mockedBoardNotifierCalls.showSuccess).toHaveBeenCalledWith(
						"pages.rooms.members.confirmationTable.notification.confirm"
					);
				});
			});
			describe("with multiple actions", () => {
				it("should show a success notification with the number of confirmed members", async () => {
					const { roomMembersStore } = setup();

					const membersMock = roomMemberFactory.buildList(3, {
						roomRoleName: RoleName.Roomapplicant,
					});
					roomMembersStore.roomMembers = membersMock;

					await roomMembersStore.confirmInvitations(
						membersMock.map((member) => member.userId)
					);

					expect(mockedBoardNotifierCalls.showSuccess).toHaveBeenCalledWith(
						"pages.rooms.members.confirmationTable.notification.confirm.multiple"
					);
				});
			});
		});

		describe("when rejection is successful", () => {
			describe("with single action", () => {
				it("should show a success notification", async () => {
					const { roomMembersStore } = setup();

					const membersMock = roomMemberFactory.buildList(3, {
						roomRoleName: RoleName.Roomapplicant,
					});
					roomMembersStore.roomMembers = membersMock;

					await roomMembersStore.rejectInvitations([membersMock[0].userId]);

					expect(mockedBoardNotifierCalls.showSuccess).toHaveBeenCalledWith(
						"pages.rooms.members.confirmationTable.notification.reject"
					);
				});
			});
			describe("with multiple actions", () => {
				it("should show a success notification with the number of rejected members", async () => {
					const { roomMembersStore } = setup();

					const membersMock = roomMemberFactory.buildList(3, {
						roomRoleName: RoleName.Roomapplicant,
					});
					roomMembersStore.roomMembers = membersMock;

					await roomMembersStore.rejectInvitations(
						membersMock.map((member) => member.userId)
					);

					expect(mockedBoardNotifierCalls.showSuccess).toHaveBeenCalledWith(
						"pages.rooms.members.confirmationTable.notification.reject.multiple"
					);
				});
			});
		});
	});

	describe("resetStore", () => {
		it("should reset the store", () => {
			const { roomMembersStore } = setup();

			const membersMock = roomMemberFactory.build({
				roomRoleName: RoleName.Roomeditor,
			});
			roomMembersStore.roomMembers = [membersMock];
			expect(roomMembersStore.roomMembers).toHaveLength(1);

			roomMembersStore.resetStore();
			expect(roomMembersStore.roomMembers).toHaveLength(0);
			expect(roomMembersStore.potentialRoomMembers).toHaveLength(0);
			expect(roomMembersStore.schools).toHaveLength(1);
			expect(roomMembersStore.schools[0]).toStrictEqual(ownSchool);
			expect(roomMembersStore.selectedIds).toHaveLength(0);
			expect(roomMembersStore.isLoading).toBe(false);
		});
	});

	describe("resetPotentialMembers", () => {
		it("should reset the potential members", async () => {
			const { roomMembersStore } = setup();

			const schoolStudentList: SchoolUserListResponse = {
				data: [
					{
						firstName: "Marla",
						lastName: "Mathe",
						id: "1",
						schoolName: "Paul-Gerhardt-Gymnasium",
					},
				],
			};
			schoolApiMock.schoolControllerGetStudents.mockResolvedValue(
				mockApiResponse({
					data: schoolStudentList,
				})
			);

			await roomMembersStore.getPotentialMembers(RoleName.Student);
			expect(roomMembersStore.potentialRoomMembers).toHaveLength(1);

			roomMembersStore.resetPotentialMembers();
			expect(roomMembersStore.potentialRoomMembers).toHaveLength(0);
		});
	});

	describe("isRoomOwner", () => {
		describe("when the user is the room owner", () => {
			it("should return true", () => {
				const { roomMembersStore } = setup();
				const roomOwner = roomMemberFactory.build({
					roomRoleName: RoleName.Roomowner,
				});
				roomMembersStore.roomMembers = [roomOwner];

				expect(roomMembersStore.isRoomOwner(roomOwner.userId)).toBe(true);
			});
		});

		describe("when the user is not the room owner", () => {
			it("should return false", () => {
				const { roomMembersStore } = setup();
				const roomViewer = roomMemberFactory.build({
					roomRoleName: RoleName.Roomviewer,
				});
				roomMembersStore.roomMembers = [roomViewer];

				expect(roomMembersStore.isRoomOwner(roomViewer.userId)).toBe(false);
			});
		});

		describe("when the user is not in the room", () => {
			it("should return false", () => {
				const { roomMembersStore } = setup();

				expect(roomMembersStore.isRoomOwner("another-user-id")).toBe(false);
			});
		});
	});

	describe("getMemberById", () => {
		describe("when the member is in the room", () => {
			it("should return the member with the given id", () => {
				const members = roomMemberFactory.buildList(3);
				const { roomMembersStore } = setup(members);
				const firstMember = members.at(0);

				const member = roomMembersStore.getMemberById(firstMember!.userId);

				expect(member).toEqual(expect.objectContaining(firstMember));
			});
		});

		describe("when the member is not in the room", () => {
			it("should return undefined", () => {
				const { roomMembersStore } = setup();

				const member = roomMembersStore.getMemberById("non-existing-id");

				expect(member).toBeUndefined();
			});
		});
	});

	describe("getMemberFullName", () => {
		it("should return the full name of the member", async () => {
			const member = roomMemberFactory.build({
				roomRoleName: RoleName.Roomadmin,
			});
			const { roomMembersStore } = setup([member]);

			const result = roomMembersStore.getMemberFullName(member.userId);

			expect(result).toBe(`${member.firstName} ${member.lastName}`);
		});
	});

	describe("roomMembers computed property", () => {
		it("should split roomMembers into 'roomAplicants' and 'roomMembersWithoutApplicants' based on roomRoleName", async () => {
			const { roomMembersStore } = setup();

			const roomApplicants = roomMemberFactory.buildList(3, {
				roomRoleName: RoleName.Roomapplicant,
			});
			const roomMembersWithoutApplicants = roomMemberFactory.buildList(2, {
				roomRoleName: RoleName.Roomviewer,
			});

			roomMembersStore.roomMembers = [
				...roomApplicants,
				...roomMembersWithoutApplicants,
			];

			await nextTick();

			expect(roomMembersStore.roomApplicants).toEqual(roomApplicants);
			expect(roomMembersStore.roomApplicants.length).toEqual(3);
			expect(roomMembersStore.roomMembersWithoutApplicants).toEqual(
				roomMembersWithoutApplicants
			);
			expect(roomMembersStore.roomMembersWithoutApplicants.length).toEqual(2);
			expect(roomMembersStore.roomMembers.length).toEqual(5);
		});
	});
});
