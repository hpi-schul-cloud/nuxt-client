import {
	ApiErrorHandlerFactory,
	BoardObjectType,
	ErrorType,
	useErrorHandler,
} from "@/components/error-handling/ErrorHandler.composable";
import {
	ContentElementType,
	ExternalToolElementResponse,
	PreferedToolResponse,
	ToolContextType,
} from "@/serverApi/v3";
import SchoolExternalToolsModule from "@/store/school-external-tools";
import { AnyContentElement } from "@/types/board/ContentElement";
import { delay } from "@/utils/helpers";
import { injectStrict, SCHOOL_EXTERNAL_TOOLS_MODULE_KEY } from "@/utils/inject";
import { useBoardStore } from "@data-board";
import {
	ContextExternalTool,
	ContextExternalToolConfigurationTemplate,
	ContextExternalToolSave,
	useContextExternalToolApi,
} from "@data-external-tool";
import { useSharedEditMode } from "@util-board";
import { useBoardApi } from "../BoardApi.composable";
import { useCardStore } from "../Card.store";
import { useSharedCardRequestPool } from "../CardRequestPool.composable";
import {
	CreateElementRequestPayload,
	DeleteCardRequestPayload,
	DeleteElementRequestPayload,
	FetchCardRequestPayload,
	MoveElementRequestPayload,
	UpdateCardHeightRequestPayload,
	UpdateCardTitleRequestPayload,
	UpdateElementRequestPayload,
} from "./cardActionPayload";

