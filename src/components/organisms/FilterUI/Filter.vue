<!-- eslint-disable max-lines -->
<template>
	<div class="filter">
		<div class="row">
			<component
				:is="componentChips"
				v-if="chips.length > 0"
				class="chips"
				:chips="chips"
				@open="openFilter"
				@remove="handleRemove"
			/>

			<component
				:is="componentSelect"
				class="filter-select"
				:label-add="labelAdd"
				:options="unusedFilters"
				@openFilter="openFilter"
			/>
		</div>

		<component
			:is="componentModal"
			v-if="openGroup"
			:title="openGroup.title"
			:label-apply="labelApply"
			:label-cancle="labelCancle"
			:label-remove="labelRemove"
			@apply="handleApply"
			@cancle="handleCancle"
			@remove="handleRemove(openGroup.id)"
		>
			<component :is="openGroup.layout" class="layout">
				<!-- eslint-disable vue/no-unused-vars -->
				<!-- index usage is not detected -->
				<template
					v-for="(input, index) in openGroup.filter"
					v-slot:[getSlotName(index)]
				>
					<!-- eslint-enable vue/no-unused-vars -->
					<component
						:is="input.input"
						:key="input.label"
						v-model="tmpValues[input.id]"
						:options="input.options"
						:label="input.label"
					/>
				</template>
			</component>
		</component>
	</div>
</template>

<script>
import DefaultSelect from "./Select";
import DefaultChips from "./Chips";
import DefaultModal from "./Modal";
import DefaultLayout from "./layouts/default";
import url from "./mixins/url";

