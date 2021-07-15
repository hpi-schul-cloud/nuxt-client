<template>
	<section>
		<v-expansion-panels v-model="expanded" flat accordion mandatory>
			<v-expansion-panel :disabled="isPanelOneDisabled">
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
				<v-expansion-panel-header v-else-if="isLoading">
					<v-skeleton-loader type="text" max-width="30%" />
					<template v-slot:actions>
						<v-skeleton-loader type="chip" />
					</template>
				</v-expansion-panel-header>
				<v-expansion-panel-content class="pa-0">
					<slot name="panelOne" />
				</v-expansion-panel-content>
			</v-expansion-panel>
			<v-expansion-panel :disabled="isPanelTwoDisabled">
				<v-expansion-panel-header
					v-if="isListFilled"
					class="text-h6 font-weight-bold pa-0"
				>
					{{ $t("pages.homeworks.teacher.subtitleWithDue") }}
					<template v-slot:actions>
						{{ dueDateHomeworks.length }}
						<v-icon class="ml-3"> $expand </v-icon>
					</template>
				</v-expansion-panel-header>
				<v-expansion-panel-header v-else-if="isLoading">
					<v-skeleton-loader type="text" max-width="30%" />
					<template v-slot:actions>
						<v-skeleton-loader type="chip" />
					</template>
				</v-expansion-panel-header>
				<v-expansion-panel-content class="pa-0">
					<slot name="panelTwo" />
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	data() {
		return {
			expanded: 1,
		};
	},
	computed: {
		...mapGetters("homeworks", {
			dueDateHomeworks: "getOpenHomeworksWithDueDate",
			overDueHomeworks: "getOverDueHomeworks",
			noDueDateHomeworks: "getOpenHomeworksWithoutDueDate",
			isListFilled: "isListFilled",
			status: "getStatus",
		}),
		noDueDatePanelEmpty: function () {
			return this.noDueDateHomeworks.length === 0;
		},
		dueDatePanelEmpty: function () {
			return (
				this.dueDateHomeworks.length === 0 && this.overDueHomeworks.length === 0
			);
		},
		isLoading: function () {
			return this.status === "pending";
		},
		isCompleted: function () {
			return this.status === "completed";
		},
		isPanelOneDisabled: function () {
			return this.noDueDatePanelEmpty && this.isCompleted;
		},
		isPanelTwoDisabled: function () {
			return this.dueDatePanelEmpty && this.isCompleted;
		},
	},
};
</script>
<style lang="scss" scoped>
::v-deep .v-expansion-panel-content__wrap {
	padding: 0;
}
</style>
