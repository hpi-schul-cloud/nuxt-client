import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useBoardNotifier } from "@util-board";
import { nextTick } from "vue";

import { apiResponseErrorFactory } from "@@/tests/test-utils/factory/apiResponseErrorFactory";
import { axiosErrorFactory } from "@@/tests/test-utils/factory/axiosErrorFactory";
import { isAxiosError } from "axios";

import { useErrorHandler } from "./ErrorHandler.composable";
import { mountComposable } from "@@/tests/test-utils";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { notifierModule } from "@/store";

jest.mock("axios");
const mockedIsAxiosError = jest.mocked(isAxiosError);

jest.mock("@util-board");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

const mountErrorComposable = () => {
	return mountComposable(() => useErrorHandler(), {
		[I18N_KEY.valueOf()]: { t: (key: string) => key, tc: (key: string) => key },
		[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
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

	describe("handleError", () => {
		describe("when response payload is an object", () => {
			it("should call the custom error handler for code 404", () => {
				const { handleError } = setup();

				mockedIsAxiosError.mockReturnValueOnce(true);
				const errorResponse = mockErrorResponse();

				const handle404Mock = jest.fn();

				handleError(errorResponse, { 404: handle404Mock });

				expect(handle404Mock).toHaveBeenCalledTimes(1);
			});
		});
	});

	describe("notifyWithTemplate", () => {
		it("should return api error handler", async () => {
			const { notifyWithTemplate } = setup();

			const handler = notifyWithTemplate("notLoaded", "boardCard");
			await nextTick();

			expect(handler).toBeDefined();
			expect(typeof handler).toBe("function");
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
