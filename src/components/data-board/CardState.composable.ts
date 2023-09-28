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
import { nextTick, onMounted, reactive, toRef } from "vue";
import { useBoardApi } from "./BoardApi.composable";
import { useBoardFocusHandler } from "./BoardFocusHandler.composable";
import { useSharedCardRequestPool } from "./CardRequestPool.composable";

declare type CardState = {
	isLoading: boolean;
	card: BoardCard | undefined;
};

export const useCardState = (
	id: BoardCard["id"],
	emit: (...args: any[]) => void
) => {
	const { handleError, notifyWithTemplate } = useErrorHandler();
	const cardState = reactive<CardState>({ isLoading: true, card: undefined });
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
			// cardState.card = await fetchCardFromApi(id);

			cardState.card = {
				id: "649549787e10d74311c95097",
				title: "mocked Card",
				height: 478.296875,
				visibility: {
					publishedAt: "",
				},
				elements: [
					{
						id: "650d87a82424490eaa268d99",
						content: {
							dueDate: "2023-10-26T23:00:00.000Z",
						},
						timestamps: {
							lastUpdatedAt: "2023-09-28T11:24:41.483Z",
							createdAt: "2023-09-28T11:24:41.482Z",
						},
						type: ContentElementType.SubmissionContainer,
						// users not included in students response! or empty?
						users: [
							{
								firstName: "Marla",
								lastName: "Mathe",
								userId: "0000d224816abba584714c9c",
							},
							{
								firstName: "Susi",
								lastName: "Sonnenschein",
								userId: "xyz",
							},
						],
						elements: [
							{
								id: "64fed193e397ef5955d4fee9",
								timestamps: {
									lastUpdatedAt: "2023-09-28T11:24:41.483Z",
									createdAt: "2023-09-28T11:24:41.482Z",
								},
								completed: true,
								userId: "0000d224816abba584714c9c",
							},
						],
					},
				],
			};
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notLoaded", "boardCard"),
			});
		} finally {
			cardState.isLoading = false;
		}
	};

	const updateTitle = async (newTitle: string): Promise<void> => {
		if (cardState.card === undefined) return;

		try {
			cardState.card.title = newTitle;
			await updateCardTitle(cardState.card.id, newTitle);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated"),
			});
		}
	};

	const deleteCard = async () => {
		if (cardState.card === undefined) return;

		try {
			await deleteCardCall(cardState.card.id);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "boardCard"),
			});
		}
	};

	const updateCardHeight = async (newHeight: number) => {
		if (cardState.card === undefined) return;

		try {
			await updateCardHeightCall(cardState.card.id, newHeight);
			cardState.card.height = newHeight;
		} catch (error) {
			handleError(error, {});
		}
	};

	const addElement = async (
		type: ContentElementType,
		atFirstPosition?: boolean
	) => {
		if (cardState.card === undefined) return;

		try {
			const params: CreateContentElementBodyParams = { type };
			if (atFirstPosition) {
				params.toPosition = 0;
			}
			const response = await createElementCall(cardState.card.id, params);

			if (atFirstPosition) {
				cardState.card.elements.splice(0, 0, response.data);
			} else {
				cardState.card.elements.push(response.data);
			}

			setFocus(response.data.id);
			return response.data;
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notCreated", "boardElement"),
			});
		}
	};

	const addTextAfterTitle = async () => {
		return await addElement(ContentElementType.RichText, true);
	};

	const moveElementDown = async (elementPayload: ElementMove) => {
		if (cardState.card === undefined) return;
		try {
			const { elementIndex, payload: elementId } = elementPayload;
			if (
				elementIndex === cardState.card.elements.length - 1 ||
				elementIndex === -1
			) {
				return;
			}
			await moveElement(elementIndex, elementId, "down");
			await moveElementCall(elementId, cardState.card.id, elementIndex + 1);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated"),
			});
		}
	};

	const moveElementUp = async (elementPayload: ElementMove) => {
		if (cardState.card === undefined) return;

		try {
			const { elementIndex, payload: elementId } = elementPayload;
			if (elementIndex <= 0) {
				return;
			}

			await moveElement(elementIndex, elementId, "up");
			await moveElementCall(elementId, cardState.card.id, elementIndex - 1);
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
		if (cardState.card === undefined) return;

		const element = cardState.card.elements.filter(
			(element) => element.id === elementId
		)[0];

		const delta = direction === "up" ? -1 : 1;

		cardState.card.elements.splice(elementIndex, 1);
		await nextTick();
		cardState.card.elements.splice(elementIndex + delta, 0, element);
	};

	const deleteElement = async (elementId: string): Promise<void> => {
		if (cardState.card === undefined) return;

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
		const index = cardState.card?.elements.findIndex((e) => e.id === elementId);

		if (index !== undefined && index > -1) {
			cardState.card?.elements.splice(index, 1);
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
		fetchCard(id).then(() => ({
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
		card: toRef(cardState, "card"),
		isLoading: toRef(cardState, "isLoading"),
	};
};
