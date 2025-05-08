<template>
	<VEmptyState :text="text" data-testid="empty-state" class="mt-16">
		<template #media>
			<div aria-hidden="true">
				<slot name="media" />
			</div>
		</template>
		<template #title>
			<!-- a11y question: should this be h2-tag? -->
			<!-- rename data-testid to empty-state-title -->
			<p class="text-h4 mt-8" data-testid="emptyTaskMessage">
				{{ title }}
			</p>
		</template>
	</VEmptyState>
</template>

<script setup lang="ts">
defineProps({
	title: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		default: "",
	},
});
</script>
