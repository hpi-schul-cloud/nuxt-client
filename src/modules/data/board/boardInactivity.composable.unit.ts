import {
	boardResponseFactory,
	envsFactory,
	mockedPiniaStoreTyping,
	mountComposable,
} from "@@/tests/test-utils";
import {
	useBoardInactivity,
	connectionOptions,
} from "./boardInactivity.composable";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import NotifierModule from "@/store/notifier";
import { createModuleMocks } from "@/utils/mock-store-module";
import { computed, nextTick } from "vue";
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useBoardNotifier, useSharedLastCreatedElement } from "@util-board";
import setupStores from "@@/tests/test-utils/setupStores";
import EnvConfigModule from "@/store/env-config";
import { envConfigModule } from "@/store";
import { useBoardStore } from "./Board.store";
import { useCardStore } from "./Card.store";

jest.mock("vue-i18n", () => ({
	useI18n: () => ({
		t: jest.fn().mockImplementation((key) => key),
	}),
}));

const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

jest.mock("@util-board");
const mockUseSharedLastCreatedElement = jest.mocked(
	useSharedLastCreatedElement
);

jest.mock("@util-board/BoardNotifier.composable");
const mockUseBoardNotifier = jest.mocked(useBoardNotifier);

let mockBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
let boardStore: ReturnType<typeof useBoardStore>;
let cardStore: ReturnType<typeof useCardStore>;
let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
const envs = envsFactory.build({
	BOARD_COLLABORATION_URI: "mockedUri",
	FEATURE_COLUMN_BOARD_SOCKET_ENABLED: true,
});

jest.useFakeTimers();

describe("pageInactivity.composable", () => {
	setActivePinia(createTestingPinia());
	setupStores({ envConfigModule: EnvConfigModule });

	envConfigModule.setEnvs(envs);

	mockUseSharedLastCreatedElement.mockReturnValue({
		lastCreatedElementId: computed(() => "element-id"),
		resetLastCreatedElementId: jest.fn(),
	});

	mockBoardNotifierCalls = createMock<ReturnType<typeof useBoardNotifier>>();
	mockUseBoardNotifier.mockReturnValue(mockBoardNotifierCalls);

	mockedBoardNotifierCalls = createMock<ReturnType<typeof useBoardNotifier>>();
	mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

	const setup = (timer = 0) => {
		boardStore = mockedPiniaStoreTyping(useBoardStore);
		cardStore = mockedPiniaStoreTyping(useCardStore);
		boardStore.board = boardResponseFactory.build();
		cardStore.cards = {};
		return mountComposable(() => useBoardInactivity(timer), {
			global: {
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: createModuleMocks(NotifierModule),
				},
			},
		});
	};

	describe("usePageInactivity", () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});
		it("should call the store functions when isTimeoutReached value true", async () => {
			const useBoardInactivity = setup();
			connectionOptions.isTimeoutReached = true;
			useBoardInactivity.visibility.value = "hidden";
			await nextTick();

			useBoardInactivity.visibility.value = "visible";
			await nextTick();

			expect(boardStore.reloadBoard).toHaveBeenCalled();
			expect(cardStore.fetchCardRequest).toHaveBeenCalled();
		});

		it("should not call the store functions when isTimeoutReached value false", async () => {
			const useBoardInactivity = setup(3000);
			connectionOptions.isTimeoutReached = false;
			useBoardInactivity.visibility.value = "hidden";
			await nextTick();

			useBoardInactivity.visibility.value = "visible";
			await nextTick();

			expect(boardStore.reloadBoard).not.toHaveBeenCalled();
			expect(cardStore.fetchCardRequest).not.toHaveBeenCalled();
		});
	});

	describe("isTimeoutReached value", () => {
		beforeEach(() => {
			connectionOptions.isTimeoutReached = false;
			jest.clearAllMocks();
		});
		afterEach(() => {
			jest.clearAllTimers();
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
