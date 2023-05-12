<template>
	<v-file-input v-show="false" ref="openFilePicker" v-model="file" />
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch } from "vue";
import { useCreateFileElement } from "./CreateFileElement.composable";

export default defineComponent({
	name: "CreateFileElement",
	components: {},
	props: {},
	setup() {
		const { isFilePickerOpen, triggerFilePicker } = useCreateFileElement();
		const openFilePicker: Ref<any> = ref(null);
		const file = ref(null);

		watch(isFilePickerOpen, (newValue: boolean) => {
			if (newValue) {
				openFilePicker.value.$refs.input.click();
				triggerFilePicker();
			}
		});

		const uploadFile = () => {
			openFilePicker.value.$refs.input.click();

			// TODO ... evaluate returned file name
		};

		return {
			openFilePicker,
			file,
			uploadFile,
		};
	},
});
</script>
