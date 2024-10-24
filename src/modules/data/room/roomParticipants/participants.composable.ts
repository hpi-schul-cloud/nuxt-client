import { Ref, ref } from "vue";

import {
	RoleName,
	RoomApiFactory,
	SchoolApiFactory,
	RoomParticipantResponse,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { authModule } from "@/store";

export const useParticipants = () => {
	const participants: Ref<RoomParticipantResponse[]> = ref([]);
	const potentialParticipants: Ref<RoomParticipantResponse[]> = ref([]);
	const isLoading = ref(false);

	const roomApi = RoomApiFactory(undefined, "/v3", $axios);
	const schoolApi = SchoolApiFactory(undefined, "/v3", $axios);

	const school = authModule.getSchool;

	const fetchParticipants = async () => {
		try {
			isLoading.value = true;
			const participantsData = (await roomApi.roomControllerGetParticipants())
				.data;

			participants.value = participantsData.data;
			isLoading.value = false;
		} catch (error) {
			isLoading.value = false;
			// TODO: Handle error createApplicationError(responseError.code);
			console.error(error);
		}
	};

	const getPotentialParticipants = async (role: RoleName) => {
		if (!school?.id) return;
		const result = (await schoolApi.schoolControllerGetTeachers(school.id))
			.data;

		potentialParticipants.value = result.data
			.map((user) => {
				return {
					...user,
					fullName: `${user.lastName}, ${user.firstName}`,
					roleName: RoleName.Teacher,
					schoolName: school.name,
				};
			})
			.filter((u) => u.roleName === role);
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
	};
};
