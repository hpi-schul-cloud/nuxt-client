import { Ref, ref } from "vue";
import { RoomMember } from "./types";
import {
	RoleName,
	RoomApiFactory,
	SchoolApiFactory,
	RoomMemberResponse,
	SchoolForExternalInviteResponse,
	UserIdAndRole,
	UserIdAndRoleRoleNameEnum,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { useI18n } from "vue-i18n";
import { useBoardNotifier } from "@util-board";
import { schoolsModule } from "@/store";

export const useRoomMembers = (roomId: string) => {
	const roomMembers: Ref<RoomMemberResponse[]> = ref([]);
	const potentialRoomMembers: Ref<RoomMember[]> = ref([]);
	const schools: Ref<SchoolForExternalInviteResponse[]> = ref([]);
	const isLoading = ref(false);
	const { t } = useI18n();
	const { showFailure } = useBoardNotifier();
	const ownSchool = {
		id: schoolsModule.getSchool.id,
		name: schoolsModule.getSchool.name,
	};

	const userRoles: Record<string, string> = {
		[RoleName.RoomEditor]: t("common.labels.teacher"),
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
					displayRoleName: userRoles[member.roleName],
				};
			});
			isLoading.value = false;
		} catch (error) {
			showFailure(t("pages.rooms.members.error.load"));
			isLoading.value = false;
		}
	};

	const getPotentialMembers = async (
		payload: {
			role: RoleName;
			schoolId?: string;
		} = { role: RoleName.RoomEditor, schoolId: ownSchool.id }
	) => {
		try {
			const result = (
				await schoolApi.schoolControllerGetTeachers(
					payload.schoolId ?? ownSchool.id
				)
			).data;

			potentialRoomMembers.value = result.data
				.map((user) => {
					return {
						...user,
						userId: user.id,
						fullName: `${user.lastName}, ${user.firstName}`,
						roleName: RoleName.RoomEditor,
					};
				})
				.filter((user) => {
					return (
						user.roleName === payload.role &&
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

		const userIdsAndRoles: UserIdAndRole[] = newMembers.map((member) => ({
			userId: member.userId,
			roleName: UserIdAndRoleRoleNameEnum.Editor,
		}));

		try {
			await roomApi.roomControllerAddMembers(roomId, {
				userIdsAndRoles,
			});
			roomMembers.value.push(
				...newMembers.map((member) => ({
					...member,
					displayRoleName: userRoles[member.roleName],
				}))
			);
		} catch (error) {
			showFailure(t("pages.rooms.members.error.add"));
		}
	};

	const removeMembers = async (userIds: string[]) => {
		try {
			await roomApi.roomControllerRemoveMembers(roomId, { userIds });
			roomMembers.value = roomMembers.value.filter(
				(member) => !userIds.includes(member.userId)
			);
		} catch (error) {
			showFailure(t("pages.rooms.members.error.remove"));
		}
	};

	return {
		addMembers,
		fetchMembers,
		getPotentialMembers,
		getSchools,
		removeMembers,
		isLoading,
		roomMembers,
		potentialRoomMembers,
		schools,
	};
};