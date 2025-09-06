<template>
	<div class="footer-button" :class="isError ? 'error' : ''">
		<button class="btn-confirm" v-bind="$attrs">
			{{ text }}
		</button>
	</div>
</template>

<script setup lang="ts">
type Props = {
	isError?: boolean;
	text?: string;
};

withDefaults(defineProps<Props>(), {
	isError: false,
	text: "Ok",
});
</script>

<style lang="scss" scoped>
.footer-button {
	position: relative;
	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;
	width: 100%;

	> *:not(:first-child) {
		margin-left: 16px;
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
	padding: 24px 32px;
	font-family: var(--font-accent);
	font-size: var(--text-md);
	font-weight: var(--button-font-weight);
	color: rgba(var(--v-theme-white));
	cursor: pointer;
	background: rgba(var(--v-theme-success));
	border: none;
	border-radius: 0 0 4px 4px;
	transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);

	&:hover,
	&:focus {
		background: rgba(var(--v-theme-success-darken-1));
	}
}

.error {
	.btn-confirm {
		background: rgba(var(--v-theme-error));

		&:hover,
		&:focus {
			background: rgba(var(--v-theme-error-darken-1));
		}
	}
}
</style>
