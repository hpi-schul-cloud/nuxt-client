<template>
	<v-list-item
		class="grey lighten-3 px-2 rounded-t-sm"
		inactive
		ref="fileContentElement"
		:ripple="false"
		tabindex="0"
		@keydown.up.down="onKeydownArrow"
	>
		<v-img :src="url" :alt="fileName" />
		<div v-if="isEditMode" class="menu">
			<FileContentElementMenu
				:fileName="fileName"
				:isDownloadAllowed="isDownloadAllowed"
				:url="url"
				:isFirstElement="isFirstElement"
				:isLastElement="isLastElement"
				:hasMultipleElements="hasMultipleElements"
				@move-down:element="onMoveElementDown"
				@move-up:element="onMoveElementUp"
				@move-keyboard:element="onKeydownArrow"
				@delete:element="onDeleteElement"
			/>
		</div>
	</v-list-item>
</template>

<script lang="ts">
import {
	mdiAlertCircle,
	mdiArrowCollapseDown,
	mdiArrowCollapseUp,
	mdiFileDocumentOutline,
	mdiTrashCanOutline,
	mdiTrayArrowDown,
} from "@mdi/js";
import { defineComponent, ref } from "vue";
import { useBoardFocusHandler } from "../shared/BoardFocusHandler.composable";
import FileContentElementMenu from "./FileContentElementMenu.vue";

export default defineComponent({
	name: "ImageFileDisplay",
	components: { FileContentElementMenu },
	props: {
		fileId: { type: String, required: true },
		fileName: { type: String, required: true },
		isDownloadAllowed: { type: Boolean, required: true },
		url: { type: String, required: true },
		isEditMode: { type: Boolean, required: true },
		isFirstElement: { type: Boolean, required: true },
		isLastElement: { type: Boolean, required: true },
		hasMultipleElements: { type: Boolean, required: true },
	},
	emits: [
		"delete:element",
		"move-down:element",
		"move-up:element",
		"move-keyboard:element",
		"update:caption",
	],
	setup(props, { emit }) {
		const fileContentElement = ref(undefined);
		useBoardFocusHandler(props.fileId, fileContentElement);

		const onKeydownArrow = (event: KeyboardEvent) => {
			event.preventDefault();
			emit("move-keyboard:element", event);
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

		return {
			fileContentElement,
			mdiAlertCircle,
			mdiFileDocumentOutline,
			mdiArrowCollapseUp,
			mdiArrowCollapseDown,
			mdiTrashCanOutline,
			mdiTrayArrowDown,
			onKeydownArrow,
			onMoveElementDown,
			onMoveElementUp,
			onDeleteElement,
		};
	},
});
</script>

<style scoped>
.menu {
	position: absolute;
	top: 8px;
	right: 8px;
}
</style>
