<template>
	<iframe
		allow="clipboard-read *; clipboard-write *"
		allowfullscreen
		:src="url"
		style="width: 100%; height: 100%; position: absolute"
	/>
</template>

<script setup lang="ts">
import {
	EditorMode,
	WopiApiFactory,
	WopiApiInterface,
} from "@/fileStorageApi/v3";
import { $axios } from "@/utils/api";
import { onMounted, ref } from "vue";

interface Props {
	fileRecordId: string;
}
const props = defineProps<Props>();
const url = ref<string>("");

onMounted(async () => {
	const fileRecordId = props.fileRecordId;
	if (!props.fileRecordId) {
		throw new Error("fileRecordId is required");
	}

	const fileApi: WopiApiInterface = WopiApiFactory(undefined, "/v3", $axios);

	const result = await fileApi.discoveryAccessUrl({
		fileRecordId,
		editorMode: EditorMode.EDIT,
		userDisplayName: "Collabora User",
	});

	//@ts-expect-error temporary fix for missing type
	const { onlineUrl } = result.data;

	if (!onlineUrl) {
		throw new Error("Collabora online URL is not available");
	}
	url.value = onlineUrl;
});
</script>
