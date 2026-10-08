<template>
	<nav class="card-toc" aria-labelledby="card-toc-title" data-testid="card-toc">
		<header class="card-toc__header">
			<h2 id="card-toc-title" class="card-toc__title">
				{{ t("components.board.dialog.detail-view.tableOfContents.title") }}
			</h2>
		</header>
		<div ref="body" class="card-toc__body">
			<ol>
				<li v-for="section in sections" :key="section.columnId" class="card-toc__section">
					<h3 class="card-toc__column">{{ section.title }}</h3>
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
								<span class="card-toc__card-label">{{ card.title }}</span>
							</RouterLink>
							<div v-if="card.isCurrent" class="card-toc__outline">
								<span
									v-if="elements.length > 0"
									class="card-toc__marker"
									:class="{
										'card-toc__marker--visible': isMarkerVisible,
										'card-toc__marker--sliding': isMarkerSliding,
									}"
									:style="{ '--toc-marker-y': `${markerY}px` }"
									aria-hidden="true"
									data-testid="active-element-marker"
								/>
								<ol v-if="elements.length > 0">
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
											<VIcon :icon="element.icon" size="20" aria-hidden="true" />
											<span class="card-toc__element-label">{{ element.label }}</span>
										</button>
									</li>
								</ol>
								<p v-else class="card-toc__empty" data-testid="card-toc-empty">
									{{ t("components.board.dialog.detail-view.tableOfContents.empty") }}
								</p>
							</div>
						</li>
					</ol>
				</li>
			</ol>
		</div>
	</nav>
</template>

<script setup lang="ts">
import type { TableOfContentsElement, TableOfContentsSection } from "./cardTableOfContents.composable";
import { onMounted, ref, useTemplateRef, watch } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{
	sections: TableOfContentsSection[];
	elements: TableOfContentsElement[];
	activeElementId?: string;
	focusCurrentCard?: boolean;
}>();

const emit = defineEmits<{
	(e: "select:element", elementId: string): void;
	(e: "select:card"): void;
}>();

const { t } = useI18n();

const body = useTemplateRef<HTMLElement>("body");

const markerY = ref(0);
const isMarkerVisible = ref(false);
const isMarkerSliding = ref(false);

const placeMarker = () => {
	const activeElement = body.value?.querySelector<HTMLElement>("[aria-current='location']");
	if (!activeElement) {
		isMarkerVisible.value = false;
		return;
	}

	// Only slide between two elements; when the marker (re)appears it fades in at its target.
	isMarkerSliding.value = isMarkerVisible.value;
	markerY.value = activeElement.offsetTop + activeElement.offsetHeight / 2;
	isMarkerVisible.value = true;
};

watch(() => [props.activeElementId, props.elements], placeMarker, { flush: "post" });

onMounted(() => {
	placeMarker();

	const currentCard = body.value?.querySelector<HTMLElement>("[aria-current='page']");
	if (!body.value || !currentCard) return;

	body.value.scrollTop = currentCard.offsetTop - body.value.clientHeight / 3;
	if (props.focusCurrentCard) currentCard.focus({ preventScroll: true });
});
</script>

<style lang="scss" scoped>
.card-toc {
	--toc-ease: cubic-bezier(0.16, 1, 0.3, 1);
	--toc-rail-inset: 1.375rem;

	display: flex;
	flex: 1;
	flex-direction: column;
	width: 20rem;
	min-height: 0;
	font-size: var(--text-sm);
	line-height: var(--line-height-md);
	color: rgb(var(--v-theme-on-surface));
	background-color: rgb(var(--v-theme-surface));
}

