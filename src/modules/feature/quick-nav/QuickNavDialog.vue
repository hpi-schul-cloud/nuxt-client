<template>
	<VDialog
		v-model="isOpen"
		:max-width="660"
		scrollable
		location="top"
		content-class="quick-nav-dialog"
		:aria-label="t('feature.quickNav.dialog')"
		data-testid="quick-nav-dialog"
		@after-leave="close"
		@click:outside="close"
	>
		<VCard>
			<div class="d-flex align-center ga-2 px-4 py-2 border-b">
				<VIcon :icon="mdiMagnify" aria-hidden="true" />
				<input
					:id="`quick-nav-${uid}-input`"
					ref="input"
					v-model="query"
					type="text"
					class="quick-nav-input"
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
					@keydown.up.prevent="moveSelection(-1)"
					@keydown.enter.prevent="openSelected"
					@keydown.esc.prevent="close"
				/>
				<VProgressCircular v-if="isLoading" indeterminate size="18" width="2" aria-hidden="true" />
			</div>

			<VCardText class="pa-0 quick-nav-results">
				<VList
					:id="`quick-nav-${uid}-results`"
					role="listbox"
					:aria-label="t('feature.quickNav.results')"
					density="compact"
					class="py-1"
				>
					<div
						v-for="(group, groupIndex) in groups"
						:key="group.label"
						role="group"
						:aria-labelledby="`quick-nav-${uid}-group-${groupIndex}`"
					>
						<VListSubheader :id="`quick-nav-${uid}-group-${groupIndex}`">{{ group.label }}</VListSubheader>
						<VListItem
							v-for="entry in group.entries"
							:id="`quick-nav-${uid}-${entry.id}`"
							:key="entry.id"
							role="option"
							:active="entry.id === selectedEntry?.id"
							:aria-selected="entry.id === selectedEntry?.id"
							:data-testid="`quick-nav-entry-${entry.id}`"
							@click="openEntry(entry)"
							@mousemove="select(entry.id)"
						>
							<template #prepend>
								<VIcon :icon="entry.icon" aria-hidden="true" />
							</template>
							<VListItemTitle>
								<template v-for="(part, index) in highlight(entry.title)" :key="index">
									<mark v-if="part.isMatch" class="quick-nav-match">{{ part.text }}</mark>
									<template v-else>{{ part.text }}</template>
								</template>
							</VListItemTitle>
							<VListItemSubtitle v-if="entry.subtitle">{{ entry.subtitle }}</VListItemSubtitle>
						</VListItem>
					</div>
				</VList>
				<p v-if="groups.length === 0" class="px-4 py-3 mb-0 text-medium-emphasis" data-testid="quick-nav-empty">
					{{ emptyMessage }}
				</p>
			</VCardText>

			<div class="d-sr-only" role="status" data-testid="quick-nav-status">{{ statusMessage }}</div>

			<div class="d-flex ga-4 px-4 py-2 border-t text-caption text-medium-emphasis">
				<span>{{ t("feature.quickNav.hint.move") }}</span>
				<span>{{ t("feature.quickNav.hint.open") }}</span>
				<span>{{ t("feature.quickNav.hint.close") }}</span>
			</div>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import { matchRange, useQuickNav } from "./QuickNav.composable";
import { QuickNavEntry } from "./types";
import { useUid } from "@/utils/uid";
import { mdiMagnify } from "@icons/material";
import { computed, nextTick, useTemplateRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();
const { uid } = useUid();

const {
	isOpen,
	query,
	groups,
	flatEntries,
	selectedEntry,
	placeholder,
	isLoading,
	hasFailed,
	moveSelection,
	select,
	close,
} = useQuickNav();

const input = useTemplateRef<HTMLInputElement>("input");

const emptyMessage = computed(() => (hasFailed.value ? t("feature.quickNav.failed") : t("feature.quickNav.empty")));

const statusMessage = computed(() => {
	if (query.value.trim().length === 0) return "";
	if (flatEntries.value.length === 0) return emptyMessage.value;

	return t("feature.quickNav.resultCount", { count: flatEntries.value.length });
});

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

type TitlePart = { text: string; isMatch: boolean };

/** Shows the user why a line matched, which is the difference between a list and an answer. */
const highlight = (title: string): TitlePart[] => {
	const range = matchRange(title, query.value.trim());
	if (!range) return [{ text: title, isMatch: false }];

	// by characters, not by code units, because the range was measured that way
	const characters = [...title];
	const [start, end] = range;

	return [
		{ text: characters.slice(0, start).join(""), isMatch: false },
		{ text: characters.slice(start, end).join(""), isMatch: true },
		{ text: characters.slice(end).join(""), isMatch: false },
	].filter((part) => part.text.length > 0);
};

const openEntry = (entry: QuickNavEntry): void => {
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
.quick-nav-input {
	flex: 1;
	border: none;
	outline: none;
	background: transparent;
	font-size: 1rem;
	min-width: 0;
}

.quick-nav-results {
	max-height: 60vh;
}

.quick-nav-match {
	background-color: rgba(var(--v-theme-primary), 0.16);
	color: inherit;
	border-radius: 2px;
}

:deep(.quick-nav-dialog) {
	align-self: flex-start;
	margin-top: 12vh;
}
</style>
