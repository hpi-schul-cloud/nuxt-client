<template>
	<div v-click-outside="removePopup" class="popup" @click="popup">
		<base-icon-button
			:source="source"
			:icon="icon"
			:fill="fill"
			@click="popup"
		/>
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
.popup {
	position: relative;
	display: inline-block;
	user-select: none;

	--arrow-size: var(--space-xxs);
	--arrow-offset: 1em;
	--outer-arrow-size: calc(var(--arrow-size) + 1.5px);

	.popup-content {
		position: absolute;
		top: 100%;
		left: 0%;
		z-index: var(--layer-popover);
		visibility: hidden;
		background-color: var(--color-white);
		border: 1px solid var(--color-gray-light);
		border-radius: var(--radius-sm);

		&.visible {
			visibility: visible;
		}
	}

	.popup-content::before {
		position: absolute;
		top: calc(-2 * var(--outer-arrow-size));
		left: var(--arrow-offset);
		margin-left: calc(-1 * var(--outer-arrow-size));
		content: "";
		border-color: transparent transparent var(--color-gray-light) transparent;
		border-style: solid;
		border-width: var(--outer-arrow-size);
	}

	.popup-content::after {
		position: absolute;
		top: calc(-2 * var(--arrow-size));
		left: var(--arrow-offset);
		margin-left: calc(-1 * var(--arrow-size));
		content: "";
		border-color: transparent transparent var(--color-white) transparent;
		border-style: solid;
		border-width: var(--arrow-size);
	}
}
</style>
