import {
	ApiErrorHandlerFactory,
	BoardObjectType,
	ErrorType,
	useErrorHandler,
} from "@/components/error-handling/ErrorHandler.composable";
import {
	ContentElementType,
	CreateContentElementBodyParams,
} from "@/serverApi/v3";
import { BoardCard } from "@/types/board/Card";
import { ElementMove } from "@/types/board/DragAndDrop";
import { delay } from "@/utils/helpers";
import { useSharedEditMode } from "@data-board";
import { nextTick, ref, onMounted } from "vue";
import { useBoardApi } from "./BoardApi.composable";
import { useBoardFocusHandler } from "./BoardFocusHandler.composable";
import { useSharedCardRequestPool } from "./CardRequestPool.composable";
import { defineStore } from "pinia";

export const useCardState = (cardId: string, emit: (...args: any[]) => void) =>
	defineStore(`card-${cardId}`, () => {
		const { handleError, notifyWithTemplate } = useErrorHandler();
		const card = ref<BoardCard | undefined>(undefined);
		const isLoading = ref<boolean>(false);
		const { fetchCard: fetchCardFromApi } = useSharedCardRequestPool();
		const {
			createElementCall,
			deleteElementCall,
			deleteCardCall,
			moveElementCall,
			updateCardHeightCall,
			updateCardTitle,
		} = useBoardApi();
		const { setFocus } = useBoardFocusHandler();
		const { setEditModeId } = useSharedEditMode();

		const fetchCard = async (id: string): Promise<void> => {
			await delay(100);
			try {
				card.value = await fetchCardFromApi(id);
			} catch (error) {
				handleError(error, {
					404: notifyWithTemplateAndReload("notLoaded", "boardCard"),
				});
			} finally {
				isLoading.value = false;
			}
		};

		const updateTitle = async (newTitle: string): Promise<void> => {
			if (card.value === undefined) return;

			try {
				card.value.title = newTitle;
				await updateCardTitle(card.value.id, newTitle);
			} catch (error) {
				handleError(error, {
					404: notifyWithTemplateAndReload("notUpdated"),
				});
			}
		};

		const deleteCard = async () => {
			if (card.value === undefined) return;

			try {
				await deleteCardCall(card.value.id);
			} catch (error) {
				handleError(error, {
					404: notifyWithTemplateAndReload("notDeleted", "boardCard"),
				});
			}
		};

		const updateCardHeight = async (newHeight: number) => {
			if (card.value === undefined) return;

			try {
				await updateCardHeightCall(card.value.id, newHeight);
				card.value.height = newHeight;
			} catch (error) {
				handleError(error, {});
			}
		};

		const addElement = async (
			type: ContentElementType,
			atFirstPosition?: boolean
		) => {
			if (card.value === undefined) return;

			try {
				const params: CreateContentElementBodyParams = { type };
				if (atFirstPosition) {
					params.toPosition = 0;
				}
				const response = await createElementCall(card.value.id, params);

				if (atFirstPosition) {
					card.value.elements.splice(0, 0, response.data);
				} else {
					card.value.elements.push(response.data);
				}

				setFocus(response.data.id);
				return response.data;
			} catch (error) {
				handleError(error, {
					404: notifyWithTemplateAndReload("notCreated", "boardElement"),
					400: notifyWithTemplate("notCreated", "boardElement"),
				});
			}
		};

		const addTextAfterTitle = async () => {
			return await addElement(ContentElementType.RichText, true);
		};

		const moveElementDown = async (elementPayload: ElementMove) => {
			if (card.value === undefined) return;
			try {
				const { elementIndex, payload: elementId } = elementPayload;
				if (
					elementIndex === card.value.elements.length - 1 ||
					elementIndex === -1
				) {
					return;
				}
				await moveElement(elementIndex, elementId, "down");
				await moveElementCall(elementId, card.value.id, elementIndex + 1);
			} catch (error) {
				handleError(error, {
					404: notifyWithTemplateAndReload("notUpdated"),
				});
			}
		};

		const moveElementUp = async (elementPayload: ElementMove) => {
			if (card.value === undefined) return;

			try {
				const { elementIndex, payload: elementId } = elementPayload;
				if (elementIndex <= 0) {
					return;
				}

				await moveElement(elementIndex, elementId, "up");
				await moveElementCall(elementId, card.value.id, elementIndex - 1);
			} catch (error) {
				handleError(error, {
					404: notifyWithTemplateAndReload("notUpdated"),
				});
			}
		};

		const moveElement = async (
			elementIndex: number,
			elementId: string,
			direction: "up" | "down"
		) => {
			if (card.value === undefined) return;

			const element = card.value.elements.filter(
				(element) => element.id === elementId
			)[0];

			const delta = direction === "up" ? -1 : 1;

			card.value.elements.splice(elementIndex, 1);
			await nextTick();
			card.value.elements.splice(elementIndex + delta, 0, element);
		};

		const deleteElement = async (elementId: string): Promise<void> => {
			if (card.value === undefined) return;

			try {
				await deleteElementCall(elementId);
				extractElement(elementId);
			} catch (error) {
				handleError(error, {
					404: notifyWithTemplateAndReload("notUpdated"),
				});
			}
		};

		const extractElement = (elementId: string): void => {
			const index = card.value?.elements.findIndex((e) => e.id === elementId);

			if (index !== undefined && index > -1) {
				card.value?.elements.splice(index, 1);
			}
		};

		const notifyWithTemplateAndReload: ApiErrorHandlerFactory = (
			errorType: ErrorType,
			boardObjectType?: BoardObjectType
		) => {
			return () => {
				notifyWithTemplate(errorType, boardObjectType)();
				emit("reload:board");
				setEditModeId(undefined);
			};
		};

		onMounted(() => {
			fetchCard(cardId).then(() => ({
				// do nothing but celebrating sonarcloud
			}));
		});

		return {
			addElement,
			moveElementDown,
			moveElementUp,
			notifyWithTemplateAndReload,
			deleteCard,
			fetchCard,
			updateCardHeight,
			updateTitle,
			deleteElement,
			addTextAfterTitle,
			card: card,
			isLoading: isLoading,
		};
	});
