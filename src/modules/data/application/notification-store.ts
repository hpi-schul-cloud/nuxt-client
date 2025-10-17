import { uniqueId } from "lodash-es";
import { defineStore } from "pinia";
import { ref } from "vue";

export type AlertStatus = "success" | "error" | "warning" | "info";

/**
 * text: The message to be displayed in the alert. Text or translation key allowed.
 * status: The type of alert, which can be "success", "error", "warning", or "info".
 * autoClose: Optional boolean indicating whether the alert should automatically close after a duration. Default is true.
 * duration: Optional number specifying how long (in milliseconds) the alert should be displayed before auto-closing. Default is 5000ms.
 */
export interface AlertPayload {
	text: string;
	status: AlertStatus;
	autoClose?: boolean;
	duration?: number;
}

export interface Alert extends AlertPayload {
	id: string;
}

/**
 * Store to spawn/remove alert messages for the user.
 */
export const useNotificationStore = defineStore("notifyStore", () => {
	const notifierItems = ref<Alert[]>([]);

	const removeNotifier = (id: string) => {
		const index = notifierItems.value.findIndex((alert) => alert.id === id);
		notifierItems.value.splice(index, 1);
	};

	/**
	 * Function to add a new alert message.
	 * Default timeout is 5000ms and autoClose is true.
	 */
	const notify = (payload: AlertPayload) => {
		const id = uniqueId();
		const alertData: Alert = {
			id,
			...payload,
			autoClose: payload.autoClose ?? true,
			duration: payload.duration ?? 5000,
		};
		notifierItems.value.unshift(alertData);

		if (alertData.autoClose) {
			setTimeout(() => {
				removeNotifier(id);
			}, alertData.duration);
		}
		return () => {
			removeNotifier(id);
		};
	};

	const clearAll = () => {
		notifierItems.value.length = 0;
	};

	return {
		notify,
		removeNotifier,
		notifierItems,
		clearAll,
	};
});

export const notifySuccess = (textOrKey: string, autoClose = true) =>
	useNotificationStore().notify({ text: textOrKey, status: "success", autoClose });

export const notifyError = (textOrKey: string, autoClose = true) =>
	useNotificationStore().notify({ text: textOrKey, status: "error", autoClose });

export const notifyWarning = (textOrKey: string, autoClose = true) =>
	useNotificationStore().notify({ text: textOrKey, status: "warning", autoClose });

export const notifyInfo = (textOrKey: string, autoClose = true) =>
	useNotificationStore().notify({ text: textOrKey, status: "info", autoClose });
