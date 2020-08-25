<template>
	<div
		:style="{ backgroundColor: backgroundcolor }"
		class="footer-button"
		:class="isSuccess ? '' : 'error'"
	>
		<button class="btn-confirm" v-on="$listeners">Ok</button>
	</div>
</template>

<script>
export default {
	props: {
		backgroundcolor: {
			type: String,
			default() {
				return "var(--color-success)";
			},
		},
		isSuccess: {
			type: Boolean,
		},
	},
	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.footer-button {
	position: relative;
	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;
	width: 100%;

	> *:not(:first-child) {
		margin-left: var(--space-md);
	}

	@media only screen and (max-width: 520px) {
		flex-direction: column;
		align-items: normal;
		padding: 0;
		> *:not(:first-child) {
			margin-left: 0;
		}
	}
}

.btn-confirm {
	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding: var(--space-lg) var(--space-xl);
	font-family: var(--font-accent);
	font-size: var(--text-md);
	font-weight: var(--button-font-weight);
	color: var(--color-white);
	cursor: pointer;
	background: var(--button-background);
	border: none;
	border-radius: 0 0 var(--radius-sm) var(--radius-sm);
	transition: all var(--duration-transition-medium)
		cubic-bezier(0.23, 1, 0.32, 1);

	&:hover,
	&:focus {
		--button-background: var(--color-success-dark);
	}
}

.error {
	.btn-confirm {
		&:hover,
		&:focus {
			--button-background: var(--color-danger-dark);
		}
	}
}
</style>
