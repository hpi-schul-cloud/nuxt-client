<template>
	<div>
		<base-breadcrumb :inputs="breadcrumbs" />
		<h1 class="mb--md h3">
			{{ $t("pages.courses.index.title") }}
		</h1>

		<chip-filter :value.sync="activeToggle" :options="toggleTags" />
		<fab-floating
			:primary-action="{
				icon: 'add',
				'icon-source': 'material',
				to: '/courses/new',
				label: $t('pages.courses.new.btn_new'),
			}"
		/>
		<courses-grid :courses="filteredCourses"></courses-grid>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import CoursesGrid from "@components/molecules/CoursesGrid";
import ChipFilter from "@components/molecules/ChipFilter";
import FabFloating from "@components/molecules/FabFloating";

export default {
	layout: "loggedInFull",
	components: {
		CoursesGrid,
		ChipFilter,
		FabFloating,
	},
	data() {
		return {
			toggleTags: [
				this.$t("pages.courses.index.courses.active"),
				this.$t("pages.courses.index.courses.archived"),
			],
			activeToggle: this.$t("pages.courses.index.courses.active"),
			breadcrumbs: [
				{
					text: this.$t("pages.courses.index.title"),
					icon: { source: "fa", icon: "graduation-cap" },
				},
			],
		};
	},
	computed: {
		...mapGetters("courses", {
			courses: "list",
		}),
		filteredCourses() {
			return this.courses.filter((course) =>
				this.activeToggle === this.$t("pages.courses.index.courses.active")
					? !course.isArchived
					: course.isArchived
			);
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