.card-toc__header {
	flex: none;
	padding: 1.5rem 1.5rem 1.25rem;
	border-block-end: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.card-toc__title {
	margin: 0;
	font-family: var(--font-accent);
	font-size: var(--heading-5);
	font-weight: bold;
	line-height: var(--line-height-sm);
}

.card-toc__body {
	position: relative;
	flex: 1;
	min-height: 0;
	padding: 0 0.75rem 2rem;
	overflow-y: auto;

	ol {
		padding: 0;
		margin: 0;
		list-style: none;
	}
}

.card-toc__section {
	padding-block-start: 1.25rem;

	& + & {
		padding-block-start: 1.125rem;
		margin-block-start: 0.875rem;
		border-block-start: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
	}
}

.card-toc__column {
	padding-inline: 0.75rem;
	margin: 0 0 0.5rem;
	overflow-wrap: anywhere;
	font-family: var(--font-accent);
	font-size: var(--text-xs);
	font-weight: bold;
	line-height: var(--line-height-md);
	color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
	text-transform: uppercase;
	letter-spacing: 0.08em;
	text-wrap: balance;
}

.card-toc__item {
	display: flex;
	gap: 0.625rem;
	align-items: center;
	width: 100%;
	padding: 0.5rem 0.75rem;
	font: inherit;
	color: inherit;
	text-align: start;
	text-decoration: none;
	cursor: pointer;
	background: none;
	border: 0;
	border-radius: 8px;
	transition:
		background-color 0.15s var(--toc-ease),
		color 0.15s var(--toc-ease);

	&:hover {
		background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));
	}

	&:focus-visible {
		outline: 2px solid rgb(var(--v-theme-primary));
		outline-offset: -2px;
	}

	@media (pointer: coarse) {
		min-height: 2.75rem;
	}
}

.card-toc__card {
	min-height: 2.5rem;
}

.card-toc__card-label {
	display: -webkit-box;
	min-width: 0;
	overflow: hidden;
	overflow-wrap: anywhere;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	line-clamp: 2;
}

.card-toc__card--current {
	font-weight: bold;
	color: rgb(var(--v-theme-primary));
	background-color: rgba(var(--v-theme-primary), 0.1);

	&:hover {
		background-color: rgba(var(--v-theme-primary), 0.14);
	}
}

.card-toc__outline {
	position: relative;
	padding-block: 0.25rem 0.5rem;
	margin-inline-start: var(--toc-rail-inset);

	&::before {
		position: absolute;
		inset-block: 0.5rem 0.75rem;
		inset-inline-start: 0;
		width: 1px;
		content: "";
		background-color: rgba(var(--v-border-color), var(--v-border-opacity));
	}

	li {
		padding-inline-start: 0.5rem;
	}
}

.card-toc__marker {
	position: absolute;
	inset-block-start: 0;
	inset-inline-start: 0;
	z-index: var(--z-elevated);
	width: 7px;
	height: 7px;
	pointer-events: none;
	background-color: rgb(var(--v-theme-primary));
	border-radius: 50%;
	box-shadow: 0 0 0 3px rgb(var(--v-theme-surface));
	opacity: 0;
	transition: opacity 0.2s var(--toc-ease);
	transform: translate(-50%, -50%) translateY(var(--toc-marker-y));
}

.card-toc__marker--visible {
	opacity: 1;
}

.card-toc__marker--sliding {
	transition:
		opacity 0.2s var(--toc-ease),
		transform 0.4s var(--toc-ease);
}

.card-toc__element {
	min-height: 2.25rem;
	padding-block: 0.375rem;
	color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));

	:deep(.v-icon) {
		flex: none;
	}

	&:hover {
		color: rgb(var(--v-theme-on-surface));
	}
}

.card-toc__element--active,
.card-toc__element--active:hover {
	color: rgb(var(--v-theme-primary));
}

.card-toc__element-label {
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.card-toc__empty {
	padding: 0.5rem 0.75rem 0.5rem 1.25rem;
	margin: 0;
	color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}

@media (max-width: 959.98px) {
	.card-toc {
		width: 100%;
	}
}

@media (prefers-reduced-motion: reduce) {
	.card-toc__item,
	.card-toc__marker {
		transition: none;
	}
}
</style>
