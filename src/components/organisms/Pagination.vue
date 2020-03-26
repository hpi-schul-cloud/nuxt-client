<template>
	<nav class="pagination d-flex" role="navigation" aria-label="pagination">
		<base-select
			label="Einträge pro Seite"
			style="max-width: 150px;"
			close-on-select
			:value="perPageSelected"
			:options="perPageOptions"
			:placeholder="placeholder"
			:allow-empty="false"
			track-by="value"
			option-label="label"
			@select="setPagination"
		/>
		<div v-if="perPage > 0" class="d-flex align-items-center">
			<div class="mr--md">
				{{ total > 0 ? currentPage * perPage - perPage + 1 : 0 }} bis
				{{
					perPage > total
						? total
						: currentPage * perPage > total
						? total
						: currentPage * perPage
				}}
				von {{ total }}
			</div>
			<ul v-if="total > 0" class="pagination-list">
				<li v-if="currentPage > 1" class="pagination-link-wrapper">
					<a
						class="pagination-link"
						aria-label="Goto previous page"
						@click="previousPage"
						>←</a
					>
				</li>
				<li class="pagination-link-wrapper">
					<a
						:aria-label="`Page ${currentPage}`"
						class="pagination-link current"
						aria-current="page"
						>{{ currentPage }}</a
					>
				</li>
				<li v-if="currentPage < lastPage" class="pagination-link-wrapper">
					<a
						class="pagination-link"
						aria-label="Goto next page"
						@click="nextPage"
						>→</a
					>
				</li>
			</ul>
		</div>
		<div v-else>Zeige alle {{ total }} Einträge</div>
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
		placeholder: {
			type: String,
			default: "Pro Seite",
		},
	},
	data: () => ({
		perPageOptions: [
			{
				label: "5 pro Seite",
				value: 5,
			},
			{
				label: "10 pro Seite",
				value: 10,
			},
			{
				label: "25 pro Seite",
				value: 25,
			},
			{
				label: "50 pro Seite",
				value: 50,
			},
			{
				label: "100 pro Seite",
				value: 100,
			},
		],
	}),
	computed: {
		perPageSelected() {
			return {
				label: this.perPage + " pro Seite",
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
.pagination-link-wrapper {
	display: inline-block;
}
.pagination-link {
	display: inline-block;
	padding: var(--space-sm);
	background-color: var(--color-gray-light);
	&:not(.current) {
		cursor: pointer;
	}
}
</style>
