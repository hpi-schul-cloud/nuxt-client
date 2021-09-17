<template>
	<section>
		<v-expansion-panels v-model="expanded" flat accordion mandatory>
			<v-expansion-panel :disabled="isPanelOneDisabled">
				<v-expansion-panel-header v-if="isLoading">
					<v-skeleton-loader type="text" max-width="30%" />
					<template v-slot:actions>
						<v-skeleton-loader type="chip" />
					</template>
				</v-expansion-panel-header>
				<v-expansion-panel-header
					v-else-if="!isEmpty"
					class="text-h6 font-weight-bold pa-0"
					@click="toggle"
				>
					{{ panelOneTitle }}
					<template v-slot:actions
						>{{ panelOneCount }}
						<v-icon class="ml-3"> $expand </v-icon>
					</template>
				</v-expansion-panel-header>
				<v-expansion-panel-content class="pa-0">
					<slot name="panelOne" />
				</v-expansion-panel-content>
			</v-expansion-panel>
			<v-expansion-panel :disabled="isPanelTwoDisabled">
				<v-expansion-panel-header v-if="isLoading">
					<v-skeleton-loader type="text" max-width="30%" />
					<template v-slot:actions>
						<v-skeleton-loader type="chip" />
					</template>
				</v-expansion-panel-header>
				<v-expansion-panel-header
					v-else-if="!isEmpty"
					class="text-h6 font-weight-bold pa-0"
					@click="toggle"
				>
					{{ panelTwoTitle }}
					<template v-slot:actions>
						{{ panelTwoCount }}
						<v-icon class="ml-3"> $expand </v-icon>
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
		panelOneCount: {
			type: Number,
			required: true,
			validator: (val) => val >= 0,
		},
		panelTwoCount: {
			type: Number,
			default: 0,
			validator: (val) => val >= 0,
		},
		panelOneTitle: {
			type: String,
			required: true,
		},
		panelTwoTitle: {
			type: String,
			required: true,
		},
		status: {
			required: true,
			validator: (val) => [null, "pending", "completed", "error"].includes(val),
		},
		isEmpty: {
			type: Boolean,
			required: true,
		},
		expandedDefault: {
			type: Number,
			default: 0,
			required: false,
			validator: (val) => val == 0 || val == 1,
		},
	},
	data: function () {
		return {
			expanded: this.expandedDefault,
		};
	},
	computed: {
		isPanelOneEmpty: function () {
			return this.panelOneCount === 0;
		},
		isPanelTwoEmpty: function () {
			return this.panelTwoCount === 0;
		},
		isLoading: function () {
			return this.status === "pending";
		},
		isCompleted: function () {
			return this.status === "completed";
		},
		isPanelOneDisabled: function () {
			return this.isPanelOneEmpty && this.isCompleted;
		},
		isPanelTwoDisabled: function () {
			return this.isPanelTwoEmpty && this.isCompleted;
		},
	},
	watch: {
		isPanelOneEmpty: function () {
			this.expanded = 1;
		},
		isPanelTwoEmpty: function () {
			this.expanded = 0;
		},
	},
	methods: {
		toggle() {
			this.expanded = +!this.expanded;
		},
	},
};
</script>
<style lang="scss" scoped>
::v-deep .v-expansion-panel-content__wrap {
	padding: 0;
}
</style>
