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
	const potentialRoomMembers: Ref<RoomMember[]> = ref([]);
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
		} catch (error) {
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
						roomRoleName: RoleName.Roomadmin,
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
		} catch (error) {
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
			await roomApi.roomControllerAddMembers(roomId, { userIds });
			roomMembers.value.push(
				...newMembers.map((member) => ({
					...member,
					displayRoomRole: roomRole[RoleName.Roomviewer],
					displaySchoolRole: schoolRole[member.schoolRoleName],
				}))
			);
		} catch (error) {
			showFailure(t("pages.rooms.members.error.add"));
		}
	};

	const removeMembers = async () => {
		try {
			await roomApi.roomControllerRemoveMembers(roomId, {
				userIds: selectedIds.value,
			});
			roomMembers.value = roomMembers.value.filter(
				(member) => !selectedIds.value.includes(member.userId)
			);
			selectedIds.value = [];
		} catch (error) {
			showFailure(t("pages.rooms.members.error.remove"));
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
		} catch (error) {
			showFailure(t("pages.rooms.members.error.updateRole"));
		}
	};

	return {
		addMembers,
		fetchMembers,
		getPotentialMembers,
		getSchools,
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
