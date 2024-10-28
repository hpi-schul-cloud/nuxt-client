import { Ref, ref } from "vue";
import { ParticipantType } from "./types";
import {
	RoleName,
	RoomApiFactory,
	SchoolApiFactory,
	RoomParticipantResponse,
	SchoolForExternalInviteResponse,
	UserIdAndRole,
	UserIdAndRoleRoleNameEnum,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";

const userRoles: Record<string, string> = {
	// TODO: Add translations here
	[RoleName.RoomEditor]: "Room Editor",
	[RoleName.RoomViewer]: "Room Viewer",
};

export const useParticipants = (roomId: string) => {
	const participants: Ref<RoomParticipantResponse[]> = ref([]);
	const potentialParticipants: Ref<ParticipantType[]> = ref([]);
	const schools: Ref<SchoolForExternalInviteResponse[]> = ref([]);
	const isLoading = ref(false);
	const ownSchool = {
		id: "5f2987e020834114b8efd6f8",
		name: "Paul-Gerhardt-Gymnasium",
	};

	const roomApi = RoomApiFactory(undefined, "/v3", $axios);
	const schoolApi = SchoolApiFactory(undefined, "/v3", $axios);

	const fetchParticipants = async () => {
		try {
			isLoading.value = true;
			const participantsData = (await roomApi.roomControllerGetMembers(roomId))
				.data;

			// getSchools();

			participants.value = participantsData.data.map(
				(participant: RoomParticipantResponse) => {
					return {
						...participant,
						roleName: userRoles[participant.roleName],
					};
				}
			);
			isLoading.value = false;
		} catch (error) {
			isLoading.value = false;
			// TODO: Handle error createApplicationError(responseError.code);
			console.error(error);
		}
	};

	const getPotentialParticipants = async (role: RoleName) => {
		if (!ownSchool?.id) return;
		try {
			const result = (await schoolApi.schoolControllerGetTeachers(ownSchool.id))
				.data;

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
				.filter((u) => {
					return (
						u.roleName === role &&
						!participants.value.some((p) => p.userId === u.id)
					);
				});
		} catch (error) {
			console.error(error);
		}
	};

	const getSchools = async () => {
		try {
			const response =
				await schoolApi.schoolControllerGetSchoolListForExternalInvite();

			schools.value = response.data;

			if (schools.value.findIndex((s) => s.id === ownSchool?.id) === -1) {
				schools.value.unshift(ownSchool);
			} else {
				const index = schools.value.findIndex((s) => s.id === ownSchool?.id);
				schools.value.splice(index, 1);
				schools.value.unshift(ownSchool);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const addParticipants = async (ids: string[]) => {
		const newParticipants = potentialParticipants.value.filter((p) =>
			ids.includes(p.userId)
		);

		const userIdsAndRoles: UserIdAndRole[] = newParticipants.map((p) => ({
			userId: p.userId,
			roleName: UserIdAndRoleRoleNameEnum.Editor,
		}));

		await roomApi.roomControllerAddMembers(roomId, {
			userIdsAndRoles,
		});

		participants.value.push(...newParticipants);
	};

	const removeParticipants = async (ids: string[]) => {
		await Promise.resolve(
			(participants.value = participants.value.filter(
				(p) => !ids.includes(p.userId)
			))
		);
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
