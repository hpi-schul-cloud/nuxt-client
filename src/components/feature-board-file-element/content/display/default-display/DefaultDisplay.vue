<template>
	<v-list-item
		class="grey lighten-3 px-2 rounded-t-sm"
		data-testid="board-file-element-display"
		inactive
		:ripple="false"
	>
		<template v-slot:prepend>
			<v-icon
				class="grey--text"
				data-testid="board-file-element-display-file-icon"
				large
				>{{ mdiFileDocumentOutline }}</v-icon
			>
		</template>

		<span
			class="subtitle-1 d-inline-block text-truncate"
			data-testid="board-file-element-display-file-name"
			>{{ name }}</span
		>
	</v-list-item>
</template>

<script lang="ts">
import { mdiFileDocumentOutline } from "@mdi/js";
import { defineComponent } from "vue";

export default defineComponent({
	name: "DefaultDisplay",
	props: {
		name: { type: String, required: true },
	},
	setup() {
		return {
			mdiFileDocumentOutline,
		};
	},
});
</script>
