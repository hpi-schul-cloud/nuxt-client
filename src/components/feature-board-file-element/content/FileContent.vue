<template>
	<div>
		<FileDisplay :file-properties="fileProperties" :is-edit-mode="isEditMode" />
		<ContentElementDescription
			:file-properties="fileProperties"
			:is-edit-mode="isEditMode"
		></ContentElementDescription>
		<ContentElementFooter :fileProperties="fileProperties" />
		<FileAlert :previewStatus="previewStatus" @on-status-reload="onFetchFile" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import FileAlert from "../content/alert/FileAlert.vue";
import FileDisplay from "../content/display/FileDisplay.vue";
import { FileProperties } from "../shared/types/file-properties";
import ContentElementDescription from "././description/ContentElementDescription.vue";
import ContentElementFooter from "./footer/ContentElementFooter.vue";

export default defineComponent({
	name: "FileContent",
	components: {
		FileDisplay,
		ContentElementFooter,
		FileAlert,
		ContentElementDescription,
	},
	props: {
		fileProperties: {
			type: Object as PropType<FileProperties>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
	},
	emits: ["fetch:file", "update:alternativeText", "update:caption"],
	setup(props, { emit }) {
		const onFetchFile = () => {
			emit("fetch:file");
		};
		const onUpdateCaption = (value: string) => emit("update:caption", value);

		const onUpdateText = (value: string) =>
			emit("update:alternativeText", value);
		const previewStatus = computed(() => props.fileProperties.previewStatus);

		return { onFetchFile, previewStatus, onUpdateText, onUpdateCaption };
	},
});
</script>
