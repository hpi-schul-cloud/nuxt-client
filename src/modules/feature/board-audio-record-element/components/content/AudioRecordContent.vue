<template>
	<div>
		<div class="bg-grey-lighten-4 pa-4 rounded-t">
			<AudioRecordContentTitle />
		</div>
		<AudioRecordDisplay
			:audio-record-properties="audioRecordProperties"
			:is-edit-mode="isEditMode"
			:show-menu="true"
		/>
	</div>
	<div>
		<AudioRecordDescription
			:caption="audioRecordProperties.element.content.caption"
			:show-title="true"
			:show-menu="true"
			:is-edit-mode="true"
		/>
		<AudioRecordInputs
			:audio-record-properties="audioRecordProperties"
			:is-edit-mode="isEditMode"
			@update:alternative-text="onUpdateText"
			@update:caption="onUpdateCaption"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from "vue";
import AudioRecordContentTitle from "./AudioRecordContentTitle.vue";
import AudioRecordDisplay from "./display/AudioRecordDisplay.vue";
import AudioRecordDescription from "./display/description/AudioRecordDescription.vue";
import AudioRecordInputs from "./inputs/AudioRecordInputs.vue";

import { useDebounceFn } from "@vueuse/core";
import { AudioRecordProperties } from "../../types/audio-record-properties";

defineProps({
	audioRecordProperties: {
		type: Object as PropType<AudioRecordProperties>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
});

const emit = defineEmits([
	"fetch:file",
	"update:alternativeText",
	"update:caption",
	"add:alert",
]);

const onUpdateCaption = useDebounceFn((value: string) => {
	emit("update:caption", value);
}, 600);

const onUpdateText = useDebounceFn((value: string) => {
	emit("update:alternativeText", value);
}, 600);
</script>

<style lang="scss" scoped>
.file-information {
	flex: 2 1 auto;
}
</style>
