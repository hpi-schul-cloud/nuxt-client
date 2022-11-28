import ApplicationErrorModule from "./application-error";
import {HttpStatusCode} from "@store/types/http-status-code.enum";

const errorModule = new ApplicationErrorModule({});
describe("ApplicationErrorModule store", () => {
	beforeEach(() => {});
	describe("actions", () => {
		describe("setError", () => {
			it("should set the state", () => {
				const setErrorMock = jest.spyOn(errorModule, "setError");
				const payload = {
					statusCode: HttpStatusCode.Unauthorized,
					translationKey: "funny error key",
				};
				errorModule.setError(payload);

				expect(setErrorMock).toHaveBeenCalledWith(payload);
			});

			it("should call the mutations", () => {
				const setStatusCodeMock = jest.spyOn(errorModule, "setStatusCode");
				const setTranslationKeyMock = jest.spyOn(
					errorModule,
					"setTranslationKey"
				);
				const payload = {
					statusCode: HttpStatusCode.Unauthorized,
					translationKey: "funny error key",
				};
				errorModule.setError(payload);

				expect(setStatusCodeMock).toHaveBeenCalledWith(401);
				expect(setTranslationKeyMock).toHaveBeenCalledWith("funny error key");
			});
		});

		describe("resetError", () => {
			it("should set the state", () => {
				const resetErrorMock = jest.spyOn(errorModule, "resetError");
				errorModule.resetError();

				expect(resetErrorMock).toHaveBeenCalled();
			});

			it("should call the mutations", () => {
				const setStatusCodeMock = jest.spyOn(errorModule, "setStatusCode");
				const setTranslationKeyMock = jest.spyOn(
					errorModule,
					"setTranslationKey"
				);
				errorModule.resetError();

				expect(setStatusCodeMock).toHaveBeenCalledWith(null);
				expect(setTranslationKeyMock).toHaveBeenCalledWith("");
			});
		});
	});

	describe("mutations", () => {
		it("should set the states", () => {
			const payload = {
				statusCode: HttpStatusCode.Unauthorized,
				translationKey: "funny error key",
			};
			errorModule.setStatusCode(payload.statusCode);
			errorModule.setTranslationKey(payload.translationKey);

			expect(errorModule.getStatusCode).toStrictEqual(payload.statusCode);
			expect(errorModule.getTranslationKey).toStrictEqual(
				payload.translationKey
			);
		});
	});
});
