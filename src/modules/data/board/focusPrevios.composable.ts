import { useBoardStore, useCardStore, useBoardFocusHandler } from "@data-board";

type ParamType = {
	id: string;
	parentId: string;
	level: "board" | "column" | "card" | "element";
	elementType?: string;
};

export const useSetFocusPrevios = async (payload: ParamType) => {
	const { board } = useBoardStore();
	const { cards } = useCardStore();

	const findPreviousElement = (payload: ParamType) => {
		if (!board) return;

		if (payload.level === "column") {
			const columnIndex = board.columns.findIndex(
				(column) => column.id === payload.id
			);

			if (columnIndex <= 0) return board.id;
			return board.columns[columnIndex - 1].id;
		}

		if (payload.level === "card") {
			const columnIndex = board.columns.findIndex(
				(column) =>
					column.cards.find((c) => c.cardId === payload.id) !== undefined
			);

			const cardIndex = board.columns[columnIndex].cards.findIndex(
				(c) => c.cardId === payload.id
			);

			if (cardIndex <= 0) return board.columns[columnIndex].id;
			return board.columns[columnIndex].cards[cardIndex - 1].cardId;
		}

		if (payload.level === "element") {
			if (!cards) return;
			const elements = cards[payload.parentId].elements;
			if (elements.length === 0) return payload.parentId;

			const elementIndex = elements.findIndex((e) => e.id === payload.id);
			if (elementIndex <= 0) return payload.parentId;
			const currentElement = elements[elementIndex];
			const previousElement = elements[elementIndex - 1];

			if (previousElement.type !== "richText") return previousElement.id;

			if (
				currentElement.type === "richText" ||
				previousElement.type === "richText"
			) {
				return findPreviousElement({
					id: elements[elementIndex - 1].id,
					parentId: payload.parentId,
					level: "element",
				});
			}
		}
	};

	if (!board) return;
	const { setFocus } = useBoardFocusHandler();

	const previousId = findPreviousElement(payload);
	if (!previousId) return;

	setFocus(previousId);

	const element = document.querySelector(
		`[data-focused-id="${previousId}"]`
	) as HTMLElement;

	element?.setAttribute("tabindex", "0");
	setTimeout(() => element.removeAttribute("tabindex"), 1000);
	element?.focus();
};
