import { useLoadingState } from "@/composables/loadingState";
import { AlertPayload } from "@/store/types/alert-payload";
import {
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export const useRoomDuplication = () => {
	const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
	const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
	const { t } = useI18n();

	const { isLoadingDialogOpen } = useLoadingState(
		t("pages.roomDetails.duplication.loading")
	);

	const isRoomDuplicationFeatureEnabled =
		envConfigModule.getEnv.FEATURE_ROOMS_DUPLICATION_ENABLED;

	const isDuplicationInfoDialogOpen = ref(false);

	const openDuplicationInfoDialog = () => {
		isDuplicationInfoDialogOpen.value = true;
	};

	const closeDuplicationInfoDialog = () => {
		isDuplicationInfoDialogOpen.value = false;
	};

	const duplicate = async () => {
		closeDuplicationInfoDialog();
		isLoadingDialogOpen.value = true;

		const delay = () => new Promise((resolve) => setTimeout(resolve, 3000));

		try {
			await delay();
			showSuccess();

			// showFailure();
		} catch {
			// markBackgroundCopyProcess(copyParams);
			showTimeout();
		} finally {
			isLoadingDialogOpen.value = false;
		}
	};

	const showSuccess = () => {
		const notifierPayload: AlertPayload = {
			text: t("components.molecules.copyResult.room.successfullyCopied"),
			status: "success",
		};

		notifierModule.show(notifierPayload);
	};

	const showFailure = () => {
		notifierModule.show({
			text: t("components.molecules.copyResult.failedCopy"),
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
		isRoomDuplicationFeatureEnabled,
		isDuplicationInfoDialogOpen,
		openDuplicationInfoDialog,
		closeDuplicationInfoDialog,
		duplicate,
	};
};
