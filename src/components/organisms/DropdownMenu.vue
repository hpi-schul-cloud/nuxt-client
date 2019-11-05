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
			<slot name="header"></slot>
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
	padding: var(--space-sm) var(--space-md);
	cursor: pointer;
	border: 1px solid black;
}

.dropdown {
	position: relative;
	display: inline-block;
}

// Hidden by default
.content {
	position: absolute;
	z-index: var(--layer-dropdown);
	display: none;
	flex-direction: column;
	background-color: var(--color-gray-light);

	&.open {
		display: flex;
	}
}
</style>
