<template>
	<v-list-item
		class="grey lighten-3 px-2 rounded-t-sm"
		data-testid="board-file-element-display"
		inactive
		:ripple="false"
	>
		<v-list-item-icon class="my-2 mr-2">
			<v-icon
				class="grey--text"
				data-testid="board-file-element-display-file-icon"
				large
				>{{ mdiFileDocumentOutline }}</v-icon
			>
		</v-list-item-icon>

		<v-list-item-content>
			<a
				v-if="isDownloadAllowed"
				class="subtitle-1 d-inline-block text-truncate"
				data-testid="board-file-element-display-file-name-link"
				:download="fileName"
				:href="url"
				>{{ fileName }}</a
			>
			<span
				v-else
				class="subtitle-1 d-inline-block text-truncate"
				data-testid="board-file-element-display-file-name"
				>{{ fileName }}</span
			>
		</v-list-item-content>
	</v-list-item>
</template>

<script lang="ts">
import { mdiFileDocumentOutline } from "@mdi/js";
import { defineComponent } from "vue";

export default defineComponent({
	name: "FileContentElementDisplay",
	props: {
		fileName: { type: String, required: true },
		isDownloadAllowed: { type: Boolean, required: true },
		url: { type: String, required: true },
	},
	setup() {
		return {
			mdiFileDocumentOutline,
		};
	},
});
</script>

<style lang="scss" scoped>
a:focus {
	outline: none;
}
</style>
