<template>
	<a href="/">
		<img
			v-if="isDesktop"
			src="@/assets/img/logo/logo-image-mono.svg"
			alt="Schulcloud Logo"
		/>
		<img
			v-if="isTablet"
			src="@/assets/img/logo/logo-transparent-mono-48-48.svg"
			alt="Schulcloud Logo"
		/>
	</a>
</template>

<script setup lang="ts">
defineProps({
	isDesktop: {
		type: Boolean,
	},
	isTablet: {
		type: Boolean,
	},
});
</script>
