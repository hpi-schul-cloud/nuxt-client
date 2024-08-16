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
			<FileDisplay
				:file-properties="fileProperties"
				:is-edit-mode="isEditMode"
				@add:alert="onAddAlert"
			>
				<slot />
			</FileDisplay>
		</div>
		<div
			class="d-flex flex-column"
			:class="{ ' file-information': hasRowStyle }"
		>
			<FileDescription
				:name="fileProperties.name"
				:caption="fileProperties.element.content.caption"
				:show-title="showTitle"
				:show-menu="showMenu"
				:is-edit-mode="isEditMode"
				:src="fileDescriptionSrc"
			>
				<slot />
			</FileDescription>
			<FileInputs
				:file-properties="fileProperties"
				:is-edit-mode="isEditMode"
				@update:alternativeText="onUpdateText"
				@update:caption="onUpdateCaption"
			/>
			<ContentElementFooter :fileProperties="fileProperties" />
			<FileAlerts :alerts="alerts" @on-status-reload="onFetchFile" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from "vue";
import FileAlerts from "./alert/FileAlerts.vue";
import FileDisplay from "../content/display/FileDisplay.vue";
import FileDescription from "./display/file-description/FileDescription.vue";
import { FileProperties } from "../shared/types/file-properties";
import FileInputs from "././inputs/FileInputs.vue";
import ContentElementFooter from "./footer/ContentElementFooter.vue";
import { FileAlert } from "../shared/types/FileAlert.enum";
import { useDebounceFn } from "@vueuse/core";
import { injectStrict } from "@/utils/inject";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { useDisplay } from "vuetify";
import { useMimeType } from "@/composables/mimeType.composable";

const props = defineProps({
	fileProperties: {
		type: Object as PropType<FileProperties>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	alerts: { type: Array as PropType<FileAlert[]>, required: true },
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

const onAddAlert = (alert: FileAlert) => {
	emit("add:alert", alert);
};

const mimeType = computed(() => props.fileProperties.mimeType);
const { isVideoMimeType, isPdfMimeType, isAudioMimeType } = useMimeType(
	mimeType.value
);

const fileDescriptionSrc = computed(() => {
	return isPdfMimeType.value ? props.fileProperties.url : undefined;
});

const showTitle = computed(() => {
	return (
		isPdfMimeType.value ||
		(!props.fileProperties.previewUrl &&
			!isVideoMimeType.value &&
			!isAudioMimeType.value)
	);
});

const showMenu = computed(() => {
	return (
		!isPdfMimeType.value &&
		!props.fileProperties.previewUrl &&
		!isVideoMimeType.value &&
		!isAudioMimeType.value
	);
});

const isListLayout = ref(injectStrict(BOARD_IS_LIST_LAYOUT));
const { smAndUp } = useDisplay();

const hasRowStyle = computed(() => {
	const isSmallorLargerListBoard = smAndUp.value && isListLayout.value;

	return (
		isSmallorLargerListBoard &&
		isPdfMimeType.value &&
		props.fileProperties.previewUrl
	);
});
</script>
<style lang="scss" scoped>
.file-information {
	flex: 2 1 auto;
}
</style>
