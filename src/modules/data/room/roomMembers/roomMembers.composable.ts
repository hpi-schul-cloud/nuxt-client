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

export const useRoomMembers = (roomId: string) => {
	const roomMembers: Ref<RoomMember[]> = ref([]);
	const potentialRoomMembers: Ref<Omit<RoomMember, "roomRoleName">[]> = ref([]);

	const schools: Ref<SchoolForExternalInviteResponse[]> = ref([]);
	const isLoading = ref(false);
	const { t } = useI18n();
	const { showFailure } = useBoardNotifier();
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

	const schoolRole: Record<string, string> = {
		[RoleName.Teacher]: t("common.labels.teacher"),
	};

	const roomApi = RoomApiFactory(undefined, "/v3", $axios);
	const schoolApi = SchoolApiFactory(undefined, "/v3", $axios);

	const fetchMembers = async () => {
		try {
			isLoading.value = true;
			const { data } = (await roomApi.roomControllerGetMembers(roomId)).data;

			roomMembers.value = data.map((member: RoomMemberResponse) => {
				return {
					...member,
					isSelectable: !(
						member.userId === currentUserId ||
						member.roomRoleName === RoleName.Roomowner
					),
					displayRoomRole: roomRole[member.roomRoleName],
					displaySchoolRole: schoolRole[member.schoolRoleName],
				};
			});
			isLoading.value = false;
		} catch {
			showFailure(t("pages.rooms.members.error.load"));
			isLoading.value = false;
		}
	};

	const getPotentialMembers = async (
		schoolRoleName: RoleName,
		schoolId: string = ownSchool.id
	) => {
		try {
			const result = (await schoolApi.schoolControllerGetTeachers(schoolId))
				.data;

			potentialRoomMembers.value = result.data
				.map((user) => {
					return {
						...user,
						userId: user.id,
						fullName: `${user.lastName}, ${user.firstName}`,
						schoolRoleName: RoleName.Teacher,
						displayRoomRole: roomRole[RoleName.Roomadmin],
						displaySchoolRole: schoolRole[RoleName.Teacher],
					};
				})
				.filter((user) => {
					return (
						user.schoolRoleName === schoolRoleName &&
						!roomMembers.value.some((member) => member.userId === user.id)
					);
				});
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
			console.error(error);
		}
	};

	const addMembers = async (userIds: string[]) => {
		const newMembers = potentialRoomMembers.value.filter((member) =>
			userIds.includes(member.userId)
		);

		try {
			const { roomRoleName } = (
				await roomApi.roomControllerAddMembers(roomId, { userIds })
			).data;
			roomMembers.value.push(
				...newMembers.map((member) => ({
					...member,
					roomRoleName,
					displayRoomRole: roomRole[roomRoleName],
					displaySchoolRole: schoolRole[member.schoolRoleName],
				}))
			);
		} catch {
			showFailure(t("pages.rooms.members.error.add"));
		}
	};

	const removeMembers = async (userIds: string[]) => {
		try {
			await roomApi.roomControllerRemoveMembers(roomId, {
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
			await roomApi.roomControllerLeaveRoom(roomId);
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
			await roomApi.roomControllerChangeRolesOfMembers(roomId, {
				userIds: id ? [id] : selectedIds.value,
				roleName,
			});

			if (id) {
				const member = roomMembers.value.find((member) => member.userId === id);
				if (member) {
					member.roomRoleName = roleName;
					member.displayRoomRole = roomRole[roleName];
				}
				return;
			}

			selectedIds.value.forEach((id) => {
				const member = roomMembers.value.find((member) => member.userId === id);
				if (member) {
					member.roomRoleName = roleName;
					member.displayRoomRole = roomRole[roleName];
				}
			});
		} catch {
			showFailure(t("pages.rooms.members.error.updateRole"));
		}
	};

	const changeRoomOwner = async (userId: string) => {
		try {
			await roomApi.roomControllerChangeRoomOwner(roomId, { userId });
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

	return {
		addMembers,
		changeRoomOwner,
		fetchMembers,
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
};
