<template>
	<div>
		<v-file-input v-show="false" ref="inputRef" v-model="modelFile" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useFilePicker } from "./FilePicker.composable";

export default defineComponent({
	name: "FilePicker",
	components: {},
	emits: ["update:file"],
	setup(props, { emit }) {
		const { isFilePickerOpen, triggerFilePicker } = useFilePicker();
		const inputRef = ref();
		const modelFile = ref();

		watch(isFilePickerOpen, (newValue: boolean) => {
			if (newValue) {
				inputRef.value.$refs.input.click();
				triggerFilePicker();
			}
		});

		watch(modelFile, (newValue) => {
			if (newValue) {
				emit("update:file", newValue);
			}
		});

		return {
			inputRef,
			modelFile,
		};
	},
});
</script>
