<template>
	<div v-if="isEditMode" class="px-4 pt-4">
		<CaptionText
			:caption="fileProperties.element.content.caption"
			:is-edit-mode="isEditMode"
			@update:caption="onUpdateCaption"
		/>
		<AlternativeText
			v-if="fileProperties.previewUrl && !hasPdfMimeType"
			:alternative-text="fileProperties.element.content.alternativeText"
			:is-edit-mode="isEditMode"
			@update:alternative-text="onUpdateText"
		/>
	</div>
</template>

<script setup lang="ts">
import { FileProperties } from "../../shared/types/file-properties";
import AlternativeText from "./alternative-text/AlternativeText.vue";
import CaptionText from "./caption/CaptionText.vue";
import { isPdfMimeType } from "@/utils/fileHelper";
import { computed, PropType } from "vue";

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

const hasPdfMimeType = computed(() => isPdfMimeType(props.fileProperties.mimeType));
</script>
