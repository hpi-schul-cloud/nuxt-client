<template>
	<iframe
		allow="clipboard-read *; clipboard-write *"
		allowfullscreen
		:src="url"
		style="width: 100%; height: 100%; position: absolute"
	/>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
	fileRecordId: string;
}
const props = defineProps<Props>();

const url = computed(() => {
	const url = `http://localhost:3030/api/v3/collabora-proxy/document?fileRecordId=${props.fileRecordId}&WOPISrc=http://localhost:4444/api/v3/wopi/files/${props.fileRecordId}`;

	return url;
});
</script>
