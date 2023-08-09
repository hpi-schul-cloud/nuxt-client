<template>
	<div>
		<button @click="onUploadClick">upload</button>
		<FilePicker
			@update:file="onFileSelect"
			:isFilePickerOpen.sync="isFilePickerOpen"
		/>
		<v-list-item
			class="grey lighten-3 px-2 rounded-t-sm"
			data-testid="board-file-element-edit"
			inactive
			:ripple="false"
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
					>{{ fileName }}</span
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
		-- {{ fileName }} --
	</div>
</template>

<script lang="ts">
import { mdiFileDocumentOutline } from "@mdi/js";
import { computed, defineComponent, ref, Ref } from "vue";
import FileContentElementMenu from "./FileContentElementMenu.vue";
import FilePicker from "./FilePicker.vue";

export default defineComponent({
	name: "FileContentElementEdit",
	components: { FileContentElementMenu, FilePicker },
	props: {
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
		const file: Ref<File | undefined> = ref(undefined);

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
			emit("upload:file", file);
		};

		const fileName = computed(() => {
			return file.value ? file.value.name : "";
		});

		return {
			isFilePickerOpen,
			fileName,
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
