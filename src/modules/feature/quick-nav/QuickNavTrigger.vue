<template>
	<VBtn
		variant="text"
		rounded="lg"
		min-width="44"
		class="quick-nav-trigger text-none text-body-2"
		height="44"
		:aria-label="label"
		:aria-expanded="isOpen"
		aria-haspopup="dialog"
		aria-keyshortcuts="Control+K Meta+K"
		data-testid="quick-nav-trigger"
		@click="open"
	>
		<VIcon :icon="mdiMagnify" size="22" aria-hidden="true" />
		<span class="quick-nav-label" aria-hidden="true">
			<span class="quick-nav-label-clip">
				<span class="quick-nav-label-text">
					<span>{{ label }}</span>
					<kbd class="quick-nav-shortcut" data-testid="quick-nav-shortcut">{{ shortcutLabel }}</kbd>
				</span>
			</span>
		</span>
	</VBtn>
</template>

<script setup lang="ts">
import { useQuickNav } from "./QuickNav.composable";
import { mdiMagnify } from "@icons/material";
import { onKeyStroke } from "@vueuse/core";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { open, toggle, isOpen } = useQuickNav();

const isApple = computed(() => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
const shortcutLabel = computed(() => (isApple.value ? "⌘K" : t("feature.quickNav.shortcut.ctrlK")));
const label = computed(() => t("feature.quickNav.searchEverywhere"));

onKeyStroke(
	"k",
	(event) => {
		if (!(event.metaKey || event.ctrlKey)) return;

		// the browsers that bind ⌘K to the address bar must not win here
		event.preventDefault();
		// holding the keys repeats the event; only the first press toggles
		if (event.repeat) return;

		toggle();
	},
	{ eventName: "keydown" }
);
</script>

<style scoped>
.quick-nav-trigger {
	padding-inline: 11px;
	font-weight: normal;
	letter-spacing: normal;
}

.quick-nav-label {
	display: grid;
	grid-template-columns: 0fr;
	opacity: 0;
	transition:
		grid-template-columns 260ms cubic-bezier(0.22, 1, 0.36, 1),
		opacity 100ms ease-out;
}

.quick-nav-label-clip {
	min-width: 0;
	overflow: hidden;
}

.quick-nav-label-text {
	display: flex;
	align-items: center;
	gap: 12px;
	padding-inline-start: 8px;
	white-space: nowrap;
}

.quick-nav-shortcut {
	padding: 2px 5px;
	border: 1px solid rgba(var(--v-theme-on-surface), 0.16);
	border-radius: 4px;
	font: inherit;
	font-size: var(--text-xs);
	line-height: 1.25;
}

@media (min-width: 960px) {
	.quick-nav-trigger:focus-visible .quick-nav-label {
		grid-template-columns: 1fr;
		opacity: 1;
		transition-duration: 420ms, 240ms;
		transition-delay: 0ms, 80ms;
	}
}

@media (min-width: 960px) and (hover: hover) {
	.quick-nav-trigger:hover .quick-nav-label {
		grid-template-columns: 1fr;
		opacity: 1;
		transition-duration: 420ms, 240ms;
		transition-delay: 0ms, 80ms;
	}
}

@media (prefers-reduced-motion: reduce) {
	.quick-nav-trigger .quick-nav-label,
	.quick-nav-trigger:hover .quick-nav-label,
	.quick-nav-trigger:focus-visible .quick-nav-label {
		transition: none;
	}
}
</style>
