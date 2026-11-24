<template>
	<div
		ref="rootRef"
		class="room-grouped-overview mt-8"
		:class="{
			'room-grouped-overview--selecting': selection.isActive,
		}"
		data-testid="room-grouped-overview"
	>
		<template v-if="hasLoadError">
			<WarningAlert data-testid="room-groups-load-error">
				<div class="d-flex flex-wrap align-center ga-2">
					<span>{{ t("pages.rooms.groups.loadError") }}</span>
					<VBtn variant="outlined" size="small" :loading="isLoading" data-testid="room-groups-retry" @click="retry">
						{{ t("pages.rooms.groups.retry") }}
					</VBtn>
				</div>
			</WarningAlert>
			<RoomGrid v-if="roomsStatus === 'loaded' && rooms.length > 0" :rooms readonly />
		</template>
		<template v-else-if="view">
			<RoomGroupsOnboardingLine
				v-if="isOnboardingVisible && !isOnboardingAfterGrid"
				class="mb-4"
				:disabled="!isReady"
				@add="openCreateDialog(onboardingAddSelector)"
				@dismiss="dismissOnboarding"
			/>
			<RoomGroupSection
				v-if="isUngroupedVisible"
				:rooms="view.ungrouped"
				:show-heading="view.groups.length > 0"
				:has-move-targets="view.groups.length > 0"
				:index-offset="0"
				:disabled="!canEdit"
				:is-dragging-room="isDraggingRoom"
				:selectable="selection.isActive"
				:selected-room-ids="selection.roomIds"
				@drop="onRoomDrop"
				@drag-start="isDraggingRoom = true"
				@drag-end="isDraggingRoom = false"
				@move-to-group="openMoveDialog"
				@select-room="onSelectRoom"
				@select-all="onSelectAll"
			/>
			<Sortable
				:list="view.groups"
				item-key="id"
				class="room-group-list"
				:options="groupSortableOptions"
				data-testid="room-group-list"
				@start="onGroupDragStart"
				@end="onGroupDropEnd"
			>
				<template #item="{ element, index }">
					<RoomGroupSection
						:group="element"
						:rooms="element.rooms"
						:group-index="index"
						:group-count="view.groups.length"
						:index-offset="groupIndexOffsets[index]"
						:disabled="!canEdit"
						:is-dragging-room="isDraggingRoom"
						:selectable="selection.isActive"
						:selected-room-ids="selection.roomIds"
						@drop="onRoomDrop"
						@drag-start="isDraggingRoom = true"
						@drag-end="isDraggingRoom = false"
						@move-to-group="openMoveDialog"
						@toggle="onToggleGroup(element, $event)"
						@rename="openRenameDialog(element)"
						@delete="requestDelete(element)"
						@move-up="onMoveGroup(element, -1)"
						@move-down="onMoveGroup(element, 1)"
						@select-room="onSelectRoom"
						@select-all="onSelectAll"
					/>
				</template>
			</Sortable>
			<RoomGroupsOnboardingLine
				v-if="isOnboardingVisible && isOnboardingAfterGrid"
				class="mt-4"
				:disabled="!isReady"
				@add="openCreateDialog(onboardingAddSelector)"
				@dismiss="dismissOnboarding"
			/>
		</template>

		<!-- While the first-run line is shown, its own button is the entry for adding a group. -->
		<div v-if="!hasLoadError && !isOnboardingVisible" class="room-group-add-row mt-6">
			<VBtn
				variant="tonal"
				size="large"
				block
				class="justify-start"
				:prepend-icon="mdiPlus"
				:disabled="!isReady || selection.isActive"
				data-testid="room-group-add"
				@click="openCreateDialog(addButtonSelector)"
			>
				{{ t("pages.rooms.groups.add") }}
			</VBtn>
			<VDivider />
		</div>

		<div
			v-if="selection.isActive"
			class="room-selection-bar d-flex flex-wrap align-center ga-2 pa-3 mt-4 rounded elevation-8"
			:class="{ 'room-selection-bar--xs': xs }"
			role="region"
			:aria-label="t('pages.rooms.groups.selection.label')"
			data-testid="room-selection-bar"
		>
			<div class="room-selection-summary">
				<span class="text-body-1 d-block" aria-live="polite" data-testid="room-selection-count">
					{{ t("pages.rooms.groups.selection.count", { count: selectedRoomIds.length }, selectedRoomIds.length) }}
				</span>
				<span
					class="text-body-2 text-medium-emphasis"
					:class="xs ? 'd-sr-only' : 'd-block'"
					data-testid="room-selection-instruction"
				>
					{{ t("pages.rooms.groups.selection.instruction") }}
				</span>
			</div>
			<div class="room-selection-actions d-flex align-center ga-2">
				<VBtn variant="text" size="large" data-testid="room-selection-cancel" @click="endSelection">
					{{ t("common.actions.cancel") }}
				</VBtn>
				<VBtn
					class="room-selection-move"
					color="primary"
					variant="flat"
					size="large"
					:prepend-icon="mdiFolderMoveOutline"
					:disabled="selectedRoomIds.length === 0 || !canEdit"
					data-testid="room-selection-move"
					@click="openBulkMoveDialog"
				>
					{{ t("pages.rooms.groups.roomMenu.moveToGroup") }}
				</VBtn>
			</div>
		</div>

		<RoomGroupNameDialog
			v-model="nameDialog.isOpen"
			:mode="nameDialog.mode"
			:initial-name="nameDialog.initialName"
			:group-id="nameDialog.groupId"
			:existing-groups="groups"
			:is-saving="nameDialog.isSaving || isMutating"
			:server-error="nameDialog.serverError"
			@submit="onNameSubmit"
			@cancel="closeNameDialog"
			@clear-server-error="nameDialog.serverError = undefined"
			@after-leave="onDialogAfterLeave"
		/>
		<RoomGroupDeleteDialog
			v-model="deleteDialog.isOpen"
			:group-name="deleteDialog.group?.name ?? ''"
			:room-count="deleteDialog.group?.rooms.length ?? 0"
			:is-deleting="deleteDialog.isDeleting || isMutating"
			@confirm="onDeleteConfirm"
			@cancel="closeDeleteDialog"
			@after-leave="onDialogAfterLeave"
		/>
		<RoomMoveDialog
			v-model="moveDialog.isOpen"
			:room-name="moveDialog.room?.name ?? ''"
			:targets="moveTargets"
			:current-key="moveDialog.sourceKey"
			:room-count="moveDialog.roomIds?.length ?? 1"
			:is-moving="moveDialog.isMoving || isMutating"
			@confirm="onMoveDialogConfirm"
			@cancel="closeMoveDialog"
			@after-leave="onDialogAfterLeave"
		/>
	</div>
