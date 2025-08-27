<template>
	<iframe
		:id="iframeId"
		allow="clipboard-read *; clipboard-write *"
		allowfullscreen
		:src="url"
		style="width: 100%; height: 100%; position: absolute"
		:title="$t('pages.collabora.iframeTitle')"
	/>
</template>

<script setup lang="ts">
import { EditorMode } from "@/types/file/File";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import { useFileStorageApi } from "@data-file";
import { computed, onMounted, ref } from "vue";
import { useCollaboraPostMessageApi } from "./CollaboraPostMessageApi.composable";

interface Props {
	fileRecordId: string;
	editorMode: EditorMode;
}

const props = defineProps<Props>();
const url = ref<string>("");
const iframeId = "collabora-iframe";
const authModule = injectStrict(AUTH_MODULE_KEY);
const { getAuthorizedCollaboraDocumentUrl } = useFileStorageApi();
const { documentHasUnsavedChanges, setupPostMessageAPI } =
	useCollaboraPostMessageApi();

const userName = computed(() => {
	const firstName = authModule.getUser?.firstName;
	const lastName = authModule.getUser?.lastName;

	if (firstName && lastName) {
		return `${firstName} ${lastName}`;
	}

	return "User Name";
});

onMounted(async () => {
	const result = await getAuthorizedCollaboraDocumentUrl(
		props.fileRecordId,
		props.editorMode,
		userName.value
	);

	const locale = authModule.getLocale;

	const collaboraUrl = new URL(result);
	collaboraUrl.searchParams.set("lang", locale);

	url.value = collaboraUrl.toString();

	setupPostMessageAPI(iframeId, collaboraUrl.origin);
});

window.addEventListener("beforeunload", (event) =>
	openUnloadConfirmation(event)
);
const openUnloadConfirmation = (event: BeforeUnloadEvent) => {
	if (documentHasUnsavedChanges.value) {
		// Opens confirmation dialog in firefox
		event.preventDefault();
		// Opens confirmation dialog in chrome
		event.returnValue = "";
	}
};
</script>
