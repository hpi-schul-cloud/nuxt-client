<template>
	<div>
		<base-breadcrumb
			:inputs="[
				{
					to: { name: 'news' },
					text: $t('pages.news.title'),
				},
				{
					text: $t('pages.news.new.title'),
				},
			]"
		/>
		<h1 :aria-label="$t('pages.news.new.title')"></h1>
		<form-news @save="create" @cancel="cancelHandler"> </form-news>
	</div>
</template>

<script>
import FormNews from "@components/organisms/FormNews";
import NewsModule from "@/store/news";

export default {
	components: {
		FormNews,
	},
	meta: {
		requiredPermissions: ["NEWS_CREATE"],
	},
	computed: {
		news: () => NewsModule.getNews,
		status: () => NewsModule.getStatus,
		createdNews: () => NewsModule.getCreatedNews,
	},
	methods: {
		getNewsTarget(query, schoolId) {
			if (query.target && query.targetmodel) {
				return { targetId: query.target, targetModel: query.targetmodel };
			} else if (query.context && query.contextId) {
				return { targetId: query.contextId, targetModel: query.context };
			} else {
				return { targetId: schoolId, targetModel: "schools" };
			}
		},
		create: async function (news) {
			try {
				const newsTarget = this.getNewsTarget(
					this.$route.query,
					this.$user.schoolId
				);
				await NewsModule.createNews({
					title: news.title,
					content: news.content,
					displayAt: news.displayAt,
					schoolId: this.$user.schoolId,
					targetId: newsTarget.targetId,
					targetModel: newsTarget.targetModel,
				});
				if (this.status === "completed") {
					this.$toast.success(
						this.$ts("components.organisms.FormNews.success.create")
					);
					await this.$router.push({
						path: `/news/${this.createdNews.id}`,
					});
				}
			} catch (e) {
				console.error(e);
				this.$toast.error(
					this.$ts("components.organisms.FormNews.errors.create")
				);
			}
		},
		async cancelHandler() {
			this.$router.push({
				name: "news",
			});
		},
	},
	head() {
		return {
			title: this.$t("pages.news.new.title"),
		};
	},
};
</script>
