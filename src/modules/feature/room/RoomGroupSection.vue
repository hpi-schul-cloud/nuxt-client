<template>
	<section
		ref="sectionRef"
		class="room-group-section"
		:class="{
			'room-group-sortable-item': group,
			'room-group-section--compact': isCompactUngrouped,
			'room-group-section--collapsed': isCollapsed,
		}"
		:data-testid="group ? `room-group-${groupIndex}` : 'room-group-ungrouped'"
		:data-group-id="group?.id"
		:aria-labelledby="showHeading ? headingId : undefined"
		:aria-label="showHeading ? undefined : t('pages.rooms.title')"
	>
		<div v-if="showHeading" class="room-group-header d-flex align-center ga-2">
			<div class="room-group-heading">
				<h2 v-if="group" :id="headingId" class="room-group-heading-title text-h4 ma-0">
					<button
						type="button"
						class="room-group-toggle"
						:aria-expanded="isCollapsed ? 'false' : 'true'"
						:aria-controls="contentId"
						data-testid="room-group-toggle"
						@click="onToggle"
					>
						<span class="room-group-title" data-testid="room-group-title">{{ title }}</span>
						<span
							v-if="isCountVisible"
							class="room-group-count text-body-2 text-medium-emphasis text-no-wrap"
							data-testid="room-group-count"
						>
							{{ roomCountText }}
						</span>
						<span
							v-if="selectable && isCollapsed"
							class="room-group-selected-count text-body-2 text-medium-emphasis text-no-wrap"
							data-testid="room-group-selected-count"
						>
							{{ t("pages.rooms.groups.selection.selectedOfTotal", { selected: selectedCount, total: rooms.length }) }}
						</span>
						<VIcon
							class="room-group-chevron"
							:icon="isCollapsed ? mdiChevronDown : mdiChevronUp"
							size="small"
							aria-hidden="true"
						/>
					</button>
				</h2>
				<template v-else>
					<h2
						:id="headingId"
						tabindex="-1"
						class="room-group-heading-title room-group-heading-title--ungrouped text-h4 ma-0"
					>
						<span class="room-group-title" data-testid="room-group-title">{{ title }}</span>
					</h2>
					<span
						v-if="isCountVisible"
						class="room-group-count text-body-2 text-medium-emphasis text-no-wrap"
						data-testid="room-group-count"
					>
						{{ roomCountText }}
					</span>
				</template>
			</div>
			<VCheckbox
				v-if="selectable"
				class="room-group-select-all flex-grow-0"
				:model-value="isAllSelected"
				:indeterminate="isSomeSelected"
				:disabled="selectableRoomIds.length === 0"
				:label="xs ? undefined : t('pages.rooms.groups.selection.selectAllShort')"
				:aria-label="t('pages.rooms.groups.selection.selectAll', { name: title })"
				hide-details
				data-testid="room-group-select-all"
				@update:model-value="onSelectAll($event === true)"
			/>
			<span
				v-if="group && !selectable"
				class="room-group-drag-handle d-flex align-center justify-center"
				:class="{ 'room-group-drag-handle--disabled': isGroupActionDisabled }"
				data-testid="room-group-drag-handle"
				:title="t('pages.rooms.groups.dragHandle', { name: group.name })"
				aria-hidden="true"
			>
				<VIcon :icon="mdiDrag" />
			</span>
			<KebabMenu
				v-if="group && !selectable"
				data-testid="room-group-menu"
				:aria-label="t('pages.rooms.groups.menu.ariaLabel', { name: group.name })"
			>
				<KebabMenuAction
					:icon="mdiRenameOutline"
					:disabled="isGroupActionDisabled"
					data-testid="room-group-menu-rename"
					@click="emit('rename')"
				>
					{{ t("common.actions.rename") }}
				</KebabMenuAction>
				<KebabMenuAction
					:icon="mdiArrowUp"
					:disabled="isGroupActionDisabled || isFirstGroup"
					data-testid="room-group-menu-move-up"
					@click="emit('move-up')"
				>
					{{ t("pages.rooms.groups.menu.moveUp") }}
				</KebabMenuAction>
				<KebabMenuAction
					:icon="mdiArrowDown"
					:disabled="isGroupActionDisabled || isLastGroup"
					data-testid="room-group-menu-move-down"
					@click="emit('move-down')"
				>
					{{ t("pages.rooms.groups.menu.moveDown") }}
				</KebabMenuAction>
				<KebabMenuAction
					:icon="mdiTrashCanOutline"
					:disabled="isGroupActionDisabled"
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
					:labelled-by="showHeading ? headingId : undefined"
					:can-move-to-group="hasMoveTargets"
					:selectable
					:selected-room-ids="selectedRoomIds"
					@drop="emit('drop', $event)"
					@drag-start="emit('drag-start')"
					@drag-end="emit('drag-end')"
					@move-to-group="emit('move-to-group', $event)"
					@select-room="(roomId, selected) => emit('select-room', roomId, selected)"
				/>
				<p
					v-if="rooms.length === 0"
					class="room-group-empty-hint text-body-2 text-medium-emphasis ma-0"
					data-testid="room-group-empty"
				>
					{{ t(emptyHintKey) }}
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
import { useAriaLiveNotifier } from "@/composables/ariaLiveNotifier";
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
import { useDisplay } from "vuetify";

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
		hasMoveTargets?: boolean;
		/** Selection mode for moving several rooms at once. */
		selectable?: boolean;
		selectedRoomIds?: string[];
	}>(),
	{
		selectable: false,
		selectedRoomIds: () => [],
		hasMoveTargets: true,
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
	"select-room": [roomId: string, selected: boolean];
	"select-all": [roomIds: string[], selected: boolean];
}>();

