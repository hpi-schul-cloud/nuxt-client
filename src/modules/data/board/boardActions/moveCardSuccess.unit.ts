import type { Mock } from "vitest";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { envConfigModule } from "@/store";
import ApplicationErrorModule from "@/store/application-error";
import EnvConfigModule from "@/store/env-config";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import {
	boardResponseFactory,
	cardSkeletonResponseFactory,
	columnResponseFactory,
	envsFactory,
} from "@@/tests/test-utils/factory";
import type { CardSkeletonResponse, ColumnResponse } from "@/serverApi/v3";
import setupStores from "@@/tests/test-utils/setupStores";
import { useCardStore, useSocketConnection } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import {
	useBoardNotifier,
	useSharedEditMode,
	useSharedLastCreatedElement,
} from "@util-board";
import { createPinia, setActivePinia } from "pinia";
import { computed, ref } from "vue";
import { Router, useRoute, useRouter } from "vue-router";
import { useBoardStore } from "../Board.store";
import { useBoardRestApi } from "../boardActions/boardRestApi.composable";
import { useBoardSocketApi } from "../boardActions/boardSocketApi.composable";
import { useBoardFocusHandler } from "../BoardFocusHandler.composable";
import { useCardSocketApi } from "../cardActions/cardSocketApi.composable";
import { MoveCardSuccessPayload } from "./boardActionPayload.types";

vi.mock("../boardActions/boardSocketApi.composable");
const mockedUseBoardSocketApi = vi.mocked(useBoardSocketApi);

vi.mock("../boardActions/boardRestApi.composable");
const mockedUseBoardRestApi = vi.mocked(useBoardRestApi);

vi.mock("@util-board");
const mockedSharedEditMode = vi.mocked(useSharedEditMode);
const mockedUseBoardNotifier = vi.mocked(useBoardNotifier);
const mockUseSharedLastCreatedElement = vi.mocked(useSharedLastCreatedElement);

vi.mock("@/components/error-handling/ErrorHandler.composable");
const mockedUseErrorHandler = vi.mocked(useErrorHandler);

vi.mock("@data-board/socket/socket");
const mockedUseSocketConnection = vi.mocked(useSocketConnection);

vi.mock("../cardActions/cardSocketApi.composable");
const mockedUseCardSocketApi = vi.mocked(useCardSocketApi);

vi.mock("../BoardFocusHandler.composable");
const mockedBoardFocusHandler = vi.mocked(useBoardFocusHandler);

vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;
const useRouteMock = <Mock>useRoute;

vi.mock("vue-i18n", () => {
	return {
		useI18n: () => ({ t: vi.fn().mockImplementation((key) => key) }),
	};
});

