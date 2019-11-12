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
import { mapGetters } from "vuex";

export default {
	head() {
		return {
			title: (this.news || {}).title || "News",
		};
	},
	computed: {
		...mapGetters("news", {
			news: "current",
		}),
	},
	created(ctx) {
		this.get(this.$route.params.id);
	},
	methods: {
		get(id) {
			this.$store.dispatch("news/get", id);
		},
	},
};
</script>
