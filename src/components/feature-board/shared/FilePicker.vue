<template>
	<v-file-input v-show="false" ref="inputRef" @change="onFileChange" />
</template>

<script lang="ts">
import { useVModel } from "@vueuse/core";
import { defineComponent, onMounted, ref, watch } from "vue";
import { useFileStorageNotifier } from "./FileStorageNotifications.composable";

export default defineComponent({
	name: "FilePicker",
	components: {},
	props: {
		isFilePickerOpen: { type: Boolean, required: true },
	},
	emits: ["update:file"],
	setup(props, { emit }) {
		const inputRef = ref();
		const isFilePickerOpen = useVModel(props, "isFilePickerOpen", emit);
		const { showFileTooBigError, getMaxFileSize } = useFileStorageNotifier();

		onMounted(() => {
			inputRef.value.$refs.input.onclick = (e: Event) => {
				e.stopPropagation();
			};
		});

		watch(
			() => props.isFilePickerOpen,
			(newValue: boolean) => {
				if (newValue) {
					inputRef.value.$refs.input.value = "";
					inputRef.value.$refs.input.click();
					isFilePickerOpen.value = false;
				}
			}
		);

		const onFileChange = (file: File) => {
			if (file.size > getMaxFileSize()) {
				showFileTooBigError();
			} else {
				emit("update:file", file);
			}
		};

		return {
			inputRef,
			onFileChange,
		};
	},
});
</script>
