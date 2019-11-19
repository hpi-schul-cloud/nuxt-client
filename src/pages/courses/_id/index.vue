<template>
	<div v-if="course">
		<section class="section">
			<base-breadcrumb :inputs="breadcrumbs" />
			<h1 class="h2">{{ course.name }}</h1>
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
		...mapGetters("course-groups", {
			courseGroups: "list",
		}),
		breadcrumbs() {
			return [
				{ text: "Kurse", to: { name: "courses" } },
				{
					text: this.course.name,
					to: { name: "courses-id", params: { id: this.course._id } },
				},
			];
		},
	},
	created(ctx) {
		this.getCourse(this.$route.params.id);
		this.getLessons(this.$route.params.id);
		this.getHomeworks(this.$route.params.id);
		this.getCourseGroups(this.$route.params.id);
	},
	methods: {
		getCourse(id) {
			this.$store.dispatch("courses/get", id);
		},
		getLessons(id) {
			this.$store.dispatch("lessons/find", {
				query: {
					courseId: id,
				},
			});
		},
		getHomeworks(id) {
			this.$store.dispatch("homeworks/find", {
				query: {
					courseId: id,
				},
			});
		},
		getCourseGroups(id) {
			this.$store.dispatch("course-groups/find", {
				query: {
					courseId: id,
				},
			});
		},
	},
};
</script>
