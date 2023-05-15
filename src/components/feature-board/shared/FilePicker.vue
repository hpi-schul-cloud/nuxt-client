<template>
	<v-file-input v-show="false" ref="openFilePicker" v-model="file" />
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch } from "vue";
import { useFilePicker } from "./FilePicker.composable";

export default defineComponent({
	name: "FilePicker",
	components: {},
	props: {},
	setup() {
		const { isFilePickerOpen, triggerFilePicker } = useFilePicker();
		const openFilePicker: Ref<any> = ref(null);
		const file = ref(null);

		watch(isFilePickerOpen, (newValue: boolean) => {
			if (newValue) {
				openFilePicker.value.$refs.input.click();
				triggerFilePicker();
			}
		});

		return {
			openFilePicker,
			file,
		};
	},
});
</script>
