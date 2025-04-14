<template>
	<div v-if="isEditMode" class="px-4 pt-4">
		<CaptionText
			:caption="audioRecordProperties.element.content.caption"
			:is-edit-mode="isEditMode"
			@update:caption="onUpdateCaption"
		/>
		<AlternativeText
			v-if="audioRecordProperties.element.content.alternativeText"
			:alternative-text="audioRecordProperties.element.content.alternativeText"
			:is-edit-mode="isEditMode"
			@update:alternative-text="onUpdateText"
		/>
	</div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { AudioRecordProperties } from "../../../types/audio-record-properties";
import AlternativeText from "./alternative-text/AlternativeText.vue";
import CaptionText from "./caption/CaptionText.vue";
defineProps({
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
