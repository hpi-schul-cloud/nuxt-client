<template>
	<div>
		<v-img
			class="rounded-t-sm"
			:src="fileProperties.previewUrl"
			:alt="fileProperties.name"
		/>
		<div v-if="isEditMode" class="menu">
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
		</div>
		<FileContentElementChips
			:fileSize="fileProperties.size"
			:fileName="fileProperties.name"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import FileContentElementChips from "./FileContentElementChips.vue";
import FileContentElementMenu from "./FileContentElementMenu.vue";
import { FileProperties } from "./types/file-properties";

export default defineComponent({
	name: "ImageFileDisplay",
	components: { FileContentElementMenu, FileContentElementChips },
	props: {
		fileProperties: {
			type: Object as PropType<FileProperties>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
		isFirstElement: { type: Boolean, required: true },
		isLastElement: { type: Boolean, required: true },
		hasMultipleElements: { type: Boolean, required: true },
	},
	emits: [
		"delete:element",
		"move-down:element",
		"move-up:element",
		"update:caption",
	],
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
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.8);
	top: 0.5rem;
	right: 0.5rem;
}
</style>
