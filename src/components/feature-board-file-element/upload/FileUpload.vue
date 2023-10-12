<template>
	<v-app-bar flat color="transparent">
		<FilePicker
			v-if="!fileWasPicked"
			@update:file="onFileSelect"
			:isFilePickerOpen.sync="isFilePickerOpen"
		/>

		<v-progress-linear
			v-else
			data-testid="board-file-element-progress-bar"
			indeterminate
		/>
		<slot></slot>
	</v-app-bar>
</template>

<script lang="ts">
import { useSharedLastCreatedElement } from "@util-board";
import { defineComponent, ref, watch } from "vue";
import FilePicker from "./file-picker/FilePicker.vue";

export default defineComponent({
	name: "FileUpload",
	props: {
		elementId: { type: String, required: true },
	},
	components: { FilePicker },
	emits: ["upload:file"],
	setup(props, { emit }) {
		const isFilePickerOpen = ref(false);
		const fileWasPicked = ref(false);

		const { lastCreatedElementId, resetLastCreatedElementId } =
			useSharedLastCreatedElement();

		watch(lastCreatedElementId, (newValue) => {
			if (newValue !== undefined && newValue === props.elementId) {
				isFilePickerOpen.value = true;
				resetLastCreatedElementId();
			}
		});

		const onFileSelect = async (file: File) => {
			fileWasPicked.value = true;
			emit("upload:file", file);
		};

		return {
			fileWasPicked,
			isFilePickerOpen,
			lastCreatedElementId,
			onFileSelect,
		};
	},
});
</script>
