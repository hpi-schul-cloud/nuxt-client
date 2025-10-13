<template>
	<KebabMenu class="mx-2" :aria-label="t('pages.roomDetails.ariaLabels.menu')" data-testid="room-menu">
		<KebabMenuActionEdit v-if="canEditRoom" @click="() => $emit('room:edit')" />
		<KebabMenuActionRoomMembers
			v-if="canViewRoom"
			:members-info-text="membersInfoText"
			@click="() => $emit('room:manage-members')"
		/>
		<KebabMenuActionRoomCopy v-if="isRoomCopyFeatureEnabled && canCopyRoom" @click="() => $emit('room:copy')" />
		<KebabMenuActionShare v-if="isRoomShareFeatureEnabled && canShareRoom" @click="() => $emit('room:share')" />
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
import { useEnvConfig } from "@data-env";
import { useRoomAuthorization } from "@data-room";
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

defineProps({
	roomName: { type: String, required: false, default: undefined },
});

const emit = defineEmits(["room:edit", "room:manage-members", "room:delete", "room:copy", "room:share", "room:leave"]);

const { t } = useI18n();

const isRoomCopyFeatureEnabled = computed(() => useEnvConfig().value.FEATURE_ROOM_COPY_ENABLED);
const isRoomShareFeatureEnabled = computed(() => useEnvConfig().value.FEATURE_ROOM_SHARE);

const { canAddRoomMembers, canCopyRoom, canShareRoom, canEditRoom, canDeleteRoom, canViewRoom } =
	useRoomAuthorization();

const membersInfoText = computed(() =>
	canAddRoomMembers.value ? t("pages.rooms.members.manage") : t("pages.rooms.members.view")
);

const onDeleteRoom = async (confirmation: Promise<boolean>) => {
	const shouldDelete = await confirmation;
	if (shouldDelete) {
		emit("room:delete");
	}
};
</script>
