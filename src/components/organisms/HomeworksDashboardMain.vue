<template>
	<section>
		<section>
			<template v-if="status === 'pending'">
				<h1 class="h4 ml-10">
					<v-skeleton-loader type="heading" max-width="40%" />
				</h1>
				<v-container class="v-container">
					<v-skeleton-loader type="text" />
				</v-container>
			</template>

			<template v-else>
				<div v-if="isListFilled" class="border-bottom">
					<h1 class="h4 ml-10">
						{{ $t("pages.homeworks.title") }}
					</h1>

					<v-container v-if="showTabs" class="tabs-max-width pb-0">
						<v-tabs v-model="tab" grow @change="updateFilter">
							<v-tab>
								<v-icon class="tab-icon mr-3">$taskOpenFilled</v-icon>
								{{ $t("components.organisms.HomeworksDashboardMain.tab.open") }}
							</v-tab>
							<v-tab>
								<v-icon class="tab-icon mr-3">$taskDoneFilled</v-icon>
								{{
									$t(
										"components.organisms.HomeworksDashboardMain.tab.completed"
									)
								}}
							</v-tab>
						</v-tabs>
					</v-container>
				</div>
			</template>
		</section>

		<v-container class="v-container mt-5">
			<v-autocomplete
				v-if="isListFilled"
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
				v-if="isListEmpty"
				:image="image"
				:title="emptyStateTitle"
				:subtitle="emptyStateSubtitle"
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
			isFilterDisabled: false,
		};
	},
	computed: {
		...mapGetters("homeworks", {
			status: "getStatus",
			isListFilled: "isListFilled",
			isListEmpty: "isListEmpty",
			hasOpenHomeworks: "hasOpenHomeworks",
			hasCompletedHomeworks: "hasCompletedHomeworks",
			getCoursesOpen: "getCoursesOpen",
			getCoursesCompleted: "getCoursesCompleted",
		}),
		isStudent: function () {
			return this.role === "student";
		},
		emptyStateTitle: function () {
			// TODO: remove if wording stays the same
			return this.isStudent
				? this.$t("pages.homeworks.student.emptyState.title")
				: this.$t("pages.homeworks.teacher.emptyState.title");
		},
		emptyStateSubtitle: function () {
			return this.isStudent
				? this.$t("pages.homeworks.student.emptyState.subtitle")
				: this.$t("pages.homeworks.teacher.emptyState.subtitle");
		},
		showTabs: function () {
			return this.isStudent && this.isListFilled;
		},
		availableCourses: function () {
			if (this.tab === 0) {
				return this.getCoursesOpen;
			} else return this.getCoursesCompleted;
		},
	},
	mounted() {
		this.$store.dispatch("homeworks/getHomeworksDashboard");
	},
	methods: {
		filterByCourse() {
			this.$store.commit("homeworks/setFilter", this.selectedCourses);
		},
		updateFilter(tab) {
			if (tab === 0 && !this.hasOpenHomeworks) {
				this.isFilterDisabled = true;
			} else if (tab === 1 && !this.hasCompletedHomeworks) {
				this.isFilterDisabled = true;
			} else {
				this.isFilterDisabled = false;
			}
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

::v-deep .v-slide-group__prev {
	display: none !important;
}

.border-bottom {
	border-bottom: 2px solid rgba(0, 0, 0, 0.12);
}
</style>
