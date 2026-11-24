<template>
	<section
		ref="sectionRef"
		class="room-group-section"
		:class="{ 'room-group-sortable-item': group, 'room-group-section--compact': isCompactUngrouped }"
		:data-testid="group ? `room-group-${groupIndex}` : 'room-group-ungrouped'"
		:data-group-id="group?.id"
		:aria-labelledby="showHeading ? headingId : undefined"
	>
		<div v-if="showHeading" class="room-group-header d-flex align-center ga-1">
			<div class="room-group-heading">
				<h2 :id="headingId" tabindex="-1" class="room-group-title text-h4 ma-0" data-testid="room-group-title">
					{{ title }}
				</h2>
				<span class="room-group-count text-body-2 text-medium-emphasis text-no-wrap" data-testid="room-group-count">
					{{ t("pages.rooms.groups.roomCount", { count: rooms.length }, rooms.length) }}
				</span>
			</div>
			<span
				v-if="group"
				class="room-group-drag-handle d-flex align-center justify-center"
				:class="{ 'room-group-drag-handle--disabled': disabled }"
				data-testid="room-group-drag-handle"
				:title="t('pages.rooms.groups.dragHandle', { name: group.name })"
				aria-hidden="true"
			>
				<VIcon :icon="mdiDrag" />
			</span>
			<VBtn
				v-if="group"
				variant="text"
				size="40"
				:icon="isCollapsed ? mdiChevronDown : mdiChevronUp"
				:aria-expanded="isCollapsed ? 'false' : 'true'"
				:aria-controls="contentId"
				:aria-label="
					t(isCollapsed ? 'pages.rooms.groups.toggle.expand' : 'pages.rooms.groups.toggle.collapse', {
						name: group.name,
					})
				"
				:aria-disabled="disabled ? 'true' : undefined"
				:class="{ 'room-group-toggle--pending': disabled }"
				data-testid="room-group-toggle"
				@click="onToggle"
			/>
			<KebabMenu
				v-if="group"
				data-testid="room-group-menu"
				:aria-label="t('pages.rooms.groups.menu.ariaLabel', { name: group.name })"
			>
				<KebabMenuAction
					:icon="mdiRenameOutline"
					:disabled="disabled"
					data-testid="room-group-menu-rename"
					@click="emit('rename')"
				>
					{{ t("common.actions.rename") }}
				</KebabMenuAction>
				<KebabMenuAction
					:icon="mdiArrowUp"
					:disabled="disabled || isFirstGroup"
					data-testid="room-group-menu-move-up"
					@click="emit('move-up')"
				>
					{{ t("pages.rooms.groups.menu.moveUp") }}
				</KebabMenuAction>
				<KebabMenuAction
					:icon="mdiArrowDown"
					:disabled="disabled || isLastGroup"
					data-testid="room-group-menu-move-down"
					@click="emit('move-down')"
				>
					{{ t("pages.rooms.groups.menu.moveDown") }}
				</KebabMenuAction>
				<KebabMenuAction
					:icon="mdiTrashCanOutline"
					:disabled="disabled"
					data-testid="room-group-menu-delete"
					@click="emit('delete')"
				>
					{{ t("common.actions.delete") }}
				</KebabMenuAction>
			</KebabMenu>
		</div>
		<VDivider v-if="showHeading" :class="{ 'mb-4': !isCollapsed }" />
		<div v-show="!isCollapsed" :id="contentId" ref="contentRef" class="room-group-content">
			<div class="room-group-drop-area">
				<RoomGrid
					:rooms
					:section-key="sectionKey"
					:index-offset="indexOffset"
					:disabled
					:title-tag="showHeading ? 'h3' : 'h2'"
					@drop="emit('drop', $event)"
					@drag-start="emit('drag-start')"
					@drag-end="emit('drag-end')"
					@move-to-group="emit('move-to-group', $event)"
				/>
				<p
					v-if="rooms.length === 0"
					class="room-group-empty-hint text-body-2 text-medium-emphasis ma-0"
					data-testid="room-group-empty"
				>
					{{ t(group ? "pages.rooms.groups.empty" : "pages.rooms.groups.ungroupedEmpty") }}
				</p>
			</div>
		</div>
		<Sortable
			v-if="isCollapsed"
			class="room-group-collapsed-drop"
			:class="{ 'room-group-collapsed-drop--active': isDraggingRoom }"
			:list="noRooms"
			item-key="id"
			:options="collapsedDropOptions"
			:data-section-key="sectionKey"
			data-append-only="true"
			data-testid="room-group-collapsed-drop"
		>
			<template #footer>
				<p v-if="isDraggingRoom" class="text-body-2 text-medium-emphasis ma-0 pa-2">
					{{ t("pages.rooms.groups.collapsedDrop") }}
				</p>
			</template>
		</Sortable>
	</section>
