<template>
	<div class="actions-container">
		<div class="primary-container">
			<!-- @slot @mobile at the top, @tablet & @desktop at the right. First Item is placed on the most right position -->
			<slot name="primary" />
		</div>
		<div class="secondary-container">
			<!-- @slot @mobile at the bottom, @tablet & @desktop at the left -->
			<slot name="secondary" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
@use "@/styles/mixins" as *;

.actions-container {
	display: grid;
	grid-template-areas: "primary" "secondary";
	width: 100%;

	@include breakpoint(tablet) {
		grid-template-areas: "secondary primary";
	}
}

.primary-container,
.secondary-container {
	display: flex;
	flex-wrap: wrap;

	> * {
		margin: 8px 0;
	}
}

.primary-container {
	// row-reverse to display most right action on mobile devices at the top
	flex-direction: row-reverse;
	grid-area: primary;

	:not(:last-child) {
		margin-left: 12px;
	}
}

.secondary-container {
	grid-area: secondary;
	justify-content: flex-end;

	@include breakpoint(tablet) {
		justify-content: flex-start;
	}

	> *:not(:first-child) {
		margin-left: 12px;
	}
}
</style>
