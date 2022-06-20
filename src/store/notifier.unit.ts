import NotifierModule from "./notifier";

describe("notifier store", () => {
	describe("actions", () => {
		describe("show", () => {
			it("should call 'setNotifier' mutation", () => {
				const notifierModule = new NotifierModule({});
				const setNotifierMock = jest.spyOn(notifierModule, "setNotifier");
				const payload = {
					text: "hello world",
					status: "success",
					position: ["top", "left"],
					timeout: 5000,
					vertical: true,
					multiline: true,
					closeButtonColor: "black",
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
				const payload = {
					text: "hello world",
					status: "success",
					position: ["top", "left"],
					timeout: 5000,
				};
				notifierModule.setNotifier(payload);
				expect(notifierModule.notifier).toStrictEqual(payload);
			});
		});
	});
});
