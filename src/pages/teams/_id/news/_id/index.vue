<template>
	<news-detail-view :current="current" news-path="news-id"> </news-detail-view>
</template>

<script>
import NewsDetailView from "@components/organisms/NewsDetailView";
import { mapGetters } from "vuex";

export default {
  components: {
		NewsDetailView,
	},
	async asyncData({ store, params }) {
		await store.dispatch("news/get", params.id);
	},
	computed: {
		...mapGetters("news", {
			current: "getCurrent",
		}),
	},

};
</script>
