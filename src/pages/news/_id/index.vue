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
			<i>
				{{ dayjs(news.displayAt).fromNow() }} von {{ news.creator.firstName }}
				{{ news.creator.lastName }}
			</i>
			<h1> {{ news.title }} </h1>

			<!-- eslint-disable-next-line vue/no-v-html -->
			<div v-html="news.content"></div>
			<hr />
			<base-link :to="{ name: 'news-id-edit' }">
				<base-button>
					{{ $t("pages.news._id.index.edit") }}
				</base-button>
			</base-link>
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
	head() {
		return {
			title: (this.news || {}).title || "News",
		};
	},
	data() {
		return {
			dayjs,
		};
	},
	async asyncData({ store, params }) {
		return {
			news: await store.dispatch("news/get", params.id),
		};
	},
};
</script>
