import { AlertApiFactory } from "@/serverApi/v3";
import { BusinessError, Status } from "@/store/types/commons";
import { StatusAlert } from "@/store/types/status-alert";
import { $axios } from "@/utils/api";
import { readonly, ref } from "vue";

export const useStatusAlerts = () => {
	const businessError = ref<BusinessError>({
		statusCode: "",
		message: "",
	});
	const status = ref<Status>("");
	const statusAlerts = ref<StatusAlert[]>([]);

	const alertApi = AlertApiFactory(undefined, "v3", $axios);

	const fetchStatusAlerts = async () => {
		try {
			resetBusinessError();
			status.value = "pending";
			const response = await alertApi.alertControllerFind();
			statusAlerts.value = response.data?.data as StatusAlert[];
			status.value = "completed";
		} catch (error) {
			businessError.value = error as BusinessError;
			status.value = "error";
		}
	};

	const resetBusinessError = () => {
		businessError.value = {
			statusCode: "",
			message: "",
		};
	};

	return {
		businessError: readonly(businessError),
		status: readonly(status),
		statusAlerts: readonly(statusAlerts),
		fetchStatusAlerts,
	};
};
