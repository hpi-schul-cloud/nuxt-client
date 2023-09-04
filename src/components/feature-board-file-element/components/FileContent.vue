<template>
	<div>
		<FileDisplay :file-properties="fileProperties" :is-edit-mode="isEditMode" />
		<FileContentElementFooter :fileProperties="fileProperties" />
		<FileContentElementAlert
			:previewStatus="previewStatus"
			@on-status-reload="onFetchFile"
		/>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import FileContentElementAlert from "./FileContentElementAlert.vue";
import FileContentElementFooter from "./FileContentElementFooter.vue";
import FileDisplay from "./FileDisplay.vue";
import { FileProperties } from "./types/file-properties";

export default defineComponent({
	name: "FileContent",
	components: {
		FileDisplay,
		FileContentElementFooter,
		FileContentElementAlert,
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
