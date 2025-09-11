<template>
	<v-container>
		<v-row justify="center">
			<v-col cols="12" md="8">
				<Login />
			</v-col>
		</v-row>

		<!-- GLOBAL_ANNOUNCEMENT -->
		<v-row>
			<v-col cols="12">
				<v-alert
					v-if="globalAnnouncement"
					type="info"
					class="mb-4"
					border="start"
					elevation="1"
					icon="mdi-bullhorn"
				>
					<div>globalAnnouncement</div>
				</v-alert>
			</v-col>
		</v-row>

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
				<v-col
					v-for="(article, i) in blogFeed"
					:key="i"
					cols="12"
					md="6"
					lg="4"
					class="mb-3"
				>
					<a
						:href="article.url"
						class="blog-card-wrapper"
						target="_blank"
						rel="noopener"
					>
						<v-card class="blog-card" hover>
							<v-img
								v-if="article.img && article.img.src"
								:src="article.img.src"
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
				</v-col>
				<!-- Placeholder when no blogs loaded -->
				<v-col
					v-if="!loading && (!blogFeed || blogFeed.length === 0)"
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
					<v-btn color="primary" class="mt-2" @click="fetchBlogs">
						{{ $t("global.button.tryAgain") }}
					</v-btn>
				</v-col>
			</template>
		</v-row>

		<v-row justify="center">
			<v-col cols="12" class="text-center mt-3">
				<v-btn
					:href="ghostBaseUrl"
					target="scblog"
					color="primary"
					variant="text"
				>
					{{ $t("home.link.moreArticles") }}
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import Login from "@/modules/feature/login/login.vue";
import { envConfigModule } from "@/store";
import { logger } from "@util-logger";
import { BlogFeedData, useBlogApi } from "@data-blog";

//import { stripHtml } from "string-strip-html";
import { onMounted, ref } from "vue";

// Get translation (for demonstration; actual projects use i18n plugin)
declare const $t: (s: string) => string;

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

// State
const blogFeed = ref<BlogFeedData[]>([]);
const loading = ref<boolean>(false);
const globalAnnouncement = ref<string | null>(null);
const ghostBaseUrl = ref<string>("");

const blogApi = useBlogApi();

// Simulate config system (replace with real fetch/inject in BCloud app)
async function fetchConfig(key: string): Promise<string | null> {
	// In real implementation, use actual API/config
	const configs: Record<string, string> = {
		GHOST_BASE_URL: envConfigModule.getEnv.GHOST_BASE_URL,
		GLOBAL_ANNOUNCEMENT: "",
	};
	return configs[key] ?? null;
}

// Entry: Fetch blog feed
async function fetchBlogs() {
	loading.value = true;

	try {
		const blogFeedData = await blogApi.fetchBlogFeedData();
		blogFeed.value = blogFeedData;
	} catch (e) {
		logger.info(e); //TODO: check what to do best here
		blogFeed.value = [];
	} finally {
		loading.value = false;
	}
}

// On mount: load config, blogs, etc.
onMounted(async () => {
	ghostBaseUrl.value =
		(await fetchConfig("GHOST_BASE_URL")) ?? "https://blog.example.org/";
	const announcement = await fetchConfig("GLOBAL_ANNOUNCEMENT");
	globalAnnouncement.value =
		announcement && announcement.trim().length > 0 ? announcement : null;
	await fetchBlogs();
});
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
