<template>
	<VBtn
		v-if="xs"
		variant="text"
		rounded="lg"
		:icon="mdiMagnify"
		:aria-label="label"
		:aria-expanded="isOpen"
		aria-haspopup="dialog"
		aria-keyshortcuts="Control+K Meta+K"
		data-testid="quick-nav-trigger"
		@click="open(pageScope)"
	/>
	<!-- Looks like a search field, but is a button: typing happens in the dialog it opens. -->
	<button
		v-else
		type="button"
		class="quick-nav-field"
		:aria-expanded="isOpen"
		aria-haspopup="dialog"
		aria-keyshortcuts="Control+K Meta+K"
		data-testid="quick-nav-trigger"
		@click="open(pageScope)"
	>
		<VIcon :icon="mdiMagnify" size="20" class="quick-nav-field-icon" aria-hidden="true" />
		<span class="quick-nav-field-label" data-testid="quick-nav-trigger-label">{{ label }}</span>
		<kbd class="quick-nav-shortcut" aria-hidden="true" data-testid="quick-nav-shortcut">{{ shortcutLabel }}</kbd>
	</button>
</template>

<script setup lang="ts">
import { useQuickNav } from "./QuickNav.composable";
import type { QuickNavScope } from "./types";
import { mdiMagnify } from "@icons/material";
import { onKeyStroke } from "@vueuse/core";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";

const { t } = useI18n();
const { xs } = useDisplay();
const route = useRoute();
const { open, toggle, isOpen } = useQuickNav();

// On a list page, searching starts in that list; everywhere else it searches across everything.
const PAGE_SCOPES: Partial<Record<string, QuickNavScope>> = {
	rooms: "rooms",
	// the sidebar opens the course tiles; the list of all courses is one click further
	"course-room-overview": "courses",
	"course-room-list": "courses",
	tasks: "tasks",
};

const pageScope = computed(() => PAGE_SCOPES[String(route.name ?? "")]);

// On a list page, the same words as the field in the palette it opens. Elsewhere a shorter form of the
// palette's "Nach Räumen, Kursen oder Aufgaben suchen", which would not fit the field in the top bar.
const label = computed(() =>
	pageScope.value ? t(`feature.quickNav.placeholder.${pageScope.value}`) : t("feature.quickNav.triggerLabel")
);

const isApple = computed(() => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
const shortcutLabel = computed(() => (isApple.value ? "⌘K" : t("feature.quickNav.shortcut.ctrlK")));

onKeyStroke(
	"k",
	(event) => {
		if (!(event.metaKey || event.ctrlKey)) return;

		// the browsers that bind ⌘K to the address bar must not win here
		event.preventDefault();
		// holding the keys repeats the event; only the first press toggles
		if (event.repeat) return;

		toggle(pageScope.value);
	},
	{ eventName: "keydown" }
);
</script>

<style lang="scss" scoped>
.quick-nav-field {
	display: flex;
	gap: 10px;
	align-items: center;
	width: 100%;
	min-width: 0;
	height: 40px;
	padding-inline: 12px 8px;
	font: inherit;
	font-size: var(--text-md);
	/* the visible text is the button's only name, so it needs full text contrast, not placeholder grey */
	color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
	text-align: start;
	cursor: pointer;
	background-color: rgba(var(--v-theme-on-surface), 0.04);
	border: thin solid rgba(var(--v-theme-on-surface), 0.24);
	border-radius: 8px;
	transition:
		background-color 150ms ease-out,
		border-color 150ms ease-out;

	&:hover {
		background-color: rgba(var(--v-theme-on-surface), 0.06);
		border-color: rgba(var(--v-theme-on-surface), 0.4);
	}

	&:focus-visible {
		outline: 2px solid rgb(var(--v-theme-primary));
		outline-offset: 2px;
	}
}

.quick-nav-field-icon {
	flex: none;
}

.quick-nav-field-label {
	flex: 1;
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.quick-nav-shortcut {
	flex: none;
	padding: 2px 6px;
	font: inherit;
	font-size: var(--text-xs);
	line-height: var(--line-height-md);
	background-color: rgb(var(--v-theme-surface));
	border: thin solid rgba(var(--v-theme-on-surface), 0.16);
	border-radius: 4px;
}

@media (prefers-reduced-motion: reduce) {
	.quick-nav-field {
		transition: none;
	}
}
</style>
