<template>
	<v-file-input v-show="false" ref="inputRef" v-model="file" />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useFilePicker } from "./FilePicker.composable";

export default defineComponent({
	name: "FilePicker",
	components: {},
	props: {},
	setup() {
		const { isFilePickerOpen, triggerFilePicker } = useFilePicker();
		const inputRef = ref();
		const file = ref();

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
