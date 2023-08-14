<template>
	<div v-if="!fileWasPicked" class="grey lighten-3">
		<v-file-input
			class="px-5"
			ref="inputRef"
			@change="onFileChange"
			prepend-icon="$mdiTrayArrowUp"
			:placeholder="$t('feature-board-file-element.placeholder.uploadFile')"
		/>
	</div>
	<v-card-text v-else>
		<v-progress-linear
			data-testid="board-file-element-progress-bar"
			indeterminate
		></v-progress-linear>
	</v-card-text>
</template>

<script lang="ts">
import { useVModel } from "@vueuse/core";
import { defineComponent, onMounted, ref, watch } from "vue";
import { mdiTrayArrowUp } from "@mdi/js";

export default defineComponent({
	name: "FilePicker",
	components: {},
	props: {
		isFilePickerOpen: { type: Boolean, required: true },
	},
	emits: ["update:file"],
	setup(props, { emit }) {
		const inputRef = ref();
		const fileWasPicked = ref(false);
		const isFilePickerOpen = useVModel(props, "isFilePickerOpen", emit);

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
					fileWasPicked.value = false;
					isFilePickerOpen.value = false;
				}
			}
		);

		const onFileChange = (file: File) => {
			fileWasPicked.value = true;
			emit("update:file", file);
		};

		return {
			fileWasPicked,
			inputRef,
			mdiTrayArrowUp,
			onFileChange,
		};
	},
});
</script>
