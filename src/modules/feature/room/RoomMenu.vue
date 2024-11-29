<template>
	<KebabMenu
		class="mx-2"
		:aria-label="$t('pages.roomDetails.ariaLabels.menu')"
		data-testid="room-menu"
	>
		<VListItem
			role="menuitem"
			data-testid="room-action-edit"
			:aria-label="$t('pages.roomDetails.ariaLabels.menu.action.edit')"
			@click="() => $emit('room:edit')"
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
			data-testid="room-action-manage-members"
			:aria-label="$t('pages.rooms.members.manage')"
			@click="() => $emit('room:manage-members')"
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

defineEmits(["room:edit", "room:manage-members", "room:delete"]);
</script>
