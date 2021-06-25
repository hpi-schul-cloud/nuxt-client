<template>
  <div>
	  <news-edit-view :current="current" news-path="news-id"> </news-edit-view>
  </div>
</template>

<script>
import NewsEditView from "@components/organisms/NewsEditView";
import { mapGetters } from "vuex";

export default {
	components: {
		NewsEditView,
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
