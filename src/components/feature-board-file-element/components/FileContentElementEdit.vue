<template>
	<div>
		<v-list-item
			background-color="grey lighten-3 px-2 rounded-t-sm"
			data-testid="board-file-element-edit"
			inactive
			:ripple="false"
		>
			<v-list-item-icon class="my-2 mr-2">
				<v-icon
					class="grey--text"
					data-testid="board-file-element-edit-file-icon"
					large
					>$mdiFileDocumentOutline</v-icon
				>
			</v-list-item-icon>

			<v-list-item-content>
				<span
					class="subtitle-1 d-inline-block text-truncate"
					data-testid="board-file-element-edit-file-name"
					>{{ fileProperties.name }}</span
				>
			</v-list-item-content>

			<FileContentElementMenu
				:fileName="fileProperties.name"
				:isDownloadAllowed="fileProperties.isDownloadAllowed"
				:url="fileProperties.url"
				:isFirstElement="isFirstElement"
				:isLastElement="isLastElement"
				:hasMultipleElements="hasMultipleElements"
				@move-down:element="onMoveElementDown"
				@move-up:element="onMoveElementUp"
				@delete:element="onDeleteElement"
			/>
		</v-list-item>
		<FileContentElementFooter
			:fileProperties="fileProperties"
		></FileContentElementFooter>
	</div>
</template>

<script lang="ts">
import { useSharedLastCreatedElement } from "@util-board";
import { defineComponent, PropType, ref, watch } from "vue";
import FileContentElementFooter from "./FileContentElementFooter.vue";
import FileContentElementMenu from "./FileContentElementMenu.vue";
import { FileProperties } from "./types/file-properties";

export default defineComponent({
	name: "FileContentElementEdit",
	components: { FileContentElementMenu, FileContentElementFooter },
	props: {
		fileProperties: {
			type: Object as PropType<FileProperties>,
			required: true,
		},
		elementId: { type: String, required: true },
		isFirstElement: { type: Boolean, required: true },
		isLastElement: { type: Boolean, required: true },
		hasMultipleElements: { type: Boolean, required: true },
		needsFileUpload: { type: Boolean, required: true },
	},
	emits: [
		"delete:element",
		"move-down:element",
		"move-up:element",
		"upload:file",
	],
	setup(props, { emit }) {
		const isFilePickerOpen = ref(false);
		const { lastCreatedElementId, resetLastCreatedElementId } =
			useSharedLastCreatedElement();

		watch(lastCreatedElementId, (newValue) => {
			if (newValue !== undefined && newValue === props.elementId) {
				isFilePickerOpen.value = true;
				resetLastCreatedElementId();
			}
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

		const onDeleteElementWithoutAsking = () => {
			emit("delete:element", true);
		};

		const onFileSelect = async (file: File) => {
			emit("upload:file", file);
		};

		return {
			isFilePickerOpen,
			lastCreatedElementId,
			onMoveElementDown,
			onMoveElementUp,
			onDeleteElement,
			onDeleteElementWithoutAsking,
			onFileSelect,
			onUploadClick,
		};
	},
});
</script>
