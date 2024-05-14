import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { useBoardNotifier } from "@util-board";
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
import { nextTick, ref } from "vue";
import { envConfigModule } from "@/store";
import { envsFactory } from "@@/tests/test-utils";
import { cardResponseFactory } from "@@/tests/test-utils/factory/cardResponseFactory";
import { ContentElementType } from "@/serverApi/v3";
import { AnyContentElement } from "@/types/board/ContentElement";

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

		cardStore.fetchCardSuccess({ cards });

		return { cardStore, cardId: cards[0].id };
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("fetchCardTitleRequest", () => {
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

			const cardTitles = Object.values(cardStore.cards).map(
				(card) => card.title
			);

			cardStore.deleteCardSuccess({
				cardId: "unkownId",
			});

			expect(Object.values(cardStore.cards).map((card) => card.title)).toEqual(
				cardTitles
			);
		});

		it("should delete card", async () => {
			const { cardStore, cardId } = setup();

			cardStore.deleteCardSuccess({
				cardId,
			});

			expect(cardStore.getCard(cardId)).toBeUndefined();
		});
	});

	describe("updateCardTitleRequest", () => {
		it("should call socket Api if feature flag is enabled", () => {
			const { cardStore, cardId } = setup(true);

			cardStore.updateCardTitleRequest({
				cardId,
				newTitle: "newTitle",
			});

			expect(
				mockedCardSocketApiActions.updateCardTitleRequest
			).toHaveBeenCalledWith({
				cardId,
				newTitle: "newTitle",
			});
		});

		it("should call rest Api if feature flag is enabled", () => {
			const { cardStore, cardId } = setup();

			cardStore.updateCardTitleRequest({
				cardId,
				newTitle: "newTitle",
			});

			expect(
				mockedCardRestApiActions.updateCardTitleRequest
			).toHaveBeenCalledWith({
				cardId,
				newTitle: "newTitle",
			});
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

			cardStore.updateCardHeightRequest({
				cardId,
				newHeight: 100,
			});

			expect(
				mockedCardSocketApiActions.updateCardHeightRequest
			).toHaveBeenCalledWith({
				cardId,
				newHeight: 100,
			});
		});

		it("should call rest Api if feature flag is enabled", () => {
			const { cardStore, cardId } = setup();

			cardStore.updateCardHeightRequest({
				cardId,
				newHeight: 100,
			});

			expect(
				mockedCardRestApiActions.updateCardHeightRequest
			).toHaveBeenCalledWith({
				cardId,
				newHeight: 100,
			});
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

	describe("addElement", () => {
		it("should not add element when card is undefined", async () => {
			const { cardStore } = setup();

			const cardHeights = Object.values(cardStore.cards).map(
				(card) => card.height
			);

			await cardStore.addElement(ContentElementType.Link, "unknownId");

			expect(Object.values(cardStore.cards).map((card) => card.height)).toEqual(
				cardHeights
			);
		});

		it("should add element", async () => {
			const { cardStore, cardId } = setup();

			expect(cardStore.cards[cardId].elements.length).toEqual(0);
			await cardStore.addElement(ContentElementType.Drawing, cardId);

			expect(cardStore.cards[cardId].elements.length).toEqual(1);
		});
	});

	describe("moveElement", () => {
		let elements: AnyContentElement[] = [];

		beforeEach(() => {
			elements = [];
			elements.push({
				id: "link-1",
				content: {
					url: "https://www.google.com/",
					title: "Google",
					description: "",
					imageUrl: "",
				},
				timestamps: {
					lastUpdatedAt: "2024-05-13T14:59:46.909Z",
					createdAt: "2024-05-13T14:59:46.909Z",
				},
				type: ContentElementType.Link,
			});

			elements.push({
				id: "link-2",
				content: {
					url: "https://www.google.com/",
					title: "Google",
					description: "",
					imageUrl: "",
				},
				timestamps: {
					lastUpdatedAt: "2024-05-13T14:59:46.909Z",
					createdAt: "2024-05-13T14:59:46.909Z",
				},
				type: ContentElementType.Link,
			});
		});

		describe("moveElementDown", () => {
			it("should move element down", async () => {
				const { cardStore, cardId } = setup();
				cardStore.cards[cardId].elements.push(...elements);

				cardStore.moveElementDown(cardId, {
					elementIndex: 0,
					payload: elements[0].id,
				});

				expect(cardStore.cards[cardId].elements[0].id).toEqual(elements[1].id);
			});

			it("should not move element down when elementIndex is last", async () => {
				const { cardStore, cardId } = setup();
				cardStore.cards[cardId].elements.push(...elements);

				cardStore.moveElementDown(cardId, {
					elementIndex: 1,
					payload: elements[1].id,
				});

				expect(cardStore.cards[cardId].elements[1].id).toEqual(elements[1].id);
			});
		});

		describe("moveElementUp", () => {
			it("should move element up", async () => {
				const { cardStore, cardId } = setup();
				cardStore.cards[cardId].elements.push(...elements);

				const currentCardElements = [...cardStore.cards[cardId].elements];

				cardStore.moveElementUp(cardId, {
					elementIndex: 1,
					payload: currentCardElements[1].id,
				});

				await nextTick();

				expect(cardStore.cards[cardId].elements[0].id).toEqual(
					currentCardElements[1].id
				);
			});

			it("should not move element up when elementIndex is 0", async () => {
				const { cardStore, cardId } = setup();
				cardStore.cards[cardId].elements.push(...elements);

				cardStore.moveElementUp(cardId, {
					elementIndex: 0,
					payload: elements[0].id,
				});

				expect(cardStore.cards[cardId].elements[0].id).toEqual(elements[0].id);
			});
		});
	});

	describe("deleteElement", () => {
		it("should delete element", async () => {
			const { cardStore, cardId } = setup();
			const elementId = "elementId";
			cardStore.cards[cardId].elements.push({
				id: elementId,
				content: {
					url: "https://www.google.com/",
					title: "Google",
					description: "",
					imageUrl: "",
				},
				timestamps: {
					lastUpdatedAt: "2024-05-13T14:59:46.909Z",
					createdAt: "2024-05-13T14:59:46.909Z",
				},
				type: ContentElementType.Link,
			});

			await cardStore.deleteElement(cardId, elementId);

			expect(cardStore.cards[cardId].elements.length).toEqual(0);
		});
	});

	describe("addTextAfterTitle", () => {
		it("should add text after title", async () => {
			const { cardStore, cardId } = setup();

			await cardStore.addTextAfterTitle(cardId);

			expect(cardStore.cards[cardId].elements.length).toEqual(1);
		});
	});
});
