<template>
	<KebabMenu
		class="mx-2"
		:aria-label="t('pages.roomDetails.ariaLabels.menu')"
		data-testid="room-menu"
	>
		<KebabMenuActionEdit
			v-if="canEditRoom"
			@click="() => $emit('room:edit')"
			:aria-label="t('pages.roomDetails.ariaLabels.menu.action.edit')"
		/>
		<KebabMenuActionEditMembers
			v-if="canAddRoomMembers"
			@click="() => $emit('room:manage-members')"
			:aria-label="t('pages.rooms.members.manage')"
		/>
		<KebabMenuActionDelete
			v-if="canDeleteRoom"
			@click="onDeleteRoom"
			:aria-label="t('pages.roomDetails.ariaLabels.menu.action.delete')"
			scope-language-key="common.labels.room"
			:name="roomName"
		/>

		<KebabMenuActionLeaveRoom
			v-if="canLeaveRoom"
			@click="() => $emit('room:leave')"
			:aria-label="t('pages.rooms.leaveRoom.menu')"
		/>
	</KebabMenu>
</template>

<script setup lang="ts">
import {
	KebabMenu,
	KebabMenuActionDelete,
	KebabMenuActionEdit,
	KebabMenuActionEditMembers,
	KebabMenuActionLeaveRoom,
} from "@ui-kebab-menu";
import { useRoomAuthorization } from "@feature-room";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const emit = defineEmits([
	"room:edit",
	"room:manage-members",
	"room:delete",
	"room:leave",
]);
defineProps({
	roomName: { type: String, required: false },
});

const onDeleteRoom = async (confirmation: Promise<boolean>) => {
	const shouldDelete = await confirmation;
	if (shouldDelete) {
		emit("room:delete");
	}
};

const { canAddRoomMembers, canEditRoom, canDeleteRoom, canLeaveRoom } =
	useRoomAuthorization();
</script>
