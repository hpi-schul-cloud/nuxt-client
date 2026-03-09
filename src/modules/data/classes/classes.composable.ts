import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { ref } from "vue";

export const useClasses = () => {
	const classNameList = ref<{ label: string; value: string }[]>([]);
	const { execute } = useSafeAxiosTask();

	const fetchClasses = async (query: { $limit: number; year: string }) => {
		const { result } = await execute(() => $axios.get("/v1/classes", { params: query }));
		classNameList.value = (result?.data?.data ?? []).map((item: { displayName: string }) => ({
			label: item.displayName,
			value: item.displayName,
		}));
	};

	return { fetchClasses, classNameList };
};
