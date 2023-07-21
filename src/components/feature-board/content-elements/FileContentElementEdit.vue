<template>
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
</template>

<script lang="ts">
import { mdiFileDocumentOutline } from "@mdi/js";
import { defineComponent } from "vue";
import FileContentElementMenu from "./FileContentElementMenu.vue";

export default defineComponent({
	name: "FileContentElementEdit",
	components: { FileContentElementMenu },
	props: {
		fileName: { type: String, required: true },
		isDownloadAllowed: { type: Boolean, required: true },
		url: { type: String, required: true },
		isFirstElement: { type: Boolean, required: true },
		isLastElement: { type: Boolean, required: true },
		hasMultipleElements: { type: Boolean, required: true },
	},
	emits: ["delete:element", "move-down:element", "move-up:element"],
	setup(props, { emit }) {
		const onMoveElementDown = () => {
			emit("move-down:element");
		};

		const onMoveElementUp = () => {
			emit("move-up:element");
		};

		const onDeleteElement = () => {
			emit("delete:element");
		};

		return {
			mdiFileDocumentOutline,
			onMoveElementDown,
			onMoveElementUp,
			onDeleteElement,
		};
	},
});
</script>
