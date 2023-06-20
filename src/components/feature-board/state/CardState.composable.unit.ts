import { ContentElementType, CreateContentElementBody } from "@/serverApi/v3";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { nextTick } from "vue";
import { useBoardApi } from "../shared/BoardApi.composable";
import { useSharedCardRequestPool } from "../shared/CardRequestPool.composable";
import { BoardCard } from "../types/Card";
import { useCardState } from "./CardState.composable";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import NotifierModule from "@/store/notifier";
import { boardCardFactory } from "@@/tests/test-utils/factory";
import { fileElementResponseFactory } from "@@/tests/test-utils/factory/fileElementResponseFactory";
import { useBoardNotifier } from "../shared/BoardNotifications.composable";

const notifierModule = createModuleMocks(NotifierModule);

const setup = (cardId = "123123") => {
	return mountComposable(() => useCardState(cardId), {
		[I18N_KEY as symbol]: { t: (key: string) => key },
		[NOTIFIER_MODULE_KEY as symbol]: notifierModule,
	});
};

jest.mock("../shared/CardRequestPool.composable");
const mockedUseSharedCardRequestPool = jest.mocked(useSharedCardRequestPool);

jest.mock("../shared/BoardApi.composable");
const mockedUseBoardApi = jest.mocked(useBoardApi);

jest.mock("../shared/BoardNotifications.composable");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

