import {
	ToolLaunchRequest,
	ToolLaunchRequestMethodEnum,
} from "@/store/external-tool";
import { BusinessError } from "@/store/types/commons";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { ref, Ref } from "vue";
import { useExternalToolApi } from "./ExternalToolApi.composable";

export const useExternalToolLaunchState = () => {
	const { fetchLaunchDataCall } = useExternalToolApi();

	const isLoading: Ref<boolean> = ref(false);
	const error: Ref<BusinessError | undefined> = ref();
	const toolLaunchRequest: Ref<ToolLaunchRequest | undefined> = ref();

	const fetchLaunchRequest = async (
		contextExternalToolId: string
	): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;

		try {
			toolLaunchRequest.value = await fetchLaunchDataCall(
				contextExternalToolId
			);
		} catch (axiosError: unknown) {
			const apiError = mapAxiosErrorToResponseError(axiosError);

			error.value = {
				error: apiError,
				message: apiError.message,
				statusCode: apiError.code,
			};
		}

		isLoading.value = false;
	};

	const launchTool = () => {
		if (!toolLaunchRequest.value) {
			return;
		}

		switch (toolLaunchRequest.value.method) {
			case ToolLaunchRequestMethodEnum.Get:
				handleGetLaunchRequest(toolLaunchRequest.value);
				break;
			case ToolLaunchRequestMethodEnum.Post:
				handlePostLaunchRequest(toolLaunchRequest.value);
				break;
			default:
				error.value = {
					message: "Unknown launch method",
					statusCode: HttpStatusCode.UnprocessableEntity,
				};
				break;
		}
	};

	const handleGetLaunchRequest = (toolLaunch: ToolLaunchRequest) => {
		if (toolLaunch.openNewTab) {
			window.open(toolLaunch.url, "_blank");
			return;
		}
		window.location.href = toolLaunch.url;
	};

	const handlePostLaunchRequest = (toolLaunch: ToolLaunchRequest) => {
		const form: HTMLFormElement = document.createElement("form");
		form.method = "POST";
		form.action = toolLaunch.url;
		form.target = toolLaunch.openNewTab ? "_blank" : "_self";
		form.id = "launch-form";

		const payload = JSON.parse(toolLaunch.payload || "{}");

		for (const key in payload) {
			if (Object.prototype.hasOwnProperty.call(payload, key)) {
				const hiddenField = document.createElement("input");
				hiddenField.type = "hidden";
				hiddenField.name = key;
				hiddenField.value = payload[key];

				form.appendChild(hiddenField);
			}
		}

		document.body.appendChild(form);
		form.submit();
	};

	return {
		toolLaunchRequest,
		error,
		isLoading,
		fetchLaunchRequest,
		launchTool,
	};
};
