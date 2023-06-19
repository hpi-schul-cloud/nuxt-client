import { ContentElementType, CreateContentElementBody } from "@/serverApi/v3";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { nextTick } from "vue";
import { useBoardApi } from "../shared/BoardApi.composable";
import { useSharedCardRequestPool } from "../shared/CardRequestPool.composable";
import { BoardCard } from "../types/Card";
import { useCardState } from "./CardState.composable";
import { boardCardFactory } from "@@/tests/test-utils/factory";
import { fileElementResponseFactory } from "@@/tests/test-utils/factory/fileElementResponseFactory";

jest.mock("../shared/CardRequestPool.composable");
const mockedUseSharedCardRequestPool = jest.mocked(useSharedCardRequestPool);

jest.mock("../shared/BoardApi.composable");
const mockedUseBoardApi = jest.mocked(useBoardApi);

describe("CardState composable", () => {
	let fetchMock: jest.Mock;
	let mockedBoardApiCalls: ReturnType<typeof useBoardApi>;
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
			createElementCall: jest.fn(),
			deleteElementCall: jest.fn(),
			deleteCardCall: jest.fn(),
			deleteColumnCall: jest.fn(),
			moveCardCall: jest.fn(),
			moveColumnCall: jest.fn(),
			moveElementCall: jest.fn(),
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
			mountComposable(() => useCardState(cardId));

			expect(fetchMock).toHaveBeenCalledWith(cardId);
		});

		it("should return fetch function that updates card and loading state", async () => {
			const cardId1 = "123124a";
			const cardId2 = "123125b";
			const { fetchCard, isLoading } = mountComposable(() =>
				useCardState(cardId1)
			);

			await fetchCard(cardId2);
			expect(fetchMock).toHaveBeenLastCalledWith(cardId2);
			// expect(card.value?.cardId).toBe("abc"); // TODO: refactor after connected to the backend again
			expect(isLoading.value).toBe(false);
		});

		it("should log on error", async () => {
			const cardId = "123124";
			const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
			const errorToThrow = new Error("something went wrong");

			fetchMock.mockRejectedValue(errorToThrow);
			mountComposable(() => useCardState(cardId));
			await nextTick();
			await nextTick(); // test mounts it twice

			expect(consoleErrorSpy).toHaveBeenCalledWith(errorToThrow);

			consoleErrorSpy.mockRestore();
		});
	});

	describe("updateTitle", () => {
		const boardCard = boardCardFactory.build();

		it("should call updateCardTitle", async () => {
			const { updateTitle, card } = mountComposable(() =>
				useCardState(boardCard.id)
			);
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
			const { updateTitle, card } = mountComposable(() =>
				useCardState(boardCard.id)
			);
			card.value = boardCard;

			await updateTitle(newTitle);
			await nextTick();

			expect(boardCard.title).toEqual(newTitle);
		});
	});

	describe("deleteCard", () => {
		it("should call deleteCard", async () => {
			const boardCard = boardCardFactory.build();

			const { deleteCard, card } = mountComposable(() =>
				useCardState(boardCard.id)
			);
			card.value = boardCard;

			await deleteCard();
			await nextTick();

			expect(mockedBoardApiCalls.deleteCardCall).toHaveBeenCalledWith(
				boardCard.id
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
			const { updateCardHeight, card } = mountComposable(() =>
				useCardState(boardCard.id)
			);
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
			const { updateCardHeight, card } = mountComposable(() =>
				useCardState(boardCard.id)
			);
			card.value = boardCard;

			await updateCardHeight(newHeight);
			await nextTick();

			expect(boardCard.height).toEqual(newHeight);
		});
	});

	describe("addElement", () => {
		it("should call addElement", async () => {
			const boardCard = boardCardFactory.build();

			const { addElement, card } = mountComposable(() =>
				useCardState(boardCard.id)
			);
			card.value = boardCard;

			const elementType: CreateContentElementBody = {
				type: ContentElementType.RichText,
			};

			await addElement(elementType.type);
			await nextTick();

			expect(mockedBoardApiCalls.createElementCall).toHaveBeenCalledWith(
				boardCard.id,
				elementType
			);
		});
	});

	describe("deleteElement", () => {
		describe("when card state is undefined", () => {
			const setup = () => {
				const { deleteElement, card } = mountComposable(() =>
					useCardState("cardid")
				);
				card.value = undefined;

				return { deleteElement };
			};

			it("should not call deleteElement", async () => {
				const { deleteElement } = setup();

				await deleteElement("elementid");

				expect(mockedBoardApiCalls.deleteElementCall).not.toHaveBeenCalled();
			});
		});

		describe("when card state is defined", () => {
			const setup = () => {
				const { deleteElement, card } = mountComposable(() =>
					useCardState("cardid")
				);
				const fileElementResponse = fileElementResponseFactory.build();
				const fileElementResponse2 = fileElementResponseFactory.build();

				const boardCard = boardCardFactory.build({
					elements: [fileElementResponse, fileElementResponse2],
				});
				card.value = boardCard;

				return {
					deleteElement,
					card,
					fileElementResponse,
					fileElementResponse2,
				};
			};

			it("should call deleteElement", async () => {
				const { deleteElement, fileElementResponse } = setup();

				await deleteElement(fileElementResponse.id);

				expect(mockedBoardApiCalls.deleteElementCall).toHaveBeenCalledWith(
					fileElementResponse.id
				);
			});

			it("should remove element from card", async () => {
				const {
					deleteElement,
					card,
					fileElementResponse,
					fileElementResponse2,
				} = setup();

				await deleteElement(fileElementResponse.id);

				expect(card.value?.elements).toEqual([fileElementResponse2]);
			});
		});
	});
});
