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

			<!-- eslint-disable-next-line vue/no-v-html -->
			<div v-html="news.content"></div>
			<base-button :to="{ name: 'news-id-edit' }">
        <base-icon source="material" icon="edit"/>
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

export default {
	async asyncData({ store, params }) {
		return {
			news: await store.dispatch("news/get", params.id),
		};
	},
	data() {
		return {
			dayjs,
		};
	},
	head() {
		return {
			title: (this.news || {}).title || "News",
		};
	},
};
</script>
