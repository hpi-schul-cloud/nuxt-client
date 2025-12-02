<template>
	<iframe
		ref="iframeRef"
		allow="clipboard-read *; clipboard-write *"
		allowfullscreen
		:src="url.toString()"
		style="width: 100%; height: 100%; position: absolute"
		:title="$t('pages.collabora.iframeTitle')"
	/>
</template>

<script setup lang="ts">
import { useCollaboraPostMessageApi } from "../composables/CollaboraPostMessageApi.composable";
import { EditorMode } from "@/types/file/File";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { useAppStore, useAppStoreRefs } from "@data-app";
import { useFileStorageApi } from "@data-file";
import { computed, onMounted, ref } from "vue";

interface Props {
	fileRecordId: string;
	isEditable?: boolean;
}

const props = defineProps<Props>();

const editorMode = computed(() => (props.isEditable ? EditorMode.EDIT : EditorMode.VIEW));

const url = ref<URL>(new URL("about:blank"));
const iframeRef = ref<HTMLIFrameElement>();
const { getAuthorizedCollaboraDocumentUrl } = useFileStorageApi();
const { setupPostMessageAPI } = useCollaboraPostMessageApi();

const { user, locale } = useAppStoreRefs();
const { handleApplicationError } = useAppStore();

const userName = computed(() => {
	const firstName = user.value?.firstName;
	const lastName = user.value?.lastName;

	if (firstName && lastName) {
		return `${firstName} ${lastName}`;
	}

	return "User Name";
});

onMounted(async () => {
	await setCollaboraUrl();

	if (iframeRef.value) {
		setupPostMessageAPI(iframeRef.value, url.value.origin);
	}
});

const setCollaboraUrl = async () => {
	const responseCollaboraUrl = await tryGetCollaboraUrl();

	if (!responseCollaboraUrl) return;

	const collaboraUrl = new URL(responseCollaboraUrl);
	collaboraUrl.searchParams.set("lang", locale.value);

	url.value = collaboraUrl;
};

const tryGetCollaboraUrl = async (): Promise<string | undefined> => {
	try {
		const collaboraUrl = await getAuthorizedCollaboraDocumentUrl(props.fileRecordId, editorMode.value, userName.value);

		return collaboraUrl;
	} catch (error) {
		handleError(error);
		return undefined;
	}
};

const handleError = (error: unknown) => {
	const responseError = mapAxiosErrorToResponseError(error);
	handleApplicationError(responseError.code);
};
</script>
