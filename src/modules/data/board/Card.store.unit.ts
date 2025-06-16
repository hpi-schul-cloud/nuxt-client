import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import {
	ContentElementType,
	PreferredToolResponse,
	ToolContextType,
} from "@/serverApi/v3";
import { envConfigModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import {
	envsFactory,
	externalToolElementResponseFactory,
	fileElementResponseFactory,
	ObjectIdMock,
	richTextElementContentFactory,
	richTextElementResponseFactory,
} from "@@/tests/test-utils";
import { cardResponseFactory } from "@@/tests/test-utils/factory/cardResponseFactory";
import { drawingElementResponseFactory } from "@@/tests/test-utils/factory/drawingElementResponseFactory";
import setupStores from "@@/tests/test-utils/setupStores";
import {
	CreateElementRequestPayload,
	useCardStore,
	useSocketConnection,
} from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import {
	useBoardNotifier,
	useSharedEditMode,
	useSharedLastCreatedElement,
} from "@util-board";
import { cloneDeep } from "lodash";
import { createPinia, setActivePinia } from "pinia";
import { computed, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useBoardApi } from "./BoardApi.composable";
import { useBoardFocusHandler } from "./BoardFocusHandler.composable";
import { useCardRestApi } from "./cardActions/cardRestApi.composable";
import { useCardSocketApi } from "./cardActions/cardSocketApi.composable";

jest.mock("vue-i18n");
(useI18n as jest.Mock).mockReturnValue({ t: (key: string) => key });

jest.mock("@data-board/BoardApi.composable");
const mockedUseBoardApi = jest.mocked(useBoardApi);

jest.mock("./cardActions/cardSocketApi.composable");
const mockedUseCardSocketApi = jest.mocked(useCardSocketApi);

jest.mock("./cardActions/cardRestApi.composable");
const mockedUseCardRestApi = jest.mocked(useCardRestApi);

jest.mock("@util-board");
const mockedSharedEditMode = jest.mocked(useSharedEditMode);
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);
const mockedSharedLastCreatedElement = jest.mocked(useSharedLastCreatedElement);

jest.mock("@/components/error-handling/ErrorHandler.composable");
const mockedUseErrorHandler = jest.mocked(useErrorHandler);

jest.mock("@data-board/socket/socket");
const mockedUseSocketConnection = jest.mocked(useSocketConnection);

