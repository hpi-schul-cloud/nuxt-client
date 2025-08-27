<template>
	<RoomCopyInfoDialog
		v-if="isRoomCopyInfoDialogOpen"
		@copy:cancel="onCancelCopy"
		@copy:confirm="onConfirmCopy"
		@copy:close="onClose"
	/>
</template>

<script setup lang="ts">
import { useLoadingState } from "@/composables/loadingState";
import { CopyApiResponseStatusEnum, RoomApiFactory } from "@/serverApi/v3";
import { RoomDetails } from "@/types/room/Room";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import RoomCopyInfoDialog from "./RoomCopyInfoDialog.vue";
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

const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
const { t } = useI18n();
const roomApi = RoomApiFactory(undefined, "/v3", $axios);
const isRoomCopyInfoDialogOpen = ref(false);
const { isLoadingDialogOpen } = useLoadingState(t("data-room.copy.loading"));

onMounted(() => {
	isRoomCopyInfoDialogOpen.value = true;
	isLoadingDialogOpen.value = false;
});

const onClose = () => {
	isRoomCopyInfoDialogOpen.value = false;
};

const onCancelCopy = () => {
	onClose();
	emit("copy:cancel");
	emit("copy:ended");
};

const onConfirmCopy = async () => {
	onClose();
	isLoadingDialogOpen.value = true;

	try {
		const response = await roomApi.roomControllerCopyRoom(props.room.id);
		const copyResult = response.data;
		if (
			copyResult.status === CopyApiResponseStatusEnum.Failure ||
			copyResult.id === undefined
		) {
			showFailure();
			emit("copy:error", copyResult.id);
		} else {
			showSuccess();
			emit("copy:success", copyResult.id);
		}
	} catch (error) {
		showTimeout();
		const responseError = mapAxiosErrorToResponseError(error);
		throw createApplicationError(responseError.code);
	} finally {
		isLoadingDialogOpen.value = false;
		await nextTick();
		emit("copy:ended");
	}
};

const showSuccess = () => {
	notifierModule.show({
		text: t("data-room.copy.alert.success"),
		status: "success",
	});
};

const showFailure = () => {
	notifierModule.show({
		text: t("data-room.copy.alert.error"),
		status: "error",
		autoClose: false,
	});
};

const showTimeout = () => {
	notifierModule.show({
		text: t("components.molecules.copyResult.timeoutCopy"),
		status: "info",
		autoClose: false,
	});
};
</script>
