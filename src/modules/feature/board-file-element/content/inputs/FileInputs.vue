<template>
	<div v-if="isEditMode" class="px-4 pt-4">
		<CaptionText
			:caption="fileProperties.element.content.caption"
			:isEditMode="isEditMode"
			@update:caption="onUpdateCaption"
		/>
		<AlternativeText
			v-if="fileProperties.previewUrl && !isPdfMimeType"
			:alternativeText="fileProperties.element.content.alternativeText"
			:isEditMode="isEditMode"
			@update:alternativeText="onUpdateText"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { FileProperties } from "../../shared/types/file-properties";
import AlternativeText from "./alternative-text/AlternativeText.vue";
import CaptionText from "./caption/CaptionText.vue";
import { useMimeType } from "@/composables/mimeType.composable";

const props = defineProps({
	fileProperties: {
		type: Object as PropType<FileProperties>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
});
const emit = defineEmits(["update:alternativeText", "update:caption"]);

const onUpdateCaption = (value: string) => emit("update:caption", value);

const onUpdateText = (value: string) => emit("update:alternativeText", value);

const mimeType = computed(() => props.fileProperties.mimeType);
const { isPdfMimeType } = useMimeType(mimeType.value);
</script>
