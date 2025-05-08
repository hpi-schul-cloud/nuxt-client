<template>
	<div class="mt-16">
		<VEmptyState :text="text" data-testid="empty-state">
			<template #title>
				<!-- a11y question: should this be h2-tag? -->
				<p class="text-h4">
					{{ title }}
				</p>
			</template>
			<template #media>
				<div aria-hidden="true">
					<slot name="media" />
				</div>
			</template>
		</VEmptyState>
	</div>
</template>

<script setup lang="ts">
defineProps({
	title: {
		type: String,
		default: "",
	},
	text: {
		type: String,
		default: "",
	},
});
</script>
