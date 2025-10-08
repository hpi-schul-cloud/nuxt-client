import { onBeforeMount, ref } from "vue";

export const useUid = () => {
	const uid = ref("");

	onBeforeMount(() => {
		uid.value = (Date.now().toString(16) + Math.random().toString(16).substring(2)).toUpperCase();
	});

	return {
		uid,
	};
};
