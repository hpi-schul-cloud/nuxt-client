<template>
	<div
		class="dropdown"
		tabindex="0"
		:aria-expanded="open"
		:aria-controls="`dropdown-content-${$uid}`"
		@mouseenter="open = true"
		@mouseleave="open = false"
		@focus="open = true"
		@blur="open = false"
	>
		<div class="button">
			<div class="container">
				<slot name="header"></slot>
				<base-icon
					source="fa"
					icon="fas fa-chevron-down"
					:style="{
						'font-size': `var(--space-md)`,
						color: `var(--color-white)`,
					}"
				>
				</base-icon>
			</div>
		</div>
		<div :id="`dropdown-content-${$uid}`" class="content" :class="{ open }">
			<slot class="link" />
		</div>
	</div>
</template>

<script>
import uidMixin from "@mixins/uid";

export default {
	mixins: [uidMixin],
	data() {
		return {
			open: false,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.button {
	width: 100%;
	padding: var(--space-sm) var(--space-md);
	color: var(--color-white);
	cursor: pointer;
	background-color: var(--color-secondary);
	border: 1px solid var(--color-secondary);

	@include breakpoint(desktop) {
		width: 300px;
	}
}

.container {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.dropdown {
	position: relative;
	display: inline-block;
	width: 100%;

	&:focus {
		outline: 0;
	}

	@include breakpoint(desktop) {
		float: right;
		width: 300px;
	}
}

// Hidden by default
.content {
	position: absolute;
	z-index: var(--layer-dropdown);
	display: none;
	flex-direction: column;
	width: 100%;
	background-color: var(--color-gray-light);

	&.open {
		display: flex;
	}
	.link {
		display: inline-block;
		color: var(--color-black);
		word-break: break-word;
		white-space: normal;
		border-bottom: 0;

		&:not(:last-child) {
			border-bottom: 1px solid var(--color-gray);
		}

		&:hover {
			color: var(--color-secondary);
			background-color: var(--color-gray-light);
		}
	}

	@include breakpoint(desktop) {
		max-width: 300px;
	}
}
</style>
