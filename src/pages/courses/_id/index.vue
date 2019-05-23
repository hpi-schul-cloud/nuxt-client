<template>
	<div v-if="course">
		<section class="section">
			<h5>
				<span>
					<base-link :to="{ name: 'courses' }">Courses</base-link>
				</span>
				<span>/ {{ course.name }}</span>
			</h5>

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
	},
	created(ctx) {
		this.get(this.$route.params.id);
	},
	methods: {
		get(id) {
			this.$store.dispatch("courses/get", id);
		},
	},
};
</script>
