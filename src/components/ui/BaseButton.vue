<template>
	<button class="button" v-on="$listeners">
		<slot />
		<!--
			TODO: discuss if this button shoud render a BaseLink,
			styled as a Button if you give him a href/to property
		-->
	</button>
</template>

<script>
export default {
	name: "BaseButton",
};
</script>

<style lang="scss" scoped>
@import "@variables";

.button {
	display: flex;
	align-items: center;
	padding: $size-padding;
	color: $color-button-light;
	text-transform: uppercase;
	cursor: pointer;
	border: $size-border-width solid;
	border-radius: $size-border-radius;
	transition: background-color $duration-animation-base ease;
	&:hover,
	&:focus {
		color: #fff;
		background-color: transparentize($color-text, 0.1);
	}
	.is-light {
		color: $color-button-light;
		background-color: $color-button-light-bg;
		border-color: $color-button-light-border;
		border-width: 1px;
	}
}

.is-primary {
	background-color: $color-button-primary;
}

.is-secondary {
	background-color: $color-button-secondary;
}

.is-small {
	font-size: $size-button-small-desktop;

	// Tablet size
	@media screen and (max-width: $size-tablet-max-width) {
		font-size: $size-button-small-tablet;
	}

	// Mobile size
	@media screen and (max-width: $size-mobile-max-width) {
		font-size: $size-button-small-mobile;
	}
}

.is-medium {
	font-size: $size-button-medium-desktop;

	// Tablet size
	@media screen and (max-width: $size-tablet-max-width) {
		font-size: $size-button-medium-tablet;
	}

	// Mobile size
	@media screen and (max-width: $size-mobile-max-width) {
		font-size: $size-button-medium-mobile;
	}
}

.is-large {
	font-size: $size-button-large-desktop;

	// Tablet size
	@media screen and (max-width: $size-tablet-max-width) {
		font-size: $size-button-large-tablet;
	}

	// Mobile size
	@media screen and (max-width: $size-mobile-max-width) {
		font-size: $size-button-large-mobile;
	}
}
</style>
