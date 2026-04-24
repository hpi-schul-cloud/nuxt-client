<template>
	<DefaultWireframe max-width="full" main-with-bottom-padding :breadcrumbs="breadcrumbs" :fab-items="fabAction">
		<template #header>
			<div class="d-flex align-center">
				<h1 data-testid="room-title">{{ roomTitle }}</h1>
				<RoomMenu
					class="pt-1"
					:room-name="room.name"
					@room:edit="onEdit"
					@room:manage-members="onManageMembers"
					@room:copy="onCopy"
					@room:share="onShare"
					@room:delete="onDelete"
					@room:leave="onLeaveRoom"
				/>
			</div>
		</template>
		<EmptyState
			v-if="visibleBoards.length === 0"
			data-testid="empty-state-room-details"
			:title="t('pages.roomDetails.emptyState')"
		>
			<template #media>
				<LearningContentEmptyStateSvg />
			</template>
		</EmptyState>
		<RoomContentGrid :room-id="room.id" :boards="visibleBoards" />
		<SelectBoardLayoutDialog
			v-if="allowedOperations.editContent"
			v-model="boardLayoutDialogIsOpen"
			@select="onCreateBoard"
		/>
		<LeaveRoomProhibitedDialog v-model="isLeaveRoomProhibitedDialogOpen" />
		<CopyDialog
			:is-open="isCopyDialogOpen"
			:copy-item-type="copyItemType"
			@confirm="onConfirmCopy"
			@cancel="onCancelCopy"
		/>
		<ShareModal :type="ShareTokenParentType.ROOM" />
	</DefaultWireframe>
</template>

<script setup lang="ts">
import ShareModal from "@/components/share/ShareModal.vue";
import { BoardLayout } from "@/types/board/Board";
import { RoomDetails } from "@/types/room/Room";
import { ShareTokenParentType } from "@/types/sharing/Token";
import { askConfirmation } from "@/utils/confirmation-dialog.utils";
import { injectStrict, SHARE_MODULE_KEY } from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import { useAppStoreRefs } from "@data-app";
import { useRoomAllowedOperations, useRoomDetailsStore, useRoomStore } from "@data-room";
import { useCopyFlow } from "@feature-copy";
import { CopyDialog } from "@feature-copy";
import { RoomContentGrid, RoomMenu } from "@feature-room";
import { mdiPlus } from "@icons/material";
import { EmptyState, LearningContentEmptyStateSvg } from "@ui-empty-state";
import { Breadcrumb, DefaultWireframe } from "@ui-layout";
import { LeaveRoomProhibitedDialog, SelectBoardLayoutDialog } from "@ui-room-details";
import { FabAction } from "@ui-speed-dial-menu";
import { useTitle } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, ComputedRef, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const props = defineProps<{ room: RoomDetails }>();
const room = toRef(props, "room");

const router = useRouter();
const { t } = useI18n();
const shareModule = injectStrict(SHARE_MODULE_KEY);

const roomDetailsStore = useRoomDetailsStore();
const { leaveRoom, deleteRoom } = useRoomStore();

const { roomBoards } = storeToRefs(roomDetailsStore);
const { createBoard } = roomDetailsStore;

const isLeaveRoomProhibitedDialogOpen = ref(false);

const pageTitle = computed(() => buildPageTitle(room.value.name, t("pages.roomDetails.title")));
useTitle(pageTitle);

const { allowedOperations } = useRoomAllowedOperations();

const visibleBoards = computed(() =>
	roomBoards.value?.filter((board) =>
		board.isVisible ? allowedOperations.value.viewContent : allowedOperations.value.viewDraftContent
	)
);

const roomTitle = computed(() => room.value.name);

const boardLayoutDialogIsOpen = ref(false);

const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => [
	{
		title: t("pages.rooms.title"),
		to: "/rooms",
	},
	{
		title: roomTitle.value,
		disabled: true,
	},
]);

const fabAction = computed<FabAction[] | undefined>(() =>
	allowedOperations.value.editContent
		? [
				{
					icon: mdiPlus,
					label: t("pages.roomDetails.fab.add.board"),
					dataTestId: "add-content-button",
					clickHandler: () => {
						boardLayoutDialogIsOpen.value = true;
					},
				},
			]
		: undefined
);

const onEdit = () => {
	router.push({
		name: "room-edit",
		params: {
			id: room.value.id,
		},
	});
};

const onManageMembers = () => {
	router.push({
		name: "room-members",
		params: {
			id: room.value.id,
		},
	});
};

const copyFlow = useCopyFlow();
const { isDialogOpen: isCopyDialogOpen, copyItemType, onConfirm: onConfirmCopy, onCancel: onCancelCopy } = copyFlow;

const onCopy = async () => {
	if (!allowedOperations.value.copyRoom) {
		return;
	}

	const { result: copyResult } = await copyFlow.executeCopyRoom(room.value.id);
	if (copyResult?.id) {
		await router.replace({ name: "room-details", params: { id: copyResult.id } });
	}
};

const onShare = () => {
	if (allowedOperations.value.shareRoom) {
		shareModule.startShareFlow({
			id: room.value.id,
			type: ShareTokenParentType.ROOM,
		});
	}
};

const onDelete = async () => {
	if (!allowedOperations.value.deleteRoom) return;

	await deleteRoom(room.value.id);
	router.push({ name: "rooms" });
};

const { user } = useAppStoreRefs();

const onLeaveRoom = async () => {
	if (!allowedOperations.value.leaveRoom) {
		isLeaveRoomProhibitedDialogOpen.value = true;
		return;
	}

	const currentUserId = user.value?.id;
	if (!currentUserId) return;
	const roomId = room.value.id;

	const shouldLeave = await askConfirmation({
		title: t("pages.rooms.leaveRoom.confirmation", {
			roomName: room.value.name,
		}),
		confirmBtnKey: "common.actions.leave",
	});

	if (!shouldLeave) return;
	await leaveRoom(roomId);
	router.push("/rooms");
};

const onCreateBoard = async (layout: BoardLayout) => {
	const boardId = await createBoard(room.value.id, layout, t("pages.roomDetails.board.defaultName"));
	router.push(`/boards/${boardId}`);
};
</script>
