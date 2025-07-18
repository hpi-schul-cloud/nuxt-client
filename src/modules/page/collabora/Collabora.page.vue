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
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import { computed, onMounted, ref } from "vue";

interface Props {
	fileRecordId: string;
}
const props = defineProps<Props>();
const url = ref<string>("");
const authModule = injectStrict(AUTH_MODULE_KEY);

const userName = computed(() => {
	const firstName = authModule.getUser?.firstName;
	const lastName = authModule.getUser?.lastName;

	if (firstName && lastName) {
		return `${firstName} ${lastName}`;
	}

	return "User Name";
});

onMounted(async () => {
	const fileRecordId = props.fileRecordId;
	if (!props.fileRecordId) {
		throw new Error("fileRecordId is required");
	}

	const fileApi: WopiApiInterface = WopiApiFactory(undefined, "/v3", $axios);

	const result = await fileApi.discoveryAccessUrl({
		fileRecordId,
		editorMode: EditorMode.EDIT,
		userDisplayName: userName.value,
	});

	//@ts-expect-error temporary fix for missing type
	const { onlineUrl } = result.data;

	if (!onlineUrl) {
		throw new Error("Collabora online URL is not available");
	}
	url.value = onlineUrl;
});
</script>
