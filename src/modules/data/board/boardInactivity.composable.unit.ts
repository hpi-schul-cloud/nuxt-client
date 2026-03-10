import { useBoardStore } from "./Board.store";
import { connectionOptions, useBoardInactivity } from "./boardInactivity.composable";
import { useCardStore } from "./Card.store";
import { useSocketConnection } from "./socket/socket";
import { boardResponseFactory, createTestEnvStore, mockComposable, mountComposable } from "@@/tests/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useSharedLastCreatedElement } from "@util-board";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { computed, nextTick } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

vi.mock("vue-i18n", () => ({
	useI18n: () => ({
		t: vi.fn().mockImplementation((key) => key),
	}),
}));

vi.mock("./socket/socket");
const mockedUseSocketConnection = vi.mocked(useSocketConnection);

vi.mock("@util-board/LastCreatedElement.composable");
const mockUseSharedLastCreatedElement = vi.mocked(useSharedLastCreatedElement);

let mockedSocketConnectionHandler: Mocked<ReturnType<typeof useSocketConnection>>;

vi.useFakeTimers();

describe("pageInactivity.composable", () => {
	beforeEach(() => {
		vi.clearAllMocks();

		setActivePinia(createTestingPinia());
		createTestEnvStore({
			BOARD_COLLABORATION_URI: "mockedUri",
			FEATURE_COLUMN_BOARD_SOCKET_ENABLED: true,
		});

		mockUseSharedLastCreatedElement.mockReturnValue({
			lastCreatedElementId: computed(() => "element-id"),
			resetLastCreatedElementId: vi.fn(),
		});

		mockedSocketConnectionHandler = mockComposable(useSocketConnection);
		mockedUseSocketConnection.mockReturnValue(mockedSocketConnectionHandler);

		injectRouterMock(createRouterMock());
		mountComposable(() => {
			useBoardStore();
			useCardStore();
		});
	});

	const setup = (timer = 0) => {
		const boardStore = useBoardStore();
		const cardStore = useCardStore();
		boardStore.board = boardResponseFactory.build();
		cardStore.cards = {};

		const useBoardInactivityComposable = mountComposable(() => useBoardInactivity(timer));

		return { useBoardInactivityComposable, boardStore, cardStore };
	};

	describe("usePageInactivity", () => {
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
			const { useBoardInactivityComposable, boardStore, cardStore } = setup(3000);
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
		});

		afterEach(() => {
			vi.clearAllTimers();
		});

		it("should be changed after MAX_TIMEOUT_FOR_INACTIVITY is achieved", () => {
			setup(3000);
			expect(connectionOptions.isTimeoutReached).toBe(false);
			vi.advanceTimersByTime(3000);
			expect(connectionOptions.isTimeoutReached).toBe(true);
		});

		it("should not be changed after MAX_TIMEOUT_FOR_INACTIVITY is not achieved", () => {
			setup(3000);
			expect(connectionOptions.isTimeoutReached).toBe(false);
			vi.advanceTimersByTime(1000);
			expect(connectionOptions.isTimeoutReached).toBe(false);
		});
	});
});
