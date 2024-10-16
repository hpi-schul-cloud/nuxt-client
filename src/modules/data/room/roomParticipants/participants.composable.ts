import { Ref, ref } from "vue";
import {
	mockParticipants,
	mockPotantialParticipants,
} from "./mockParticipantsList";
import { Participants } from "./types";

export const useParticipants = () => {
	const participants: Ref<Participants[]> = ref([]);
	const potentialParticipants: Ref<Participants[]> = ref([]);

	const fetch = async () => {
		participants.value = await Promise.resolve(mockParticipants);
	};

	const fetchPotential = async () => {
		potentialParticipants.value = await Promise.resolve(
			mockPotantialParticipants
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
