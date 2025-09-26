import { defineStore } from "pinia";
import { ref } from "vue";

export type AlertStatus = "success" | "error" | "warning" | "info";

export interface AlertPayload {
	text: string;
	status: AlertStatus;
	autoClose?: boolean;
	duration?: number;
}

/**
 * Store to spawn/remove alert messages for the user.
 */
export const useNotificationStore = defineStore("NotifyStore", () => {
	const notifierItems = ref<AlertPayload[]>([]);

	const removeNotifier = (alert: AlertPayload) => {
		const index = notifierItems.value.indexOf(alert);
		notifierItems.value.splice(index, 1);
	};

	/**
	 * Function to add a new alert message.
	 * Default timeout is 5000ms and autoClose is true.
	 */
	const notify = (payload: AlertPayload) => {
		const alertData: AlertPayload = {
			...payload,
			autoClose: payload.autoClose ?? true,
			duration: payload.duration ?? 5000,
		};
		notifierItems.value.unshift(alertData);

		if (alertData.autoClose) {
			setTimeout(() => {
				removeNotifier(alertData);
			}, alertData.duration);
		}
		return () => {
			removeNotifier(alertData);
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

export const notifySuccess = (text: string, autoClose = true) =>
	useNotificationStore().notify({ text, status: "success", autoClose });

export const notifyError = (text: string, autoClose = true) =>
	useNotificationStore().notify({ text, status: "error", autoClose });

export const notifyWarning = (text: string, autoClose = true) =>
	useNotificationStore().notify({ text, status: "warning", autoClose });

export const notifyInfo = (text: string, autoClose = true) =>
	useNotificationStore().notify({ text, status: "info", autoClose });
