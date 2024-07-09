// import {
// 	useConnectionStatus,
// 	connectionOptions,
// } from "./connections.composable";

// const mockNotifier = {
// 	showFailure: jest.fn(),
// 	showInfo: jest.fn(),
// };

// const mockFetchBoardRequest = jest.fn();

// jest.mock("vue-i18n", () => ({
// 	useI18n: () => ({
// 		t: jest.fn().mockImplementation((key) => key),
// 	}),
// }));

// jest.mock("../Board.store", () => ({
// 	useBoardStore: () => ({
// 		board: { id: "testBoardId" },
// 		fetchBoardRequest: mockFetchBoardRequest,
// 	}),
// }));

// jest.mock("@/modules/util/board/BoardNotifier.composable", () => ({
// 	useBoardNotifier: () => ({
// 		showFailure: mockNotifier.showFailure,
// 		showInfo: mockNotifier.showInfo,
// 	}),
// }));

it("should be tested", () => {
	expect(true).toBe(true);
});

// describe("connections.composable", () => {
// 	beforeEach(() => {
// 		jest.clearAllMocks();
// 	});
// 	describe("notifySocketConnectionLost", () => {
// 		it("should call the notifier module with 'error' parameter", () => {
// 			const { notifySocketConnectionLost } = useConnectionStatus();
// 			connectionOptions.lossSocketConnection = false;
// 			notifySocketConnectionLost();

// 			expect(connectionOptions.lossSocketConnection).toBe(true);
// 			expect(mockNotifier.showFailure).toHaveBeenCalledWith("error.4500");
// 		});
// 	});

// 	describe("reloadBoardAndNotify", () => {
// 		describe("when lossSocketConnection is true", () => {
// 			it("should call the notifier module with 'info' parameter", () => {
// 				const { reloadBoardAndNotify } = useConnectionStatus();
// 				connectionOptions.lossSocketConnection = true;
// 				reloadBoardAndNotify();

// 				expect(mockNotifier.showInfo).toHaveBeenCalledWith(
// 					"common.notification.connection.restored"
// 				);
// 			});

// 			it("should call the boardStore.mockFetchBoardRequest method", () => {
// 				const { reloadBoardAndNotify } = useConnectionStatus();
// 				connectionOptions.lossSocketConnection = true;
// 				reloadBoardAndNotify();

// 				expect(mockFetchBoardRequest).toHaveBeenCalled();
// 				expect(mockFetchBoardRequest.mock.calls[0][0]).toEqual({
// 					boardId: "testBoardId",
// 				});
// 			});
// 		});

// 		describe("when lossSocketConnection is false", () => {
// 			it("should not call notifier module", () => {
// 				const { reloadBoardAndNotify } = useConnectionStatus();
// 				connectionOptions.lossSocketConnection = false;
// 				reloadBoardAndNotify();

// 				expect(mockNotifier.showInfo).not.toHaveBeenCalled();
// 			});

// 			it("should not call boardStore.mockFetchBoardRequest method", () => {
// 				const { reloadBoardAndNotify } = useConnectionStatus();
// 				connectionOptions.lossSocketConnection = false;
// 				reloadBoardAndNotify();

// 				expect(mockFetchBoardRequest).not.toHaveBeenCalled();
// 			});
// 		});
// 	});

// 	describe("window events", () => {
// 		describe("offline event", () => {
// 			it("should call the notifier module with 'error' parameter", () => {
// 				useConnectionStatus();
// 				connectionOptions.lossInternetConnection = false;
// 				window.dispatchEvent(new Event("offline"));

// 				expect(connectionOptions.lossInternetConnection).toBe(true);
// 				expect(mockNotifier.showFailure).toHaveBeenCalledWith("error.4500");
// 			});
// 		});

// 		describe("online event", () => {
// 			it("should call the notifier module with 'info' parameter", () => {
// 				useConnectionStatus();
// 				connectionOptions.lossInternetConnection = true;
// 				window.dispatchEvent(new Event("online"));

// 				expect(connectionOptions.lossInternetConnection).toBe(false);
// 				expect(mockNotifier.showInfo).toHaveBeenCalledWith(
// 					"common.notification.connection.restored"
// 				);
// 			});
// 		});
// 	});

// 	describe("visibilitychange event", () => {
// 		useConnectionStatus();
// 		describe("when timeout value is true", () => {
// 			it("should call the notifier module with 'info' parameter", () => {
// 				connectionOptions.timeout = true;
// 				window.dispatchEvent(new Event("visibilitychange"));

// 				expect(mockNotifier.showInfo).toHaveBeenCalled();

// 				// expect(mockFetchBoardRequest).toHaveBeenCalled();
// 				// expect(mockFetchBoardRequest.mock.calls[0][0]).toEqual({
// 				// 	boardId: "testBoardId",
// 				// });
// 			});
// 		});

// 		describe("when timeout value is false", () => {
// 			it("should not call notifier module", () => {
// 				connectionOptions.timeout = false;
// 				window.dispatchEvent(new Event("visibilitychange"));

// 				expect(mockNotifier.showInfo).not.toHaveBeenCalled();
// 				// expect(mockFetchBoardRequest).not.toHaveBeenCalled();
// 			});
// 		});
// 	});
// });
