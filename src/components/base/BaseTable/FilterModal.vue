<template>
	<base-modal :active.sync="active">
		<div class="modal-header">
			<h3>{{ filterOpened.label }}</h3>
		</div>

		<div class="modal-body">
			<div v-if="filterOpened.type === 'string'">
				<base-select
					v-model="filterOpened.matchingType"
					label="Matching-Typ auswählen"
					:options="stringFilters"
					:allow-empty="false"
					option-label="label"
				/>
				<base-input
					v-model="filterOpened.value"
					label="Wert"
					autofocus
					placeholder="Wert"
					type="text"
					@keyup.enter.native="$emit('set-filter', filterOpened)"
				/>
			</div>
			<div v-if="filterOpened.type === 'fulltextSearch'">
				<base-input
					v-model="filterOpened.value"
					label="Zeichenkette"
					autofocus
					placeholder="Zeichenkette"
					type="text"
					@keyup.enter.native="setFilter(filterOpened)"
				/>
			</div>
			<div v-if="filterOpened.type === 'select'">
				<h5>Stimmt überein mit:</h5>
				<base-input
					v-for="option of filterOpened.value"
					:key="option.value"
					v-model="option.checked"
					class="mt--sm"
					style="display: block"
					:label="option.label"
					type="checkbox"
					name="checkbox"
				/>
			</div>
		</div>

		<div class="modal-footer">
			<base-button
				id="button"
				design="primary"
				@click="$emit('set-filter', filterOpened)"
				>Übernehmen</base-button
			>
		</div>
	</base-modal>
</template>

<script>
export default {
	props: {
		active: {
			type: Boolean,
		},
		filterOpened: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {
			stringFilters: [
				{
					label: "enthält",
					value: "contains",
				},
				{
					label: "ist gleich",
					value: "equals",
				},
			],
		};
	},
};
</script>
