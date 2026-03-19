<template>
	<KebabMenu class="mx-2" :aria-label="t('pages.roomDetails.ariaLabels.menu')" data-testid="room-menu">
		<KebabMenuActionEdit v-if="allowedOperations.updateRoom" @click="() => $emit('room:edit')" />
		<KebabMenuActionRoomMembers
			v-if="allowedOperations.viewMemberlist"
			:members-info-text="membersInfoText"
			@click="() => $emit('room:manage-members')"
		/>
		<KebabMenuActionRoomCopy
			v-if="isRoomCopyFeatureEnabled && allowedOperations.copyRoom"
			@click="() => $emit('room:copy')"
		/>
		<KebabMenuActionShare
			v-if="isRoomShareFeatureEnabled && allowedOperations.shareRoom"
			@click="() => $emit('room:share')"
		/>
		<KebabMenuActionDelete v-if="allowedOperations.deleteRoom" :name="roomName" @click="onDeleteRoom" />
		<KebabMenuActionLeaveRoom @click="() => $emit('room:leave')" />
	</KebabMenu>
</template>

<script setup lang="ts">
import { askDeletionForItem } from "@/utils/confirmation-dialog.utils";
import { useEnvConfig } from "@data-env";
import { useRoomAllowedOperations } from "@data-room";
import {
	KebabMenu,
	KebabMenuActionDelete,
	KebabMenuActionEdit,
	KebabMenuActionLeaveRoom,
	KebabMenuActionRoomCopy,
	KebabMenuActionRoomMembers,
	KebabMenuActionShare,
} from "@ui-kebab-menu";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	roomName: { type: String, required: true },
});

const emit = defineEmits(["room:edit", "room:manage-members", "room:delete", "room:copy", "room:share", "room:leave"]);

const { t } = useI18n();

const isRoomCopyFeatureEnabled = computed(() => useEnvConfig().value.FEATURE_ROOM_COPY_ENABLED);
const isRoomShareFeatureEnabled = computed(() => useEnvConfig().value.FEATURE_ROOM_SHARE);

const { allowedOperations } = useRoomAllowedOperations();

const membersInfoText = computed(() =>
	allowedOperations.value.addMembers ? t("pages.rooms.members.manage") : t("pages.rooms.members.view")
);

const onDeleteRoom = async () => {
	const shouldDelete = await askDeletionForItem(props.roomName, "common.labels.room");

	if (shouldDelete) {
		emit("room:delete");
	}
};
</script>
