<template>
	<v-btn variant="text" size="large" :height="85" :width="125">
		<span class="d-flex flex-column justify-center button-max-width">
			<span>
				<v-icon size="x-large">{{ icon }}</v-icon>
			</span>
			<span class="subtitle mt-1">{{ $t(label) }}</span>
		</span>
	</v-btn>
</template>

<script setup lang="ts">
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
