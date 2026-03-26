import { readonly, ref } from "vue";

const generateUid = (): string => (Date.now().toString(16) + Math.random().toString(16).substring(2)).toUpperCase();

export const useUid = () => {
	const uid = ref(generateUid());

	return {
		uid: readonly(uid),
	};
};
