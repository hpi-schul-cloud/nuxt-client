<template>
	<template v-if="room">
		<DefaultWireframe max-width="short" :breadcrumbs="breadcrumbs">
			<template #header>
				<div class="d-flex align-items-center">
					<h1 class="text-h3 pl-2 margin-bottom" data-testid="room-title">
						{{ room.title }}
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
							:aria-label="$t('pages.roomDetails.ariaLabels.menu.action.edit')"
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
			<div>[TODO - RoomDetails content]</div>
			<ConfirmationDialog />
		</DefaultWireframe>
	</template>
</template>

<script setup lang="ts">
import { computed, ComputedRef, PropType } from "vue";
import { useI18n } from "vue-i18n";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { ConfirmationDialog } from "@ui-confirmation-dialog";
import { RoomDetails } from "@/types/room/Room";
import { KebabMenu } from "@ui-kebab-menu";
import { mdiPencilOutline, mdiTrashCanOutline } from "@icons/material";
import { useRoomsState } from "@data-room";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { useRouter } from "vue-router";

const props = defineProps({
	room: { type: Object as PropType<RoomDetails> },
});

const { t } = useI18n();
const router = useRouter();
const { deleteRoom } = useRoomsState();
const { askDeleteConfirmation } = useDeleteConfirmationDialog();

const room = computed(() => props.room);

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

const onDelete = async () => {
	if (!room.value) return;

	const shouldDelete = await askDeleteConfirmation(
		room.value.title,
		"common.labels.room"
	);

	if (shouldDelete) {
		await deleteRoom(room.value.id);
		router.push({
			name: "rooms",
		});
	}
};
</script>

<style scoped>
.margin-bottom {
	margin-bottom: var(--space-md);
}
</style>
