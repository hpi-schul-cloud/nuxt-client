<template>
	<span class="text-caption">
		{{ `${fileExtension} ⋅ ${humanReadableFileSize}` }}
	</span>
</template>

<script setup lang="ts">
import { convertFileSize, getFileExtension } from "@/utils/fileHelper";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

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

const { n } = useI18n();

const humanReadableFileSize = computed(() => {
	const { convertedSize, unit } = convertFileSize(props.fileSize);
	const localizedFileSize = n(convertedSize, "fileSize");
	const localizedString = localizedFileSize + " " + unit;

	return localizedString;
});

const fileExtension = computed(() =>
	getFileExtension(props.fileName).toUpperCase()
);
</script>
