<template>
	<span class="text-caption">
		{{ `${fileExtension} ⋅ ${humanReadableFileSize}` }}
	</span>
</template>

<script setup lang="ts">
import { formatFileSize, getFileExtension } from "@/utils/fileHelper";
import { computed } from "vue";

const props = defineProps({
	fileSize: {
		type: Number,
		required: true,
	},
	fileName: {
		type: String,
		required: true,
	},
});

const humanReadableFileSize = computed(() => {
	const localizedString = formatFileSize(props.fileSize);

	return localizedString;
});

const fileExtension = computed(() => getFileExtension(props.fileName).toUpperCase());
</script>
