<template>
	<!-- BLOGS -->
	<div>
		<v-row>
			<v-col cols="12">
				<h2 class="h3 section-title text-center">
					{{ $t("home.headline.dBildungscloudBlog") }}
				</h2>
			</v-col>
		</v-row>

		<v-row class="blog-cards" justify="center">
			<!-- Loading spinner -->
			<v-col v-if="loading" cols="12" class="text-center">
				<v-progress-circular
					indeterminate
					color="primary"
					class="load-icon spinner"
					size="25"
				/>
			</v-col>

			<!-- Blog Cards rendered if blogFeed is loaded and not empty -->
			<template v-else>
				<v-row
					v-for="(article, i) in props.blogFeedList"
					:key="i"
					class="pa-1 ma-3 max-w-40"
				>
					<a
						:href="article.redirectUrl"
						class="blog-card-wrapper"
						target="_blank"
						rel="noopener"
					>
						<v-card class="blog-card" hover>
							<v-img
								v-if="article.image && article.image.url"
								:src="article.image.url"
								:alt="article.image.alt"
								class="thumbnail"
								height="180"
								cover
							/>
							<v-card-title class="heading d-flex flex-column align-start">
								<div class="title">{{ article.title }}</div>
								<small class="pub-date text-muted">{{ article.pubDate }}</small>
							</v-card-title>
							<v-card-text>
								<div class="description text-dark">
									<!-- TODO: use{{ truncatePure(stripHTMLTags(article.description), 200) }}-->
									{{ truncatePure(article.description, 200) }}
								</div>
							</v-card-text>
							<v-card-actions>
								<span class="open-link">{{ $t("home.link.openArticle") }}</span>
							</v-card-actions>
						</v-card>
					</a>
				</v-row>
				<!-- Placeholder when no blogs loaded -->
				<v-col
					v-if="!props.loading && props.blogFeedList.length === 0"
					cols="12"
					class="text-center"
				>
					<img
						:src="getAssetPath('/images/repair.png')"
						width="350"
						class="mb-1"
					/>
					<p class="text-muted">
						{{ $t("global.text.errorWhileLoadingPage") }}
					</p>
					<v-btn
						color="primary"
						class="mt-2"
						@click="() => emit('refetchBlogs')"
					>
						{{ $t("global.button.tryAgain") }}
					</v-btn>
				</v-col>
			</template>
		</v-row>
	</div>
</template>

<script setup lang="ts">
import { BlogFeedDataResponse } from "@/serverApi/v3";

const props = defineProps<{
	loading: boolean;
	blogFeedList: BlogFeedDataResponse[];
}>();

const emit = defineEmits<{
	(e: "refetchBlogs"): void;
}>();

// Util: Simulate getAssetPath as in Handlebars helper
function getAssetPath(path: string): string {
	// This would be replaced with actual public asset path logic if needed
	return path;
}

// Util: Truncate pure text (Handlebars helper port)
function truncatePure(text: string, length: number): string {
	if (!text) return "";
	if (text.length <= length) return text;
	const subString = text.substr(0, length - 1);
	return `${subString}...`;
}
</script>

<style scoped>
.blog-cards {
	margin-top: 24px;
}

.blog-card-wrapper {
	text-decoration: none;
	color: inherit;
	display: block;
	height: 100%;
}

.blog-card {
	transition: box-shadow 0.2s;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.thumbnail {
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
	object-fit: cover;
	width: 100%;
}

.heading {
	font-size: 1.1rem;
	font-weight: 600;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

.title {
	font-size: 1.06rem;
	font-weight: 600;
}

.pub-date {
	font-size: 0.85rem;
	color: #888;
}

.description {
	margin-top: 8px;
	min-height: 48px;
}

.open-link {
	color: #1976d2;
	font-size: 0.95rem;
	font-weight: 500;
}

.load-icon.spinner {
	font-size: 25px;
}

.section-title {
	margin: 28px 0 14px 0;
}
</style>
