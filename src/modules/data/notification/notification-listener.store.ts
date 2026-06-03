import { AlertStatus, useNotificationStore } from "@data-app";
import { logger } from "@util-logger";
import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";

import { useNotificationStream } from "./notification-sse.composable";

/**
 * Notification types from the SSE stream.
 * - "info" maps to info (blue bubble)
 * - "error" maps to error (red bubble)
 */
export type ServerNotificationType = "info" | "error";

/**
 * Structure of the inner notification object from the notification-server SSE stream.
 */
export interface ServerNotificationPayload {
	_id: unknown;
	userId: string;
	type: ServerNotificationType;
	messageOrKey: string;
	arguments?: Record<string, unknown>;
	expiresAt: string;
	createdAt: string;
	updatedAt: string;
}

/**
 * Structure of the SSE message wrapper.
 */
export interface ServerNotificationMessage {
	type: "live";
	notification: ServerNotificationPayload;
}

/**
 * Type guard to check if an object is a valid ServerNotificationMessage.
 */
const isServerNotificationMessage = (data: unknown): data is ServerNotificationMessage => {
	if (typeof data !== "object" || data === null) return false;
	const obj = data as Record<string, unknown>;

	if (obj.type !== "live" || typeof obj.notification !== "object" || obj.notification === null) {
		return false;
	}

	const notification = obj.notification as Record<string, unknown>;
	return (
		typeof notification.type === "string" &&
		["info", "error"].includes(notification.type) &&
		typeof notification.messageOrKey === "string" &&
		(typeof notification.arguments === "undefined" ||
			notification.arguments === null ||
			(typeof notification.arguments === "object" &&
				notification.arguments !== null &&
				!Array.isArray(notification.arguments)))
	);
};

const createNotification = (status: AlertStatus, textOrKey: string, messageArguments?: Record<string, unknown>) => {
	useNotificationStore().notify({ status, text: textOrKey, replace: messageArguments, autoClose: true });
};

const createInfoNotification = (textOrKey: string, messageArguments?: Record<string, unknown>) =>
	createNotification("info", textOrKey, messageArguments);

const createErrorNotification = (textOrKey: string, messageArguments?: Record<string, unknown>) =>
	createNotification("error", textOrKey, messageArguments);

/**
 * Maps a server notification type to the corresponding notify function.
 * - "info" → info (blue bubble)
 * - "error" → error (red bubble)
 */
const notifyByType: Record<
	ServerNotificationType,
	(textOrKey: string, messageArguments?: Record<string, unknown>) => void
> = {
	info: createInfoNotification,
	error: createErrorNotification,
};

/**
 * Store to manage the SSE notification stream connection and handle incoming notifications.
 *
 * This store:
 * - Connects to the notification-server SSE stream when startListening() is called
 * - Automatically displays notifications using the existing UI notification system
 * - Handles reconnection on connection loss
 *
 * Usage:
 * ```ts
 * const { startListening, stopListening, isConnected } = useNotificationListenerStore();
 *
 * // Start listening (typically after user login)
 * startListening();
 *
 * // Stop listening (typically on logout)
 * stopListening();
 * ```
 */
export const useNotificationListenerStore = defineStore("notificationListenerStore", () => {
	const isInitialized = ref(false);

	const {
		connect,
		disconnect,
		status,
		isConnected,
		isConnecting,
		hasError,
		notifications: sseNotifications,
		lastNotification,
		reconnectAttempts,
		clearNotifications,
	} = useNotificationStream({
		autoReconnect: true,
		reconnectDelay: 5000,
		maxReconnectAttempts: 10,
		onNotification: handleNotification,
		onError: handleError,
	});

	/**
	 * Handles an incoming notification from the SSE stream.
	 */
	function handleNotification(data: unknown) {
		if (!isServerNotificationMessage(data)) {
			logger.warn("[NotificationListener] Received invalid notification format:", data);
			return;
		}

		const { notification } = data;
		const notifyFn = notifyByType[notification.type];

		if (notifyFn) {
			notifyFn(notification.messageOrKey, notification.arguments);
			logger.info(`[NotificationListener] Displayed ${notification.type} notification:`, notification.messageOrKey);
		}
	}

	/**
	 * Handles SSE connection errors.
	 */
	function handleError(error: Event) {
		logger.error("[NotificationListener] SSE connection error:", error);
		// Don't show error notifications to users for SSE connection issues
		// as this would be disruptive and the reconnection is automatic
	}

	/**
	 * Starts listening for notifications via SSE.
	 * Should be called after user login.
	 */
	const startListening = () => {
		if (isInitialized.value) {
			logger.info("[NotificationListener] Already listening, skipping start");
			return;
		}

		logger.info("[NotificationListener] Starting notification listener");
		isInitialized.value = true;
		connect();
	};

	/**
	 * Stops listening for notifications.
	 * Should be called on user logout.
	 */
	const stopListening = () => {
		if (!isInitialized.value) {
			return;
		}

		logger.info("[NotificationListener] Stopping notification listener");
		isInitialized.value = false;
		disconnect();
		clearNotifications();
	};

	return {
		// State
		isInitialized,
		status,
		isConnected,
		isConnecting,
		hasError,
		sseNotifications,
		lastNotification,
		reconnectAttempts,

		// Actions
		startListening,
		stopListening,
	};
});

export const useNotificationListenerStoreRefs = () => storeToRefs(useNotificationListenerStore());
