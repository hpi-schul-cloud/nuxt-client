<template>
	<div v-if="selectedRows.length > 0" class="row-selection-info">
		<div class="d-flex align-items-center">
			<div v-if="allRowsOfAllPagesSelected">Alle {{ total }} ausgewählt</div>
			<div v-else>
				<span>{{ selectedRows.length }} ausgewählt</span>
				<span v-if="allRowsOfCurrentPageSelected">
					(oder
					<span
						style="text-decoration: underline; cursor: pointer"
						@click="allRowsOfAllPagesSelected = true"
						>Alle {{ total }} auswählen</span
					>
					)
				</span>
			</div>
			<div class="ml--md">
				<dropdown-menu
					:items="actions"
					title="Aktionen"
					@input="$emit('fire-action', $event)"
				/>
			</div>
		</div>
		<div>
			<base-icon
				icon="close"
				source="material"
				class="ml--md mr--md"
				style="cursor: pointer"
				@click="$emit('unselect-all-rows')"
			/>
		</div>
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
		selectedRows: {
			type: Array,
			default: () => [],
		},
		allRowsOfAllPagesSelected: {
			type: Boolean,
		},
		allRowsOfCurrentPageSelected: {
			type: Boolean,
		},
		total: {
			type: Number,
			default: 0,
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
	color: var(--color-white);
	background: var(--color-info-light);
}

</style>
