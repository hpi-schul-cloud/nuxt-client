<template>
	<DefaultWireframe
		max-width="full"
		:breadcrumbs="breadcrumbs"
		:fab-items="fabItems"
		@on-fab-item-click="fabItemClickHandler"
	>
		<template #header>
			<div class="d-flex align-items-center">
				<h1 class="text-h3 mb-4" data-testid="room-title">
					{{ roomTitle }}
				</h1>
				<RoomMenu
					:room-name="room?.name"
					@room:edit="onEdit"
					@room:manage-members="onManageMembers"
					@room:duplicate="onDuplicate"
					@room:delete="onDelete"
					@room:leave="onLeaveRoom"
				/>
			</div>
		</template>
		<BoardGrid :boards="visibleBoards" />
		<ConfirmationDialog />
		<SelectBoardLayoutDialog
			v-if="boardLayoutsEnabled && canCreateRoom"
			v-model="boardLayoutDialogIsOpen"
			@select="onCreateBoard"
		/>
		<LeaveRoomProhibitedDialog v-model="isLeaveRoomProhibitedDialogOpen" />
		<DuplicationInfoDialog
			v-model="isDuplicationInfoDialogOpen"
			@duplication:cancel="cancelDuplication"
			@duplication:confirm="confirmDuplication"
		/>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { BoardLayout } from "@/serverApi/v3";
import { authModule } from "@/store";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import {
	useRoomDetailsStore,
	useRoomsState,
	useRoomAuthorization,
	useRoomDuplication,
} from "@data-room";
import { BoardGrid, RoomMenu, DuplicationInfoDialog } from "@feature-room";
import {
	mdiPlus,
	mdiViewDashboardOutline,
	mdiViewGridPlusOutline,
} from "@icons/material";
import {
	ConfirmationDialog,
	useConfirmationDialog,
} from "@ui-confirmation-dialog";
import {
	SelectBoardLayoutDialog,
	LeaveRoomProhibitedDialog,
} from "@ui-room-details";
import { useTitle } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, ComputedRef, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const router = useRouter();
const { t } = useI18n();
const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);

const { deleteRoom, leaveRoom } = useRoomsState();
const { askConfirmation } = useConfirmationDialog();

const roomDetailsStore = useRoomDetailsStore();
const { room, roomBoards } = storeToRefs(roomDetailsStore);
const { createBoard } = roomDetailsStore;

const isLeaveRoomProhibitedDialogOpen = ref(false);

const pageTitle = computed(() =>
	buildPageTitle(`${room.value?.name} - ${t("pages.roomDetails.title")}`)
);
useTitle(pageTitle);

const { canCreateRoom, canDeleteRoom, canEditRoomContent, canLeaveRoom } =
	useRoomAuthorization();

const visibleBoards = computed(() =>
	roomBoards.value?.filter(
		(board) => board.isVisible || canEditRoomContent.value
	)
);

const roomTitle = computed(() => {
	return room.value ? room.value.name : t("pages.roomDetails.title");
});

const boardLayoutsEnabled = computed(
	() => envConfigModule.getEnv.FEATURE_BOARD_LAYOUT_ENABLED
);

const boardLayoutDialogIsOpen = ref(false);

const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => {
	return [
		{
			title: t("pages.rooms.title"),
			to: "/rooms",
		},
		{
			title: roomTitle.value,
			disabled: true,
		},
	];
});

const fabItems = computed(() => {
	if (!canCreateRoom.value) return undefined;
	if (!canEditRoomContent.value) return undefined;

	const actions = [];

	if (boardLayoutsEnabled.value) {
		actions.push({
			label: t("pages.courseRoomDetails.fab.add.board"),
			icon: mdiViewGridPlusOutline,
			customEvent: "board-type-dialog-open",
			dataTestId: "fab_button_add_board",
			ariaLabel: t("pages.courseRoomDetails.fab.add.board"),
		});
	} else {
		actions.push({
			label: t("pages.courseRoomDetails.fab.add.columnBoard"),
			icon: mdiViewDashboardOutline,
			customEvent: "board-create",
			dataTestId: "fab_button_add_column_board",
			ariaLabel: t("pages.courseRoomDetails.fab.add.columnBoard"),
		});
	}

	const items = {
		icon: mdiPlus,
		title: t("common.actions.create"),
		ariaLabel: t("common.actions.create"),
		dataTestId: "add-content-button",
		actions: actions,
	};

	return items;
});

const fabItemClickHandler = (event: string) => {
	if (event === "board-type-dialog-open") {
		boardLayoutDialogIsOpen.value = true;
	} else if (event === "board-create") {
		onCreateBoard(BoardLayout.Columns);
	}
};

const onEdit = () => {
	if (!room.value) return;

	router.push({
		name: "room-edit",
		params: {
			id: room.value.id,
		},
	});
};

const onManageMembers = () => {
	if (!room.value) return;

	router.push({
		name: "room-members",
		params: {
			id: room.value.id,
		},
	});
};

// begin - Duplication Feature

const {
	isDuplicationInfoDialogOpen,
	openDuplicationInfoDialog,
	closeDuplicationInfoDialog,
	duplicate,
} = useRoomDuplication();

const onDuplicate = async () => {
	// TODO Permission check
	if (!room.value) return;

	openDuplicationInfoDialog();
};

const cancelDuplication = () => {
	closeDuplicationInfoDialog();
};

const confirmDuplication = async () => {
	await duplicate();

	router.push({
		name: "room-details",
		params: {
			id: room.value?.id,
		},
	});
};
// end - Duplication Feature

const onDelete = async () => {
	if (!room.value || !canDeleteRoom.value) return;

	await deleteRoom(room.value.id);
	router.push({ name: "rooms" });
};

const onLeaveRoom = async () => {
	if (!canLeaveRoom.value) {
		isLeaveRoomProhibitedDialogOpen.value = true;
		return;
	}

	const currentUserId = authModule.getUser?.id;
	const roomId = room.value?.id;
	if (!currentUserId || !roomId) return;

	const shouldLeave = await askConfirmation({
		message: t("pages.rooms.leaveRoom.confirmation", {
			roomName: room.value?.name,
		}),
		confirmActionLangKey: "common.actions.leave",
	});

	if (!shouldLeave) return;
	await leaveRoom(roomId);
	router.push("/rooms");
};

const onCreateBoard = async (layout: BoardLayout) => {
	if (!room.value || !canEditRoomContent.value) return;

	const boardId = await createBoard(
		room.value.id,
		layout,
		t("pages.roomDetails.board.defaultName")
	);

	router.push(`/boards/${boardId}`);
};
</script>
