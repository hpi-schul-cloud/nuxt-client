import { AlertStatus, useNotificationStore } from "@data-app";
import { useUrlSearchParams } from "@vueuse/core";

export const notifyFromQueryParams = () => {
	if (!document.referrer || new URL(document.referrer).origin !== location.origin) {
		return;
	}
	const params = useUrlSearchParams<Record<string, undefined>>();

	const type = params["toast-type"];
	const message = params["toast-message"];
	if (!type || !message) {
		return;
	}

	useNotificationStore().notify({
		text: decodeURI(message as string),
		status: type as AlertStatus,
		autoClose: false,
	});

	params["toast-type"] = undefined;
	params["toast-message"] = undefined;
};
