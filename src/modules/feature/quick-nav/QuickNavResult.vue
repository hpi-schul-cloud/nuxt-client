<template>
	<VListItem
		role="option"
		class="quick-nav-result"
		:class="{ 'quick-nav-show-all': entry.showsAll }"
		:tabindex="-1"
		rounded="lg"
		:active="isSelected"
		:aria-selected="isSelected"
		@click="emit('open')"
		@mousemove="emit('select')"
	>
		<template #prepend>
			<!-- a plain element rather than VAvatar, which Vuetify spaces differently from the icons -->
			<span
				v-if="entry.avatar"
				class="quick-nav-avatar"
				:class="[entry.avatar.colorClass, { 'quick-nav-avatar-light': entry.avatar.isLight }]"
				:style="entry.avatar.color ? { backgroundColor: entry.avatar.color } : undefined"
				aria-hidden="true"
				>{{ entry.avatar.initials }}</span
			>
			<VIcon v-else :icon="entry.icon" size="22" aria-hidden="true" />
		</template>
		<!-- one line: the context sits beside the title and only wraps below it when the title needs the room -->
		<VListItemTitle class="quick-nav-line">
			<span class="quick-nav-title">
				<template v-for="(part, index) in titleParts" :key="index">
					<mark v-if="part.isMatch" class="quick-nav-match">{{ part.text }}</mark>
					<template v-else>{{ part.text }}</template>
				</template>
				<span v-if="entry.isOverdue" class="quick-nav-badge" data-testid="quick-nav-overdue">{{
					t("pages.tasks.overdue")
				}}</span>
			</span>
			<span v-if="entry.subtitle" class="quick-nav-meta" data-testid="quick-nav-meta">{{ entry.subtitle }}</span>
		</VListItemTitle>
		<template #append>
			<VIcon
				v-if="!entry.showsAll"
				:icon="entry.target === '_blank' ? mdiOpenInNew : mdiArrowRight"
				size="18"
				color="primary"
				class="quick-nav-row-arrow"
				:class="{ 'quick-nav-row-arrow-visible': isSelected || entry.target === '_blank' }"
				aria-hidden="true"
			/>
		</template>
	</VListItem>
</template>

<script setup lang="ts">
import { matchRange } from "./QuickNav.composable";
import { QuickNavEntry } from "./types";
import { mdiArrowRight, mdiOpenInNew } from "@icons/material";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

/**
 * One line of the palette. A component of its own so that moving the selection re-renders only the
 * two lines whose selection changed, not every line of a category with hundreds of entries.
 */
const props = defineProps<{
	entry: QuickNavEntry;
	isSelected: boolean;
	/** already trimmed */
	query: string;
}>();

const { t } = useI18n();

const emit = defineEmits<{
	(e: "open"): void;
	(e: "select"): void;
}>();

type TitlePart = { text: string; isMatch: boolean };

/** Shows the user why a line matched, which is the difference between a list and an answer. */
const titleParts = computed((): TitlePart[] => {
	const { title } = props.entry;
	const range = matchRange(title, props.query);
	if (!range) return [{ text: title, isMatch: false }];

	// by characters, not by code units, because the range was measured that way
	const characters = [...title];
	const [start, end] = range;

	return [
		{ text: characters.slice(0, start).join(""), isMatch: false },
		{ text: characters.slice(start, end).join(""), isMatch: true },
		{ text: characters.slice(end).join(""), isMatch: false },
	].filter((part) => part.text.length > 0);
});
</script>

<style scoped>
.quick-nav-result {
	min-height: 40px;
	margin-block: 1px;
}

/* fingers need the full height that a pointer does not */
@media (max-width: 599px) {
	.quick-nav-result {
		min-height: 44px;
	}
}

/* the dialog's selection box stands in for Vuetify's own background on the selected and hovered line */
.quick-nav-result :deep(.v-list-item__overlay) {
	display: none;
}

.quick-nav-avatar {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	width: 24px;
	height: 24px;
	/* Vuetify leaves less room after an element than after an icon; this keeps the titles in line */
	margin-inline-end: 6px;
	border-radius: 6px;
	color: #fff;
	font-size: 11px;
	font-weight: bold;
	line-height: 1;
	white-space: nowrap;
	overflow: hidden;
}

/* black, not the theme's dark text: the light room and course colours were measured against black */
.quick-nav-avatar-light {
	color: #000;
}

/* a long title wraps in its own column; the context stays beside its first line */
.quick-nav-line {
	display: flex;
	align-items: baseline;
	column-gap: 16px;
}

.quick-nav-title {
	flex: 1 1 auto;
	min-width: 0;
}

/* context, not content: smaller and quieter than the title, kept to the right like a column */
.quick-nav-meta {
	flex: none;
	max-width: 40%;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: var(--text-sm);
	color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
	white-space: nowrap;
}

/*
 * Too narrow for a column beside the title (a phone): the context goes underneath as a second line,
 * instead of cutting it short and squeezing the title into several lines. A media query rather than a
 * container query: rows that Vue moves while the results change lost their layout in Chromium when
 * each row was a query container.
 */
@media (max-width: 599px) {
	.quick-nav-line {
		flex-direction: column;
		align-items: stretch;
	}

	.quick-nav-meta {
		max-width: none;
	}
}

.quick-nav-show-all :deep(.v-list-item-title) {
	font-size: var(--text-sm);
	color: rgb(var(--v-theme-primary));
}

.quick-nav-result .quick-nav-row-arrow {
	opacity: 0;
	transform: translateX(-4px);
	transition:
		opacity 120ms ease-out,
		transform 160ms var(--quick-nav-ease);
}

.quick-nav-result .quick-nav-row-arrow-visible,
.quick-nav-result:hover .quick-nav-row-arrow {
	opacity: 1;
	transform: none;
}

/* a fact about the task, kept small so it does not compete with the title it belongs to */
.quick-nav-badge {
	display: inline-block;
	margin-inline-start: 8px;
	padding: 0 6px;
	border-radius: 4px;
	background: rgba(var(--v-theme-error), 0.1);
	/* the theme's red is too light for small text on its own tint; a darker shade of it reads */
	color: color-mix(in srgb, rgb(var(--v-theme-error)) 75%, black);
	font-size: 0.75rem;
	font-weight: bold;
	line-height: 18px;
	vertical-align: 1px;
	white-space: nowrap;
}

.quick-nav-match {
	background: transparent;
	color: inherit;
	font-weight: bold;
}

@media (prefers-reduced-motion: reduce) {
	.quick-nav-result .quick-nav-row-arrow {
		transform: none;
	}
}
</style>
