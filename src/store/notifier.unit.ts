import NotifierModule from "./notifier";
import { AlertPayload } from "@store/types/alert-payload";

describe("notifier store", () => {
	describe("actions", () => {
		describe("show", () => {
			it("should call 'setNotifier' mutation", () => {
				const notifierModule = new NotifierModule({});
				const setNotifierMock = jest.spyOn(notifierModule, "setNotifier");
				const payload: AlertPayload = {
					text: "hello world",
					status: "success",
					timeout: 5000,
				};
				notifierModule.show(payload);

				expect(setNotifierMock).toHaveBeenCalledWith(payload);
			});
		});
	});

	describe("mutations", () => {
		describe("setNotifier", () => {
			it("should set the payload in state", () => {
				const notifierModule = new NotifierModule({});
				const payload: AlertPayload = {
					text: "hello world",
					status: "success",
					timeout: 5000,
				};
				notifierModule.setNotifier(payload);
				expect(notifierModule.notifier).toStrictEqual(payload);
			});
		});
	});
});
