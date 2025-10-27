<template>
	<DefaultWireframe
		max-width="full"
		:breadcrumbs="breadcrumbs"
		:fab-items="fabItems"
		@on-fab-item-click="fabItemClickHandler"
	>
		<template #header>
			<div class="d-flex align-center">
				<h1 data-testid="room-title">{{ roomTitle }}</h1>
				<RoomMenu
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
		<BoardGrid :room-id="room.id" :boards="visibleBoards" />
		<ConfirmationDialog />
		<SelectBoardLayoutDialog v-if="canEditRoomContent" v-model="boardLayoutDialogIsOpen" @select="onCreateBoard" />
		<LeaveRoomProhibitedDialog v-model="isLeaveRoomProhibitedDialogOpen" />
		<RoomCopyFlow v-if="hasRoomCopyStarted" :room="room" @copy:success="onCopySuccess" @copy:ended="onCopyEnded" />
		<ShareModal :type="ShareTokenParentType.Room" />
	</DefaultWireframe>
</template>

<script setup lang="ts">
import ShareModal from "@/components/share/ShareModal.vue";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { BoardLayout } from "@/types/board/Board";
import { RoomDetails } from "@/types/room/Room";
import { ShareTokenParentType } from "@/types/sharing/Token";
import { injectStrict, SHARE_MODULE_KEY } from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import { useAppStoreRefs } from "@data-app";
import { useRoomAuthorization, useRoomDetailsStore, useRoomsState } from "@data-room";
import { BoardGrid, RoomCopyFlow, RoomMenu } from "@feature-room";
import { mdiPlus, mdiViewGridPlusOutline } from "@icons/material";
import { ConfirmationDialog, useConfirmationDialog } from "@ui-confirmation-dialog";
import { EmptyState, LearningContentEmptyStateSvg } from "@ui-empty-state";
import { LeaveRoomProhibitedDialog, SelectBoardLayoutDialog } from "@ui-room-details";
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

const { deleteRoom, leaveRoom } = useRoomsState();
const { askConfirmation } = useConfirmationDialog();

const roomDetailsStore = useRoomDetailsStore();
const { roomBoards } = storeToRefs(roomDetailsStore);
const { createBoard } = roomDetailsStore;

const isLeaveRoomProhibitedDialogOpen = ref(false);

const pageTitle = computed(() => buildPageTitle(room.value.name, t("pages.roomDetails.title")));
useTitle(pageTitle);

const { canEditRoomContent, canLeaveRoom, canListDrafts, canViewRoom } = useRoomAuthorization();

const visibleBoards = computed(() =>
	roomBoards.value?.filter((board) => (board.isVisible ? canViewRoom.value : canListDrafts.value))
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
const fabItems = computed(() =>
	canEditRoomContent.value
		? {
				icon: mdiPlus,
				title: t("common.actions.create"),
				ariaLabel: t("common.actions.create"),
				dataTestId: "add-content-button",
				actions: [
					{
						label: t("pages.courseRoomDetails.fab.add.board"),
						icon: mdiViewGridPlusOutline,
						customEvent: "board-type-dialog-open",
						dataTestId: "fab_button_add_board",
						ariaLabel: t("pages.courseRoomDetails.fab.add.board"),
					},
				],
			}
		: undefined
);

const fabItemClickHandler = (event: string | undefined) => {
	if (event === "board-type-dialog-open") {
		boardLayoutDialogIsOpen.value = true;
	} else if (event === "board-create") {
		onCreateBoard(BoardLayout.Columns);
	}
};

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

const hasRoomCopyStarted = ref(false);

const onCopy = () => {
	hasRoomCopyStarted.value = true;
};

const onCopySuccess = (copyId: string) => {
	router.push({
		name: "room-details",
		params: {
			id: copyId,
		},
	});
};

const onCopyEnded = () => {
	hasRoomCopyStarted.value = false;
};

const onShare = () => {
	shareModule.startShareFlow({
		id: room.value.id,
		type: ShareTokenParentType.Room,
	});
};

const onDelete = async () => {
	await deleteRoom(room.value.id);
	router.push({ name: "rooms" });
};

const { user } = useAppStoreRefs();

const onLeaveRoom = async () => {
	if (!canLeaveRoom.value) {
		isLeaveRoomProhibitedDialogOpen.value = true;
		return;
	}

	const currentUserId = user.value?.id;
	if (!currentUserId) return;
	const roomId = room.value.id;

	const shouldLeave = await askConfirmation({
		message: t("pages.rooms.leaveRoom.confirmation", {
			roomName: room.value.name,
		}),
		confirmActionLangKey: "common.actions.leave",
	});

	if (!shouldLeave) {
		return;
	}
	await leaveRoom(roomId);
	router.push("/rooms");
};

const onCreateBoard = async (layout: BoardLayout) => {
	if (!canEditRoomContent.value) return;

	const boardId = await createBoard(room.value.id, layout, t("pages.roomDetails.board.defaultName"));

	router.push(`/boards/${boardId}`);
};
</script>
