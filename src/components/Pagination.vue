<template>
	<nav class="pagination" role="navigation" aria-label="pagination">
		<div class="mr--md">
			{{ total > 0 ? currentPage * perPage - perPage + 1 : 0 }} bis
			{{
				perPage > total
					? total
					: total * perPage > total
					? total
					: total * perPage
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
				<a class="pagination-link" aria-label="Goto next page" @click="nextPage"
					>→</a
				>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	model: {
		event: "update",
	},
	props: {
		perPage: {
			type: Number,
			default: 10,
		},
		total: {
			type: Number,
			default: 0,
		},
		currentPage: {
			// number of skipped items
			type: Number,
			default: 1,
		},
	},
	computed: {
		lastPage() {
			return Math.ceil(this.total / this.perPage);
		},
	},
	methods: {
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
	justify-content: center;
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
