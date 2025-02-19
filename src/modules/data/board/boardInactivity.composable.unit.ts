import { envConfigModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	boardResponseFactory,
	envsFactory,
	mockedPiniaStoreTyping,
	mountComposable,
} from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { createTestingPinia } from "@pinia/testing";
import { useBoardNotifier, useSharedLastCreatedElement } from "@util-board";
import { setActivePinia } from "pinia";
import { computed, nextTick } from "vue";
import { Router, useRouter } from "vue-router";
import { useBoardStore } from "./Board.store";
import {
	connectionOptions,
	useBoardInactivity,
} from "./boardInactivity.composable";
import { useCardStore } from "./Card.store";
import { useSocketConnection } from "./socket/socket";

jest.mock("vue-i18n", () => ({
	useI18n: () => ({
		t: jest.fn().mockImplementation((key) => key),
	}),
}));

const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

jest.mock("./socket/socket");
const mockedUseSocketConnection = jest.mocked(useSocketConnection);

jest.mock("vue-router");
const useRouterMock = <jest.Mock>useRouter;

jest.mock("@util-board/BoardNotifier.composable");
jest.mock("@util-board/LastCreatedElement.composable");
const mockUseBoardNotifier = jest.mocked(useBoardNotifier);
const mockUseSharedLastCreatedElement = jest.mocked(
	useSharedLastCreatedElement
);

let mockBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
let mockedSocketConnectionHandler: DeepMocked<
	ReturnType<typeof useSocketConnection>
>;
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

	mockedSocketConnectionHandler =
		createMock<ReturnType<typeof useSocketConnection>>();
	mockedUseSocketConnection.mockReturnValue(mockedSocketConnectionHandler);

	const router = createMock<Router>();
	useRouterMock.mockReturnValue(router);

	const setup = (timer = 0) => {
		const boardStore = useBoardStore();
		const cardStore = useCardStore();
		boardStore.board = boardResponseFactory.build();
		cardStore.cards = {};

		const useBoardInactivityComposable = mountComposable(
			() => useBoardInactivity(timer),
			{
				global: {
					provide: {
						[NOTIFIER_MODULE_KEY.valueOf()]: createModuleMocks(NotifierModule),
					},
				},
			}
		);

		return { useBoardInactivityComposable, boardStore, cardStore };
	};

	describe("usePageInactivity", () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});
		it("should call the store functions when isTimeoutReached value true", async () => {
			const { useBoardInactivityComposable, boardStore, cardStore } = setup();
			connectionOptions.isTimeoutReached = true;
			useBoardInactivityComposable.visibility.value = "hidden";
			await nextTick();

			useBoardInactivityComposable.visibility.value = "visible";
			await nextTick();

			expect(boardStore.reloadBoard).toHaveBeenCalled();
			expect(cardStore.fetchCardRequest).toHaveBeenCalled();
		});

		it("should not call the store functions when isTimeoutReached value false", async () => {
			const { useBoardInactivityComposable, boardStore, cardStore } =
				setup(3000);
			connectionOptions.isTimeoutReached = false;
			useBoardInactivityComposable.visibility.value = "hidden";
			await nextTick();

			useBoardInactivityComposable.visibility.value = "visible";
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
