<template>
	<div>
		<v-file-input v-show="false" ref="inputRef" v-model="modelFile" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useFilePicker } from "./FilePicker.composable";

export default defineComponent({
	name: "FilePicker",
	components: {},
	props: {},
	emits: ["update:file"],
	setup(props, { emit }) {
		const inputRef = ref();
		const modelFile = ref();
		const { isFilePickerOpen, closeFilePicker, setSelectedFile } =
			useFilePicker();

		onMounted(() => {
			inputRef.value.$refs.input.onclick = (e: Event) => {
				e.stopPropagation();
			};
		});

		watch(isFilePickerOpen, (newValue: boolean) => {
			if (newValue) {
				inputRef.value.$refs.input.click();
			}

			closeFilePicker();
		});

		watch(modelFile, (newValue) => {
			if (newValue) {
				emit("update:file", newValue);

				setSelectedFile(newValue);
			}
		});

		return {
			inputRef,
			modelFile,
		};
	},
});
</script>
