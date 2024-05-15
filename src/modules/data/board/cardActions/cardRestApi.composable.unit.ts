import { setActivePinia } from "pinia";
import { ref } from "vue";
import {
	envsFactory,
	mockedPiniaStoreTyping,
	richTextElementResponseFactory,
} from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { useSocketConnection, useCardStore, useBoardStore } from "@data-board";
import { useCardRestApi } from "./cardRestApi.composable";
import { useBoardApi } from "../BoardApi.composable";
import { useSharedEditMode } from "../EditMode.composable";
import setupStores from "@@/tests/test-utils/setupStores";
import EnvConfigModule from "@/store/env-config";
import { envConfigModule } from "@/store";
import { createTestingPinia } from "@pinia/testing";
import {
	UpdateCardHeightRequestPayload,
	UpdateCardTitleRequestPayload,
} from "./cardActionPayload";
import { cardResponseFactory } from "@@/tests/test-utils/factory/cardResponseFactory";
import { useSharedCardRequestPool } from "../CardRequestPool.composable";
import { ContentElementType, RichTextElementResponse } from "@/serverApi/v3";
import { AxiosResponse } from "axios";

jest.mock("@/components/error-handling/ErrorHandler.composable");
const mockedUseErrorHandler = jest.mocked(useErrorHandler);

jest.mock("../BoardApi.composable");
const mockedUseBoardApi = jest.mocked(useBoardApi);

jest.mock("../CardRequestPool.composable");
const mockedSharedCardRequestPool = jest.mocked(useSharedCardRequestPool);

jest.mock("../EditMode.composable");
const mockedSharedEditMode = jest.mocked(useSharedEditMode);

jest.mock("../socket/socket");
const mockedUseSocketConnection = jest.mocked(useSocketConnection);

