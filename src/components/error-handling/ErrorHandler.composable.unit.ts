import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useBoardNotifier } from "@util-board";
import { nextTick } from "vue";

import { apiResponseErrorFactory } from "@@/tests/test-utils/factory/apiResponseErrorFactory";
import { axiosErrorFactory } from "@@/tests/test-utils/factory/axiosErrorFactory";
import { isAxiosError } from "axios";

import { useErrorHandler } from "./ErrorHandler.composable";
import { mountComposable } from "@@/tests/test-utils";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { notifierModule } from "@/store";

jest.mock("axios");
const mockedIsAxiosError = jest.mocked(isAxiosError);

jest.mock("@util-board");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);
const keys = [
	"components.board.notifications.errors.notCreated",
	"components.board.notifications.errors.notLoaded",
	"components.board.notifications.errors.notUpdated",
	"components.board.notifications.errors.notDeleted",
];
const translationMap: Record<string, string> = {};

keys.forEach((key) => (translationMap[key] = key));

jest.mock("vue-i18n", () => {
	return {
		...jest.requireActual("vue-i18n"),
		useI18n: jest.fn().mockReturnValue({
			t: (key: string) => key,
			tc: (key: string) => key,
			te: (key: string) => translationMap[key] !== undefined,
		}),
	};
});

const mountErrorComposable = () => {
	return mountComposable(() => useErrorHandler(), {
		global: {
			provide: {
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
			},
		},
	});
};

const mockErrorResponse = (code = 404, message = "NOT FOUND") => {
	const expectedPayload = apiResponseErrorFactory.build({ code, message });
	const errorResponse = axiosErrorFactory.build({
		response: { data: expectedPayload },
	});

	return errorResponse;
};

describe("ErrorHandler.Composable", () => {
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	const setup = () => {
		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

		return mountErrorComposable();
	};

	beforeEach(() => {
		keys.forEach((key) => (translationMap[key] = key));
	});

	describe("handleError", () => {
		describe("when custom error handler for 404 is defined", () => {
			it("should call this custom error handler for code 404", () => {
				const { handleError } = setup();

				mockedIsAxiosError.mockReturnValueOnce(true);
				const errorResponse = mockErrorResponse();

				const handle404Mock = jest.fn();

				handleError(errorResponse, { 404: handle404Mock });

				expect(handle404Mock).toHaveBeenCalledTimes(1);
			});
		});

		describe("when no errorHandler for the code of the error is defined", () => {
			it("should fall back to console.error", async () => {
				const consoleErrorSpy = jest
					.spyOn(console, "error")
					.mockImplementation();
				const { handleError } = setup();

				mockedIsAxiosError.mockReturnValueOnce(true);
				const errorResponse = mockErrorResponse(99999, "undefined error type");

				handleError(errorResponse);

				expect(consoleErrorSpy).toHaveBeenCalledTimes(1);

				consoleErrorSpy.mockRestore();
			});
		});
	});

	describe("notifyWithTemplate", () => {
		describe("when everything is normal", () => {
			it("should return api error handler", async () => {
				const { notifyWithTemplate } = setup();

				const handler = notifyWithTemplate("notLoaded", "boardCard");
				await nextTick();

				expect(handler).toBeDefined();
				expect(typeof handler).toBe("function");
			});

			it("should show notification", async () => {
				const { notifyWithTemplate } = setup();

				const handler = notifyWithTemplate("notLoaded", "boardCard");
				handler();
				await nextTick();

				expect(mockedBoardNotifierCalls.showCustomNotifier).toHaveBeenCalled();
			});
		});

		describe("when error key does not exist", () => {
			it("should use a generic error message", async () => {
				const { notifyWithTemplate } = setup();
				delete translationMap[
					"components.board.notifications.errors.notCreated"
				];

				const handler = notifyWithTemplate("notCreated");
				handler();
				await nextTick();

				expect(
					mockedBoardNotifierCalls.showCustomNotifier
				).toHaveBeenCalledWith("error.generic", "error", undefined);
			});
		});
	});

	describe("@generateErrorText", () => {
		it("should return i18n keys", () => {
			const { generateErrorText } = setup();

			const i18nCreateErrorKey = generateErrorText("notCreated", "board");
			expect(i18nCreateErrorKey).toBe(
				"components.board.notifications.errors.notCreated"
			);

			const i18nReadErrorKey = generateErrorText("notLoaded", "boardColumn");
			expect(i18nReadErrorKey).toBe(
				"components.board.notifications.errors.notLoaded"
			);

			const i18nUpdateErrorKey = generateErrorText("notUpdated", "boardCard");
			expect(i18nUpdateErrorKey).toBe(
				"components.board.notifications.errors.notUpdated"
			);

			const i18nDeleteErrorKey = generateErrorText(
				"notDeleted",
				"boardElement"
			);
			expect(i18nDeleteErrorKey).toBe(
				"components.board.notifications.errors.notDeleted"
			);
		});
	});
});
