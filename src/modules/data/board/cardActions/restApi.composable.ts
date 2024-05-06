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
	UpdateCardHeightRequestPayload,
	UpdateCardTitleRequestPayload,
} from "./cardActionPayload";
import { useCardStore } from "../Cards.store";

export const useCardRestApi = () => {
	const cardStore = useCardStore();
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

	const updateCardTitleRequest = async (
		payload: UpdateCardTitleRequestPayload
	): Promise<void> => {
		const card = cardStore.getCard(payload.id);
		if (card === undefined) return;

		try {
			await updateCardTitle(payload.id, payload.title);
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
		const card = cardStore.getCard(payload.id);
		if (card === undefined) return;

		try {
			await updateCardHeightCall(payload.id, payload.height);
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
		updateCardTitleRequest,
		updateCardHeightRequest,
		disconnectSocketRequest,
	};
};
