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
	const { showFailure } = useBoardNotifier();

	const { room } = storeToRefs(useRoomDetailsStore());
	const roomId = computed(() => room.value?.id);

	const roomMembers: Ref<RoomMember[]> = ref([]);
	const potentialRoomMembers: Ref<Omit<RoomMember, "roomRoleName">[]> = ref([]);

	const isLoading = ref<boolean>(false);
	const schools: Ref<SchoolForExternalInviteResponse[]> = ref([]);
	const ownSchool = {
		id: schoolsModule.getSchool.id,
		name: schoolsModule.getSchool.name,
	};
	const currentUserId = authModule.getUser?.id ?? "";
	const currentUser = computed(() => {
		return roomMembers.value?.find(
			(member) => member.userId === currentUserId
		) as RoomMember;
	});
	const selectedIds = ref<string[]>([]);

	const roomRole: Record<string, string> = {
		[RoleName.Roomowner]: t("pages.rooms.members.roomPermissions.owner"),
		[RoleName.Roomadmin]: t("pages.rooms.members.roomPermissions.admin"),
		[RoleName.Roomeditor]: t("pages.rooms.members.roomPermissions.editor"),
		[RoleName.Roomviewer]: t("pages.rooms.members.roomPermissions.viewer"),
	};

	const schoolRoleMap: Record<string, string> = {
		[RoleName.Student]: t("pages.roooms.members.add.role.student"),
		[RoleName.Teacher]: t("common.labels.teacher"),
	};

	const roomApi = RoomApiFactory(undefined, "/v3", $axios);
	const schoolApi = SchoolApiFactory(undefined, "/v3", $axios);

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
		try {
			const endpointMap = {
				[RoleName.Teacher]: schoolApi.schoolControllerGetTeachers(schoolId),
				[RoleName.Student]: schoolApi.schoolControllerGetStudents(schoolId),
			};

			const result = (
				await endpointMap[schoolRoleName as keyof typeof endpointMap]
			).data;

			potentialRoomMembers.value = result.data
				.map((user) => {
					return {
						...user,
						userId: user.id,
						fullName: `${user.lastName}, ${user.firstName}`,
						schoolRoleNames: [schoolRoleName],
						displayRoomRole:
							schoolRoleName === RoleName.Teacher
								? roomRole[RoleName.Roomadmin]
								: roomRole[RoleName.Roomviewer],
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

	const getSchools = async () => {
		try {
			const response =
				await schoolApi.schoolControllerGetSchoolListForExternalInvite();

			schools.value = response.data.filter(
				(school) => school.id !== ownSchool.id
			);
			schools.value.unshift(ownSchool);
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

	const updateMemberRole = (member: RoomMember, roleName: RoleName) => {
		member.roomRoleName = roleName;
		member.displayRoomRole = roomRole[roleName];
		member.isSelectable = false;
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
		changeRoomOwner,
		fetchMembers,
		resetStore,
		getPotentialMembers,
		getSchools,
		leaveRoom,
		removeMembers,
		updateMembersRole,
		currentUser,
		isLoading,
		roomMembers,
		potentialRoomMembers,
		selectedIds,
		schools,
	};
});
