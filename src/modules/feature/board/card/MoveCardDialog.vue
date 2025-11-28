<template>
	<Dialog
		v-model:is-dialog-open="isDialogOpen"
		:are-actions-disabled="isMoving"
		:message="t('components.molecules.move.card.title')"
		confirm-btn-lang-key="common.actions.move"
		:confirm-btn-disabled="!selectedColumnId"
		:loading="isMoving"
		data-testid="move-card-dialog"
		@confirm="onConfirm"
		@cancel="isDialogOpen = false"
	>
		<template #content>
			<WarningAlert v-if="availableRooms?.length === 0" class="mb-2">
				{{ t("common.alerts.room.not.available") }}
			</WarningAlert>

			<p class="text-lg mt-2" data-testid="move-card-dialog-question">
				{{ dialogQuestion }}
			</p>

			<VForm id="moveCardForm" data-testid="move-card-form">
				<VSelect
					v-model="selectedRoomId"
					:items="availableRooms"
					:disabled="isMoving"
					item-value="id"
					item-title="name"
					:hint="t('components.molecules.move.card.hint.restriction')"
					:label="t('components.molecules.label.room')"
					:placeholder="t('common.labels.room')"
					:menu-props="{ attach: '#moveCardForm' }"
					data-testid="move-card-select-room"
					@update:menu="resetBoardSelection"
				/>
				<VSelect
					v-model="selectedBoardId"
					:disabled="!selectedRoomId || isMoving"
					:label="t('components.molecules.label.board')"
					:items="boards"
					item-value="id"
					:placeholder="t('common.words.board')"
					:menu-props="{ attach: '#moveCardForm' }"
					data-testid="move-card-select-board"
					@update:menu="selectedColumnId = undefined"
				/>
				<VSelect
					v-model="selectedColumnId"
					:disabled="!selectedBoardId || isMoving"
					:label="t('components.molecules.label.section')"
					:items="columns"
					item-value="id"
					:placeholder="t('components.boardSection')"
					:menu-props="{ attach: '#moveCardForm' }"
					data-testid="move-card-select-column"
				/>
			</VForm>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import { useCardDialogData } from "./card-dialog-composable";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { Permission } from "@/serverApi/v3";
import { RoomItem } from "@/types/room/Room";
import { useBoardStore, useCardStore } from "@data-board";
import { useRoomStore } from "@data-room";
import { WarningAlert } from "@ui-alert";
import { Dialog } from "@ui-dialog";
import { sortBy } from "lodash-es";
import { computed, onBeforeMount, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
	cardId: string;
	hasRelocateBoardContentPermission: boolean;
	roomId?: string;
}>();

const rooms = ref<RoomItem[]>();

onBeforeMount(async () => {
	const result = await useRoomStore().fetchRoomsPlain();
	rooms.value = result?.data?.data;

	if (props.roomId && availableRooms.value?.find((r) => r.id === props.roomId)) {
		selectedRoomId.value = props.roomId;
	} else {
		selectedRoomId.value = undefined;
	}
});

const availableRooms = computed(() => {
	if (props.hasRelocateBoardContentPermission) {
		return sortBy(
			rooms.value?.filter((room) => room.permissions.includes(Permission.RoomEditContent)),
			(r) => r.name
		);
	} else {
		return rooms.value?.filter((r) => r.id === props.roomId);
	}
});
const { selectedBoardId, selectedColumnId, selectedRoomId, resetBoardSelection, columns, boards } = useCardDialogData();

const isDialogOpen = defineModel("is-dialog-open", {
	type: Boolean,
	default: false,
});

const { moveCardToBoardRequest, getCardLocation } = useBoardStore();

const { execute, isRunning: isMoving } = useSafeAxiosTask();

const dialogQuestion = computed(() => {
	const card = useCardStore().getCard(props.cardId);
	return t("components.molecules.move.card.question", {
		title: card?.title ? ` "${card.title}"` : "",
	});
});

const onConfirm = async () => {
	const cardLocation = getCardLocation(props.cardId);

	await execute(
		async () =>
			await moveCardToBoardRequest({
				cardId: props.cardId,
				toColumnId: selectedColumnId.value as string,
				fromColumnId: cardLocation?.columnId as string,
			}),
		t("common.notifications.errors.notMoved", {
			type: t("components.boardColumn"),
		})
	);

	isDialogOpen.value = false;
};
</script>
