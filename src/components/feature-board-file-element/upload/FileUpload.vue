<template>
	<div>
		<div v-if="!fileWasPicked" class="grey lighten-3">
			<FilePicker
				class="mr-12"
				@update:file="onFileSelect"
				:isFilePickerOpen.sync="isFilePickerOpen"
			/>
		</div>
		<div class="progress-bar" v-else>
			<v-progress-linear
				data-testid="board-file-element-progress-bar"
				indeterminate
			/>
		</div>
	</div>
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
	margin: 0px 48px 0px 16px;
	display: flex;
	align-items: center;
}
</style>