</template>

<script setup lang="ts">
import {
	findRoomSectionKey,
	getSectionRooms,
	rememberDomPosition,
	restoreDomPosition,
	RoomDrop,
	RoomMoveTarget,
	sectionKeyToGroupId,
	toRoomMoveCommand,
	UNGROUPED_SECTION_KEY,
} from "./room-arrangement-drop";
import RoomGrid from "./RoomGrid.vue";
import RoomGroupDeleteDialog from "./RoomGroupDeleteDialog.vue";
import RoomGroupNameDialog from "./RoomGroupNameDialog.vue";
import RoomGroupSection from "./RoomGroupSection.vue";
import RoomGroupsOnboardingLine from "./RoomGroupsOnboardingLine.vue";
import RoomMoveDialog from "./RoomMoveDialog.vue";
import { useAriaLiveNotifier } from "@/composables/ariaLiveNotifier";
import { RoomItem } from "@/types/room/Room";
import { notifySuccess, useNotificationStore } from "@data-app";
import {
	RoomArrangementUndoDescription,
	RoomArrangementView,
	RoomGroupNameErrorReason,
	RoomGroupView,
	RoomMoveCommand,
	useRoomArrangementStore,
	useRoomStore,
} from "@data-room";
import { mdiFolderMoveOutline, mdiPlus } from "@icons/material";
import { WarningAlert } from "@ui-alert";
import { getSortableOptions } from "@util-sorting";
import { useEventListener, usePreferredReducedMotion } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import { computed, nextTick, reactive, ref, useTemplateRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const { t } = useI18n();
const { notifyOnScreenReader } = useAriaLiveNotifier();

const arrangementStore = useRoomArrangementStore();
const {
	view,
	groups,
	canEdit,
	isReady,
	isMutating,
	isLoading,
	hasLoadError,
	roomsStatus,
	confirmGroupDeletion,
	isUndoing,
	isUndoOffered,
	undoDescription,
	undoId,
	isOnboardingDismissed,
} = storeToRefs(arrangementStore);
const { rooms } = storeToRefs(useRoomStore());

const rootRef = useTemplateRef("rootRef");
const { xs } = useDisplay();
const reducedMotion = usePreferredReducedMotion();

const isDraggingRoom = ref(false);

const isUngroupedVisible = computed(() => {
	const current = view.value;
	if (!current) return false;
	return current.ungrouped.length > 0 || current.groups.length > 0 || isDraggingRoom.value;
});

// Running offsets keep the index based test ids of room cards unique across all sections.
const groupIndexOffsets = computed(() => {
	const current = view.value;
	if (!current) return [];
	let offset = current.ungrouped.length;
	return current.groups.map((group) => {
		const groupOffset = offset;
		offset += group.rooms.length;
		return groupOffset;
	});
});

const groupSortableOptions = computed(() =>
	getSortableOptions({
		group: "room-groups",
		handle: ".room-group-drag-handle",
		draggable: ".room-group-sortable-item",
		disabled: !canEdit.value || selection.isActive,
		animation: reducedMotion.value === "reduce" ? 0 : 250,
	})
);

const sectionLabel = (key: string) =>
	key === UNGROUPED_SECTION_KEY
		? t("pages.rooms.groups.ungrouped")
		: (groups.value.find((group) => group.id === key)?.name ?? "");

const retry = () => arrangementStore.loadOverview();

// Focus handling
let pendingFocusSelector: string | undefined;

// Triggers outside this component (e.g. the page menu) are found in the document.
const focusElement = (selector: string) => {
	const element = rootRef.value?.querySelector<HTMLElement>(selector) ?? document.querySelector<HTMLElement>(selector);
	element?.focus();
	return element !== null && element !== undefined;
};

// Named groups are focused via their accordion button; the ungrouped heading itself is focusable.
const headingSelector = (key: string) =>
	key === UNGROUPED_SECTION_KEY ? `#room-group-heading-${key}` : `#room-group-heading-${key} button`;
const addButtonSelector = "[data-testid='room-group-add']";
const groupMenuSelector = (groupId: string) => `[data-group-id='${groupId}'] [data-testid='room-group-menu']`;
const roomMenuSelector = (roomId: string) => `[data-room-id='${roomId}'] [data-testid='room-card-menu']`;
const groupToggleSelector = (groupId: string) => `[data-group-id='${groupId}'] [data-testid='room-group-toggle']`;

const applyPendingFocus = async () => {
	if (!pendingFocusSelector) return;
	await nextTick();
	focusElement(pendingFocusSelector);
};

// The dialog's own focus return runs when its leave transition ends, so the target is applied again afterwards.
const onDialogAfterLeave = async () => {
	await applyPendingFocus();
	pendingFocusSelector = undefined;
};

const focusAfterDialog = async (selector: string) => {
	pendingFocusSelector = selector;
	await applyPendingFocus();
};

// Room moves
const announceRoomMove = (
	arrangementView: RoomArrangementView | undefined,
	command: RoomMoveCommand,
	room?: RoomItem
) => {
	if (!arrangementView || !room) return;
	const sourceKey = command.sourceGroupId ?? UNGROUPED_SECTION_KEY;
	const targetKey = command.targetGroupId ?? UNGROUPED_SECTION_KEY;
	const targetRooms = getSectionRooms(arrangementView, targetKey) ?? [];
	const position = targetRooms.findIndex((r) => r.id === room.id) + 1;

	const message =
		sourceKey === targetKey
			? t("pages.rooms.groups.announce.roomReordered", { name: room.name, target: sectionLabel(targetKey), position })
			: t("pages.rooms.groups.announce.roomMoved", {
					name: room.name,
					source: sectionLabel(sourceKey),
					target: sectionLabel(targetKey),
					position,
				});
	notifyOnScreenReader(message);
};

// Moves are confirmed visibly by the undo snackbar, also when the room disappears into a collapsed group.
const executeRoomMove = async (command: RoomMoveCommand) => {
	const room = rooms.value.find((r) => r.id === command.roomId);
	const result = await arrangementStore.moveRoom(command);
	if (result.success) {
		announceRoomMove(view.value, command, room);
	}
	return result;
};

const onRoomDrop = async (drop: RoomDrop) => {
	const current = view.value;
	if (!current || !canEdit.value) return;

	const command = toRoomMoveCommand(current, drop);
	if (!command) return;

	await executeRoomMove(command);
};

const moveDialog = reactive<{
	isOpen: boolean;
	room?: RoomItem;
	sourceKey?: string;
	/** Set for a bulk move of selected rooms. */
	roomIds?: string[];
	isMoving: boolean;
}>({
	isOpen: false,
	isMoving: false,
});

const moveTargets = computed<RoomMoveTarget[]>(() => [
	{ key: UNGROUPED_SECTION_KEY, label: t("pages.rooms.groups.ungrouped"), testId: "room-move-target-ungrouped" },
	...groups.value.map((group, index) => ({ key: group.id, label: group.name, testId: `room-move-target-${index}` })),
]);

// Dialogs are opened from menu items that no longer exist once closed, so focus returns to a stable trigger.
const closeMoveDialog = () => {
	if (moveDialog.isMoving) return;
	if (moveDialog.roomIds) pendingFocusSelector = selectionMoveSelector;
	else if (moveDialog.room) pendingFocusSelector = roomMenuSelector(moveDialog.room.id);
	moveDialog.isOpen = false;
};

const openMoveDialog = (room: RoomItem) => {
	const current = view.value;
	if (!current || !canEdit.value) return;
	const sourceKey = findRoomSectionKey(current, room.id);
	if (!sourceKey) return;

	moveDialog.room = room;
	moveDialog.sourceKey = sourceKey;
	moveDialog.roomIds = undefined;
	moveDialog.isOpen = true;
};

const onMoveDialogConfirm = async (targetKey: string) => {
	if (moveDialog.roomIds) {
		await moveSelectedRooms(moveDialog.roomIds, targetKey);
		return;
	}
	const { room, sourceKey } = moveDialog;
	if (!room || !sourceKey || targetKey === sourceKey) return;

	moveDialog.isMoving = true;
	const result = await executeRoomMove({
		roomId: room.id,
		sourceGroupId: sectionKeyToGroupId(sourceKey),
		targetGroupId: sectionKeyToGroupId(targetKey),
		beforeRoomId: null,
	});
	moveDialog.isMoving = false;

	if (result.success || result.failure !== "busy") {
		moveDialog.isOpen = false;
	}
	if (result.success) {
		const isTargetCollapsed = groups.value.some((group) => group.id === targetKey && group.collapsed);
		pendingFocusSelector = isTargetCollapsed ? groupToggleSelector(targetKey) : roomMenuSelector(room.id);
		await applyPendingFocus();
	}
};

// Groups
const groupPosition = (groupId: string) => groups.value.findIndex((group) => group.id === groupId) + 1;

const onMoveGroup = async (group: RoomGroupView, offset: -1 | 1) => {
	if (!canEdit.value) return;
	const result = await arrangementStore.moveGroup(group.id, offset);
	if (result.success) {
		notifyOnScreenReader(
			t("pages.rooms.groups.announce.groupMoved", { name: group.name, position: groupPosition(group.id) })
		);
	}
};

let groupDragOrigin: ReturnType<typeof rememberDomPosition>;

const onGroupDragStart = (event: SortableEvent) => {
	groupDragOrigin = rememberDomPosition(event.item);
};

const onGroupDropEnd = async (event: SortableEvent) => {
	restoreDomPosition(event.item, groupDragOrigin);
	groupDragOrigin = undefined;

	const { oldIndex, newIndex } = event;
	if (oldIndex === undefined || newIndex === undefined || oldIndex === newIndex || !canEdit.value) return;

	const ids = groups.value.map((group) => group.id);
	const [movedId] = ids.splice(oldIndex, 1);
	if (movedId === undefined) return;
	ids.splice(newIndex, 0, movedId);

	const movedGroup = groups.value.find((group) => group.id === movedId);
	const result = await arrangementStore.updateGroupOrder(ids, movedId);
	if (result.success && movedGroup) {
		notifyOnScreenReader(
			t("pages.rooms.groups.announce.groupMoved", { name: movedGroup.name, position: groupPosition(movedId) })
		);
	}
};

// Not blocked while another change is saved: the store shows the new state at once and persists it afterwards.
const onToggleGroup = async (group: RoomGroupView, collapsed: boolean) => {
	const isApplied = await arrangementStore.requestGroupCollapsed(group.id, collapsed);
	if (isApplied) {
		notifyOnScreenReader(
			t(collapsed ? "pages.rooms.groups.announce.collapsed" : "pages.rooms.groups.announce.expanded", {
				name: group.name,
			})
		);
	}
};

// Create / rename
const nameDialog = reactive<{
	isOpen: boolean;
	mode: "create" | "rename";
	groupId?: string;
	initialName: string;
	isSaving: boolean;
	serverError?: RoomGroupNameErrorReason;
	/** Control that opened the create dialog; it gets focus back when the dialog is cancelled. */
	returnFocusSelector?: string;
}>({ isOpen: false, mode: "create", initialName: "", isSaving: false });

const onboardingAddSelector = "[data-testid='room-groups-onboarding-add']";

const openCreateDialog = (returnFocusSelector: string = addButtonSelector) => {
	Object.assign(nameDialog, {
		mode: "create",
		groupId: undefined,
		initialName: "",
		serverError: undefined,
		returnFocusSelector,
	});
	nameDialog.isOpen = true;
};

const openRenameDialog = (group: RoomGroupView) => {
	if (!canEdit.value) return;
	Object.assign(nameDialog, { mode: "rename", groupId: group.id, initialName: group.name, serverError: undefined });
	nameDialog.isOpen = true;
};

const closeNameDialog = () => {
	if (nameDialog.isSaving) return;
	pendingFocusSelector =
		nameDialog.mode === "rename" && nameDialog.groupId
			? groupMenuSelector(nameDialog.groupId)
			: (nameDialog.returnFocusSelector ?? addButtonSelector);
	nameDialog.isOpen = false;
};

const onNameSubmit = async (name: string) => {
	if (nameDialog.mode === "rename" && name === nameDialog.initialName) {
		closeNameDialog();
		return;
	}
	nameDialog.isSaving = true;
	const groupId = nameDialog.groupId;
	const result =
		nameDialog.mode === "rename" && groupId !== undefined
			? await arrangementStore.renameGroup(groupId, name)
			: await arrangementStore.createGroup(name);
	nameDialog.isSaving = false;

	if (!result.success) {
		if (result.failure === "name") nameDialog.serverError = result.nameError;
		return;
	}

	const targetGroupId = result.createdGroupId ?? groupId;
	const savedName = result.arrangement.groups.find((group) => group.id === targetGroupId)?.name ?? name;
	nameDialog.isOpen = false;
	notifySuccess(
		t(nameDialog.mode === "create" ? "pages.rooms.groups.announce.created" : "pages.rooms.groups.announce.renamed", {
			name: savedName,
		})
	);
	if (targetGroupId) {
		await focusAfterDialog(headingSelector(targetGroupId));
	}
};

// Delete
const deleteDialog = reactive<{ isOpen: boolean; group?: RoomGroupView; isDeleting: boolean }>({
	isOpen: false,
	isDeleting: false,
});

const getFocusSelectorAfterDelete = (groupId: string) => {
	const remaining = groups.value.filter((group) => group.id !== groupId);
	const index = groups.value.findIndex((group) => group.id === groupId);
	const neighbour = remaining[index] ?? remaining[index - 1];
	if (neighbour) return headingSelector(neighbour.id);
	return addButtonSelector;
};

// The undo snackbar shows and announces the result, with or without confirmation dialog.
const performDelete = async (group: RoomGroupView, disableFutureConfirmation: boolean, withDialog: boolean) => {
	const focusSelector = getFocusSelectorAfterDelete(group.id);
	deleteDialog.isDeleting = true;
	const result = await arrangementStore.deleteGroup(group.id, disableFutureConfirmation);
	deleteDialog.isDeleting = false;

	if (!result.success) {
		if (result.failure !== "busy") deleteDialog.isOpen = false;
		return;
	}

	deleteDialog.isOpen = false;
	if (withDialog) {
		await focusAfterDialog(focusSelector);
	} else {
		focusElement(focusSelector);
	}
};

const closeDeleteDialog = () => {
	if (deleteDialog.isDeleting) return;
	if (deleteDialog.group) pendingFocusSelector = groupMenuSelector(deleteDialog.group.id);
	deleteDialog.isOpen = false;
};

const requestDelete = (group: RoomGroupView) => {
	if (!canEdit.value) return;
	if (confirmGroupDeletion.value) {
		deleteDialog.group = group;
		deleteDialog.isOpen = true;
		return;
	}
	performDelete(group, false, false);
};

const onDeleteConfirm = (disableFutureConfirmation: boolean) => {
	if (deleteDialog.group) {
		performDelete(deleteDialog.group, disableFutureConfirmation, true);
	}
};

// Onboarding while no group exists
const isOnboardingVisible = computed(() => {
	const current = view.value;
	return (
		current !== undefined &&
		current.groups.length === 0 &&
		current.ungrouped.length >= 2 &&
		!isOnboardingDismissed.value
	);
});

const dismissOnboarding = async () => {
	await arrangementStore.dismissOnboarding();
	await nextTick();
	focusElement(addButtonSelector);
};

// On phones the hint follows the rooms, so the rooms stay the first thing to see.
const isOnboardingAfterGrid = computed(() => xs.value);

// Selection of several rooms for one move
const selection = reactive<{ isActive: boolean; roomIds: string[] }>({ isActive: false, roomIds: [] });

const emit = defineEmits<{
	/** Lets the page hide controls, such as the create room button, that would cover the selection bar. */
	"selection-change": [isActive: boolean];
}>();

watch(
	() => selection.isActive,
	(isActive) => emit("selection-change", isActive)
);
const selectionMoveSelector = "[data-testid='room-selection-move']";

const arrangeableRoomIds = computed(() => {
	const current = view.value;
	if (!current) return [];
	return [...current.ungrouped, ...current.groups.flatMap((group) => group.rooms)]
		.filter((room) => room.allowedOperations?.arrangeRooms === true)
		.map((room) => room.id);
});

// Display order, so the rooms keep their relative order in the target.
const selectedRoomIds = computed(() => arrangeableRoomIds.value.filter((id) => selection.roomIds.includes(id)));

const startSelection = async () => {
	if (!isReady.value || selection.isActive) return;
	selection.roomIds = [];
	selection.isActive = true;
	notifyOnScreenReader(t("pages.rooms.groups.selection.started"));
	await nextTick();
	focusElement("[data-testid='room-card-select'] input");
};

const endSelection = async () => {
	if (!selection.isActive) return;
	selection.isActive = false;
	selection.roomIds = [];
	await nextTick();
	// The start button lives in the page header, outside of this component.
	const startButton = document.querySelector<HTMLElement>("[data-testid='room-selection-start']");
	if (startButton) startButton.focus();
	else focusElement(addButtonSelector);
};

const onSelectAll = (roomIds: string[], selected: boolean) => {
	const others = selection.roomIds.filter((id) => !roomIds.includes(id));
	selection.roomIds = selected ? [...others, ...roomIds] : others;
};

const onSelectRoom = (roomId: string, selected: boolean) => {
	const others = selection.roomIds.filter((id) => id !== roomId);
	selection.roomIds = selected ? [...others, roomId] : others;
};

const openBulkMoveDialog = () => {
	if (selectedRoomIds.value.length === 0 || !canEdit.value) return;
	moveDialog.room = undefined;
	moveDialog.sourceKey = undefined;
	moveDialog.roomIds = [...selectedRoomIds.value];
	moveDialog.isOpen = true;
};

const moveSelectedRooms = async (roomIds: string[], targetKey: string) => {
	moveDialog.isMoving = true;
	const result = await arrangementStore.moveRooms(roomIds, sectionKeyToGroupId(targetKey));
	moveDialog.isMoving = false;

	if (result.success || result.failure !== "busy") {
		moveDialog.isOpen = false;
	}
	if (result.success) {
		pendingFocusSelector = undefined;
		await endSelection();
	}
};

const isInsideOverlay = (target: EventTarget | null) =>
	target instanceof Element && target.closest(".v-overlay__content") !== null;

useEventListener(document, "keydown", (event: KeyboardEvent) => {
	if (event.key === "Escape" && selection.isActive && !moveDialog.isOpen && !isInsideOverlay(event.target)) {
		endSelection();
	}
});

// Undo: offered through the same success notification with an undo action that archiving uses.
const UNDO_DURATION_MS = 10000;
let removeUndoNotification: (() => void) | undefined;

const sectionName = (name: string | null) => name ?? t("pages.rooms.groups.ungrouped");

const describeUndo = (description: RoomArrangementUndoDescription) => {
	switch (description.kind) {
		case "moveRoom":
			if (description.reordered) return t("pages.rooms.groups.undo.roomReordered", { name: description.roomName });
			return t(
				description.targetCollapsed
					? "pages.rooms.groups.notification.movedIntoCollapsed"
					: "pages.rooms.groups.undo.roomMoved",
				{ name: description.roomName, target: sectionName(description.targetName) }
			);
		case "moveRooms":
			return t(
				"pages.rooms.groups.undo.roomsMoved",
				{ count: description.count, target: sectionName(description.targetName) },
				description.count
			);
		case "deleteGroup":
			return t("pages.rooms.groups.announce.deleted", { name: description.groupName });
		case "reorderGroups":
			return t("pages.rooms.groups.undo.groupMoved", { name: description.groupName });
	}
};

const onUndo = async () => {
	const isUndone = await arrangementStore.undo();
	if (isUndone) notifyOnScreenReader(t("pages.rooms.groups.undo.done"));
};

watch(undoId, (id) => {
	removeUndoNotification?.();
	removeUndoNotification = undefined;
	if (id === undefined || !isUndoOffered.value || !undoDescription.value) return;
	removeUndoNotification = useNotificationStore().notify({
		text: describeUndo(undoDescription.value),
		status: "success",
		duration: UNDO_DURATION_MS,
		action: { text: t("common.actions.undo"), handler: onUndo },
	});
});

// A later change ends the undo offer, so its notification must not stay clickable.
watch(isUndoOffered, (offered) => {
	if (!offered && !isUndoing.value) {
		removeUndoNotification?.();
		removeUndoNotification = undefined;
	}
});

defineExpose({ openCreateDialog, startSelection });
</script>

<style scoped>
.room-group-list {
	display: flex;
	flex-direction: column;
}

.room-grouped-overview :deep(.room-group-section) {
	margin-bottom: 32px;
}

.room-grouped-overview :deep(.room-group-section--collapsed) {
	margin-bottom: 8px;
}

.room-group-add-row :deep(.v-btn__content) {
	white-space: normal;
}

/* Room below the content while selecting, so the last cards can be scrolled fully above the sticky bar. */
.room-grouped-overview--selecting .room-group-add-row {
	margin-bottom: 160px;
}

.room-selection-summary {
	flex: 1 1 auto;
	min-width: 0;
}

.room-selection-bar--xs .room-selection-summary {
	flex-basis: 100%;
}

.room-selection-bar--xs .room-selection-actions {
	width: 100%;
	justify-content: flex-end;
}

.room-selection-bar--xs .room-selection-move {
	flex-grow: 1;
}

/* Stays in view at the bottom of the viewport while rooms are selected. */
.room-selection-bar {
	position: sticky;
	bottom: 16px;
	z-index: 5;
	background-color: rgb(var(--v-theme-surface));
	color: rgb(var(--v-theme-on-surface));
}
</style>
