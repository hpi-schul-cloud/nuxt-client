<template>
  <news-edit-view :current="current" >
  </news-edit-view>
</template>

<script>
import NewsEditView from "@components/organisms/NewsEditView";
import { mapGetters } from "vuex";

export default {
	components: {
    NewsEditView,
	},
	async asyncData({ store, params }) {
    store.dispatch("news/get", params.id);
	},
  computed: {
    ...mapGetters("news", {
      current: "getCurrent",
    }),
  }
};
</script>
