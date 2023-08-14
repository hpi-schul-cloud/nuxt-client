<template>
	<div>
		<FilePicker
			v-if="url === ''"
			@update:file="onFileSelect"
			:isFilePickerOpen.sync="isFilePickerOpen"
		/>
		<div v-else>
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
			<FileContentElementChips :fileSize="fileSize" :fileName="fileName" />
		</div>
	</div>
</template>

<script lang="ts">
import { mdiFileDocumentOutline } from "@mdi/js";
import { defineComponent, ref, watch } from "vue";
import FileContentElementChips from "./FileContentElementChips.vue";
import FileContentElementMenu from "./FileContentElementMenu.vue";
import FilePicker from "./FilePicker.vue";
import { mdiClose } from "@mdi/js";
import { useSharedLastCreatedElement } from "@util-board";

export default defineComponent({
	name: "FileContentElementEdit",
	components: { FileContentElementChips, FileContentElementMenu, FilePicker },
	props: {
		fileName: { type: String, required: true },
		fileSize: { type: Number, required: true },
		elementId: { type: String, required: true },
		isDownloadAllowed: { type: Boolean, required: true },
		url: { type: String, required: true },
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
			mdiFileDocumentOutline,
			mdiClose,
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

<style lang="scss" scoped>
.custom-info-alert::v-deep .v-btn__content .v-icon {
	color: var(--v-black-base) !important;
}
.custom-info-alert .text {
	color: var(--v-black-base) !important;
}
.custom-info-alert .text a {
	color: var(--v-black-base) !important;
	text-decoration: underline;
}
</style>
