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

	const fetch = async () => {
		participants.value = await Promise.resolve(mockParticipants);
	};

	const fetchPotential = async (role: RoleName) => {
		if (role) {
			potentialParticipants.value = await Promise.resolve(
				mockPotentialParticipants.filter(
					(participant: Participants) =>
						participant.roleName.toLowerCase() === role.toString().toLowerCase()
				)
			);
			return;
		}

		potentialParticipants.value = await Promise.resolve(
			mockPotentialParticipants
		);
	};

	const addParticipants = (ids: string[]) => {
		const newParticipants = potentialParticipants.value.filter((p) =>
			ids.includes(p.id)
		);

		participants.value = [...participants.value, ...newParticipants];
	};

	const deleteParticipants = (ids: string[]) => {
		participants.value = participants.value.filter((p) => !ids.includes(p.id));
	};

	return {
		addParticipants,
		deleteParticipants,
		fetch,
		fetchPotential,
		participants,
		potentialParticipants,
	};
};
