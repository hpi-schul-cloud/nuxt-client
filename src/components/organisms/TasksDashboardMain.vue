<template>
	<section>
		<div class="border-bottom">
			<v-container>
				<h1 class="h4">
					{{ $t("pages.tasks.title") }}
				</h1>
			</v-container>
			<div class="pb-0 d-flex justify-center">
				<v-tabs v-model="tab" grow class="tabs-max-width">
					<v-tab>
						<v-icon class="tab-icon mr-3">{{ tabOneHeader.icon }}</v-icon>
						<span class="d-none d-sm-inline">{{ tabOneHeader.title }}</span>
					</v-tab>
					<v-tab>
						<v-icon class="tab-icon mr-3">{{ tabTwoHeader.icon }}</v-icon>
						<span class="d-none d-sm-inline">{{ tabTwoHeader.title }}</span>
					</v-tab>
				</v-tabs>
			</div>
		</div>
		<v-container class="v-container mt-5 mb-14">
			<v-custom-autocomplete
				v-if="hasTasks"
				v-model="selectedCourses"
				:items="courses"
				:label="$t('pages.tasks.labels.filter')"
				:no-data-text="$t('pages.tasks.labels.noCoursesAvailable')"
				:disabled="isFilterDisabled"
				@selected-item="filterByCourse"
			/>
			<tasks-dashboard-student v-if="isStudent" :tab.sync="tab" />
			<tasks-dashboard-teacher v-else :tab.sync="tab" />
		</v-container>
	</section>
</template>

<script>
import { mapGetters } from "vuex";
import vCustomAutocomplete from "@components/atoms/vCustomAutocomplete";
import TasksDashboardTeacher from "./TasksDashboardTeacher";
import TasksDashboardStudent from "./TasksDashboardStudent";

export default {
	components: {
		vCustomAutocomplete,
		TasksDashboardStudent,
		TasksDashboardTeacher,
	},
	props: {
		role: {
			type: String,
			required: true,
			validator: (val) => ["student", "teacher"].includes(val),
		},
	},
	data() {
		return {
			selectedCourses: [],
			tab: 0,
		};
	},
	computed: {
		...mapGetters("tasks", {
			status: "getStatus",
			hasNoTasks: "hasNoTasks",
			hasNoOpenTasks: "hasNoOpenTasks",
			hasNoCompletedTasks: "hasNoCompletedTasks",
			courses: "getCourses",
		}),
		isStudent: function () {
			return this.role === "student";
		},
		isFilterDisabled: function () {
			if (this.selectedCourses.length > 0) return false;

			if (this.tab === 0 && this.hasNoOpenTasks) {
				return true;
			} else if (this.tab === 1 && this.hasNoCompletedTasks) {
				return true;
			} else {
				return false;
			}
		},
		hasTasks: function () {
			return !this.hasNoTasks;
		},
		tabOneHeader: function () {
			return {
				icon: "$taskOpenFilled",
				title: this.$t("components.organisms.TasksDashboardMain.tab.open"),
			};
		},
		tabTwoHeader: function () {
			const tabTwo = {};
			if (this.isStudent) {
				tabTwo.icon = "$taskDoneFilled";
				tabTwo.title = this.$t(
					"components.organisms.TasksDashboardMain.tab.completed"
				);
			} else {
				tabTwo.icon = "$taskDraft";
				tabTwo.title = this.$t(
					"components.organisms.TasksDashboardMain.tab.drafts"
				);
			}

			return tabTwo;
		},
	},
	created() {
		this.$store.dispatch("tasks/getAllTasks");
	},
	methods: {
		filterByCourse() {
			this.$store.commit("tasks/setFilter", this.selectedCourses);
		},
	},
};
</script>
<style lang="scss" scoped>
@import "@variables";

.v-container {
	max-width: var(--size-content-width-max);
}

.tabs-max-width {
	max-width: 500px;
}

// even out border
.v-tabs {
	margin-bottom: -2px; // stylelint-disable sh-waqar/declaration-use-variable
	font-family: var(--heading-font-family);
}

.v-tab {
	font-size: var(--text-base-size);
	text-transform: none !important;
	border-bottom: 2px solid rgba(0, 0, 0, 0.12);
}

.tab-icon {
	fill: currentColor;
}

::v-deep .v-slide-group__prev,
::v-deep .v-slide-group__next {
	display: none !important;
}

.border-bottom {
	border-bottom: 2px solid rgba(0, 0, 0, 0.12);
}
</style>
