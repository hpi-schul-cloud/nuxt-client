import { useErrorNotification } from "./error-notification.composable";
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { mountComposable } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { nextTick, ref } from "vue";

describe("useErrorNotification.composable", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	const setupComposable = () => {
		const notifierModule = createModuleMocks(NotifierModule);

		const error = ref();

		mountComposable(() => useErrorNotification(error), {
			global: {
				plugins: [createTestingI18n()],
				provide: { [NOTIFIER_MODULE_KEY.valueOf()]: notifierModule },
			},
		});

		return {
			error,
			notifierModule,
		};
	};

	describe("when no error is set", () => {
		it("should not show a notification", async () => {
			const { error, notifierModule } = setupComposable();

			error.value = null;
			await nextTick();

			expect(notifierModule.show).not.toHaveBeenCalled();
		});
	});

	describe("when an error is set", () => {
		it("should show a notification", async () => {
			const { error, notifierModule } = setupComposable();

			error.value = new Error("test");
			await nextTick();

			expect(notifierModule.show).toHaveBeenCalledWith({
				status: "error",
				text: "error.generic",
			});
		});
	});

	describe("when the error changes", () => {
		it("should show a notification", async () => {
			const { error, notifierModule } = setupComposable();

			error.value = new Error("test1");
			await nextTick();

			error.value = new Error("test2");
			await nextTick();

			expect(notifierModule.show).toHaveBeenCalledTimes(2);
		});
	});
});
