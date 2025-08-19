import type { Mock } from "vitest";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import ApplicationErrorModule from "@/store/application-error";
import EnvConfigModule from "@/store/env-config";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import {
	boardResponseFactory,
	cardSkeletonResponseFactory,
	columnResponseFactory,
} from "@@/tests/test-utils/factory";
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

type BoardSetup = Record<string, Array<string>>;

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

	afterEach(() => {
		vi.resetAllMocks();
	});

	const encodeCardPositions = (
		board: ReturnType<typeof useBoardStore>["board"]
	) => {
		if (board === undefined) return;
		const columnsAfter = board.columns ?? [];
		const columnsWithCardIds = columnsAfter.map((col) =>
			col.cards.map((c) => c.cardId)
		);
		return columnsWithCardIds;
	};

	const decodeExpectedString = (expected: string) => {
		const columns = expected.replace(/\s+/g, "").split("+");
		const columnsWithCards = columns.map((column: string) => column.split(","));
		return columnsWithCards;
	};

	const createBoardResponse = (boardSetup: BoardSetup) => {
		const columns = Object.entries(boardSetup).map(([columnId, cardIds]) => {
			const column = columnResponseFactory.build({
				id: columnId,
				cards: cardIds.map((cardId: string) =>
					cardSkeletonResponseFactory.build({ cardId })
				),
			});
			return column;
		});
		const board = boardResponseFactory.build({ columns });
		return board;
	};

	describe("moveCardSuccess", () => {
		const setup = (
			cardId: string,
			toColumnId: string,
			newIndex: number,
			boardSetup: BoardSetup
		) => {
			const boardStore = useBoardStore();
			boardStore.board = createBoardResponse(boardSetup);

			const location = boardStore.getCardLocation(cardId) ?? {
				columnId: "unknownColumn",
				columnIndex: 0,
				cardIndex: 0,
			};
			const toColumnIndex =
				boardStore.board?.columns.findIndex(
					(column) => column.id === toColumnId
				) ?? 0;
			const payload = {
				cardId,
				oldIndex: location?.cardIndex,
				newIndex,
				fromColumnId: location?.columnId,
				fromColumnIndex: location?.columnIndex,
				toColumnId,
				toColumnIndex,
				forceNextTick: false,
				isOwnAction: true,
			};

			mockedPiniaStoreTyping(useCardStore);

			return {
				boardStore,
				payload,
			};
		};

		describe("when moving inside a column", () => {
			it.each`
				cardId  | toColumnId   | newIndex | expected
				${"A1"} | ${"columnA"} | ${"0"}   | ${"A1,A2,A3 + B1,B2"}
				${"A1"} | ${"columnA"} | ${"1"}   | ${"A2,A1,A3 + B1,B2"}
				${"A2"} | ${"columnA"} | ${"0"}   | ${"A2,A1,A3 + B1,B2"}
				${"A3"} | ${"columnA"} | ${"0"}   | ${"A3,A1,A2 + B1,B2"}
				${"B1"} | ${"columnB"} | ${"0"}   | ${"A1,A2,A3 + B1,B2"}
				${"B1"} | ${"columnB"} | ${"1"}   | ${"A1,A2,A3 + B2,B1"}
				${"B2"} | ${"columnB"} | ${"0"}   | ${"A1,A2,A3 + B2,B1"}
			`(
				"should move to expected position - moving $cardId to $columnId pos $newIndex results in $expected",
				async ({ cardId, toColumnId, newIndex, expected }) => {
					const { boardStore, payload } = setup(cardId, toColumnId, newIndex, {
						columnA: ["A1", "A2", "A3"],
						columnB: ["B1", "B2"],
					});

					expect(boardStore.board).not.toEqual(undefined);

					await boardStore.moveCardSuccess({
						...payload,
						isOwnAction: true,
					});

					const result = encodeCardPositions(boardStore.board);
					const expectedPositions = decodeExpectedString(expected);
					expect(result).toEqual(expectedPositions);
				}
			);
		});

		describe("when moving from one column to another", () => {
			it.each`
				cardId  | toColumnId   | newIndex | expected
				${"A1"} | ${"columnB"} | ${"0"}   | ${"A2,A3 + A1,B1,B2"}
				${"A1"} | ${"columnB"} | ${"1"}   | ${"A2,A3 + B1,A1,B2"}
				${"A2"} | ${"columnB"} | ${"0"}   | ${"A1,A3 + A2,B1,B2"}
				${"B1"} | ${"columnA"} | ${"0"}   | ${"B1,A1,A2,A3 + B2"}
				${"B1"} | ${"columnA"} | ${"1"}   | ${"A1,B1,A2,A3 + B2"}
				${"B2"} | ${"columnA"} | ${"0"}   | ${"B2,A1,A2,A3 + B1"}
				${"B2"} | ${"columnA"} | ${"2"}   | ${"A1,A2,B2,A3 + B1"}
			`(
				"should move to expected position - moving $cardId to $columnId pos $newIndex results in $expected",
				async ({ cardId, toColumnId, newIndex, expected }) => {
					const { boardStore, payload } = setup(cardId, toColumnId, newIndex, {
						columnA: ["A1", "A2", "A3"],
						columnB: ["B1", "B2"],
					});

					expect(boardStore.board).not.toEqual(undefined);

					await boardStore.moveCardSuccess({
						...payload,
						isOwnAction: true,
					});

					const result = encodeCardPositions(boardStore.board);
					const expectedPositions = decodeExpectedString(expected);
					expect(result).toEqual(expectedPositions);
				}
			);
		});

		describe("when moving to non existing index", () => {
			it.each`
				cardId  | toColumnId   | newIndex | expected
				${"A3"} | ${"columnB"} | ${"4"}   | ${"A1,A2 + B1,B2,A3"}
				${"A3"} | ${"columnB"} | ${"9"}   | ${"A1,A2 + B1,B2,A3"}
			`(
				"should move to last position - moving $cardId to $columnId pos $newIndex results in $expected",
				async ({ cardId, toColumnId, newIndex, expected }) => {
					const { boardStore, payload } = setup(cardId, toColumnId, newIndex, {
						columnA: ["A1", "A2", "A3"],
						columnB: ["B1", "B2"],
					});

					expect(boardStore.board).not.toEqual(undefined);

					await boardStore.moveCardSuccess({
						...payload,
						isOwnAction: true,
					});

					const result = encodeCardPositions(boardStore.board);
					const expectedPositions = decodeExpectedString(expected);
					expect(result).toEqual(expectedPositions);
				}
			);
		});

		describe("when moving to non existing column", () => {
			it.each`
				cardId  | toColumnId   | newIndex | expected
				${"A1"} | ${"columnC"} | ${"0"}   | ${"A1,A2,A3 + B1,B2"}
				${"B1"} | ${"columnC"} | ${"0"}   | ${"A1,A2,A3 + B1,B2"}
			`(
				"should not move anything - moving $cardId to $columnId pos $newIndex results in $expected",
				async ({ cardId, toColumnId, newIndex, expected }) => {
					const { boardStore, payload } = setup(cardId, toColumnId, newIndex, {
						columnA: ["A1", "A2", "A3"],
						columnB: ["B1", "B2"],
					});

					expect(boardStore.board).not.toEqual(undefined);

					await boardStore.moveCardSuccess({
						...payload,
						isOwnAction: true,
					});

					const result = encodeCardPositions(boardStore.board);
					const expectedPositions = decodeExpectedString(expected);
					expect(result).toEqual(expectedPositions);
				}
			);
		});

		describe("when moving a not existing card", () => {
			it.each`
				cardId  | toColumnId   | newIndex | expected
				${"A4"} | ${"columnB"} | ${"0"}   | ${"A1,A2,A3 + B1,B2"}
				${"B3"} | ${"columnA"} | ${"0"}   | ${"A1,A2,A3 + B1,B2"}
			`(
				"should not move anything - moving $cardId to $columnId pos $newIndex results in $expected",
				async ({ cardId, toColumnId, newIndex, expected }) => {
					const { boardStore, payload } = setup(cardId, toColumnId, newIndex, {
						columnA: ["A1", "A2", "A3"],
						columnB: ["B1", "B2"],
					});

					expect(boardStore.board).not.toEqual(undefined);

					await boardStore.moveCardSuccess({
						...payload,
						isOwnAction: true,
					});

					const result = encodeCardPositions(boardStore.board);
					const expectedPositions = decodeExpectedString(expected);
					expect(result).toEqual(expectedPositions);
				}
			);
		});
	});
});
