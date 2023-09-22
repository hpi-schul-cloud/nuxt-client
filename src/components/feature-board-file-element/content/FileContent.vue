<template>
	<div>
		<FileDisplay :file-properties="fileProperties" :is-edit-mode="isEditMode" />
		<AlternativeText
			v-if="isEditMode && fileProperties.previewUrl"
			:text="fileProperties.element.content.alternativeText"
			@update:text="onUpdateText"
		/>
		<ContentElementFooter :fileProperties="fileProperties" />
		<FileAlert :previewStatus="previewStatus" @on-status-reload="onFetchFile" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import FileAlert from "../content/alert/FileAlert.vue";
import FileDisplay from "../content/display/FileDisplay.vue";
import { FileProperties } from "../shared/types/file-properties";
import AlternativeText from "./alternative-text/AlternativeText.vue";
import ContentElementFooter from "./footer/ContentElementFooter.vue";

export default defineComponent({
	name: "FileContent",
	components: {
		FileDisplay,
		ContentElementFooter,
		FileAlert,
		AlternativeText,
	},
	props: {
		fileProperties: {
			type: Object as PropType<FileProperties>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
	},
	emits: ["fetch:file", "update:alternativeText"],
	setup(props, { emit }) {
		const onFetchFile = () => {
			emit("fetch:file");
		};
		const onUpdateText = (value: string) =>
			emit("update:alternativeText", value);
		const previewStatus = computed(() => props.fileProperties.previewStatus);

		return { onFetchFile, previewStatus, onUpdateText };
	},
});
</script>
