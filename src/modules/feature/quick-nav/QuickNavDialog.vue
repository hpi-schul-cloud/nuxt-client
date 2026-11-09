<template>
	<VDialog
		v-model="isOpen"
		:max-width="660"
		:height="xs ? '100dvh' : 560"
		:fullscreen="xs"
		scrollable
		location="top"
		content-class="quick-nav-dialog"
		transition="quick-nav-dialog-transition"
		:aria-label="t('feature.quickNav.dialog')"
		data-testid="quick-nav-dialog"
		@after-leave="close"
		@click:outside="close"
	>
		<VCard class="quick-nav-surface" :rounded="xs ? 0 : 'lg'">
			<h2 class="d-sr-only">{{ activeCategory?.label ?? t("feature.quickNav.dialog") }}</h2>
			<div class="quick-nav-search d-flex align-center ga-3 ps-6 pe-4">
				<VIcon :icon="mdiMagnify" class="quick-nav-search-icon" aria-hidden="true" color="primary" />
				<input
					:id="`quick-nav-${uid}-input`"
					ref="input"
					v-model="query"
					type="text"
					class="quick-nav-input"
					aria-autocomplete="list"
					autocomplete="off"
					spellcheck="false"
					role="combobox"
					aria-expanded="true"
					:aria-controls="`quick-nav-${uid}-results`"
					:aria-activedescendant="selectedEntry ? `quick-nav-${uid}-${selectedEntry.id}` : undefined"
					:placeholder="placeholder"
					:aria-label="placeholder"
					data-testid="quick-nav-input"
					@keydown.down.prevent="moveSelection(1)"
					@keydown.left="moveColumnFromKey($event, -1)"
					@keydown.right="moveColumnFromKey($event, 1)"
					@keydown.up.prevent="moveSelection(-1)"
					@keydown.enter.prevent="openSelected"
					@keydown.esc.stop.prevent="stepBack"
					@keydown.backspace="leaveScopeWhenEmpty"
				/>
				<VProgressCircular v-if="isLoading" indeterminate size="18" width="2" aria-hidden="true" />
				<VBtn
					v-if="query"
					:icon="mdiCloseCircle"
					variant="text"
					size="small"
					class="text-medium-emphasis"
					:aria-label="t('feature.quickNav.clear')"
					data-testid="quick-nav-clear"
					@click="clearQuery"
				/>
				<VBtn
					:icon="mdiClose"
					variant="text"
					:aria-label="t('common.labels.close')"
					data-testid="quick-nav-close"
					@click="close"
				/>
			</div>

			<div
				class="quick-nav-filters d-flex ga-1 ps-3 pe-4 py-2 border-b"
				:aria-label="t('feature.quickNav.filter')"
				role="group"
			>
				<VBtn
					size="small"
					min-height="40"
					:variant="!scope ? 'tonal' : 'text'"
					:color="!scope ? 'primary' : undefined"
					:aria-pressed="!scope"
					data-testid="quick-nav-filter-all"
					@click="setScope(undefined)"
					>{{ t("feature.quickNav.all") }}</VBtn
				>
				<VBtn
					v-for="category in categories"
					:key="category.scope"
					min-height="40"
					size="small"
					:variant="scope === category.scope ? 'tonal' : 'text'"
					:color="scope === category.scope ? 'primary' : undefined"
					:aria-pressed="scope === category.scope"
					:class="{ 'quick-nav-filter-empty': isEmptyCategory(category.scope) }"
					:aria-label="showsCounts ? `${category.label}, ${chipCountLabel(category.scope)}` : undefined"
					:data-testid="`quick-nav-filter-${category.scope}`"
					@click="setScope(category.scope)"
					>{{ category.label
					}}<span v-if="showsCounts" class="quick-nav-count ml-2">{{ chipCount(category.scope) }}</span></VBtn
				>
			</div>
			<VCardText ref="results" class="pa-0 quick-nav-results">
				<VAlert
					v-if="hasFailed"
					type="warning"
					variant="tonal"
					density="compact"
					class="quick-nav-failed mx-2 mt-2"
					data-testid="quick-nav-error"
				>
					{{ failedMessage }}
					<template #append>
						<VBtn variant="text" size="small" :loading="isLoading" data-testid="quick-nav-retry" @click="retry">
							{{ t("feature.quickNav.retry") }}
						</VBtn>
					</template>
				</VAlert>
				<p
					v-if="isLoading && (trimmedQuery || scope)"
					class="px-6 py-3 mb-0 text-medium-emphasis"
					data-testid="quick-nav-loading"
				>
					{{ t("feature.quickNav.loading") }}
				</p>
				<!-- outside the list on purpose: nothing here can be selected, it only says what will appear -->
				<section v-if="isFirstRun" class="quick-nav-first-run" data-testid="quick-nav-recent-placeholder">
					<h3 class="quick-nav-section-label">{{ t("feature.quickNav.group.recent") }}</h3>
					<p class="quick-nav-placeholder-line">{{ t("feature.quickNav.recentPlaceholder") }}</p>
				</section>
				<p v-if="onlyOffersCreating" class="px-6 pt-4 mb-0 text-medium-emphasis" data-testid="quick-nav-nothing-for">
					{{ nothingFoundFor }}
				</p>
				<VList
					:id="`quick-nav-${uid}-results`"
					ref="list"
					role="listbox"
					:aria-busy="isLoading"
					:aria-label="t('feature.quickNav.results')"
					density="compact"
					class="px-2 pt-0 pb-2"
					:class="{ 'quick-nav-overview': !trimmedQuery && !scope }"
				>
					<div
						v-if="selectionBox"
						class="quick-nav-selection-box rounded-lg"
						:class="{ 'quick-nav-selection-box-gliding': selectionBox.isGliding }"
						:style="selectionBox.style"
						aria-hidden="true"
					/>
					<!-- one block while searching and on a phone; the overview puts its recent lines on top and the rest in columns -->
					<div
						v-for="(block, columnIndex) in blocks"
						:key="columnIndex"
						class="quick-nav-column"
						:class="{ 'quick-nav-column-full': block.isFullWidth }"
						role="presentation"
					>
						<fieldset
							v-for="(group, groupIndex) in block.groups"
							:key="group.label"
							class="quick-nav-group"
							:aria-labelledby="`quick-nav-${uid}-group-${columnIndex}-${groupIndex}`"
						>
							<div class="quick-nav-group-header" role="presentation">
								<VListSubheader :id="`quick-nav-${uid}-group-${columnIndex}-${groupIndex}`">{{
									group.label
								}}</VListSubheader>
								<VBtn
									v-if="group.isRecent"
									variant="text"
									size="small"
									class="quick-nav-clear-recent"
									:aria-label="t('feature.quickNav.clearRecentLabel')"
									data-testid="quick-nav-clear-recent"
									@click="clearRecentAndRefocus"
									>{{ t("feature.quickNav.clearRecent") }}</VBtn
								>
							</div>
							<QuickNavResult
								v-for="entry in group.entries"
								:id="`quick-nav-${uid}-${entry.id}`"
								:key="entry.id"
								:entry="entry"
								:is-selected="entry.id === selectedEntry?.id"
								:query="isEcho(entry) ? '' : trimmedQuery"
								:data-testid="`quick-nav-entry-${entry.id}`"
								@open="openEntry(entry)"
								@select="select(entry.id)"
							/>
						</fieldset>
					</div>
				</VList>
				<div v-if="isEmpty" class="quick-nav-empty px-6 py-8" data-testid="quick-nav-empty">
					<VIcon :icon="mdiMagnify" size="32" class="mb-3" aria-hidden="true" />
					<p class="font-weight-bold mb-2">{{ emptyMessage }}</p>
					<p class="text-medium-emphasis mb-4">{{ t("feature.quickNav.emptyHelp") }}</p>
					<VBtn v-if="query" variant="tonal" color="primary" @click="clearQuery">{{
						t("feature.quickNav.clear")
					}}</VBtn>
					<VBtn v-if="hasResultsOutsideScope" variant="text" @click="setScope(undefined)">{{
						t("feature.quickNav.all")
					}}</VBtn>
				</div>
				<!-- one quiet line of what people rarely find out by themselves -->
				<p v-if="isFirstRun" class="quick-nav-tips" data-testid="quick-nav-tips">{{ t("feature.quickNav.tip") }}</p>
			</VCardText>

			<footer
				class="quick-nav-footer d-flex align-center flex-wrap ga-3 px-6 py-3 border-t"
				:class="{ 'quick-nav-footer-quiet': !resultMessage || isEmpty || isLoading || onlyOffersCreating }"
			>
				<!-- what is shown and what is announced differ: the warning above already shows a failure -->
				<span v-if="!isEmpty && !isLoading && !onlyOffersCreating" class="text-body-2" aria-hidden="true">{{
					resultMessage
				}}</span>
				<output class="d-sr-only" aria-live="polite" data-testid="quick-nav-status">{{ statusMessage }}</output>
				<VSpacer />
				<div class="quick-nav-keyboard d-flex ga-4 text-caption text-medium-emphasis" aria-hidden="true">
					<i18n-t v-for="hint in keyboardHints" :key="hint.keypath" :keypath="hint.keypath" tag="span" scope="global">
						<template #keys>
							<kbd v-for="key in hint.keys" :key="key" class="quick-nav-key">{{ key }}</kbd>
						</template>
					</i18n-t>
				</div>
			</footer>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import { CREATE_ROOM_NAMED_ID, useQuickNav } from "./QuickNav.composable";
