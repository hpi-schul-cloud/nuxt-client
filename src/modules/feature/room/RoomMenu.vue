<template>
	<KebabMenu
		class="mx-2"
		:aria-label="t('pages.roomDetails.ariaLabels.menu')"
		data-testid="room-menu"
	>
		<KebabMenuActionEdit v-if="canEditRoom" @click="() => $emit('room:edit')" />
		<KebabMenuActionRoomMembers
			v-if="canViewRoom"
			:members-info-text="membersInfoText"
			@click="() => $emit('room:manage-members')"
		/>
		<KebabMenuActionDuplicate
			v-if="isRoomDuplicationFeatureEnabled && canDuplicateRoom"
			@click="() => $emit('room:duplicate')"
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
	KebabMenuActionDuplicate,
	KebabMenuActionEdit,
	KebabMenuActionRoomMembers,
	KebabMenuActionLeaveRoom,
} from "@ui-kebab-menu";
import { useRoomAuthorization, useRoomDuplication } from "@data-room";
import { useI18n } from "vue-i18n";
import { computed } from "vue";

defineProps({
	roomName: { type: String, required: false, default: undefined },
});

const emit = defineEmits([
	"room:edit",
	"room:manage-members",
	"room:delete",
	"room:duplicate",
	"room:leave",
]);

const { t } = useI18n();

const { isRoomDuplicationFeatureEnabled } = useRoomDuplication();

const onDeleteRoom = async (confirmation: Promise<boolean>) => {
	const shouldDelete = await confirmation;
	if (shouldDelete) {
		emit("room:delete");
	}
};

const {
	canAddRoomMembers,
	canDuplicateRoom,
	canEditRoom,
	canDeleteRoom,
	canViewRoom,
} = useRoomAuthorization();

const membersInfoText = computed(() =>
	canAddRoomMembers.value
		? t("pages.rooms.members.manage")
		: t("pages.rooms.members.view")
);
</script>
