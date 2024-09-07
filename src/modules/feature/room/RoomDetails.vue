<template>
	<template v-if="room">
		<DefaultWireframe max-width="short" :breadcrumbs="breadcrumbs">
			<template #header>
				<div class="d-flex align-items-center">
					<h1 class="text-h3 pl-2 margin-bottom">{{ room.title }}</h1>
					<KebabMenu class="mx-2" data-testid="room-menu">
						<VListItem
							role="menuitem"
							:to="`/rooms/${room.id}/edit`"
							data-testid="room-action-edit"
							aria-label="Raum bearbeiten"
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
							aria-label="Raum löschen"
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
import { Room } from "@/types/room/Room";
import { KebabMenu } from "@ui-kebab-menu";
import { mdiPencilOutline, mdiTrashCanOutline } from "@icons/material";
import { useRoomsState } from "@data-room";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { useRouter } from "vue-router";

const props = defineProps({
	room: { type: Object as PropType<Room | undefined> },
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
				title: t("pages.rooms.active.title"),
				to: "/rooms",
			},
			{
				title: room.value.title,
				disabled: true,
			},
		];
	}
	return [];
});

const onDelete = async () => {
	if (!room.value) return;
	const shouldDelete = await askDeleteConfirmation(
		"blub",
		"components.cardElement.mediaExternalToolElement"
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
