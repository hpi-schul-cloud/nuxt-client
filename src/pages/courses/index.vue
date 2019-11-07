<template>
	<div>
		<base-button
			design="hero-cta"
			size="large"
			@click="$router.push({ name: 'courses-create' })"
		>
			<base-icon source="material" icon="add" />
			{{ $t("pages.courses.new.btn_new") }}
		</base-button>
		<courses-grid class="courses-grid" :courses="courses" />
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import CoursesGrid from "@components/molecules/CoursesGrid";

export default {
	layout: 'fullwidth',
	head() {
		return {
			title: "Kurse",
		};
	},
	components: {
		CoursesGrid,
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
