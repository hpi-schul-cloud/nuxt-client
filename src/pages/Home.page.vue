<template>
	<v-row>
		<!--		&lt;!&ndash; GLOBAL_ANNOUNCEMENT &ndash;&gt;-->
		<!--		<v-row>-->
		<!--			<v-col cols="12">-->
		<!--				<v-alert-->
		<!--					v-if="globalAnnouncement"-->
		<!--					type="info"-->
		<!--					class="mb-4"-->
		<!--					border="start"-->
		<!--					elevation="1"-->
		<!--					icon="mdi-bullhorn"-->
		<!--				>-->
		<!--					<div>globalAnnouncement</div>-->
		<!--				</v-alert>-->
		<!--			</v-col>-->
		<!--		</v-row>-->

		<v-col cols="8" class="v-card">
			<v-card class="pa-4 pt-0">
				<Blog
					:loading="blogLoading"
					:blog-feed-list="blogFeed"
					@refetch-blogs="fetchBlogs"
				/>
			</v-card>
		</v-col>

		<v-col cols="4">
			<aside>
				<Login class="pa-0" />
			</aside>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import { Login } from "@feature-login";
import { Blog } from "@ui-blog";
import { envConfigModule } from "@/store";
import { onMounted, ref } from "vue";
import { BlogFeedData, useBlogApi } from "@data-blog";

const { fetchBlogFeedData } = useBlogApi();

// State
const blogFeed = ref<BlogFeedData[]>([]);
const blogLoading = ref<boolean>(true);
const globalAnnouncement = ref<string | null>(null);
const ghostBaseUrl = ref<string>("");

// Simulate config system (replace with real fetch/inject in BCloud app)
async function fetchConfig(key: string): Promise<string | null> {
	// In real implementation, use actual API/config
	const configs: Record<string, string> = {
		GHOST_BASE_URL: envConfigModule.getEnv.GHOST_BASE_URL,
		GLOBAL_ANNOUNCEMENT: "",
	};
	return configs[key] ?? null;
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

// Entry: Fetch blog feed
async function fetchBlogs() {
	blogLoading.value = true;

	try {
		blogFeed.value = await fetchBlogFeedData();
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error(e); //TODO: check what to do best here
		blogFeed.value = [];
	} finally {
		blogLoading.value = false;
	}
}
</script>
