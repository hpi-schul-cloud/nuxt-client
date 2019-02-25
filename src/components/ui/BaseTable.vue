<template>
	<div>
		<table class="table">
			<slot />
		</table>
	</div>
</template>
<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@variables";
.table {
	border: 1px solid black;
	border-collapse: unset;
}
.table tr:nth-child(odd) {
	background-color: #fff;
}
.table tr:nth-child(even) {
	background-color: #eee;
}
</style>
