<template>
	<div v-if="fileProperties.name !== ''">
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
					v-if="fileProperties.isDownloadAllowed"
					class="subtitle-1 d-inline-block text-truncate"
					data-testid="board-file-element-display-file-name-link"
					:download="fileProperties.name"
					:href="fileProperties.url"
					>{{ fileProperties.name }}</a
				>
				<span
					v-else
					class="subtitle-1 d-inline-block text-truncate"
					data-testid="board-file-element-display-file-name"
					>{{ fileProperties.name }}</span
				>
			</v-list-item-content>
		</v-list-item>
		<FileContentElementChips
			:fileSize="fileProperties.size"
			:fileName="fileProperties.name"
		/>
	</div>
</template>

<script lang="ts">
import { mdiFileDocumentOutline } from "@mdi/js";
import { defineComponent, PropType } from "vue";
import FileContentElementChips from "./FileContentElementChips.vue";
import { FileProperties } from "./types/file-properties";

export default defineComponent({
	name: "FileContentElementDisplay",
	props: {
		fileProperties: {
			type: Object as PropType<FileProperties>,
			required: true,
		},
	},
	components: { FileContentElementChips },
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
