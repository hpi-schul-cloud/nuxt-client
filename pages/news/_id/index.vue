<template>
	<div v-if="news">
		<section class="section">
			<h5>
				<span>
					<nuxt-link :to="{ name: 'news' }">News</nuxt-link>
				</span>
				<span>/ {{ news.title }}</span>
			</h5>
			<div v-html="news.content"></div>
			<hr />
			<button
				class="button is-info"
				@click="$router.push({ name: 'news-id-edit' })"
				>Artikel bearbeiten</button
			>
		</section>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
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
