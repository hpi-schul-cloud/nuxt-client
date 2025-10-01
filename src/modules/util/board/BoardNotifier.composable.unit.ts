import { useBoardNotifier } from "./BoardNotifier.composable";
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { mountComposable } from "@@/tests/test-utils/mountComposable";

const notifierModule = createModuleMocks(NotifierModule);

const setup = () =>
	mountComposable(() => useBoardNotifier(), {
		global: {
			provide: { [NOTIFIER_MODULE_KEY.valueOf()]: notifierModule },
		},
	});

describe("BoardNotifications.composable", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("@showSuccess method", () => {
		it("should call the notifier module", () => {
			const { showSuccess } = setup();
			const expectedCallObject = {
				text: "test-text",
				status: "success",
				autoClose: true,
			};
			showSuccess(expectedCallObject.text);

			expect(notifierModule.show).toHaveBeenCalled();
			expect(notifierModule.show).toHaveBeenCalledWith(expectedCallObject);
		});
	});

	describe("@showFailure method", () => {
		it("should call the notifier module", () => {
			const { showFailure } = setup();
			const expectedCallObject = {
				text: "test-text",
				status: "error",
				timeout: 5000,
			};
			showFailure(expectedCallObject.text);

			expect(notifierModule.show).toHaveBeenCalled();
			expect(notifierModule.show).toHaveBeenCalledWith(expectedCallObject);
		});
	});

	describe("@showInfo method", () => {
		it("should call the notifier module", () => {
			const { showInfo } = setup();
			const expectedCallObject = {
				text: "test-text",
				status: "info",
				autoClose: true,
			};
			showInfo(expectedCallObject.text);

			expect(notifierModule.show).toHaveBeenCalled();
			expect(notifierModule.show).toHaveBeenCalledWith(expectedCallObject);
		});
	});

	describe("@showCustomNotifier method", () => {
		it("should call the notifier module", () => {
			const { showCustomNotifier } = setup();
			const expectedCallObject = {
				text: "custom-text",
				status: "warning",
				timeout: 5000,
			};
			showCustomNotifier(expectedCallObject.text, "warning");

			expect(notifierModule.show).toHaveBeenCalled();
			expect(notifierModule.show).toHaveBeenCalledWith(expectedCallObject);
		});
	});
});
