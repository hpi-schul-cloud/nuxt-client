<template>
	<div class="d-flex">
		<!-- Apply class just for listboard && smAndUp-->
		<div class="flex-fill">
			<FileDisplay
				:file-properties="fileProperties"
				:is-edit-mode="isEditMode"
				@add:alert="onAddAlert"
			>
				<slot />
			</FileDisplay>
		</div>
		<!-- Apply class just for listboard && smAndUp-->
		<div class="d-flex flex-column file-information">
			<FileInputs
				:file-properties="fileProperties"
				:is-edit-mode="isEditMode"
				@update:alternativeText="onUpdateText"
				@update:caption="onUpdateCaption"
			/>
			<ContentElementFooter :fileProperties="fileProperties" />
			<FileAlerts :alerts="alerts" @on-status-reload="onFetchFile" />
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
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import FileAlerts from "./alert/FileAlerts.vue";
import FileDisplay from "../content/display/FileDisplay.vue";
import { FileProperties } from "../shared/types/file-properties";
import FileInputs from "././inputs/FileInputs.vue";
import ContentElementFooter from "./footer/ContentElementFooter.vue";
import { FileAlert } from "../shared/types/FileAlert.enum";
import { useDebounceFn } from "@vueuse/core";
import {
	isAudioMimeType,
	isVideoMimeType,
	isPdfMimeType,
} from "@/utils/fileHelper";

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

const hasVideoMimeType = computed(() => {
	return isVideoMimeType(props.fileProperties.mimeType);
});

const hasPdfMimeType = computed(() =>
	isPdfMimeType(props.fileProperties.mimeType)
);

const hasAudioMimeType = computed(() => {
	return isAudioMimeType(props.fileProperties.mimeType);
});

const fileDescriptionSrc = computed(() => {
	return hasPdfMimeType.value ? props.fileProperties.url : undefined;
});

const showTitle = computed(() => {
	return (
		hasPdfMimeType.value ||
		(!props.fileProperties.previewUrl &&
			!hasVideoMimeType.value &&
			!hasAudioMimeType.value)
	);
});

const showMenu = computed(() => {
	return (
		!hasPdfMimeType.value &&
		!props.fileProperties.previewUrl &&
		!hasVideoMimeType.value &&
		!hasAudioMimeType.value
	);
});
</script>
<style lang="scss" scoped>
.file-information {
	flex: 2 1 auto;
}
</style>
