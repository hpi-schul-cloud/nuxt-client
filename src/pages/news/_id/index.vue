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
			<h1> {{ news.title }} </h1>
			<render-html
				:html="
					`<p class='mb--md'> ${
						news.targetModel
							? $t(
									'pages.news._id.index.info.creator_with_target',
									infoVariables
							  )
							: $t('pages.news._id.index.info.creator', infoVariables)
					} <br/> ${
						news.updatedAt
							? $t('pages.news._id.index.info.updater', infoVariables)
							: ''
					}</p>`
				"
			/>
			<render-html
				:html="
					`<p class='mb--md'>
				 </p>
				`
				"
			/>

			<hr />

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
	async asyncData({ store, params, error }) {
		const news = await store.dispatch("news/get", params.id);
		if (!news) {
			error({
				statusCode: 404,
				message: i18n.t("error.404"),
			});
		}
		return {
			news: news,
		};
	},
	data() {
		return {
			dayjs,
		};
	},
	computed: {
		infoVariables() {
			return {
				relativePublishedDate: dayjs(this.news.displayAt).fromNow(),
				relativeUpdateDate: dayjs(
					this.news.updatedAt || this.news.displayAt
				).fromNow(),
				creatorFirstName: this.news.creator.firstName,
				creatorLastName: this.news.creator.lastName,
				updaterFirstName: (this.news.updater || {}).firstName,
				updaterLastName: (this.news.updater || {}).lastName,
				target: this.targetName,
				targetWithLink: `<base-link to="/${this.news.targetModel}/${
					(this.news.target || {})._id
				}">${this.targetName}</base-link>`,
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
				teams: this.$t("pages.news._id.index.info.target.team"),
				courses: this.$t("pages.news._id.index.info.target.course"),
				class: this.$t("pages.news._id.index.info.target.class"),
			};
			return this.news.targetModel
				? targetMap[this.news.targetModel]
				: undefined;
		},
	},
	head() {
		return {
			title: (this.news || {}).title,
		};
	},
};
</script>
<style lang="scss" scoped>
@import "@styles";
</style>
