<template>
	<nav
		class="pagination is-rounded is-centered"
		role="navigation"
		aria-label="pagination"
	>
		<ul class="pagination-list">
			<li>
				<a class="pagination-link" aria-label="Goto page 1">1</a>
			</li>
			<li>
				<span class="pagination-ellipsis">&hellip;</span>
			</li>
			<li>
				<a class="pagination-link" aria-label="Goto page 45">45</a>
			</li>
			<li>
				<a
					class="pagination-link is-current"
					aria-label="Page 46"
					aria-current="page"
					>46</a
				>
			</li>
			<li>
				<a class="pagination-link" aria-label="Goto page 47">47</a>
			</li>
			<li>
				<span class="pagination-ellipsis">&hellip;</span>
			</li>
			<li>
				<a class="pagination-link" aria-label="Goto page 86">86</a>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: 'Pagination',
	props: {
		value: {
			type: Number,
			default: 1,
		},
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
	},
};
</script>

<style lang="scss" scoped></style>
