<template>
	<div>
		<div v-if="!fileWasPicked" class="grey lighten-3">
			<FilePicker
				@update:file="onFileSelect"
				v-model:isFilePickerOpen="isFilePickerOpen"
			/>
		</div>
		<v-card-text v-else>
			<v-progress-linear
				data-testid="board-file-element-progress-bar"
				indeterminate
			></v-progress-linear>
		</v-card-text>
	</div>
</template>

<script lang="ts">
import { useSharedLastCreatedElement } from "@util-board";
import { defineComponent, ref, watch } from "vue";
import FilePicker from "./FilePicker.vue";

export default defineComponent({
	name: "FileContentElementInit",
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
