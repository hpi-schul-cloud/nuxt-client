<template>
	<div class="footer">
		<div class="footer-container">
			<div class="left-container">
				<slot name="left" />
			</div>
			<div class="right-container">
				<slot name="right" />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@use "@/styles/mixins" as *;

.footer-container {
	position: relative;
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	align-items: normal;
	justify-content: space-between;
	width: 100%;
	padding: 0;
	border-bottom-right-radius: 6px;
	border-bottom-left-radius: 6px;

	@include breakpoint(tablet) {
		flex-direction: row;
		align-items: normal;
		justify-content: space-between;
		padding: 12px 32px;
	}
}

.right-container {
	display: flex;
	justify-content: space-between;
	padding: 12px 16px;
	border-top: 1px solid rgba(var(--v-theme-white));

	@include breakpoint(tablet) {
		padding: 0;
		border: none;
	}
}

.left-container {
	float: left;
	padding: 12px 16px;

	> *:not(:first-child) {
		margin-left: 12px;
	}

	@include breakpoint(tablet) {
		padding: 0;
	}
}
</style>
