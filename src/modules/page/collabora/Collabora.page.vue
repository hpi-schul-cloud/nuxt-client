<template>
	<iframe
		ref="iframeRef"
		allow="clipboard-read *; clipboard-write *"
		allowfullscreen
		:src="url"
		style="width: 100%; height: 100%; position: absolute"
		:title="$t('pages.collabora.iframeTitle')"
	/>
</template>

<script setup lang="ts">
import { useCollaboraPostMessageApi } from "./CollaboraPostMessageApi.composable";
import { EditorMode } from "@/types/file/File";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import { useFileStorageApi } from "@data-file";
import { computed, onMounted, ref } from "vue";

interface Props {
	fileRecordId: string;
	editorMode: EditorMode;
}

const props = defineProps<Props>();
const url = ref<string>("");
const iframeRef = ref<HTMLIFrameElement>();
const authModule = injectStrict(AUTH_MODULE_KEY);
const { getAuthorizedCollaboraDocumentUrl } = useFileStorageApi();
const { setupPostMessageAPI } = useCollaboraPostMessageApi();

const userName = computed(() => {
	const firstName = authModule.getUser?.firstName;
	const lastName = authModule.getUser?.lastName;

	if (firstName && lastName) {
		return `${firstName} ${lastName}`;
	}

	return "User Name";
});

onMounted(async () => {
	const responseCollaboraUrl = await getAuthorizedCollaboraDocumentUrl(
		props.fileRecordId,
		props.editorMode,
		userName.value
	);

	const locale = authModule.getLocale;

	const collaboraUrl = new URL(responseCollaboraUrl);
	collaboraUrl.searchParams.set("lang", locale);

	url.value = collaboraUrl.toString();

	if (iframeRef.value) {
		setupPostMessageAPI(iframeRef.value, collaboraUrl.origin);
	}
});
</script>
