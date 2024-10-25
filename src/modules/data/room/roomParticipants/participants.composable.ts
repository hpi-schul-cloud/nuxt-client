import { Ref, ref } from "vue";

import {
	RoleName,
	RoomApiFactory,
	SchoolApiFactory,
	RoomParticipantResponse,
	SchoolForExternalInviteResponse,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";

export const useParticipants = (roomId: string) => {
	const participants: Ref<RoomParticipantResponse[]> = ref([]);
	const potentialParticipants: Ref<RoomParticipantResponse[]> = ref([]);
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
			const participantsData = (
				await roomApi.roomControllerGetParticipants(roomId)
			).data;

			getSchools();

			participants.value = participantsData.data;
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
						fullName: `${user.lastName}, ${user.firstName}`,
						roleName: RoleName.Teacher,
						schoolName: ownSchool.name,
					};
				})
				.filter((u) => {
					return (
						u.roleName === role &&
						!participants.value.some((p) => p.id === u.id)
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
			ids.includes(p.id)
		);

		participants.value.push(...newParticipants);
	};

	const removeParticipants = async (ids: string[]) => {
		await Promise.resolve(
			(participants.value = participants.value.filter(
				(p) => !ids.includes(p.id)
			))
		);
	};

	return {
		addParticipants,
		fetchParticipants,
		getPotentialParticipants,
		removeParticipants,
		isLoading,
		participants,
		potentialParticipants,
		schools,
	};
};
