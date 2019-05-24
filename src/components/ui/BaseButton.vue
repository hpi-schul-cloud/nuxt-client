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
	--button-font-weight: var(--font-weight-bold);
	--button-line-height: var(--line-height-md);

	display: inline-block;
	align-items: center;
	min-width: var(--space-xxxl);
	padding: var(--space-xs) var(--space-sm) var(--space-xxs) var(--space-sm);
	font-family: var(--font-accent);
	font-size: var(--text-md);
	font-weight: var(--button-font-weight);
	line-height: var(--button-line-height);
	color: var(--color-gray-dark);
	text-align: center;
	white-space: nowrap;
	cursor: pointer;
	border: 1px solid var(--color-gray);
	border-radius: var(--radius-sm);
	transition: all var(--duration-transition-medium)
		cubic-bezier(0.23, 1, 0.32, 1) 0ms;
	&:hover,
	&:focus {
		background-color: var(--color-gray-light);
		outline: none;
	}

	&:disabled {
		color: var(--color-white);
		pointer-events: none;
		cursor: default;
		background-color: var(--color-gray);
		&:hover,
		&:focus {
			background-color: var(--color-gray);
		}
	}
}

.is-primary.is-outline {
	color: var(--color-primary);
	background-color: var(--color-white);
	border: 1px solid var(--color-primary);
}

.is-primary,
.is-hero-cta,
.is-primary.is-outline:hover,
.is-primary.is-outline:focus {
	color: var(--color-white);
	background-color: var(--color-primary);
	border: 1px solid transparent;
}

.is-hero-cta {
	box-shadow: 0 12px 17px 2px rgba(0, 0, 0, 0.14),
		0 5px 22px 4px rgba(0, 0, 0, 0.12), 0 7px 8px -4px rgba(0, 0, 0, 0.2);
}

.is-primary,
.is-hero-cta {
	&:hover,
	&:focus {
		background-color: var(--color-primary-dark);
	}
}

.is-secondary.is-outline {
	color: var(--color-accent);
	background-color: var(--color-white);
	border: 1px solid var(--color-accent);
}

.is-secondary,
.is-secondary.is-outline:hover,
.is-secondary.is-outline:focus {
	color: var(--color-white);
	background-color: var(--color-accent);
	border: 1px solid transparent;
}

.is-secondary {
	&:hover,
	&:focus {
		background-color: var(--color-accent-dark);
	}
}

.is-success {
	color: var(--color-white);
	background-color: var(--color-success);
	border: 1px solid transparent;
	&:hover,
	&:focus {
		background-color: var(--color-success);
		filter: brightness(80%);
	}
}

.is-danger {
	color: var(--color-white);
	background-color: var(--color-danger);
	border: 1px solid transparent;
	&:hover,
	&:focus {
		background-color: var(--color-danger);
		filter: brightness(80%);
	}
}

.is-small {
	padding: var(--space-xxxs) var(--space-sm) var(--space-xxxxs) var(--space-sm);
}

.is-large {
	padding: var(--space-sm) var(--space-sm) var(--space-sm) var(--space-sm);
}
</style>
