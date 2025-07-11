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

	const fetchMembers = async () => {
		try {
			isLoading.value = true;
			const { data } = (await roomApi.roomControllerGetMembers(getRoomId()))
				.data;
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
		schools.value = [];
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
		isLoading,
		roomMembers,
		roomMembersWithoutApplicants,
		roomApplicants,
		potentialRoomMembers,
		selectedIds,
		schools,
	};
});
