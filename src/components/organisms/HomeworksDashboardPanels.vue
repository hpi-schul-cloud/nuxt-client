<template>
	<section class="homework-dashboard-teacher">
		<v-expansion-panels v-model="expanded" flat accordion mandatory>
			<v-expansion-panel :disabled="panelOneDisabled">
				<v-expansion-panel-header
					v-if="!loading"
					class="text-h6 font-weight-bold pa-0"
				>
					{{ $t("pages.homeworks.teacher.subtitleNoDue") }}
					<template v-slot:actions
						>{{ panelOneCount }}
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
					<slot name="panelOne" />
				</v-expansion-panel-content>
			</v-expansion-panel>
			<v-expansion-panel :disabled="panelTwoDisabled">
				<v-expansion-panel-header
					v-if="!loading"
					class="text-h6 font-weight-bold pa-0"
				>
					{{ $t("pages.homeworks.teacher.subtitleWithDue") }}
					<template v-slot:actions>
						{{ panelTwoCount }}
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
					<slot name="panelTwo" />
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</section>
</template>

<script>
export default {
	props: {
		panelOneDisabled: {
			type: Boolean,
		},
		panelTwoDisabled: {
			type: Boolean,
		},
		panelOneCount: {
			type: Number,
			default: 0,
		},
		panelTwoCount: {
			type: Number,
			default: 0,
		},
		loading: {
			type: Boolean,
		},
	},
	data() {
		return {
			expanded: 1,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep .v-expansion-panel-content__wrap {
	padding: 0;
}
</style>
