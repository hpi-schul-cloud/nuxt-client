import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { ref } from "vue";

export const useClasses = () => {
	const url = "/v1/classes";
	const list = ref([]);

	const fetchClasses = async (query: { $limit: number; year: string }) => {
		const { execute } = useSafeAxiosTask();
		const { result } = await execute(async () => await $axios.get(url, { params: query }));
		list.value = result?.data?.data || [];
	};

	return { list, fetchClasses };
};
