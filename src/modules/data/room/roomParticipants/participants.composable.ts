import { Ref, ref } from "vue";
import { ParticipantType } from "./types";
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

export const useParticipants = (roomId: string) => {
	const participants: Ref<RoomMemberResponse[]> = ref([]);
	const potentialParticipants: Ref<ParticipantType[]> = ref([]);
	const schools: Ref<SchoolForExternalInviteResponse[]> = ref([]);
	const isLoading = ref(false);
	const { t } = useI18n();
	const { showFailure } = useBoardNotifier();
	const ownSchool = {
		id: "5f2987e020834114b8efd6f8",
		name: "Paul-Gerhardt-Gymnasium",
	};

	const userRoles: Record<string, string> = {
		[RoleName.RoomEditor]: t("common.labels.teacher"),
		// This role name is not used for now
		// [RoleName.RoomViewer]: t("pages.rooms.participants.roles.viewer"),
	};

	const roomApi = RoomApiFactory(undefined, "/v3", $axios);
	const schoolApi = SchoolApiFactory(undefined, "/v3", $axios);

	const fetchParticipants = async () => {
		try {
			isLoading.value = true;
			const participantsData = (await roomApi.roomControllerGetMembers(roomId))
				.data;

			participants.value = participantsData.data.map(
				(participant: RoomMemberResponse) => {
					return {
						...participant,
						displayRoleName: userRoles[participant.roleName],
					};
				}
			);
			isLoading.value = false;
		} catch (error) {
			showFailure(t("pages.rooms.participant.error.load"));
			isLoading.value = false;
		}
	};

	const getPotentialParticipants = async (
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

			potentialParticipants.value = result.data
				.map((user) => {
					return {
						...user,
						userId: user.id,
						fullName: `${user.lastName}, ${user.firstName}`,
						roleName: RoleName.RoomEditor,
						schoolName: ownSchool.name,
					};
				})
				.filter((user) => {
					return (
						user.roleName === payload.role &&
						!participants.value.some(
							(participant) => participant.userId === user.id
						)
					);
				});
		} catch (error) {
			showFailure(t("pages.rooms.participant.error.load"));
		}
	};

	const getSchools = async () => {
		try {
			const response =
				await schoolApi.schoolControllerGetSchoolListForExternalInvite();

			schools.value = response.data;

			const schoolIndex = schools.value.findIndex(
				(school) => school.id === ownSchool?.id
			);

			if (schoolIndex >= 0) {
				schools.value.splice(schoolIndex, 1);
			}
			schools.value.unshift(ownSchool);
		} catch (error) {
			console.error(error);
		}
	};

	const addParticipants = async (userIds: string[]) => {
		const newParticipants = potentialParticipants.value.filter((participant) =>
			userIds.includes(participant.userId)
		);

		const userIdsAndRoles: UserIdAndRole[] = newParticipants.map(
			(participant) => ({
				userId: participant.userId,
				roleName: UserIdAndRoleRoleNameEnum.Editor,
			})
		);

		try {
			await roomApi.roomControllerAddMembers(roomId, {
				userIdsAndRoles,
			});
			participants.value.push(
				...newParticipants.map((participant) => ({
					...participant,
					displayRoleName: userRoles[participant.roleName],
				}))
			);
		} catch (error) {
			showFailure(t("pages.rooms.participant.error.add"));
		}
	};

	const removeParticipants = async (userIds: string[]) => {
		try {
			await roomApi.roomControllerRemoveMembers(roomId, { userIds });
			participants.value = participants.value.filter(
				(participant) => !userIds.includes(participant.userId)
			);
		} catch (error) {
			showFailure(t("pages.rooms.participant.error.delete"));
		}
	};

	return {
		addParticipants,
		fetchParticipants,
		getPotentialParticipants,
		getSchools,
		removeParticipants,
		isLoading,
		participants,
		potentialParticipants,
		schools,
	};
};
