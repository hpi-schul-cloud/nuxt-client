<template>
	<LineClamp>
		<v-btn variant="text" size="large" :height="85" :width="125">
			<div class="d-flex flex-column justify-center button-max-width">
				<v-icon size="x-large" class="mx-auto">{{ icon }}</v-icon>
				<span class="subtitle mt-1">{{ label }}</span>
			</div>
		</v-btn>
	</LineClamp>
</template>

<script setup lang="ts">
import LineClamp from "@/modules/ui/board/LineClamp.vue";

defineProps({
	icon: {
		type: String,
		required: true,
	},
	label: {
		type: String,
		required: true,
	},
});
</script>

<style scoped>
/*.subtitle {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}*/

.button-max-width {
	max-width: 100px;
}
</style>
