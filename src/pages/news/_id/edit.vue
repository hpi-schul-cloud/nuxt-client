<template>
	<div>
		<div v-if="news">
			<base-breadcrumb
				:inputs="[
					{
						to: { name: 'news' },
						text: $t('pages.news.title'),
					},
					{
						to: { name: 'news-id', params: { id: $route.params.id } },
						text: news.title,
					},
					{
						text: $t('pages.news._id.edit.title'),
					},
				]"
			/>
			<h1>{{ $t("pages.news._id.edit.title") }}</h1>

			<form-news
				v-if="news"
				:news="news"
				@save="save"
				@delete="deleteHandler"
				@cancel="cancelHandler"
			>
			</form-news>
		</div>
	</div>
</template>

<script>
import FormNews from "@components/organisms/FormNews";
import NewsModule from "@/store/news";

export default {
	components: {
		FormNews,
	},
	validate({ params }) {
		return /^[a-z0-9]{24}$/.test(params.id);
	},
	computed: {
		news: () => NewsModule.getCurrentNews,
	},
	meta: {
		requiredPermissions: ["NEWS_EDIT"],
	},
	mounted() {
		NewsModule.fetchNews(this.$route.params.id);
	},
	methods: {
		save: async function (newsToPatch) {
			try {
				await NewsModule.patchNews({
					id: this.news.id,
					title: newsToPatch.title,
					content: newsToPatch.content,
					displayAt: newsToPatch.displayAt,
				});
				this.$toast.success(
					this.$ts("components.organisms.FormNews.success.patch")
				);
				await this.$router.push({
					path: `/news/${this.news.id}`,
				});
			} catch (e) {
				console.error(e);
				this.$toast.error(
					this.$ts("components.organisms.FormNews.errors.patch")
				);
			}
		},
		deleteHandler: async function () {
			try {
				await NewsModule.removeNews(this.news.id);
				this.$toast.success(
					this.$ts("components.organisms.FormNews.success.remove")
				);
				this.$router.push({ name: "news" });
			} catch (e) {
				console.error(e);
				this.$toast.error(
					this.$ts("components.organisms.FormNews.errors.remove")
				);
			}
		},
		async cancelHandler() {
			this.$router.push({
				name: "news-id",
				params: { id: this.$route.params.id },
			});
		},
	},
	head() {
		const hasTitle = (this.news || {}).title;
		return {
			title: hasTitle
				? `${(this.news || {}).title} bearbeiten`
				: this.$t("pages.news._id.edit.title"),
		};
	},
};
</script>
