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
		<form-news @save="create"> </form-news>
	</div>
</template>

<script>
import FormNews from "@components/organisms/FormNews";

import { mapGetters } from "vuex";

export default {
	components: {
		FormNews,
	},
	meta: {
		requiredPermissions: ["NEWS_CREATE"],
	},
	computed: {
		...mapGetters("news", {
			createdNews: "getList",
			status: "getStatus",
		}),
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
				await this.$store.dispatch("news/create", {
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
					this.$router.push({
						name: "news-id",
						params: { id: this.createdNews[0]._id },
					});
				}
			} catch (e) {
				console.error(e);
				this.$toast.error(
					this.$ts("components.organisms.FormNews.errors.create")
				);
			}
		},
	},
	head() {
		return {
			title: this.$t("pages.news.new.title"),
		};
	},
};
</script>