describe("useCardRestApi", () => {
	let mockedErrorHandler: DeepMocked<ReturnType<typeof useErrorHandler>>;
	let mockedBoardApiCalls: DeepMocked<ReturnType<typeof useBoardApi>>;
	let mockedSharedCardRequestPoolCalls: DeepMocked<
		ReturnType<typeof useSharedCardRequestPool>
	>;
	let mockedSocketConnectionHandler: DeepMocked<
		ReturnType<typeof useSocketConnection>
	>;
	let setEditModeId: jest.Mock;

	beforeEach(() => {
		setActivePinia(createTestingPinia({}));
		setupStores({ envConfigModule: EnvConfigModule });
		const envs = envsFactory.build({
			FEATURE_COLUMN_BOARD_SOCKET_ENABLED: false,
		});
		envConfigModule.setEnvs(envs);

		mockedSocketConnectionHandler =
			createMock<ReturnType<typeof useSocketConnection>>();
		mockedUseSocketConnection.mockReturnValue(mockedSocketConnectionHandler);

		mockedErrorHandler = createMock<ReturnType<typeof useErrorHandler>>();
		mockedUseErrorHandler.mockReturnValue(mockedErrorHandler);

		mockedBoardApiCalls = createMock<ReturnType<typeof useBoardApi>>();
		mockedUseBoardApi.mockReturnValue(mockedBoardApiCalls);

		mockedSharedCardRequestPoolCalls =
			createMock<ReturnType<typeof useSharedCardRequestPool>>();
		mockedSharedCardRequestPool.mockReturnValue(
			mockedSharedCardRequestPoolCalls
		);

		setEditModeId = jest.fn();
		mockedSharedEditMode.mockReturnValue({
			setEditModeId,
			editModeId: ref(undefined),
		});
	});

	const setup = () => {
		const boardStore = mockedPiniaStoreTyping(useBoardStore);
		const cardStore = mockedPiniaStoreTyping(useCardStore);
		const card = cardResponseFactory.build();

		return { boardStore, cardStore, card };
	};

	describe("createElementRequest", () => {
		it("should not call createElementSuccess action when card is undefined", async () => {
			const { cardStore } = setup();
			const { createElementRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(undefined);

			await createElementRequest({
				cardId: "cardId",
				type: ContentElementType.RichText,
				toPosition: 0,
			});

			expect(cardStore.createElementSuccess).not.toHaveBeenCalled();
		});

		it("should call createElementSuccess action if the API call is successful", async () => {
			const { cardStore, card } = setup();
			const { createElementRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(card);

			const newElementResponse = createMock<
				AxiosResponse<RichTextElementResponse, any>
			>({
				data: richTextElementResponseFactory.build(),
			});
			mockedBoardApiCalls.createElementCall.mockResolvedValue(
				newElementResponse
			);

			const payload = {
				cardId: card.id,
				type: ContentElementType.RichText,
				toPosition: 0,
			};

			await createElementRequest(payload);

			expect(cardStore.createElementSuccess).toHaveBeenCalledWith({
				...payload,
				newElement: newElementResponse.data,
			});
		});

		it("should call handleError if the API call fails", async () => {
			const { cardStore, card } = setup();
			const { createElementRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(card);
			mockedBoardApiCalls.createElementCall.mockRejectedValue({});

			await createElementRequest({
				cardId: card.id,
				type: ContentElementType.RichText,
			});

			expect(mockedErrorHandler.handleError).toHaveBeenCalled();
		});
	});

	describe("deleteElementRequest", () => {
		it("should not call deleteElementSuccess action when card is undefined", async () => {
			const { cardStore } = setup();
			const { deleteElementRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(undefined);

			await deleteElementRequest({
				cardId: "cardId",
				elementId: "elementId",
			});

			expect(cardStore.deleteElementSuccess).not.toHaveBeenCalled();
		});

		it("should call deleteElementSuccess action if the API call is successful", async () => {
			const { cardStore, card } = setup();
			const { deleteElementRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(card);

			const payload = {
				cardId: card.id,
				elementId: "elementId",
			};

			await deleteElementRequest(payload);

			expect(cardStore.deleteElementSuccess).toHaveBeenCalledWith(payload);
		});

		it("should call handleError if the API call fails", async () => {
			const { cardStore, card } = setup();
			const { deleteElementRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(card);
			mockedBoardApiCalls.deleteElementCall.mockRejectedValue({});

			await deleteElementRequest({
				cardId: card.id,
				elementId: "elementId",
			});

			expect(mockedErrorHandler.handleError).toHaveBeenCalled();
		});
	});

	describe("deleteCardRequest", () => {
		it("should not call deleteCardSuccess action when card is undefined", async () => {
			const { cardStore } = setup();
			const { deleteCardRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(undefined);

			await deleteCardRequest({ cardId: "cardId" });

			expect(cardStore.deleteCardSuccess).not.toHaveBeenCalled();
		});

		it("should call deleteCardSuccess action if the API call is successful", async () => {
			const { cardStore, card } = setup();
			const { deleteCardRequest } = useCardRestApi();
			const cardId = card.id;

			cardStore.getCard.mockReturnValue(card);

			await deleteCardRequest({ cardId });

			expect(cardStore.deleteCardSuccess).toHaveBeenCalledWith({
				cardId,
			});
		});

		it("should call handleError if the API call fails", async () => {
			const { cardStore, card } = setup();
			const { deleteCardRequest } = useCardRestApi();
			const cardId = card.id;

			cardStore.getCard.mockReturnValue(card);
			mockedBoardApiCalls.deleteCardCall.mockRejectedValue({});

			await deleteCardRequest({ cardId });

			expect(mockedErrorHandler.handleError).toHaveBeenCalled();
		});
	});

	describe("fetchCardRequest", () => {
		it("should call fetchCardSuccess action if the API call is successful", async () => {
			const { cardStore } = setup();
			const { fetchCardRequest } = useCardRestApi();

			const cards = cardResponseFactory.buildList(3);

			mockedSharedCardRequestPoolCalls.fetchCard.mockResolvedValue(cards[0]);
			const cardIds = cards.map((card) => card.id);

			await fetchCardRequest({ cardIds });

			expect(cardStore.fetchCardSuccess).toHaveBeenCalled();
		});

		it("should call handleError if the API call fails", async () => {
			setup();
			const { fetchCardRequest } = useCardRestApi();

			mockedSharedCardRequestPoolCalls.fetchCard.mockRejectedValue({});

			await fetchCardRequest({ cardIds: ["temp"] });

			expect(mockedErrorHandler.handleError).toHaveBeenCalled();
		});
	});

	describe("updateCardTitleRequest", () => {
		it("should not call updateCardTitleSuccess action when card is undefined", async () => {
			const { cardStore } = setup();
			const { updateCardTitleRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(undefined);

			await updateCardTitleRequest({
				cardId: "cardId",
				newTitle: "newTitle",
			});

			expect(cardStore.updateCardTitleSuccess).not.toHaveBeenCalled();
		});

		it("should call updateCardTitleSuccess action if the API call is successful", async () => {
			const { cardStore, card } = setup();
			const { updateCardTitleRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(card);

			const requestPayload: UpdateCardTitleRequestPayload = {
				cardId: card.id,
				newTitle: "newTitle",
			};

			await updateCardTitleRequest(requestPayload);

			expect(cardStore.updateCardTitleSuccess).toHaveBeenCalledWith(
				requestPayload
			);
		});

		it("should call handleError if the API call fails", async () => {
			const { cardStore, card } = setup();
			const { updateCardTitleRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(card);
			mockedBoardApiCalls.updateCardTitle.mockRejectedValue({});

			await updateCardTitleRequest({
				cardId: card.id,
				newTitle: "newTitle",
			});

			expect(mockedErrorHandler.handleError).toHaveBeenCalled();
		});
	});

	describe("updateCardHeightRequest", () => {
		it("should not call updateCardHeightSuccess action when card is undefined", async () => {
			const { cardStore } = setup();
			const { updateCardHeightRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(undefined);

			await updateCardHeightRequest({
				cardId: "cardId",
				newHeight: 100,
			});

			expect(cardStore.updateCardHeightSuccess).not.toHaveBeenCalled();
		});

		it("should call updateCardHeightSuccess action if the API call is successful", async () => {
			const { cardStore, card } = setup();
			const { updateCardHeightRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(card);

			const requestPayload: UpdateCardHeightRequestPayload = {
				cardId: card.id,
				newHeight: 100,
			};

			await updateCardHeightRequest(requestPayload);

			expect(cardStore.updateCardHeightSuccess).toHaveBeenCalledWith(
				requestPayload
			);
		});

		it("should call handleError if the API call fails", async () => {
			const { cardStore, card } = setup();
			const { updateCardHeightRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(card);
			mockedBoardApiCalls.updateCardHeightCall.mockRejectedValue({});

			await updateCardHeightRequest({
				cardId: card.id,
				newHeight: 100,
			});

			expect(mockedErrorHandler.handleError).toHaveBeenCalled();
		});
	});

	describe("notifyWithTemplateAndReload", () => {
		/**
		 * Simulates actually calling the error handling function for a 404 error.
		 * (otherwise the handler function would not be called on the mock)
		 */
		const executeErrorHandler = () => {
			mockedErrorHandler.handleError.mock.calls[0]?.[1]?.[404]?.();
		};

		it("should notify with template", async () => {
			const { boardStore, cardStore, card } = setup();
			const { updateCardTitleRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(card);

			mockedBoardApiCalls.updateCardTitle.mockRejectedValue({});
			mockedErrorHandler.notifyWithTemplate.mockReturnValue(jest.fn());

			await updateCardTitleRequest({
				cardId: card.id,
				newTitle: "newTitle",
			});

			executeErrorHandler();
			expect(mockedErrorHandler.notifyWithTemplate).toHaveBeenCalledWith(
				"notUpdated",
				undefined
			);

			expect(boardStore.reloadBoard).toHaveBeenCalled();
			expect(setEditModeId).toHaveBeenCalledWith(undefined);
		});
	});
});
