<template>
	<nav
		ref="panel"
		class="card-toc"
		:aria-label="t('components.board.dialog.detail-view.tableOfContents.title')"
		data-testid="card-toc"
	>
		<h2 class="card-toc__title">{{ t("components.board.dialog.detail-view.tableOfContents.title") }}</h2>
		<ol>
			<li v-for="section in sections" :key="section.columnId">
				<h3 class="card-toc__column" :title="section.title">{{ section.title }}</h3>
				<ol>
					<li v-for="card in section.cards" :key="card.cardId">
						<RouterLink
							class="card-toc__item card-toc__card"
							:class="{ 'card-toc__card--current': card.isCurrent }"
							:to="card.route"
							:aria-current="card.isCurrent ? 'page' : undefined"
							:title="card.title"
							:data-testid="`card-toc-card-${card.cardId}`"
							@click="emit('select:card')"
						>
							<span class="card-toc__label">{{ card.title }}</span>
						</RouterLink>
						<template v-if="card.isCurrent">
							<ol v-if="elements.length > 0" class="card-toc__elements">
								<li v-for="element in elements" :key="element.id">
									<button
										type="button"
										class="card-toc__item card-toc__element"
										:class="{ 'card-toc__element--active': element.id === activeElementId }"
										:aria-current="element.id === activeElementId ? 'location' : undefined"
										:title="element.label"
										:data-testid="`card-toc-element-${element.id}`"
										@click="emit('select:element', element.id)"
									>
										<VIcon :icon="element.icon" size="small" aria-hidden="true" />
										<span class="card-toc__label">{{ element.label }}</span>
									</button>
								</li>
							</ol>
							<p v-else class="card-toc__empty" data-testid="card-toc-empty">
								{{ t("components.board.dialog.detail-view.tableOfContents.empty") }}
							</p>
						</template>
					</li>
				</ol>
			</li>
		</ol>
	</nav>
</template>

<script setup lang="ts">
import type { TableOfContentsElement, TableOfContentsSection } from "./cardTableOfContents.composable";
import { onMounted, useTemplateRef } from "vue";
import { useI18n } from "vue-i18n";

defineProps<{
	sections: TableOfContentsSection[];
	elements: TableOfContentsElement[];
	activeElementId?: string;
}>();

const emit = defineEmits<{
	(e: "select:element", elementId: string): void;
	(e: "select:card"): void;
}>();

const { t } = useI18n();

const panel = useTemplateRef<HTMLElement>("panel");

onMounted(() => {
	const currentCard = panel.value?.querySelector<HTMLElement>("[aria-current='page']");
	if (!panel.value || !currentCard) return;

	panel.value.scrollTop = currentCard.offsetTop - panel.value.clientHeight / 3;
});
</script>

<style lang="scss" scoped>
.card-toc {
	position: relative;
	flex: 1;
	width: 18rem;
	min-height: 0;
	padding: 1rem 0.5rem 2rem;
	overflow-y: auto;
	font-size: var(--text-sm);
	color: rgb(var(--v-theme-on-surface));
	background-color: rgb(var(--v-theme-surface));

	ol {
		padding: 0;
		margin: 0;
		list-style: none;
	}
}

.card-toc__title {
	margin: 0 0.5rem 0.5rem;
	font-family: var(--font-accent);
	font-size: var(--heading-6);
	line-height: var(--line-height-md);
}

.card-toc__column {
	margin: 1.25rem 0.5rem 0.25rem;
	overflow: hidden;
	font-size: var(--text-xs);
	font-weight: bold;
	color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
	text-overflow: ellipsis;
	white-space: nowrap;
}

.card-toc__item {
	display: flex;
	gap: 0.5rem;
	align-items: center;
	width: 100%;
	min-height: 2.25rem;
	padding: 0.25rem 0.5rem;
	font: inherit;
	color: inherit;
	text-align: start;
	text-decoration: none;
	cursor: pointer;
	background: none;
	border: 0;
	border-radius: 6px;
	transition: background-color 0.15s ease;

	&:hover {
		background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));
	}

	&:focus-visible {
		outline: 2px solid rgb(var(--v-theme-primary));
		outline-offset: -2px;
	}
}

.card-toc__card--current {
	font-weight: bold;
	color: rgb(var(--v-theme-primary));
	background-color: rgba(var(--v-theme-primary), 0.12);
}

.card-toc__elements {
	padding-inline-start: 0.5rem;
	margin: 0.125rem 0 0.5rem 1rem;
	border-inline-start: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.card-toc__element {
	:deep(.v-icon) {
		flex: none;
		opacity: var(--v-medium-emphasis-opacity);
	}
}

.card-toc__element--active {
	font-weight: bold;
	color: rgb(var(--v-theme-primary));

	:deep(.v-icon) {
		opacity: 1;
	}
}

.card-toc__empty {
	padding-inline-start: 1.5rem;
	margin: 0.25rem 0.5rem 0.5rem 1rem;
	color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}

.card-toc__label {
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

@media (max-width: 959.98px) {
	.card-toc {
		width: 100%;
	}
}

@media (prefers-reduced-motion: reduce) {
	.card-toc__item {
		transition: none;
	}
}
</style>
