<template>
	<v-file-input
		density="compact"
		ref="inputRef"
		@update:model-value="onFileChange"
		:prepend-icon="mdiTrayArrowUp"
		:placeholder="$t('feature-board-file-element.placeholder.uploadFile')"
		:hide-details="true"
	/>
</template>

<script lang="ts">
import { mdiTrayArrowUp } from "@icons/material";
import { useVModel } from "@vueuse/core";
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
	name: "FilePicker",
	components: {},
	props: {
		isFilePickerOpen: { type: Boolean, required: true },
	},
	emits: ["update:file", "update:isFilePickerOpen"],
	setup(props, { emit }) {
		const inputRef = ref();
		const isFilePickerOpen = useVModel(props, "isFilePickerOpen", emit);

		onMounted(() => {
			inputRef.value.onclick = (e: Event) => {
				e.stopPropagation();
			};
		});

		watch(
			() => props.isFilePickerOpen,
			(newValue: boolean) => {
				if (newValue) {
					inputRef.value.value = "";
					inputRef.value.click();
					isFilePickerOpen.value = false;
				}
			}
		);

		const onFileChange = (files: File[] | File) => {
			if (Array.isArray(files)) {
				emit("update:file", files[0]);
			} else {
				emit("update:file", files);
			}
		};

		return {
			inputRef,
			mdiTrayArrowUp,
			onFileChange,
		};
	},
});
</script>
