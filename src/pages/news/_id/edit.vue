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

			<form-news v-if="news" :news="news" @save="save"> </form-news>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import FormNews from "@components/organisms/FormNews";

export default {
	components: {
		FormNews,
	},
	validate({ params }) {
		return /^[a-z0-9]{24}$/.test(params.id);
	},
	// async asyncData({ store, params }) {
	// 	// TODO wrong use of store (not so bad)
	// 	return {
	// 		news: await store.dispatch("news/get", params.id),
	// 	};
	// },
	computed: {
		...mapGetters("news", {
			news: "getCurrent",
		}),
	},
	meta: {
		requiredPermissions: ["NEWS_EDIT"],
	},
	mounted() {
		this.$store.dispatch("news/get", this.$route.params.id);
	},
	methods: {
		save: async function (news) {
			try {
				await this.$store.dispatch("news/patch", [
					this.$route.params.id,
					{
						title: news.title,
						content: news.content,
						displayAt: news.publishDate,
					},
				]);
				this.$toast.success(
					this.$ts("components.organisms.FormNews.success.patch")
				);
				this.$router.push({
					name: "news-id",
					params: { id: this.$route.params.id },
				});
			} catch (e) {
				console.error(e);
				this.$toast.error(
					this.$ts("components.organisms.FormNews.errors.patch")
				);
			}
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
