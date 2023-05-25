<template>
	<v-file-input v-show="false" ref="inputRef" v-model="file" />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useFilePicker } from "./FilePicker.composable";
import { useInternalElementTypeSelection } from "./ElementTypeSelection.composable";

export default defineComponent({
	name: "FilePicker",
	components: {},
	props: {},
	setup() {
		const { isFilePickerOpen, triggerFilePicker } = useFilePicker();
		const { createFileElement } = useInternalElementTypeSelection();
		const inputRef = ref();
		const file = ref();

		watch(isFilePickerOpen, (newValue: boolean) => {
			if (newValue) {
				inputRef.value.$refs.input.click();
				triggerFilePicker();
			}
		});

		watch(file, async (newValue: File) => {
			if (newValue) {
				await createFileElement(newValue);
			}
		});

		return {
			inputRef,
			file,
		};
	},
});
</script>
