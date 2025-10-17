import { appLoadingStatusValueSchema, CollaboraMessage, collaboraMessageSchema } from "./CollaboraPostMessage.schema";
import { notifyError } from "@data-app";
import { useI18n } from "vue-i18n";

export enum CollaboraEvents {
	APP_LOADING_STATUS = "App_LoadingStatus",
	HOST_POSTMESSAGE_READY = "Host_PostmessageReady",
	REMOVE_BUTTON = "Remove_Button",
	FEEDBACK_NEVER = "feedback-never",
	HIDE_MENU_ITEM = "Hide_Menu_Item",
	UI_CLOSE = "UI_Close",
}

export const useCollaboraPostMessageApi = () => {
	const { t } = useI18n();
	let collaboraWindow: Window | null = null;
	let targetOrigin = "";

	window.addEventListener("message", (event) => listenForMessages(event.data));

	const setupPostMessageAPI = (iframeRef: HTMLIFrameElement, iframeOrigin: string) => {
		targetOrigin = iframeOrigin;
		collaboraWindow = iframeRef?.contentWindow;
	};

	const listenForMessages = (data: string) => {
		const json = parseJson(data);

		try {
			const message = collaboraMessageSchema.parse(json);

			handleCollaboraMessages(message);
		} catch {
			notifyError(t("pages.collabora.messageError"));
		}
	};

	const handleCollaboraMessages = (message: CollaboraMessage) => {
		if (hasLoadingStatusMessageId(message.MessageId)) {
			handleLoadingStatusUpdate(message);
		}

		if (hasUICloseMessageId(message.MessageId)) {
			window.close();
		}
	};

	const handleLoadingStatusUpdate = (message: CollaboraMessage) => {
		const { Status } = appLoadingStatusValueSchema.parse(message.Values);

		if (Status === "Initialized") {
			postMessage(CollaboraEvents.HOST_POSTMESSAGE_READY);
			postMessage(CollaboraEvents.FEEDBACK_NEVER);
		}

		if (Status === "Document_Loaded") {
			sendRemoveButtonsMessage();
			sendHideMenuItemsMessage();
		}
	};

	const postMessage = (messageId: string, values?: unknown) => {
		if (!collaboraWindow || !targetOrigin) {
			throw new Error("Collabora iframe not setup properly, please call setupPostMessageAPI first.");
		}

		collaboraWindow.postMessage(
			JSON.stringify({
				MessageId: messageId,
				SendTime: Date.now(),
				Values: values,
			}),
			targetOrigin
		);
	};

	const sendRemoveButtonsMessage = () => {
		const buttonIds = ["feedback-button", "about-button", "latestupdates", "signature-button"];

		buttonIds.forEach((buttonId) => {
			postMessage(CollaboraEvents.REMOVE_BUTTON, { id: buttonId });
		});
	};

	const sendHideMenuItemsMessage = () => {
		const menuItemIds = ["report-an-issue", "feedback", "about", "latestupdates", "serveraudit", "signature"];

		menuItemIds.forEach((menuItemId) => {
			postMessage(CollaboraEvents.HIDE_MENU_ITEM, { id: menuItemId });
		});
	};

	const parseJson = (data: string): unknown => {
		try {
			return JSON.parse(data);
		} catch {
			notifyError(t("pages.collabora.jsonError"));
		}
	};

	const hasLoadingStatusMessageId = (messageId: string): boolean => messageId === CollaboraEvents.APP_LOADING_STATUS;

	const hasUICloseMessageId = (messageId: string): boolean => messageId === CollaboraEvents.UI_CLOSE;

	return {
		setupPostMessageAPI,
	};
};
