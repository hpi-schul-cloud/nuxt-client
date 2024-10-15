import { participants, potentialParticipants } from "./mockParticipantsList";

export const useParticipants = () => {
	const getParticipants = async () => {
		return Promise.resolve(participants);
	};

	const getPotentialParticipants = async () => {
		return Promise.resolve(potentialParticipants);
	};

	return {
		getParticipants,
		getPotentialParticipants,
	};
};
