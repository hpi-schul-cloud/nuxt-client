<template>
	<div v-if="isEditMode" class="px-4 pt-4">
		<CaptionText
			:caption="fileProperties.element.content.caption"
			:isEditMode="isEditMode"
			@update:caption="onUpdateCaption"
		/>
		<AlternativeText
			v-if="fileProperties.previewUrl && !hasPdfMimeType"
			:alternativeText="fileProperties.element.content.alternativeText"
			:isEditMode="isEditMode"
			@update:alternativeText="onUpdateText"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { AudioRecordProperties } from "../../shared/types/audio-record-properties";
import AlternativeText from "./alternative-text/AlternativeText.vue";
import CaptionText from "./caption/CaptionText.vue";
import { isPdfMimeType } from "@/utils/fileHelper";

const props = defineProps({
	fileProperties: {
		type: Object as PropType<AudioRecordProperties>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
});
const emit = defineEmits(["update:alternativeText", "update:caption"]);

const onUpdateCaption = (value: string) => emit("update:caption", value);

const onUpdateText = (value: string) => emit("update:alternativeText", value);

const hasPdfMimeType = computed(() =>
	isPdfMimeType(props.fileProperties.mimeType)
);
</script>
