import { ContentElementType, CreateContentElementBody } from "@/serverApi/v3";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { nextTick } from "vue";
import { useBoardApi } from "../shared/BoardApi.composable";
import { useSharedCardRequestPool } from "../shared/CardRequestPool.composable";
import { BoardCard } from "../types/Card";
import { useCardState } from "./CardState.composable";
import { I18N_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import NotifierModule from "@/store/notifier";

const notifierModule = createModuleMocks(NotifierModule);

const setup = (cardId = "123123") => {
	return mountComposable(() => useCardState(cardId), {
		[I18N_KEY as symbol]: { t: (key: string) => key },
		notifierModule,
	});
};

jest.mock("../shared/CardRequestPool.composable");
const mockedUseSharedCardRequestPool = jest.mocked(useSharedCardRequestPool);

jest.mock("../shared/BoardApi.composable");
const mockedUseBoardApi = jest.mocked(useBoardApi);

describe("CardState composable", () => {
	let fetchMock: jest.Mock;
	let mockedBoardApiCalls: ReturnType<typeof useBoardApi>;
	const i18n = {
		[I18N_KEY as symbol]: { t: (key: string) => key },
	};
	beforeEach(() => {
		fetchMock = jest.fn().mockResolvedValue({
			id: "abc",
		});
		mockedUseSharedCardRequestPool.mockReturnValue({
			fetchCard: fetchMock,
		});

		mockedBoardApiCalls = {
			updateCardTitle: jest.fn(),
			createColumnCall: jest.fn(),
			createElement: jest.fn().mockReturnValue({ id: "test-id" }),
			deleteCardCall: jest.fn(),
			deleteColumnCall: jest.fn(),
			moveCardCall: jest.fn(),
			moveColumnCall: jest.fn(),
			updateCardHeightCall: jest.fn(),
			updateColumnTitleCall: jest.fn(),
			updateElementCall: jest.fn(),
			createCardCall: jest.fn(),
		};
		mockedUseBoardApi.mockReturnValue(mockedBoardApiCalls);
	});

	describe("fetchCard", () => {
		it("should fetch card on mount", async () => {
			const cardId = "123124";
			// mountComposable(() => useCardState(cardId), i18n);
			setup(cardId);

			expect(fetchMock).toHaveBeenCalledWith(cardId);
		});

		it("should return fetch function that updates card and loading state", async () => {
			const cardId1 = "123124a";
			const cardId2 = "123125b";
			const { fetchCard, isLoading } = setup(cardId1);

			await fetchCard(cardId2);
			expect(fetchMock).toHaveBeenLastCalledWith(cardId2);
			// expect(card.value?.cardId).toBe("abc"); // TODO: refactor after connected to the backend again
			expect(isLoading.value).toBe(false);
		});

		it("should log on error", async () => {
			const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
			const errorToThrow = new Error("something went wrong");

			fetchMock.mockRejectedValue(errorToThrow);
			setup();
			await nextTick();
			await nextTick(); // test mounts it twice

			expect(consoleErrorSpy).toHaveBeenCalledWith(errorToThrow);

			consoleErrorSpy.mockRestore();
		});
	});

	describe("updateTitle", () => {
		const boardCard: BoardCard = {
			id: `cardid`,
			height: 200,
			title: "old Title",
			elements: [],
			visibility: { publishedAt: new Date().toUTCString() },
		};

		it("should call updateCardTitle", async () => {
			const { updateTitle, card } = setup(boardCard.id);
			card.value = boardCard;

			await updateTitle("new title");
			await nextTick();

			expect(mockedBoardApiCalls.updateCardTitle).toHaveBeenCalledWith(
				boardCard.id,
				boardCard.title
			);
		});

		it("should update card title", async () => {
			const newTitle = "new Title";
			const { updateTitle, card } = setup(boardCard.id);
			card.value = boardCard;

			await updateTitle(newTitle);
			await nextTick();

			expect(boardCard.title).toEqual(newTitle);
		});
	});

	describe("deleteCard", () => {
		it("should call deleteCard", async () => {
			const testCard = {
				id: `cardid`,
				height: 200,
				title: "old Title",
				elements: [],
				visibility: { publishedAt: new Date().toUTCString() },
			};

			const { deleteCard, card } = setup(testCard.id);
			card.value = testCard;

			await deleteCard();
			await nextTick();

			expect(mockedBoardApiCalls.deleteCardCall).toHaveBeenCalledWith(
				testCard.id
			);
		});
	});

	describe("updateCardHeight", () => {
		const boardCard: BoardCard = {
			id: `cardid`,
			height: 200,
			title: "old Title",
			elements: [],
			visibility: { publishedAt: new Date().toUTCString() },
		};

		it("should call updateCardHeightCall", async () => {
			const { updateCardHeight, card } = setup(boardCard.id);
			card.value = boardCard;
			const newHeight = 300;

			await updateCardHeight(newHeight);
			await nextTick();

			expect(mockedBoardApiCalls.updateCardHeightCall).toHaveBeenCalledWith(
				boardCard.id,
				newHeight
			);
		});

		it("should update card height", async () => {
			const newHeight = 300;
			const { updateCardHeight, card } = setup(boardCard.id);
			card.value = boardCard;

			await updateCardHeight(newHeight);
			await nextTick();

			expect(boardCard.height).toEqual(newHeight);
		});
	});

	describe("addElement", () => {
		it("should call addElement", async () => {
			const testCard = {
				id: `cardid`,
				height: 200,
				title: "old Title",
				elements: [],
				visibility: { publishedAt: new Date().toUTCString() },
			};

			const { addElement, card } = setup(testCard.id);
			card.value = testCard;

			const elementType: CreateContentElementBody = {
				type: ContentElementType.RichText,
			};

			await addElement(elementType.type);
			await nextTick();

			expect(mockedBoardApiCalls.createElement).toHaveBeenCalledWith(
				testCard.id,
				elementType
			);
		});
	});
});
