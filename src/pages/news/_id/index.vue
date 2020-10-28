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
				{{ fromNow(news.displayAt) }} von {{ news.creator.firstName }}
				{{ news.creator.lastName }}
			</div>
			<h1>{{ news.title }}</h1>

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
import { fromNow } from "@plugins/datetime";

export default {
	validate({ params }) {
		return /^[a-z0-9]{24}$/.test(params.id);
	},
	async asyncData({ store, params }) {
		return {
			news: await store.dispatch("news/get", params.id),
		};
	},
	data() {
		return {
			fromNow,
		};
	},
	head() {
		return {
			title: (this.news || {}).title || "News",
		};
	},
};
</script>
