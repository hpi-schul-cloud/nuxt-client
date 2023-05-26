<template>
	<div>
		<v-file-input v-show="false" ref="inputRef" v-model="file" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useFilePicker } from "./FilePicker.composable";

export default defineComponent({
	name: "FilePicker",
	components: {},
	props: {},
	setup() {
		const { isFilePickerOpen, file, triggerFilePicker } = useFilePicker();
		const inputRef = ref();

		watch(isFilePickerOpen, (newValue: boolean) => {
			if (newValue) {
				inputRef.value.$refs.input.click();
				triggerFilePicker();
			}
		});

		return {
			inputRef,
			file,
		};
	},
});
</script>
