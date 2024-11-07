<template>
	<div v-if="isLoading" />
	<template v-else>
		<template v-if="isRoom">
			<DefaultWireframe
				max-width="full"
				:breadcrumbs="breadcrumbs"
				:fabItems="fabItems"
				@onFabItemClick="fabItemClickHandler"
			>
				<template #header v-if="room">
					<div class="d-flex align-items-center">
						<h1 class="text-h3 mb-4" data-testid="room-title">
							{{ room.name }}
						</h1>
						<KebabMenu
							class="mx-2"
							:aria-label="$t('pages.roomDetails.ariaLabels.menu')"
							data-testid="room-menu"
						>
							<VListItem
								role="menuitem"
								:to="`/rooms/${room.id}/edit`"
								data-testid="room-action-edit"
								:aria-label="
									$t('pages.roomDetails.ariaLabels.menu.action.edit')
								"
							>
								<template v-slot:prepend>
									<VIcon :icon="mdiPencilOutline" />
								</template>
								<VListItemTitle>
									{{ $t("common.actions.edit") }}
								</VListItemTitle>
							</VListItem>

							<VListItem
								role="menuitem"
								:to="`/rooms/${room.id}/participants`"
								:aria-label="t('pages.rooms.participants.manageParticipants')"
							>
								<template #prepend>
									<VIcon :icon="mdiAccountGroupOutline" />
								</template>
								<VListItemTitle>
									{{ t("pages.rooms.participants.manageParticipants") }}
								</VListItemTitle>
							</VListItem>

							<VListItem
								role="menuitem"
								data-testid="room-action-delete"
								:aria-label="
									$t('pages.roomDetails.ariaLabels.menu.action.delete')
								"
								@click="onDelete"
							>
								<template v-slot:prepend>
									<VIcon :icon="mdiTrashCanOutline" />
								</template>
								<VListItemTitle>
									{{ $t("common.actions.delete") }}
								</VListItemTitle>
							</VListItem>
						</KebabMenu>
					</div>
				</template>
				<RoomDetails :room="room" :room-boards="roomBoards" />
				<ConfirmationDialog />
				<SelectBoardLayoutDialog
					v-if="boardLayoutsEnabled"
					v-model="boardLayoutDialogIsOpen"
					@select:multi-column="createBoard(BoardLayout.Columns)"
					@select:single-column="createBoard(BoardLayout.List)"
				/>
			</DefaultWireframe>
		</template>
		<template v-else>
			<CourseRoomDetailsPage />
		</template>
	</template>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import CourseRoomDetailsPage from "@/pages/course-rooms/CourseRoomDetails.page.vue";
import {
	AUTH_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import { RoomVariant, useRoomDetailsStore, useRoomsState } from "@data-room";
import { RoomDetails } from "@feature-room";
import {
	mdiPencilOutline,
	mdiTrashCanOutline,
	mdiAccountGroupOutline,
} from "@icons/material";
import {
	ConfirmationDialog,
	useDeleteConfirmationDialog,
} from "@ui-confirmation-dialog";
import { KebabMenu } from "@ui-kebab-menu";
import { SelectBoardLayoutDialog } from "@ui-room-details";
import { useTitle } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, ComputedRef, onUnmounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import {
	mdiPlus,
	mdiViewGridPlusOutline,
	mdiViewDashboardOutline,
} from "@icons/material";
import {
	BoardApiFactory,
	BoardLayout,
	BoardParentType,
	CreateBoardBodyParams,
	ImportUserResponseRoleNamesEnum as Roles,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";

const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
const authModule = injectStrict(AUTH_MODULE_KEY);

const route = useRoute();
const router = useRouter();

const roomDetailsStore = useRoomDetailsStore();
const { isLoading, room, roomVariant, roomBoards } =
	storeToRefs(roomDetailsStore);
const { deactivateRoom, fetchRoom, resetState } = roomDetailsStore;

const { t } = useI18n();
const { deleteRoom } = useRoomsState();
const { askDeleteConfirmation } = useDeleteConfirmationDialog();

const pageTitle = computed(() =>
	buildPageTitle(`${room.value?.name} - ${t("pages.roomDetails.title")}`)
);
useTitle(pageTitle);

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

watch(
	() => route.params.id,
	async () => {
		if (envConfigModule.getEnv["FEATURE_ROOMS_ENABLED"]) {
			await fetchRoom(route.params.id as string);
		} else {
			deactivateRoom();
		}
	},
	{ immediate: true }
);

const isRoom = computed(() => roomVariant.value === RoomVariant.ROOM);

const onDelete = async () => {
	if (!room.value) return;

	const shouldDelete = await askDeleteConfirmation(
		room.value.name,
		"common.labels.room"
	);

	if (shouldDelete) {
		await deleteRoom(room.value.id);
		router.push({
			name: "rooms",
		});
	}
};

onUnmounted(() => {
	resetState();
});
</script>
