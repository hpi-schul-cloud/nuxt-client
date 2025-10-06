import { ContextExternalToolBodyParams, LaunchType } from "@/serverApi/v3";
import {
	ToolLaunchRequest,
	ToolLaunchRequestMethodEnum,
} from "@/store/external-tool";
import { BusinessError } from "@/store/types/commons";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { uniqueId } from "lodash-es";
import { onUnmounted, ref, Ref } from "vue";
import { useExternalToolApi } from "./ExternalToolApi.composable";

export const useExternalToolLaunchState = (
	refreshCallback?: () => Promise<void> | void
) => {
	const { fetchContextLaunchDataCall, fetchSchoolLaunchDataCall } =
		useExternalToolApi();

	const isLoading: Ref<boolean> = ref(false);
	const error: Ref<BusinessError | undefined> = ref();
	const toolLaunchRequest: Ref<ToolLaunchRequest | undefined> = ref();

	const windowRef: Ref<Window | null> = ref(null);
	const windowIntervalHandle: Ref<NodeJS.Timeout | undefined> = ref();

	const fetchContextLaunchRequest = async (
		contextExternalToolId: string
	): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;

		try {
			toolLaunchRequest.value = await fetchContextLaunchDataCall(
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

	const fetchSchoolLaunchRequest = async (
		schoolExternalToolId: string,
		contextExternalToolBodyParams: ContextExternalToolBodyParams
	): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;

		try {
			toolLaunchRequest.value = await fetchSchoolLaunchDataCall(
				schoolExternalToolId,
				contextExternalToolBodyParams
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
		const target = toolLaunch.openNewTab ? "_blank" : "_self";

		window.open(toolLaunch.url, target);
	};

	const handlePostLaunchRequest = (toolLaunch: ToolLaunchRequest) => {
		const existingForm: HTMLElement | null =
			document.getElementById("launch-form");

		if (existingForm) {
			document.body.removeChild(existingForm);
		}

		const form: HTMLFormElement = document.createElement("form");
		form.method = "POST";
		form.action = toolLaunch.url;
		form.id = "launch-form";

		const target = uniqueId();
		form.target = toolLaunch.openNewTab ? target : "_self";

		const payload = JSON.parse(toolLaunch.payload || "{}");

		for (const key in payload) {
			if (Object.hasOwn(payload, key)) {
				const hiddenField: HTMLInputElement = document.createElement("input");
				hiddenField.type = "hidden";
				hiddenField.name = key;
				hiddenField.value = payload[key];

				form.appendChild(hiddenField);
			}
		}

		document.body.appendChild(form);

		windowRef.value = window.open(undefined, form.target);

		form.submit();

		if (toolLaunch.launchType === LaunchType.Lti11ContentItemSelection) {
			windowIntervalHandle.value = setInterval(async () => {
				if (windowRef.value?.closed) {
					await refreshCallback?.();

					windowRef.value = null;
					clearInterval(windowIntervalHandle.value);
				}
			}, 1000);
		}
	};

	onUnmounted(() => {
		clearInterval(windowIntervalHandle.value);
	});

	return {
		toolLaunchRequest,
		error,
		isLoading,
		fetchContextLaunchRequest,
		fetchSchoolLaunchRequest,
		launchTool,
	};
};
