<template>
	<RoomCopyInfoDialog v-if="isRoomCopyInfoDialogOpen" @copy:cancel="onCancelCopy" @copy:confirm="onConfirmCopy" />
</template>

<script setup lang="ts">
import RoomCopyInfoDialog from "./RoomCopyInfoDialog.vue";
import { useLoadingState } from "@/composables/loadingState";
import { CopyApiResponseStatusEnum } from "@/serverApi/v3";
import { RoomDetails } from "@/types/room/Room";
import { notifyError, notifySuccess } from "@data-app";
import { useRoomStore } from "@data-room";
import { nextTick, onMounted, PropType, ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	room: {
		type: Object as PropType<RoomDetails>,
		required: true,
	},
});

const emit = defineEmits<{
	(e: "copy:cancel"): void;
	(e: "copy:success", id: string): void;
	(e: "copy:error", id?: string): void;
	(e: "copy:ended"): void;
}>();

const { copyRoom } = useRoomStore();
const { t } = useI18n();
const isRoomCopyInfoDialogOpen = ref(false);
const { isLoadingDialogOpen } = useLoadingState(t("data-room.copy.loading"));

onMounted(() => {
	isRoomCopyInfoDialogOpen.value = true;
	isLoadingDialogOpen.value = false;
});

const onCancelCopy = () => {
	isRoomCopyInfoDialogOpen.value = false;
	emit("copy:cancel");
	emit("copy:ended");
};

const onConfirmCopy = async () => {
	isRoomCopyInfoDialogOpen.value = false;
	isLoadingDialogOpen.value = true;

	const { result } = await copyRoom(props.room?.id);

	if (result) {
		const copyResult = result.data;
		if (copyResult.status === CopyApiResponseStatusEnum.Failure || copyResult.id === undefined) {
			notifyError(t("data-room.copy.alert.error"), false);
			emit("copy:error", copyResult.id);
		} else {
			notifySuccess(t("data-room.copy.alert.success"));
			emit("copy:success", copyResult.id);
		}
	}

	isLoadingDialogOpen.value = false;
	await nextTick();
	emit("copy:ended");
};
</script>
