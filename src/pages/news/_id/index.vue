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
			<!-- eslint-disable-next-line vue/no-v-html -->
			<div v-html="news.content"></div>
			<hr />
			<base-link :to="{ name: 'news-id-edit' }">
				<base-button>
					Artikel bearbeiten
				</base-button>
			</base-link>
		</section>
	</div>
</template>

<script>
export default {
	head() {
		return {
			title: (this.news || {}).title || "News",
		};
	},
	async asyncData({ store, params }) {
		return {
			news: await store.dispatch("news/get", params.id),
		};
	},
};
</script>
