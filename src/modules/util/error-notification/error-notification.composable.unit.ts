import { expectNotification, mountComposable } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { nextTick, ref } from "vue";
import { useErrorNotification } from "./error-notification.composable";
import { beforeEach } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { useNotificationStore } from "@data-app";

describe("useErrorNotification.composable", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const setupComposable = () => {
		const error = ref();

		mountComposable(() => useErrorNotification(error), {
			global: {
				plugins: [createTestingI18n()],
			},
		});

		return {
			error,
		};
	};

	describe("when no error is set", () => {
		it("should not show a notification", async () => {
			const { error } = setupComposable();

			error.value = null;
			await nextTick();

			expect(useNotificationStore().notify).not.toHaveBeenCalled();
		});
	});

	describe("when an error is set", () => {
		it("should show a notification", async () => {
			const { error } = setupComposable();

			error.value = new Error("test");
			await nextTick();

			expectNotification("error");
		});
	});

	describe("when the error changes", () => {
		it("should show a notification", async () => {
			const { error } = setupComposable();

			error.value = new Error("test1");
			await nextTick();

			error.value = new Error("test2");
			await nextTick();

			expect(useNotificationStore().notify).toHaveBeenCalledTimes(2);
		});
	});
});
