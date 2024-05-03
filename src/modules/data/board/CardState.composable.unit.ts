import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import {
	ContentElementType,
	CreateContentElementBodyParams,
} from "@/serverApi/v3";
import NotifierModule from "@/store/notifier";
import { BoardCard } from "@/types/board/Card";
import { AnyContentElement } from "@/types/board/ContentElement";
import { ElementMove } from "@/types/board/DragAndDrop";
import { delay } from "@/utils/helpers";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { axiosErrorFactory } from "@@/tests/test-utils";
import {
	boardCardFactory,
	fileElementResponseFactory,
} from "@@/tests/test-utils/factory";
import { apiResponseErrorFactory } from "@@/tests/test-utils/factory/apiResponseErrorFactory";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useBoardNotifier } from "@util-board";
import { AxiosResponse } from "axios";
import { nextTick } from "vue";

import { useBoardApi } from "./BoardApi.composable";
import { useBoardFocusHandler } from "./BoardFocusHandler.composable";
import { useSharedCardRequestPool } from "./CardRequestPool.composable";
import { useCardState } from "./CardState.composable";

const notifierModule = createModuleMocks(NotifierModule);

const emitMock = jest.fn();

jest.mock("vue-i18n", () => {
	return {
		...jest.requireActual("vue-i18n"),
		useI18n: jest.fn().mockReturnValue({ t: (key: string) => key }),
	};
});

const setup = (cardId = "123123", emitFn = emitMock) => {
	return mountComposable(() => useCardState(cardId, emitFn), {
		global: {
			provide: {
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
			},
		},
	});
};

jest.mock("./BoardApi.composable");
const mockedUseBoardApi = jest.mocked(useBoardApi);

jest.mock("@/utils/helpers");
jest.mocked(delay);

jest.mock("@util-board");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

jest.mock("./BoardFocusHandler.composable");
const mockedUseBoardFocusHandler = jest.mocked(useBoardFocusHandler);

jest.mock("./CardRequestPool.composable");
const mockedUseSharedCardRequestPool = jest.mocked(useSharedCardRequestPool);

jest.mock("@/components/error-handling/ErrorHandler.composable");
const mockedUseErrorHandler = jest.mocked(useErrorHandler);

jest.mock<typeof import("@/utils/create-shared-composable")>(
	"@/utils/create-shared-composable",
	() => ({
		createTestableSharedComposable: (composable) => composable,
	})
);

const setupErrorResponse = (message = "NOT_FOUND", code = 404) => {
	const expectedPayload = apiResponseErrorFactory.build({
		message,
		code,
	});
	const errorResponse = axiosErrorFactory.build({
		response: { data: expectedPayload },
	});

	return errorResponse;
};

