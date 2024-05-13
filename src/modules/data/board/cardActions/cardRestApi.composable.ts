import { useBoardApi } from "../BoardApi.composable";
import { useSharedEditMode } from "../EditMode.composable";
import {
	ApiErrorHandlerFactory,
	BoardObjectType,
	ErrorType,
	useErrorHandler,
} from "@/components/error-handling/ErrorHandler.composable";
import {
	DeleteCardRequestPayload,
	FetchCardRequestPayload,
	UpdateCardHeightRequestPayload,
	UpdateCardTitleRequestPayload,
} from "./cardActionPayload";
import { useCardStore } from "../Card.store";
import { useSharedCardRequestPool } from "../CardRequestPool.composable";

export const useCardRestApi = () => {
	const cardStore = useCardStore();

	const { fetchCard: fetchCardFromApi } = useSharedCardRequestPool();
	const { handleError, notifyWithTemplate } = useErrorHandler();

	const { deleteCardCall, updateCardTitle, updateCardHeightCall } =
		useBoardApi();

	const { setEditModeId } = useSharedEditMode();

	const deleteCardRequest = async (payload: DeleteCardRequestPayload) => {
		const card = cardStore.getCard(payload.cardId);
		if (card === undefined) return;

		try {
			await deleteCardCall(payload.cardId);
			cardStore.deleteCardSuccess(payload);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "boardCard"),
			});
		}
	};

	const fetchCardRequest = async (
		payload: FetchCardRequestPayload
	): Promise<void> => {
		// await delay(100);
		try {
			const promises = payload.cardIds.map(fetchCardFromApi);
			const cards = await Promise.all(promises);
			cardStore.fetchCardSuccess({ cards });
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notLoaded", "boardCard"),
			});
		} finally {
			// isLoading.value = false;
		}
	};

	const updateCardTitleRequest = async (
		payload: UpdateCardTitleRequestPayload
	): Promise<void> => {
		const card = cardStore.getCard(payload.cardId);
		if (card === undefined) return;

		try {
			await updateCardTitle(payload.cardId, payload.newTitle);
			cardStore.updateCardTitleSuccess(payload);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated"),
			});
		}
	};

	const updateCardHeightRequest = async (
		payload: UpdateCardHeightRequestPayload
	) => {
		const card = cardStore.getCard(payload.cardId);
		if (card === undefined) return;

		try {
			await updateCardHeightCall(payload.cardId, payload.newHeight);
			cardStore.updateCardHeightSuccess(payload);
		} catch (error) {
			handleError(error, {});
		}
	};

	const notifyWithTemplateAndReload: ApiErrorHandlerFactory = (
		errorType: ErrorType,
		boardObjectType?: BoardObjectType
	) => {
		return () => {
			notifyWithTemplate(errorType, boardObjectType)();
			// emit("reload:board"); // TODO: Solve reload of board
			setEditModeId(undefined);
		};
	};

	// this unused function is added to make sure that the same name is used in both socketApi and restApi
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const disconnectSocketRequest = (): void => {};

	return {
		deleteCardRequest,
		fetchCardRequest,
		updateCardTitleRequest,
		updateCardHeightRequest,
		disconnectSocketRequest,
	};
};
