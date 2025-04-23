<template>
	<KebabMenu
		class="mx-2"
		:aria-label="t('pages.roomDetails.ariaLabels.menu')"
		data-testid="room-menu"
	>
		<KebabMenuActionEdit v-if="canEditRoom" @click="() => $emit('room:edit')" />
		<KebabMenuActionRoomMembers
			v-if="canViewRoom"
			:can-add-room-members="canAddRoomMembers"
			@click="() => $emit('room:manage-members')"
		/>
		<KebabMenuActionDelete
			v-if="canDeleteRoom"
			scope-language-key="common.labels.room"
			:name="roomName"
			@click="onDeleteRoom"
		/>

		<KebabMenuActionLeaveRoom @click="() => $emit('room:leave')" />
	</KebabMenu>
</template>

<script setup lang="ts">
import {
	KebabMenu,
	KebabMenuActionDelete,
	KebabMenuActionEdit,
	KebabMenuActionRoomMembers,
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
	roomName: { type: String, required: false, default: undefined },
});

const onDeleteRoom = async (confirmation: Promise<boolean>) => {
	const shouldDelete = await confirmation;
	if (shouldDelete) {
		emit("room:delete");
	}
};

const { canAddRoomMembers, canEditRoom, canDeleteRoom, canViewRoom } =
	useRoomAuthorization();
</script>
