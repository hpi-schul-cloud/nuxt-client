import { logger } from "@util-logger";
import { computed, onUnmounted, readonly, ref, shallowRef } from "vue";

export type NotificationStreamStatus = "disconnected" | "connecting" | "connected" | "error";

export interface UseNotificationStreamOptions {
	/**
	 * Base URL for the notification server.
	 * Defaults to the current origin (proxied via dev server or nginx).
	 */
	baseUrl?: string;

	/**
	 * Whether to automatically reconnect on connection loss.
	 * @default true
	 */
	autoReconnect?: boolean;

	/**
	 * Delay in milliseconds before attempting to reconnect.
	 * @default 3000
	 */
	reconnectDelay?: number;

	/**
	 * Maximum number of reconnection attempts.
	 * @default 5
	 */
	maxReconnectAttempts?: number;

	/**
	 * Callback when a notification is received.
	 * Receives the parsed JSON data from the SSE stream.
	 */
	onNotification?: (data: unknown) => void;

	/**
	 * Callback when an error occurs.
	 */
	onError?: (error: Event) => void;
}

const DEFAULT_OPTIONS: Required<Omit<UseNotificationStreamOptions, "onNotification" | "onError">> = {
	baseUrl: "",
	autoReconnect: true,
	reconnectDelay: 3000,
	maxReconnectAttempts: 5,
};

export const useNotificationStream = (options: UseNotificationStreamOptions = {}) => {
	const config = { ...DEFAULT_OPTIONS, ...options };

	const eventSource = shallowRef<EventSource | null>(null);
	const status = ref<NotificationStreamStatus>("disconnected");
	const lastNotification = ref<unknown>(null);
	const notifications = ref<unknown[]>([]);
	const error = ref<Event | null>(null);
	const reconnectAttempts = ref(0);

	let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

	const isConnected = computed(() => status.value === "connected");
	const isConnecting = computed(() => status.value === "connecting");
	const hasError = computed(() => status.value === "error");

	const clearReconnectTimeout = () => {
		if (reconnectTimeout) {
			clearTimeout(reconnectTimeout);
			reconnectTimeout = null;
		}
	};

	const scheduleReconnect = () => {
		if (!config.autoReconnect) return;
		if (reconnectAttempts.value >= config.maxReconnectAttempts) {
			logger.warn(
				`[NotificationStream] Max reconnection attempts (${config.maxReconnectAttempts}) reached. Giving up.`
			);
			return;
		}

		clearReconnectTimeout();
		reconnectTimeout = setTimeout(() => {
			reconnectAttempts.value++;
			logger.info(
				`[NotificationStream] Attempting to reconnect (${reconnectAttempts.value}/${config.maxReconnectAttempts})...`
			);
			connect();
		}, config.reconnectDelay);
	};

	const connect = () => {
		// Close existing connection if any
		disconnect();

		status.value = "connecting";
		error.value = null;

		const baseUrl = config.baseUrl || globalThis.location?.origin || "";
		const streamUrl = `${baseUrl}/notifications/stream`;

		try {
			const es = new EventSource(streamUrl, { withCredentials: true });

			es.onopen = () => {
				status.value = "connected";
				reconnectAttempts.value = 0;
				logger.info("[NotificationStream] Connected to notification stream");
			};

			es.onmessage = (event: MessageEvent) => {
				try {
					const data = JSON.parse(event.data) as unknown;
					lastNotification.value = data;
					notifications.value = [...notifications.value, data];

					if (options.onNotification) {
						options.onNotification(data);
					}
				} catch (parseError) {
					logger.error("[NotificationStream] Failed to parse notification:", parseError);
				}
			};

			es.onerror = (err: Event) => {
				logger.error("[NotificationStream] Connection error:", err);
				error.value = err;
				status.value = "error";

				if (options.onError) {
					options.onError(err);
				}

				// EventSource automatically tries to reconnect on error,
				// but we close it and handle reconnection ourselves for better control
				es.close();
				scheduleReconnect();
			};

			eventSource.value = es;
		} catch (err) {
			logger.error("[NotificationStream] Failed to create EventSource:", err);
			status.value = "error";
			scheduleReconnect();
		}
	};

	const disconnect = () => {
		clearReconnectTimeout();

		if (eventSource.value) {
			eventSource.value.close();
			eventSource.value = null;
		}

		status.value = "disconnected";
	};

	const clearNotifications = () => {
		notifications.value = [];
		lastNotification.value = null;
	};

	const resetReconnectAttempts = () => {
		reconnectAttempts.value = 0;
	};

	// Cleanup on unmount
	onUnmounted(() => {
		disconnect();
	});

	return {
		// State
		status: readonly(status),
		isConnected,
		isConnecting,
		hasError,
		error: readonly(error),
		lastNotification: readonly(lastNotification),
		notifications: readonly(notifications),
		reconnectAttempts: readonly(reconnectAttempts),

		// Actions
		connect,
		disconnect,
		clearNotifications,
		resetReconnectAttempts,
	};
};
