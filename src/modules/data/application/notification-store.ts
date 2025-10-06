import { uniqueId } from "lodash-es";
import { defineStore } from "pinia";
import { ref } from "vue";

export type AlertStatus = "success" | "error" | "warning" | "info";

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

export const notifySuccess = (text: string, autoClose = true) =>
	useNotificationStore().notify({ text, status: "success", autoClose });

export const notifyError = (text: string, autoClose = true) =>
	useNotificationStore().notify({ text, status: "error", autoClose });

export const notifyWarning = (text: string, autoClose = true) =>
	useNotificationStore().notify({ text, status: "warning", autoClose });

export const notifyInfo = (text: string, autoClose = true) =>
	useNotificationStore().notify({ text, status: "info", autoClose });
