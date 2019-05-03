<template>
	<nav class="pagination" role="navigation" aria-label="pagination">
		<ul class="pagination-list">
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
		state: {
			type: Object,
			default: () => {
				return {
					limit: 10,
					skip: 0,
					total: 0,
				};
			},
		},
		value: {
			// number of skipped items ( $skip: 0 )
			type: Number,
			default: 0,
		},
	},
	computed: {
		currentPage() {
			return Math.floor(this.state.skip / this.state.limit + 1);
		},
		lastPage() {
			return Math.ceil(this.state.total / this.state.limit);
		},
	},
	methods: {
		previousPage() {
			this.updateModel(this.value - this.state.limit);
		},
		nextPage() {
			this.updateModel(this.value + this.state.limit);
		},
		updateModel(itemsSkipped) {
			this.$emit("update", itemsSkipped);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.pagination {
	margin: 0 auto;
}

.pagination-list {
	display: flex;
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
	background-color: var(--grey-1);
	&:not(.current) {
		cursor: pointer;
	}
}
</style>
