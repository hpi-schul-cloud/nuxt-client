import NotifierModule from "./notifier";
import { AlertPayload } from "@/store/types/alert-payload";

describe("notifier store", () => {
	describe("actions", () => {
		describe("show", () => {
			it("should call 'addNotifier' mutation", () => {
				const notifierModule = new NotifierModule({});
				const addNotifierMock = vi.spyOn(notifierModule, "addNotifier");
				const payload: AlertPayload = {
					text: "hello world",
					status: "success",
					autoClose: true,
					timeout: 5000,
				};
				notifierModule.show(payload);

				expect(addNotifierMock).toHaveBeenCalledWith(payload);
			});

			it("should add default values", () => {
				const notifierModule = new NotifierModule({});
				const addNotifierMock = vi.spyOn(notifierModule, "addNotifier");
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

				expect(addNotifierMock).toHaveBeenCalledWith(payloadWithDefaults);
			});

			it("should pass payload if optional params are set", () => {
				const notifierModule = new NotifierModule({});
				const addNotifierMock = vi.spyOn(notifierModule, "addNotifier");
				const payload: AlertPayload = {
					text: "hello world",
					status: "success",
					autoClose: false,
					timeout: 5000,
				};
				notifierModule.show(payload);

				expect(addNotifierMock).toHaveBeenCalledWith(payload);
			});

			it("should call removeNotifier when timeout reached", () => {
				vi.useFakeTimers();
				const notifierModule = new NotifierModule({});
				const addNotifierMock = vi.spyOn(notifierModule, "addNotifier");
				const removeNotifierMock = vi.spyOn(notifierModule, "removeNotifier");
				const payload: AlertPayload = {
					text: "hello world",
					status: "success",
					autoClose: true,
					timeout: 1000,
				};
				notifierModule.show(payload);

				expect(addNotifierMock).toHaveBeenCalledWith(payload);
				vi.advanceTimersByTime(1000);
				expect(removeNotifierMock).toHaveBeenCalledWith(payload);
			});
		});
	});

	describe("mutations", () => {
		describe("addNotifier", () => {
			it("should set the payload in state", () => {
				const notifierModule = new NotifierModule({});
				const payload: AlertPayload = {
					text: "hello world",
					status: "success",
					autoClose: true,
					timeout: 5000,
				};
				notifierModule.addNotifier(payload);
				expect(notifierModule.notifierItems).toStrictEqual([payload]);
			});

			it("should place new alerts as first element", () => {
				const notifierModule = new NotifierModule({});
				const payloadOne: AlertPayload = {
					text: "hello world",
					status: "success",
					autoClose: true,
					timeout: 5000,
				};
				const payloadTwo: AlertPayload = {
					text: "hello bar",
					status: "success",
					autoClose: true,
					timeout: 5000,
				};
				notifierModule.addNotifier(payloadOne);
				notifierModule.addNotifier(payloadTwo);
				expect(notifierModule.notifierItems).toStrictEqual([payloadTwo, payloadOne]);
			});
		});

		describe("removeNotifier", () => {
			it("should remove the payload in state", () => {
				const notifierModule = new NotifierModule({});
				const payload: AlertPayload = {
					text: "hello world",
					status: "success",
					autoClose: true,
					timeout: 5000,
				};
				const anotherPayload: AlertPayload = {
					text: "hello another world",
					status: "success",
					autoClose: true,
					timeout: 5000,
				};
				notifierModule.addNotifier(payload);
				notifierModule.addNotifier(anotherPayload);
				expect(notifierModule.notifierItems).toStrictEqual([anotherPayload, payload]);
				notifierModule.removeNotifier(payload);
				expect(notifierModule.notifierItems).toStrictEqual([anotherPayload]);
			});
		});

		describe("reset", () => {
			it("should reset the state", () => {
				const notifierModule = new NotifierModule({});
				const payload: AlertPayload = {
					text: "hello world",
					status: "success",
					autoClose: true,
					timeout: 5000,
				};
				const anotherPayload: AlertPayload = {
					text: "hello another world",
					status: "success",
					autoClose: true,
					timeout: 5000,
				};
				notifierModule.addNotifier(payload);
				notifierModule.addNotifier(anotherPayload);
				expect(notifierModule.notifierItems).toStrictEqual([anotherPayload, payload]);
				notifierModule.reset();
				expect(notifierModule.notifierItems).toStrictEqual([]);
			});
		});
	});
});
