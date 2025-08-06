<template>
	<iframe
		allow="clipboard-read *; clipboard-write *"
		allowfullscreen
		:src="url"
		style="width: 100%; height: 100%; position: absolute"
	/>
</template>

<script setup lang="ts">
import { EditorMode } from "@/fileStorageApi/v3";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import { useFileStorageApi } from "@data-file";
import { computed, onMounted, ref } from "vue";

interface Props {
	fileRecordId: string;
	editorMode: EditorMode;
}
const props = defineProps<Props>();
const url = ref<string>("");
const authModule = injectStrict(AUTH_MODULE_KEY);
const { getAuthorizedCollaboraDocumentUrl } = useFileStorageApi();

const userName = computed(() => {
	const firstName = authModule.getUser?.firstName;
	const lastName = authModule.getUser?.lastName;

	if (firstName && lastName) {
		return `${firstName} ${lastName}`;
	}

	return "User Name";
});

onMounted(async () => {
	const collaboraUrl = await getAuthorizedCollaboraDocumentUrl(
		props.fileRecordId,
		props.editorMode,
		userName.value
	);

	url.value = collaboraUrl;
});
</script>
