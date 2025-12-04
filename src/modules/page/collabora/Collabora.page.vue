<template>
	<CollaboraEditor :file-record-id="fileRecordId" :is-editable="isEditable" />
</template>

<script setup lang="ts">
import { buildPageTitle } from "@/utils/pageTitle";
import { useBoardApi } from "@data-board";
import { useFileStorageApi } from "@data-file";
import { CollaboraEditor } from "@feature-collabora";
import { useTitle } from "@vueuse/core";
import { computed, onMounted } from "vue";

interface Props {
	fileRecordId: string;
	edit?: string;
}

const props = defineProps<Props>();
const { fetchFileById, getFileRecordById } = useFileStorageApi();
const { getElementWithParentHierarchyCall } = useBoardApi();

onMounted(async () => {
	await setPageTitle();
});

const isEditable = computed(() => props.edit === "true");

const setPageTitle = async () => {
	let fileRecord;
	let parentName;

	try {
		fileRecord = await getFileRecord(props.fileRecordId);
		parentName = await getParentName(fileRecord?.parentId);
	} catch {
		// Ignore errors here, because not critical
	}

	const firstPartOfPageTitle = formatePageTitlePrefix(fileRecord?.name, parentName);
	const pageTitle = buildPageTitle(firstPartOfPageTitle);
	useTitle(pageTitle);
};

const getFileRecord = async (fileId: string) => {
	let fileRecord = getFileRecordById(fileId);

	if (!fileRecord) {
		await fetchFileById(fileId);
		fileRecord = getFileRecordById(fileId);
	}

	return fileRecord;
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
