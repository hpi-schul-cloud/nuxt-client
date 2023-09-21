<template>
	<div class="grey lighten-4">
		<v-card-title
			v-if="showTitle"
			data-testid="board-file-element-display"
			inactive
		>
			<div class="d-flex flex-no-wrap align-center text-truncate">
				<v-icon
					color="black"
					class="mr-2"
					size="18"
					data-testid="board-file-element-display-file-icon"
					>{{ mdiFileDocumentOutline }}</v-icon
				>

				<span
					class="subtitle-1 font-weight-bold text-truncate"
					data-testid="board-file-element-display-file-name"
					>{{ name }}</span
				>
			</div>
		</v-card-title>

		<v-card-text>
			{{ caption }}
		</v-card-text>
	</div>
</template>

<script lang="ts">
import { mdiFileDocumentOutline } from "@mdi/js";
import { defineComponent } from "vue";

export default defineComponent({
	name: "FileDescription",
	props: {
		name: { type: String, required: true },
		caption: { type: String, required: false },
		showTitle: { type: Boolean, required: true },
	},
	setup() {
		return {
			mdiFileDocumentOutline,
		};
	},
});
</script>
