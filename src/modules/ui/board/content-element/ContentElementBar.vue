<template>
	<div
		tabindex="-1"
		class="content-element-bar d-flex"
		:class="{
			'flex-row': hasRowStyle,
			'flex-column': !hasRowStyle,
		}"
	>
		<div v-if="$slots.menu" class="three-dot-menu">
			<slot name="menu" />
		</div>

		<div
			v-if="$slots.display"
			class="content-element-display"
			:class="{
				'content-element-display-list-board': hasRowStyle,
			}"
		>
			<slot name="display" />
		</div>

		<div
			v-if="
				$slots.title || $slots.element || $slots.subtitle || $slots.description
			"
			:class="{
				'bg-surface-light': props.hasGreyBackground === true,
				'content-element-bar-texts-list-board': hasRowStyle,
			}"
			class="content-element-bar-texts py-4"
		>
			<div
				v-if="$slots.title"
				class="content-element-title d-flex flex-row px-4 pb-0"
				:class="{
					'mr-10': hasSlotContent($slots.menu) && !$slots.display,
				}"
			>
				<div v-if="$slots.logo" class="logo-container mr-2">
					<slot name="logo" />
				</div>

				<v-icon v-if="icon" :icon="icon" size="20" class="mr-2" />

				<LineClamp
					class="content-element-title min-width-0"
					data-testid="content-element-title-slot"
				>
					<slot name="title" />
				</LineClamp>

				<div
					v-if="$slots.statusInfo"
					class="statusInfo"
					data-testid="status-info-slot"
				>
					<slot name="statusInfo" />
				</div>
			</div>

			<div
				v-if="$slots.element"
				class="pl-2 pr-3 mt-n1"
				:class="{ 'mr-10': hasSlotContent($slots.menu) }"
			>
				<slot name="element" />
			</div>

			<div v-if="$slots.subtitle" class="px-4">
				<slot name="subtitle" />
			</div>

			<div v-if="$slots.description" class="px-4">
				<slot name="description" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { LineClamp } from "@ui-line-clamp";
import { hasSlotContent } from "@util-vue";
import { PropType } from "vue";
import { IconProps } from "vuetify";

const props = defineProps({
	hasGreyBackground: {
		type: Boolean,
		required: false,
	},
	hasRowStyle: {
		type: Boolean,
		default: false,
	},
	icon: {
		type: String as PropType<IconProps["icon"]>,
		required: false,
		default: undefined,
	},
});
</script>

<style scoped lang="scss">
.content-element-title {
	font-family: var(--font-accent) !important;
	font-size: 1rem !important;
	font-weight: 700;

	:deep(a) {
		color: var(--v-black-base) !important;
		text-decoration: none;
	}
	:deep(a:hover) {
		text-decoration: underline;
	}
}
.content-element-bar-texts > div ~ div {
	padding-top: 8px;
}

.content-element-bar {
	position: relative;
}

.content-element-bar-texts-list-board {
	flex: 0 0 67%;
}

.content-element-display-list-board {
	flex: 0 0 33%;
}

.content-element-bar:hover {
	.content-element-title {
		text-decoration: underline;
	}

	.content-element-display {
		filter: brightness(80%);
	}
}

.three-dot-menu {
	position: absolute;
	right: 0.75rem;
	top: 0.75rem;
	z-index: 100;
}

.logo-container {
	width: 24px;
	height: 24px;
}
.statusInfo {
	margin-left: auto;
}

.min-width-0 {
	min-width: 0;
}
</style>
