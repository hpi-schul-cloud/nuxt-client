<template>
	<div>
		<floating-fab icon="add" to="/courses/create" />
		<courses-grid :courses="courses"></courses-grid>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import CoursesGrid from "@components/molecules/CoursesGrid";
import FloatingFab from "@components/molecules/FloatingFab";

export default {
	components: {
		CoursesGrid,
		FloatingFab,
	},
	computed: {
		...mapGetters("courses", {
			courses: "list",
		}),
	},
	created(ctx) {
		this.find();
	},
	methods: {
		find() {
			this.$store.dispatch("courses/find");
		},
	},
	head() {
		return {
			title: "Kurse",
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
}
</style>
