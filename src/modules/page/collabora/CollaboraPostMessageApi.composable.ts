import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import {
	appLoadingStatusValueSchema,
	CollaboraMessage,
	collaboraMessageSchema,
	modifiedStatusValueSchema,
} from "./CollaboraPostMessage.schema";

export enum CollaboraEvents {
	Doc_ModifiedStatus = "Doc_ModifiedStatus",
	App_LoadingStatus = "App_LoadingStatus",
	Host_PostmessageReady = "Host_PostmessageReady",
	Remove_Button = "Remove_Button",
}

export const useCollaboraPostMessageApi = () => {
	const documentHasUnsavedChanges = ref<boolean>(false);
	const { t } = useI18n();
	const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
	let collaboraWindow: Window | null = null;
	let targetOrigin = "";

	window.addEventListener("message", (event) => listenForMessages(event.data));

	const setupPostMessageAPI = (
		iframeRef: HTMLIFrameElement,
		iframeOrigin: string
	) => {
		targetOrigin = iframeOrigin;
		collaboraWindow = iframeRef?.contentWindow;
	};

	const listenForMessages = (data: string) => {
		const json = parseJson(data);

		try {
			const message = collaboraMessageSchema.parse(json);

			handleCollaboraMessages(message);
		} catch {
			showMessageError();
		}
	};

	const showMessageError = () =>
		notifierModule.show({
			text: t("pages.collabora.messageError"),
			status: "error",
			timeout: 5000,
		});

	const handleCollaboraMessages = (message: CollaboraMessage) => {
		if (hasModifiedStatusMessageId(message.MessageId)) {
			const value = modifiedStatusValueSchema.parse(message.Values);

			documentHasUnsavedChanges.value = value.Modified;
		}

		if (hasLoadingStatusMessageId(message.MessageId)) {
			handleLoadingStatusUpdate(message);
		}
	};

	const handleLoadingStatusUpdate = (message: CollaboraMessage) => {
		const { Status } = appLoadingStatusValueSchema.parse(message.Values);
		if (Status === "Initialized") {
			postMessage(CollaboraEvents.Host_PostmessageReady);
		}

		if (Status === "Document_Loaded") {
			sendRemoveButtonsMessage();
		}
	};

	const postMessage = (messageId: string, values?: unknown) => {
		if (!collaboraWindow || !targetOrigin) {
			throw new Error(
				"Collabora iframe not setup properly, please call setupPostMessageAPI first."
			);
		}

		collaboraWindow.postMessage(
			{
				MessageId: messageId,
				SendTime: Date.now(),
				Values: values,
			},
			targetOrigin
		);
	};

	const sendRemoveButtonsMessage = () => {
		const buttonIds = [
			"feedback-button",
			"about-button",
			"latestupdates",
			"signature-button",
		];
		buttonIds.forEach((buttonId) => {
			postMessage(CollaboraEvents.Remove_Button, { id: buttonId });
		});
	};

	const parseJson = (data: string): unknown => {
		try {
			return JSON.parse(data);
		} catch {
			notifierModule.show({
				text: t("pages.collabora.jsonError"),
				status: "error",
				timeout: 5000,
			});
		}
	};

	const hasModifiedStatusMessageId = (messageId: string): boolean => {
		const isModifiedStatusMessage =
			messageId === CollaboraEvents.Doc_ModifiedStatus;

		return isModifiedStatusMessage;
	};

	const hasLoadingStatusMessageId = (messageId: string): boolean => {
		const isLoadingStatusMessage =
			messageId === CollaboraEvents.App_LoadingStatus;

		return isLoadingStatusMessage;
	};

	return {
		documentHasUnsavedChanges,
		setupPostMessageAPI,
	};
};
