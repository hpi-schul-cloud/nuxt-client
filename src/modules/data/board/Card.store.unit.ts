import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { useBoardNotifier, useSharedLastCreatedElement } from "@util-board";
import { useBoardApi } from "./BoardApi.composable";
import { useSharedEditMode } from "./EditMode.composable";
import { useI18n } from "vue-i18n";
import { useSocketConnection, useCardStore } from "@data-board";
import { useCardSocketApi } from "./cardActions/cardSocketApi.composable";
import { useCardRestApi } from "./cardActions/cardRestApi.composable";
import { DeepMocked, createMock } from "@golevelup/ts-jest";
import { createPinia, setActivePinia } from "pinia";
import setupStores from "@@/tests/test-utils/setupStores";
import EnvConfigModule from "@/store/env-config";
import { ref } from "vue";
import { envConfigModule } from "@/store";
import {
	envsFactory,
	richTextElementContentFactory,
	richTextElementResponseFactory,
} from "@@/tests/test-utils";
import { cardResponseFactory } from "@@/tests/test-utils/factory/cardResponseFactory";
import { ContentElementType } from "@/serverApi/v3";
import { drawingContentElementResponseFactory } from "@@/tests/test-utils/factory/drawingContentElementResponseFactory";
import { cloneDeep } from "lodash";

jest.mock("vue-i18n");
(useI18n as jest.Mock).mockReturnValue({ t: (key: string) => key });

jest.mock("@data-board/BoardApi.composable");
const mockedUseBoardApi = jest.mocked(useBoardApi);

jest.mock("./cardActions/cardSocketApi.composable");
const mockedUseCardSocketApi = jest.mocked(useCardSocketApi);

jest.mock("./cardActions/cardRestApi.composable");
const mockedUseCardRestApi = jest.mocked(useCardRestApi);

jest.mock("./EditMode.composable");
const mockedSharedEditMode = jest.mocked(useSharedEditMode);

jest.mock("@util-board");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);
const mockedSharedLastCreatedElement = jest.mocked(useSharedLastCreatedElement);

jest.mock("@/components/error-handling/ErrorHandler.composable");
const mockedUseErrorHandler = jest.mocked(useErrorHandler);

jest.mock("@data-board/socket/socket");
const mockedUseSocketConnection = jest.mocked(useSocketConnection);