describe("CardState composable", () => {
	let fetchMock: jest.Mock;
	let mockedBoardApiCalls: ReturnType<typeof useBoardApi>;
	let mockedBoardNotifierCalls: Partial<ReturnType<typeof useBoardNotifier>>;

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
			createElementCall: jest.fn().mockReturnValue({ id: "test-id" }),
			deleteElementCall: jest.fn(),
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

		mockedBoardNotifierCalls = {
			generateErrorText: jest.fn(),
			showFailure: jest.fn(),
			isErrorCode: jest.fn(),
		};

		mockedUseBoardNotifier.mockReturnValue(
			mockedBoardNotifierCalls as ReturnType<typeof useBoardNotifier>
		);
	});

	afterEach(() => {
		mockedBoardNotifierCalls = {
			generateErrorText: jest.fn(),
			showFailure: jest.fn(),
			isErrorCode: jest.fn(),
		};
	});

	describe("fetchCard", () => {
		it("should fetch card on mount", async () => {
			const cardId = "123124";
			setup(cardId);

			expect(fetchMock).toHaveBeenCalledWith(cardId);
		});

		it("should return fetch function that updates card and loading state", async () => {
			const cardId1 = "123124a";
			const cardId2 = "123125b";
			const { fetchCard, isLoading } = setup(cardId1);

			await fetchCard(cardId2);
			expect(fetchMock).toHaveBeenLastCalledWith(cardId2);
			expect(isLoading.value).toBe(false);
		});

		it("should log on error and call board notifier", async () => {
			const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
			const errorToThrow = new Error("something went wrong");
			mockedBoardNotifierCalls.isErrorCode = jest.fn().mockReturnValue(true);

			fetchMock.mockRejectedValue(errorToThrow);
			setup();
			await nextTick();
			await nextTick(); // test mounts it twice

			expect(consoleErrorSpy).toHaveBeenCalledWith(errorToThrow);
			expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
				"read",
				"boardCard"
			);
			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
			consoleErrorSpy.mockRestore();
		});
	});

	describe("updateTitle", () => {
		const boardCard = boardCardFactory.build();

		it("should call updateCardTitle", async () => {
			const { updateTitle, card } = setup(boardCard.id);
			card.value = boardCard;

			await updateTitle("new title");

			expect(mockedBoardApiCalls.updateCardTitle).toHaveBeenCalledWith(
				boardCard.id,
				boardCard.title
			);
		});

		it("should not call updateCardTitle when card value is undefined", async () => {
			const { updateTitle, card } = setup(boardCard.id);
			card.value = undefined;

			await updateTitle("new title");

			expect(mockedBoardApiCalls.updateCardTitle).not.toHaveBeenCalled();
		});

		it("should update card title", async () => {
			const newTitle = "new Title";
			const { updateTitle, card } = setup(boardCard.id);
			card.value = boardCard;

			await updateTitle(newTitle);

			expect(boardCard.title).toEqual(newTitle);
		});

		it("should not update card title when api response has error", async () => {
			mockedBoardApiCalls.updateCardTitle = jest
				.fn()
				.mockResolvedValue({ status: 300 });
			mockedBoardNotifierCalls.isErrorCode = jest.fn().mockReturnValue(true);
			const boardCardNew: BoardCard = {
				id: `cardid`,
				height: 200,
				title: "old Title",
				elements: [],
				visibility: { publishedAt: new Date().toUTCString() },
			};

			const newTitle = "new Title";
			const { updateTitle, card } = setup(boardCardNew.id);
			card.value = boardCardNew;

			await updateTitle(newTitle);

			expect(boardCardNew.title).toEqual("old Title");
			expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
				"update"
			);
			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
		});
	});

	describe("deleteCard", () => {
		it("should call deleteCard", async () => {
			const boardCard = boardCardFactory.build();

			const { deleteCard, card } = setup(boardCard.id);
			card.value = boardCard;

			await deleteCard();

			expect(mockedBoardApiCalls.deleteCardCall).toHaveBeenCalledWith(
				boardCard.id
			);
		});

		it("should not call deleteCard when card value is undefined", async () => {
			const { deleteCard, card } = setup("test-id");
			card.value = undefined;

			await deleteCard();

			expect(mockedBoardApiCalls.deleteCardCall).not.toHaveBeenCalled();
		});

		it("should call showErrorAndReload method when api response has error", async () => {
			mockedBoardApiCalls.deleteCardCall = jest
				.fn()
				.mockResolvedValue({ status: 300 });
			mockedBoardNotifierCalls.isErrorCode = jest.fn().mockReturnValue(true);
			const testCard = boardCardFactory.build();
			const { deleteCard, card } = setup(testCard.id);
			card.value = testCard;

			await deleteCard();

			expect(mockedBoardApiCalls.deleteCardCall).toHaveBeenCalled();
			expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
				"delete",
				"boardCard"
			);
			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
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

			expect(mockedBoardApiCalls.updateCardHeightCall).toHaveBeenCalledWith(
				boardCard.id,
				newHeight
			);
		});

		it("should not call updateCardHeightCall when card value is undefined", async () => {
			const { updateCardHeight, card } = setup(boardCard.id);
			card.value = undefined;
			const newHeight = 300;

			await updateCardHeight(newHeight);

			expect(mockedBoardApiCalls.updateCardHeightCall).not.toHaveBeenCalled();
		});

		it("should update card height", async () => {
			const newHeight = 300;
			const { updateCardHeight, card } = setup(boardCard.id);
			card.value = boardCard;

			await updateCardHeight(newHeight);

			expect(boardCard.height).toEqual(newHeight);
		});

		it("should not update card height when api response has error", async () => {
			mockedBoardApiCalls.updateCardHeightCall = jest
				.fn()
				.mockResolvedValue({ status: 300 });
			mockedBoardNotifierCalls.isErrorCode = jest.fn().mockReturnValue(true);
			const boardCard = boardCardFactory.build();
			const { updateCardHeight, card } = setup(boardCard.id);
			card.value = boardCard;

			await updateCardHeight(300);

			expect(boardCard.height).toEqual(200);
			expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
				"update"
			);
			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
		});
	});

	describe("addElement", () => {
		it("should call addElement", async () => {
			const boardCard = boardCardFactory.build();
			const { addElement, card } = setup(boardCard.id);
			const elementType: CreateContentElementBody = {
				type: ContentElementType.RichText,
			};
			card.value = boardCard;

			await addElement(elementType.type);

			expect(mockedBoardApiCalls.createElementCall).toHaveBeenCalledWith(
				boardCard.id,
				elementType
			);
			expect(boardCard.elements).toHaveLength(1);
		});

		it("should not call addElement when card value is undefined", async () => {
			const { addElement, card } = setup("test-id");
			const elementType: CreateContentElementBody = {
				type: ContentElementType.RichText,
			};
			card.value = undefined;

			await addElement(elementType.type);

			expect(mockedBoardApiCalls.createElementCall).not.toHaveBeenCalled();
		});

		it("should not add element when api response has error", async () => {
			mockedBoardApiCalls.createElementCall = jest
				.fn()
				.mockResolvedValue({ status: 300 });
			mockedBoardNotifierCalls.isErrorCode = jest.fn().mockReturnValue(true);

			const testCard = boardCardFactory.build();
			const { addElement, card } = setup(testCard.id);
			const elementType: CreateContentElementBody = {
				type: ContentElementType.RichText,
			};
			card.value = testCard;

			await addElement(elementType.type);

			expect(testCard.elements).toHaveLength(0);
			expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
				"create",
				"boardElement"
			);
			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
		});
	});

	describe("deleteElement", () => {
		describe("when card state is undefined", () => {
			const setup = () => {
				const { deleteElement, card } = mountComposable(
					() => useCardState("cardid"),
					{
						[I18N_KEY as symbol]: { t: (key: string) => key },
						[NOTIFIER_MODULE_KEY as symbol]: notifierModule,
					}
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
				const { deleteElement, card } = mountComposable(
					() => useCardState("cardid"),
					{
						[I18N_KEY as symbol]: { t: (key: string) => key },
						[NOTIFIER_MODULE_KEY as symbol]: notifierModule,
					}
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

			it("should not remove element when api response has error", async () => {
				mockedBoardApiCalls.deleteElementCall = jest
					.fn()
					.mockResolvedValue({ status: 300 });
				mockedBoardNotifierCalls.isErrorCode = jest.fn().mockReturnValue(true);

				const { deleteElement, fileElementResponse } = setup();

				await deleteElement(fileElementResponse.id);

				expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
					"update"
				);
				expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalled();
			});
		});
	});
});
