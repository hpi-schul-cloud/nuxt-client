<template>
	<div class="footer-container">
		<div class="icon-container">
			<slot name="icons"> </slot>
		</div>
		<div class="button-container">
			<slot name="buttons"> </slot>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@styles";

.footer-container {
	position: relative;
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	align-items: normal;
	justify-content: space-between;
	width: 100%;
	padding: 0;
	background-color: var(--color-tertiary);
	border-bottom-right-radius: 6px;
	border-bottom-left-radius: 6px;

	@include breakpoint(tablet) {
		flex-direction: row;
		align-items: normal;
		justify-content: space-between;
		padding: var(--space-sm) var(--space-xl);
	}
}

.button-container {
	display: flex;
	justify-content: space-between;
	padding: var(--space-sm) var(--space-md);
	border-top: 1px solid var(--color-white);
	:not(:first-child) {
		margin-left: var(--space-sm);
	}

	@include breakpoint(tablet) {
		padding: 0;
		border: none;
	}
}

.icon-container {
	float: left;
	padding: var(--space-sm) var(--space-md);
	> *:not(:first-child) {
		margin-left: var(--space-sm);
	}

	@include breakpoint(tablet) {
		padding: 0;
	}
}
</style>
