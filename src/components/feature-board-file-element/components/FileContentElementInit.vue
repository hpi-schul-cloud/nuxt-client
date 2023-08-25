<template>
	<div>
		<div v-if="!fileWasPicked" class="grey lighten-3">
			<FilePicker
				v-if="fileName === ''"
				@update:file="onFileSelect"
				:isFilePickerOpen.sync="isFilePickerOpen"
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

<script setup lang="ts">
import { useSharedLastCreatedElement } from "@util-board";
import { ref, watch } from "vue";
import FilePicker from "./FilePicker.vue";

const props = defineProps({
	fileName: { type: String, required: true },
	elementId: { type: String, required: true },
});

const emit = defineEmits([
	"delete:element",
	"move-down:element",
	"move-up:element",
	"upload:file",
]);

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
</script>
