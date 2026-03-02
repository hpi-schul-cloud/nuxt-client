import { useBoardStore } from "./Board.store";
import { useBoardAllowedOperations } from "./board-allowed-operations.composable";
import type { BoardResponseAllowedOperations } from "@/serverApi/v3";
import { Board } from "@/types/board/Board";
import { boardResponseFactory } from "@@/tests/test-utils/factory";
import { createMock } from "@golevelup/ts-vitest";
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

describe("board-allowed-operations.composable", () => {
	const setup = (board?: Board) => {
		const mockedBoardStore = createMock<ReturnType<typeof useBoardStore>>({
			board,
		});

		mockedUseBoardStore.mockReturnValue(mockedBoardStore);
	};

	describe("when board has allowed operations", () => {
		it("should return the board's allowedOperations", () => {
			const mockedAllowedOperations: Partial<BoardResponseAllowedOperations> = {
				updateElement: true,
				deleteBoard: true,
			};
			const board = boardResponseFactory.build({ allowedOperations: mockedAllowedOperations });
			setup(board);

			const { allowedOperations } = useBoardAllowedOperations();

			expect(allowedOperations.value.updateElement).toBe(true);
			expect(allowedOperations.value.deleteBoard).toBe(true);
			// defaults should still be false
			expect(allowedOperations.value.createCard).toBe(false);
		});
	});

	describe("when board is undefined", () => {
		it("should return a proxy with all operations disallowed", () => {
			setup();

			const { allowedOperations } = useBoardAllowedOperations();

			expect(allowedOperations.value.updateElement).toBe(false);
			expect(allowedOperations.value.deleteBoard).toBe(false);
			expect(allowedOperations.value.createCard).toBe(false);
		});
	});

	describe("when board.allowedOperations is undefined", () => {
		it("should return a proxy with all operations disallowed", () => {
			const board = boardResponseFactory.build();
			(board as unknown as { allowedOperations?: BoardResponseAllowedOperations }).allowedOperations = undefined;
			setup(board);

			const { allowedOperations } = useBoardAllowedOperations();

			expect(allowedOperations.value.updateElement).toBe(false);
			expect(allowedOperations.value.deleteBoard).toBe(false);
			expect(allowedOperations.value.createCard).toBe(false);
		});
	});
});
