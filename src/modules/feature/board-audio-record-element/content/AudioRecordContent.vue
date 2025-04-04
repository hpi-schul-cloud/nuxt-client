<template>
	<div
		class="d-flex"
		:class="{
			'flex-row': hasRowStyle,
			'flex-column': !hasRowStyle,
		}"
	>
		<div
			:class="{
				'w-33': hasRowStyle,
			}"
		>
			<AudioRecordDisplay
				:file-properties="audioRecordProperties"
				:is-edit-mode="isEditMode"
				:show-menu="isMenuShownOnFileDisplay"
				@add:alert="onAddAlert"
			>
				<slot />
			</AudioRecordDisplay>
		</div>
		<div
			class="d-flex flex-column"
			:class="{ 'audio-record-information': hasRowStyle }"
		>
			<AudioRecordDescription
				:name="AudioRecordProperties.name"
				:caption="AudioRecordProperties.element.content.caption"
				:show-title="showTitle"
				:show-menu="!isMenuShownOnFileDisplay"
				:is-edit-mode="isEditMode"
				:src="fileDescriptionSrc"
			>
				<slot />
			</AudioRecordDescription>
			<FileInputs
				:file-properties="AudioRecordProperties"
				:is-edit-mode="isEditMode"
				@update:alternativeText="onUpdateText"
				@update:caption="onUpdateCaption"
			/>
			<ContentElementFooter :fileProperties="audioRecordProperties" />
			<FileAlerts :alerts="alerts" @on-status-reload="onFetchFile" />
		</div>
	</div>
</template>

<script setup lang="ts">
import {
	isAudioMimeType,
	isPdfMimeType,
	isVideoMimeType,
} from "@/utils/fileHelper";
import { injectStrict } from "@/utils/inject";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { useDebounceFn } from "@vueuse/core";
import { computed, PropType, ref } from "vue";
import { useDisplay } from "vuetify";
import { AudioRecordAlert } from "../shared/types/AudioRecordAlert.enum";
import { AudioRecordProperties } from "../shared/types/audio-record-properties";
import FileAlerts from "./alert/AudioRecordAlerts.vue";
import AudioRecordDescription from "./display/audio-record-description/AudioRecordDescription.vue";
import ContentElementFooter from "./footer/ContentElementFooter.vue";
import FileInputs from "./inputs/FileInputs.vue";

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

const hasVideoMimeType = computed(() => {
	return isVideoMimeType(props.audioRecordProperties.mimeType);
});

const hasPdfMimeType = computed(() =>
	isPdfMimeType(props.audioRecordProperties.mimeType)
);

const hasAudioMimeType = computed(() => {
	return isAudioMimeType(props.audioRecordProperties.mimeType);
});

const fileDescriptionSrc = computed(() => {
	return hasPdfMimeType.value ? props.audioRecordProperties.url : undefined;
});

const showTitle = computed(() => {
	return (
		hasPdfMimeType.value ||
		(!props.audioRecordProperties.previewUrl &&
			!hasVideoMimeType.value &&
			!hasAudioMimeType.value)
	);
});

const isListLayout = ref(injectStrict(BOARD_IS_LIST_LAYOUT));
const { smAndUp } = useDisplay();

const isSmallOrLargerListBoard = computed(() => {
	return smAndUp.value && isListLayout.value;
});

const hasRowStyle = computed(
	() =>
		isSmallOrLargerListBoard.value &&
		hasPdfMimeType.value &&
		props.audioRecordProperties.previewUrl
);

const isMenuShownOnFileDisplay = computed(() => {
	const isFileDisplayRendered =
		!!props.audioRecordProperties.previewUrl ||
		hasVideoMimeType.value ||
		hasAudioMimeType.value;

	const isPdfOnSmallOrLargerListBoard =
		isSmallOrLargerListBoard.value && hasPdfMimeType.value;

	return isFileDisplayRendered && !isPdfOnSmallOrLargerListBoard;
});
</script>

<style lang="scss" scoped>
.audio-record-information {
	flex: 2 1 auto;
}
</style>
