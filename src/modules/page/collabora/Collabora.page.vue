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
	editorMode?: EditorMode;
}

const props = defineProps<Props>();
const url = ref<URL>(new URL("about:blank"));
const iframeRef = ref<HTMLIFrameElement>();
const { getAuthorizedCollaboraDocumentUrl, fetchFileById, getFileRecordById } = useFileStorageApi();
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
		props.editorMode ?? EditorMode.VIEW,
		userName.value
	);

	const collaboraUrl = new URL(responseCollaboraUrl);
	collaboraUrl.searchParams.set("lang", locale.value);

	url.value = collaboraUrl;
};

const setPageTitle = async () => {
	await fetchFileById(props.fileRecordId);

	const fileRecord = getFileRecordById(props.fileRecordId);
	const parentName = await getParentName(fileRecord?.parentId);

	const firstPartOfPageTitle = formatePageTitlePrefix(parentName, fileRecord?.name);
	const pageTitle = buildPageTitle(firstPartOfPageTitle);

	useTitle(pageTitle);
};

const formatePageTitlePrefix = (fileName?: string, parentName?: string) => {
	if (fileName) {
		return parentName ? `${fileName} - ${parentName}` : fileName;
	}

	return parentName || "";
};

const getParentName = async (parentId?: string): Promise<string | undefined> => {
	if (parentId) {
		const response = await getElementWithParentHierarchyCall(parentId);
		const indexOfDirectParent = response.data.parentHierarchy.length - 1;

		return response.data.parentHierarchy[indexOfDirectParent]?.name;
	}
};
</script>
