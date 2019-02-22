<template>
	<button class="button" v-on="$listeners">
		<slot />
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
	padding: $color-text-on-primary;
	color: $color-body-bg;
	text-transform: uppercase;
	cursor: pointer;
	border: $size-border-width solid;
	border-radius: $size-border-radius;
	transition: background-color $duration-animation-base ease;
	&:hover,
	&:focus {
		background-color: transparentize($color-text, 0.1);
	}
}

.is-primary {
	background-color: $color-button-primary;
}

.is-secondary {
	background-color: $color-button-secondary;
}

.is-small {
	font-size: 15px;
	//TODO adjust sizes to viewport
}

.is-medium {
	font-size: 16px;
	//TODO adjust sizes to viewport
}

.is-large {
	font-size: 17px;
	// TODO adjust sizes to viewport
}
</style>
