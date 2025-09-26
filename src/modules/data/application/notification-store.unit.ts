import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia } from "pinia";

import { createTestingPinia } from "@pinia/testing";
import {
	notifyError,
	notifyInfo,
	notifySuccess,
	notifyWarning,
	useNotificationStore,
} from "./notification-store";

describe("useNotificationStore", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should add notification to store", () => {
		const store = useNotificationStore();

		store.notify({ text: "Test message", status: "success" });

		expect(store.notifierItems).toHaveLength(1);
		expect(store.notifierItems[0]).toMatchObject({
			text: "Test message",
			status: "success",
			autoClose: true,
			duration: 5000,
		});
	});

	it("should auto-remove notification after duration", () => {
		const store = useNotificationStore();
		store.notify({ text: "Test", status: "info", duration: 3000 });

		expect(store.notifierItems).toHaveLength(1);
		vi.advanceTimersByTime(3000);
		expect(store.notifierItems).toHaveLength(0);
	});

	it("should not auto-remove when autoClose is false", () => {
		const store = useNotificationStore();
		store.notify({ text: "Test", status: "error", autoClose: false });

		vi.advanceTimersByTime(10000);
		expect(store.notifierItems).toHaveLength(1);
	});

	it("should remove specific notification", () => {
		const store = useNotificationStore();
		store.notify({ text: "First", status: "info" });

		const alert = store.notifierItems[0];
		store.notify({ text: "Second", status: "success" });
		store.removeNotifier(alert);

		expect(store.notifierItems).toHaveLength(1);
		expect(store.notifierItems[0].text).toBe("Second");
	});

	it("should clear all notifications", () => {
		const store = useNotificationStore();

		store.notify({ text: "First", status: "info" });
		store.notify({ text: "Second", status: "error" });

		store.clearAll();

		expect(store.notifierItems).toHaveLength(0);
	});

	it("should return cleanup function from notify", () => {
		const store = useNotificationStore();
		const cleanup = store.notify({
			text: "Test",
			status: "success",
			autoClose: false,
		});

		expect(store.notifierItems).toHaveLength(1);
		cleanup();
		expect(store.notifierItems).toHaveLength(0);
	});
});

describe("notification helpers", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
	});

	it("should create success notification", () => {
		notifySuccess("Success message");

		const store = useNotificationStore();
		expect(store.notifierItems[0]).toMatchObject({
			text: "Success message",
			status: "success",
			autoClose: true,
		});
	});

	it("should create warning notification", () => {
		notifyWarning("Warning message");

		const store = useNotificationStore();
		expect(store.notifierItems[0]).toMatchObject({
			text: "Warning message",
			status: "warning",
		});
	});

	it("should create info notification", () => {
		notifyInfo("Info message");

		const store = useNotificationStore();
		expect(store.notifierItems[0]).toMatchObject({
			text: "Info message",
			status: "info",
		});
	});

	it("should create error notification", () => {
		notifyError("Error message", false);

		const store = useNotificationStore();
		expect(store.notifierItems[0]).toMatchObject({
			text: "Error message",
			status: "error",
			autoClose: false,
		});
	});
});
