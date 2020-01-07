<template>
	<div class="grid" :style="col">
		<slot />
	</div>
</template>
<script>
export default {
	props: {
		columnWidth: {
			type: String,
			default: "15rem",
		},
	},
	computed: {
		col() {
			return (
				"grid-template-columns: repeat(auto-fill, minmax(" +
				this.columnWidth +
				", 1fr))"
			);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

.grid {
	display: grid;
	grid-gap: 2rem;
	width: 100%;
}
</style>
