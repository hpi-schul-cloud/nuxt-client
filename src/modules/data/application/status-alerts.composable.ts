import { AlertApiFactory } from "@/serverApi/v3";
import { BusinessError, Status } from "@/store/types/commons";
import { StatusAlert } from "@/store/types/status-alert";
import { $axios } from "@/utils/api";
import { computed, ref } from "vue";

export function useStatusAlerts() {
	const businessError = ref<BusinessError>({
		statusCode: "",
		message: "",
	});
	const status = ref<Status>("");
	const statusAlerts = ref<StatusAlert[]>([]);

	const getStatusAlerts = computed(() => statusAlerts.value);

	const alertApi = AlertApiFactory(undefined, "v3", $axios);

	const fetchStatusAlerts = async () => {
		try {
			resetBusinessError();
			setStatus("pending");
			const response = await alertApi.alertControllerFind();
			setStatusAlerts(response.data?.data as StatusAlert[]);
			setStatus("completed");
		} catch (error) {
			setBusinessError(error as BusinessError);
		}
	};

	const setBusinessError = (error: BusinessError) => {
		businessError.value = error;
	};

	const resetBusinessError = () => {
		businessError.value = {
			statusCode: "",
			message: "",
		};
	};

	const setStatus = (newStatus: Status) => {
		status.value = newStatus;
	};

	const setStatusAlerts = (alerts: StatusAlert[]) => {
		statusAlerts.value = alerts;
	};

	return {
		businessError,
		status,
		statusAlerts,
		getStatusAlerts,
		fetchStatusAlerts,
		setBusinessError,
		resetBusinessError,
		setStatus,
		setStatusAlerts,
	};
}
