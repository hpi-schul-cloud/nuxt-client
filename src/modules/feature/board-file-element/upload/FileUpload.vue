<template>
	<ContentElementBar v-if="isEditMode">
		<template #element>
			<div v-if="isUploading || fileWasPicked" class="d-flex align-center pt-1" style="height: 32px">
				<v-progress-linear data-testid="board-file-element-progress-bar" indeterminate color="primary" />
			</div>

			<FilePicker v-else v-model:is-file-picker-open="isFilePickerOpen" @update:file="onFileSelect" />
		</template>

		<template #menu>
			<slot />
		</template>
	</ContentElementBar>
</template>

<script lang="ts">
import FilePicker from "./file-picker/FilePicker.vue";
import { ContentElementBar } from "@ui-board";
import { useSharedFileSelect, useSharedLastCreatedElement } from "@util-board";
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";

export default defineComponent({
	name: "FileUpload",
	components: { FilePicker, ContentElementBar },
	props: {
		elementId: { type: String, required: true },
		isEditMode: { type: Boolean },
		isUploading: { type: Boolean },
	},
	emits: ["upload:file"],
	setup(props, { emit }) {
		const isFilePickerOpen = ref(false);
		const fileWasPicked = ref(false);

		const { lastCreatedElementId, resetLastCreatedElementId } = useSharedLastCreatedElement();
		const { isFileSelectOnMountEnabled, resetFileSelectOnMountEnabled } = useSharedFileSelect();

		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			if (fileWasPicked.value || props.isUploading) {
				// Opens confirmation dialog in firefox
				event.preventDefault();
				// Opens confirmation dialog in chrome
				event.returnValue = "";
			}
		};

		onMounted(() => {
			window.addEventListener("beforeunload", handleBeforeUnload);
			if (lastCreatedElementId.value !== props.elementId) {
				return;
			}
			isFilePickerOpen.value = isFileSelectOnMountEnabled.value;
			resetLastCreatedElementId();
			resetFileSelectOnMountEnabled();
		});

		onBeforeUnmount(() => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		});

		const onFileSelect = async (file: File) => {
			fileWasPicked.value = true;
			emit("upload:file", file);
		};

		return {
			fileWasPicked,
			isFilePickerOpen,
			lastCreatedElementId,
			onFileSelect,
		};
	},
});
</script>
