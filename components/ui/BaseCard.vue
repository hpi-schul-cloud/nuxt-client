<template>
	<div :style="styles" class="card">
		<slot />
	</div>
</template>

<script>
export default {
	props: {
		styles: {
			type: Object,
			default: () => ({}),
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

.card {
	padding: $size-card-padding;
	overflow: hidden;
	background: #fff;
	border: $size-card-border solid $color-card-border;
	border-radius: $size-card-border-radius;
	box-shadow: $size-card-shadow $color-card-shadow;
}
</style>
