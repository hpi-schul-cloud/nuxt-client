<template>
	<VCard class="d-flex flex-column news-card" :to="`/news/${newsItem.id}`" :data-testid="`news-card-item-${index}`">
		<VCardTitle class="news-card-title bg-primary-lighten text-wrap" :data-testid="`news-header-${index}`">
			<div class="d-flex align-center">
				<VIcon size="14" class="mr-1" :icon="mdiNewspaperVariantOutline" />
				<span class="text-sm font-weight-regular">{{ fromNowUtc(newsItem.displayAt) }}</span>
				<VChip v-if="newsItem.targetModel === NewsTargetModel.TEAMS" class="ml-auto" size="small" variant="tonal">
					{{ newsItem.target?.name }}
				</VChip>
			</div>
			<h3 class="text-h4 my-1 news-header-truncate" :data-testid="`news-title-${index}`">
				{{ newsItem.title }}
			</h3>
		</VCardTitle>
		<VCardText class="flex-grow-1 pt-3 text-md" :data-testid="`news-content-${index}`">
			<div class="news-content-truncate">
				<RenderHTML :html="newsItem.content" config="richTextNoLinks" />
			</div>
		</VCardText>
	</VCard>
</template>

<script setup lang="ts">
import type { NewsCardItem } from "./news-card.types";
import { fromNowUtc } from "@/utils/date-time.utils";
import { NewsTargetModel } from "@api-server";
import { RenderHTML } from "@feature-render-html";
import { mdiNewspaperVariantOutline } from "@icons/material";

defineProps<{
	newsItem: NewsCardItem;
	index: { type: number; required: true };
}>();
</script>

<style scoped>
.news-card {
	min-width: 312px;
}

.news-card-title {
	color: rgba(var(--v-theme-on-surface)) !important;
}

.news-header-truncate {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	overflow: hidden;
}

.news-content-truncate {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	line-clamp: 3;
	overflow: hidden;
}
</style>
