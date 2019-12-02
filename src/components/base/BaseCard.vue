<template>
	<section v-bind="$attrs" class="card">
		<slot>
			<header class="customcard-header">
				<slot name="header" />
			</header>
			<div class="customcard-content">
				<slot name="content" />
			</div>
			<footer class="customcard-footer">
				<slot name="footer" />
			</footer>
		</slot>
	</section>
</template>

<style lang="scss" scoped>
@import "@styles";

.card {
	padding: var(--space-xs);
	background: #fff;
	border-radius: var(--radius-md);
	box-shadow: var(--shadow-sm);
	transition: box-shadow calc(var(--duration-transition-medium) * 0.5) ease-in;
	&:hover {
		box-shadow: var(--shadow-m);
	}
}
</style>
