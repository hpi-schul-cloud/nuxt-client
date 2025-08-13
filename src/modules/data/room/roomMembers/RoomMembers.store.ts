import { computed, Ref, ref } from "vue";
import { RoomMember } from "./types";
import {
	RoleName,
	RoomApiFactory,
	SchoolApiFactory,
	RoomMemberResponse,
	SchoolForExternalInviteResponse,
	ChangeRoomRoleBodyParamsRoleNameEnum,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { useI18n } from "vue-i18n";
import { useBoardNotifier } from "@util-board";
import { schoolsModule } from "@/store";
import { authModule } from "@/store/store-accessor";
import { logger } from "@util-logger";
import { defineStore, storeToRefs } from "pinia";
import { useRoomDetailsStore } from "@data-room";

export const useRoomMembersStore = defineStore("roomMembersStore", () => {
	const { t } = useI18n();
	const { showFailure, showSuccess } = useBoardNotifier();

	const { room } = storeToRefs(useRoomDetailsStore());
	const roomId = computed(() => room.value?.id);

	const roomMembers: Ref<RoomMember[]> = ref([]);
	const confirmationList: Ref<Record<string, unknown>[]> = ref([]);
	const potentialRoomMembers: Ref<
		Omit<RoomMember, "roomRoleName" | "displayRoomRole">[]
	> = ref([]);

	const roomMembersWithoutApplicants = computed(() => {
		return roomMembers.value.filter(
			(member) => member.roomRoleName !== RoleName.Roomapplicant
		);
	});

	const roomApplicants = computed(() => {
		return roomMembers.value.filter(
			(member) => member.roomRoleName === RoleName.Roomapplicant
		);
	});

	const roomMembersForAdmins = computed(() => {
		return roomMembersWithoutApplicants.value.map((member) => {
			const isExternal = member.schoolName !== ownSchool.name;
			if (!isExternal) return member;
			const anonymizedName = "(anonymisiert)";

			return {
				...member,
				isSelectable: !isExternal,
				firstName: anonymizedName,
				lastName: anonymizedName,
				fullName: anonymizedName,
			};
		});
	});

	const isLoading = ref<boolean>(false);
	const ownSchool = {
		id: schoolsModule.getSchool.id,
		name: schoolsModule.getSchool.name,
	};
	const schools: Ref<SchoolForExternalInviteResponse[]> = ref([ownSchool]);
	const currentUserId = authModule.getUser?.id ?? "";
	const selectedIds = ref<string[]>([]);
	const confirmationSelectedIds = ref<string[]>([]);

	const roomRole: Record<string, string> = {
		[RoleName.Roomowner]: t("pages.rooms.members.roomPermissions.owner"),
		[RoleName.Roomadmin]: t("pages.rooms.members.roomPermissions.admin"),
		[RoleName.Roomeditor]: t("pages.rooms.members.roomPermissions.editor"),
		[RoleName.Roomviewer]: t("pages.rooms.members.roomPermissions.viewer"),
	};

	const schoolRoleMap: Record<string, string> = {
		[RoleName.Teacher]: t("common.labels.teacher.neutral"),
		[RoleName.Student]: t("common.labels.student.neutral"),
	};

	const roomApi = RoomApiFactory(undefined, "/v3", $axios);
	const schoolApi = SchoolApiFactory(undefined, "/v3", $axios);

	const isRoomOwner = (userId: string) => {
		const member = roomMembers.value.find((member) => member.userId === userId);
		if (!member) {
			return false;
		}
		return member.roomRoleName === RoleName.Roomowner;
	};

	const getRoomId = () => {
		if (!roomId.value) {
			throw new Error("RoomDetailStore is not initialized");
		}
		return roomId.value;
	};

	const fetchMembers = async (roomId?: string) => {
		if (roomId) {
			roomMembers.value = [
				{
					userId: "0000d224816abba584714c9c",
					firstName: "Marla",
					lastName: "Mathe",
					roomRoleName: RoleName.Roomviewer,
					schoolRoleNames: [RoleName.Student],
					schoolName: "Some other school",
					fullName: "Marla Mathe",
					isSelectable: true,
					displayRoomRole: roomRole[RoleName.Roomviewer],
					displaySchoolRole: schoolRoleMap[RoleName.Student],
				},
				{
					userId: "0000d231816abba584714c9e",
					firstName: "Cord",
					lastName: "Carl",
					roomRoleName: RoleName.Roomowner,
					schoolRoleNames: [RoleName.Teacher],
					schoolName: "Paul-Gerhardt-Gymnasium",
					fullName: "Cord Carl",
					isSelectable: false,
					displayRoomRole: roomRole[RoleName.Roomowner],
					displaySchoolRole: schoolRoleMap[RoleName.Teacher],
				},
				{
					userId: "58b40278dac20e0645353e3a",
					firstName: "Waldemar",
					lastName: "Wunderlich",
					roomRoleName: RoleName.Roomviewer,
					schoolRoleNames: [RoleName.Student],
					schoolName: "Paul-Gerhardt-Gymnasium",
					fullName: "Waldemar Wunderlich",
					isSelectable: true,
					displayRoomRole: roomRole[RoleName.Roomviewer],
					displaySchoolRole: schoolRoleMap[RoleName.Student],
				},
				{
					userId: "63ce4f5610087350c4a8fbb2",
					firstName: "Vera",
					lastName: "Vertretung",
					roomRoleName: RoleName.Roomviewer,
					schoolRoleNames: [RoleName.Teacher],
					schoolName: "Some other school",
					fullName: "Vera Vertretung",
					isSelectable: true,
					displayRoomRole: roomRole[RoleName.Roomviewer],
					displaySchoolRole: schoolRoleMap[RoleName.Teacher],
				},
				{
					userId: "6899b422698b58bec701eca4",
					firstName: "Vera",
					lastName: "Vertretung",
					roomRoleName: RoleName.Roomviewer,
					schoolRoleNames: [RoleName.Teacher],
					schoolName: "Paul-Gerhardt-Gymnasium",
					fullName: "Vera Vertretung",
					isSelectable: true,
					displayRoomRole: roomRole[RoleName.Roomviewer],
					displaySchoolRole: schoolRoleMap[RoleName.Teacher],
				},
				{
					userId: "6899b426698b58bec701eca5",
					firstName: "Vera",
					lastName: "Vertretung",
					roomRoleName: RoleName.Roomviewer,
					schoolRoleNames: [RoleName.Teacher],
					schoolName: "Paul-Gerhardt-Gymnasium",
					fullName: "Vera Vertretung",
					isSelectable: true,
					displayRoomRole: roomRole[RoleName.Roomviewer],
					displaySchoolRole: schoolRoleMap[RoleName.Teacher],
				},
				{
					userId: "6899b428698b58bec701eca6",
					firstName: "Vera",
					lastName: "Vertretung",
					roomRoleName: RoleName.Roomviewer,
					schoolRoleNames: [RoleName.Teacher],
					schoolName: "Some other school",
					fullName: "Vera Vertretung",
					isSelectable: true,
					displayRoomRole: roomRole[RoleName.Roomviewer],
					displaySchoolRole: schoolRoleMap[RoleName.Teacher],
				},
				{
					userId: "6899b42b698b58bec701eca7",
					firstName: "Vera",
					lastName: "Vertretung",
					roomRoleName: RoleName.Roomviewer,
					schoolRoleNames: [RoleName.Teacher],
					schoolName: "Paul-Gerhardt-Gymnasium",
					fullName: "Vera Vertretung",
					isSelectable: true,
					displayRoomRole: roomRole[RoleName.Roomviewer],
					displaySchoolRole: schoolRoleMap[RoleName.Teacher],
				},
				{
					userId: "6899b42e698b58bec701eca8",
					firstName: "Vera",
					lastName: "Vertretung",
					roomRoleName: RoleName.Roomviewer,
					schoolRoleNames: [RoleName.Teacher],
					schoolName: "Paul-Gerhardt-Gymnasium",
					fullName: "Vera Vertretung",
					isSelectable: true,
					displayRoomRole: roomRole[RoleName.Roomviewer],
					displaySchoolRole: schoolRoleMap[RoleName.Teacher],
				},
				{
					userId: "6899b431698b58bec701eca9",
					firstName: "Vera",
					lastName: "Vertretung",
					roomRoleName: RoleName.Roomviewer,
					schoolRoleNames: [RoleName.Teacher],
					schoolName: "Paul-Gerhardt-Gymnasium",
					fullName: "Vera Vertretung",
					isSelectable: true,
					displayRoomRole: roomRole[RoleName.Roomviewer],
					displaySchoolRole: schoolRoleMap[RoleName.Teacher],
				},
				{
					userId: "6899b435698b58bec701ecaa",
					firstName: "Vera",
					lastName: "Vertretung",
					roomRoleName: RoleName.Roomviewer,
					schoolRoleNames: [RoleName.Teacher],
					schoolName: "Paul-Gerhardt-Gymnasium",
					fullName: "Vera Vertretung",
					isSelectable: true,
					displayRoomRole: roomRole[RoleName.Roomviewer],
					displaySchoolRole: schoolRoleMap[RoleName.Teacher],
				},
				{
					userId: "6899b456698b58bec701ecab",
					firstName: "Vera",
					lastName: "Vertretung",
					roomRoleName: RoleName.Roomviewer,
					schoolRoleNames: [RoleName.Teacher],
					schoolName: "Paul-Gerhardt-Gymnasium",
					fullName: "Vera Vertretung",
					isSelectable: true,
					displayRoomRole: roomRole[RoleName.Roomviewer],
					displaySchoolRole: schoolRoleMap[RoleName.Teacher],
				},
				{
					userId: "6899b459698b58bec701ecac",
					firstName: "Vera",
					lastName: "Vertretung",
					roomRoleName: RoleName.Roomviewer,
					schoolRoleNames: [RoleName.Teacher],
					schoolName: "Paul-Gerhardt-Gymnasium",
					fullName: "Vera Vertretung",
					isSelectable: true,
					displayRoomRole: roomRole[RoleName.Roomviewer],
					displaySchoolRole: schoolRoleMap[RoleName.Teacher],
				},
				{
					userId: "6899b45c698b58bec701ecad",
					firstName: "Vera",
					lastName: "Vertretung",
					roomRoleName: RoleName.Roomviewer,
					schoolRoleNames: [RoleName.Teacher],
					schoolName: "Paul-Gerhardt-Gymnasium",
					fullName: "Vera Vertretung",
					isSelectable: true,
					displayRoomRole: roomRole[RoleName.Roomviewer],
					displaySchoolRole: schoolRoleMap[RoleName.Teacher],
				},
				{
					userId: "6899b45e698b58bec701ecae",
					firstName: "Vera",
					lastName: "Vertretung",
					roomRoleName: RoleName.Roomviewer,
					schoolRoleNames: [RoleName.Teacher],
					schoolName: "Paul-Gerhardt-Gymnasium",
					fullName: "Vera Vertretung",
					isSelectable: true,
					displayRoomRole: roomRole[RoleName.Roomviewer],
					displaySchoolRole: schoolRoleMap[RoleName.Teacher],
				},
			];
			return;
		}
		try {
			isLoading.value = true;
			const { data } = (
				await roomApi.roomControllerGetMembers(roomId ?? getRoomId())
			).data;
			roomMembers.value = data.map((member: RoomMemberResponse) => {
				return {
					...member,
					fullName: `${member.firstName} ${member.lastName}`,
					isSelectable: !(
						member.userId === currentUserId ||
						member.roomRoleName === RoleName.Roomowner
					),
					displayRoomRole: roomRole[member.roomRoleName],
					displaySchoolRole: getSchoolRoleName(member.schoolRoleNames),
				};
			});
			isLoading.value = false;
		} catch {
			showFailure(t("pages.rooms.members.error.load"));
			isLoading.value = false;
		}
	};

	const getSchoolRoleName = (schoolRoleNames: RoleName[]) => {
		const isAdmin = schoolRoleNames.includes(RoleName.Administrator);
		const isTeacher = schoolRoleNames.includes(RoleName.Teacher);
		if (isAdmin || isTeacher) {
			return schoolRoleMap[RoleName.Teacher];
		} else {
			return schoolRoleMap[RoleName.Student];
		}
	};

	const getPotentialMembers = async (
		schoolRoleName: RoleName,
		schoolId: string = ownSchool.id
	) => {
		if (schoolId === null) return;

		try {
			const endpointMap = {
				[RoleName.Teacher]: () =>
					schoolApi.schoolControllerGetTeachers(schoolId),
				[RoleName.Student]: () =>
					schoolApi.schoolControllerGetStudents(schoolId),
			};

			const result = (
				await endpointMap[schoolRoleName as keyof typeof endpointMap]()
			).data;

			potentialRoomMembers.value = result.data
				.map((user) => {
					return {
						...user,
						userId: user.id,
						fullName: `${user.lastName}, ${user.firstName}`,
						schoolRoleNames: [schoolRoleName],
						displaySchoolRole: schoolRoleMap[schoolRoleName],
					};
				})
				.filter((user) => {
					return (
						user.schoolRoleNames.includes(schoolRoleName) &&
						!roomMembers.value.some((member) => member.userId === user.id)
					);
				})
				.sort((a, b) => a.fullName.localeCompare(b.fullName));
		} catch {
			showFailure(t("pages.rooms.members.error.load"));
		}
	};

	const getMemberById = (userId: string) => {
		return roomMembers.value.find((member) => member.userId === userId);
	};

	const getMemberFullName = (userId = "") => {
		const member = getMemberById(userId);
		if (!member) {
			return "";
		}
		return member.fullName;
	};

	const isCurrentUserStudent = computed(() => {
		const member = roomMembers.value.find(
			(member) => member.userId === currentUserId
		);

		return member?.schoolRoleNames.includes(RoleName.Student);
	});

	const loadSchoolList = async () => {
		if (isCurrentUserStudent.value) {
			schools.value = [ownSchool];
			return;
		}
		const areSchoolsLoaded = schools.value.length > 1;
		if (!areSchoolsLoaded) {
			await loadSchoolListPage();
		}
	};

	const loadSchoolListPage = async (skip = 0, limit = 1000) => {
		try {
			const response = await schoolApi.schoolControllerGetSchoolList(
				skip,
				limit
			);
			if (response.data.data.length === 0) {
				return;
			}
			const additionalSchools = response.data.data.filter(
				(school) => school.id !== ownSchool.id
			);
			schools.value = [...schools.value, ...additionalSchools];
			if (schools.value.length < response.data.total) {
				await loadSchoolListPage(skip + limit, limit);
			}
		} catch (error) {
			logger.error(error);
		}
	};

	const addMembers = async (userIds: string[]) => {
		const newMembers = potentialRoomMembers.value.filter((member) =>
			userIds.includes(member.userId)
		);

		try {
			const { roomRoleName } = (
				await roomApi.roomControllerAddMembers(getRoomId(), {
					userIds,
				})
			).data;
			roomMembers.value.push(
				...newMembers.map((member) => ({
					...member,
					fullName: `${member.firstName} ${member.lastName}`,
					roomRoleName: roomRoleName as RoleName,
					displayRoomRole: roomRole[roomRoleName],
					displaySchoolRole: getSchoolRoleName(member.schoolRoleNames),
				}))
			);
		} catch {
			showFailure(t("pages.rooms.members.error.add"));
		}
	};

	const removeMembers = async (userIds: string[]) => {
		try {
			await roomApi.roomControllerRemoveMembers(getRoomId(), {
				userIds,
			});
			roomMembers.value = roomMembers.value.filter(
				(member) => !userIds.includes(member.userId)
			);
			selectedIds.value = [];
		} catch {
			showFailure(t("pages.rooms.members.error.remove"));
		}
	};

	const leaveRoom = async () => {
		isLoading.value = true;
		try {
			await roomApi.roomControllerLeaveRoom(getRoomId());
		} catch {
			showFailure(t("pages.rooms.members.error.remove"));
		} finally {
			isLoading.value = false;
		}
	};

	const updateMembersRole = async (
		roleName: ChangeRoomRoleBodyParamsRoleNameEnum,
		id?: string
	) => {
		try {
			await roomApi.roomControllerChangeRolesOfMembers(getRoomId(), {
				userIds: id ? [id] : selectedIds.value,
				roleName,
			});

			if (id) {
				const member = roomMembers.value.find((member) => member.userId === id);
				if (member) {
					member.roomRoleName = roleName as unknown as RoleName;
					member.displayRoomRole = roomRole[roleName];
				}
				return;
			}

			selectedIds.value.forEach((id) => {
				const member = roomMembers.value.find((member) => member.userId === id);
				if (member) {
					member.roomRoleName = roleName as unknown as RoleName;
					member.displayRoomRole = roomRole[roleName];
				}
			});
		} catch {
			showFailure(t("pages.rooms.members.error.updateRole"));
		}
	};

	const changeRoomOwner = async (userId: string) => {
		try {
			await roomApi.roomControllerChangeRoomOwner(getRoomId(), {
				userId,
			});
			setRoomOwner(userId);
		} catch {
			showFailure(t("pages.rooms.members.error.updateRole"));
		}
	};

	const setRoomOwner = async (userId: string) => {
		const currentOwner = roomMembers.value.find(
			(member) => member.roomRoleName === RoleName.Roomowner
		);
		const memberToBeOwner = roomMembers.value.find(
			(member) => member.userId === userId
		);
		if (!currentOwner || !memberToBeOwner) {
			showFailure(t("pages.rooms.members.error.updateRole"));
			return;
		}

		updateMemberRole(memberToBeOwner, RoleName.Roomowner);
		updateMemberRole(currentOwner, RoleName.Roomadmin);
	};

	const confirmInvitations = async (ids: string[]) => {
		try {
			await roomApi.roomControllerChangeRolesOfMembers(getRoomId(), {
				userIds: ids,
				roleName: ChangeRoomRoleBodyParamsRoleNameEnum.Roomviewer,
			});

			showNotification(ids, "confirm");

			roomMembers.value
				.filter((member) => {
					return ids.includes(member.userId);
				})
				.forEach((member) => {
					updateMemberRole(member, RoleName.Roomviewer, true);
				});
		} catch {
			showFailure(t("pages.rooms.members.error.updateRole"));
		}

		confirmationSelectedIds.value = [];
	};

	const rejectInvitations = async (ids: string[]) => {
		try {
			await roomApi.roomControllerRemoveMembers(getRoomId(), {
				userIds: ids,
			});

			showNotification(ids, "reject");

			roomMembers.value = roomMembers.value.filter((member) => {
				return !ids.includes(member.userId);
			});
		} catch {
			showFailure(t("pages.rooms.members.error.remove"));
		}

		confirmationSelectedIds.value = [];
	};

	const showNotification = (
		ids: string[],
		actionType: "confirm" | "reject"
	) => {
		const successMessage =
			ids.length > 1
				? t(
						`pages.rooms.members.confirmationTable.notification.${actionType}.multiple`
					)
				: t(
						`pages.rooms.members.confirmationTable.notification.${actionType}`,
						{
							fullName: getMemberFullName(ids[0]),
						}
					);
		showSuccess(successMessage);
	};

	const updateMemberRole = (
		member: RoomMember,
		roleName: RoleName,
		isSelectable = false
	) => {
		member.roomRoleName = roleName;
		member.displayRoomRole = roomRole[roleName];
		member.isSelectable = isSelectable;
	};

	const resetPotentialMembers = () => {
		potentialRoomMembers.value = [];
	};

	const resetStore = () => {
		isLoading.value = false;
		roomMembers.value = [];
		schools.value = [ownSchool];
		potentialRoomMembers.value = [];
		selectedIds.value = [];
	};

	return {
		addMembers,
		isRoomOwner,
		changeRoomOwner,
		confirmInvitations,
		fetchMembers,
		resetPotentialMembers,
		resetStore,
		getPotentialMembers,
		loadSchoolList,
		getMemberById,
		getMemberFullName,
		leaveRoom,
		rejectInvitations,
		removeMembers,
		updateMembersRole,
		confirmationList,
		confirmationSelectedIds,
		isCurrentUserStudent,
		isLoading,
		roomMembers,
		roomMembersForAdmins,
		roomMembersWithoutApplicants,
		roomApplicants,
		potentialRoomMembers,
		selectedIds,
		schools,
	};
});
