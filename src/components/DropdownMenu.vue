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
		<div class="button">{{ title }}</div>
		<div :id="`dropdown-content-${$uid}`" class="content" :class="{ open }">
			<slot class="link" />
		</div>
	</div>
</template>

<script>
import uidMixin from "@mixins/uid";

export default {
	mixins: [uidMixin],
	props: {
		title: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			open: false,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

.button {
	padding: 16px;
	font-size: 16px;
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
	z-index: $layer-dropdown-z-index;
	display: none;
	flex-direction: column;
	background-color: #f9f9f9;

	&.open {
		display: flex;
	}
}
</style>
