<template>
	<div v-if="fileName !== ''">
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
		<FileContentElementChips :fileSize="fileSize" :fileName="fileName" />
	</div>
</template>

<script lang="ts">
import FileContentElementChips from "@/components/feature-board-file-element/components/FileContentElementChips.vue";
import { mdiFileDocumentOutline } from "@mdi/js";
import { defineComponent, ref } from "vue";

export default defineComponent({
	name: "FileContentElementDisplay",
	props: {
		fileName: { type: String, required: true },
		isDownloadAllowed: { type: Boolean, required: true },
		url: { type: String, required: true },
	},
	setup() {
		const fileSize = ref(0);
		return {
			fileSize,
			mdiFileDocumentOutline,
		};
	},
	components: { FileContentElementChips },
});
</script>

<style lang="scss" scoped>
a:focus {
	outline: none;
}
</style>
