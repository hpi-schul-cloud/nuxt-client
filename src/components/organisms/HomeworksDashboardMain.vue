<template>
	<section>
		<v-container v-if="status === 'pending'">
			<h1 class="h4">
				<v-skeleton-loader type="heading" max-width="75%" />
			</h1>
			<v-skeleton-loader type="text" />
		</v-container>
		<template v-else>
			<div class="border-bottom">
				<v-container>
					<h1 class="h4">
						{{ $t("pages.homeworks.title") }}
					</h1>
				</v-container>
				<div v-if="isStudent" class="pb-0 d-flex justify-center">
					<v-tabs v-model="tab" grow class="tabs-max-width">
						<v-tab>
							<v-icon class="tab-icon mr-3">$taskOpenFilled</v-icon>
							<span class="d-none d-sm-inline">{{
								$t("components.organisms.HomeworksDashboardMain.tab.open")
							}}</span>
						</v-tab>
						<v-tab>
							<v-icon class="tab-icon mr-3">$taskDoneFilled</v-icon>
							<span class="d-none d-sm-inline">{{
								$t("components.organisms.HomeworksDashboardMain.tab.completed")
							}}</span>
						</v-tab>
					</v-tabs>
				</div>
			</div>
		</template>
		<v-container class="v-container mt-5 mb-14">
			<v-autocomplete
				v-if="!hasNoHomeworks"
				v-model="selectedCourses"
				:items="availableCourses"
				small-chips
				deletable-chips
				:label="$t('pages.homeworks.labels.filter')"
				:no-data-text="$t('pages.homeworks.labels.noCoursesAvailable')"
				multiple
				clearable
				solo
				rounded
				:menu-props="{ closeOnContentClick: false }"
				:disabled="isFilterDisabled"
				@change="filterByCourse"
			/>
			<v-custom-empty-state
				v-if="showEmptyStateForTeacher"
				:image="image"
				:title="$t('pages.homeworks.teacher.emptyState.title')"
				:subtitle="$t('pages.homeworks.teacher.emptyState.subtitle')"
				class="mt-16"
			/>
			<homeworks-dashboard-student v-else-if="isStudent" :tab="tab" />
			<homeworks-dashboard-teacher v-else />
		</v-container>
	</section>
</template>

<script>
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import tasksEmptyState from "@assets/img/empty-state/Task_Empty_State.svg";
import HomeworksDashboardTeacher from "./HomeworksDashboardTeacher";
import HomeworksDashboardStudent from "./HomeworksDashboardStudent";
import { mapGetters } from "vuex";

export default {
	components: {
		HomeworksDashboardStudent,
		HomeworksDashboardTeacher,
		vCustomEmptyState,
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
			image: tasksEmptyState,
			selectedCourses: [],
			tab: 0,
		};
	},
	computed: {
		...mapGetters("homeworks", {
			status: "getStatus",
			hasNoHomeworks: "hasNoHomeworks",
			hasOpenHomeworks: "hasOpenHomeworks",
			hasCompletedHomeworks: "hasCompletedHomeworks",
			getCourses: "getCourses",
			getCoursesOpen: "getCoursesOpen",
			getCoursesCompleted: "getCoursesCompleted",
		}),
		isStudent: function () {
			return this.role === "student";
		},
		showEmptyStateForTeacher: function () {
			return !this.isStudent && this.hasNoHomeworks;
		},
		availableCourses: function () {
			if (this.role === "teacher") {
				return this.getCourses;
			} else if (this.tab === 0) {
				return this.getCoursesOpen;
			} else {
				return this.getCoursesCompleted;
			}
		},
		isFilterDisabled: function () {
			if (this.tab === 0 && !this.hasOpenHomeworks) {
				return true;
			} else if (this.tab === 1 && !this.hasCompletedHomeworks) {
				return true;
			} else {
				return false;
			}
		},
	},
	created() {
		this.$store.dispatch("homeworks/getAllHomeworks");
	},
	methods: {
		filterByCourse() {
			this.$store.commit("homeworks/setFilter", this.selectedCourses);
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
