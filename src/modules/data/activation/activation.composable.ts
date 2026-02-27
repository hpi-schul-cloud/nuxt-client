import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { ref } from "vue";

export const useActivation = () => {
	const url = "/v1/activation";
	const list = ref<unknown>([]);
	const { execute } = useSafeAxiosTask();

	const updateActivations = async (activationCode: string | string[]) => {
		const { result } = await execute(() => $axios.put(url + "/" + activationCode));
		list.value = result?.data?.data || [];
	};

	return { list, updateActivations };
};
