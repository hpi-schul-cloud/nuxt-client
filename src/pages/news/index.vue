<template>
	<div>
		<base-button
			class="create-news-btn"
			design="primary"
			@click="$router.push({ name: 'news-new' })"
		>
			Artikel anlegen
		</base-button>

		<div class="view-toggles">
			<!-- TODO: Find correct Icons! and show correct one on active -->
			<base-button design="primary icon text" @click="toDisplayStyle('grid')">
				<base-icon source="material" icon="view_column" fill="gray" />
			</base-button>
			<base-button design="primary icon text" @click="toDisplayStyle('list')">
				<!-- TODO: Change for correct icons -->
				<base-icon
					v-if="isList"
					source="material"
					icon="view_list"
					fill="gray"
				/>
				<base-icon v-else source="material" icon="list" fill="gray" />
			</base-button>
		</div>
		<section :class="{ 'grid-container': !isList, list: isList }">
			<news-card
				v-for="article of news"
				:id="article._id"
				:key="article._id"
				:category="article.category"
				:title="article.title"
				:created-at="article.createdAt"
				:created-by="article.creator.firstName + ' ' + article.creator.lastName"
				:picture="article.picture"
				:event-date="article.eventDate"
				:is-landscape="isList"
				>{{ article.content }}</news-card
			>

		</section>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import NewsCard from "@components/molecules/NewsCard";

export default {
	components: {
		NewsCard,
	},
	data: function() {
		return {
			isList: false,
		};
	},
	head() {
		return {
			title: "News",
		};
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
		toDisplayStyle(newStyle) {
			if (newStyle == "list") {
				this.isList = true;
			}
			if (newStyle == "grid") {
				this.isList = false;
			}
		},
	},
};
</script>
<style lang="scss" scoped>
@import "@styles";
.grid-container {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
	grid-gap: var(--space-lg);
	align-items: flex-start;
	justify-items: center;
	width: 100%;
	padding: var(--space-md);
}
.view-toggles {
	display: none;

	@include breakpoint(tablet) {
		display: inline;
		float: right;
	}
}
.list {
	display: grid;
	grid-template-rows: auto;
	grid-template-columns: 1fr;
	grid-gap: var(--space-md);
	width: 100%;
	padding: var(--space-md);
}
.create-news-btn {
	margin-left: var(--space-md);
}
</style>