const { t } = useI18n();
const { xs } = useDisplay();
const { notifyOnScreenReader } = useAriaLiveNotifier();

const sectionRef = useTemplateRef("sectionRef");
const contentRef = useTemplateRef("contentRef");

const noRooms: RoomItem[] = [];

const sectionKey = computed(() => props.group?.id ?? UNGROUPED_SECTION_KEY);
const headingId = computed(() => `room-group-heading-${sectionKey.value}`);
const contentId = computed(() => `room-group-content-${sectionKey.value}`);
const title = computed(() => props.group?.name ?? t("pages.rooms.groups.ungrouped"));
const isCollapsed = computed(() => props.group?.collapsed === true);
const roomCountText = computed(() =>
	t("pages.rooms.groups.roomCount", { count: props.rooms.length }, props.rooms.length)
);
// An empty group shows its hint instead of "0 rooms"; a collapsed one keeps the count as its only content hint.
const isCountVisible = computed(() => props.rooms.length > 0 || isCollapsed.value);

const selectableRoomIds = computed(() =>
	props.rooms.filter((room) => room.allowedOperations?.arrangeRooms === true).map((room) => room.id)
);
const selectedCount = computed(() => selectableRoomIds.value.filter((id) => props.selectedRoomIds.includes(id)).length);
const isAllSelected = computed(
	() => selectableRoomIds.value.length > 0 && selectedCount.value === selectableRoomIds.value.length
);
const isSomeSelected = computed(() => selectedCount.value > 0 && !isAllSelected.value);

// Rooms of a collapsed group are not visible, so their selection is confirmed for screen readers.
const onSelectAll = (selected: boolean) => {
	emit("select-all", selectableRoomIds.value, selected);
	if (selected && isCollapsed.value) {
		const count = selectableRoomIds.value.length;
		notifyOnScreenReader(t("pages.rooms.groups.selection.hiddenSelected", { count, name: title.value }, count));
	}
};

// Renaming, moving or deleting groups would interfere with a running selection.
const isGroupActionDisabled = computed(() => props.disabled || props.selectable);
const isFirstGroup = computed(() => props.groupIndex === 0);
const isLastGroup = computed(() => props.groupIndex >= props.groupCount - 1);
const isCompactUngrouped = computed(() => !props.group && props.rooms.length === 0);
const emptyHintKey = computed(() => {
	if (props.group) return "pages.rooms.groups.empty";
	return props.isDraggingRoom ? "pages.rooms.groups.ungroupedEmpty" : "pages.rooms.groups.ungroupedAllAssigned";
});

const collapsedDropOptions = computed(() => ({
	group: { name: ROOM_SORTABLE_GROUP, pull: false, put: true },
	sort: false,
	disabled: props.disabled,
	draggable: ".draggable",
}));

// Toggling stays possible while another change is saved: the store shows it at once and persists it afterwards.
const onToggle = async () => {
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
	display: flex;
	flex-wrap: wrap;
	align-items: baseline;
	column-gap: 8px;
}

.room-group-heading-title {
	display: flex;
	flex: 1 1 auto;
	min-width: 0;
	font-weight: 700;
}

/* The fixed inbox reads quieter than the user's own groups. */
.room-group-heading-title--ungrouped {
	flex: 0 1 auto;
	font-weight: 400;
	color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}

.room-group-title {
	overflow-wrap: anywhere;
	hyphens: auto;
}

/* Stretches up to the trailing actions, so the whole header row toggles. */
.room-group-toggle {
	display: flex;
	flex: 1 1 auto;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-items: baseline;
	column-gap: 8px;
	row-gap: 4px;
	min-height: 40px;
	padding: 0 4px;
	margin-inline-start: -4px;
	font: inherit;
	color: inherit;
	text-align: start;
	background: none;
	border: 0;
	border-radius: 4px;
	cursor: pointer;
}

.room-group-toggle:hover .room-group-title {
	text-decoration: underline;
}

.room-group-toggle:focus-visible {
	outline: 2px solid rgba(var(--v-theme-primary));
	outline-offset: 2px;
}

.room-group-chevron {
	flex-shrink: 0;
	align-self: center;
}

.room-group-drag-handle {
	min-width: 40px;
	min-height: 40px;
	cursor: grab;
	touch-action: none;
}

.room-group-drag-handle--disabled {
	cursor: default;
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
