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
});
