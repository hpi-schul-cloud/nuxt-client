import { useCardTableOfContents } from "./cardTableOfContents.composable";
import {
	boardResponseFactory,
	cardResponseFactory,
	cardSkeletonResponseFactory,
	collaborativeTextEditorElementResponseFactory,
	columnResponseFactory,
	createTestEnvStore,
	deletedElementResponseFactory,
	drawingElementResponseFactory,
	externalToolElementResponseFactory,
	fileElementResponseFactory,
	fileFolderElementResponseFactory,
	mockComposable,
	richTextElementResponseFactory,
	videoConferenceElementResponseFactory,
} from "@@/tests/test-utils";
import { linkElementResponseFactory } from "@@/tests/test-utils/factory/linkElementResponseFactory";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { ConfigResponse } from "@api-server";
import { useBoardStore, useCardStore } from "@data-board";
import { useExternalToolReferenceApi } from "@data-external-tool";
import { useFileStorageApi } from "@data-file";
import { createTestingPinia } from "@pinia/testing";
import { logger } from "@util-logger";
import { flushPromises } from "@vue/test-utils";
import { ref } from "vue";

vi.mock("@data-file");
vi.mock("@data-external-tool", async (importOriginal) => ({
	...(await importOriginal<typeof import("@data-external-tool")>()),
	useExternalToolReferenceApi: vi.fn(),
}));

const ALL_ELEMENT_FLAGS: Partial<ConfigResponse> = {
	FEATURE_COLUMN_BOARD_COLLABORATIVE_TEXT_EDITOR_ENABLED: true,
	FEATURE_TLDRAW_ENABLED: true,
	FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: true,
	FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED: true,
	FEATURE_COLUMN_BOARD_VIDEOCONFERENCE_ENABLED: true,
	FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED: true,
	FEATURE_COLUMN_BOARD_H5P_ENABLED: true,
};

