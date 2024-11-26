<template>
	<KebabMenu
		class="mx-2"
		:aria-label="$t('pages.roomDetails.ariaLabels.menu')"
		data-testid="room-menu"
	>
		<VListItem
			role="menuitem"
			:to="`/rooms/${roomId}/edit`"
			data-testid="room-action-edit"
			:aria-label="$t('pages.roomDetails.ariaLabels.menu.action.edit')"
		>
			<template #prepend>
				<VIcon :icon="mdiPencilOutline" />
			</template>
			<VListItemTitle>
				{{ $t("common.actions.edit") }}
			</VListItemTitle>
		</VListItem>
		<VListItem
			role="menuitem"
			:to="`/rooms/${roomId}/members`"
			data-testid="room-action-manage-participants"
			:aria-label="$t('pages.rooms.members.manage')"
		>
			<template #prepend>
				<VIcon :icon="mdiAccountGroupOutline" />
			</template>
			<VListItemTitle>
				{{ $t("pages.rooms.members.manage") }}
			</VListItemTitle>
		</VListItem>
		<VListItem
			role="menuitem"
			data-testid="room-action-delete"
			:aria-label="$t('pages.roomDetails.ariaLabels.menu.action.delete')"
			@click="() => $emit('room:delete')"
		>
			<template #prepend>
				<VIcon :icon="mdiTrashCanOutline" />
			</template>
			<VListItemTitle>
				{{ $t("common.actions.delete") }}
			</VListItemTitle>
		</VListItem>
	</KebabMenu>
</template>

<script setup lang="ts">
import { KebabMenu } from "@ui-kebab-menu";
import {
	mdiPencilOutline,
	mdiTrashCanOutline,
	mdiAccountGroupOutline,
} from "@icons/material";

defineProps({
	roomId: { type: String, required: true },
});

defineEmits(["room:delete"]);
</script>