describe("BoardStore", () => {
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	let mockedErrorHandlerCalls: DeepMocked<ReturnType<typeof useErrorHandler>>;
	let mockedSocketConnectionHandler: DeepMocked<
		ReturnType<typeof useSocketConnection>
	>;
	let mockedSocketApiActions: DeepMocked<ReturnType<typeof useBoardSocketApi>>;
	let mockedBoardRestApiActions: DeepMocked<ReturnType<typeof useBoardRestApi>>;
	let mockedCardSocketApiActions: DeepMocked<
		ReturnType<typeof useCardSocketApi>
	>;
	let setEditModeId: Mock;
	let mockedBoardFocusCalls: DeepMocked<
		ReturnType<typeof useBoardFocusHandler>
	>;
	let router: DeepMocked<Router>;
	let route: DeepMocked<ReturnType<typeof useRoute>>;

	beforeEach(() => {
		setActivePinia(createPinia());
		setupStores({
			envConfigModule: EnvConfigModule,
			applicationErrorModule: ApplicationErrorModule,
		});

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

		mockedErrorHandlerCalls = createMock<ReturnType<typeof useErrorHandler>>();
		mockedUseErrorHandler.mockReturnValue(mockedErrorHandlerCalls);

		mockedSocketConnectionHandler =
			createMock<ReturnType<typeof useSocketConnection>>();
		mockedUseSocketConnection.mockReturnValue(mockedSocketConnectionHandler);

		mockedSocketApiActions = createMock<ReturnType<typeof useBoardSocketApi>>();
		mockedUseBoardSocketApi.mockReturnValue(mockedSocketApiActions);

		mockedBoardRestApiActions =
			createMock<ReturnType<typeof useBoardRestApi>>();
		mockedUseBoardRestApi.mockReturnValue(mockedBoardRestApiActions);

		mockedCardSocketApiActions = createMock<
			ReturnType<typeof useCardSocketApi>
		>({
			dispatch: vi.fn().mockResolvedValue(undefined),
			fetchCardRequest: vi.fn(),
			createElementRequest: vi.fn(),
			deleteElementRequest: vi.fn(),
			updateElementRequest: vi.fn(),
			moveElementRequest: vi.fn(),
			deleteCardRequest: vi.fn(),
			updateCardTitleRequest: vi.fn(),
			updateCardHeightRequest: vi.fn(),
			disconnectSocketRequest: vi.fn(),
		});
		mockedUseCardSocketApi.mockReturnValue(mockedCardSocketApiActions);

		setEditModeId = vi.fn();
		mockedSharedEditMode.mockReturnValue({
			setEditModeId,
			editModeId: ref(undefined),
			isInEditMode: computed(() => true),
		});

		mockUseSharedLastCreatedElement.mockReturnValue({
			lastCreatedElementId: computed(() => "element-id"),
			resetLastCreatedElementId: vi.fn(),
		});

		mockedBoardFocusCalls =
			createMock<ReturnType<typeof useBoardFocusHandler>>();
		mockedBoardFocusHandler.mockReturnValue(mockedBoardFocusCalls);

		route = createMock<ReturnType<typeof useRoute>>();
		useRouteMock.mockReturnValue(route);

		router = createMock<Router>();
		useRouterMock.mockReturnValue(router);
	});

	const createPayload = {
		moveCardDown: (
			card: CardSkeletonResponse,
			column: ColumnResponse,
			props: Partial<MoveCardSuccessPayload> = {}
		): MoveCardSuccessPayload => {
			const cardIndex = column.cards.findIndex(
				(c) => c.cardId === card?.cardId
			);
			if (cardIndex === -1 || cardIndex === column.cards.length - 1) {
				throw new Error("test setup failed: card does not exist");
			}

			const boardStore = useBoardStore();
			const columnIndex = boardStore.board?.columns.findIndex(
				(col) => col.id === column.id
			);

			if (columnIndex === undefined) {
				throw new Error("test setup failed: column does not exist");
			}

			return {
				cardId: card.cardId,
				oldIndex: cardIndex,
				newIndex: cardIndex + 1,
				fromColumnId: column.id,
				fromColumnIndex: columnIndex,
				toColumnId: column.id,
				toColumnIndex: columnIndex,
				isOwnAction: true,
				...props,
			};
		},
		moveCardRight: (
			card: CardSkeletonResponse,
			column: ColumnResponse,
			props: Partial<MoveCardSuccessPayload> = {}
		): MoveCardSuccessPayload => {
			const cardIndex = column.cards.findIndex((c) => c.cardId === card.cardId);
			if (cardIndex === -1 || cardIndex === column.cards.length - 1) {
				throw new Error("test setup failed: card does not exist");
			}

			const boardStore = useBoardStore();
			const columnIndex = boardStore.board?.columns.findIndex(
				(col) => col.id === column.id
			);

			if (columnIndex === undefined) {
				throw new Error("test setup failed: column does not exist");
			}
			const toColumnIndex = columnIndex + 1;
			const toColumnId = boardStore.board?.columns[toColumnIndex]?.id;
			if (toColumnId === undefined) {
				throw new Error("test setup failed: next column does not exist");
			}

			return {
				cardId: card.cardId,
				oldIndex: cardIndex,
				newIndex: 0,
				fromColumnId: column.id,
				fromColumnIndex: columnIndex,
				toColumnId,
				toColumnIndex,
				forceNextTick: false,
				isOwnAction: true,
				...props,
			};
		},
	};

	const setup = (options?: { createBoard?: boolean; socketFlag?: boolean }) => {
		const { createBoard, socketFlag } = {
			createBoard: true,
			socketFlag: false,
			...options,
		};

		const cards = cardSkeletonResponseFactory.buildList(5);
		const columnA = columnResponseFactory.build({
			cards: [cards[0], cards[1], cards[2]],
		});
		const columnB = columnResponseFactory.build({
			cards: [cards[3], cards[4]],
		});
		const columns = [columnA, columnB];
		const board = boardResponseFactory.build({ columns });

		if (socketFlag) {
			const envs = envsFactory.build({
				FEATURE_COLUMN_BOARD_SOCKET_ENABLED: true,
			});
			envConfigModule.setEnvs(envs);
		}

		const boardStore = useBoardStore();
		if (createBoard) {
			boardStore.board = board;
		}

		const [cardA1, cardA2, cardA3] = [...columnA.cards];
		const [cardB1, cardB2] = [...columnB.cards];

		mockedPiniaStoreTyping(useCardStore);

		return {
			boardStore,
			board,
			columns: [...columns],
			cardA1,
			cardA2,
			cardA3,
			cardB1,
			cardB2,
		};
	};

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("moveCardSuccess", () => {
		it("should not move Card when board value is undefined", async () => {
			const { boardStore } = setup({ createBoard: false });

			const cardPayload = {
				cardId: "cardId",
				oldIndex: 0,
				newIndex: 1,
				fromColumnId: "columnA.id",
				fromColumnIndex: 0,
				toColumnId: "columnA.id",
				toColumnIndex: 0,
				isOwnAction: true,
			};
			await boardStore.moveCardSuccess(cardPayload);

			expect(boardStore.board).toBe(undefined);
		});

		it("should move a card in the same column", async () => {
			const { boardStore, columns, cardA1, cardA2, cardA3 } = setup();
			const [columnA] = columns;

			const cardPayload = createPayload.moveCardDown(cardA1, columnA);
			await boardStore.moveCardSuccess(cardPayload);

			const columnsAfter = boardStore.board?.columns ?? [];
			const [columnAAfter] = columnsAfter;
			expect(columnAAfter.cards).toEqual([cardA2, cardA1, cardA3]);
		});

		it("should move a card in the same column when forceNextTick is true", async () => {
			const { boardStore, columns, cardA1, cardA2, cardA3 } = setup();
			const [columnA] = columns;

			const cardPayload = createPayload.moveCardDown(cardA1, columnA, {
				forceNextTick: true,
			});
			await boardStore.moveCardSuccess(cardPayload);

			const columnsAfter = boardStore.board?.columns ?? [];
			const [columnAAfter] = columnsAfter;
			expect(columnAAfter.cards).toEqual([cardA2, cardA1, cardA3]);
		});

		it("should move a card to another column", async () => {
			const { boardStore, columns, cardA1, cardA2, cardA3, cardB1, cardB2 } =
				setup();
			const [columnA] = columns;

			const cardPayload = createPayload.moveCardRight(cardA1, columnA);
			await boardStore.moveCardSuccess({ ...cardPayload, isOwnAction: true });

			const columnsAfter = boardStore.board?.columns ?? [];
			const [columnAAfter, columnBAfter] = columnsAfter;
			expect(columnAAfter.cards).toEqual([cardA2, cardA3]);
			expect(columnBAfter.cards).toEqual([cardA1, cardB1, cardB2]);
		});
	});
});

// - [ ] is it possible to have an vi.each-test for every card being moved?s
