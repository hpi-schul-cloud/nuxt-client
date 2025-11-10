<template>
	<section>
		<v-expansion-panels :model-value="expanded" variant="accordion" mandatory>
			<v-expansion-panel elevation="0" :disabled="isPanelOneDisabled">
				<v-expansion-panel-title v-if="isLoading">
					<v-skeleton-loader type="text" max-width="30%" />
					<template #actions>
						<v-skeleton-loader type="chip" />
					</template>
				</v-expansion-panel-title>
				<v-expansion-panel-title
					v-else-if="!isEmpty"
					data-testid="upperTaskSection"
					class="text-h4 font-weight-bold"
					@click="toggle"
				>
					{{ panelOneTitle }} ({{ panelOneCount }})
				</v-expansion-panel-title>
				<v-expansion-panel-text>
					<slot name="panelOne" />
				</v-expansion-panel-text>
			</v-expansion-panel>
			<v-expansion-panel elevation="0" :disabled="isPanelTwoDisabled">
				<v-expansion-panel-title v-if="isLoading">
					<v-skeleton-loader type="text" max-width="30%" />
					<template #actions>
						<v-skeleton-loader type="chip" />
					</template>
				</v-expansion-panel-title>
				<v-expansion-panel-title
					v-else-if="!isEmpty"
					class="text-h4 font-weight-bold"
					data-testid="lowerTaskSection"
					@click="toggle"
					>{{ panelTwoTitle }} ({{ panelTwoCount }})
				</v-expansion-panel-title>
				<v-expansion-panel-text>
					<slot name="panelTwo" />
				</v-expansion-panel-text>
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
			validator: (val) => [null, "", "pending", "completed", "error"].includes(val),
		},
		isEmpty: {
			type: Boolean,
			required: true,
		},
		expandedDefault: {
			type: Number,
			default: 0,
			required: false,
			validator: (val) => val === 0 || val === 1,
		},
	},
	data: function () {
		return {
			expanded: this.expandedDefault,
		};
	},
	computed: {
		updatedDefault: function () {
			return this.updateDefault();
		},
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
		areBothPanelsEmpty: function () {
			return this.isPanelOneDisabled && this.isPanelTwoDisabled;
		},
		areBothPanelsFilled: function () {
			return !this.isPanelOneDisabled && !this.isPanelTwoDisabled;
		},
	},
	watch: {
		isPanelOneDisabled: function () {
			this.expanded = 1;
		},
		isPanelTwoDisabled: function () {
			this.expanded = 0;
		},
		areBothPanelsEmpty: function () {
			this.expanded = this.updatedDefault;
		},
	},
	created() {
		this.expanded = this.updatedDefault;
	},
	methods: {
		toggle() {
			this.expanded = +!this.expanded;
		},
		updateDefault() {
			let expanded = this.expandedDefault;

			if (this.areBothPanelsEmpty || this.areBothPanelsFilled) return expanded;

			if (this.isPanelOneDisabled) {
				expanded = 1;
			} else {
				expanded = 0;
			}

			return expanded;
		},
	},
};
</script>
<style lang="scss" scoped>
:deep(.v-expansion-panel-text__wrapper) {
	padding: 0 0 8px 0;
}
</style>
