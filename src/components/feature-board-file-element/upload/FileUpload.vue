<template>
	<v-app-bar flat color="rgba(0, 0, 0, 0)">
		<div v-if="!fileWasPicked" class="w-100">
			<FilePicker
				@update:file="onFileSelect"
				:isFilePickerOpen.sync="isFilePickerOpen"
			/>
		</div>
		<div class="progress-bar w-100" v-else>
			<v-progress-linear
				data-testid="board-file-element-progress-bar"
				indeterminate
			/>
		</div>

		<v-spacer></v-spacer>

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
	emits: [
		"delete:element",
		"move-down:element",
		"move-up:element",
		"upload:file",
	],
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
<style scoped>
.progress-bar {
	min-height: 52px;
	margin-left: 16px;
	display: flex;
	align-items: center;
}
</style>
