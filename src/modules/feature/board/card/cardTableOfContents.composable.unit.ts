import { useCardTableOfContents } from "./cardTableOfContents.composable";
import {
	boardResponseFactory,
	cardResponseFactory,
	cardSkeletonResponseFactory,
	collaborativeTextEditorElementResponseFactory,
	columnResponseFactory,
	deletedElementResponseFactory,
	drawingElementResponseFactory,
	fileElementResponseFactory,
	fileFolderElementResponseFactory,
	mockComposable,
	richTextElementResponseFactory,
	videoConferenceElementResponseFactory,
} from "@@/tests/test-utils";
import { linkElementResponseFactory } from "@@/tests/test-utils/factory/linkElementResponseFactory";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { useBoardStore, useCardStore } from "@data-board";
import { useFileStorageApi } from "@data-file";
import { createTestingPinia } from "@pinia/testing";
import { ref } from "vue";

vi.mock("@data-file");

describe("cardTableOfContents.composable", () => {
	const setup = (options: { currentCardId?: string; cards?: ReturnType<typeof cardResponseFactory.build>[] } = {}) => {
		const cards = options.cards ?? [cardResponseFactory.build()];
		const column = columnResponseFactory.build({
			cards: cards.map((card) => cardSkeletonResponseFactory.build({ cardId: card.id })),
		});
		const board = boardResponseFactory.build({ columns: [column] });

		const getFileRecordsByParentId = vi.fn().mockReturnValue([]);
		vi.mocked(useFileStorageApi).mockReturnValue(mockComposable(useFileStorageApi, { getFileRecordsByParentId }));

		const currentCardId = ref(options.currentCardId ?? cards[0].id);
		const composable = mountComposable(() => useCardTableOfContents(currentCardId), {
			global: {
				plugins: [
					createTestingPinia({
						initialState: {
							boardStore: { board },
							cardStore: { cards: Object.fromEntries(cards.map((card) => [card.id, card])) },
						},
						stubActions: false,
					}),
					createTestingI18n(),
				],
			},
		});

		return { ...composable, board, column, cards, currentCardId, getFileRecordsByParentId };
	};

	const elementLabelOf = (element: Parameters<typeof cardResponseFactory.build>[0]) => {
		const card = cardResponseFactory.build(element);
		const { currentElements } = setup({ cards: [card] });

		return currentElements.value[0].label;
	};

	describe("sections", () => {
		it("should group the cards by column in board order", () => {
			const cards = cardResponseFactory.buildList(2);
			const { sections, column } = setup({ cards });

			expect(sections.value).toHaveLength(1);
			expect(sections.value[0].columnId).toBe(column.id);
			expect(sections.value[0].title).toBe(column.title);
			expect(sections.value[0].cards.map(({ cardId }) => cardId)).toEqual(cards.map(({ id }) => id));
		});

		it("should mark only the current card", () => {
			const cards = cardResponseFactory.buildList(2);
			const { sections } = setup({ cards, currentCardId: cards[1].id });

			expect(sections.value[0].cards.map(({ isCurrent }) => isCurrent)).toEqual([false, true]);
		});

		it("should link every card to its detail route", () => {
			const cards = cardResponseFactory.buildList(2);
			const { sections, board } = setup({ cards });

			expect(sections.value[0].cards[1].route).toEqual({
				name: "boards-card-detail",
				params: { boardId: board.id, cardId: cards[1].id },
			});
		});

		it("should use the card title", () => {
			const card = cardResponseFactory.build({ title: "  My card  " });
			const { sections } = setup({ cards: [card] });

			expect(sections.value[0].cards[0].title).toBe("My card");
		});

		it("should fall back to the translated card name when the card has no title", () => {
			const card = cardResponseFactory.build({ title: "" });
			const { sections } = setup({ cards: [card] });

			expect(sections.value[0].cards[0].title).toBe("components.boardCard");
		});

		it("should fall back to the translated column name when the column has no title", () => {
			const { sections, column } = setup();
			column.title = "";
			useBoardStore().board = boardResponseFactory.build({ columns: [column] });

			expect(sections.value[0].title).toBe("components.board.column.defaultTitle");
		});

		it("should be empty when no board is loaded", () => {
			const { sections } = setup();
			useBoardStore().board = undefined;

			expect(sections.value).toEqual([]);
		});
	});

	describe("currentElements", () => {
		it("should list the elements of the current card only", () => {
			const first = cardResponseFactory.build({ elements: [richTextElementResponseFactory.build()] });
			const second = cardResponseFactory.build({ elements: [linkElementResponseFactory.build()] });
			const { currentElements } = setup({ cards: [first, second], currentCardId: second.id });

			expect(currentElements.value.map(({ id }) => id)).toEqual([second.elements[0].id]);
		});

		it("should follow the current card", () => {
			const first = cardResponseFactory.build({ elements: [richTextElementResponseFactory.build()] });
			const second = cardResponseFactory.build({ elements: [linkElementResponseFactory.build()] });
			const { currentElements, currentCardId } = setup({ cards: [first, second] });

			currentCardId.value = second.id;

			expect(currentElements.value.map(({ id }) => id)).toEqual([second.elements[0].id]);
		});

		it("should update when the card changes in the store", () => {
			const card = cardResponseFactory.build({ elements: [] });
			const { currentElements } = setup({ cards: [card] });

			useCardStore().cards[card.id].elements = [richTextElementResponseFactory.build()];

			expect(currentElements.value).toHaveLength(1);
		});

		it("should be empty for an unknown card", () => {
			const { currentElements, currentCardId } = setup();

			currentCardId.value = "unknown";

			expect(currentElements.value).toEqual([]);
		});

		describe("labels", () => {
			it("should use a teaser of the plain text for text elements", () => {
				const element = richTextElementResponseFactory.build();
				element.content.text = "<p>Hello&nbsp;<strong>world</strong></p><p>second   line</p>";

				expect(elementLabelOf({ elements: [element] })).toBe("Hello world second line");
			});

			it("should shorten long text teasers", () => {
				const element = richTextElementResponseFactory.build();
				element.content.text = `<p>${"a".repeat(200)}</p>`;

				expect(elementLabelOf({ elements: [element] })).toHaveLength(80);
			});

			it("should fall back to the type name for empty text elements", () => {
				const element = richTextElementResponseFactory.build();
				element.content.text = "<p>&nbsp;</p>";

				expect(elementLabelOf({ elements: [element] })).toBe(
					"components.elementTypeSelection.elements.textElement.subtitle"
				);
			});

			it("should not execute markup of text elements", () => {
				const element = richTextElementResponseFactory.build();
				element.content.text = '<img src="x" onerror="window.__toc_xss = true">visible';

				expect(elementLabelOf({ elements: [element] })).toBe("visible");
				expect(Reflect.get(window, "__toc_xss")).toBeUndefined();
			});

			it("should show the domain without www for link elements", () => {
				const element = linkElementResponseFactory.build();
				element.content.url = "https://www.example.org/some/path?query=1";

				expect(elementLabelOf({ elements: [element] })).toBe("example.org");
			});

			it("should accept links without protocol", () => {
				const element = linkElementResponseFactory.build();
				element.content.url = "example.org/path";

				expect(elementLabelOf({ elements: [element] })).toBe("example.org");
			});

			it("should fall back to the link title when the url is invalid", () => {
				const element = linkElementResponseFactory.build();
				element.content.url = "http://";
				element.content.title = "Link title";

				expect(elementLabelOf({ elements: [element] })).toBe("Link title");
			});

			it("should fall back to the type name for links without usable url and title", () => {
				const element = linkElementResponseFactory.build();
				element.content.url = "";
				element.content.title = "";

				expect(elementLabelOf({ elements: [element] })).toBe(
					"components.elementTypeSelection.elements.linkElement.subtitle"
				);
			});

			it.each([
				["video conference", videoConferenceElementResponseFactory],
				["file folder", fileFolderElementResponseFactory],
				["deleted", deletedElementResponseFactory],
			])("should use the title of %s elements", (_name, factory) => {
				const element = factory.build();
				element.content.title = "Element title";

				expect(elementLabelOf({ elements: [element] })).toBe("Element title");
			});

			it("should fall back to the type name for titled elements without title", () => {
				const element = videoConferenceElementResponseFactory.build();
				element.content.title = "";

				expect(elementLabelOf({ elements: [element] })).toBe(
					"components.elementTypeSelection.elements.videoConferenceElement.subtitle"
				);
			});

			it("should use the file name for file elements", () => {
				const element = fileElementResponseFactory.build();
				const card = cardResponseFactory.build({ elements: [element] });
				const { currentElements, getFileRecordsByParentId } = setup({ cards: [card] });
				getFileRecordsByParentId.mockReturnValue([{ name: "report.pdf" }]);

				useCardStore().cards[card.id].elements = [element];

				expect(currentElements.value[0].label).toBe("report.pdf");
			});

			it("should fall back to the caption for file elements without file record", () => {
				const element = fileElementResponseFactory.build();
				element.content.caption = "A caption";

				expect(elementLabelOf({ elements: [element] })).toBe("A caption");
			});

			it("should use the type name for elements without title", () => {
				expect(elementLabelOf({ elements: [drawingElementResponseFactory.build()] })).toBe(
					"components.cardElement.drawingElement"
				);
				expect(elementLabelOf({ elements: [collaborativeTextEditorElementResponseFactory.build()] })).toBe(
					"components.elementTypeSelection.elements.collaborativeTextEditor.subtitle"
				);
			});
		});

		it("should provide the icon of the element type", () => {
			const { currentElements } = setup({
				cards: [cardResponseFactory.build({ elements: [linkElementResponseFactory.build()] })],
			});

			expect(currentElements.value[0].icon).toBeTruthy();
		});
	});
});
