import { FolderAlert } from "./FolderAlert.enum";
import { Ref, ref } from "vue";

export const useFolderAlerts = () => {
	const alerts: Ref<FolderAlert[]> = ref([]);

	const addAlert = (alert: FolderAlert) => {
		alerts.value.push(alert);
	};

	return {
		alerts,
		addAlert,
	};
};
