<template>
	<v-chip size="small" class="warning-chip py-1" color="warning-lighten-1" variant="flat">
		<v-icon size="small" class="mr-1" color="warning">{{ mdiAlert }}</v-icon>
		<slot />
	</v-chip>
</template>

<script setup lang="ts">
import { mdiAlert } from "@icons/material";
</script>

<style scoped>
.warning-chip {
	width: fit-content;
}
</style>
