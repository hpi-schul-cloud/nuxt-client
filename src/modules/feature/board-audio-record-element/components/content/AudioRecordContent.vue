<template>
	<div>
		<div class="bg-grey-lighten-4 pa-4 rounded-t">
			<AudioRecordContentTitle />
		</div>
		<AudioRecordDisplay
			:audio-record-properties="audioRecordProperties"
			:src="audioRecordProperties.url"
			:is-edit-mode="isEditMode"
			:show-menu="isMenuShownOnFileDisplay"
			@add:alert="onAddAlert"
		>
			<slot />
		</AudioRecordDisplay>
	</div>
	<div>
		<AudioRecordDescription
			:name="audioRecordProperties.name"
			:caption="audioRecordProperties.element.content.caption"
			:show-title="true"
			:show-menu="!isMenuShownOnFileDisplay"
			:is-edit-mode="true"
		>
			<slot />
		</AudioRecordDescription>
		<AudioRecordInputs
			:audio-record-properties="audioRecordProperties"
			:is-edit-mode="isEditMode"
			@update:alternative-text="onUpdateText"
			@update:caption="onUpdateCaption"
		/>
		<AudioRecordAlerts :alerts="alerts" @on-status-reload="onFetchFile" />
	</div>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from "vue";
import AudioRecordAlerts from "./alert/AudioRecordAlert.vue";
import AudioRecordContentTitle from "./AudioRecordContentTitle.vue";
import AudioRecordDisplay from "./display/AudioRecordDisplay.vue";
import AudioRecordDescription from "./display/description/AudioRecordDescription.vue";
import AudioRecordInputs from "./inputs/AudioRecordInputs.vue";

import { isAudioMimeType } from "@/utils/fileHelper";
import { injectStrict } from "@/utils/inject";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { useDebounceFn } from "@vueuse/core";
import { useDisplay } from "vuetify";
import { AudioRecordProperties } from "../../types/audio-record-properties";
import { AudioRecordAlert } from "./alert/AudioRecordAlert.enum";

const props = defineProps({
	audioRecordProperties: {
		type: Object as PropType<AudioRecordProperties>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	alerts: { type: Array as PropType<AudioRecordAlert[]>, required: true },
});

const emit = defineEmits([
	"fetch:file",
	"update:alternativeText",
	"update:caption",
	"add:alert",
]);

const onFetchFile = () => {
	emit("fetch:file");
};
const onUpdateCaption = useDebounceFn((value: string) => {
	emit("update:caption", value);
}, 600);

const onUpdateText = useDebounceFn((value: string) => {
	emit("update:alternativeText", value);
}, 600);

const onAddAlert = (alert: AudioRecordAlert) => {
	emit("add:alert", alert);
};

const hasAudioMimeType = computed(() => {
	return isAudioMimeType(props.audioRecordProperties.mimeType);
});

const isListLayout = ref(injectStrict(BOARD_IS_LIST_LAYOUT));
const { smAndUp } = useDisplay();

const isSmallOrLargerListBoard = computed(() => {
	return smAndUp.value && isListLayout.value;
});

const isMenuShownOnFileDisplay = computed(() => {
	const isFileDisplayRendered =
		!!props.audioRecordProperties.previewUrl || hasAudioMimeType.value;

	const isPdfOnSmallOrLargerListBoard =
		isSmallOrLargerListBoard.value && hasAudioMimeType.value;

	return isFileDisplayRendered && !isPdfOnSmallOrLargerListBoard;
});
</script>

<style lang="scss" scoped>
.file-information {
	flex: 2 1 auto;
}
</style>
