<template>
	<default-wireframe
		:headline="$t('pages.news.new.title')"
		:breadcrumbs="[
			{
				to: '/news',
				text: $t('pages.news.title'),
			},
			{
				text: $t('pages.news.new.title'),
				disabled: true,
			},
		]"
		:full-width="false"
	>
		<div>
			<form-news @save="create" @cancel="cancelHandler"> </form-news>
		</div>
	</default-wireframe>
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
	meta: {
		requiredPermissions: ["NEWS_CREATE"],
	},
	computed: {
		news: () => newsModule.getNews,
		status: () => newsModule.getStatus,
		createdNews: () => newsModule.getCreatedNews,
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
				await newsModule.createNews({
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
