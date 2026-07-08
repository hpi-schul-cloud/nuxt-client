<template>
	<VCard variant="outlined" class="mb-4" data-testid="board-empty-element" tabindex="-1">
		<VCardText class="d-flex">
			<VIcon :icon class="mr-2" />
			<span>{{ title }}</span>
		</VCardText>
	</VCard>
</template>

<script setup lang="ts">
defineProps<{
	icon: string;
	title: string;
}>();
</script>
