<template>
	<div v-if="isLoading" />
	<template v-else>
		<template v-if="isRoom">
			<DefaultWireframe max-width="short" :breadcrumbs="breadcrumbs">
				<template #header v-if="room">
					<div class="d-flex align-items-center">
						<h1 class="text-h3 pl-2 mb-4" data-testid="room-title">
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
				<RoomDetails :room="room" />
				<ConfirmationDialog />
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
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
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
import { useTitle } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, ComputedRef, onUnmounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);

const route = useRoute();
const router = useRouter();

const roomDetailsStore = useRoomDetailsStore();
const { isLoading, room, roomVariant } = storeToRefs(roomDetailsStore);
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
