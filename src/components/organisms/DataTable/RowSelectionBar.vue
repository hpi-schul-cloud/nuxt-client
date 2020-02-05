<template>
	<div v-if="numberOfSelectedItems > 0" class="row-selection-info">
		<div class="d-flex align-items-center">
			<div v-if="allRowsOfAllPagesSelected"
				>Alle {{ totalNumberOfItems }} ausgewählt</div
			>
			<div v-else>
				<span>{{ numberOfSelectedItems }} ausgewählt</span>
				<span v-if="numberOfSelectedItems < totalNumberOfItems">
					(oder
					<base-button
						design="none"
						class="select-all-rows"
						@click="$emit('update:allRowsOfAllPagesSelected', true)"
					>
						alle {{ totalNumberOfItems }} auswählen
					</base-button>
					)
				</span>
			</div>
			<div v-if="actions && actions.length" class="ml--md">
				<dropdown-menu
					:items="actions"
					title="Aktionen"
					@input="$emit('fire-action', $event)"
				/>
			</div>
		</div>
		<base-button design="none">
			<base-icon
				icon="close"
				source="material"
				class="ml--md mr--md"
				style="cursor: pointer"
				@click="closeBanner"
			/>
		</base-button>
	</div>
</template>

<script>
import DropdownMenu from "@components/organisms/DropdownMenu.vue";

export default {
	components: {
		DropdownMenu,
	},
	props: {
		actions: {
			type: Array,
			default: () => [],
		},
		totalNumberOfItems: {
			type: Number,
			default: 0,
		},
		numberOfSelectedItems: {
			type: Number,
			required: true,
		},
		allRowsOfAllPagesSelected: {
			type: Boolean,
		},
		allRowsOfCurrentPageSelected: {
			type: Boolean,
		},
	},
	methods: {
		closeBanner() {
			this.$emit("update:allRowsOfCurrentPageSelected", false);
			this.$emit("update:allRowsOfAllPagesSelected", false);
		},
	},
};
</script>

<style lang="scss" scoped>
.row-selection-info {
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: var(--space-md);
	font-size: var(--text-md);
	font-weight: var(--font-weight-normal);
	color: var(--color-on-table-selected);
	background: var(--color-table-selected);
}

.select-all-rows {
	text-decoration: underline;
	cursor: pointer;
}
</style>
