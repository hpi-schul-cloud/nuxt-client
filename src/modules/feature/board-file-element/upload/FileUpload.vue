<template>
	<ContentElementBar v-if="isEditMode">
		<template #element>
			<div
				v-if="isUploading || fileWasPicked"
				class="d-flex align-center pt-1"
				style="height: 32px"
			>
				<v-progress-linear
					data-testid="board-file-element-progress-bar"
					indeterminate
					color="primary"
				/>
			</div>

			<FilePicker
				v-else
				@update:file="onFileSelect"
				v-model:isFilePickerOpen="isFilePickerOpen"
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
		isUploading: { type: Boolean },
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
			if (fileWasPicked.value || props.isUploading) {
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
