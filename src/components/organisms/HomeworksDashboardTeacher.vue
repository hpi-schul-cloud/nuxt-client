<template>
	<section class="homework-dashboard-teacher">
		<v-expansion-panels
			flat
			accordion
			mandatory
			:value="getDefaultSelectedPanel()"
		>
			<v-expansion-panel>
				<v-expansion-panel-header
					v-if="isListFilled"
					class="text-h6 font-weight-bold pa-0"
				>
					{{ $t("pages.homeworks.teacher.subtitleNoDue") }}
					<template v-slot:actions
						>{{ noDueDateHomeworks.length }}
						<v-icon class="ml-3"> $expand </v-icon>
					</template>
				</v-expansion-panel-header>
				<v-expansion-panel-header v-else-if="loading">
					<v-skeleton-loader type="text" :max-width="'30%'" />
					<template v-slot:actions>
						<v-skeleton-loader type="chip" />
					</template>
				</v-expansion-panel-header>
				<v-expansion-panel-content class="pa-0">
					<homeworks-list :homeworks="noDueDateHomeworks" type="teacher" />
				</v-expansion-panel-content>
			</v-expansion-panel>
			<v-expansion-panel>
				<v-expansion-panel-header
					v-if="isListFilled"
					class="text-h6 font-weight-bold pa-0"
				>
					{{ $t("pages.homeworks.teacher.subtitleWithDue") }}
					<template v-slot:actions>
						{{ overDueHomeworks.length + dueDateHomeworks.length }}
						<v-icon class="ml-3"> $expand </v-icon>
					</template>
				</v-expansion-panel-header>
				<v-expansion-panel-header v-else-if="loading">
					<v-skeleton-loader type="text" :max-width="'30%'" />
					<template v-slot:actions>
						<v-skeleton-loader type="chip" />
					</template>
				</v-expansion-panel-header>
				<v-expansion-panel-content class="pa-0">
					<homeworks-list
						:homeworks="overDueHomeworks"
						:title="$t('pages.homeworks.teacher.subtitleOverDue')"
						type="teacher"
					/>
					<homeworks-list
						:homeworks="dueDateHomeworks"
						:title="$t('pages.homeworks.teacher.subtitleAssigned')"
						type="teacher"
					/>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</section>
</template>

<script>
import HomeworksList from "@components/organisms/HomeworksList";
import { mapGetters } from "vuex";

export default {
	components: { HomeworksList },
	computed: {
		...mapGetters("homeworks", {
			dueDateHomeworks: "getOpenHomeworksWithDueDate",
			overDueHomeworks: "getOverDueHomeworks",
			noDueDateHomeworks: "getOpenHomeworksWithoutDueDate",
			isListFilled: "isListFilled",
			loading: "loading",
		}),
	},
	methods: {
		getDefaultSelectedPanel: function () {
			if (this.dueDateHomeworks.length > 0 || this.overDueHomeworks.length > 0)
				return 1;
			else if (this.noDueDateHomeworks.length > 0) return 0;
			else return 1;
		},
	},
};
</script>
<style lang="scss" scoped>
::v-deep .v-expansion-panel-content__wrap {
	padding: 0;
}
</style>
