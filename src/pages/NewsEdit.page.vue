<template>
	<div v-if="news">
		<default-wireframe
			:headline="$t('pages.news.edit.title.default')"
			:breadcrumbs="[
				{
					to: '/news',
					title: $t('pages.news.title'),
				},
				{
					to: `/news/${$route.params.id}`,
					title: news.title,
				},
				{
					title: $t('pages.news.edit.title.default'),
					disabled: true,
				},
			]"
			:full-width="false"
		>
			<div>
				<form-news
					v-if="news"
					:news="news"
					@save="save"
					@delete="deleteHandler"
					@cancel="cancelHandler"
				/>
			</div>
		</default-wireframe>
	</div>
</template>

<script>
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import FormNews from "@/components/organisms/FormNews";
import { newsModule, notifierModule } from "@/store";
import { buildPageTitle } from "@/utils/pageTitle";

export default {
	components: {
		DefaultWireframe,
		FormNews,
	},
	validate({ params }) {
		return /^[a-z0-9]{24}$/.test(params.id);
	},
	computed: {
		news: () => newsModule.getCurrentNews,
	},
	async mounted() {
		document.title = buildPageTitle(this.$t("pages.news.edit.title.default"));

		await newsModule.fetchNews(this.$route.params.id);
		const newsTitle = this.news?.title;
		if (newsTitle) {
			document.title = buildPageTitle(
				this.$t("pages.news.edit.title", {
					title: newsTitle,
				})
			);
		}
	},
	methods: {
		save: async function (newsToPatch) {
			try {
				await newsModule.patchNews({
					id: this.news.id,
					title: newsToPatch.title,
					content: newsToPatch.content,
					displayAt: newsToPatch.displayAt,
				});
				notifierModule.show({
					text: this.$t("components.organisms.FormNews.success.patch"),
					status: "success",
					timeout: 10000,
				});
				await this.$router.push({
					path: `/news/${this.news.id}`,
				});
			} catch (e) {
				notifierModule.show({
					text: this.$t("components.organisms.FormNews.errors.patch"),
					status: "error",
					timeout: 10000,
				});
			}
		},
		deleteHandler: async function () {
			try {
				await newsModule.removeNews(this.news.id);
				notifierModule.show({
					text: this.$t("components.organisms.FormNews.success.remove"),
					status: "success",
					timeout: 10000,
				});
				this.$router.push({ name: "news" });
			} catch (e) {
				notifierModule.show({
					text: this.$t("components.organisms.FormNews.errors.remove"),
					status: "error",
					timeout: 10000,
				});
			}
		},
		async cancelHandler() {
			this.$router.push({
				name: "news-id",
				params: { id: this.$route.params.id },
			});
		},
	},
};
</script>
