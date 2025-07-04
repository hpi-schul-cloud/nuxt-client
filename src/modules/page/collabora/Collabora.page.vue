<template>
	<iframe
		allow="clipboard-read *; clipboard-write *"
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
	return `http://localhost:9980/browser/e724e42045/cool.html?WOPISrc=http://localhost:4444/api/v3/wopi/files/${props.fileRecordId}`;
});
</script>
