<template>
	<div class="view-toggles">
		<base-button
			:design="isListView ? 'icon text' : 'icon'"
			@click="changeDisplayStyle('grid')"
		>
			<base-icon source="custom" icon="view-tile-view" />
		</base-button>
		<base-button
			:design="isListView ? 'icon' : 'icon text'"
			@click="changeDisplayStyle('list')"
		>
			<base-icon source="custom" icon="view-list-view" />
		</base-button>
	</div>
</template>
<script>
export default {
	props: {
		value: {
			type: String,
			required: true,
			validator: (v) => ["list", "grid"].includes(v),
		},
	},
	computed: {
		isListView() {
			return this.value === "list";
		},
	},
	methods: {
		changeDisplayStyle(to) {
			this.$emit("input", to);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.view-toggle:first-child {
	margin-left: 0;
}
.view-toggles > *:not(:first-child) {
	margin-left: var(--space-xs);
}
</style>