describe("CardStore", () => {
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	let mockedBoardApiCalls: DeepMocked<ReturnType<typeof useBoardApi>>;
	let mockedErrorHandlerCalls: DeepMocked<ReturnType<typeof useErrorHandler>>;
	let mockedSocketApiHandler: DeepMocked<
		ReturnType<typeof useSocketConnection>
	>;
	let mockedCardSocketApiActions: DeepMocked<
		ReturnType<typeof useCardSocketApi>
	>;
	let mockedCardRestApiActions: DeepMocked<ReturnType<typeof useCardRestApi>>;
	let mockedSharedLastCreatedElementActions: DeepMocked<
		ReturnType<typeof useSharedLastCreatedElement>
	>;
	let setEditModeId: jest.Mock;

	beforeEach(() => {
		setActivePinia(createPinia());
		setupStores({ envConfigModule: EnvConfigModule });
		mockedBoardApiCalls = createMock<ReturnType<typeof useBoardApi>>();
		mockedUseBoardApi.mockReturnValue(mockedBoardApiCalls);

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

		mockedErrorHandlerCalls = createMock<ReturnType<typeof useErrorHandler>>();
		mockedUseErrorHandler.mockReturnValue(mockedErrorHandlerCalls);

		mockedSocketApiHandler =
			createMock<ReturnType<typeof useSocketConnection>>();
		mockedUseSocketConnection.mockReturnValue(mockedSocketApiHandler);

		mockedCardSocketApiActions =
			createMock<ReturnType<typeof useCardSocketApi>>();
		mockedUseCardSocketApi.mockReturnValue(mockedCardSocketApiActions);

		mockedCardRestApiActions = createMock<ReturnType<typeof useCardRestApi>>();
		mockedUseCardRestApi.mockReturnValue(mockedCardRestApiActions);

		mockedSharedLastCreatedElementActions =
			createMock<ReturnType<typeof useSharedLastCreatedElement>>();
		mockedSharedLastCreatedElement.mockReturnValue(
			mockedSharedLastCreatedElementActions
		);

		setEditModeId = jest.fn();
		mockedSharedEditMode.mockReturnValue({
			setEditModeId,
			editModeId: ref(undefined),
		});
	});

	const setup = (socketFlag = false) => {
		if (socketFlag) {
			const envs = envsFactory.build({
				FEATURE_COLUMN_BOARD_SOCKET_ENABLED: true,
			});
			envConfigModule.setEnvs(envs);
		}

		const cardStore = useCardStore();
		const cards = cardResponseFactory.buildList(3);
		const elements = richTextElementResponseFactory.buildList(3);

		const cardId = cards[0].id;
		const card = cards[0];
		card.elements = elements;
		cardStore.cards[cardId] = card;
		cardStore.fetchCardSuccess({ cards });

		return { cardStore, cardId, elements };
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("fetchCardRequest", () => {
		it("should call socket Api if feature flag is enabled", async () => {
			const { cardStore } = setup(true);
			const cardIds = ["id1", "id2aewr", "id3423"];

			await cardStore.fetchCardRequest({ cardIds });
			expect(mockedCardSocketApiActions.fetchCardRequest).toHaveBeenCalledWith({
				cardIds,
			});
		});
		it("should call rest Api if feature flag is disabled", async () => {
			const { cardStore } = setup(false);
			const cardIds = ["id1", "id2aewr", "id3423"];

			await cardStore.fetchCardRequest({ cardIds });
			expect(mockedCardRestApiActions.fetchCardRequest).toHaveBeenCalledWith({
				cardIds,
			});
		});
	});

	describe("fetchCardSuccess", () => {
		it("should add cards to store", () => {
			const { cardStore } = setup();
			const cards = cardResponseFactory.buildList(3);

			cardStore.fetchCardSuccess({ cards });

			expect(cardStore.getCard(cards[0].id)).toEqual(cards[0]);
		});
	});

	describe("deleteCardRequest", () => {
		it("should call socket Api if feature flag is enabled", () => {
			const { cardStore, cardId } = setup(true);

			cardStore.deleteCardRequest({
				cardId,
			});

			expect(mockedCardSocketApiActions.deleteCardRequest).toHaveBeenCalledWith(
				{
					cardId,
				}
			);
		});

		it("should call rest Api if feature flag is enabled", () => {
			const { cardStore, cardId } = setup();

			cardStore.deleteCardRequest({
				cardId,
			});

			expect(mockedCardRestApiActions.deleteCardRequest).toHaveBeenCalledWith({
				cardId,
			});
		});
	});

	describe("deleteCardSuccess", () => {
		it("should not delete any card when card is undefined", async () => {
			const { cardStore } = setup();

			const oldCards = cloneDeep(cardStore.cards);

			cardStore.deleteCardSuccess({
				cardId: "unkownId",
			});

			expect(cardStore.cards).toEqual(oldCards);
		});

		it("should delete a card", async () => {
			const { cardStore, cardId } = setup();

			cardStore.deleteCardSuccess({
				cardId,
			});

			expect(cardStore.cards[cardId]).toBeUndefined();
		});
	});

	describe("updateCardTitleRequest", () => {
		it("should call socket Api if feature flag is enabled", () => {
			const { cardStore, cardId } = setup(true);
			const payload = { cardId, newTitle: "newTitle" };

			cardStore.updateCardTitleRequest(payload);

			expect(
				mockedCardSocketApiActions.updateCardTitleRequest
			).toHaveBeenCalledWith(payload);
		});

		it("should call rest Api if feature flag is enabled", () => {
			const { cardStore, cardId } = setup();
			const payload = { cardId, newTitle: "newTitle" };

			cardStore.updateCardTitleRequest(payload);

			expect(
				mockedCardRestApiActions.updateCardTitleRequest
			).toHaveBeenCalledWith(payload);
		});
	});

	describe("updateCardTitleSuccess", () => {
		const NEW_TITLE = "newTitle";
		it("should not update card title when card is undefined", async () => {
			const { cardStore } = setup();

			const cardTitles = Object.values(cardStore.cards).map(
				(card) => card.title
			);

			cardStore.updateCardTitleSuccess({
				cardId: "unkownId",
				newTitle: NEW_TITLE,
			});

			expect(Object.values(cardStore.cards).map((card) => card.title)).toEqual(
				cardTitles
			);
		});

		it("should update card title", async () => {
			const { cardStore, cardId } = setup();

			cardStore.updateCardTitleSuccess({
				cardId,
				newTitle: NEW_TITLE,
			});

			expect(cardStore.cards[cardId].title).toEqual(NEW_TITLE);
		});
	});

	describe("updateCardHeightRequest", () => {
		it("should call socket Api if feature flag is enabled", () => {
			const { cardStore, cardId } = setup(true);
			const payload = { cardId, newHeight: 100 };

			cardStore.updateCardHeightRequest(payload);

			expect(
				mockedCardSocketApiActions.updateCardHeightRequest
			).toHaveBeenCalledWith(payload);
		});

		it("should call rest Api if feature flag is enabled", () => {
			const { cardStore, cardId } = setup();
			const payload = { cardId, newHeight: 100 };

			cardStore.updateCardHeightRequest(payload);

			expect(
				mockedCardRestApiActions.updateCardHeightRequest
			).toHaveBeenCalledWith(payload);
		});
	});

	describe("updateCardHeightSuccess", () => {
		const NEW_HEIGHT = 100;
		it("should not update card height when card is undefined", async () => {
			const { cardStore } = setup();

			const cardHeights = Object.values(cardStore.cards).map(
				(card) => card.height
			);

			cardStore.updateCardHeightSuccess({
				cardId: "unkownId",
				newHeight: NEW_HEIGHT,
			});

			expect(Object.values(cardStore.cards).map((card) => card.height)).toEqual(
				cardHeights
			);
		});

		it("should update card height", async () => {
			const { cardStore, cardId } = setup();

			cardStore.updateCardHeightSuccess({
				cardId,
				newHeight: NEW_HEIGHT,
			});

			expect(cardStore.cards[cardId].height).toEqual(NEW_HEIGHT);
		});
	});

	describe("resetState", () => {
		it("should reset cards", () => {
			const { cardStore } = setup();

			cardStore.resetState();

			expect(cardStore.cards).toEqual({});
		});
	});

	describe("getCard", () => {
		it("should return card", () => {
			const { cardStore, cardId } = setup();

			expect(cardStore.getCard(cardId)).toEqual(cardStore.cards[cardId]);
		});
	});

	describe("createElementRequest", () => {
		it("should call socket Api if feature flag is enabled", async () => {
			const { cardStore, cardId } = setup(true);

			const payload = {
				type: ContentElementType.Link,
				cardId,
			};

			await cardStore.createElementRequest(payload);

			expect(
				mockedCardSocketApiActions.createElementRequest
			).toHaveBeenCalledWith(payload);
		});

		it("should call rest Api if feature flag is disabled", async () => {
			const { cardStore, cardId } = setup();

			const payload = {
				type: ContentElementType.Link,
				cardId,
			};

			await cardStore.createElementRequest(payload);

			expect(
				mockedCardRestApiActions.createElementRequest
			).toHaveBeenCalledWith(payload);
		});
	});

	describe("createElementSuccess", () => {
		describe("when element is provided", () => {
			it("should add element to specified position", async () => {
				const { cardStore, cardId } = setup();
				const newElement = drawingContentElementResponseFactory.build();
				const toPosition = 1;

				await cardStore.createElementSuccess({
					type: ContentElementType.Drawing,
					cardId,
					newElement,
					toPosition,
				});

				expect(cardStore.cards[cardId].elements.length).toEqual(4);
				expect(cardStore.cards[cardId].elements[toPosition]).toEqual(
					newElement
				);
			});
			it("should add element to last position if toPosition is undefined", async () => {
				const { cardStore, cardId } = setup();
				const newElement = drawingContentElementResponseFactory.build();

				expect(cardStore.cards[cardId].elements.length).toEqual(3);
				await cardStore.createElementSuccess({
					type: ContentElementType.Drawing,
					cardId,
					newElement,
				});

				expect(cardStore.cards[cardId].elements.length).toEqual(4);
				expect(cardStore.cards[cardId].elements[3]).toEqual(newElement);
			});
		});

		describe("when cardId is invalid", () => {
			it("should not add element", async () => {
				const { cardStore } = setup();
				const newElement = drawingContentElementResponseFactory.build();

				expect(Object.keys(cardStore.cards).length).toEqual(3);
				await cardStore.createElementSuccess({
					type: ContentElementType.Drawing,
					cardId: "invalidId",
					newElement,
				});

				expect(Object.keys(cardStore.cards).length).toEqual(3);
			});
		});

		describe("when new position is invalid", () => {
			it("should not add element", async () => {
				const { cardStore, cardId } = setup();
				const newElement = drawingContentElementResponseFactory.build();

				expect(Object.keys(cardStore.cards).length).toEqual(3);
				await cardStore.createElementSuccess({
					type: ContentElementType.Drawing,
					cardId,
					newElement,
					toPosition: 100,
				});

				expect(Object.keys(cardStore.cards).length).toEqual(3);
			});
		});
	});

	describe("moveElementRequest", () => {
		const MOVE_UP = -1;
		const MOVE_DOWN = 1;
		it("should not move element when card is undefined", async () => {
			const { cardStore } = setup();

			await cardStore.moveElementRequest(
				"unknownId",
				" elementId",
				-1,
				MOVE_DOWN
			);

			expect(
				mockedCardRestApiActions.moveElementRequest
			).not.toHaveBeenCalled();
		});

		it("should not move element up if first element is moved", async () => {
			const { cardStore, cardId, elements } = setup();

			const elementId = elements[0].id;
			await cardStore.moveElementRequest(cardId, elementId, 0, MOVE_UP);

			expect(cardStore.cards[cardId].elements[0].id).toEqual(elementId);
		});

		it("should not move element down if last element is moved", async () => {
			const { cardStore, cardId, elements } = setup();
			const lastIndex = elements.length - 1;
			const elementId = elements[lastIndex].id;

			await cardStore.moveElementRequest(
				cardId,
				elementId,
				lastIndex,
				MOVE_DOWN
			);

			expect(cardStore.cards[cardId].elements[2].id).toEqual(elementId);
		});

		it("should call socket Api if feature flag is enabled", async () => {
			const { cardStore, cardId, elements } = setup(true);
			const elementId = elements[0].id;

			await cardStore.moveElementRequest(cardId, elementId, 0, MOVE_DOWN);

			expect(
				mockedCardSocketApiActions.moveElementRequest
			).toHaveBeenCalledWith({
				elementId,
				toCardId: cardId,
				toPosition: 1,
			});
		});

		it("should call rest Api if feature flag is disabled", async () => {
			const { cardStore, cardId, elements } = setup();
			const elementId = elements[0].id;

			await cardStore.moveElementRequest(cardId, elementId, 0, MOVE_DOWN);

			expect(mockedCardRestApiActions.moveElementRequest).toHaveBeenCalledWith({
				elementId,
				toCardId: cardId,
				toPosition: 1,
			});
		});
	});

	describe("moveElementSuccess", () => {
		it("should not move element when card is undefined", async () => {
			const { cardStore, cardId, elements } = setup();
			const elementId = elements[0].id;

			await cardStore.moveElementSuccess({
				elementId: elements[0].id,
				toCardId: "unknownId",
				toPosition: 1,
			});

			expect(cardStore.cards[cardId].elements[0].id).toEqual(elementId);
		});

		it("should move element down", async () => {
			const { cardStore, cardId, elements } = setup();
			const elementId = elements[0].id;
			const toPosition = 1;

			await cardStore.moveElementSuccess({
				elementId,
				toCardId: cardId,
				toPosition,
			});

			expect(cardStore.cards[cardId].elements[toPosition].id).toEqual(
				elementId
			);
		});

		it("should move element up", async () => {
			const { cardStore, cardId, elements } = setup();

			const elementId = elements[2].id;
			const toPosition = 1;
			await cardStore.moveElementSuccess({
				elementId,
				toCardId: cardId,
				toPosition,
			});

			expect(cardStore.cards[cardId].elements[1].id).toEqual(elementId);
		});
	});

	describe("deleteElementSuccess", () => {
		it("should not delete element if card is undefined", async () => {
			const { cardStore, cardId, elements } = setup();
			const numberOfElements = cardStore.cards[cardId].elements.length;
			const elementId = elements[0].id;

			await cardStore.deleteElementSuccess({ cardId: "unkown", elementId });

			expect(cardStore.cards[cardId].elements.length).toEqual(numberOfElements);
		});
		it("should delete element", async () => {
			const { cardStore, cardId, elements } = setup();
			const numberOfElements = cardStore.cards[cardId].elements.length;
			const elementId = elements[0].id;

			await cardStore.deleteElementSuccess({ cardId, elementId });

			expect(cardStore.cards[cardId].elements.length).toEqual(
				numberOfElements - 1
			);
		});
	});

	describe("addTextAfterTitle", () => {
		it("should not add text after title when card is undefined", async () => {
			const { cardStore } = setup();

			await cardStore.addTextAfterTitle("unknownId");

			expect(
				mockedCardRestApiActions.createElementRequest
			).not.toHaveBeenCalled();
		});

		it("should add text after title", async () => {
			const { cardStore, cardId, elements } = setup();

			await cardStore.addTextAfterTitle(cardId);

			const expectedCall = {
				type: elements[0].type,
				cardId,
				toPosition: 0,
			};

			expect(
				mockedCardRestApiActions.createElementRequest
			).toHaveBeenCalledWith(expectedCall);
		});
	});

	describe("updateElementSuccess", () => {
		it("should not update element if element id does not belong to a card ", async () => {
			const { cardStore, cardId } = setup();

			const oldElements = cloneDeep(cardStore.cards[cardId].elements);

			await cardStore.updateElementSuccess({
				elementId: "non existing id",
				data: {
					type: ContentElementType.RichText,
					content: richTextElementContentFactory.build(),
				},
			});

			expect(cardStore.cards[cardId].elements).toEqual(oldElements);
		});

		it("should update element", async () => {
			const { cardStore, cardId, elements } = setup();

			const elementToUpdate = elements[0];
			const newContent = richTextElementContentFactory.build();

			await cardStore.updateElementSuccess({
				elementId: elementToUpdate.id,
				data: {
					type: elementToUpdate.type,
					content: newContent,
				},
			});

			expect(cardStore.cards[cardId].elements[0].content).toEqual(newContent);
		});
	});
});
