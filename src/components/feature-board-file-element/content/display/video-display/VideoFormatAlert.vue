<template>
	<v-alert
		class="mb-0 py-4 rounded-t-0"
		color="info"
		data-testid="board-file-element-alert"
		dense
		icon="$info"
		text
		variant="tonal"
	>
		<div class="black--text">
			Das Videoformat wird von diesem Browser / Betriebssystem nicht
			unterstützt.
		</div>
	</v-alert>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mdiInformation } from "@mdi/js";

export default defineComponent({
	name: "VideoFormatAlert",
	setup() {
		return {
			mdiInformation,
		};
	},
});
</script>
