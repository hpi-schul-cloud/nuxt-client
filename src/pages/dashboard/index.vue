<template>
	<div>
		<courses-grid :courses="filteredCourses"></courses-grid>

		<section>
			<user-has-role :role="STUDENT"> Homework Stats Student </user-has-role>
			<user-has-role :role="TEACHER"> Homework Stats Teacher </user-has-role>
		</section>

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
import CoursesGrid from "@components/molecules/CoursesGrid";
import NewsCard from "@components/molecules/NewsCard";
import UserHasRole from "@components/helpers/UserHasRole";
export default {
	layout: "loggedInFull",
	components: {
		CoursesGrid,
		NewsCard,
		UserHasRole,
	},
	data() {
		return {
			breadcrumbs: [
				{
					text: this.$t("pages.dashboard.index.title"),
					icon: { source: "fa", icon: "home-cap" },
				},
			],
		};
	},
	computed: {
		...mapGetters("courses", {
			courses: "list",
		}),
		...mapGetters("news", {
			news: "list",
		}),
		filteredCourses() {
			return this.courses.filter((course) => course.isArchived === false);
		},
	},
	created(ctx) {
		this.find();
	},
	methods: {
		find() {
			this.$store.dispatch("courses/find");
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
			title: this.$t("global.sidebar.dashboard"),
		};
	},
};
</script>
<style lang="scss" scoped>
@import "@variables";

.bottom {
	float: left;
	margin-top: var(--space-xl);
	margin-left: var(--space-xl-3);
}

.courses-grid {
	margin-top: var(--space-xl);
	margin-left: 0;
}
</style>
