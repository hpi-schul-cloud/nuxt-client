import { useBoardAriaNotification } from "./ariaNotificationHandler";
import * as BoardActions from "../boardActions/boardActions";
import * as CardActions from "../cardActions/cardActions";
import {
	cardResponseFactory,
	columnResponseFactory,
} from "@@/tests/test-utils";
import {
	CreateCardSuccessPayload,
	CreateColumnSuccessPayload,
} from "../boardActions/boardActionPayload";
import { ContentElementType } from "@/serverApi/v3";
import { AnyContentElement } from "@/types/board/ContentElement";
import { SR_I18N_KEYS_MAP } from "./srNotificationsI18nKeys";

const card = {
	elements: [
		{
			content: { caption: "", alternativeText: "" },
			id: "elementId",
		},
	],
	id: "cardId",
	title: "",
	visibilitySettings: {},
};

jest.mock("vue-i18n", () => {
	return {
		...jest.requireActual("vue-i18n"),
		useI18n: jest.fn().mockReturnValue({ t: (key: string) => key }),
	};
});

jest.mock("../Board.store", () => ({
	useBoardStore: jest.fn().mockReturnValue({
		getColumnIndex: jest.fn().mockReturnValue(10),
		getCardLocation: jest.fn().mockReturnValue(1),
	}),
}));

jest.mock("../Card.store", () => ({
	useCardStore: jest.fn().mockReturnValue({
		cards: [card],
	}),
}));

jest.mock("./ariaNotificationHandler", () => ({
	...jest.requireActual("./ariaNotificationHandler"),
	getElementOwner: () => jest.fn().mockReturnValue("cardId"),
}));

