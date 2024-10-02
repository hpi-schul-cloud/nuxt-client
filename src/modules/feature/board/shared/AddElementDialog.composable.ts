import { CreateElementRequestPayload } from "@/modules/data/board/cardActions/cardActionPayload";
import {
	BoardCardApiFactory,
	BoardElementApiFactory,
	ContentElementType,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import { useCardStore } from "@data-board";
import {
	mdiCalendarCheck,
	mdiFormatText,
	mdiLightbulbOnOutline,
	mdiLink,
	mdiPresentation,
	mdiPuzzleOutline,
	mdiTextBoxEditOutline,
	mdiTrayArrowUp,
} from "@icons/material";
import { useBoardNotifier } from "@util-board";
import { useI18n } from "vue-i18n";
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";
import { watch } from "vue";

type CreateElementRequestFn = (payload: CreateElementRequestPayload) => void;

export const useAddElementDialog = (
	createElementRequestFn: CreateElementRequestFn,
	cardId: string
) => {
	const cardsApi = BoardCardApiFactory(undefined, "/v3", $axios);
	const elementApi = BoardElementApiFactory(undefined, "/v3", $axios);
	const { createElementSuccess } = useCardStore();

	const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
	const { showCustomNotifier } = useBoardNotifier();
	const { t } = useI18n();

	const {
		isDialogOpen,
		closeDialog,
		elementTypeOptions,
		isAppointmentFinderDialogOpen,
	} = useSharedElementTypeSelection();

	const onElementClick = async (elementType: ContentElementType) => {
		closeDialog();

		await createElementRequestFn({ type: elementType, cardId });
		showNotificationByElementType(elementType);
	};

	// must be async because of type defs
	const onAppointmentFinderClick = async () => {
		closeDialog();
		isAppointmentFinderDialogOpen.value = true;

		const createAppointFinderElement = async (event: MessageEvent) => {
			const {
				data: { appointmentId, adminId },
			} = event;
			isAppointmentFinderDialogOpen.value = false;
			const { data: element } = await cardsApi.cardControllerCreateElement(
				cardId,
				{
					type: ContentElementType.AppointmentFinder,
				}
			);
			const { data: updatedElement } =
				await elementApi.elementControllerUpdateElement(element.id, {
					data: {
						type: ContentElementType.AppointmentFinder,
						content: { appointmentFinderId: appointmentId, adminId },
					},
				});
			createElementSuccess({
				cardId,
				type: ContentElementType.AppointmentFinder,
				newElement: updatedElement,
				isOwnAction: true,
			});
			window.removeEventListener("message", createAppointFinderElement);
		};

		window.addEventListener("message", createAppointFinderElement);

		watch(isAppointmentFinderDialogOpen, (isOpen) => {
			if (!isOpen) {
				window.removeEventListener("message", createAppointFinderElement);
			}
		});
	};

	const showNotificationByElementType = (elementType: ContentElementType) => {
		const translationKeyCollaborativeTextEditor =
			"components.cardElement.collaborativeTextEditorElement.alert.info.visible";
		const translationKeyDrawing =
			"components.cardElement.notification.visibleAndEditable";
		let translationKey = "";

		if (elementType === ContentElementType.CollaborativeTextEditor) {
			translationKey = translationKeyCollaborativeTextEditor;
		}
		if (elementType === ContentElementType.Drawing) {
			translationKey = translationKeyDrawing;
		}
		if (translationKey !== "") {
			showCustomNotifier(t(translationKey), "info");
		}
	};

	const options = [
		{
			icon: mdiFormatText,
			label: "components.elementTypeSelection.elements.textElement.subtitle",
			action: () => onElementClick(ContentElementType.RichText),
			testId: "create-element-text",
		},
		{
			icon: mdiTrayArrowUp,
			label: "components.elementTypeSelection.elements.fileElement.subtitle",
			action: () => onElementClick(ContentElementType.File),
			testId: "create-element-file",
		},
	];

	options.push({
		icon: mdiCalendarCheck,
		label:
			"components.elementTypeSelection.elements.appointmentFinderElement.subtitle",
		action: () => onAppointmentFinderClick(),
		testId: "create-element-appointment-finder",
	});

	if (envConfigModule.getEnv.FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED) {
		options.push({
			icon: mdiLightbulbOnOutline,
			label:
				"components.elementTypeSelection.elements.submissionElement.subtitle",
			action: () => onElementClick(ContentElementType.SubmissionContainer),
			testId: "create-element-submission-container",
		});
	}

	if (envConfigModule.getEnv.FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED) {
		options.push({
			icon: mdiPuzzleOutline,
			label:
				"components.elementTypeSelection.elements.externalToolElement.subtitle",
			action: () => onElementClick(ContentElementType.ExternalTool),
			testId: "create-element-external-tool-container",
		});
	}

	if (envConfigModule.getEnv.FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED) {
		options.push({
			icon: mdiLink,
			label: "components.elementTypeSelection.elements.linkElement.subtitle",
			action: () => onElementClick(ContentElementType.Link),
			testId: "create-element-link",
		});
	}

	if (envConfigModule.getEnv.FEATURE_TLDRAW_ENABLED) {
		options.push({
			icon: mdiPresentation,
			label: "components.cardElement.drawingElement",
			action: () => onElementClick(ContentElementType.Drawing),
			testId: "create-element-drawing-element",
		});
	}

	if (
		envConfigModule.getEnv
			.FEATURE_COLUMN_BOARD_COLLABORATIVE_TEXT_EDITOR_ENABLED
	) {
		options.push({
			icon: mdiTextBoxEditOutline,
			label:
				"components.elementTypeSelection.elements.collaborativeTextEditor.subtitle",
			action: () => onElementClick(ContentElementType.CollaborativeTextEditor),
			testId: "create-element-collaborative-text-editor",
		});
	}

	const askType = () => {
		elementTypeOptions.value = options;
		isDialogOpen.value = true;
	};

	return {
		askType,
		isDialogOpen,
		elementTypeOptions,
		onElementClick,
	};
};
