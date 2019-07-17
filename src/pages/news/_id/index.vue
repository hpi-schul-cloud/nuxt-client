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
			<!-- eslint-disable-next-line vue/no-v-html -->
			<div v-html="news.content"></div>
			<hr />
			<base-button @click="$router.push({ name: 'news-id-edit' })">
				Artikel bearbeiten
			</base-button>
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
