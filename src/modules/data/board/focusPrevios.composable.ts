import {
	useBoardStore,
	useCardStore,
	useBoardFocusHandler,
	useSharedEditMode,
} from "@data-board";

import { ContentElementType } from "@/serverApi/v3";

type ParamType = {
	id: string;
	parentId: string;
	level: "board" | "column" | "card" | "element";
};

const findPreviousElement = (payload: ParamType) => {
	const { board } = useBoardStore();
	const { cards } = useCardStore();

	if (!board) return;

	if (payload.level === "column") {
		const columnIndex = board.columns.findIndex(
			(column) => column.id === payload.id
		);

		if (columnIndex <= 0) return payload.parentId;
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

		if (cardIndex <= 0) return payload.parentId;
		return board.columns[columnIndex].cards[cardIndex - 1].cardId;
	}

	if (payload.level === "element") {
		if (!cards) return;
		const elements = cards[payload.parentId].elements;
		if (elements.length === 0) return payload.parentId;

		const elementIndex = elements.findIndex((e) => e.id === payload.id);
		if (elementIndex <= 0) return payload.parentId;

		const previousElement = elements[elementIndex - 1];
		if (previousElement.type === ContentElementType.RichText)
			return findPreviousElement({
				id: previousElement.id,
				parentId: payload.parentId,
				level: "element",
			});

		const { setEditModeId } = useSharedEditMode();
		setEditModeId(payload.parentId);

		return previousElement.id;
	}
};

export const useSetFocusPrevious = (payload: ParamType) => {
	const { setFocus } = useBoardFocusHandler();

	const previousId = findPreviousElement(payload);

	if (!previousId) return;

	setFocus(previousId);

	const element = document.querySelector(
		`[data-focused-id="${previousId}"]`
	) as HTMLElement;

	element?.focus();
};
