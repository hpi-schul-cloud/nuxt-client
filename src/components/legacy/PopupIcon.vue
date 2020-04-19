<template>
	<div v-click-outside="removePopup" class="popup">
		<base-button class="icon-button" design="text icon" @click="popup">
			<base-icon :source="source" :icon="icon" :fill="fill" />
		</base-button>

		<div class="popup-content" :class="{ visible }">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		source: {
			type: String,
			required: true,
		},
		icon: {
			type: String,
			required: true,
		},
		fill: {
			type: String,
			default: "var(--color-tertiary-dark)",
		},
	},
	data() {
		return {
			visible: false,
		};
	},
	methods: {
		popup() {
			this.visible = !this.visible;
		},
		removePopup() {
			this.visible = false;
		},
	},
};
</script>

<style lang="scss" scoped>
/* stylelint-disable sh-waqar/declaration-use-variable */
@import "@styles";

.popup {
	position: relative;
	display: inline-block;
	user-select: none;

	--arrow-size: var(--space-xs-2);
	--arrow-offset: 1em;
	--outer-arrow-size: calc(var(--arrow-size) + 1px);

	.icon-button {
		font-size: 20px;
	}

	:focus-within {
		.icon-button {
			background-color: var(--color-gray-light);
		}
	}

	.popup-content {
		position: absolute;
		top: 100%;
		right: 0%;
		z-index: var(--layer-popover);
		visibility: hidden;
		background-color: var(--color-white);
		border: 1px solid var(--color-gray-light);
		border-radius: var(--radius-sm);

		@include breakpoint(tablet) {
			right: initial;
			left: 0%;
		}

		&.visible {
			visibility: visible;
		}
	}

	.popup-content::before {
		position: absolute;
		top: calc(-2 * var(--outer-arrow-size));
		right: calc(
			var(--arrow-offset) - (var(--outer-arrow-size) - var(--arrow-size))
		);
		margin-left: calc(-0.5 * var(--arrow-size));
		content: "";
		border-color: transparent transparent var(--color-gray-light) transparent;
		border-style: solid;
		border-width: var(--outer-arrow-size);

		@include breakpoint(tablet) {
			right: initial;
			left: calc(
				var(--arrow-offset) - (var(--outer-arrow-size) - var(--arrow-size))
			);
		}
	}

	.popup-content::after {
		position: absolute;
		top: calc(-2 * var(--arrow-size));
		right: var(--arrow-offset);
		margin-left: calc(-0.5 * var(--arrow-size));
		content: "";
		border-color: transparent transparent var(--color-white) transparent;
		border-style: solid;
		border-width: var(--arrow-size);

		@include breakpoint(tablet) {
			right: initial;
			left: var(--arrow-offset);
		}
	}
}
</style>
