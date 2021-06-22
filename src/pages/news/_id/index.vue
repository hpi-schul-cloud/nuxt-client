<template>
  <news-detail-view :current="current" >
  </news-detail-view>
</template>

<script>
import NewsDetailView from "@components/organisms/NewsDetailView";
import { mapGetters } from "vuex";

export default {
  components: {
    NewsDetailView,
  },
  async asyncData({ store, params }) {
    store.dispatch("news/get", params.id);
  },
  computed: {
    ...mapGetters("news", {
      current: "getCurrent",
    }),
  },
};
</script>
