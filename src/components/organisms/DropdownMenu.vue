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
			<slot name="header">
				<base-button size="small">{{ title }}</base-button>
			</slot>
		</div>
		<div :id="`dropdown-content-${$uid}`" class="content" :class="{ open }">
			<ul>
				<li
					v-for="(item, index) of items"
					:key="index"
					@click="$emit('input', item)"
				>
					{{ item.label }}
				</li>
			</ul>
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
		items: {
			type: Array,
			default: () => [],
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
@import "@styles";

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
	color: var(--color-black);
	background-color: var(--color-white);
	box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),
		0 2px 4px -1px rgba(0, 0, 0, 0.2);

	ul {
		li {
			padding: var(--space-sm);
			list-style: none;
			cursor: pointer;
			&:hover {
				background-color: var(--color-gray-light);
			}
		}
	}

	&.open {
		display: flex;
	}
}
</style>
