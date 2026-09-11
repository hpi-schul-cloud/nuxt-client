import { useBoardStore } from "../Board.store";
import { useBoardApi } from "../BoardApi.composable";
import { useCardStore } from "../Card.store";
import { useSharedEditMode } from "../edit-mode.composable";
import { CreateElementRequestPayload } from "./cardActionPayload.types";
import { AnyContentElement } from "@/types/board/ContentElement";
import {
	ContentElementType,
	ExternalToolElementResponse,
	PreferredToolListResponse,
	PreferredToolResponse,
	ToolContextType,
} from "@api-server";
import { notifyError } from "@data-app";
import {
	ContextExternalTool,
	ContextExternalToolConfigurationTemplate,
	ContextExternalToolSave,
	useContextExternalToolApi,
	usePreferredExternalToolStore,
} from "@data-external-tool";
import { ApiErrorHandlerFactory, BoardObjectType, ErrorType, useErrorHandler } from "@util-error-handling";
import { AxiosResponse } from "axios";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

export const useCardRestApi = () => {
	const boardStore = useBoardStore();
	const cardStore = useCardStore();
	const { preferredExternalTool } = storeToRefs(usePreferredExternalToolStore());

	const { handleError, notifyWithTemplate } = useErrorHandler();

	const { createElementCall, updateElementCall } = useBoardApi();

	const { fetchPreferredTools, createContextExternalToolCall, fetchAvailableToolsForContextCall } =
		useContextExternalToolApi();

	const { setEditModeId } = useSharedEditMode();

	const { t } = useI18n();

	const createPreferredElement = async (
		payload: CreateElementRequestPayload,
		tool: PreferredToolResponse
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
				const availableTools: ContextExternalToolConfigurationTemplate[] = await fetchAvailableToolsForContextCall(
					newElement.data.id,
					ToolContextType.BOARD_ELEMENT
				);

				const preferredTool: ContextExternalToolConfigurationTemplate | undefined = availableTools.find(
					(availableTool) => availableTool.schoolExternalToolId === tool.schoolExternalToolId
				);

				if (!preferredTool?.parameters.length) {
					const contextExternalToolSave: ContextExternalToolSave = {
						schoolToolId: tool.schoolExternalToolId,
						contextId: newElement.data.id,
						contextType: ToolContextType.BOARD_ELEMENT,
						parameters: [],
					};

					const contextExternalTool: ContextExternalTool = await createContextExternalToolCall(contextExternalToolSave);

					const isExternalToolElement = (element: AnyContentElement): element is ExternalToolElementResponse =>
						element.type === ContentElementType.EXTERNAL_TOOL;

					if (isExternalToolElement(newElement.data)) {
						newElement.data.content.contextExternalToolId = contextExternalTool.id;
					}

					await updateElementCall(newElement.data);
				} else {
					preferredExternalTool.value = preferredTool;
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

	const getPreferredTools = async (contextType: ToolContextType): Promise<PreferredToolResponse[] | undefined> => {
		try {
			const preferredTools: AxiosResponse<PreferredToolListResponse> = await fetchPreferredTools(contextType);

			return preferredTools.data.data;
		} catch {
			notifyError(t("components.board.preferredTools.notification.error.notLoaded"));
		}
	};

	const notifyWithTemplateAndReload: ApiErrorHandlerFactory =
		(errorType: ErrorType, boardObjectType?: BoardObjectType) => () => {
			notifyWithTemplate(errorType, boardObjectType)();
			boardStore.reloadBoard();
			setEditModeId(undefined);
		};

	return {
		createPreferredElement,
		getPreferredTools,
	};
};
