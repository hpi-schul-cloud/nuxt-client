<template>
	<div class="banner-container">
		<p class="banner-message">
			<span class="main">Dies ist ein Demoaccount.</span>
			<span>
				Sämtliche Aktionen, die Daten anlegen oder ändern, sind deaktiviert und
				nicht sichtbar.
			</span>
		</p>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
/* stylelint-disable sh-waqar/declaration-use-variable */
@import "@styles";

.banner-container {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 63px;
	background-color: #fcf8e3;
}

.banner-message {
	margin-bottom: 0;
	font-family: var(--font-primary);
	font-size: 18px;
	color: #8a6d3b;
	> span:not(.main) {
		display: none;

		@include breakpoint(desktop) {
			display: initial;
		}
	}
}
</style>
