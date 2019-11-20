<template>
	<div>
		<chip-filter
			:value.sync="activeToggle"
			:options="toggleTags"
			:multiple="false"
		/>
		<!-- <chip-filter
			:value.sync="activeFilters"
			:options="filterTags"
			:multiple="true"
		/> -->
		<floating-fab
			icon="add"
			@click="$router.push({ name: 'courses-create' })"
		/>
		<courses-grid :courses="filteredCourses"></courses-grid>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import CoursesGrid from "@components/molecules/CoursesGrid";
import ChipFilter from "@components/molecules/ChipFilter";
import FloatingFab from "@components/molecules/FloatingFab";

export default {
	components: {
		CoursesGrid,
		ChipFilter,
		FloatingFab,
	},
	data() {
		return {
			toggleTags: ["Aktuell", "Archiviert"],
			filterTags: ["Spanisch", "Deutsch", "Englisch"],
			activeToggle: "Aktuell",
			activeFilters: [],
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
