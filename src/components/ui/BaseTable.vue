<template>
	<div>
		<table class="table">
			<!-- TODO replace with more advances lib -->
			<slot />
		</table>
	</div>
</template>
<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@styles";
.table {
	border: 1px solid black;
}
.table tr:nth-child(odd) {
	background-color: var(--color-white);
}
.table tr:nth-child(even) {
	background-color: var(--color-gray-light);
}
</style>
