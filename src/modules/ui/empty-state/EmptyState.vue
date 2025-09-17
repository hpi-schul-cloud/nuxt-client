<template>
	<VEmptyState data-testid="empty-state" class="mt-16">
		<template #media>
			<div aria-hidden="true">
				<slot name="media" />
			</div>
		</template>
		<template #title>
			<p class="text-h2 mt-8" data-testid="empty-state-title">
				{{ title }}
			</p>
		</template>
		<template #text>
			<span class="text-body-1">
				<slot name="text" />
			</span>
		</template>
	</VEmptyState>
</template>

<script setup lang="ts">
defineProps({
	title: {
		type: String,
		required: true,
	},
});
</script>