describe("cardTableOfContents.composable", () => {
	const setup = (
		options: {
			currentCardId?: string;
			cards?: ReturnType<typeof cardResponseFactory.build>[];
			isEnabled?: boolean;
			flags?: Partial<ConfigResponse>;
		} = {}
	) => {
		const cards = options.cards ?? [cardResponseFactory.build()];
		const column = columnResponseFactory.build({
			cards: cards.map((card) => cardSkeletonResponseFactory.build({ cardId: card.id })),
		});
		const board = boardResponseFactory.build({ columns: [column] });

		const getFileRecordsByParentId = vi.fn().mockReturnValue([]);
		vi.mocked(useFileStorageApi).mockReturnValue(mockComposable(useFileStorageApi, { getFileRecordsByParentId }));

		const fetchDisplayDataCall = vi.fn().mockResolvedValue({ name: "Tool name" });
		vi.mocked(useExternalToolReferenceApi).mockReturnValue(
			mockComposable(useExternalToolReferenceApi, { fetchDisplayDataCall })
		);

		const pinia = createTestingPinia({
			initialState: {
				boardStore: { board },
				cardStore: { cards: Object.fromEntries(cards.map((card) => [card.id, card])) },
			},
			stubActions: false,
		});
		createTestEnvStore({ ...ALL_ELEMENT_FLAGS, ...options.flags }, undefined, pinia);

		const currentCardId = ref(options.currentCardId ?? cards[0].id);
		const isEnabled = ref(options.isEnabled ?? true);
		const composable = mountComposable(() => useCardTableOfContents(currentCardId, isEnabled), {
			global: {
				plugins: [pinia, createTestingI18n()],
			},
		});

		return {
			...composable,
			board,
			column,
			cards,
			currentCardId,
			getFileRecordsByParentId,
			fetchDisplayDataCall,
			isEnabled,
		};
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

		it("should omit columns without cards", () => {
			const { sections, board } = setup();
			board.columns.push(columnResponseFactory.build({ cards: [] }));
			useBoardStore().board = board;

			expect(sections.value).toHaveLength(1);
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

		it("should not list elements whose type is disabled by feature flag", () => {
			const card = cardResponseFactory.build({
				elements: [richTextElementResponseFactory.build(), linkElementResponseFactory.build()],
			});
			const { currentElements } = setup({ cards: [card], flags: { FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED: false } });

			expect(currentElements.value.map(({ id }) => id)).toEqual([card.elements[0].id]);
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

			it("should leave out empty text elements", () => {
				const emptyElement = richTextElementResponseFactory.build();
				emptyElement.content.text = "<p>&nbsp;</p>";
				const textElement = richTextElementResponseFactory.build();
				textElement.content.text = "<p>Visible</p>";
				const card = cardResponseFactory.build({ elements: [emptyElement, textElement] });

				const { currentElements } = setup({ cards: [card] });

				expect(currentElements.value.map(({ id }) => id)).toEqual([textElement.id]);
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

				expect(elementLabelOf({ elements: [element] })).toBe("components.cardElement.LinkElement");
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

				expect(elementLabelOf({ elements: [element] })).toBe("components.cardElement.videoConferenceElement");
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

			describe("external tool elements", () => {
				const buildToolCard = (contextExternalToolId: string | null) => {
					const element = externalToolElementResponseFactory.build();
					element.content.contextExternalToolId = contextExternalToolId;

					return cardResponseFactory.build({ elements: [element] });
				};

				it("should use the name of the tool", async () => {
					const { currentElements } = setup({ cards: [buildToolCard("tool-1")] });
					await flushPromises();

					expect(currentElements.value[0].label).toBe("Tool name");
				});

				it("should neither request tool names nor list elements while the table of contents is closed", async () => {
					const { fetchDisplayDataCall, currentElements } = setup({
						cards: [buildToolCard("tool-1")],
						isEnabled: false,
					});
					await flushPromises();

					expect(fetchDisplayDataCall).not.toHaveBeenCalled();
					expect(currentElements.value).toEqual([]);
				});

				it("should request the tool name once the table of contents gets opened", async () => {
					const { fetchDisplayDataCall, currentElements, isEnabled } = setup({
						cards: [buildToolCard("tool-1")],
						isEnabled: false,
					});

					isEnabled.value = true;
					await flushPromises();

					expect(fetchDisplayDataCall).toHaveBeenCalledWith("tool-1");
					expect(currentElements.value[0].label).toBe("Tool name");
				});

				it("should request every tool only once", async () => {
					const { fetchDisplayDataCall, isEnabled } = setup({ cards: [buildToolCard("tool-1")] });
					await flushPromises();

					isEnabled.value = false;
					await flushPromises();
					isEnabled.value = true;
					await flushPromises();

					expect(fetchDisplayDataCall).toHaveBeenCalledTimes(1);
				});

				it("should not request a name for a tool element without tool", async () => {
					const { fetchDisplayDataCall, currentElements } = setup({ cards: [buildToolCard(null)] });
					await flushPromises();

					expect(fetchDisplayDataCall).not.toHaveBeenCalled();
					expect(currentElements.value[0].label).toBe("components.cardElement.externalToolElement");
				});

				it("should fall back to the type name when the request fails", async () => {
					const warn = vi.spyOn(logger, "warn").mockImplementation(() => undefined);
					const { currentElements, fetchDisplayDataCall, isEnabled } = setup({
						cards: [buildToolCard("tool-1")],
						isEnabled: false,
					});
					fetchDisplayDataCall.mockRejectedValue(new Error("not available"));

					isEnabled.value = true;
					await flushPromises();

					expect(currentElements.value[0].label).toBe("components.cardElement.externalToolElement");
					expect(warn).toHaveBeenCalled();
					warn.mockRestore();
				});
			});

			it("should use the type name for elements without title", () => {
				expect(elementLabelOf({ elements: [drawingElementResponseFactory.build()] })).toBe(
					"components.cardElement.drawingElement"
				);
				expect(elementLabelOf({ elements: [collaborativeTextEditorElementResponseFactory.build()] })).toBe(
					"components.cardElement.collaborativeTextEditorElement"
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