import QuickNavResult from "./QuickNavResult.vue";
import { QuickNavEntry, QuickNavKind, QuickNavScope } from "./types";
import { useUid } from "@/utils/uid";
import { mdiClose, mdiCloseCircle, mdiMagnify } from "@icons/material";
import { useResizeObserver } from "@vueuse/core";
import { ComponentPublicInstance, computed, nextTick, ref, useTemplateRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";

const { t, locale } = useI18n();
const router = useRouter();
const { xs } = useDisplay();
const { uid } = useUid();

const {
	isOpen,
	query,
	trimmedQuery,
	scope,
	categories,
	activeCategory,
	countIn,
	retry,
	groups,
	flatEntries,
	selectedEntry,
	resultCount,
	matchCount,
	hasResultsOutsideScope,
	failedCategories,
	placeholder,
	isLoading,
	hasFailed,
	failedScopes,
	moveSelection,
	moveColumn,
	blocks,
	columns,
	columnCount,
	isFirstRun,
	select,
	remember,
	clearRecent,
	close,
} = useQuickNav();

const input = useTemplateRef<HTMLInputElement>("input");

const setScope = async (value: QuickNavScope | undefined) => {
	scope.value = value;
	await nextTick();
	input.value?.focus();
};

const clearQuery = async () => {
	query.value = "";
	await nextTick();
	input.value?.focus();
};

// the group and the button go away together, so the field takes the focus back
const clearRecentAndRefocus = async (): Promise<void> => {
	clearRecent();
	await nextTick();
	input.value?.focus();
};

/** lines that repeat the query rather than match it; marking the query in them would claim a hit */
const isEcho = (entry: QuickNavEntry): boolean =>
	entry.kind === QuickNavKind.SHOW_ALL || entry.id === CREATE_ROOM_NAMED_ID;

/** Esc goes back one level: out of a category first, then out of the palette */
const stepBack = (): void => {
	if (scope.value) {
		void setScope(undefined);
		return;
	}
	close();
};

// like deleting past the start of a search field's token; nothing is lost, the query is empty
const leaveScopeWhenEmpty = (event: KeyboardEvent): void => {
	if (!scope.value || query.value.length > 0) return;

	event.preventDefault();
	void setScope(undefined);
};

const showsCounts = computed(() => trimmedQuery.value.length > 0 && !isLoading.value);

// a category with no hits stays clickable, but should not read as loudly as one with hits
const isEmptyCategory = (value: QuickNavScope) => showsCounts.value && countIn(value) === 0;

const isEmpty = computed(() => groups.value.length === 0 && !isLoading.value && !hasFailed.value);

// the overview stands in columns from this width on, which the arrow keys follow
watch(
	xs,
	(isPhone) => {
		columnCount.value = isPhone ? 1 : 2;
	},
	{ immediate: true }
);

// only reached with an empty field (the overview), so the caret has nowhere to move anyway
const moveColumnFromKey = (event: KeyboardEvent, direction: 1 | -1): void => {
	if (moveColumn(direction)) event.preventDefault();
};

const results = useTemplateRef<ComponentPublicInstance>("results");

// a new query or category starts at the top, not wherever the previous list was scrolled to
watch([trimmedQuery, scope], () => {
	const element: HTMLElement | undefined = results.value?.$el;
	if (element) element.scrollTop = 0;
});

// Esc leaves a category before it closes the palette, so the hint says which of the two comes next
const keyboardHints = computed(() => [
	{ keypath: "feature.quickNav.hint.move", keys: columns.value.length > 1 ? ["↑", "↓", "←", "→"] : ["↑", "↓"] },
	{ keypath: "feature.quickNav.hint.open", keys: ["↵"] },
	{ keypath: scope.value ? "feature.quickNav.hint.back" : "feature.quickNav.hint.close", keys: ["Esc"] },
]);

// a category that could not be loaded has no count to give; a 0 there would be a false "nothing"
const chipCount = (value: QuickNavScope) =>
	failedScopes.value.includes(value) && countIn(value) === 0 ? "–" : countIn(value);
const chipCountLabel = (value: QuickNavScope) =>
	chipCount(value) === "–"
		? t("feature.quickNav.notLoaded")
		: t("feature.quickNav.resultCount", { count: countIn(value) });

/** nothing was found, and the only line left is the offer to create a room under that name */
const onlyOffersCreating = computed(
	() => trimmedQuery.value.length > 0 && !isLoading.value && resultCount.value === 0 && groups.value.length > 0
);
const nothingFoundFor = computed(() => t("feature.quickNav.nothingFoundFor", { query: trimmedQuery.value }));

const failedMessage = computed(() =>
	t("feature.quickNav.failedSources", {
		sources: new Intl.ListFormat(locale.value, { type: "conjunction" }).format(failedCategories.value),
	})
);

const emptyMessage = computed(() => t("feature.quickNav.empty"));

const resultMessage = computed(() => {
	if (trimmedQuery.value.length === 0 && !scope.value) return "";
	if (onlyOffersCreating.value) return nothingFoundFor.value;
	if (resultCount.value === 0) return emptyMessage.value;
	if (resultCount.value < matchCount.value) {
		return t("feature.quickNav.resultCountOf", { count: resultCount.value, total: matchCount.value });
	}

	return t("feature.quickNav.resultCount", { count: resultCount.value });
});

// the failure is not repeated here: the warning announces itself once, as an alert
const statusMessage = computed(() => (isLoading.value ? t("feature.quickNav.loading") : resultMessage.value));

// opened from code rather than a Vuetify activator, so Vuetify does not return focus on close
let focusedBeforeOpening: HTMLElement | null = null;

watch(isOpen, async (opened) => {
	if (!opened) {
		focusedBeforeOpening?.focus();
		focusedBeforeOpening = null;
		return;
	}

	focusedBeforeOpening = document.activeElement instanceof HTMLElement ? document.activeElement : null;
	// VDialog mounts its content only when it opens, so the field can only be focused afterwards
	await nextTick();
	input.value?.focus();
});

// focus stays in the field, so the browser does not scroll the highlighted option along by itself
watch(
	() => selectedEntry.value?.id,
	async (id) => {
		if (!id) return;

		await nextTick();
		document.getElementById(`quick-nav-${uid.value}-${id}`)?.scrollIntoView({ block: "nearest" });
	}
);

const list = useTemplateRef<ComponentPublicInstance>("list");
const selectionBox = ref<{ style: Record<string, string>; isGliding: boolean }>();

/**
 * One box behind the rows that slides to the selected line, so the eye can follow the arrow
 * keys instead of searching for the new selection. It jumps instead when the lines themselves
 * changed, because then there is no "from" worth showing.
 */
const placeSelectionBox = async (isGliding: boolean) => {
	await nextTick();
	const row = selectedEntry.value && document.getElementById(`quick-nav-${uid.value}-${selectedEntry.value.id}`);
	if (!row) {
		selectionBox.value = undefined;
		return;
	}

	selectionBox.value = {
		isGliding: isGliding && selectionBox.value !== undefined,
		style: {
			transform: `translate(${row.offsetLeft}px, ${row.offsetTop}px)`,
			width: `${row.offsetWidth}px`,
			height: `${row.offsetHeight}px`,
		},
	};
};

watch([() => selectedEntry.value?.id, flatEntries], ([, entries], [, previousEntries]) =>
	placeSelectionBox(entries === previousEntries)
);

// wrapping lines change the row sizes, e.g. when the phone is turned
useResizeObserver(
	computed(() => list.value?.$el),
	() => placeSelectionBox(false)
);

const openEntry = (entry: QuickNavEntry): void => {
	if (entry.showsAll) {
		void setScope(entry.showsAll);
		return;
	}

	remember(entry);
	close();

	if (entry.action) {
		entry.action();
		return;
	}
	if (entry.to) {
		void router.push(entry.to);
		return;
	}
	if (entry.href && entry.target === "_blank") {
		window.open(entry.href, "_blank", "noopener");
		return;
	}
	if (entry.href) {
		window.location.assign(entry.href);
	}
};

const openSelected = (): void => {
	if (selectedEntry.value) openEntry(selectedEntry.value);
};
</script>

<style scoped>
.quick-nav-search {
	min-height: 64px;
	flex-shrink: 0;
}

.quick-nav-search:focus-within {
	box-shadow: inset 0 -2px rgb(var(--v-theme-primary));
}

/* the field's text starts in the same column as the titles of the lines below */
.quick-nav-search-icon {
	margin-inline-end: -6px;
}

.quick-nav-input {
	flex: 1;
	border: none;
	outline: none;
	background: transparent;
	color: inherit;
	caret-color: rgb(var(--v-theme-primary));
	/* the field is what the whole dialog is about, so it reads larger than the results */
	font-size: var(--text-lg);
	min-height: 48px;
	min-width: 0;
}

.quick-nav-input::placeholder {
	color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
	opacity: 1;
}

.quick-nav-filters {
	/* one row that scrolls sideways, so the results start at the same height on every screen */
	overflow-x: auto;
	scrollbar-width: none;
	flex-shrink: 0;
}

/* body type rather than the condensed button face: these switch what the whole list shows */
.quick-nav-filters :deep(.v-btn) {
	flex-shrink: 0;
	font-family: var(--font-primary);
	font-weight: normal;
	font-size: 0.875rem;
	letter-spacing: normal;
}

.quick-nav-filters :deep(.v-btn[aria-pressed="true"]) {
	font-weight: bold;
}

.quick-nav-filter-empty {
	color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}

.quick-nav-key {
	display: inline-block;
	min-width: 20px;
	margin-inline-end: 4px;
	padding: 0 4px;
	border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
	border-bottom-width: 2px;
	border-radius: 4px;
	background: rgb(var(--v-theme-surface));
	color: rgb(var(--v-theme-on-surface));
	font-family: inherit;
	text-align: center;
	line-height: 18px;
}

.quick-nav-results :deep(.v-list) {
	position: relative;
}

.quick-nav-selection-box {
	position: absolute;
	top: 0;
	left: 0;
	/* a tint, not a fill: the title keeps its own colour so the bold match still stands out */
	background: rgba(var(--v-theme-primary), 0.08);
	pointer-events: none;
}

.quick-nav-selection-box-gliding {
	transition:
		transform 160ms var(--quick-nav-ease),
		width 160ms var(--quick-nav-ease),
		height 160ms var(--quick-nav-ease);
}

.quick-nav-count {
	font-variant-numeric: tabular-nums;
	font-weight: normal;
	opacity: var(--v-medium-emphasis-opacity);
}

.quick-nav-results {
	flex: 1;
	min-height: 0;
	overscroll-behavior: contain;
	/* lets the tips settle at the bottom of the space instead of floating under the last group */
	display: flex;
	flex-direction: column;
}

/* the column only places the tips; it must never squeeze the list itself */
.quick-nav-results > * {
	flex-shrink: 0;
}

/* the same label as the group headers in the list, for the two blocks that live outside it */
.quick-nav-section-label {
	margin: 0;
	font-family: var(--font-primary);
	padding: 16px 0 8px;
	font-size: 0.75rem;
	font-weight: bold;
	line-height: 16px;
	letter-spacing: 0.02em;
	color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}

.quick-nav-first-run {
	/* the label and text line up with the group headers and row icons below, at 24px */
	padding-inline: 24px;
	padding-bottom: 8px;
}

.quick-nav-placeholder-line {
	margin: 0;
	padding-block: 2px 8px;
	font-size: 0.875rem;
	color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}

.quick-nav-tips {
	margin: auto 0 0;
	padding: 8px 24px 16px;
	font-size: var(--text-sm);
	color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}

.quick-nav-results :deep(.v-list-item-title) {
	font-size: var(--text-md);
	line-height: var(--line-height-xl);
}

.quick-nav-results :deep(.v-list-item-subtitle) {
	font-size: var(--text-sm);
	line-height: var(--line-height-xl);
}

.quick-nav-results :deep(.v-list-item-title),
.quick-nav-results :deep(.v-list-item-subtitle) {
	white-space: normal;
	overflow-wrap: anywhere;
}

/* small, bold and quiet: a label for the group, never mistaken for a line of it */
/*
 * Spacing, on a 4px grid: 16 from the filters to the first header, 8 from a header to its lines,
 * 24 from the last line of a group to the next header, the same inside a column and between blocks.
 */
.quick-nav-results :deep(.v-list-subheader) {
	min-height: 0;
	padding-top: 16px;
	padding-bottom: 8px;
	line-height: 16px;
	font-size: 0.75rem;
	font-weight: bold;
	letter-spacing: 0.02em;
	color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}

/* the button sits on the header line without making that header taller than the others */
.quick-nav-group-header {
	position: relative;
}

/* quiet like the header it sits in: a way out of the history, not an action to draw the eye */
.quick-nav-clear-recent {
	position: absolute;
	/* centred on the 16px label line below the 16px top padding */
	top: 14px;
	/* the label ends where the arrows of the lines end */
	right: 10px;
	height: 20px !important;
	padding-inline: 6px !important;
	font-family: var(--font-primary);
	font-size: 0.75rem;
	font-weight: normal;
	letter-spacing: normal;
	color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}

.quick-nav-group {
	border: 0;
	margin: 0;
	padding: 0;
	min-width: 0;
}

.quick-nav-group + .quick-nav-group {
	margin-top: 8px;
}

.quick-nav-empty {
	text-align: center;
	max-width: 46ch;
	margin: auto;
}

.quick-nav-footer {
	background: rgb(var(--v-theme-surface-light));
}

/* the tonal warning writes in its own orange, which is far below readable on its tint; the icon keeps the colour */
.quick-nav-failed :deep(.v-alert__content),
.quick-nav-failed :deep(.v-alert__append) {
	color: rgb(var(--v-theme-on-surface));
}

.quick-nav-footer {
	flex-shrink: 0;
	min-height: 48px;
}

.quick-nav-surface {
	--quick-nav-ease: cubic-bezier(0.16, 1, 0.3, 1);
}

@media (prefers-reduced-motion: reduce) {
	.quick-nav-selection-box-gliding {
		transition: none;
	}
}

.quick-nav-surface :deep(::selection) {
	background: rgba(var(--v-theme-primary), 0.2);
}

.quick-nav-column-full {
	grid-column: 1 / -1;
}

@media (min-width: 600px) {
	.quick-nav-overview {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		align-items: start;
		column-gap: 8px;
		row-gap: 8px;
	}
}

/* high contrast drops backgrounds and shadows, which is what the selection and the focus line are drawn with */
@media (forced-colors: active) {
	.quick-nav-selection-box {
		outline: 2px solid Highlight;
		outline-offset: -2px;
	}

	.quick-nav-search:focus-within {
		outline: 2px solid Highlight;
		outline-offset: -2px;
	}
}

/* zoomed in or a phone on its side: the results need the room more than the footer does */
@media (max-height: 500px) {
	.quick-nav-footer {
		position: absolute;
		width: 1px;
		height: 1px;
		min-height: 0;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
		padding: 0 !important;
		border: 0 !important;
	}
}

/* on a phone the key hints are gone, so a footer with nothing to say is only a grey bar in the thumb's way */
@media (max-width: 599px) {
	.quick-nav-footer-quiet {
		position: absolute;
		width: 1px;
		height: 1px;
		min-height: 0;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
		padding: 0 !important;
		border: 0 !important;
	}
}

@media (max-width: 599px) {
	.quick-nav-surface {
		height: 100dvh;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.quick-nav-footer .quick-nav-keyboard {
		display: none !important;
	}
}
</style>

<style>
/* not scoped: Vuetify applies the transition classes to its own overlay content */
.quick-nav-dialog-transition-enter-active {
	transition:
		opacity 160ms ease-out,
		transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
}

.quick-nav-dialog-transition-leave-active {
	transition: opacity 120ms ease-in;
}

.quick-nav-dialog-transition-enter-from,
.quick-nav-dialog-transition-leave-to {
	opacity: 0;
}

/* drops in from where it is anchored rather than growing out of the middle of the screen */
.quick-nav-dialog-transition-enter-from {
	transform: translateY(-8px);
}

@media (max-width: 599px), (prefers-reduced-motion: reduce) {
	.quick-nav-dialog-transition-enter-from {
		transform: none;
	}
}
</style>
