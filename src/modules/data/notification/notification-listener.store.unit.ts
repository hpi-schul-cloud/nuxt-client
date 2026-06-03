import { useNotificationListenerStore, ServerNotificationMessage } from "./notification-listener.store";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock the useNotificationStream composable
const mockConnect = vi.fn();
const mockDisconnect = vi.fn();
const mockClearNotifications = vi.fn();
let mockOnNotification: ((data: unknown) => void) | undefined;

const mockNotify = vi.fn();

vi.mock("@data-app", () => ({
	useNotificationStore: vi.fn(() => ({
		notify: mockNotify,
	})),
}));

vi.mock("./notification-sse.composable", () => ({
	useNotificationStream: (options: { onNotification?: (data: unknown) => void }) => {
		mockOnNotification = options.onNotification;
		return {
			connect: mockConnect,
			disconnect: mockDisconnect,
			status: { value: "disconnected" },
			isConnected: { value: false },
			isConnecting: { value: false },
			hasError: { value: false },
			notifications: { value: [] },
			lastNotification: { value: null },
			reconnectAttempts: { value: 0 },
			clearNotifications: mockClearNotifications,
		};
	},
}));

/**
 * Helper to create a valid server notification message
 */
const createNotificationMessage = (type: "info" | "error", message: string): ServerNotificationMessage => ({
	type: "live",
	notification: {
		_id: { buffer: { type: "Buffer", data: [1, 2, 3] } },
		userId: "user123",
		type,
		messageOrKey: "TEST_KEY",
		arguments: {},
		expiresAt: "2026-05-21T20:00:00.000Z",
		createdAt: "2026-05-21T19:00:00.000Z",
		updatedAt: "2026-05-21T19:00:00.000Z",
	},
});

describe("useNotificationListenerStore", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		vi.clearAllMocks();
	});

	afterEach(() => {
		mockOnNotification = undefined;
	});

	describe("startListening", () => {
		it("should call connect on first start", () => {
			const store = useNotificationListenerStore();

			store.startListening();

			expect(mockConnect).toHaveBeenCalledTimes(1);
			expect(store.isInitialized).toBe(true);
		});

		it("should not call connect if already initialized", () => {
			const store = useNotificationListenerStore();

			store.startListening();
			store.startListening();

			expect(mockConnect).toHaveBeenCalledTimes(1);
		});
	});

	describe("stopListening", () => {
		it("should call disconnect when stopping", () => {
			const store = useNotificationListenerStore();

			store.startListening();
			store.stopListening();

			expect(mockDisconnect).toHaveBeenCalledTimes(1);
			expect(mockClearNotifications).toHaveBeenCalledTimes(1);
			expect(store.isInitialized).toBe(false);
		});

		it("should not call disconnect if not initialized", () => {
			const store = useNotificationListenerStore();

			store.stopListening();

			expect(mockDisconnect).not.toHaveBeenCalled();
		});
	});

	describe("notification handling", () => {
		it("should display info notification for 'info' type", () => {
			useNotificationListenerStore();

			const notification = createNotificationMessage("info", "Hello from the server!");

			mockOnNotification?.(notification);

			expect(mockNotify).toHaveBeenCalledWith({
				status: notification.notification.type,
				text: notification.notification.messageOrKey,
				replace: notification.notification.arguments,
				autoClose: true,
			});
		});

		it("should display error notification for 'error' type", () => {
			useNotificationListenerStore();

			const notification = createNotificationMessage("error", "Something went wrong!");

			mockOnNotification?.(notification);

			expect(mockNotify).toHaveBeenCalledWith({
				status: notification.notification.type,
				text: notification.notification.messageOrKey,
				replace: notification.notification.arguments,
				autoClose: true,
			});
		});

		it("should ignore messages without 'live' type", () => {
			useNotificationListenerStore();

			mockOnNotification?.({
				type: "other",
				notification: {
					type: "info",
					arguments: ["Test"],
				},
			});

			expect(mockNotify).not.toHaveBeenCalled();
		});

		it("should ignore invalid notification format", () => {
			useNotificationListenerStore();

			mockOnNotification?.({ invalid: "data" });

			expect(mockNotify).not.toHaveBeenCalled();
		});

		it("should ignore notification with invalid type", () => {
			useNotificationListenerStore();

			mockOnNotification?.({
				type: "live",
				notification: {
					type: "warning", // not "note" or "error"
					arguments: ["Test"],
				},
			});

			expect(mockNotify).not.toHaveBeenCalled();
		});
	});
});
