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
import { TypeGuard } from "@/utils/type-guards";
import { useFileStorageApi } from "@data-file";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

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

const listenForMessages = (data: string) => {
	const json = parseJson(data);

	try {
		const message = checkIsValidMessage(json);

		if (hasModifiedStatusMessageId(message)) {
			modified.value = isDocumentModified(message);
		}
	} catch {
		notifierModule.show({
			text: t("pages.collabora.messageError"),
			status: "error",
			timeout: 5000,
		});
	}
};

interface CollaboraMessage {
	messageId: string;
	values: unknown;
}

const checkIsValidMessage = (data: unknown): CollaboraMessage => {
	const definedObject = TypeGuard.checkDefinedObject(data);

	const messageIdValue = TypeGuard.checkKeyInObject(definedObject, "MessageId");
	const messageIdString = TypeGuard.checkString(messageIdValue);

	const values = TypeGuard.checkKeyInObject(definedObject, "Values");

	return {
		messageId: messageIdString,
		values,
	};
};

const isDocumentModified = (data: CollaboraMessage): boolean => {
	const valuesObject = TypeGuard.checkDefinedObject(data.values);
	const modifiedValue = TypeGuard.checkKeyInObject(valuesObject, "Modified");
	const modifiedBoolean = TypeGuard.checkBoolean(modifiedValue);

	return modifiedBoolean;
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

const hasModifiedStatusMessageId = (message: CollaboraMessage): boolean => {
	return message.messageId === "Doc_ModifiedStatus";
};
</script>
