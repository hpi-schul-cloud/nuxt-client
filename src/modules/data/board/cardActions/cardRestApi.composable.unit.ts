import { setActivePinia } from "pinia";
import { ref } from "vue";
import {
	boardCardFactory,
	envsFactory,
	mockedPiniaStoreTyping,
} from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { useBoardSocketApi, useCardStore } from "@data-board";
import { useCardRestApi } from "./cardRestApi.composable";
import { useBoardApi } from "../BoardApi.composable";
import { useSharedEditMode } from "../EditMode.composable";
import setupStores from "@@/tests/test-utils/setupStores";
import EnvConfigModule from "@/store/env-config";
import { envConfigModule } from "@/store";
import { createTestingPinia } from "@pinia/testing";

jest.mock("@/components/error-handling/ErrorHandler.composable");
const mockedUseErrorHandler = jest.mocked(useErrorHandler);

jest.mock("../BoardApi.composable");
const mockedUseBoardApi = jest.mocked(useBoardApi);

jest.mock("../EditMode.composable");
const mockedSharedEditMode = jest.mocked(useSharedEditMode);

jest.mock("../socket/socket");
const mockedUseSocketApi = jest.mocked(useBoardSocketApi);

describe("useCardRestApi", () => {
	let mockedErrorHandler: DeepMocked<ReturnType<typeof useErrorHandler>>;
	let mockedBoardApiCalls: DeepMocked<ReturnType<typeof useBoardApi>>;
	let mockedSocketApiHandler: DeepMocked<ReturnType<typeof useBoardSocketApi>>;
	let setEditModeId: jest.Mock;

	beforeEach(() => {
		setActivePinia(createTestingPinia({}));
		setupStores({ envConfigModule: EnvConfigModule });
		const envs = envsFactory.build({
			FEATURE_COLUMN_BOARD_SOCKET_ENABLED: false,
		});
		envConfigModule.setEnvs(envs);

		mockedSocketApiHandler = createMock<ReturnType<typeof useBoardSocketApi>>();
		mockedUseSocketApi.mockReturnValue(mockedSocketApiHandler);

		mockedErrorHandler = createMock<ReturnType<typeof useErrorHandler>>();
		mockedUseErrorHandler.mockReturnValue(mockedErrorHandler);

		mockedBoardApiCalls = createMock<ReturnType<typeof useBoardApi>>();
		mockedUseBoardApi.mockReturnValue(mockedBoardApiCalls);

		setEditModeId = jest.fn();
		mockedSharedEditMode.mockReturnValue({
			setEditModeId,
			editModeId: ref(undefined),
		});
	});

	const setup = () => {
		const cardStore = mockedPiniaStoreTyping(useCardStore);
		const cards = boardCardFactory.buildList(3);
		cardStore.cards = cards;

		return { cardStore };
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
			const { cardStore } = setup();
			const { deleteCardRequest } = useCardRestApi();
			const cardId = cardStore.cards[0].id;

			cardStore.getCard.mockReturnValue(cardStore.cards[0]);

			await deleteCardRequest({ cardId });

			expect(cardStore.deleteCardSuccess).toHaveBeenCalledWith({
				cardId,
			});
		});

		it("should call handleError if the API call fails", async () => {
			const { cardStore } = setup();
			const { deleteCardRequest } = useCardRestApi();
			const cardId = cardStore.cards[0].id;

			cardStore.getCard.mockReturnValue(cardStore.cards[0]);
			mockedBoardApiCalls.deleteCardCall.mockRejectedValue({});

			await deleteCardRequest({ cardId });

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
			const { cardStore } = setup();
			const { updateCardTitleRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(cardStore.cards[0]);

			const requestPayload = {
				cardId: cardStore.cards[0].id,
				newTitle: "newTitle",
			};

			await updateCardTitleRequest(requestPayload);

			expect(cardStore.updateCardTitleSuccess).toHaveBeenCalledWith(
				requestPayload
			);
		});

		it("should call handleError if the API call fails", async () => {
			const { cardStore } = setup();
			const { updateCardTitleRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(cardStore.cards[0]);
			mockedBoardApiCalls.updateCardTitle.mockRejectedValue({});

			await updateCardTitleRequest({
				cardId: cardStore.cards[0].id,
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
				id: "cardId",
				height: 100,
			});

			expect(cardStore.updateCardHeightSuccess).not.toHaveBeenCalled();
		});

		it("should call updateCardHeightSuccess action if the API call is successful", async () => {
			const { cardStore } = setup();
			const { updateCardHeightRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(cardStore.cards[0]);

			const requestPayload = {
				id: cardStore.cards[0].id,
				height: 100,
			};

			await updateCardHeightRequest(requestPayload);

			expect(cardStore.updateCardHeightSuccess).toHaveBeenCalledWith(
				requestPayload
			);
		});

		it("should call handleError if the API call fails", async () => {
			const { cardStore } = setup();
			const { updateCardHeightRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(cardStore.cards[0]);
			mockedBoardApiCalls.updateCardHeightCall.mockRejectedValue({});

			await updateCardHeightRequest({
				id: cardStore.cards[0].id,
				height: 100,
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
			const { cardStore } = setup();
			const { updateCardTitleRequest } = useCardRestApi();

			cardStore.getCard.mockReturnValue(cardStore.cards[0]);

			mockedBoardApiCalls.updateCardTitle.mockRejectedValue({});
			mockedErrorHandler.notifyWithTemplate.mockReturnValue(jest.fn());

			await updateCardTitleRequest({
				cardId: cardStore.cards[0].id,
				newTitle: "newTitlte",
			});

			executeErrorHandler();
			expect(mockedErrorHandler.notifyWithTemplate).toHaveBeenCalledWith(
				"notUpdated",
				undefined
			);

			expect(setEditModeId).toHaveBeenCalledWith(undefined);
		});
	});
});