jest.mock("./BoardFocusHandler.composable");
const mockedBoardFocusHandler = jest.mocked(useBoardFocusHandler);

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
	let editModeId: Ref<string | undefined>;
	let mockedBoardFocusCalls: DeepMocked<
		ReturnType<typeof useBoardFocusHandler>
	>;

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

		mockedCardSocketApiActions = createMock<
			ReturnType<typeof useCardSocketApi>
		>({
			dispatch: jest.fn().mockResolvedValue(undefined),
			fetchCardRequest: jest.fn(),
			createElementRequest: jest.fn(),
			deleteElementRequest: jest.fn(),
			updateElementRequest: jest.fn(),
			moveElementRequest: jest.fn(),
			deleteCardRequest: jest.fn(),
			updateCardTitleRequest: jest.fn(),
			updateCardHeightRequest: jest.fn(),
			disconnectSocketRequest: jest.fn(),
		});
		mockedUseCardSocketApi.mockReturnValue(mockedCardSocketApiActions);

		mockedCardRestApiActions = createMock<ReturnType<typeof useCardRestApi>>({
			fetchCardRequest: jest.fn(),
			createElementRequest: jest.fn(),
			createPreferredElement: jest.fn(),
			getPreferredTools: jest.fn(),
			deleteElementRequest: jest.fn(),
			updateElementRequest: jest.fn(),
			moveElementRequest: jest.fn(),
			deleteCardRequest: jest.fn(),
			updateCardTitleRequest: jest.fn(),
			updateCardHeightRequest: jest.fn(),
			disconnectSocketRequest: jest.fn(),
		});
		mockedUseCardRestApi.mockReturnValue(mockedCardRestApiActions);

		mockedSharedLastCreatedElementActions =
			createMock<ReturnType<typeof useSharedLastCreatedElement>>();
		mockedSharedLastCreatedElement.mockReturnValue(
			mockedSharedLastCreatedElementActions
		);

		mockedBoardFocusCalls =
			createMock<ReturnType<typeof useBoardFocusHandler>>();
		mockedBoardFocusHandler.mockReturnValue(mockedBoardFocusCalls);

		setEditModeId = jest.fn();
		editModeId = ref(undefined);
		mockedSharedEditMode.mockReturnValue({
			setEditModeId,
			editModeId,
			isInEditMode: computed(() => true),
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
		const fileElement = fileElementResponseFactory.build();
		const externalToolElement = externalToolElementResponseFactory.build();

		const cardId = cards[0].id;
		const card = cards[0];
		card.elements = elements;
		card.elements.push(fileElement);
		card.elements.push(externalToolElement);

		for (const card of cards) {
			cardStore.cards[card.id] = card;
		}

		cardStore.preferredTools = [];

		return { cardStore, cardId, elements };
	};

	const focusSetup = (id: string) => {
		const focusedId = ref<string | undefined>(id);
		const mockSetFocus = jest.fn().mockImplementation((id: string) => {
			focusedId.value = id;
		});
		const mockForceFocus = jest.fn();
		mockedBoardFocusHandler.mockReturnValue({
			setFocus: mockSetFocus,
			forceFocus: mockForceFocus,
			focusedId,
		});

		return { setFocus: mockForceFocus, forceFocus: mockForceFocus };
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

			cardStore.fetchCardSuccess({ cards, isOwnAction: true });

			expect(cardStore.getCard(cards[0].id)).toEqual(cards[0]);
		});
	});

	describe("createCardSuccess", () => {
		describe("when card is provided", () => {
			it("should add the card to the store", async () => {
				const { cardStore } = setup();

				const newCardId = "idNewCard";
				const newCard = cardResponseFactory.build({ id: newCardId });
				await cardStore.createCardSuccess({
					newCard,
					columnId: "any-column-id",
					isOwnAction: true,
				});

				expect(cardStore.cards[newCardId]).toBeDefined();
				expect(cardStore.cards[newCardId]).toEqual(
					expect.objectContaining({ id: newCardId, elements: [] })
				);
			});
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
				isOwnAction: true,
			});

			expect(cardStore.cards).toEqual(oldCards);
		});

		it("set editModeId to undefined if cardId is equal to editModeId", async () => {
			const { cardStore, cardId } = setup();

			editModeId.value = cardId;

			cardStore.deleteCardSuccess({
				cardId,
				isOwnAction: true,
			});

			expect(setEditModeId).toHaveBeenCalledWith(undefined);
		});

		it("should delete a card", async () => {
			const { cardStore, cardId } = setup();

			cardStore.deleteCardSuccess({
				cardId,
				isOwnAction: true,
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
				isOwnAction: true,
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
				isOwnAction: true,
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
				isOwnAction: true,
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
				isOwnAction: true,
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
				const newElement = drawingElementResponseFactory.build();
				const toPosition = 1;

				await cardStore.createElementSuccess({
					type: ContentElementType.Drawing,
					cardId,
					newElement,
					toPosition,
					isOwnAction: true,
				});

				expect(cardStore.cards[cardId].elements.length).toEqual(6);
				expect(cardStore.cards[cardId].elements[toPosition]).toEqual(
					newElement
				);
			});
			it("should add element to last position if toPosition is undefined", async () => {
				const { cardStore, cardId } = setup();
				const newElement = drawingElementResponseFactory.build();

				expect(cardStore.cards[cardId].elements.length).toEqual(5);
				await cardStore.createElementSuccess({
					type: ContentElementType.Drawing,
					cardId,
					newElement,
					isOwnAction: true,
				});

				expect(cardStore.cards[cardId].elements.length).toEqual(6);
				expect(cardStore.cards[cardId].elements[5]).toEqual(newElement);
			});
		});

		describe("when cardId is invalid", () => {
			it("should not add element", async () => {
				const { cardStore } = setup();
				const newElement = drawingElementResponseFactory.build();

				expect(Object.keys(cardStore.cards).length).toEqual(3);
				await cardStore.createElementSuccess({
					type: ContentElementType.Drawing,
					cardId: "invalidId",
					newElement,
					isOwnAction: true,
				});

				expect(Object.keys(cardStore.cards).length).toEqual(3);
			});
		});

		describe("when new position is invalid", () => {
			it("should not add element", async () => {
				const { cardStore, cardId } = setup();
				const newElement = drawingElementResponseFactory.build();

				expect(Object.keys(cardStore.cards).length).toEqual(3);
				await cardStore.createElementSuccess({
					type: ContentElementType.Drawing,
					cardId,
					newElement,
					toPosition: 100,
					isOwnAction: true,
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

			expect(cardStore.cards[cardId].elements[4].id).toEqual(elementId);
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
				isOwnAction: true,
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
				isOwnAction: true,
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
				isOwnAction: true,
			});

			expect(cardStore.cards[cardId].elements[1].id).toEqual(elementId);
		});
	});

	describe("deleteElementSuccess", () => {
		afterEach(() => {
			jest.resetAllMocks();
		});
		it("should not delete element if card is undefined", async () => {
			const { cardStore, cardId, elements } = setup();
			const numberOfElements = cardStore.cards[cardId].elements.length;
			const elementId = elements[0].id;

			await cardStore.deleteElementSuccess({
				cardId: "unkown",
				elementId,
				isOwnAction: true,
			});

			expect(cardStore.cards[cardId].elements.length).toEqual(numberOfElements);
		});

		it("should delete element", async () => {
			const { cardStore, cardId, elements } = setup();
			const numberOfElements = cardStore.cards[cardId].elements.length;
			const elementId = elements[0].id;

			await cardStore.deleteElementSuccess({
				cardId,
				elementId,
				isOwnAction: true,
			});

			expect(cardStore.cards[cardId].elements.length).toEqual(
				numberOfElements - 1
			);
		});

		describe("when previous element needs to be focused", () => {
			describe("when the element first element", () => {
				it('should call "forceFocus" if already focused element is deleted', async () => {
					const { cardStore, cardId, elements } = setup();
					const elementId = elements[0].id;

					const { setFocus } = focusSetup(elementId);
					setFocus(elementId);

					await cardStore.deleteElementSuccess({
						cardId,
						elementId,
						isOwnAction: true,
					});

					expect(mockedBoardFocusCalls.forceFocus).toHaveBeenCalledWith(cardId);
					expect(setEditModeId).toHaveBeenCalledWith(cardId);
				});
			});

			describe("when the element is not first element", () => {
				it('should call "forceFocus" if already focused element is deleted', async () => {
					const { cardStore, cardId } = setup();
					const elementId = cardStore.cards[cardId].elements[4].id;

					const { setFocus } = focusSetup(elementId);
					setFocus(elementId);

					await cardStore.deleteElementSuccess({
						cardId,
						elementId,
						isOwnAction: true,
					});

					expect(mockedBoardFocusCalls.forceFocus).toHaveBeenCalledWith(
						cardStore.cards[cardId].elements[3].id
					);
					expect(setEditModeId).toHaveBeenCalledWith(cardId);
				});
			});

			it("should not call forceFocus if element is not focused", async () => {
				const { cardStore, cardId, elements } = setup();
				const elementId = elements[0].id;

				const { setFocus } = focusSetup("unknownId");

				setFocus("unknownId");

				await cardStore.deleteElementSuccess({
					cardId,
					elementId,
					isOwnAction: true,
				});

				expect(mockedBoardFocusCalls.forceFocus).not.toHaveBeenCalled();
			});
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
				isOwnAction: true,
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
				isOwnAction: true,
			});

			expect(cardStore.cards[cardId].elements[0].content).toEqual(newContent);
		});
	});

	describe("loadPreferredTools", () => {
		describe("when the api call is successful", () => {
			const successSetup = () => {
				const { cardStore } = setup();

				const preferredTools = [
					{
						name: "mock tool",
						iconName: "mdiMock",
						schoolExternalToolId: ObjectIdMock(),
					},
				];

				mockedCardRestApiActions.getPreferredTools.mockResolvedValueOnce(
					preferredTools
				);

				return { cardStore, preferredTools };
			};

			it("should call getPreferredTools", async () => {
				const { cardStore } = successSetup();

				await cardStore.loadPreferredTools(ToolContextType.BoardElement);

				expect(mockedCardRestApiActions.getPreferredTools).toHaveBeenCalledWith(
					ToolContextType.BoardElement
				);
			});

			it("should set the preferredTools ref", async () => {
				const { cardStore, preferredTools } = successSetup();

				await cardStore.loadPreferredTools(ToolContextType.BoardElement);

				expect(cardStore.preferredTools).toEqual(
					expect.arrayContaining(preferredTools)
				);
			});

			it("should set the isPreferredToolsLoading at the end to false", async () => {
				const { cardStore } = successSetup();

				await cardStore.loadPreferredTools(ToolContextType.BoardElement);

				expect(cardStore.isPreferredToolsLoading).toBe(false);
			});
		});
	});

	describe("createPreferredElement", () => {
		const setupCreatePreferredElement = () => {
			const { cardStore } = setup();

			const payload: CreateElementRequestPayload = {
				cardId: "cardId",
				type: ContentElementType.ExternalTool,
			};

			const preferredTool: PreferredToolResponse = {
				schoolExternalToolId: ObjectIdMock(),
				name: "Tool name",
				iconName: "mock iconName",
			};

			return {
				cardStore,
				payload,
				preferredTool,
			};
		};

		it("should call createPreferredElement", () => {
			const { cardStore, payload, preferredTool } =
				setupCreatePreferredElement();

			cardStore.createPreferredElement(payload, preferredTool);

			expect(
				mockedCardRestApiActions.createPreferredElement
			).toHaveBeenCalledWith(payload, preferredTool);
		});
	});

	describe("disconnectSocketRequest", () => {
		describe("when using socket connection", () => {
			it("should call disconnectSocket", () => {
				const { cardStore } = setup(true);

				cardStore.disconnectSocketRequest();

				expect(
					mockedCardSocketApiActions.disconnectSocketRequest
				).toHaveBeenCalled();
			});
		});

		describe("when using rest connection", () => {
			it("should call disconnectSocket", () => {
				const { cardStore } = setup(false);

				cardStore.disconnectSocketRequest();

				expect(
					mockedCardRestApiActions.disconnectSocketRequest
				).toHaveBeenCalled();
			});
		});
	});
});
