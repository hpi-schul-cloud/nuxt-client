import { BoardLayout, ContentElementType } from "@/serverApi/v3";
import { AnyContentElement } from "@/types/board/ContentElement";
import {
	cardResponseFactory,
	columnResponseFactory,
} from "@@/tests/test-utils";
import {
	CreateCardSuccessPayload,
	CreateColumnSuccessPayload,
} from "../boardActions/boardActionPayload";
import {
	SR_I18N_KEYS_MAP,
	useBoardAriaNotification,
} from "./ariaLiveNotificationHandler";

vi.mock("vue-i18n", () => {
	return {
		useI18n: vi.fn().mockReturnValue({ t: (key: string) => key }),
	};
});

vi.mock("../Board.store", () => ({
	useBoardStore: vi.fn().mockReturnValue({
		getColumnIndex: vi.fn().mockReturnValue(10),
		getCardLocation: vi.fn().mockReturnValue(1),
	}),
}));

vi.mock("../Card.store", () => {
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
	return {
		useCardStore: vi.fn().mockReturnValue({
			cards: [card],
		}),
	};
});

describe("useBoardAriaNotification", () => {
	vi.useFakeTimers();

	const mockNotifyOnScreenReader = vi.fn();
	vi.mock("@/composables/ariaLiveNotifier", async (importOriginal) => {
		const actual =
			await importOriginal<typeof import("@/composables/ariaLiveNotifier")>();
		return {
			...actual,

			notifyOnScreenReader: () => mockNotifyOnScreenReader,
		};
	});

	beforeEach(() => {
		document.body.innerHTML = `
				<div>
					<div id="notify-screen-reader-polite"></div>
					<div id="notify-screen-reader-assertive"></div>
				</div>`;
	});

	it("should notify on cardCreate", async () => {
		const { notifyCreateCardSuccess } = useBoardAriaNotification();
		const payload: CreateCardSuccessPayload = {
			newCard: cardResponseFactory.build(),
			columnId: "columnId",
			isOwnAction: false,
		};
		const element = document.getElementById("notify-screen-reader-polite");

		notifyCreateCardSuccess(payload);
		vi.advanceTimersByTime(3000);
		expect(element?.innerHTML).toContain(SR_I18N_KEYS_MAP.CARD_CREATED_SUCCESS);
	});

	it("should notify on columnCreate", () => {
		const { notifyCreateColumnSuccess } = useBoardAriaNotification();
		const payload: CreateColumnSuccessPayload = {
			newColumn: columnResponseFactory.build(),
			isOwnAction: false,
		};
		const element = document.getElementById("notify-screen-reader-polite");

		notifyCreateColumnSuccess(payload);
		vi.advanceTimersByTime(3000);
		expect(element?.innerHTML).toContain(
			SR_I18N_KEYS_MAP.COLUMN_CREATED_SUCCESS
		);
	});

	it("should notify on cardDelete", () => {
		const { notifyDeleteCardSuccess } = useBoardAriaNotification();
		const element = document.getElementById("notify-screen-reader-polite");

		notifyDeleteCardSuccess({ cardId: "cardId", isOwnAction: false });
		vi.advanceTimersByTime(3000);
		expect(element?.innerHTML).toContain(SR_I18N_KEYS_MAP.CARD_DELETED_SUCCESS);
	});

	it("should notify on columnDelete", () => {
		const { notifyDeleteColumnSuccess } = useBoardAriaNotification();
		const element = document.getElementById("notify-screen-reader-polite");

		notifyDeleteColumnSuccess({
			columnId: "columnId",
			isOwnAction: false,
		});

		vi.advanceTimersByTime(3000);
		expect(element?.innerHTML).toContain(
			SR_I18N_KEYS_MAP.COLUMN_DELETED_SUCCESS
		);
	});

	it("should notify on cardMove", () => {
		const { notifyMoveCardSuccess } = useBoardAriaNotification();
		const element = document.getElementById("notify-screen-reader-polite");

		notifyMoveCardSuccess({
			cardId: "cardId",
			isOwnAction: false,
			oldIndex: 0,
			newIndex: 1,
			fromColumnId: "columnId",
			fromColumnIndex: 0,
			toColumnId: "columnId",
			toColumnIndex: 0,
		});

		vi.advanceTimersByTime(3000);
		expect(element?.innerHTML).toContain(
			SR_I18N_KEYS_MAP.CARD_MOVED_IN_SAME_COLUMN_SUCCESS
		);
	});

	it("should notify on cardMove to another column", () => {
		const { notifyMoveCardSuccess } = useBoardAriaNotification();
		const element = document.getElementById("notify-screen-reader-polite");

		notifyMoveCardSuccess({
			cardId: "cardId",
			isOwnAction: false,
			oldIndex: 0,
			newIndex: 1,
			fromColumnId: "columnId",
			fromColumnIndex: 0,
			toColumnId: "anotherColumnId",
			toColumnIndex: 1,
		});

		vi.advanceTimersByTime(3000);
		expect(element?.innerHTML).toContain(
			SR_I18N_KEYS_MAP.CARD_MOVED_TO_ANOTHER_COLUMN_SUCCESS
		);
	});

	it("should notify on columnMove", () => {
		const { notifyMoveColumnSuccess } = useBoardAriaNotification();
		const element = document.getElementById("notify-screen-reader-polite");

		notifyMoveColumnSuccess({
			columnMove: {
				addedIndex: 0,
				removedIndex: 1,
				columnId: "columnId",
			},
			byKeyboard: false,
			isOwnAction: false,
		});

		vi.advanceTimersByTime(3000);
		expect(element?.innerHTML).toContain(SR_I18N_KEYS_MAP.COLUMN_MOVED_SUCCESS);
	});

	it("should notify on boardTitleUpdate", () => {
		const { notifyUpdateBoardTitleSuccess } = useBoardAriaNotification();
		const element = document.getElementById("notify-screen-reader-polite");

		notifyUpdateBoardTitleSuccess({
			boardId: "boardId",
			newTitle: "newTitle",
			isOwnAction: false,
		});

		vi.advanceTimersByTime(3000);
		expect(element?.innerHTML).toContain(
			SR_I18N_KEYS_MAP.BOARD_TITLE_UPDATED_SUCCESS
		);
	});

	describe("should notify on boardVisibilityUpdate", () => {
		it("should notify on boardPublished", () => {
			const { notifyUpdateBoardVisibilitySuccess } = useBoardAriaNotification();
			const element = document.getElementById("notify-screen-reader-polite");
			notifyUpdateBoardVisibilitySuccess({
				boardId: "boardId",
				isVisible: true,
				isOwnAction: false,
			});

			vi.advanceTimersByTime(3000);
			expect(element?.innerHTML).toContain(
				SR_I18N_KEYS_MAP.BOARD_PUBLISHED_SUCCESS
			);
		});

		it("should notify on boardUnpublished", () => {
			const { notifyUpdateBoardVisibilitySuccess } = useBoardAriaNotification();
			const element = document.getElementById("notify-screen-reader-polite");
			notifyUpdateBoardVisibilitySuccess({
				boardId: "boardId",
				isVisible: false,
				isOwnAction: false,
			});

			vi.advanceTimersByTime(3000);
			expect(element?.innerHTML).toContain(
				SR_I18N_KEYS_MAP.BOARD_UNPUBLISHED_SUCCESS
			);
		});
	});

	describe("when notifying on boardLayoutUpdate", () => {
		it("should notify on boardLayoutUpdate to columns", () => {
			const { notifyUpdateBoardLayoutSuccess } = useBoardAriaNotification();
			const element = document.getElementById("notify-screen-reader-polite");
			notifyUpdateBoardLayoutSuccess({
				boardId: "boardId",
				layout: BoardLayout.Columns,
				isOwnAction: false,
			});

			vi.advanceTimersByTime(3000);
			expect(element?.innerHTML).toContain(
				SR_I18N_KEYS_MAP.BOARD_LAYOUT_UPDATED_SUCCESS
			);
		});

		it("should notify on boardLayoutUpdate to list", () => {
			const { notifyUpdateBoardLayoutSuccess } = useBoardAriaNotification();
			const element = document.getElementById("notify-screen-reader-polite");
			notifyUpdateBoardLayoutSuccess({
				boardId: "boardId",
				layout: BoardLayout.List,
				isOwnAction: false,
			});

			vi.advanceTimersByTime(3000);
			expect(element?.innerHTML).toContain(
				SR_I18N_KEYS_MAP.BOARD_LAYOUT_UPDATED_SUCCESS
			);
		});

		it("should notify on boardLayoutUpdate to unknown", () => {
			const { notifyUpdateBoardLayoutSuccess } = useBoardAriaNotification();
			const element = document.getElementById("notify-screen-reader-polite");
			notifyUpdateBoardLayoutSuccess({
				boardId: "boardId",
				layout: BoardLayout.Grid,
				isOwnAction: false,
			});

			vi.advanceTimersByTime(3000);
			expect(element?.innerHTML).toContain(
				SR_I18N_KEYS_MAP.BOARD_LAYOUT_UPDATED_SUCCESS
			);
		});
	});

	it("should notify on columnTitleUpdate", () => {
		const { notifyUpdateColumnTitleSuccess } = useBoardAriaNotification();
		const element = document.getElementById("notify-screen-reader-polite");

		notifyUpdateColumnTitleSuccess({
			columnId: "columnId",
			newTitle: "newTitle",
			isOwnAction: false,
		});

		vi.advanceTimersByTime(3000);
		expect(element?.innerHTML).toContain(
			SR_I18N_KEYS_MAP.COLUMN_TITLE_UPDATED_SUCCESS
		);
	});

	it("should notify on cardTitleUpdate", () => {
		const { notifyUpdateCardTitleSuccess } = useBoardAriaNotification();
		const element = document.getElementById("notify-screen-reader-polite");

		notifyUpdateCardTitleSuccess({
			cardId: "cardId",
			newTitle: "newTitle",
			isOwnAction: false,
		});

		vi.advanceTimersByTime(3000);
		expect(element?.innerHTML).toContain(
			SR_I18N_KEYS_MAP.CARD_TITLE_UPDATED_SUCCESS
		);
	});

	it("should notify on elementUpdate", () => {
		const { notifyUpdateElementSuccess } = useBoardAriaNotification();
		const element = document.getElementById("notify-screen-reader-polite");

		notifyUpdateElementSuccess({
			elementId: "elementId",
			data: {
				type: "type" as unknown as ContentElementType,
				content: "content" as unknown as AnyContentElement,
			},
			isOwnAction: false,
		});

		vi.advanceTimersByTime(3000);
		expect(element?.innerHTML).toContain(SR_I18N_KEYS_MAP.CARD_UPDATED_SUCCESS);
	});

	it("should notify on elementDelete", () => {
		const { notifyDeleteElementSuccess } = useBoardAriaNotification();
		const element = document.getElementById("notify-screen-reader-polite");

		notifyDeleteElementSuccess({
			cardId: "cardId",
			elementId: "elementId",
			isOwnAction: false,
		});

		vi.advanceTimersByTime(3000);
		expect(element?.innerHTML).toContain(SR_I18N_KEYS_MAP.CARD_UPDATED_SUCCESS);
	});

	it("should notify on elementMove", () => {
		const { notifyMoveElementSuccess } = useBoardAriaNotification();
		const element = document.getElementById("notify-screen-reader-polite");

		notifyMoveElementSuccess({
			elementId: "elementId",
			toCardId: "cardId",
			toPosition: 1,
			isOwnAction: false,
		});

		vi.advanceTimersByTime(3000);
		expect(element?.innerHTML).toContain(SR_I18N_KEYS_MAP.CARD_UPDATED_SUCCESS);
	});

	describe("should not notify if the action is own", () => {
		it("should not notify on cardCreate", () => {
			const { notifyCreateCardSuccess } = useBoardAriaNotification();
			const payload: CreateCardSuccessPayload = {
				newCard: cardResponseFactory.build(),
				columnId: "columnId",
				isOwnAction: true,
			};
			const element = document.getElementById("notify-screen-reader-polite");

			notifyCreateCardSuccess(payload);
			vi.advanceTimersByTime(3000);
			expect(element?.innerHTML).toBe("");
		});
	});
});
