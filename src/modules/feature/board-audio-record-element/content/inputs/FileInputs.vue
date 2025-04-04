<template>
	<div v-if="isEditMode" class="px-4 pt-4">
		<CaptionText
			:caption="audioRecordProperties.element.content.caption"
			:isEditMode="isEditMode"
			@update:caption="onUpdateCaption"
		/>
		<AlternativeText
			v-if="audioRecordProperties.previewUrl"
			:alternativeText="audioRecordProperties.element.content.alternativeText"
			:isEditMode="isEditMode"
			@update:alternativeText="onUpdateText"
		/>
	</div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { AudioRecordProperties } from "../../shared/types/audio-record-properties";
import AlternativeText from "./alternative-text/AlternativeText.vue";
import CaptionText from "./caption/CaptionText.vue";

const props = defineProps({
	audioRecordProperties: {
		type: Object as PropType<AudioRecordProperties>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
});
const emit = defineEmits(["update:alternativeText", "update:caption"]);

const onUpdateCaption = (value: string) => emit("update:caption", value);

const onUpdateText = (value: string) => emit("update:alternativeText", value);
</script>
