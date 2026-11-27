import { useBoardImportMessages } from "./board-import-messages.composable";
import { mountComposable } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { BoardImportJobFailureReason, BoardImportNoteType } from "@api-board-import";

describe("useBoardImportMessages", () => {
	const setup = () =>
		mountComposable(() => useBoardImportMessages(), {
			global: {
				plugins: [
					createTestingI18n({
						messages: {
							en: {
								"feature-board-import.dialog.failure.other": "other failure {reason}",
								"feature-board-import.dialog.notes.elementLeftOut": "{element} / {section} / {card}",
								"feature-board-import.dialog.notes.linkCreatedAsText": "link as text / {section} / {card}",
								"feature-board-import.dialog.notes.element.other": "other element {kind}",
								"feature-board-import.dialog.notes.withoutTitle": "without title",
								"feature-board-import.dialog.notes.other": "other note {type}",
								"components.cardElement.LinkElement": "Link",
							},
						},
					}),
				],
			},
		});

	describe("getFailureMessage", () => {
		it("should return the text of a reason that the user can understand", () => {
			const { getFailureMessage } = setup();

			const message = getFailureMessage(BoardImportJobFailureReason.SOURCE_NOT_READABLE);

			expect(message).toBe("feature-board-import.dialog.failure.sourceNotReadable");
		});

		it("should return the general text with the reason for another reason", () => {
			const { getFailureMessage } = setup();
			const reason = BoardImportJobFailureReason.MAX_ATTEMPTS;

			const message = getFailureMessage(reason);

			expect(message).toBe(`other failure ${reason}`);
		});

		it("should return the general text when there is no reason", () => {
			const { getFailureMessage } = setup();

			const message = getFailureMessage();

			expect(message).toBe("feature-board-import.dialog.failure.unknown");
		});
	});

	describe("getNoteMessage", () => {
		it("should return the text of a board note", () => {
			const { getNoteMessage } = setup();

			const messages = [BoardImportNoteType.BOARD_TITLE_SHORTENED, BoardImportNoteType.BOARD_DESCRIPTION_LEFT_OUT].map(
				(type) => getNoteMessage({ type })
			);

			expect(messages).toEqual([
				"feature-board-import.dialog.notes.boardTitleShortened",
				"feature-board-import.dialog.notes.boardDescriptionLeftOut",
			]);
		});

		it("should return the element, the section and the card of an element that was left out", () => {
			const { getNoteMessage } = setup();

			const message = getNoteMessage({
				type: BoardImportNoteType.ELEMENT_LEFT_OUT,
				elementType: "link",
				sectionTitle: "Section",
				cardTitle: "Card",
			});

			expect(message).toBe("Link / Section / Card");
		});

		it("should use a placeholder for a missing section or card title", () => {
			const { getNoteMessage } = setup();

			const message = getNoteMessage({ type: BoardImportNoteType.ELEMENT_LEFT_OUT, elementType: "link" });

			expect(message).toBe("Link / without title / without title");
		});

		it("should return the section and the card of a link that was imported as text", () => {
			const { getNoteMessage } = setup();

			const message = getNoteMessage({
				type: BoardImportNoteType.LINK_CREATED_AS_TEXT,
				sectionTitle: "Section",
				cardTitle: "Card",
			});

			expect(message).toBe("link as text / Section / Card");
		});

		it("should use the kind of an element without its own text", () => {
			const { getNoteMessage } = setup();

			const message = getNoteMessage({
				type: BoardImportNoteType.ELEMENT_LEFT_OUT,
				elementType: "not-supported",
				elementKind: "ExternalTool",
			});

			expect(message).toBe("other element ExternalTool / without title / without title");
		});

		it("should use the element type when the element kind is empty", () => {
			const { getNoteMessage } = setup();

			const message = getNoteMessage({
				type: BoardImportNoteType.ELEMENT_LEFT_OUT,
				elementType: "not-supported",
				elementKind: "",
			});

			expect(message).toBe("other element not-supported / without title / without title");
		});

		it("should return the general text with the type for an unknown note type", () => {
			const { getNoteMessage } = setup();
			const type = "card-left-out" as BoardImportNoteType;

			const message = getNoteMessage({ type, sectionTitle: "Section" });

			expect(message).toBe(`other note ${type}`);
		});
	});
});
