import { useBoardStore, useBoardFocusHandler } from "@data-board";

type Level = "board" | "column" | "card" | "element";

export const useSetFocusPrevios = async (id: string, level: Level) => {
	console.log(level);
	const { board } = useBoardStore();

	if (!board) return;
	const { setFocus } = useBoardFocusHandler();

	// if it's a card, find the column index
	const columnIndex = board.columns.findIndex(
		(column) => column.cards.find((c) => c.cardId === id) !== undefined
	);

	const cardIndex = board.columns[columnIndex].cards.findIndex(
		(c) => c.cardId === id
	);

	if (cardIndex > 0) {
		const previousCard = board.columns[columnIndex].cards[cardIndex - 1].cardId;
		setFocus(previousCard);

		const element = document.querySelector(
			`[data-card-id="${previousCard}"]`
		) as HTMLElement;

		element?.setAttribute("tabindex", "0");
		element?.dispatchEvent(
			new KeyboardEvent("keypress", {
				key: "Tab",
			})
		);

		element?.focus();
	}
};
