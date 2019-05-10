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
export default {};
</script>

<style lang="scss" scoped>
@import "@styles";

.button {
	display: flex;
	align-items: center;
	padding: var(--space-xs) var(--space-sm);
	color: var(--grey-3);
	text-transform: uppercase;
	cursor: pointer;
	border: 1px solid var(--color-gray);
	border-radius: var(--radius-md);
	transition: background-color var(--duration-transition-medium) ease;
	&:hover,
	&:focus {
		filter: brightness(0.7);
	}
}

.is-light {
	color: var(--grey-3);
	background-color: transparent;
	border-width: 1px;
}
.is-primary {
	color: var(--color-white);
	background-color: var(--color-primary);
}

.is-accent {
	background-color: var(--color-accent);
}

.is-small {
	font-size: var(--text-sm);
}

.is-medium {
	font-size: var(--text-md);
}

.is-large {
	font-size: var(--text-lg);
}
</style>
