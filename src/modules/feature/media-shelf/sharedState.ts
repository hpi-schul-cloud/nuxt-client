import { CardMove, ColumnMove } from "@/types/board/DragAndDrop";
import { createSharedComposable } from "@vueuse/core";
import { nextTick, ref, Ref } from "vue";
import { image2, image3 } from "./mockData";
import { IMediaBoard, IMediaBoardLine } from "./types";

let internalIdCounter = 0;
const getId = (): string => {
	return String(internalIdCounter++);
};

const mediaBoardState = () => {
	const mediaBoard: Ref<IMediaBoard> = ref({
		id: getId(),
		lines: [
			{
				id: getId(),
				title: "Meine Favoriten",
				isPrimary: true,
				color: "#FFFFFF",
				gridMode: false,
				elements: [
					{
						id: getId(),
						title: "Windows Hintergründe",
						description: "Die besten Hintergründe",
						thumbnail: image2,
					},
					{
						id: getId(),
						title: "Die Leere",
					},
				],
			},
			{
				id: getId(),
				title: "Alles Andere",
				isPrimary: false,
				color: "#FFFFFF",
				gridMode: false,
				elements: [
					{
						id: getId(),
						title: "Grüne Wiesen",
						thumbnail: image2,
					},
					{
						id: getId(),
						title: "Eine Sammlung der besten langen Texte",
						thumbnail: image2,
						description:
							"Die Beschreibung ist viel zu lang für dieses Element und ich hoffe, dass niemand einen ganzen Roman in diese Zeile schreiben wird. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
					},
					{
						id: getId(),
						title: "Ein hauch von Nichts",
					},
					{
						id: getId(),
						title: "Bücherstapel",
						thumbnail: image3,
					},
					{
						id: getId(),
						title: "Element 7",
					},
					{
						id: getId(),
						title: "Element 8",
					},
					{
						id: getId(),
						title: "Element 9",
					},
					{
						id: getId(),
						title: "Element 10",
					},
				],
			},
		],
	});

	const getPrimaryLine = (): IMediaBoardLine | null => {
		if (mediaBoard.value === undefined) {
			return null;
		}

		const primaryLine: IMediaBoardLine | undefined =
			mediaBoard.value.lines.find(
				(line: IMediaBoardLine): boolean => line.isPrimary
			);

		return primaryLine ?? null;
	};

	const addLine = async (): Promise<IMediaBoardLine | null> => {
		if (mediaBoard.value === undefined) {
			return null;
		}

		const line: IMediaBoardLine = {
			id: getId(),
			title: "",
			elements: [],
			isPrimary: false,
			color: "#FFFFFF",
			gridMode: false,
		};

		mediaBoard.value.lines.push(line);

		return line;
	};

	// This is all the same as in the column board. Maybe an interface or base class would be good.
	const getLineIndex = (lineId: string | undefined): number => {
		if (lineId === undefined || mediaBoard.value === undefined) {
			return -1;
		}

		const columnIndex: number = mediaBoard.value?.lines.findIndex(
			(c: IMediaBoardLine): boolean => c.id === lineId
		);
		return columnIndex;
	};

	const updateLineTitle = (lineId: string, newTitle: string): void => {
		if (mediaBoard.value === undefined) {
			return;
		}

		// TODO: Call API with debounce
		const lineIndex: number = getLineIndex(lineId);
		if (lineIndex > -1) {
			mediaBoard.value.lines[lineIndex].title = newTitle;
		}
	};

	const moveLine = async (
		columnMove: ColumnMove,
		byKeyboard = false
	): Promise<void> => {
		const { addedIndex, removedIndex } = columnMove;
		if (addedIndex < 0 || addedIndex > mediaBoard.value.lines.length - 1) {
			return;
		}
		if (removedIndex === null || removedIndex === undefined) {
			return;
		}

		const item: IMediaBoardLine = mediaBoard.value.lines.splice(
			removedIndex,
			1
		)[0];

		if (byKeyboard) {
			await nextTick();
		}

		mediaBoard.value.lines.splice(addedIndex, 0, item);
	};

	const getLineId = (lineIndex: number): string | undefined => {
		if (
			mediaBoard.value === undefined ||
			lineIndex === undefined ||
			lineIndex < 0 ||
			lineIndex > mediaBoard.value.lines.length - 1
		) {
			return;
		}

		const line: IMediaBoardLine | undefined = mediaBoard.value.lines[lineIndex];

		if (line === undefined) {
			return;
		}

		return line.id;
	};

	const moveElement = async (cardMove: CardMove): Promise<void> => {
		const {
			cardId,
			newIndex,
			oldIndex,
			toColumnId,
			fromColumnId,
			columnDelta,
			forceNextTick,
		} = cardMove;

		const fromColumnIndex = getLineIndex(fromColumnId);
		let newColumnId: string | undefined = toColumnId;
		let newColumnIndex = getLineIndex(toColumnId);

		if (columnDelta !== undefined) {
			newColumnIndex = fromColumnIndex + columnDelta;
			newColumnId = getLineId(newColumnIndex);
		}
		if (newColumnId === undefined) {
			// need to create a new column
			const newColumn: IMediaBoardLine | null = await addLine();
			if (newColumn) {
				newColumnId = newColumn.id;
				newColumnIndex = getLineIndex(newColumnId);
			}
		}

		if (cardId === undefined || newColumnId === undefined) return; // ensure values are set

		if (fromColumnIndex === newColumnIndex) {
			if (newIndex === oldIndex && fromColumnIndex === newColumnIndex) return; // same position
			if (newIndex < 0) return; // first card - can't move up
			if (
				newIndex >
				mediaBoard.value.lines[fromColumnIndex].elements.length - 1
			)
				return; // last card - can't move down
		}

		const item = mediaBoard.value.lines[fromColumnIndex].elements.splice(
			oldIndex,
			1
		)[0];
		/**
		 * refreshes the board to force rerendering in tracked v-for
		 * to maintain focus when moving columns by keyboard
		 */
		if (forceNextTick === true) {
			await nextTick();
		}
		mediaBoard.value.lines[newColumnIndex].elements.splice(newIndex, 0, item);
	};

	const deleteLine = async (lineId: string): Promise<void> => {
		if (mediaBoard.value === undefined) return;

		const primaryLine: IMediaBoardLine | null = getPrimaryLine();
		const lineIndex: number = getLineIndex(lineId);
		if (lineIndex < 0 || !primaryLine || lineId === primaryLine.id) {
			return;
		}

		const deletedLines: IMediaBoardLine[] = mediaBoard.value.lines.splice(
			lineIndex,
			1
		);

		primaryLine.elements.push(...deletedLines[0].elements);
	};

	return {
		mediaBoard,
		addLine,
		getLineIndex,
		updateLineTitle,
		moveLine,
		deleteLine,
		moveElement,
	};
};

export const useSharedMediaBoardState = createSharedComposable(mediaBoardState);
