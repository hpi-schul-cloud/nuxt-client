<template>
	<div data-testid="board-empty-element" tabindex="-1">
		<VCardText class="d-flex">
			<VIcon :icon class="mr-2" />
			<span>{{ title }}</span>
		</VCardText>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	icon: string;
	title: string;
}>();
</script>
