<template>
	<Transition :name="variant">
		<slot />
	</Transition>
</template>

<script setup lang="ts">
defineProps<{
	variant?: "expand" | "fade" | "slide-down" | "scale";
}>();
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
	transition:
		opacity 0.2s ease,
		transform 0.2s ease,
		max-height 0.2s ease;
	max-height: 80px;
	overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
	opacity: 0;
	transform: translateY(-8px);
	max-height: 0;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
	transition:
		opacity 0.2s ease,
		transform 0.2s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
	opacity: 0;
	transform: translateY(-8px);
}

.scale-enter-active,
.scale-leave-active {
	transition:
		opacity 0.15s ease,
		transform 0.15s ease;
}
.scale-enter-from,
.scale-leave-to {
	opacity: 0;
	transform: scale(0.95);
}
</style>
