<template>
	<div class="news-grid" data-testid="news-section">
		<NewsCard v-for="(newsItem, index) in newsItems" :key="newsItem.id" :news-item="newsItem" :index />
	</div>
</template>

<script setup lang="ts">
import type { NewsCardItem } from "./news-card.types";
import NewsCard from "./NewsCard.vue";

defineProps<{
	newsItems: readonly NewsCardItem[];
}>();
</script>

<style scoped>
.news-grid {
	display: grid;
	gap: 12px;
	grid-template-columns: repeat(auto-fill, minmax(min(420px, 100%), 1fr));
}
</style>
