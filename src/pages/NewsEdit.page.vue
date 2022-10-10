<template>
	<div v-if="news">
		<default-wireframe
			:headline="$t('pages.news._id.edit.title')"
			:breadcrumbs="[
				{
					to: { name: 'news' },
					text: $t('pages.news.title'),
				},
				{
					to: `/news/${$route.params.id}`,
					text: news.title,
				},
				{
					text: $t('pages.news._id.edit.title'),
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
				>
				</form-news>
			</div>
		</default-wireframe>
	</div>
</template>

<script>
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import FormNews from "@components/organisms/FormNews";
import { newsModule } from "@/store";

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
	meta: {
		requiredPermissions: ["NEWS_EDIT"],
	},
	mounted() {
		newsModule.fetchNews(this.$route.params.id);
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
				await newsModule.removeNews(this.news.id);
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
