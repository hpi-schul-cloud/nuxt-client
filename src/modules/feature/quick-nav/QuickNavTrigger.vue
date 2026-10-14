<template>
	<VBtn
		v-if="isTabletOrBigger"
		variant="outlined"
		rounded="pill"
		class="quick-nav-trigger text-none text-medium-emphasis px-3"
		:aria-label="t('feature.quickNav.placeholder')"
		data-testid="quick-nav-trigger"
		@click="open"
	>
		<VIcon :icon="mdiMagnify" start aria-hidden="true" />
		<span class="quick-nav-trigger-label">{{ t("feature.quickNav.placeholder") }}</span>
		<kbd class="quick-nav-shortcut ml-3">{{ shortcutLabel }}</kbd>
	</VBtn>
	<VBtn
		v-else
		:icon="mdiMagnify"
		variant="text"
		:aria-label="t('feature.quickNav.placeholder')"
		data-testid="quick-nav-trigger"
		@click="open"
	/>
</template>

<script setup lang="ts">
import { useQuickNav } from "./QuickNav.composable";
import { mdiMagnify } from "@icons/material";
import { onKeyStroke } from "@vueuse/core";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const { t } = useI18n();
const { mdAndUp: isTabletOrBigger } = useDisplay();
const { open, toggle } = useQuickNav();

const isApple = computed(() => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));

/** what the key actually is on this machine, so the hint is not a lie on either platform */
const shortcutLabel = computed(() => (isApple.value ? "⌘K" : t("feature.quickNav.shortcut.ctrlK")));

onKeyStroke(
	"k",
	(event) => {
		if (!(event.metaKey || event.ctrlKey)) return;

		// the browsers that bind ⌘K to the address bar must not win here
		event.preventDefault();
		toggle();
	},
	{ eventName: "keydown" }
);
</script>

<style scoped>
.quick-nav-trigger {
	max-width: 320px;
}

.quick-nav-trigger-label {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.quick-nav-shortcut {
	border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
	border-radius: 4px;
	padding: 0 4px;
	font-size: 0.7rem;
	line-height: 1.4;
}
</style>
