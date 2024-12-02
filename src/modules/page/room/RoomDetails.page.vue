<template>
	<DefaultWireframe
		max-width="full"
		:breadcrumbs="breadcrumbs"
		:fabItems="fabItems"
		@onFabItemClick="fabItemClickHandler"
	>
		<template #header>
			<div class="d-flex align-items-center">
				<h1 class="text-h3 mb-4" data-testid="room-title">
					{{ roomTitle }}
				</h1>
				<RoomMenu
					@room:edit="onEdit"
					@room:manage-members="onManageMembers"
					@room:delete="onDelete"
				/>
			</div>
		</template>
		<BoardGrid :boards="roomBoards" />
		<ConfirmationDialog />
		<SelectBoardLayoutDialog
			v-if="boardLayoutsEnabled"
			v-model="boardLayoutDialogIsOpen"
			@select:multi-column="createBoard(BoardLayout.Columns)"
			@select:single-column="createBoard(BoardLayout.List)"
		/>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import {
	BoardLayout,
	BoardApiFactory,
	CreateBoardBodyParams,
	BoardParentType,
	ImportUserResponseRoleNamesEnum as Roles,
} from "@/serverApi/v3";
import { envConfigModule, authModule } from "@/store";
import { $axios } from "@/utils/api";
import { buildPageTitle } from "@/utils/pageTitle";
import { useRoomDetailsStore, useRoomsState } from "@data-room";
import { BoardGrid, RoomMenu } from "@feature-room";
import {
	mdiViewGridPlusOutline,
	mdiViewDashboardOutline,
	mdiPlus,
} from "@icons/material";
import {
	ConfirmationDialog,
	useDeleteConfirmationDialog,
} from "@ui-confirmation-dialog";
import { SelectBoardLayoutDialog } from "@ui-room-details";
import { useTitle } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, ComputedRef, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const { deleteRoom } = useRoomsState();
const { askDeleteConfirmation } = useDeleteConfirmationDialog();
const router = useRouter();

const { room, roomBoards } = storeToRefs(useRoomDetailsStore());

const pageTitle = computed(() =>
	buildPageTitle(`${room.value?.name} - ${t("pages.roomDetails.title")}`)
);
useTitle(pageTitle);

const roomTitle = computed(() => {
	if (room.value) {
		return room.value.name;
	}
	return t("pages.roomDetails.title");
});

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

const onDelete = async () => {
	if (!room.value) return;

	const shouldDelete = await askDeleteConfirmation(
		room.value?.name,
		"common.labels.room"
	);

	if (shouldDelete) {
		await deleteRoom(room.value!.id);
		router.push({
			name: "rooms",
		});
	}
};

const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => {
	if (room.value != null) {
		return [
			{
				title: t("pages.rooms.title"),
				to: "/rooms",
			},
			{
				title: room.value.name,
				disabled: true,
			},
		];
	}
	return [];
});

const boardLayoutsEnabled = computed(
	() => envConfigModule.getEnv.FEATURE_BOARD_LAYOUT_ENABLED
);

const boardLayoutDialogIsOpen = ref(false);

const createBoard = async (layout: BoardLayout) => {
	if (!room.value) return;

	const boardApi = BoardApiFactory(undefined, "/v3", $axios);

	const params: CreateBoardBodyParams = {
		title: t("pages.roomDetails.board.defaultName"),
		parentId: room.value.id,
		parentType: BoardParentType.Room,
		layout,
	};
	const boardId = (await boardApi.boardControllerCreateBoard(params)).data.id;

	router.push(`/boards/${boardId}`);
};

const fabItems = computed(() => {
	const actions = [];
	// TODO refine permissions
	if (
		authModule.getUserPermissions.includes("COURSE_EDIT".toLowerCase()) &&
		authModule.getUserRoles.includes(Roles.Teacher)
	) {
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
		createBoard(BoardLayout.Columns);
	}
};
</script>
