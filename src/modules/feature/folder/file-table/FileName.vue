<template>
	<button
		v-if="isInteractive"
		:data-testid="`name-${file.name}`"
		@click="handleClick"
	>
		{{ file.name }}
	</button>
	<span
		v-else
		:data-testid="`name-${file.name}`"
		:class="{ 'text-disabled': !file.isSelectable }"
		>{{ file.name }}
	</span>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { useI18n } from "vue-i18n";
import { FileRecordItem } from "../types/filerecord-item";
import { openImageInLightbox } from "@util-files";
import { isPreviewPossible } from "@/utils/fileHelper";

const { file } = defineProps({
	file: {
		type: Object as PropType<FileRecordItem>,
		required: true,
	},
});

const { t } = useI18n();

const isInteractive = computed(
	() => file.isSelectable && isPreviewPossible(file.previewStatus)
);

const handleClick = () => {
	const altText = `${t("components.cardElement.fileElement.emptyAlt")} ${file.name}`;
	openImageInLightbox(file, altText);
};
</script>
