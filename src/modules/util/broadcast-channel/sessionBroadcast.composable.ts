import { ref } from "vue";

const isJwtExpired = ref(false);

export const useSessionBroadcast = () => {
	const handleUnauthorizedError = () => {
		isJwtExpired.value = true;
	};

	return {
		isJwtExpired,
		handleUnauthorizedError,
	};
};
