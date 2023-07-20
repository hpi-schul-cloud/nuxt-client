<template>
	<v-list-item
		class="grey lighten-3 px-2 rounded-t-sm"
		data-testid="board-submission-element-display"
		inactive
		:ripple="false"
	>
		<v-list-item-icon class="my-2 mr-2">
			<v-icon
				class="grey--text"
				data-testid="board-submission-element-display-icon"
				large
				>{{ mdiClipboardClockOutline }}</v-icon
			>
		</v-list-item-icon>

		<v-list-item-content>
			<span
				class="subtitle-1 d-inline-block text-truncate"
				data-testid="board-submission-element-display-content"
				>{{ $t("components.cardElement.submissionElement") }}</span
			>
		</v-list-item-content>
	</v-list-item>
</template>

<script lang="ts">
import { mdiClipboardClockOutline } from "@mdi/js";
import { defineComponent } from "vue";

export default defineComponent({
	name: "SubmissionContentElementDisplay",
	setup() {
		return {
			mdiClipboardClockOutline,
		};
	},
});
</script>