export const useCardRestApi = () => {
	const boardStore = useBoardStore();
	const cardStore = useCardStore();

	const { fetchCard: fetchCardFromApi } = useSharedCardRequestPool();
	const { handleError, notifyWithTemplate } = useErrorHandler();

	const {
		createElementCall,
		deleteElementCall,
		deleteCardCall,
		updateElementCall,
		moveElementCall,
		updateCardTitle,
		updateCardHeightCall,
	} = useBoardApi();

	const { fetchPreferredTools } = useContextExternalToolApi();

	const { createContextExternalToolCall, fetchAvailableToolsForContextCall } =
		useContextExternalToolApi();

	const { setEditModeId } = useSharedEditMode();

	const schoolExternalToolsModule: SchoolExternalToolsModule = injectStrict(
		SCHOOL_EXTERNAL_TOOLS_MODULE_KEY
	);

	const createElementRequest = async (
		payload: CreateElementRequestPayload
	): Promise<AnyContentElement | undefined> => {
		const card = cardStore.getCard(payload.cardId);
		if (card === undefined) return;

		try {
			const params = {
				type: payload.type,
				toPosition: payload.toPosition,
			};
			const newElement = await createElementCall(payload.cardId, params);
			return cardStore.createElementSuccess({
				...payload,
				newElement: newElement.data,
				isOwnAction: true,
			});
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "boardCard"),
			});
		}
	};

	const createPreferredElement = async (
		payload: CreateElementRequestPayload,
		tool: PreferedToolResponse
	): Promise<AnyContentElement | undefined> => {
		const card = cardStore.getCard(payload.cardId);
		if (card === undefined) return;

		try {
			const params = {
				type: payload.type,
				toPosition: payload.toPosition,
			};
			const newElement = await createElementCall(payload.cardId, params);

			if (tool.schoolExternalToolId) {
				const availableTools: ContextExternalToolConfigurationTemplate[] =
					await fetchAvailableToolsForContextCall(
						newElement.data.id,
						ToolContextType.BoardElement
					);

				const preferredTool:
					| ContextExternalToolConfigurationTemplate
					| undefined = availableTools.find(
					(availableTool) =>
						availableTool.schoolExternalToolId === tool.schoolExternalToolId
				);

				if (!preferredTool?.parameters.length) {
					const contextExternalToolSave: ContextExternalToolSave = {
						schoolToolId: tool.schoolExternalToolId,
						contextId: newElement.data.id,
						contextType: ToolContextType.BoardElement,
						parameters: [],
					};

					const contextExternalTool: ContextExternalTool =
						await createContextExternalToolCall(contextExternalToolSave);

					const isExternalToolElement = (
						element: AnyContentElement
					): element is ExternalToolElementResponse => {
						return element.type === ContentElementType.ExternalTool;
					};

					if (isExternalToolElement(newElement.data)) {
						newElement.data.content.contextExternalToolId =
							contextExternalTool.id;
					}

					await updateElementCall(newElement.data);
				} else {
					schoolExternalToolsModule.setContextExternalToolConfigurationTemplate(
						preferredTool
					);
				}
			}

			return cardStore.createElementSuccess({
				...payload,
				newElement: newElement.data,
				isOwnAction: true,
			});
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "boardCard"),
			});
		}
	};

	const getPreferredTools = async (
		contextType: ToolContextType,
		contextId: string
	) => {
		try {
			const preferredTools = await fetchPreferredTools(contextType, contextId);

			return preferredTools.data.data;
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notCreated", "boardElement"),
			});
		}
	};

	const deleteElementRequest = async (payload: DeleteElementRequestPayload) => {
		const card = cardStore.getCard(payload.cardId);
		if (card === undefined) return;

		try {
			await deleteElementCall(payload.elementId);
			cardStore.deleteElementSuccess({ ...payload, isOwnAction: true });
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "boardElement"),
			});
		}
	};

	const moveElementRequest = async (payload: MoveElementRequestPayload) => {
		const card = cardStore.getCard(payload.toCardId);
		if (card === undefined) return;

		try {
			await moveElementCall(
				payload.elementId,
				payload.toCardId,
				payload.toPosition
			);
			cardStore.moveElementSuccess({ ...payload, isOwnAction: true });
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notMoved", "boardElement"),
			});
		}
	};

	const updateElementRequest = async (payload: UpdateElementRequestPayload) => {
		try {
			const success = await updateElementCall(payload.element);
			cardStore.updateElementSuccess({
				elementId: success.data.id,
				data: {
					type: success.data.type,
					content: success.data.content,
				},
				isOwnAction: true,
			});
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplate("notUpdated", "boardElement"),
			});
		}
	};

	const deleteCardRequest = async (payload: DeleteCardRequestPayload) => {
		const card = cardStore.getCard(payload.cardId);
		if (card === undefined) return;

		try {
			await deleteCardCall(payload.cardId);
			boardStore.deleteCardSuccess({ ...payload, isOwnAction: true });
			cardStore.deleteCardSuccess({ ...payload, isOwnAction: true });
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "boardCard"),
			});
		}
	};

	const fetchCardRequest = async (
		payload: FetchCardRequestPayload
	): Promise<void> => {
		await delay(100);
		try {
			const promises = payload.cardIds.map(fetchCardFromApi);
			const cards = await Promise.all(promises);
			cardStore.fetchCardSuccess({ cards, isOwnAction: true });
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notLoaded", "boardCard"),
			});
		}
	};

	const updateCardTitleRequest = async (
		payload: UpdateCardTitleRequestPayload
	): Promise<void> => {
		const card = cardStore.getCard(payload.cardId);
		if (card === undefined) return;

		try {
			await updateCardTitle(payload.cardId, payload.newTitle);
			cardStore.updateCardTitleSuccess({ ...payload, isOwnAction: true });
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
			cardStore.updateCardHeightSuccess({ ...payload, isOwnAction: true });
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
			boardStore.reloadBoard();
			setEditModeId(undefined);
		};
	};

	// this unused function is added to make sure that the same name is used in both socketApi and restApi
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const disconnectSocketRequest = (): void => {};

	return {
		createElementRequest,
		createPreferredElement,
		getPreferredTools,
		deleteElementRequest,
		moveElementRequest,
		updateElementRequest,
		deleteCardRequest,
		fetchCardRequest,
		updateCardTitleRequest,
		updateCardHeightRequest,
		disconnectSocketRequest,
	};
};
