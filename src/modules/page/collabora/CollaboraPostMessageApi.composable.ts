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

	window.addEventListener("message", (event) => listenForMessages(event.data));

	const listenForMessages = (data: string) => {
		const json = parseJson(data);

		try {
			const message = collaboraMessageSchema.parse(json);

			handleModifiedStatusMessage(message);
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

	const handleModifiedStatusMessage = (message: CollaboraMessage) => {
		if (hasModifiedStatusMessageId(message.MessageId)) {
			const value = modifiedStatusValueSchema.parse(message.Values);

			documentHasUnsavedChanges.value = value.Modified;
		}
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
		const isModifiedStatusMessage = messageId === "Doc_ModifiedStatus";

		return isModifiedStatusMessage;
	};

	return {
		documentHasUnsavedChanges,
	};
};
