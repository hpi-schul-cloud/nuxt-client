import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { ref } from "vue";

export const useActivation = () => {
	const url = "/v1/activations";
	const list = ref([]);

	const updateActivations = async (activationCode: string | string[]) => {
		const { execute } = useSafeAxiosTask();
		const { result } = await execute(async () => await $axios.put(url, activationCode));
		list.value = result?.data?.data || [];
	};

	return { list, updateActivations };
};
