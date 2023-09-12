import { useBoardNotifier } from "./BoardNotifier.composable";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import NotifierModule from "@/store/notifier";

const notifierModule = createModuleMocks(NotifierModule);

const setup = () => {
	return mountComposable(() => useBoardNotifier(), {
		[I18N_KEY.valueOf()]: { t: (key: string) => key },
		[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
	});
};

describe("BoardNotifications.composable", () => {
	beforeEach(() => {
		jest.clearAllMocks();
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
				timeout: 10000,
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

	describe("@resetNotifier method", () => {
		it("should call the notifier module", () => {
			const { resetNotifier } = setup();
			resetNotifier();

			expect(notifierModule.setNotifier).toHaveBeenCalled();
			expect(notifierModule.setNotifier).toHaveBeenCalledWith(undefined);
		});
	});
});
