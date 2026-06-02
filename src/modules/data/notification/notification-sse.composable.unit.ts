import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useNotificationStream } from "./notification-sse.composable";

// Mock EventSource
class MockEventSource {
	static instances: MockEventSource[] = [];

	url: string;
	withCredentials: boolean;
	onopen: ((event: Event) => void) | null = null;
	onmessage: ((event: MessageEvent) => void) | null = null;
	onerror: ((event: Event) => void) | null = null;
	readyState = 0;

	constructor(url: string, options?: EventSourceInit) {
		this.url = url;
		this.withCredentials = options?.withCredentials ?? false;
		MockEventSource.instances.push(this);
	}

	close = vi.fn(() => {
		this.readyState = 2;
	});

	simulateOpen() {
		this.readyState = 1;
		if (this.onopen) {
			this.onopen(new Event("open"));
		}
	}

	simulateMessage(data: unknown) {
		if (this.onmessage) {
			const event = new MessageEvent("message", {
				data: JSON.stringify(data),
			});
			this.onmessage(event);
		}
	}

	simulateError() {
		if (this.onerror) {
			this.onerror(new Event("error"));
		}
	}
}

describe("useNotificationStream", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		MockEventSource.instances = [];
		vi.stubGlobal("EventSource", MockEventSource);
		vi.stubGlobal("location", { origin: "http://localhost:4000" });
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.unstubAllGlobals();
	});

	describe("connect", () => {
		it("should create EventSource with correct URL", () => {
			const { connect } = useNotificationStream();

			connect();

			expect(MockEventSource.instances).toHaveLength(1);
			expect(MockEventSource.instances[0].url).toBe("http://localhost:4000/notifications/stream");
		});

		it("should create EventSource with credentials", () => {
			const { connect } = useNotificationStream();

			connect();

			expect(MockEventSource.instances[0].withCredentials).toBe(true);
		});

		it("should set status to connecting initially", () => {
			const { connect, status } = useNotificationStream();

			connect();

			expect(status.value).toBe("connecting");
		});

		it("should set status to connected on open", () => {
			const { connect, status, isConnected } = useNotificationStream();

			connect();
			MockEventSource.instances[0].simulateOpen();

			expect(status.value).toBe("connected");
			expect(isConnected.value).toBe(true);
		});

		it("should use custom baseUrl when provided", () => {
			const { connect } = useNotificationStream({
				baseUrl: "https://custom-server:3033",
			});

			connect();

			expect(MockEventSource.instances[0].url).toBe("https://custom-server:3033/notifications/stream");
		});
	});

	describe("notifications", () => {
		it("should store received notifications", () => {
			const { connect, notifications, lastNotification } = useNotificationStream();

			connect();
			MockEventSource.instances[0].simulateOpen();

			const notification = {
				type: "live",
				notification: {
					type: "note",
					arguments: ["Hello"],
				},
			};

			MockEventSource.instances[0].simulateMessage(notification);

			expect(notifications.value).toHaveLength(1);
			expect(notifications.value[0]).toEqual(notification);
			expect(lastNotification.value).toEqual(notification);
		});

		it("should call onNotification callback when notification received", () => {
			const onNotification = vi.fn();
			const { connect } = useNotificationStream({ onNotification });

			connect();
			MockEventSource.instances[0].simulateOpen();

			const notification = {
				type: "live",
				notification: {
					type: "note",
					arguments: ["Test"],
				},
			};

			MockEventSource.instances[0].simulateMessage(notification);

			expect(onNotification).toHaveBeenCalledWith(notification);
		});

		it("should accumulate multiple notifications", () => {
			const { connect, notifications } = useNotificationStream();

			connect();
			MockEventSource.instances[0].simulateOpen();

			const notification1 = {
				type: "live",
				notification: { type: "note", arguments: ["First"] },
			};
			const notification2 = {
				type: "live",
				notification: { type: "note", arguments: ["Second"] },
			};

			MockEventSource.instances[0].simulateMessage(notification1);
			MockEventSource.instances[0].simulateMessage(notification2);

			expect(notifications.value).toHaveLength(2);
		});
	});

	describe("clearNotifications", () => {
		it("should clear all notifications", () => {
			const { connect, notifications, lastNotification, clearNotifications } = useNotificationStream();

			connect();
			MockEventSource.instances[0].simulateOpen();

			MockEventSource.instances[0].simulateMessage({
				id: "1",
				type: "test",
				data: {},
				timestamp: "2026-05-21T10:00:00Z",
			});

			clearNotifications();

			expect(notifications.value).toHaveLength(0);
			expect(lastNotification.value).toBeNull();
		});
	});

	describe("disconnect", () => {
		it("should close the EventSource", () => {
			const { connect, disconnect } = useNotificationStream();

			connect();
			const instance = MockEventSource.instances[0];

			disconnect();

			expect(instance.close).toHaveBeenCalled();
		});

		it("should set status to disconnected", () => {
			const { connect, disconnect, status } = useNotificationStream();

			connect();
			disconnect();

			expect(status.value).toBe("disconnected");
		});
	});

	describe("error handling", () => {
		it("should set error status on connection error", () => {
			const { connect, status, hasError, error } = useNotificationStream({
				autoReconnect: false,
			});

			connect();
			MockEventSource.instances[0].simulateError();

			expect(status.value).toBe("error");
			expect(hasError.value).toBe(true);
			expect(error.value).toBeInstanceOf(Event);
		});

		it("should call onError callback on error", () => {
			const onError = vi.fn();
			const { connect } = useNotificationStream({
				autoReconnect: false,
				onError,
			});

			connect();
			MockEventSource.instances[0].simulateError();

			expect(onError).toHaveBeenCalled();
		});
	});

	describe("auto reconnect", () => {
		it("should attempt to reconnect after error", () => {
			const { connect } = useNotificationStream({
				autoReconnect: true,
				reconnectDelay: 1000,
			});

			connect();
			MockEventSource.instances[0].simulateError();

			expect(MockEventSource.instances).toHaveLength(1);

			vi.advanceTimersByTime(1000);

			expect(MockEventSource.instances).toHaveLength(2);
		});

		it("should increment reconnect attempts", () => {
			const { connect, reconnectAttempts } = useNotificationStream({
				autoReconnect: true,
				reconnectDelay: 1000,
			});

			connect();
			expect(reconnectAttempts.value).toBe(0);

			MockEventSource.instances[0].simulateError();
			vi.advanceTimersByTime(1000);

			expect(reconnectAttempts.value).toBe(1);
		});

		it("should reset reconnect attempts on successful connection", () => {
			const { connect, reconnectAttempts } = useNotificationStream({
				autoReconnect: true,
				reconnectDelay: 1000,
			});

			connect();
			MockEventSource.instances[0].simulateError();
			vi.advanceTimersByTime(1000);

			expect(reconnectAttempts.value).toBe(1);

			MockEventSource.instances[1].simulateOpen();

			expect(reconnectAttempts.value).toBe(0);
		});

		it("should stop reconnecting after max attempts", () => {
			const { connect, reconnectAttempts } = useNotificationStream({
				autoReconnect: true,
				reconnectDelay: 1000,
				maxReconnectAttempts: 2,
			});

			connect();

			// First error + reconnect
			MockEventSource.instances[0].simulateError();
			vi.advanceTimersByTime(1000);
			expect(reconnectAttempts.value).toBe(1);

			// Second error + reconnect
			MockEventSource.instances[1].simulateError();
			vi.advanceTimersByTime(1000);
			expect(reconnectAttempts.value).toBe(2);

			// Third error - should NOT reconnect
			MockEventSource.instances[2].simulateError();
			vi.advanceTimersByTime(1000);

			// Should still be 3 instances (no new connection attempt)
			expect(MockEventSource.instances).toHaveLength(3);
		});

		it("should not reconnect when autoReconnect is false", () => {
			const { connect } = useNotificationStream({
				autoReconnect: false,
			});

			connect();
			MockEventSource.instances[0].simulateError();
			vi.advanceTimersByTime(10000);

			expect(MockEventSource.instances).toHaveLength(1);
		});
	});

	describe("resetReconnectAttempts", () => {
		it("should reset the reconnect counter", () => {
			const { connect, reconnectAttempts, resetReconnectAttempts } = useNotificationStream({
				autoReconnect: true,
				reconnectDelay: 1000,
			});

			connect();
			MockEventSource.instances[0].simulateError();
			vi.advanceTimersByTime(1000);

			expect(reconnectAttempts.value).toBe(1);

			resetReconnectAttempts();

			expect(reconnectAttempts.value).toBe(0);
		});
	});
});
