import { useBoardNotifier } from "./BoardNotifications.composable";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import NotifierModule from "@/store/notifier";

const notifierModule = createModuleMocks(NotifierModule);

const setup = () => {
	return mountComposable(() => useBoardNotifier(), {
		[I18N_KEY as symbol]: { t: (key: string) => key },
		[NOTIFIER_MODULE_KEY as symbol]: notifierModule,
	});
};

describe("BoardNotifications.composable", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("@isErrorCode", () => {
		describe("when statusCode above 300", () => {
			it("should return true", () => {
				const { isErrorCode } = setup();
				const errorCodeStatus = isErrorCode(300);

				expect(errorCodeStatus).toBe(true);
			});
		});
		describe("when statusCode below 300", () => {
			it("should return false", () => {
				const { isErrorCode } = setup();
				const errorCodeStatus = isErrorCode(204);

				expect(errorCodeStatus).toBe(false);
			});
		});
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
			showCustomNotifier(expectedCallObject.text, expectedCallObject.status);

			expect(notifierModule.show).toHaveBeenCalled();
			expect(notifierModule.show).toHaveBeenCalledWith(expectedCallObject);
		});
	});

	describe("@generateErrorText", () => {
		it("should return i18n keys", () => {
			const { generateErrorText } = setup();
			const i18nCreateErrorKey = generateErrorText("create", "board");
			expect(i18nCreateErrorKey).toBe(
				"components.board.notifications.errors.notCreated"
			);

			const i18nReadErrorKey = generateErrorText("read", "boardColumn");
			expect(i18nReadErrorKey).toBe(
				"components.board.notifications.errors.notLoaded"
			);

			const i18nUpdateErrorKey = generateErrorText("update", "boardCard");
			expect(i18nUpdateErrorKey).toBe(
				"components.board.notifications.errors.notUpdated"
			);

			const i18nDeleteErrorKey = generateErrorText("delete", "boardElement");
			expect(i18nDeleteErrorKey).toBe(
				"components.board.notifications.errors.notDeleted"
			);
		});
	});
});
