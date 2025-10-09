<template>
	<default-wireframe
		:headline="$t('pages.news.new.title')"
		:breadcrumbs="[
			{
				to: '/news',
				title: $t('pages.news.title'),
			},
			{
				title: $t('pages.news.new.title'),
				disabled: true,
			},
		]"
		max-width="short"
	>
		<div>
			<form-news @save="create" @cancel="onCancel" />
		</div>
	</default-wireframe>
</template>

<script>
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { newsModule } from "@/store";
import { buildPageTitle } from "@/utils/pageTitle";
import { notifyError, notifySuccess, useAppStore } from "@data-app";
import { FormNews } from "@feature-news-form";

export default {
	components: {
		DefaultWireframe,
		FormNews,
	},
	computed: {
		news: () => newsModule.getNews,
		status: () => newsModule.getStatus,
		createdNews: () => newsModule.getCreatedNews,
	},
	mounted() {
		document.title = buildPageTitle(this.$t("pages.news.new.title"));
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
				const newsTarget = this.getNewsTarget(this.$route.query, useAppStore().school.id);
				await newsModule.createNews({
					title: news.title,
					content: news.content,
					displayAt: news.displayAt,
					targetId: newsTarget.targetId,
					targetModel: newsTarget.targetModel,
				});
				if (this.status === "completed") {
					notifySuccess(this.$t("components.organisms.FormNews.success.create"));
					await this.$router.push({
						path: `/news/${this.createdNews.id}`,
					});
				}
			} catch {
				notifyError(this.$t("components.organisms.FormNews.errors.create"));
			}
		},
		async onCancel() {
			this.$router.go(-1);
		},
	},
};
</script>
