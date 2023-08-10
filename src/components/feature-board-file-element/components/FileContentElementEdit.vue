<template>
	<div>
		<FilePicker
			@update:file="onFileSelect"
			:isFilePickerOpen.sync="isFilePickerOpen"
		/>
		<v-list-item
			class="grey lighten-3 px-2 rounded-t-sm"
			data-testid="board-file-element-edit"
			inactive
			:ripple="false"
			@click.stop="onUploadClick"
		>
			<v-list-item-icon class="my-2 mr-2">
				<v-icon
					class="grey--text"
					data-testid="board-file-element-edit-file-icon"
					large
					>{{ mdiFileDocumentOutline }}</v-icon
				>
			</v-list-item-icon>

			<v-list-item-content>
				<span
					class="subtitle-1 d-inline-block text-truncate"
					data-testid="board-file-element-edit-file-name"
					>{{ fileName === "" ? "click to upload image" : fileName }}</span
				>
			</v-list-item-content>

			<FileContentElementMenu
				:fileName="fileName"
				:isDownloadAllowed="isDownloadAllowed"
				:url="url"
				:isFirstElement="isFirstElement"
				:isLastElement="isLastElement"
				:hasMultipleElements="hasMultipleElements"
				@move-down:element="onMoveElementDown"
				@move-up:element="onMoveElementUp"
				@delete:element="onDeleteElement"
			/>
		</v-list-item>
	</div>
</template>

<script lang="ts">
import { mdiFileDocumentOutline } from "@mdi/js";
import { defineComponent, ref, Ref, watch } from "vue";
import FileContentElementMenu from "./FileContentElementMenu.vue";
import FilePicker from "./FilePicker.vue";

export default defineComponent({
	name: "FileContentElementEdit",
	components: { FileContentElementMenu, FilePicker },
	props: {
		fileName: { type: String, required: true },
		isDownloadAllowed: { type: Boolean, required: true },
		url: { type: String, required: true },
		isFirstElement: { type: Boolean, required: true },
		isLastElement: { type: Boolean, required: true },
		hasMultipleElements: { type: Boolean, required: true },
	},
	emits: [
		"delete:element",
		"move-down:element",
		"move-up:element",
		"upload:file",
	],
	setup(props, { emit }) {
		const isFilePickerOpen = ref(false);
		const filePickerWasClosed = ref(false);
		const lastFile: Ref<File | undefined> = ref(undefined);

		watch(isFilePickerOpen, (isVisible, wasVisible) => {
			console.log("isVisible", isVisible);
			console.log("wasVisible", wasVisible);
			filePickerWasClosed.value = wasVisible && !isVisible;
			if (filePickerWasClosed.value) {
				console.log("closed");
				if (lastFile.value === undefined) {
					console.log("canceled");
				} else {
					console.log("picked");
				}
			} else {
				console.log("opened");
				lastFile.value = undefined;
			}
			// Todo: check error
		});

		const onUploadClick = () => {
			isFilePickerOpen.value = true;
		};

		const onMoveElementDown = () => {
			emit("move-down:element");
		};

		const onMoveElementUp = () => {
			emit("move-up:element");
		};

		const onDeleteElement = () => {
			emit("delete:element");
		};

		const onFileSelect = async (file: File) => {
			console.log("file", file);
			lastFile.value = file;
			emit("upload:file", file);
		};

		return {
			isFilePickerOpen,
			mdiFileDocumentOutline,
			onMoveElementDown,
			onMoveElementUp,
			onDeleteElement,
			onFileSelect,
			onUploadClick,
		};
	},
});
</script>
