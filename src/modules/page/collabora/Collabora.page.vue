<template>
	<iframe
		allow="clipboard-read *; clipboard-write *"
		allowfullscreen
		:src="url"
		style="width: 100%; height: 100%; position: absolute"
		:title="$t('pages.collabora.iframeTitle')"
	/>
</template>

<script setup lang="ts">
import { EditorMode } from "@/types/file/File";
import {
	AUTH_MODULE_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import { useFileStorageApi } from "@data-file";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { z } from "zod";

interface Props {
	fileRecordId: string;
	editorMode: EditorMode;
}

const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
const props = defineProps<Props>();
const url = ref<string>("");
const authModule = injectStrict(AUTH_MODULE_KEY);
const { getAuthorizedCollaboraDocumentUrl } = useFileStorageApi();
const modified = ref<boolean>(false);
const { t } = useI18n();

const userName = computed(() => {
	const firstName = authModule.getUser?.firstName;
	const lastName = authModule.getUser?.lastName;

	if (firstName && lastName) {
		return `${firstName} ${lastName}`;
	}

	return "User Name";
});

window.addEventListener("message", (event) => {
	listenForMessages(event.data);
});

const openUnloadConfirmation = (event: BeforeUnloadEvent) => {
	if (modified.value) {
		// Opens confirmation dialog in firefox
		event.preventDefault();
		// Opens confirmation dialog in chrome
		event.returnValue = "";
	}
};
window.addEventListener("beforeunload", openUnloadConfirmation);

onMounted(async () => {
	const collaboraUrl = await getAuthorizedCollaboraDocumentUrl(
		props.fileRecordId,
		props.editorMode,
		userName.value
	);

	url.value = collaboraUrl;
});

const collaboraMessageValidator = z
	.object({
		MessageId: z.string(),
		Values: z.unknown(),
	})
	.required();
type CollaboraMessage = z.infer<typeof collaboraMessageValidator>;

const modifiedStatusValueValidator = z
	.object({
		Modified: z.boolean(),
	})
	.required();

const listenForMessages = (data: string) => {
	const json = parseJson(data);

	try {
		const message = collaboraMessageValidator.parse(json);

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
		const value = modifiedStatusValueValidator.parse(message.Values);

		modified.value = value.Modified;
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
</script>
