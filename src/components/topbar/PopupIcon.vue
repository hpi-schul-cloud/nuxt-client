<template>
	<div v-outside-click="removePopup" class="popup">
		<v-btn
			:icon="icon"
			:color="color"
			class="icon-button"
			variant="text"
			density="comfortable"
			@click="popup"
		/>
		<div
			ref="popupContent"
			class="popup-content"
			:class="{ visible, 'expand-to-left': expandToLeft, centered }"
		>
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { vOnClickOutside } from "@vueuse/components";

const vOutsideClick = vOnClickOutside;

defineProps({
	icon: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		default: "rgba(var(--v-theme-secondary-darken-1))",
	},
	centered: {
		type: Boolean,
	},
});

const visible = ref(false);
const expandToLeft = ref(false);
const popupContent = ref<HTMLDivElement | null>(null);

onMounted(() => {
	if (popupContent.value !== null) {
		expandToLeft.value =
			popupContent.value.getBoundingClientRect().right > window.innerWidth + 10;
	}
});

const popup = () => {
	visible.value = !visible.value;
};

const removePopup = () => {
	visible.value = false;
};
</script>

<style lang="scss" scoped>
@import "~vuetify/settings";
@import "@/styles/mixins";

.popup {
	position: relative;
	display: inline-block;
	user-select: none;

	--arrow-size: var(--space-xs-2);
	--arrow-offset: 1em;
	--outer-arrow-size: calc(var(--arrow-size) + 1px);

	.popup-content {
		position: absolute;
		top: 100%;
		right: 0%;
		z-index: var(--layer-popover);
		visibility: hidden;
		background-color: rgba(var(--v-theme-white));
		border: 1px solid map-get($grey, lighten-3);
		border-radius: var(--radius-sm);

		@include breakpoint(tablet) {
			right: initial;
			left: 0%;
		}

		&.visible {
			visibility: visible;
		}

		&.expand-to-left {
			right: 0%;
			left: initial;
		}

		&.centered {
			right: initial;
			left: initial;
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
		border-color: transparent transparent map-get($grey, lighten-3) transparent;
		border-style: solid;
		border-width: var(--outer-arrow-size);

		@include breakpoint(tablet) {
			right: initial;
			left: calc(
				var(--arrow-offset) - (var(--outer-arrow-size) - var(--arrow-size))
			);
		}
	}

	.expand-to-left::before {
		@include breakpoint(tablet) {
			right: calc(
				var(--arrow-offset) - (var(--outer-arrow-size) - var(--arrow-size))
			);
			left: initial;
		}
	}

	.popup-content::after {
		position: absolute;
		top: calc(-2 * var(--arrow-size));
		right: var(--arrow-offset);
		margin-left: calc(-0.5 * var(--arrow-size));
		content: "";
		border-color: transparent transparent rgba(var(--v-theme-white)) transparent;
		border-style: solid;
		border-width: var(--arrow-size);

		@include breakpoint(tablet) {
			right: initial;
			left: var(--arrow-offset);
		}
	}

	.expand-to-left::after {
		@include breakpoint(tablet) {
			right: var(--arrow-offset);
			left: initial;
		}
	}

	.centered::before {
		right: initial;
		left: calc(
			var(--arrow-offset) - (var(--outer-arrow-size) - var(--arrow-size))
		);
	}

	.centered::after {
		right: initial;
		left: var(--arrow-offset);
	}
}
</style>