describe("useBoardAriaNotification", () => {
	jest.useFakeTimers();

	const mockNotifyOnScreenReader = jest.fn();
	jest.mock("@/composables/ariaLiveNotifier", () => ({
		notifyOnScreenReader: () => mockNotifyOnScreenReader,
	}));

	beforeEach(() => {
		document.body.innerHTML = '<div id="notify-on-screen-reader"></div>';
	});

	it("should notify on cardCreate", () => {
		const { actionToAriaMessage } = useBoardAriaNotification();
		const payload: CreateCardSuccessPayload = {
			newCard: cardResponseFactory.build(),
			columnId: "columnId",
			isOwnAction: false,
		};
		const element = document.getElementById("notify-on-screen-reader");

		actionToAriaMessage(BoardActions.createCardSuccess(payload));
		jest.advanceTimersByTime(3000);
		expect(element?.getAttribute("aria-live")).toBe("polite");
		expect(element?.innerHTML).toBe(SR_I18N_KEYS_MAP.CARD_CREATED_SUCCESS);
	});

	it("should notify on columnCreate", () => {
		const { actionToAriaMessage } = useBoardAriaNotification();
		const payload: CreateColumnSuccessPayload = {
			newColumn: columnResponseFactory.build(),
			isOwnAction: false,
		};
		const element = document.getElementById("notify-on-screen-reader");

		actionToAriaMessage(BoardActions.createColumnSuccess(payload));
		jest.advanceTimersByTime(3000);
		expect(element?.getAttribute("aria-live")).toBe("polite");
		expect(element?.innerHTML).toBe(SR_I18N_KEYS_MAP.COLUMN_CREATED_SUCCESS);
	});

	it("should notify on cardDelete", () => {
		const { actionToAriaMessage } = useBoardAriaNotification();
		const element = document.getElementById("notify-on-screen-reader");

		actionToAriaMessage(
			CardActions.deleteCardSuccess({ cardId: "cardId", isOwnAction: false })
		);
		jest.advanceTimersByTime(3000);
		expect(element?.getAttribute("aria-live")).toBe("polite");
		expect(element?.innerHTML).toBe(SR_I18N_KEYS_MAP.CARD_DELETED_SUCCESS);
	});

	it("should notify on columnDelete", () => {
		const { actionToAriaMessage } = useBoardAriaNotification();
		const element = document.getElementById("notify-on-screen-reader");

		actionToAriaMessage(
			BoardActions.deleteColumnSuccess({
				columnId: "columnId",
				isOwnAction: false,
			})
		);
		jest.advanceTimersByTime(3000);
		expect(element?.getAttribute("aria-live")).toBe("polite");
		expect(element?.innerHTML).toBe(SR_I18N_KEYS_MAP.COLUMN_DELETED_SUCCESS);
	});

	it("should notify on cardMove", () => {
		const { actionToAriaMessage } = useBoardAriaNotification();
		const element = document.getElementById("notify-on-screen-reader");

		actionToAriaMessage(
			BoardActions.moveCardSuccess({
				cardId: "cardId",
				isOwnAction: false,
				oldIndex: 0,
				newIndex: 1,
				fromColumnId: "columnId",
				fromColumnIndex: 0,
				toColumnId: "columnId",
				toColumnIndex: 0,
			})
		);
		jest.advanceTimersByTime(3000);
		expect(element?.getAttribute("aria-live")).toBe("polite");
		expect(element?.innerHTML).toBe(SR_I18N_KEYS_MAP.CARD_MOVED_SUCCESS);
	});

	it("should notify on cardMove to another column", () => {
		const { actionToAriaMessage } = useBoardAriaNotification();
		const element = document.getElementById("notify-on-screen-reader");

		actionToAriaMessage(
			BoardActions.moveCardSuccess({
				cardId: "cardId",
				isOwnAction: false,
				oldIndex: 0,
				newIndex: 1,
				fromColumnId: "columnId",
				fromColumnIndex: 0,
				toColumnId: "anotherColumnId",
				toColumnIndex: 1,
			})
		);
		jest.advanceTimersByTime(3000);
		expect(element?.getAttribute("aria-live")).toBe("polite");
		expect(element?.innerHTML).toBe(
			SR_I18N_KEYS_MAP.CARD_MOVED_TO_ANOTHER_COLUMN_SUCCESS
		);
	});

	it("should notify on columnMove", () => {
		const { actionToAriaMessage } = useBoardAriaNotification();
		const element = document.getElementById("notify-on-screen-reader");

		actionToAriaMessage(
			BoardActions.moveColumnSuccess({
				columnMove: {
					addedIndex: 0,
					removedIndex: 1,
					columnId: "columnId",
				},
				byKeyboard: false,
				isOwnAction: false,
			})
		);
		jest.advanceTimersByTime(3000);
		expect(element?.getAttribute("aria-live")).toBe("polite");
		expect(element?.innerHTML).toBe(SR_I18N_KEYS_MAP.COLUMN_MOVED_SUCCESS);
	});

	it("should notify on boardTitleUpdate", () => {
		const { actionToAriaMessage } = useBoardAriaNotification();
		const element = document.getElementById("notify-on-screen-reader");

		actionToAriaMessage(
			BoardActions.updateBoardTitleSuccess({
				boardId: "boardId",
				newTitle: "newTitle",
				isOwnAction: false,
			})
		);
		jest.advanceTimersByTime(3000);
		expect(element?.getAttribute("aria-live")).toBe("polite");
		expect(element?.innerHTML).toBe(
			SR_I18N_KEYS_MAP.BOARD_TITLE_UPDATED_SUCCESS
		);
	});

	describe("should notify on boardVisibilityUpdate", () => {
		it("should notify on boardPublished", () => {
			const { actionToAriaMessage } = useBoardAriaNotification();
			const element = document.getElementById("notify-on-screen-reader");
			actionToAriaMessage(
				BoardActions.updateBoardVisibilitySuccess({
					boardId: "boardId",
					isVisible: true,
					isOwnAction: false,
				})
			);
			jest.advanceTimersByTime(3000);
			expect(element?.getAttribute("aria-live")).toBe("polite");
			expect(element?.innerHTML).toBe(SR_I18N_KEYS_MAP.BOARD_PUBLISHED_SUCCESS);
		});

		it("should notify on boardUnpublished", () => {
			const { actionToAriaMessage } = useBoardAriaNotification();
			const element = document.getElementById("notify-on-screen-reader");
			actionToAriaMessage(
				BoardActions.updateBoardVisibilitySuccess({
					boardId: "boardId",
					isVisible: false,
					isOwnAction: false,
				})
			);
			jest.advanceTimersByTime(3000);
			expect(element?.getAttribute("aria-live")).toBe("polite");
			expect(element?.innerHTML).toBe(
				SR_I18N_KEYS_MAP.BOARD_UNPUBLISHED_SUCCESS
			);
		});
	});

	it("should notify on columnTitleUpdate", () => {
		const { actionToAriaMessage } = useBoardAriaNotification();
		const element = document.getElementById("notify-on-screen-reader");

		actionToAriaMessage(
			BoardActions.updateColumnTitleSuccess({
				columnId: "columnId",
				newTitle: "newTitle",
				isOwnAction: false,
			})
		);
		jest.advanceTimersByTime(3000);
		expect(element?.getAttribute("aria-live")).toBe("polite");
		expect(element?.innerHTML).toBe(
			SR_I18N_KEYS_MAP.COLUMN_TITLE_UPDATED_SUCCESS
		);
	});

	it("should notify on cardTitleUpdate", () => {
		const { actionToAriaMessage } = useBoardAriaNotification();
		const element = document.getElementById("notify-on-screen-reader");

		actionToAriaMessage(
			CardActions.updateCardTitleSuccess({
				cardId: "cardId",
				newTitle: "newTitle",
				isOwnAction: false,
			})
		);
		jest.advanceTimersByTime(3000);
		expect(element?.getAttribute("aria-live")).toBe("polite");
		expect(element?.innerHTML).toBe(
			SR_I18N_KEYS_MAP.CARD_TITLE_UPDATED_SUCCESS
		);
	});

	it("should notify on elementUpdate", () => {
		const { actionToAriaMessage } = useBoardAriaNotification();
		const element = document.getElementById("notify-on-screen-reader");

		actionToAriaMessage(
			CardActions.updateElementSuccess({
				elementId: "elementId",
				data: {
					type: "type" as unknown as ContentElementType,
					content: "content" as unknown as AnyContentElement,
				},
				isOwnAction: false,
			})
		);
		jest.advanceTimersByTime(3000);
		expect(element?.getAttribute("aria-live")).toBe("polite");
		expect(element?.innerHTML).toBe(SR_I18N_KEYS_MAP.ELEMENT_UPDATED_SUCCESS);
	});

	it("should notify on elementDelete", () => {
		const { actionToAriaMessage } = useBoardAriaNotification();
		const element = document.getElementById("notify-on-screen-reader");

		actionToAriaMessage(
			CardActions.deleteElementSuccess({
				cardId: "cardId",
				elementId: "elementId",
				isOwnAction: false,
			})
		);
		jest.advanceTimersByTime(3000);
		expect(element?.getAttribute("aria-live")).toBe("polite");
		expect(element?.innerHTML).toBe(SR_I18N_KEYS_MAP.ELEMENT_UPDATED_SUCCESS);
	});

	it("should notify on elementMove", () => {
		const { actionToAriaMessage } = useBoardAriaNotification();
		const element = document.getElementById("notify-on-screen-reader");

		actionToAriaMessage(
			CardActions.moveElementSuccess({
				elementId: "elementId",
				toCardId: "cardId",
				toPosition: 1,
				isOwnAction: false,
			})
		);
		jest.advanceTimersByTime(3000);
		expect(element?.getAttribute("aria-live")).toBe("polite");
		expect(element?.innerHTML).toBe(SR_I18N_KEYS_MAP.ELEMENT_UPDATED_SUCCESS);
	});

	describe("should not notify if the action is own", () => {
		it("should not notify on cardCreate", () => {
			const { actionToAriaMessage } = useBoardAriaNotification();
			const payload: CreateCardSuccessPayload = {
				newCard: cardResponseFactory.build(),
				columnId: "columnId",
				isOwnAction: true,
			};
			const element = document.getElementById("notify-on-screen-reader");

			actionToAriaMessage(BoardActions.createCardSuccess(payload));
			jest.advanceTimersByTime(3000);
			expect(element?.getAttribute("aria-live")).toBe(null);
			expect(element?.innerHTML).toBe("");
		});
	});
});
