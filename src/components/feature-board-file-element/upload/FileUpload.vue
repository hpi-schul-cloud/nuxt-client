<template>
	<ContentElementBar>
		<template #element>
			<FilePicker
				v-if="!fileWasPicked"
				@update:file="onFileSelect"
				v-model:isFilePickerOpen="isFilePickerOpen"
			/>

			<v-progress-linear
				v-else
				data-testid="board-file-element-progress-bar"
				indeterminate
				color="primary"
			/>
		</template>

		<template #menu>
			<slot />
		</template>
	</ContentElementBar>
</template>

<script lang="ts">
import { ContentElementBar } from "@ui-board";
import { useSharedLastCreatedElement } from "@util-board";
import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from "vue";
import FilePicker from "./file-picker/FilePicker.vue";

export default defineComponent({
	name: "FileUpload",
	props: {
		elementId: { type: String, required: true },
		isEditMode: { type: Boolean },
	},
	components: { FilePicker, ContentElementBar },
	emits: ["upload:file"],
	setup(props, { emit }) {
		const isFilePickerOpen = ref(false);
		const fileWasPicked = ref(false);

		const { lastCreatedElementId, resetLastCreatedElementId } =
			useSharedLastCreatedElement();

		watch(lastCreatedElementId, (newValue) => {
			if (newValue !== undefined && newValue === props.elementId) {
				isFilePickerOpen.value = true;
				resetLastCreatedElementId();
			}
		});

		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			if (fileWasPicked.value) {
				// Opens confirmation dialog in firefox
				event.preventDefault();
				// Opens confirmation dialog in chrome
				event.returnValue = "";
			}
		};

		onMounted(() => {
			window.addEventListener("beforeunload", handleBeforeUnload);
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
