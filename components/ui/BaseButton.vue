<template>
	<button class="button" v-on="$listeners">
		<slot />
	</button>
</template>

<style lang="scss" scoped>
@import "@variables";

.button {
	display: flex;
	align-items: center;
	padding: $size-padding;
	color: $color-text-on-primary;
	text-transform: uppercase;
	cursor: pointer;
	background-color: transparentize($color-text, 0);
	border: $size-border-width solid $color-text-on-primary;
	border-radius: $size-border-radius;
	transition: background-color $duration-animation-base ease;
	&:hover,
	&:focus {
		background-color: transparentize($color-text, 0.1);
	}
}
</style>
