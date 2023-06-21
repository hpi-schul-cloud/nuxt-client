<template>
	<v-alert
		class="mb-0 rounded-0"
		data-testid="board-file-element-alert"
		dense
		icon="$error"
		text
		type="error"
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
