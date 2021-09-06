<template>
	<section>
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
		<v-container class="v-container mt-5 mb-14">
			<v-custom-autocomplete
				v-if="!isListEmpty"
				v-model="selectedCourses"
				:items="courses"
				:label="$t('pages.homeworks.labels.filter')"
				:no-data-text="$t('pages.homeworks.labels.noCoursesAvailable')"
				:disabled="isFilterDisabled"
				@selected-item="filterByCourse"
			/>
			<homeworks-dashboard-student v-if="isStudent" :tab="tab" />
			<homeworks-dashboard-teacher v-else />
		</v-container>
	</section>
</template>

<script>
import { mapGetters } from "vuex";
import vCustomAutocomplete from "@components/atoms/vCustomAutocomplete";
import HomeworksDashboardTeacher from "./HomeworksDashboardTeacher";
import HomeworksDashboardStudent from "./HomeworksDashboardStudent";

export default {
	components: {
		vCustomAutocomplete,
		HomeworksDashboardStudent,
		HomeworksDashboardTeacher,
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
		...mapGetters("homeworks", {
			status: "getStatus",
			isListFilled: "isListFilled",
			isListEmpty: "isListEmpty",
			hasOpenHomeworks: "hasOpenHomeworks",
			hasCompletedHomeworks: "hasCompletedHomeworks",
			courses: "getCourses",
		}),
		isStudent: function () {
			return this.role === "student";
		},
		isFilterDisabled: function () {
			if (this.selectedCourses.length > 0) return false;

			if (this.tab === 0 && !this.hasOpenHomeworks) {
				return true;
			} else if (this.tab === 1 && !this.hasCompletedHomeworks) {
				return true;
			} else {
				return false;
			}
		},
	},
	mounted() {
		this.$store.dispatch("homeworks/getHomeworksDashboard");
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