</template>

<script setup lang="ts">
import { ROOM_SORTABLE_GROUP, RoomDrop, UNGROUPED_SECTION_KEY } from "./room-arrangement-drop";
import RoomGrid from "./RoomGrid.vue";
import { RoomItem } from "@/types/room/Room";
import { RoomGroupView } from "@data-room";
import {
	mdiArrowDown,
	mdiArrowUp,
	mdiChevronDown,
	mdiChevronUp,
	mdiDrag,
	mdiRenameOutline,
	mdiTrashCanOutline,
} from "@icons/material";
import { KebabMenu, KebabMenuAction } from "@ui-kebab-menu";
import { Sortable } from "sortablejs-vue3";
import { computed, nextTick, useTemplateRef } from "vue";
import { useI18n } from "vue-i18n";

const props = withDefaults(
	defineProps<{
		rooms: RoomItem[];
		/** Named group; omitted for the fixed "Ungrouped" section. */
		group?: RoomGroupView;
		groupIndex?: number;
		groupCount?: number;
		indexOffset?: number;
		showHeading?: boolean;
		disabled?: boolean;
		isDraggingRoom?: boolean;
	}>(),
	{
		group: undefined,
		groupIndex: 0,
		groupCount: 0,
		indexOffset: 0,
		showHeading: true,
		disabled: false,
		isDraggingRoom: false,
	}
);

const emit = defineEmits<{
	drop: [drop: RoomDrop];
	"drag-start": [];
	"drag-end": [];
	"move-to-group": [room: RoomItem];
	toggle: [collapsed: boolean];
	rename: [];
	delete: [];
	"move-up": [];
	"move-down": [];
}>();

const { t } = useI18n();

const sectionRef = useTemplateRef("sectionRef");
const contentRef = useTemplateRef("contentRef");

const noRooms: RoomItem[] = [];

const sectionKey = computed(() => props.group?.id ?? UNGROUPED_SECTION_KEY);
const headingId = computed(() => `room-group-heading-${sectionKey.value}`);
const contentId = computed(() => `room-group-content-${sectionKey.value}`);
const title = computed(() => props.group?.name ?? t("pages.rooms.groups.ungrouped"));
const isCollapsed = computed(() => props.group?.collapsed === true);
const isFirstGroup = computed(() => props.groupIndex === 0);
const isLastGroup = computed(() => props.groupIndex >= props.groupCount - 1);
const isCompactUngrouped = computed(() => !props.group && props.rooms.length === 0);

const collapsedDropOptions = computed(() => ({
	group: { name: ROOM_SORTABLE_GROUP, pull: false, put: true },
	sort: false,
	disabled: props.disabled,
	draggable: ".draggable",
}));

// The toggle stays focusable while a change is saved (aria-disabled), so keyboard focus is not lost.
const onToggle = async () => {
	if (props.disabled) return;
	const collapse = !isCollapsed.value;
	if (collapse && contentRef.value?.contains(document.activeElement)) {
		sectionRef.value?.querySelector<HTMLElement>("[data-testid='room-group-toggle']")?.focus();
		await nextTick();
	}
	emit("toggle", collapse);
};
</script>

<style scoped>
.room-group-header {
	min-height: 48px;
}

.room-group-heading {
	flex: 1 1 auto;
	min-width: 0;
}

.room-group-title {
	display: inline;
	overflow-wrap: anywhere;
	hyphens: auto;
}

.room-group-count {
	margin-inline-start: 8px;
}

.room-group-drag-handle {
	min-width: 40px;
	min-height: 40px;
	cursor: grab;
	touch-action: none;
}

.room-group-toggle--pending {
	opacity: 0.6;
}

.room-group-drag-handle--disabled {
	cursor: default;
	opacity: 0.4;
}

.room-group-drop-area {
	display: grid;
}

.room-group-drop-area > * {
	grid-area: 1 / 1;
}

.room-group-empty-hint {
	align-self: center;
	padding: 12px 16px;
	pointer-events: none;
	border: 1px dashed rgba(var(--v-theme-on-surface), 0.24);
	border-radius: 4px;
}

.room-group-section--compact .room-group-empty-hint {
	padding-block: 8px;
}

.room-group-collapsed-drop {
	border-radius: 4px;
}

.room-group-collapsed-drop--active {
	min-height: 48px;
	border: 1px dashed rgba(var(--v-theme-primary), 0.6);
}

@media (prefers-reduced-motion: reduce) {
	.room-group-section :deep(*) {
		transition: none !important;
	}
}
</style>
