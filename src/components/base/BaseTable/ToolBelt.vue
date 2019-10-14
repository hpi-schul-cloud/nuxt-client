<template>
	<div class="toolbelt">
		<div v-if="filterable && checkedRows.length < 1" class="filters">
			<base-icon icon="filter_list" source="material" class="ml--md mr--md" />
			<base-select
				close-on-select
				label="Filter hinzufügen"
				label-hidden
				:value="filtersSelected"
				:options="filters"
				placeholder="Filter hinzufügen"
				:allow-empty="false"
				:multiple="true"
				:taggable="true"
				track-by="label"
				tag-placeholder="Volltext-Suche nach Namen, E-Mail, ..."
				option-label="label"
				@select="$emit('select-filter', $event)"
				@tag="$emit('set-search', $event)"
			>
				<template v-slot:tag="slotProps">
					<span class="multiselect__tag">
						<span @mousedown.prevent="$emit('edit-filter', slotProps.option)">
							{{ slotProps.option.tagLabel }}
						</span>
						<i
							aria-hidden="true"
							tabindex="0"
							class="multiselect__tag-icon"
							@keypress.enter.prevent="$emit('remove-filter', slotProps.option)"
							@mousedown.prevent="$emit('remove-filter', slotProps.option)"
						></i>
					</span>
				</template>
			</base-select>
		</div>
		<div v-if="checkedRows.length > 0" class="check-info">
			<div class="d-flex align-items-center">
				<div v-if="absoluteAllChecked">Alle {{ total }} ausgewählt</div>
				<div v-else>
					<span>{{ checkedRows.length }} ausgewählt</span>
					<span v-if="isAllChecked">
						(oder
						<span
							style="text-decoration: underline; cursor: pointer"
							@click="absoluteAllChecked = true"
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
					@click="$emit('uncheck-all')"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import DropdownMenu from "@components/DropdownMenu.vue";

export default {
	components: {
		DropdownMenu,
	},
	props: {
		actions: {
			type: Array,
			default: () => [],
		},
		checkedRows: {
			type: Array,
			default: () => [],
		},
		filters: {
			type: Array,
			default: () => [],
		},
		filtersSelected: {
			type: Array,
			default: () => [],
		},
		filterable: {
			type: Boolean,
		},
		absoluteAllChecked: {
			type: Boolean,
		},
		isAllChecked: {
			type: Boolean,
		},
		total: {
			type: Number,
			default: 0,
		},
	},
};
</script>
