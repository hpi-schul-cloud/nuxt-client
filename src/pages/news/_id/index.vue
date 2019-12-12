<template>
	<div v-if="news">
		<section class="section">
			<base-breadcrumb
				:inputs="[
					{
						to: { name: 'news' },
						text: 'News',
					},
					{
						to: { name: 'news-id', params: { id: news._id } },
						text: news.title,
					},
				]"
			/>
			<div class="text-sm">
				{{ dayjs(news.displayAt).fromNow() }} von {{ news.creator.firstName }}
				{{ news.creator.lastName }}
			</div>
			<h1> {{ news.title }} </h1>
			<!-- eslint-disable vue/no-v-html -->
			<render-html
				:html="
					`<p class='info'>
				${
					news.targetModel
						? $t('pages.news._id.index.info_with_target', infoVariables)
						: $t('pages.news._id.index.info', infoVariables)
				} </p>
				`
				"
			/>
			<!-- eslint-enable vue/no-v-html -->

			<!-- eslint-disable-next-line vue/no-v-html -->
			<div v-html="news.content"></div>
			<base-button :to="{ name: 'news-id-edit' }">
				<base-icon source="material" icon="edit" />
				{{ $t("pages.news._id.index.edit") }}
			</base-button>
		</section>
	</div>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import "dayjs/locale/de";
dayjs.locale("de");
import RenderHtml from "@components/helpers/RenderHtml";

export default {
	components: {
		RenderHtml,
	},
	validate({ params }) {
		return /^[a-z0-9]{24}$/.test(params.id);
	},
	async asyncData({ store, params }) {
		return {
			news: await store.dispatch("news/get", params.id),
		};
	},
	computed: {
		infoVariables() {
			return {
				relativePublishedDate: dayjs(this.news.displayAt).fromNow(),
				relativeUpdateDate: dayjs(this.news.updatedAt).fromNow(),
				creatorFirstName: this.news.creator.firstName,
				creatorLastName: this.news.creator.lastName,
				updaterFirstName: this.news.updater.firstName,
				updaterLastName: this.news.updater.lastName,
				target: this.targetName,
				targetWithLink: `<base-link to="/${this.news.targetModel}/${this.news.target._id}">${this.targetName}</base-link>`,
				school:
					this.news.schoolId === this.$user.schoolId
						? this.$t("pages.news._id.index.info.your_school", {
								schoolName: this.$user.schoolName,
						  })
						: this.$t("pages.news._id.index.info.other_school", {
								schoolName: this.news.school.name,
						  }),
			};
		},
		targetName() {
			const targetMap = {
				teams: this.$t("pages.news._id.index.target.team"),
				courses: this.$t("pages.news._id.index.target.course"),
				class: this.$t("pages.news._id.index.target.class"),
			};
			return this.news.targetModel
				? targetMap[this.news.targetModel]
				: undefined;
		},
	},
	head() {
		return {
			title: (this.news || {}).title || "News",
		};
	},
};
</script>
<style lang="scss" scoped>
@import "@styles";

.info {
	margin-bottom: var(--space-md);
}
</style>
