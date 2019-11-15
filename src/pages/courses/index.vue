<template>
	<div>
		<chip-filter
			:toggle-tags="toggleTags"
			:filter-tags="filterTags"
			:active-toggle.sync="activeToggle"
		/>
		<base-button
			design="hero-cta"
			size="large"
			@click="$router.push({ name: 'courses-create' })"
		>
			<base-icon source="material" icon="add" />
			{{ $t("pages.courses.new.btn_new") }}
		</base-button>
		<courses-grid :courses="filteredCourses"></courses-grid>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import CoursesGrid from "@components/molecules/CoursesGrid";
import ChipFilter from "@components/molecules/ChipFilter";

export default {
	components: {
		CoursesGrid,
		ChipFilter,
	},
	data() {
		return {
			toggleTags: ["Aktuell", "Archiviert"],
			filterTags: ["Spanisch", "Deutsch", "Englisch"],
			activeToggle: "Aktuell",
		};
	},
	head() {
		return {
			title: "Kurse",
		};
	},
	computed: {
		...mapGetters("courses", {
			courses: "list",
		}),
		filteredCourses() {
			if (this.activeToggle === "Aktuell") {
				return this.courses.filter((course) => !course.isArchived);
			} else {
				return this.courses.filter((course) => course.isArchived);
			}
		},
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
