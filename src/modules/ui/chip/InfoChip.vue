<template>
	<v-chip size="small" class="info-chip py-1 bg-blue-lighten-5" variant="flat">
		<v-icon size="small" class="mr-1" color="info">{{ mdiInformation }}</v-icon>
		<slot />
	</v-chip>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mdiInformation } from "@mdi/js";

export default defineComponent({
	name: "InfoChip",
	setup() {
		return {
			mdiInformation,
		};
	},
});
</script>

<style scoped>
.info-chip {
	width: fit-content;
}
</style>
