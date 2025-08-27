import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import {
	CollaboraMessage,
	collaboraMessageSchema,
	modifiedStatusValueSchema,
} from "./CollaboraPostMessage.schema";

export const useCollaboraPostMessageApi = () => {
	const documentHasUnsavedChanges = ref<boolean>(false);
	const { t } = useI18n();
	const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
	let collaboraWindow: Window | null = null;
	let targetOrigin = "";

	window.addEventListener("message", (event) => listenForMessages(event.data));

	const setupPostMessageAPI = (iframeId: string, postMessageOrigin: string) => {
		targetOrigin = postMessageOrigin;
		const iframeElement = document.getElementById(
			iframeId
		) as HTMLIFrameElement;

		collaboraWindow = iframeElement?.contentWindow;
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
		if (checkDocumentStatus(message, "Initialized")) {
			postMessage("Host_PostmessageReady");
		}

		if (checkDocumentStatus(message, "Document_Loaded")) {
			sendRemoveButtonsMessage();
		}
	};

	const postMessage = (messageId: string, values?: unknown) => {
		collaboraWindow?.postMessage(
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
			postMessage("Remove_Button", { id: buttonId });
		});
	};

	const parseJson = (data: unknown): unknown => {
		try {
			if (typeof data === "string") {
				return JSON.parse(data);
			}
			return data;
		} catch {
			notifierModule.show({
				text: t("pages.collabora.jsonError"),
				status: "error",
				timeout: 5000,
			});
		}
	};

	const hasModifiedStatusMessageId = (messageId: string): boolean => {
		const isModifiedStatusMessage = messageId === "Doc_ModifiedStatus";

		return isModifiedStatusMessage;
	};

	const hasLoadingStatusMessageId = (messageId: string): boolean => {
		const isLoadingStatusMessage = messageId === "App_LoadingStatus";

		return isLoadingStatusMessage;
	};

	return {
		documentHasUnsavedChanges,
		setupPostMessageAPI,
	};
};

const checkDocumentStatus = (message: CollaboraMessage, status: string) => {
	return (
		"Values" in message &&
		typeof message.Values === "object" &&
		message.Values !== null &&
		"Status" in message.Values &&
		(message.Values as { Status?: string }).Status === status
	);
};
