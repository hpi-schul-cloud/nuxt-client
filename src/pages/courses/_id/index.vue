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
	async asyncData({ store, params }) {
		return {
			lessons: await store.dispatch("lessons/find", {
				query: {
					courseId: params.id,
				},
			}),
			homeworks: await store.dispatch("homeworks/find", {
				query: {
					courseId: params.id,
				},
			}),
			courseGroups: await store.dispatch("course-groups/find", {
				query: {
					courseId: params.id,
				},
			}),
		};
	},
	computed: {
		...mapGetters("courses", {
			course: "current",
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
	},
	methods: {
		getCourse(id) {
			this.$store.dispatch("courses/get", id);
		},
	},
};
</script>
