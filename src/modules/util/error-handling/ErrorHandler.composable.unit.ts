import { ErrorType, useErrorHandler } from "./ErrorHandler.composable";
import { expectNotification, mountComposable } from "@@/tests/test-utils";
import { apiResponseErrorFactory } from "@@/tests/test-utils/factory/apiResponseErrorFactory";
import { axiosErrorFactory } from "@@/tests/test-utils/factory/axiosErrorFactory";
import { useNotificationStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { logger } from "@util-logger";
import { isAxiosError } from "axios";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { nextTick } from "vue";

vi.mock("axios");
const mockedIsAxiosError = vi.mocked(isAxiosError);

const missingErrorKey = "components.board.notifications.errors.missingErrorKey";
vi.mock("vue-i18n", () => ({
	useI18n: vi.fn().mockReturnValue({
		t: vi.fn().mockImplementation((key: string) => (key === missingErrorKey ? undefined : key)),
	}),
}));

const mockErrorResponse = (code = 404, message = "NOT FOUND") => {
	const expectedPayload = apiResponseErrorFactory.build({ code, message });

	return axiosErrorFactory.build({
		response: { data: expectedPayload },
	});
};

describe("ErrorHandler.Composable", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const setup = () => mountComposable(() => useErrorHandler());

	describe("handleError", () => {
		describe("when custom error handler for 404 is defined", () => {
			it("should call this custom error handler for code 404", () => {
				const { handleError } = setup();

				mockedIsAxiosError.mockReturnValueOnce(true);
				const errorResponse = mockErrorResponse();

				const handle404Mock = vi.fn();

				handleError(errorResponse, { 404: handle404Mock });

				expect(handle404Mock).toHaveBeenCalledTimes(1);
			});
		});

		describe("when no errorHandler for the code of the error is defined", () => {
			it("should fall back to console.error", () => {
				const { handleError } = setup();
				const spy = vi.fn();
				logger.error = spy;

				mockedIsAxiosError.mockReturnValueOnce(true);
				const errorResponse = mockErrorResponse(99999, "undefined error type");

				handleError(errorResponse);

				expect(spy).toHaveBeenCalledTimes(1);
				spy.mockRestore();
			});
		});
	});

	describe("handleAnyError", () => {
		describe("when an error is handled", () => {
			it("should execute the callback for any error", () => {
				const { handleAnyError } = setup();

				mockedIsAxiosError.mockReturnValueOnce(true);
				const errorResponse = mockErrorResponse();

				const handleCallbackMock = vi.fn();

				handleAnyError(errorResponse, handleCallbackMock);

				expect(handleCallbackMock).toHaveBeenCalledTimes(1);
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

				expectNotification("error");
			});
		});

		describe("when error key does not exist", () => {
			it("should use a generic error message", async () => {
				const { notifyWithTemplate } = setup();

				const handler = notifyWithTemplate("missingErrorKey" as ErrorType);
				handler();
				await nextTick();

				expect(useNotificationStore().notify).toHaveBeenCalledWith(
					expect.objectContaining({ status: "error", text: "error.generic" })
				);
			});
		});
	});

	describe("@generateErrorText", () => {
		it("should return i18n keys", () => {
			const { generateErrorText } = setup();

			const i18nCreateErrorKey = generateErrorText("notCreated", "board");
			expect(i18nCreateErrorKey).toBe("components.board.notifications.errors.notCreated");

			const i18nReadErrorKey = generateErrorText("notLoaded", "boardColumn");
			expect(i18nReadErrorKey).toBe("components.board.notifications.errors.notLoaded");

			const i18nUpdateErrorKey = generateErrorText("notUpdated", "boardCard");
			expect(i18nUpdateErrorKey).toBe("components.board.notifications.errors.notUpdated");

			const i18nDeleteErrorKey = generateErrorText("notDeleted", "boardElement");
			expect(i18nDeleteErrorKey).toBe("components.board.notifications.errors.notDeleted");
		});
	});

	describe("notifySocketError", () => {
		it("should show a notification", async () => {
			const { notifySocketError } = setup();

			notifySocketError("notCreated", "board", "error", 5000);
			await nextTick();

			expectNotification("error");
		});

		it.each(["notCreated", "notUpdated", "notDeleted", "notLoaded"])("should return i18n keys of %s", (key) => {
			const { notifySocketError } = setup();
			notifySocketError(key as ErrorType, "board");

			expect(useNotificationStore().notify).toHaveBeenCalledWith(
				expect.objectContaining({
					status: "error",
					text: `components.board.notifications.errors.${key}`,
				})
			);
		});
	});
});
