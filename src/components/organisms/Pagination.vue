<template>
	<nav class="pagination d-flex" role="navigation" aria-label="pagination">
		<base-select
			style="max-width: 150px"
			close-on-select
			:value="perPageSelected"
			:options="perPageOptions"
			:allow-empty="false"
			track-by="value"
			option-label="label"
			:label="this.$t('components.organisms.Pagination.recordsPerPage')"
			:label-hidden="true"
			@select="setPagination"
		/>
		<div v-if="perPage > 0" class="d-flex align-items-center">
			<p class="total">
				{{
					this.$t("components.organisms.Pagination.currentPage", {
						start: total > 0 ? currentPage * perPage - perPage + 1 : 0,
						end:
							perPage > total
								? total
								: currentPage * perPage > total
								? total
								: currentPage * perPage,
						total,
					})
				}}
			</p>
			<ul v-if="total > 0" class="pagination-list">
				<li v-if="currentPage > 1" class="pagination-link-wrapper">
					<base-button
						design="none"
						class="pagination-link"
						aria-label="Goto previous page"
						@click="previousPage"
					>
						<base-icon source="material" icon="keyboard_arrow_left">
						</base-icon>
					</base-button>
				</li>
				<li v-if="currentPage < lastPage" class="pagination-link-wrapper">
					<base-button
						design="none"
						class="pagination-link"
						aria-label="Goto next page"
						@click="nextPage"
					>
						<base-icon source="material" icon="keyboard_arrow_right">
						</base-icon>
					</base-button>
				</li>
			</ul>
		</div>
		<div v-else>
			{{ $t("components.organisms.Pagination.showTotalRecords", { total }) }}
		</div>
	</nav>
</template>

<script>
export default {
	model: {
		event: "update",
	},
	props: {
		currentPage: {
			type: Number,
			default: 1,
		},
		perPage: {
			type: Number,
			default: 10,
		},
		total: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			perPageOptions: [
				{
					label: this.$t("components.organisms.Pagination.perPage.5"),
					value: 5,
				},
				{
					label: this.$t("components.organisms.Pagination.perPage.10"),
					value: 10,
				},
				{
					label: this.$t("components.organisms.Pagination.perPage.25"),
					value: 25,
				},
				{
					label: this.$t("components.organisms.Pagination.perPage.50"),
					value: 50,
				},
				{
					label: this.$t("components.organisms.Pagination.perPage.100"),
					value: 100,
				},
			],
		};
	},
	computed: {
		perPageSelected() {
			return {
				label:
					this.perPage +
					" " +
					this.$t("components.organisms.Pagination.perPage"),
				value: this.perPage,
			};
		},
		lastPage() {
			return Math.ceil(this.total / this.perPage);
		},
	},
	methods: {
		setPagination(val) {
			this.$emit("update:per-page", val.value);
		},
		previousPage() {
			this.$emit("update:current-page", this.currentPage - 1);
		},
		nextPage() {
			this.$emit("update:current-page", this.currentPage + 1);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.pagination {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0 auto;
}

.pagination-list {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;
	list-style: none;
}

.pagination-link-wrapper .pagination-link {
	padding: var(--space-xs);
	margin-left: var(--space-sm);
	color: var(--color-white);
	cursor: pointer;
	background-color: var(--color-tertiary);
	border-radius: var(--radius-sm);
}

.total {
	margin-right: var(--space-sm);
	margin-bottom: 0;
}
</style>
