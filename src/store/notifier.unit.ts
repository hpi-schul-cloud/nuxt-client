import NotifierModule from "./notifier";
import { AlertPayload } from "@/store/types/alert-payload";

describe("notifier store", () => {
	describe("actions", () => {
		describe("show", () => {
			it("should call 'setNotifier' mutation", () => {
				const notifierModule = new NotifierModule({});
				const setNotifierMock = jest.spyOn(notifierModule, "setNotifier");
				const payload: AlertPayload = {
					text: "hello world",
					status: "success",
					autoClose: true,
					timeout: 5000,
				};
				notifierModule.show(payload);

				expect(setNotifierMock).toHaveBeenCalledWith(payload);
			});

			it("should add default values", () => {
				const notifierModule = new NotifierModule({});
				const setNotifierMock = jest.spyOn(notifierModule, "setNotifier");
				const payload: AlertPayload = {
					text: "hello world",
					status: "success",
					autoClose: true,
				};
				notifierModule.show(payload);

				const payloadWithDefaults: AlertPayload = {
					text: "hello world",
					status: "success",
					autoClose: true,
					timeout: 5000,
				};

				expect(setNotifierMock).toHaveBeenCalledWith(payloadWithDefaults);
			});

			it("should pass payload if optional params are set", () => {
				const notifierModule = new NotifierModule({});
				const setNotifierMock = jest.spyOn(notifierModule, "setNotifier");
				const payload: AlertPayload = {
					text: "hello world",
					status: "success",
					autoClose: false,
					timeout: 10000,
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
					autoClose: true,
					timeout: 5000,
				};
				notifierModule.setNotifier(payload);
				expect(notifierModule.notifier).toStrictEqual(payload);
			});
		});
	});
});
