<template>
	<VChip :color="color" :prepend-icon="icon" size="small" variant="tonal">
		<div class="chip-content"><slot /></div>
	</VChip>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { IconProps } from "vuetify";

defineProps({
	color: {
		type: String as PropType<"error" | "warning" | "info">,
		required: false,
		default: undefined,
	},
	icon: {
		type: String as PropType<IconProps["icon"]>,
		required: false,
		default: undefined,
	},
});
</script>
<style scoped>
.chip-content {
	color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}
</style>
