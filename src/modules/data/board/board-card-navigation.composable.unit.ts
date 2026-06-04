import { useBoardStore } from "./Board.store";
import { useBoardCardNavigation } from "./board-card-navigation.composable";
import { Board } from "@/types/board/Board";
import { boardResponseFactory, cardSkeletonResponseFactory, columnResponseFactory } from "@@/tests/test-utils/factory";
import { mockComposable } from "@@/tests/test-utils/mockComposable";
import { ref } from "vue";

vi.mock("./Board.store");
const mockedUseBoardStore = vi.mocked(useBoardStore);

vi.mock("pinia", async () => {
	const actual = await vi.importActual<typeof import("pinia")>("pinia");
	return {
		...actual,
		storeToRefs: (store: { board: unknown }) => ({
			board: ref(store.board),
		}),
	};
});

const mockCardId = ref<string | undefined>(undefined);

vi.mock("vue-router", () => ({
	useRoute: () => ({
		params: {
			get cardId() {
				return mockCardId.value;
			},
		},
	}),
}));

describe("board-card-navigation.composable", () => {
	const BOARD_ID = "board-1";

	const setup = (board?: Board) => {
		const mockedBoardStore = mockComposable(useBoardStore, { board });
		mockedUseBoardStore.mockReturnValue(mockedBoardStore);
	};

	beforeEach(() => {
		mockCardId.value = undefined;
	});

	describe("when board is undefined", () => {
		it("should return undefined for both routes", () => {
			setup();

			const { previousCardRoute, nextCardRoute } = useBoardCardNavigation(BOARD_ID);

			expect(previousCardRoute.value).toBeUndefined();
			expect(nextCardRoute.value).toBeUndefined();
		});
	});

	describe("when no cardId is in the route", () => {
		it("should return undefined for both routes", () => {
			const cards = cardSkeletonResponseFactory.buildList(3);
			const column = columnResponseFactory.build({ cards });
			const board = boardResponseFactory.build({ columns: [column] });
			setup(board);

			const { previousCardRoute, nextCardRoute } = useBoardCardNavigation(BOARD_ID);

			expect(previousCardRoute.value).toBeUndefined();
			expect(nextCardRoute.value).toBeUndefined();
		});
	});

	describe("when the current card is the first card of the first column", () => {
		it("should not provide a previous route", () => {
			const cards = cardSkeletonResponseFactory.buildList(3);
			const column = columnResponseFactory.build({ cards });
			const board = boardResponseFactory.build({ columns: [column] });
			setup(board);
			mockCardId.value = cards[0].cardId;

			const { previousCardRoute } = useBoardCardNavigation(BOARD_ID);

			expect(previousCardRoute.value).toBeUndefined();
		});

		it("should provide the next card route", () => {
			const cards = cardSkeletonResponseFactory.buildList(3);
			const column = columnResponseFactory.build({ cards });
			const board = boardResponseFactory.build({ columns: [column] });
			setup(board);
			mockCardId.value = cards[0].cardId;

			const { nextCardRoute } = useBoardCardNavigation(BOARD_ID);

			expect(nextCardRoute.value).toEqual({
				name: "boards-card-detail",
				params: { boardId: BOARD_ID, cardId: cards[1].cardId },
			});
		});
	});

	describe("when the current card is the last card of the last column", () => {
		it("should not provide a next route", () => {
			const cards = cardSkeletonResponseFactory.buildList(3);
			const column = columnResponseFactory.build({ cards });
			const board = boardResponseFactory.build({ columns: [column] });
			setup(board);
			mockCardId.value = cards[2].cardId;

			const { nextCardRoute } = useBoardCardNavigation(BOARD_ID);

			expect(nextCardRoute.value).toBeUndefined();
		});

		it("should provide the previous card route", () => {
			const cards = cardSkeletonResponseFactory.buildList(3);
			const column = columnResponseFactory.build({ cards });
			const board = boardResponseFactory.build({ columns: [column] });
			setup(board);
			mockCardId.value = cards[2].cardId;

			const { previousCardRoute } = useBoardCardNavigation(BOARD_ID);

			expect(previousCardRoute.value).toEqual({
				name: "boards-card-detail",
				params: { boardId: BOARD_ID, cardId: cards[1].cardId },
			});
		});
	});

	describe("when the current card is a middle card", () => {
		it("should provide both previous and next routes", () => {
			const cards = cardSkeletonResponseFactory.buildList(3);
			const column = columnResponseFactory.build({ cards });
			const board = boardResponseFactory.build({ columns: [column] });
			setup(board);
			mockCardId.value = cards[1].cardId;

			const { previousCardRoute, nextCardRoute } = useBoardCardNavigation(BOARD_ID);

			expect(previousCardRoute.value).toEqual({
				name: "boards-card-detail",
				params: { boardId: BOARD_ID, cardId: cards[0].cardId },
			});
			expect(nextCardRoute.value).toEqual({
				name: "boards-card-detail",
				params: { boardId: BOARD_ID, cardId: cards[2].cardId },
			});
		});
	});

	describe("cross-column navigation", () => {
		describe("when the current card is the last card of a column that has a next column", () => {
			it("should provide the first card of the next column as next route", () => {
				const cardsA = cardSkeletonResponseFactory.buildList(2);
				const cardsB = cardSkeletonResponseFactory.buildList(2);
				const columnA = columnResponseFactory.build({ cards: cardsA });
				const columnB = columnResponseFactory.build({ cards: cardsB });
				const board = boardResponseFactory.build({ columns: [columnA, columnB] });
				setup(board);
				mockCardId.value = cardsA[1].cardId;

				const { nextCardRoute } = useBoardCardNavigation(BOARD_ID);

				expect(nextCardRoute.value).toEqual({
					name: "boards-card-detail",
					params: { boardId: BOARD_ID, cardId: cardsB[0].cardId },
				});
			});
		});

		describe("when the current card is the first card of a column that has a previous column", () => {
			it("should provide the last card of the previous column as previous route", () => {
				const cardsA = cardSkeletonResponseFactory.buildList(2);
				const cardsB = cardSkeletonResponseFactory.buildList(2);
				const columnA = columnResponseFactory.build({ cards: cardsA });
				const columnB = columnResponseFactory.build({ cards: cardsB });
				const board = boardResponseFactory.build({ columns: [columnA, columnB] });
				setup(board);
				mockCardId.value = cardsB[0].cardId;

				const { previousCardRoute } = useBoardCardNavigation(BOARD_ID);

				expect(previousCardRoute.value).toEqual({
					name: "boards-card-detail",
					params: { boardId: BOARD_ID, cardId: cardsA[1].cardId },
				});
			});
		});
	});

	describe("when boardId is passed as a Ref", () => {
		it("should use the ref value in the route params", () => {
			const cards = cardSkeletonResponseFactory.buildList(2);
			const column = columnResponseFactory.build({ cards });
			const board = boardResponseFactory.build({ columns: [column] });
			setup(board);
			mockCardId.value = cards[0].cardId;

			const boardIdRef = ref("ref-board-id");
			const { nextCardRoute } = useBoardCardNavigation(boardIdRef);

			expect(nextCardRoute.value).toEqual({
				name: "boards-card-detail",
				params: { boardId: "ref-board-id", cardId: cards[1].cardId },
			});
		});
	});
});