export default {
	mixins: [url],
	model: {
		prop: "query",
		event: "newQuery",
	},
	props: {
		labelAdd: { type: String, default: "add filter" },
		labelApply: { type: String, default: "apply" },
		labelCancle: { type: String, default: "cancle" },
		labelRemove: { type: String, default: "remove" },
		/*
    "handleUrl": { type: Boolean },
    "saveState": { type: Boolean },
		"consistentOrder": {type: Boolean, default: true},
		*/
		filter: { type: Array, required: true },
		activeFilters: {
			type: Array,
			default: () => [],
		},
		componentSelect: {
			type: Object,
			default: () => DefaultSelect,
		},
		componentChips: {
			type: Object,
			default: () => DefaultChips,
		},
		componentModal: {
			type: Object,
			default: () => DefaultModal,
		},
		parser: {
			type: Object,
			required: true,
			validator: (parser) => {
				return ["generator", "parser"].every(
					(attr) => typeof parser[attr] === "function"
				);
			},
		},
		query: {
			type: [Object, String],
			required: true,
		},
		handleUrl: {
			type: Boolean,
		},
	},
	data() {
		return {
			openGroupId: undefined,
			filterValues: {},
			values: {},
			tmpValues: {},
		};
	},
	computed: {
		active: {
			get() {
				return !!this.openGroupId;
			},
			set(to) {
				if (!to) {
					this.openGroupId = undefined;
				}
			},
		},
		openGroup() {
			return this.openGroupId
				? this.internalConfig.find((filter) => filter.id === this.openGroupId)
				: undefined;
		},
		internalConfig() {
			return this.filter.map((orgFilter, groupIndex) => {
				let filter = { ...orgFilter };

				// normalize structure
				if (!Array.isArray(filter.filter)) {
					filter = {
						title: filter.title,
						parser: filter.parser,
						chipTemplate: filter.chipTemplate,
						filter: [filter],
					};
				}
				// add identifier
				filter.id = `group-${groupIndex}`;
				// resolve input wrapper component
				/*
				// TODO I would like to have this functionality, but it doesn't work in a library build
				if (typeof filter.layout !== "function") {
					const name = filter.layout || "default";
					filter.layout = () => import(`./layouts/${name}.vue`);
				}
				*/
				if (!filter.layout) {
					filter.layout = DefaultLayout;
				}

				// resolve input components
				filter.filter = filter.filter.map((orgSubFilter, inputIndex) => {
					const subFilter = { ...orgSubFilter };
					subFilter.id = `input-${groupIndex}-${inputIndex}`;
					/*
					// TODO I would like to have this functionality, but it doesn't work in a library build
					if (typeof subFilter.input === "string") {
						const name = subFilter.input;
						subFilter.input = () => import(`./inputs/${name}.vue`);
					}
					*/
					if (typeof subFilter.applyNegated !== "function") {
						const { applyNegated } = subFilter;
						subFilter.applyNegated = () => !!applyNegated;
					}
					return subFilter;
				});
				return filter;
			});
		},
		chips() {
			return this.activeGroups.map((groupId) => {
				const group = this.internalConfig.find((g) => g.id === groupId);
				const filterValues = group.filter.map((a) => this.values[a.id]);
				const label =
					typeof group.chipTemplate === "function"
						? group.chipTemplate
						: (values) => {
								let out = group.chipTemplate;
								values.forEach((value, index) => {
									if (Array.isArray(value)) {
										// eslint-disable-next-line no-param-reassign
										value = value.join(", ");
									}
									out = out.replace(`%${index + 1}`, value);
								});
								return out;
						  };
				return {
					id: group.id,
					deletable: !group.required,
					label: label(filterValues),
				};
			});
		},
		activeGroups() {
			// set every group that has a value as active
			return this.internalConfig
				.filter((group) => {
					return group.filter.some(
						(input) => this.values[input.id] !== undefined
					);
				})
				.map((group) => group.id);
		},
		unusedFilters() {
			return this.internalConfig.filter((group) => {
				return !this.activeGroups.includes(group.id);
			});
		},
	},
	watch: {
		internalConfig(to) {
			to.forEach((group) => {
				group.filter.forEach((input) => {
					if (!Object.prototype.hasOwnProperty.call(this.values, input.id)) {
						this.$set(this.values, input.id, undefined);
						this.$set(this.tmpValues, input.id, undefined);
					}
				});
			});
			this.init();
		},
	},
	created() {
		this.init();
	},
	methods: {
		init() {
			this.updateFromQuery();

			if (this.handleUrl) {
				if (Object.keys(this.$_getFilterQueryParameters()).length !== 0) {
					this.clearQuery();
				}
				this.patchFromQuery();
			}

			this.generateQuery();

			if (Object.entries) this.updateUrlQuery();
		},
		getSlotName(index) {
			return `input-${index + 1}`;
		},
		openFilter(groupId) {
			this.tmpValues = JSON.parse(JSON.stringify(this.values));
			this.openGroupId = groupId;
		},
		handleRemove(groupId) {
			// reset values
			const removedGroup = this.internalConfig.find(
				(group) => group.id === groupId
			);
			removedGroup.filter.forEach((input) => {
				this.tmpValues[input.id] = undefined;
				this.values[input.id] = undefined;
			});
			// update query
			this.generateQuery();
			this.openGroupId = undefined;
		},
		handleApply() {
			// persist new values
			this.openGroup.filter.forEach((input) => {
				this.$set(this.values, input.id, this.tmpValues[input.id]);
			});
			this.handleCancle();
			this.generateQuery();
		},
		handleCancle() {
			this.openGroupId = undefined;
		},
		clearQuery() {
			Object.entries(this.values).forEach(([key]) => {
				this.$set(this.values, key, undefined);
			});
		},
		generateQuery() {
			const query = this.parser.generator(this.internalConfig, this.values);
			this.$emit("newQuery", query);
			if (this.handleUrl) {
				this.updateUrlQuery();
			}

			const newActiveFilters = [];

			this.internalConfig.forEach((group) => {
				const filter = group.filter.find(
					(input) => this.values[input.id] !== undefined
				);
				if (!filter) {
					return;
				}
				const newFilter = {
					attribute: filter.attribute,
					value: this.values[filter.id],
					operator: filter.operator,
					applyNegated: filter.applyNegated() || false,
				};
				newActiveFilters.push(newFilter);
			});
			this.$emit("update:active-filters", newActiveFilters);
		},
		updateUrlQuery() {
			// keep existing non filter related query params
			const newQuery = this.$_getFilterQueryParameters(true);
			// generate new query params from input values
			Object.entries(this.values)
				.filter(([, value]) => value !== undefined)
				.forEach(([key, value]) => {
					newQuery["vf-" + key] = encodeURIComponent(JSON.stringify(value));
				});
			//
			this.$_updateUrlQueryString(newQuery);
		},
		updateFromQuery() {
			const parsedValues = [];

			this.activeFilters.forEach((filter) => {
				this.internalConfig.forEach((group) => {
					group.filter.forEach((input) => {
						if (filter.attribute === input.attribute) {
							const queryValue = filter.value;
							if (queryValue === undefined) {
								return;
							}
							parsedValues[input.id] = queryValue;
						}
					});
				});
			});

			this.$set(this, "values", parsedValues);
		},
		patchFromQuery() {
			const query = this.$_getFilterQueryParameters();
			Object.entries(query).forEach(([key, value]) => {
				this.$set(this.values, key, value);
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.filter {
	font-family: var(--font-primary);
}
.add-filter {
	margin-bottom: var(--space-md);
	vertical-align: middle;
}
.md-chip {
	margin-bottom: var(--space-md);
}
.row {
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	width: 100%;

	.chips {
		margin-right: var(--space-xs);
	}
}
</style>
