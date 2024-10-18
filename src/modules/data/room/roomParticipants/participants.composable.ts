import { Ref, ref } from "vue";
import {
	mockParticipants,
	mockPotentialParticipants,
} from "./mockParticipantsList";
import { Participants } from "./types";
import { RoleName } from "@/serverApi/v3";

export const useParticipants = () => {
	const participants: Ref<Participants[]> = ref([]);
	const potentialParticipants: Ref<Participants[]> = ref([]);

	const fetchParticipants = async () => {
		participants.value = await Promise.resolve(mockParticipants);
	};

	const fetchPotentialUsers = async (role: RoleName) => {
		if (role) {
			potentialParticipants.value = await Promise.resolve(
				mockPotentialParticipants.filter(
					(participant: Participants) =>
						participant.roleName.toLowerCase() === role.toLowerCase()
				)
			);
			return;
		}

		potentialParticipants.value = await Promise.resolve(
			mockPotentialParticipants
		);
	};

	const addParticipants = async (ids: string[]) => {
		const newParticipants = potentialParticipants.value.filter((p) =>
			ids.includes(p.id)
		);

		participants.value = await Promise.resolve([
			...participants.value,
			...newParticipants,
		]);
	};

	const deleteParticipants = async (ids: string[]) => {
		await Promise.resolve(
			(participants.value = participants.value.filter(
				(p) => !ids.includes(p.id)
			))
		);
	};

	return {
		addParticipants,
		deleteParticipants,
		fetchParticipants,
		fetchPotentialUsers,
		participants,
		potentialParticipants,
	};
};
