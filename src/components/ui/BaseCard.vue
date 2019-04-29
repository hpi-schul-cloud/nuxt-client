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
@import "@styles";

.card {
	padding: $size-padding;
	overflow: hidden;
	background: #fff;
	border: $size-border-width solid var(--color-border);
	border-radius: $size-border-radius;
	box-shadow: var(--shadow-1);
	transition: box-shadow calc(var(--duration-transition-medium) * 0.5) ease-in;
	&:hover {
		box-shadow: var(--shadow-2);
	}
}
</style>
