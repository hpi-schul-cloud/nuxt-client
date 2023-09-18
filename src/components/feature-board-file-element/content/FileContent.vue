<template>
	<div>
		<FileDisplay :file-properties="fileProperties" :is-edit-mode="isEditMode" />
		<CaptionText v-if="isEditMode"></CaptionText>
		<ContentElementFooter :fileProperties="fileProperties" />
		<FileAlert :previewStatus="previewStatus" @on-status-reload="onFetchFile" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import FileAlert from "../content/alert/FileAlert.vue";
import FileDisplay from "../content/display/FileDisplay.vue";
import { FileProperties } from "../shared/types/file-properties";
import CaptionText from "./caption/CaptionText.vue";
import ContentElementFooter from "./footer/ContentElementFooter.vue";

export default defineComponent({
	name: "FileContent",
	components: {
		FileDisplay,
		ContentElementFooter,
		FileAlert,
		CaptionText,
	},
	props: {
		fileProperties: {
			type: Object as PropType<FileProperties>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
	},

	setup(props, { emit }) {
		const onFetchFile = () => {
			emit("fetch:file");
		};

		const previewStatus = computed(() => props.fileProperties.previewStatus);

		return { onFetchFile, previewStatus };
	},
});
</script>
