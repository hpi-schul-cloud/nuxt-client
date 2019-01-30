<template>
	<button class="button" v-on="$listeners">
		<slot/>
	</button>
</template>

<style lang="scss" scoped>
@import '@variables';

.button {
	display: flex;
	align-items: center;
	padding: $size-button-padding;
	color: $color-button-text;
	text-transform: uppercase;
	cursor: pointer;
	background-color: rgba(0, 0, 0, 0);
	border: $size-button-border solid $color-button-text;
	border-radius: $size-button-border-radius;
	transition: background-color $duration-animation-base ease;
	&:hover,
	&:focus {
		background-color: rgba(0, 0, 0, 0.1);
	}
}
</style>
