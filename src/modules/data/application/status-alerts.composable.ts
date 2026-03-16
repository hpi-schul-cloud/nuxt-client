import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { StatusAlert } from "@/store/types/status-alert";
import { $axios } from "@/utils/api";
import { AlertApiFactory } from "@api-server";
import { readonly, ref } from "vue";

export const useStatusAlerts = () => {
	const { execute, status } = useSafeAxiosTask();
	const statusAlerts = ref<StatusAlert[]>([]);
	const alertApi = AlertApiFactory(undefined, "v3", $axios);

	const fetchStatusAlerts = async () => {
		const { result } = await execute(() => alertApi.alertControllerFind());
		statusAlerts.value = (result?.data?.data as StatusAlert[]) || [];
	};

	return {
		status: readonly(status),
		statusAlerts: readonly(statusAlerts),
		fetchStatusAlerts,
	};
};
