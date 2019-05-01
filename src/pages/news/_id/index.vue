<template>
	<div v-if="news">
		<section class="section">
			<h5>
				<span>
					<base-link :to="{ name: 'news' }">News</base-link>
				</span>
				<span>/ {{ news.title }}</span>
			</h5>
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
