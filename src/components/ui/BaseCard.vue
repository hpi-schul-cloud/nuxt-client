<template>
	<section v-bind="$attrs" class="card">
		<header class="customcard-header">
			<slot name="header" />
		</header>
		<div class="customcard-content">
			<slot />
		</div>
		<footer class="customcard-footer">
			<slot name="footer" />
		</footer>
	</section>
</template>

<style lang="scss" scoped>
@import "@variables";

.card {
	padding: $size-space 2 * $size-space;
	overflow: hidden;
	background: #fff;
	border: $size-border-width solid $color-border;
	border-radius: $size-border-radius;
	box-shadow: $shadow-1;
	transition: box-shadow ($duration-animation-base * 0.5) ease-in;
	&:hover {
		box-shadow: $shadow-2;
	}
}
</style>
