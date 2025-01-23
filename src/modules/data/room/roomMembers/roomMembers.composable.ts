import { Ref, ref } from "vue";
import { RoomMember } from "./types";
import {
	RoleName,
	RoomApiFactory,
	SchoolApiFactory,
	RoomMemberResponse,
	SchoolForExternalInviteResponse,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { useI18n } from "vue-i18n";
import { useBoardNotifier } from "@util-board";
import { schoolsModule } from "@/store";
import { authModule } from "@/store/store-accessor";

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
	const currentUserId = authModule.getUser?.id ?? "";

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
					displayRoomRole: roomRole[member.roomRoleName],
					displaySchoolRole: schoolRole[member.schoolRoleName],
					isSelectable: !(
						member.userId === currentUserId ||
						member.roomRoleName === RoleName.Roomowner
					),
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
					displayRoomRole: roomRole[member.roomRoleName],
					displaySchoolRole: schoolRole[member.schoolRoleName],
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
