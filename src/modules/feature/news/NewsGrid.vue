<template>
	<div class="news-grid" data-testid="news-section">
		<NewsCard v-for="newsItem in newsItems" :key="newsItem.id" :news-item="newsItem" :data-test-id="dataTestid" />
	</div>
</template>

<script setup lang="ts">
import type { NewsCardItem } from "./news-card.types";
import NewsCard from "./NewsCard.vue";

withDefaults(
	defineProps<{
		newsItems: readonly NewsCardItem[];
		dataTestid?: string;
	}>(),
	{
		dataTestid: undefined,
	}
);
</script>

<style scoped>
.news-grid {
	display: grid;
	gap: 12px;
	grid-template-columns: repeat(auto-fill, minmax(min(420px, 100%), 1fr));
}
</style>
