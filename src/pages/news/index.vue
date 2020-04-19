<template>
	<div>
		<fab-floating
			:primary-action="{
				icon: 'add',
				'icon-source': 'material',
				to: '/news/new',
				label: $t('pages.news.new.title'),
			}"
		/>
		<section v-if="news && news.length > 0" class="section">
			<news-card
				v-for="article of news"
				:key="article._id"
				:article="article"
				class="mb--md"
			/>
		</section>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import NewsCard from "@components/molecules/NewsCard";
import FabFloating from "@components/molecules/FabFloating";

export default {
	components: {
		NewsCard,
		FabFloating,
	},
	computed: {
		...mapGetters("news", {
			news: "list",
		}),
	},
	created(ctx) {
		this.find();
	},
	methods: {
		find() {
			this.$store.dispatch("news/find", {
				query: {
					$sort: {
						createdAt: -1,
					},
				},
			});
		},
	},
	head() {
		return {
			title: this.$t("pages.news.title"),
		};
	},
};
</script>
