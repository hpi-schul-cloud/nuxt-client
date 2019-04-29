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
	padding: var(--space-sm) var(--space-md);
	overflow: hidden;
	background: #fff;
	border: 1px solid var(--color-border);
	border-radius: var(--curve-md);
	box-shadow: var(--shadow-1);
	transition: box-shadow calc(var(--duration-transition-medium) * 0.5) ease-in;
	&:hover {
		box-shadow: var(--shadow-2);
	}
}
</style>
