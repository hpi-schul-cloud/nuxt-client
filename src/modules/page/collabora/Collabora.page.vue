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
import { useCollaboraPostMessageApi } from "./CollaboraPostMessageApi.composable";
import { EditorMode } from "@/types/file/File";
import { buildPageTitle } from "@/utils/pageTitle";
import { useAppStoreRefs } from "@data-app";
import { useBoardApi } from "@data-board";
import { useFileStorageApi } from "@data-file";
import { useTitle } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";

interface Props {
	fileRecordId: string;
	parentId?: string;
	fileName?: string;
	editorMode: EditorMode;
}

const props = defineProps<Props>();
const url = ref<URL>(new URL("about:blank"));
const iframeRef = ref<HTMLIFrameElement>();
const { getAuthorizedCollaboraDocumentUrl } = useFileStorageApi();
const { setupPostMessageAPI } = useCollaboraPostMessageApi();
const { getElementWithParentHierarchyCall } = useBoardApi();

const { user, locale } = useAppStoreRefs();

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

	await setPageTitle();
});

const setCollaboraUrl = async () => {
	const responseCollaboraUrl = await getAuthorizedCollaboraDocumentUrl(
		props.fileRecordId,
		props.editorMode,
		userName.value
	);

	const collaboraUrl = new URL(responseCollaboraUrl);
	collaboraUrl.searchParams.set("lang", locale.value);

	url.value = collaboraUrl;
};

const setPageTitle = async () => {
	const parentName = await getParentName();
	const firstPartOfPageTitle = getFirstPartOfPageTitle(parentName);
	const pageTitle = buildPageTitle(firstPartOfPageTitle);

	useTitle(pageTitle);
};

const getFirstPartOfPageTitle = (parentName?: string) => {
	if (props.fileName) {
		return parentName ? `${props.fileName} - ${parentName}` : props.fileName;
	}

	return parentName || "";
};

const getParentName = async () => {
	if (props.parentId) {
		const response = await getElementWithParentHierarchyCall(props.parentId);
		const indexOfDirectParent = response.data.parentHierarchy.length - 1;

		return response.data.parentHierarchy[indexOfDirectParent].name;
	}
};
</script>
