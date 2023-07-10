<template>
	<v-list-item
		class="grey lighten-3 px-0 rounded-t-sm"
		inactive
		:ripple="false"
	>
		<v-img class="rounded-t-sm" :src="url" :alt="fileName" />
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
				@delete:element="onDeleteElement"
			/>
		</div>
	</v-list-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
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
	top: 8px;
	right: 8px;
}
</style>
