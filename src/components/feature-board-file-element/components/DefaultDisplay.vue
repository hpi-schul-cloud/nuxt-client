<template>
	<v-card-item>
		<v-icon
			class="grey--text"
			data-testid="board-file-element-display-file-icon"
			large
			>{{ mdiFileDocumentOutline }}</v-icon
		>
		<v-card-subtitle data-testid="board-file-element-display-file-name">{{
			name
		}}</v-card-subtitle>
	</v-card-item>
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
