import { mountComposable } from "@@/tests/test-utils";
import {
	useConnectionStatus,
	connectionOptions,
} from "./connections.composable";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";

const mocks = {
	notifier: {
		showFailure: jest.fn(),
		showInfo: jest.fn(),
		show: jest.fn(),
		reset: jest.fn(),
	},
	i18n: { t: jest.fn() },
	boardStore: {
		fetchBoardRequest: jest.fn(),
	},
	useTimeoutFn: {
		start: jest.fn(),
		stop: jest.fn(),
		isPending: false,
	},
};

jest.mock("vue-i18n", () => ({
	useI18n: () => ({
		t: mocks.i18n.t,
	}),
}));

jest.mock("../Board.store", () => ({
	useBoardStore: () => ({
		board: { id: 1 },
		fetchBoardRequest: mocks.boardStore.fetchBoardRequest,
	}),
}));

jest.mock("@vueuse/core", () => {
	return {
		...jest.requireActual("@vueuse/core"),
		useTimeoutFn: jest.fn().mockReturnValue({
			start: () => mocks.useTimeoutFn.start,
			stop: () => mocks.useTimeoutFn.stop,
			isPending: () => mocks.useTimeoutFn.isPending,
		}),
	};
});

const setup = () => {
	return mountComposable(() => useConnectionStatus(), {
		global: {
			provide: {
				[NOTIFIER_MODULE_KEY.valueOf()]: {
					show: mocks.notifier.show,
					reset: mocks.notifier.reset,
				},
			},
		},
	});
};

describe("connections.composable", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	describe("notifySocketConnectionLost", () => {
		it("should call the notifier module with 'error' parameter", () => {
			const { notifySocketConnectionLost } = setup();
			connectionOptions.lossSocketConnection = false;
			notifySocketConnectionLost();

			expect(connectionOptions.lossSocketConnection).toBe(true);
			expect(mocks.notifier.show).toHaveBeenCalled();
			expect(mocks.notifier.show.mock.calls[0][0].status).toBe("error");
		});
	});

	describe("reloadBoardAndNotify", () => {
		describe("when lossSocketConnection is true", () => {
			it("should call the notifier module with 'info' parameter", () => {
				const { reloadBoardAndNotify } = setup();
				connectionOptions.lossSocketConnection = true;
				reloadBoardAndNotify();

				expect(mocks.notifier.show).toHaveBeenCalled();
				expect(mocks.notifier.show.mock.calls[0][0].status).toBe("info");
			});

			it("should call the boardStore.fetchBoardRequest method", () => {
				const { reloadBoardAndNotify } = setup();
				connectionOptions.lossSocketConnection = true;
				reloadBoardAndNotify();

				expect(mocks.boardStore.fetchBoardRequest).toHaveBeenCalled();
			});
		});

		describe("when lossSocketConnection is false", () => {
			it("should not call notifier module", () => {
				const { reloadBoardAndNotify } = setup();
				connectionOptions.lossSocketConnection = false;
				reloadBoardAndNotify();

				expect(mocks.notifier.show).not.toHaveBeenCalled();
			});

			it("should not call boardStore.fetchBoardRequest method", () => {
				const { reloadBoardAndNotify } = setup();
				connectionOptions.lossSocketConnection = false;
				reloadBoardAndNotify();

				expect(mocks.boardStore.fetchBoardRequest).not.toHaveBeenCalled();
			});
		});
	});

	describe("window events", () => {
		describe("offline event", () => {
			it("should call the notifier module with 'error' parameter", () => {
				setup();
				connectionOptions.lossInternetConnection = false;
				window.dispatchEvent(new Event("offline"));

				expect(connectionOptions.lossInternetConnection).toBe(true);
				expect(mocks.notifier.show).toHaveBeenCalled();
				expect(mocks.notifier.show.mock.calls[0][0].status).toBe("error");
			});
		});

		describe("online event", () => {
			it("should call the notifier module with 'info' parameter", () => {
				setup();
				connectionOptions.lossInternetConnection = true;
				window.dispatchEvent(new Event("online"));

				expect(connectionOptions.lossInternetConnection).toBe(false);
				expect(mocks.notifier.show).toHaveBeenCalled();
				expect(mocks.notifier.show.mock.calls[0][0].status).toBe("info");
			});
		});
	});

	describe("visibilitychange event", () => {
		describe("when timeout value is true", () => {
			it("should call the notifier module with 'info' parameter", () => {
				setup();
				connectionOptions.timeout = true;
				window.dispatchEvent(new Event("visibilitychange"));

				expect(mocks.notifier.show).toHaveBeenCalled();
				expect(mocks.notifier.show.mock.calls[0][0].status).toBe("info");
			});
		});

		describe("when timeout value is false", () => {
			it("should not call notifier module", () => {
				setup();
				connectionOptions.timeout = false;
				window.dispatchEvent(new Event("visibilitychange"));

				expect(mocks.notifier.show).not.toHaveBeenCalled();
			});
		});
	});
});
