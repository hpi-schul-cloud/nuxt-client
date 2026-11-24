<template>
	<div ref="rootRef" class="room-grouped-overview mt-8" data-testid="room-grouped-overview">
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
			<RoomGroupSection
				v-if="isUngroupedVisible"
				:rooms="view.ungrouped"
				:show-heading="view.groups.length > 0"
				:index-offset="0"
				:disabled="!canEdit"
				:is-dragging-room="isDraggingRoom"
				@drop="onRoomDrop"
				@drag-start="isDraggingRoom = true"
				@drag-end="isDraggingRoom = false"
				@move-to-group="openMoveDialog"
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
						@drop="onRoomDrop"
						@drag-start="isDraggingRoom = true"
						@drag-end="isDraggingRoom = false"
						@move-to-group="openMoveDialog"
						@toggle="onToggleGroup(element, $event)"
						@rename="openRenameDialog(element)"
						@delete="requestDelete(element)"
						@move-up="onMoveGroup(element, -1)"
						@move-down="onMoveGroup(element, 1)"
					/>
				</template>
			</Sortable>
		</template>

		<div v-if="!hasLoadError" class="room-group-add-row mt-6">
			<VBtn
				variant="tonal"
				size="large"
				block
				class="justify-start"
				:prepend-icon="mdiPlus"
				:disabled="!isReady"
				data-testid="room-group-add"
				@click="openCreateDialog"
			>
				{{ t("pages.rooms.groups.add") }}
			</VBtn>
			<VDivider />
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
			@after-leave="applyPendingFocus"
		/>
		<RoomGroupDeleteDialog
			v-model="deleteDialog.isOpen"
			:group-name="deleteDialog.group?.name ?? ''"
			:is-deleting="deleteDialog.isDeleting || isMutating"
			@confirm="onDeleteConfirm"
			@cancel="closeDeleteDialog"
		/>
		<RoomMoveDialog
			v-model="moveDialog.isOpen"
			:room-name="moveDialog.room?.name ?? ''"
			:targets="moveTargets"
			:current-key="moveDialog.sourceKey"
			:is-moving="moveDialog.isMoving || isMutating"
			@confirm="onMoveDialogConfirm"
			@cancel="closeMoveDialog"
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
import RoomMoveDialog from "./RoomMoveDialog.vue";
import { useAriaLiveNotifier } from "@/composables/ariaLiveNotifier";
import { RoomItem } from "@/types/room/Room";
import { notifySuccess } from "@data-app";
import {
	RoomArrangementView,
	RoomGroupNameErrorReason,
	RoomGroupView,
	RoomMoveCommand,
	useRoomArrangementStore,
	useRoomStore,
} from "@data-room";
import { mdiPlus } from "@icons/material";
import { WarningAlert } from "@ui-alert";
import { getSortableOptions } from "@util-sorting";
import { usePreferredReducedMotion } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import { computed, nextTick, reactive, ref, useTemplateRef } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { notifyOnScreenReader } = useAriaLiveNotifier();

const arrangementStore = useRoomArrangementStore();
const { view, groups, canEdit, isReady, isMutating, isLoading, hasLoadError, roomsStatus, confirmGroupDeletion } =
	storeToRefs(arrangementStore);
const { rooms } = storeToRefs(useRoomStore());

const rootRef = useTemplateRef("rootRef");
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
		disabled: !canEdit.value,
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

const focusElement = (selector: string) => {
	const element = rootRef.value?.querySelector<HTMLElement>(selector);
	element?.focus();
	return element !== null && element !== undefined;
};

const headingSelector = (key: string) => `#room-group-heading-${key}`;
const addButtonSelector = "[data-testid='room-group-add']";

const applyPendingFocus = async () => {
	if (!pendingFocusSelector) return;
	await nextTick();
	if (focusElement(pendingFocusSelector)) {
		pendingFocusSelector = undefined;
	}
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

const moveDialog = reactive<{ isOpen: boolean; room?: RoomItem; sourceKey?: string; isMoving: boolean }>({
	isOpen: false,
	isMoving: false,
});

const moveTargets = computed<RoomMoveTarget[]>(() => [
	{ key: UNGROUPED_SECTION_KEY, label: t("pages.rooms.groups.ungrouped"), testId: "room-move-target-ungrouped" },
	...groups.value.map((group, index) => ({ key: group.id, label: group.name, testId: `room-move-target-${index}` })),
]);

const closeMoveDialog = () => {
	if (!moveDialog.isMoving) moveDialog.isOpen = false;
};

const openMoveDialog = (room: RoomItem) => {
	const current = view.value;
	if (!current || !canEdit.value) return;
	const sourceKey = findRoomSectionKey(current, room.id);
	if (!sourceKey) return;

	moveDialog.room = room;
	moveDialog.sourceKey = sourceKey;
	moveDialog.isOpen = true;
};

const onMoveDialogConfirm = async (targetKey: string) => {
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
		await nextTick();
		focusElement(`[data-room-id='${room.id}'] [data-testid='room-card-menu']`);
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
	const result = await arrangementStore.updateGroupOrder(ids);
	if (result.success && movedGroup) {
		notifyOnScreenReader(
			t("pages.rooms.groups.announce.groupMoved", { name: movedGroup.name, position: groupPosition(movedId) })
		);
	}
};

const onToggleGroup = async (group: RoomGroupView, collapsed: boolean) => {
	if (!canEdit.value) return;
	const result = await arrangementStore.setGroupCollapsed(group.id, collapsed);
	if (result.success) {
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
}>({ isOpen: false, mode: "create", initialName: "", isSaving: false });

const openCreateDialog = () => {
	Object.assign(nameDialog, { mode: "create", groupId: undefined, initialName: "", serverError: undefined });
	nameDialog.isOpen = true;
};

const openRenameDialog = (group: RoomGroupView) => {
	if (!canEdit.value) return;
	Object.assign(nameDialog, { mode: "rename", groupId: group.id, initialName: group.name, serverError: undefined });
	nameDialog.isOpen = true;
};

const closeNameDialog = () => {
	if (!nameDialog.isSaving) nameDialog.isOpen = false;
};

const onNameSubmit = async (name: string) => {
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
	notifyOnScreenReader(
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
	const message = t("pages.rooms.groups.announce.deleted", { name: group.name });
	if (withDialog) {
		notifyOnScreenReader(message);
	} else {
		notifySuccess(message);
	}
	await focusAfterDialog(focusSelector);
};

const closeDeleteDialog = () => {
	if (!deleteDialog.isDeleting) deleteDialog.isOpen = false;
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
</script>

<style scoped>
.room-group-list {
	display: flex;
	flex-direction: column;
}

.room-grouped-overview :deep(.room-group-section) {
	margin-bottom: 32px;
}

.room-group-add-row :deep(.v-btn__content) {
	white-space: normal;
}
</style>
