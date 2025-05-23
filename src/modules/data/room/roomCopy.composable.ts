import { useLoadingState } from "@/composables/loadingState";
import { CopyApiResponseStatusEnum } from "@/serverApi/v3";
import { AlertPayload } from "@/store/types/alert-payload";
import { createApplicationError } from "@/utils/create-application-error.factory";
import {
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import { useRoomsState } from "@data-room";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useRoomCopy = () => {
	const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
	const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
	const { t } = useI18n();

	const { isLoadingDialogOpen } = useLoadingState(t("data-room.copy.loading"));
	const { copyRoom } = useRoomsState();

	const isRoomCopyFeatureEnabled = computed(() => {
		return envConfigModule.getEnv.FEATURE_ROOM_COPY_ENABLED;
	});

	const isRoomCopyInfoDialogOpen = ref(false);

	const openRoomCopyInfoDialog = () => {
		isRoomCopyInfoDialogOpen.value = true;
	};

	const closeRoomCopyInfoDialog = () => {
		isRoomCopyInfoDialogOpen.value = false;
	};

	const executeRoomCopy = async (roomId: string): Promise<string> => {
		closeRoomCopyInfoDialog();
		isLoadingDialogOpen.value = true;

		try {
			const copyResult = await copyRoom(roomId);
			if (
				copyResult.status === CopyApiResponseStatusEnum.Failure ||
				copyResult.id === undefined
			) {
				showFailure();
				throw createApplicationError(500);
			} else {
				const copyId = copyResult.id;
				showSuccess();
				return copyId;
			}
		} catch (error: unknown) {
			showTimeout();
			throw error;
		} finally {
			isLoadingDialogOpen.value = false;
		}
	};

	const showSuccess = () => {
		const notifierPayload: AlertPayload = {
			text: t("data-room.copy.alert.success"),
			status: "success",
		};

		notifierModule.show(notifierPayload);
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

	return {
		isRoomCopyFeatureEnabled,
		isRoomCopyInfoDialogOpen,
		openRoomCopyInfoDialog,
		closeRoomCopyInfoDialog,
		executeRoomCopy,
	};
};