describe("CardState composable", () => {
	let mockedBoardApiCalls: DeepMocked<ReturnType<typeof useBoardApi>>;
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	let mockedBoardFocusHandlerCalls: DeepMocked<
		ReturnType<typeof useBoardFocusHandler>
	>;
	let mockedSharedCardCalls: DeepMocked<
		ReturnType<typeof useSharedCardRequestPool>
	>;
	let mockedErrorHandlerCalls: DeepMocked<ReturnType<typeof useErrorHandler>>;

	let testCard: BoardCard;

	beforeEach(() => {
		jest.useFakeTimers();
		mockedSharedCardCalls =
			createMock<ReturnType<typeof useSharedCardRequestPool>>();

		mockedUseSharedCardRequestPool.mockReturnValue(mockedSharedCardCalls);

		mockedBoardApiCalls = createMock<ReturnType<typeof useBoardApi>>();
		mockedUseBoardApi.mockReturnValue(mockedBoardApiCalls);

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

		mockedBoardFocusHandlerCalls =
			createMock<ReturnType<typeof useBoardFocusHandler>>();
		mockedUseBoardFocusHandler.mockReturnValue(mockedBoardFocusHandlerCalls);

		mockedErrorHandlerCalls = createMock<ReturnType<typeof useErrorHandler>>();
		mockedUseErrorHandler.mockReturnValue(mockedErrorHandlerCalls);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("fetchCard", () => {
		it("should fetch card on mount", async () => {
			const cardId = "123124";

			setup(cardId);
			await nextTick();
			expect(mockedSharedCardCalls.fetchCard).toHaveBeenCalledWith(cardId);
		});

		it("should return fetch function that updates card and loading state", async () => {
			const cardId1 = "123124a";
			const cardId2 = "123125b";
			const { fetchCard, isLoading } = setup(cardId1);

			await fetchCard(cardId2);
			expect(mockedSharedCardCalls.fetchCard).toHaveBeenLastCalledWith(cardId2);
			expect(isLoading.value).toBe(false);
		});

		it("should handle an error that is return from the api", async () => {
			mockedSharedCardCalls.fetchCard = jest
				.fn()
				.mockRejectedValue(setupErrorResponse());

			const cardId1 = "123124a";
			const { fetchCard } = setup();

			await fetchCard(cardId1);

			expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
		});
	});

	describe("updateTitle", () => {
		const boardCard = boardCardFactory.build();

		it("should call updateCardTitle", async () => {
			const { updateTitle, card } = setup(boardCard.id);
			card.value = boardCard;
			const newTitle = "new title";

			await updateTitle(newTitle);

			expect(mockedBoardApiCalls.updateCardTitle).toHaveBeenCalledWith(
				boardCard.id,
				newTitle
			);
		});

		it("should not call updateCardTitle when card value is undefined", async () => {
			const { updateTitle, card } = setup(boardCard.id);
			card.value = undefined;

			await updateTitle("new title");

			expect(mockedBoardApiCalls.updateCardTitle).not.toHaveBeenCalled();
		});

		it("should catch error and call handleError", async () => {
			const { updateTitle, card } = setup(boardCard.id);
			card.value = boardCard;
			const newTitle = "new title";

			mockedBoardApiCalls.updateCardTitle.mockRejectedValue(
				setupErrorResponse()
			);

			await updateTitle(newTitle);
			expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalledTimes(1);
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
				.mockRejectedValue(setupErrorResponse());

			const testCard = boardCardFactory.build();
			const { deleteCard, card } = setup(testCard.id);
			card.value = testCard;

			await deleteCard();

			expect(mockedBoardApiCalls.deleteCardCall).toHaveBeenCalled();
			expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
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
			mockedSharedCardCalls.fetchCard.mockResolvedValue(testCard);
			const { updateCardHeight, card } = setup(boardCard.id);

			const newHeight = 300;

			card.value = boardCard;

			await updateCardHeight(newHeight);

			expect(boardCard.height).toEqual(newHeight);
		});

		it("should not update card height when api response has error", async () => {
			mockedSharedCardCalls.fetchCard.mockResolvedValue(testCard);
			mockedBoardApiCalls.updateCardHeightCall = jest
				.fn()
				.mockResolvedValue({ status: 500 });
			const boardCard = boardCardFactory.build();
			const { updateCardHeight, card } = setup(boardCard.id);
			card.value = boardCard;

			await nextTick();
			await updateCardHeight(300);
			expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
			expect(boardCard.height).toEqual(200);
		});
	});

	describe("addElement", () => {
		it("should call addElement", async () => {
			const boardCard = boardCardFactory.build();
			mockedSharedCardCalls.fetchCard.mockResolvedValue(boardCard);
			const elementType: CreateContentElementBodyParams = {
				type: ContentElementType.RichText,
			};
			const { addElement, card } = setup(boardCard.id);
			card.value = boardCard;

			mockedBoardApiCalls.createElementCall.mockResolvedValue({
				data: {
					id: "element-id",
				},
			} as AxiosResponse<AnyContentElement>);

			await addElement(elementType.type);

			expect(mockedBoardApiCalls.createElementCall).toHaveBeenCalledWith(
				boardCard.id,
				elementType
			);
			expect(card.value?.elements).toHaveLength(1);
		});

		it("should focus an added element", async () => {
			const boardCard = boardCardFactory.build();
			mockedSharedCardCalls.fetchCard.mockResolvedValue(boardCard);
			const { addElement, card } = setup(boardCard.id);
			card.value = boardCard;

			const elementId = "element-id";
			const elementType: CreateContentElementBodyParams = {
				type: ContentElementType.RichText,
			};
			mockedBoardApiCalls.createElementCall.mockResolvedValue({
				data: {
					id: elementId,
				},
			} as AxiosResponse<AnyContentElement>);

			await addElement(elementType.type);

			expect(mockedBoardFocusHandlerCalls.setFocus).toHaveBeenCalledWith(
				elementId
			);
		});

		it("should not call addElement when card value is undefined", async () => {
			const { addElement, card } = setup("test-id");
			const elementType: CreateContentElementBodyParams = {
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

			const testCard = boardCardFactory.build();
			const { addElement, card } = setup(testCard.id);
			const elementType: CreateContentElementBodyParams = {
				type: ContentElementType.RichText,
			};
			card.value = testCard;

			await addElement(elementType.type);

			expect(testCard.elements).toHaveLength(0);
			expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
		});
	});

	describe("moveElementDown", () => {
		describe("when card state is undefined", () => {
			const setup = () => {
				const emitMock = jest.fn();
				const { moveElementDown, card } = mountComposable(() =>
					useCardState("cardid", emitMock)
				);

				const moveElementPayload: ElementMove = {
					elementIndex: 0,
					payload: "elementId",
				};
				card.value = undefined;

				return { moveElementDown, moveElementPayload };
			};

			it("should not call moveElement", async () => {
				const { moveElementDown, moveElementPayload } = setup();

				await moveElementDown(moveElementPayload);

				expect(mockedBoardApiCalls.moveElementCall).not.toHaveBeenCalled();
			});
		});

		describe("when card state is defined", () => {
			const fileElementResponse = fileElementResponseFactory.build();
			const fileElementResponse2 = fileElementResponseFactory.build();

			it("should call moveElement", async () => {
				const boardCard = boardCardFactory.build();
				boardCard.elements.push(fileElementResponse);
				boardCard.elements.push(fileElementResponse2);
				mockedUseSharedCardRequestPool.mockReturnValue({
					fetchCard: jest.fn().mockReturnValue(boardCard),
				});
				const { card, moveElementDown } = setup();
				card.value = boardCard;
				await moveElementDown({
					elementIndex: 0,

					payload: fileElementResponse.id,
				});

				expect(mockedBoardApiCalls.moveElementCall).toHaveBeenCalledWith(
					fileElementResponse.id,
					card.value?.id,
					1
				);
			});

			it("should move element correctly", async () => {
				const boardCard = boardCardFactory.build();
				boardCard.elements.push(fileElementResponse);
				boardCard.elements.push(fileElementResponse2);
				mockedUseSharedCardRequestPool.mockReturnValue({
					fetchCard: jest.fn().mockReturnValue(boardCard),
				});
				const { card, moveElementDown } = setup();
				card.value = boardCard;

				await moveElementDown({
					elementIndex: 0,
					payload: fileElementResponse.id,
				});
				expect(card.value?.elements[0].id).toStrictEqual(
					fileElementResponse2.id
				);
				expect(card.value?.elements[1].id).toStrictEqual(
					fileElementResponse.id
				);
			});

			it("should not call moveElement if 'elementIndex' equals 0", async () => {
				const boardCard = boardCardFactory.build();
				const { card, moveElementDown } = setup();
				card.value = boardCard;
				const moveElementPayload = {
					elementIndex: -1,
					payload: "elementId",
				};
				await moveElementDown(moveElementPayload);

				expect(mockedBoardApiCalls.moveElementCall).not.toHaveBeenCalled();
			});

			it("should catch error and call handleError", async () => {
				const boardCard = boardCardFactory.build();
				const { card, moveElementDown } = setup();
				card.value = boardCard;

				mockedBoardApiCalls.moveElementCall.mockRejectedValue(
					setupErrorResponse()
				);
				await moveElementDown({
					elementIndex: 1,
					payload: fileElementResponse.id,
				});

				expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalledTimes(1);
			});
		});
	});

	describe("moveElementUp", () => {
		describe("when card state is undefined", () => {
			const setup = () => {
				const emitMock = jest.fn();
				const { moveElementUp, card } = mountComposable(() =>
					useCardState("cardid", emitMock)
				);

				const moveElementPayload: ElementMove = {
					elementIndex: 1,
					payload: "elementId",
				};
				card.value = undefined;

				return { moveElementUp, moveElementPayload };
			};

			it("should not call moveElement", async () => {
				const { moveElementUp, moveElementPayload } = setup();

				await moveElementUp(moveElementPayload);

				expect(mockedBoardApiCalls.moveElementCall).not.toHaveBeenCalled();
			});
		});

		describe("when card state is defined", () => {
			const fileElementResponse = fileElementResponseFactory.build();
			const fileElementResponse2 = fileElementResponseFactory.build();

			it("should call moveElement", async () => {
				const boardCard = boardCardFactory.build();
				boardCard.elements.push(fileElementResponse);
				boardCard.elements.push(fileElementResponse2);
				mockedUseSharedCardRequestPool.mockReturnValue({
					fetchCard: jest.fn().mockReturnValue(boardCard),
				});
				const { card, moveElementUp } = setup();
				card.value = boardCard;

				await moveElementUp({
					elementIndex: 1,

					payload: fileElementResponse.id,
				});

				expect(mockedBoardApiCalls.moveElementCall).toHaveBeenCalledWith(
					fileElementResponse.id,
					card.value?.id,
					0
				);
			});

			it("should move element correctly", async () => {
				const boardCard = boardCardFactory.build();
				boardCard.elements.push(fileElementResponse);
				boardCard.elements.push(fileElementResponse2);
				mockedUseSharedCardRequestPool.mockReturnValue({
					fetchCard: jest.fn().mockReturnValue(boardCard),
				});
				const { card, moveElementUp } = setup();
				card.value = boardCard;

				await moveElementUp({
					elementIndex: 1,
					payload: fileElementResponse2.id,
				});
				expect(card.value?.elements[0].id).toStrictEqual(
					fileElementResponse2.id
				);
				expect(card.value?.elements[1].id).toStrictEqual(
					fileElementResponse.id
				);
			});

			it("should not call moveElement if 'elementIndex' equals 0", async () => {
				const boardCard = boardCardFactory.build();
				const { card, moveElementUp } = setup();
				card.value = boardCard;
				const moveElementPayload = {
					elementIndex: 0,
					payload: "elementId",
				};
				await moveElementUp(moveElementPayload);

				expect(mockedBoardApiCalls.moveElementCall).not.toHaveBeenCalled();
			});

			it("should catch error and call handleError", async () => {
				const boardCard = boardCardFactory.build();
				const { card, moveElementUp } = setup();
				card.value = boardCard;

				mockedBoardApiCalls.moveElementCall.mockRejectedValue(
					setupErrorResponse()
				);
				await moveElementUp({
					elementIndex: 1,
					payload: fileElementResponse.id,
				});

				expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalledTimes(1);
			});
		});
	});

	describe("deleteElement", () => {
		describe("when card state is undefined", () => {
			it("should not call deleteElement", async () => {
				const { deleteElement } = setup();

				await deleteElement("elementid");

				expect(mockedBoardApiCalls.deleteElementCall).not.toHaveBeenCalled();
			});
		});

		describe("when card state is defined", () => {
			it("should call deleteElement", async () => {
				const { deleteElement, card } = setup();
				const testCard = boardCardFactory.build();
				const fileElementResponse = fileElementResponseFactory.build();
				card.value = testCard;
				await deleteElement(fileElementResponse.id);

				expect(mockedBoardApiCalls.deleteElementCall).toHaveBeenCalledWith(
					fileElementResponse.id
				);
			});

			it("should remove element from card", async () => {
				const fileElementResponse = fileElementResponseFactory.build();
				const fileElementResponse2 = fileElementResponseFactory.build();
				const testCard = boardCardFactory.build({
					elements: [fileElementResponse, fileElementResponse2],
				});
				mockedSharedCardCalls.fetchCard.mockResolvedValue(testCard);
				const { deleteElement, card } = setup();
				card.value = testCard;

				await deleteElement(fileElementResponse.id);

				expect(card.value?.elements).toEqual([fileElementResponse2]);
			});

			it("should not remove element when api response has error", async () => {
				mockedBoardApiCalls.deleteElementCall = jest
					.fn()
					.mockRejectedValue(setupErrorResponse());
				const testCard = boardCardFactory.build();

				const fileElementResponse = fileElementResponseFactory.build();
				const { deleteElement, card } = setup();
				card.value = testCard;
				await deleteElement(fileElementResponse.id);
				await nextTick();

				expect(mockedErrorHandlerCalls.handleError).toHaveBeenCalled();
			});
		});
	});

	describe("addTextAfterTitle", () => {
		it("should call createElementCall", async () => {
			const boardCard = boardCardFactory.build();
			mockedSharedCardCalls.fetchCard.mockResolvedValue(boardCard);
			const { addTextAfterTitle, card } = setup(boardCard.id);
			card.value = boardCard;

			mockedBoardApiCalls.createElementCall.mockResolvedValue({
				data: {
					id: "element-id",
				},
			} as AxiosResponse<AnyContentElement>);

			await addTextAfterTitle();

			expect(mockedBoardApiCalls.createElementCall).toHaveBeenCalled();
			expect(card.value?.elements).toHaveLength(1);
		});
	});

	describe("notifyWithTemplateAndReload", () => {
		describe("when is called", () => {
			it("should call notifyWithTemplate", async () => {
				const boardCard = boardCardFactory.build();
				const emitMock = jest.fn();
				const { notifyWithTemplateAndReload, card } = setup(
					boardCard.id,
					emitMock
				);
				card.value = boardCard;

				mockedErrorHandlerCalls.notifyWithTemplate.mockImplementation(() =>
					jest.fn()
				);

				const handler = notifyWithTemplateAndReload("notLoaded");
				handler();
				await nextTick();

				expect(mockedErrorHandlerCalls.notifyWithTemplate).toHaveBeenCalled();

				expect(emitMock).toHaveBeenCalledWith("reload:board");
			});
		});
	});
});
