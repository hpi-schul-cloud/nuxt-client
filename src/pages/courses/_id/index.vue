<template>
	<div v-if="course">
		<section class="section">
			<!-- <base-breadcrumb :inputs="breadcrumbs" /> -->
			<h1 class="h2">{{ course.name }}</h1>
			<p>Amount of homeworks found: {{ homeworks.length }}</p>
			<div v-for="(homework, index) in homeworks" :key="index">
				{{ homework.name }}
			</div>
			<p>Amount of lessons found: {{ lessons.length }}</p>
		</section>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	computed: {
		...mapGetters("courses", {
			course: "current",
		}),
		...mapGetters("lessons", {
			lessons: "list",
		}),
		...mapGetters("homeworks", {
			homeworks: "list",
		}),
		// breadcrumbs() {
		// 	return [
		// 		{ text: "Kurse", to: { name: "courses" } },
		// 		{
		// 			text: this.course.name,
		// 			to: { name: "courses-id", params: { id: this.course._id } },
		// 		},
		// 	];
		// },
	},
	created(ctx) {
		this.getCourse(this.$route.params.id);
		this.getCourseContent(this.$route.params.id);
	},
	methods: {
		getCourse(id) {
			this.$store.dispatch("courses/get", id);
		},
		getCourseContent(id) {
			this.$store.dispatch("homeworks/find", {
				query: {
					courseId: id,
				},
			});
			this.$store.dispatch("lessons/find", {
				query: {
					courseId: id,
				},
			});
		},
	},
};
</script>
