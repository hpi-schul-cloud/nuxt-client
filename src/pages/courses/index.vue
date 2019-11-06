<template>
	<div>
		<section class="section">
			<courses-grid :courses="courses" />
		</section>
		<section class="section bottom">
			<base-button
				design="primary"
				@click="$router.push({ name: 'courses-create' })"
			>
				Neuen Kurs erstellen
			</base-button>
		</section>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import CoursesGrid from "@components/molecules/CoursesGrid";

export default {
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
</style>
