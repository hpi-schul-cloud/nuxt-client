<!-- eslint-disable max-lines -->
<template>
	<button :class="classes" v-on="$listeners">
		<slot />
		<!--
			TODO: discuss if this button shoud render a BaseLink,
			styled as a Button if you give him a href/to property
		-->
	</button>
</template>

<script>
export default {
	props: {
		size: {
			type: String,
			default: "medium",
			validator: (size) => ["small", "medium", "large"].includes(size),
		},
		design: {
			type: String,
			default: "",
			validator: (design) => {
				const defined = [
					"",
					"none",
					"text",
					"icon",
					"icon text",
					"outline",
					"primary",
					"primary text",
					"primary icon",
					"primary icon text",
					"primary outline",
					"secondary",
					"secondary text",
					"secondary icon",
					"secondary icon text",
					"secondary outline",
					"hero-cta",
					"hero-cta icon",
					"success",
					"success text",
					"success icon",
					"success icon text",
					"success outline",
					"danger",
					"danger text",
					"danger icon",
					"danger icon text",
					"danger outline",
					"fancy",
					"fancy icon",
				].includes(design);
				if (!defined) {
					throw new Error(`the design "${design}" is not available`);
				}
				return defined;
			},
		},
		type: {
			type: String,
			default: "button",
		},
	},
	computed: {
		classes() {
			return [
				"button",
				`is-${this.size}`,
				...this.design.split(" ").map((a) => `is-${a}`),
			];
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.button {
	// typo
	--button-font-weight: var(--font-weight-bold);
	--button-line-height: var(--line-height-md);

	// color modes
	--button-background: var(--color-tertiary);
	--button-text-color: var(--color-white);
	&.is-outline {
		--button-background: var(--color-tertiary);
	}
	&.is-text {
		--button-background: var(--color-gray-dark);
	}
	&.is-primary,
	&.is-hero-cta {
		--button-background: var(--color-primary);
		--button-text-color: var(--color-white);
		&:hover,
		&:focus {
			--button-background: var(--color-primary-dark);
		}
	}
	&.is-secondary {
		--button-background: var(--color-accent);
		--button-text-color: var(--color-white);
		&:hover,
		&:focus {
			--button-background: var(--color-accent-dark);
		}
	}
	&.is-success {
		--button-background: var(--color-success);
		--button-text-color: var(--color-white);
		&:hover,
		&:focus {
			--button-background: var(--color-success--dark);
		}
	}
	&.is-danger {
		--button-background: var(--color-danger);
		--button-text-color: var(--color-white);
		&:hover,
		&:focus {
			--button-background: var(--color-danger--dark);
		}
	}
	&.is-fancy {
		--button-background: linear-gradient(
			45deg,
			var(--color-primary),
			var(--color-accent)
		);
		--button-text-color: var(--color-white);
		&:hover,
		&:focus {
			--button-background: linear-gradient(
				45deg,
				var(--color-primary-dark),
				var(--color-accent-dark)
			);
		}
	}
	&.is-icon {
		--button-padding: var(--space-xs);

		width: 40px;
		min-width: initial;
		height: 40px;
		padding: var(--button-padding);
		border-radius: var(--radius-round);
		&.is-small {
			--button-padding: var(--space-xxxs);
		}
		&.is-large {
			--button-padding: var(--space-sm);
		}
		&.is-hero-cta,
		&.is-fancy {
			width: 56px;
			height: 56px;
		}
	}

	&:disabled {
		--button-background: color-mod(var(--color-black) lightness(85%));
		--button-text-color: color-mod(var(--color-black) lightness(62%));
		&.is-outline,
		&.is-text {
			--button-background: color-mod(var(--color-white) lightness(62%));
		}
	}

	/* SIZES */
	--button-padding: var(--space-xs) var(--space-sm) var(--space-xxs)
		var(--space-sm);
	&.is-small {
		--button-padding: var(--space-xxxs) var(--space-sm) var(--space-xxxxs)
			var(--space-sm);
	}

	&.is-large {
		--button-padding: var(--space-sm) var(--space-sm) var(--space-sm)
			var(--space-sm);
	}

	display: inline-block;
	min-width: var(--space-xxxl);
	padding: var(--button-padding);
	font-family: var(--font-accent);
	font-size: var(--text-md);
	font-weight: var(--button-font-weight);
	line-height: var(--button-line-height);
	color: var(--button-text-color);
	text-align: center;
	white-space: nowrap;
	vertical-align: center;
	cursor: pointer;
	background: var(--button-background);
	border: 0;
	border-radius: var(--radius-sm);
	transition: all var(--duration-transition-medium)
		cubic-bezier(0.23, 1, 0.32, 1);

	&:hover,
	&:focus {
		outline: none;
	}

	/* stylelint-disable */
	// defined multiple to seperate style from behaviour
	&.is-outline {
		/* stylelint-enable */
		color: var(--button-background);
		background: transparent;
		border: 1px solid var(--button-background);

		&:hover,
		&:focus {
			// increase border size to increase visiblity
			box-shadow: 0 0 0 1px var(--button-background);
		}
	}
	/* stylelint-disable */
	// defined multiple to seperate style from behaviour
	&.is-text {
		/* stylelint-enable */
		color: var(--button-background);
		background: transparent;
		border: 0;

		&:hover,
		&:focus {
			background-color: var(--color-gray-light);
			box-shadow: none;
		}
	}
	&.is-none {
		min-width: initial;
		padding: 0;
		font: inherit;
		font-weight: initial;
		background: transparent;
		border: 0;
	}
	/* stylelint-disable */
	// defined multiple to seperate style from behaviour
	&:disabled {
		/* stylelint-enable */
		pointer-events: none;
		cursor: default;
	}
}
.is-hero-cta,
.is-fancy {
	box-shadow: var(--shadow-md);
}
</style>
