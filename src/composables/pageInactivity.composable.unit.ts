import { mountComposable } from "@@/tests/test-utils";
import {
	usePageInactivity,
	connectionOptions,
} from "./pageInactivity.composable";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import NotifierModule from "@/store/notifier";
import { createModuleMocks } from "@/utils/mock-store-module";
import { useBoardNotifier } from "@util-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { nextTick } from "vue";

const notifierModule = createModuleMocks(NotifierModule);

jest.mock("@util-board");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

jest.mock("vue-i18n", () => ({
	useI18n: () => ({
		t: jest.fn().mockImplementation((key) => key),
	}),
}));

describe("pageInactivity.composable", () => {
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	const setup = (timer = 100) => {
		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

		const composable = mountComposable(() => usePageInactivity(timer), {
			global: {
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			},
		});

		return { composable };
	};
	beforeEach(() => {
		jest.clearAllMocks();
		jest.useFakeTimers();
	});

	describe("usePageInactivity", () => {
		it("should call the notifier module with 'info' parameter", async () => {
			const { composable } = setup(3000);
			connectionOptions.isTimeoutReached = true;
			composable.visibility.value = "hidden";
			await nextTick();

			composable.visibility.value = "visible";
			await nextTick();

			expect(mockedBoardNotifierCalls.showInfo).toHaveBeenCalledWith(
				"common.notification.reload.page"
			);
		});

		it("should not call the notifier module", async () => {
			const { composable } = setup(3000);
			connectionOptions.isTimeoutReached = false;
			composable.visibility.value = "hidden";
			await nextTick();

			composable.visibility.value = "visible";
			await nextTick();

			expect(mockedBoardNotifierCalls.showInfo).not.toHaveBeenCalled();
		});
	});

	describe("isTimeoutReached value", () => {
		beforeEach(() => {
			connectionOptions.isTimeoutReached = false;
		});
		it("should be changed after MAX_TIMEOUT_FOR_INACTIVITY is achieved", async () => {
			setup(3000);
			expect(connectionOptions.isTimeoutReached).toBe(false);
			jest.advanceTimersByTime(3000);
			expect(connectionOptions.isTimeoutReached).toBe(true);
		});

		it("should not be changed after MAX_TIMEOUT_FOR_INACTIVITY is not achieved", async () => {
			setup(3000);
			expect(connectionOptions.isTimeoutReached).toBe(false);
			jest.advanceTimersByTime(1000);
			expect(connectionOptions.isTimeoutReached).toBe(false);
		});
	});
});
