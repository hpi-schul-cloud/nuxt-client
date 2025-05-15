import { useLoadingState } from "@/composables/loadingState";
import { useRoomsState } from "@data-room";
import { AlertPayload } from "@/store/types/alert-payload";
import {
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useRoomCopy = () => {
	const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
	const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
	const { t } = useI18n();

	const { isLoadingDialogOpen } = useLoadingState(
		t("data-room.duplication.loading")
	);
	const { copyRoom } = useRoomsState();

	const isRoomCopyFeatureEnabled = computed(() => {
		return envConfigModule.getEnv.FEATURE_ROOMS_DUPLICATION_ENABLED;
	});

	const isRoomCopyInfoDialogOpen = ref(false);

	const openRoomCopyInfoDialog = () => {
		isRoomCopyInfoDialogOpen.value = true;
	};

	const closeRoomCopyInfoDialog = () => {
		isRoomCopyInfoDialogOpen.value = false;
	};

	const duplicate = async (roomId: string) => {
		closeRoomCopyInfoDialog();
		isLoadingDialogOpen.value = true;

		try {
			const copyId = await copyRoom(roomId);
			showSuccess();
			return copyId;
		} catch {
			showTimeout();
		} finally {
			isLoadingDialogOpen.value = false;
		}
	};

	const showSuccess = () => {
		const notifierPayload: AlertPayload = {
			text: t("data-room.duplication.alert.success"),
			status: "success",
		};

		notifierModule.show(notifierPayload);
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const showFailure = () => {
		notifierModule.show({
			text: t("data-room.duplication.alert.error"),
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

	return {
		isRoomCopyFeatureEnabled,
		isRoomCopyInfoDialogOpen,
		openRoomCopyInfoDialog,
		closeRoomCopyInfoDialog,
		duplicate,
	};
};
