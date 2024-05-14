import { setActivePinia } from "pinia";
import { ref } from "vue";
import { envsFactory, mockedPiniaStoreTyping } from "@@/tests/test-utils";
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
		const cards = cardResponseFactory.buildList(3);
		cardStore.fetchCardSuccess({ cards: cards });

		return { boardStore, cardStore, cards };
	};

	describe("deleteCardRequest", () => {
		it("should not call deleteCardSuccess action when card is undefined", async () => {
			const { cardStore } = setup();
			const { deleteCardRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(undefined);

			await deleteCardRequest({ cardId: "cardId" });

			expect(cardStore.deleteCardSuccess).not.toHaveBeenCalled();
		});

		it("should call deleteCardSuccess action if the API call is successful", async () => {
			const { cardStore, cards } = setup();
			const { deleteCardRequest } = useCardRestApi();
			const cardId = cards[0].id;

			cardStore.getCard.mockReturnValue(cards[0]);

			await deleteCardRequest({ cardId });

			expect(cardStore.deleteCardSuccess).toHaveBeenCalledWith({
				cardId,
			});
		});

		it("should call handleError if the API call fails", async () => {
			const { cardStore, cards } = setup();
			const { deleteCardRequest } = useCardRestApi();
			const cardId = cards[0].id;

			cardStore.getCard.mockReturnValue(cards[0]);
			mockedBoardApiCalls.deleteCardCall.mockRejectedValue({});

			await deleteCardRequest({ cardId });

			expect(mockedErrorHandler.handleError).toHaveBeenCalled();
		});
	});

	describe("fetchCardRequest", () => {
		it("should call fetchCardSuccess action if the API call is successful", async () => {
			const { cardStore, cards } = setup();
			const { fetchCardRequest } = useCardRestApi();

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
			const { cardStore, cards } = setup();
			const { updateCardTitleRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(cards[0]);

			const requestPayload: UpdateCardTitleRequestPayload = {
				cardId: cards[0].id,
				newTitle: "newTitle",
			};

			await updateCardTitleRequest(requestPayload);

			expect(cardStore.updateCardTitleSuccess).toHaveBeenCalledWith(
				requestPayload
			);
		});

		it("should call handleError if the API call fails", async () => {
			const { cardStore, cards } = setup();
			const { updateCardTitleRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(cards[0]);
			mockedBoardApiCalls.updateCardTitle.mockRejectedValue({});

			await updateCardTitleRequest({
				cardId: cards[0].id,
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
			const { cardStore, cards } = setup();
			const { updateCardHeightRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(cards[0]);

			const requestPayload: UpdateCardHeightRequestPayload = {
				cardId: cards[0].id,
				newHeight: 100,
			};

			await updateCardHeightRequest(requestPayload);

			expect(cardStore.updateCardHeightSuccess).toHaveBeenCalledWith(
				requestPayload
			);
		});

		it("should call handleError if the API call fails", async () => {
			const { cardStore, cards } = setup();
			const { updateCardHeightRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(cards[0]);
			mockedBoardApiCalls.updateCardHeightCall.mockRejectedValue({});

			await updateCardHeightRequest({
				cardId: cards[0].id,
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
			const { boardStore, cardStore, cards } = setup();
			const { updateCardTitleRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(cards[0]);

			mockedBoardApiCalls.updateCardTitle.mockRejectedValue({});
			mockedErrorHandler.notifyWithTemplate.mockReturnValue(jest.fn());

			await updateCardTitleRequest({
				cardId: cards[0].id,
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
