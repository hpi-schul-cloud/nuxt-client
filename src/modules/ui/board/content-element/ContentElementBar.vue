<template>
	<div
		data-testid="content-element-bar-board"
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
			v-if="$slots.title || $slots.element || $slots.subtitle || $slots.description"
			:class="{
				'content-element-bar-texts-list-board': hasRowStyle,
				'interactive-cursor': isTextAreaActivatable,
				'content-element-texts-hoverable': isTextAreaHoverable,
				'content-element-texts-activatable': isTextAreaActivatable,
			}"
			class="content-element-bar-texts py-4"
			:tabindex="isTextAreaActivatable ? 0 : undefined"
			:role="isTextAreaActivatable ? 'button' : undefined"
			:aria-label="isTextAreaActivatable ? activatableAriaLabel : undefined"
			@click="onActivate"
			@keydown.enter.space="onActivate"
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

				<LineClamp class="content-element-title min-width-0" data-testid="content-element-title-slot">
					<slot name="title" />
				</LineClamp>

				<div v-if="$slots.statusInfo" class="status-info" data-testid="status-info-slot">
					<slot name="statusInfo" />
				</div>
			</div>

			<div v-if="$slots.element" class="pl-2 pr-3 mt-n1" :class="{ 'mr-10': hasSlotContent($slots.menu) }">
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
	hasRowStyle: {
		type: Boolean,
		default: false,
	},
	icon: {
		type: String as PropType<IconProps["icon"]>,
		required: false,
		default: undefined,
	},
	isTextAreaActivatable: {
		type: Boolean,
		default: false,
	},
	activatableAriaLabel: {
		type: String,
		required: false,
		default: undefined,
	},
	isTextAreaHoverable: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits<{
	(e: "activate", event: Event): void;
}>();

const onActivate = (event: Event) => {
	if (!props.isTextAreaActivatable) {
		return;
	}

	event.stopPropagation();
	emit("activate", event);
};
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
}

.content-element-bar-texts {
	background: var(--content-element-bg-overlay);
}

.content-element-bar-texts > div ~ div {
	padding-top: 8px;
}

.content-element-bar {
	position: relative;
}

.content-element-bar-texts-list-board {
	flex: 0 0 67%;
	min-width: 0;
}

.content-element-display-list-board {
	flex: 0 0 33%;
}

.three-dot-menu {
	position: absolute;
	right: 0.75rem;
	top: 0.75rem;
	z-index: var(--z-overlay);
}

.logo-container {
	width: 24px;
	height: 24px;
}
.status-info {
	margin-left: auto;
}

.min-width-0 {
	min-width: 0;
}

.interactive-cursor {
	cursor: pointer;
}
</style>

<style lang="scss">
.content-element-card:not(.content-element-card-edit-mode):hover .content-element-title,
.content-element-card:not(.content-element-card-edit-mode):hover .content-element-title a {
	text-decoration: underline;
}

.content-element-card.content-element-card-edit-mode:has(.content-element-title a:hover) .content-element-title,
.content-element-card.content-element-card-edit-mode:has(.content-element-title a:hover) .content-element-title a {
	text-decoration: underline;
}

.content-element-card.content-element-card-edit-mode:not(:has(.content-element-title a)):has(
		.content-element-texts-hoverable:hover
	)
	.content-element-title,
.content-element-card.content-element-card-edit-mode:not(:has(.content-element-title a)):has(
		.content-element-texts-hoverable:hover
	)
	.content-element-title
	a {
	text-decoration: underline;
}

.content-element-card:not(.content-element-card-edit-mode):hover .content-element-display {
	filter: brightness(80%);
}

.content-element-card.content-element-card-edit-mode:has(
		.content-element-display-activatable:hover,
		.content-element-texts-activatable:hover
	)
	.content-element-display {
	filter: brightness(80%);
}
</style>
