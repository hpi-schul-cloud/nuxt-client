<template>
	<v-alert
		class="mb-0 py-4 rounded-0"
		color="error"
		data-testid="board-file-element-alert"
		dense
		icon="$warning"
		text
		variant="tonal"
	>
		{{ $t("components.cardElement.fileElement.virusDetected") }}
	</v-alert>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "FileContentElementAlert",
	props: {},
	setup() {
		return {};
	},
});
</script>
