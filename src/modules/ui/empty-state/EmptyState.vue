<template>
	<VEmptyState data-testid="empty-state" class="mt-16">
		<template #media>
			<div aria-hidden="true">
				<slot name="media" />
			</div>
		</template>
		<template #title>
			<p class="text-h4 mt-8" data-testid="empty-state-title">
				{{ title }}
			</p>
		</template>
		<template #text>
			<span class="text">
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
<style scoped lang="scss">
.text {
	font-size: var(--text-base-size);
}
</style>
