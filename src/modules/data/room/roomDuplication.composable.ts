import { useLoadingState } from "@/composables/loadingState";
import { AlertPayload } from "@/store/types/alert-payload";
import { delay } from "@/utils/helpers";
import {
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useRoomDuplication = () => {
	const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
	const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
	const { t } = useI18n();

	const { isLoadingDialogOpen } = useLoadingState(
		t("data-room.duplication.loading")
	);

	const isRoomDuplicationFeatureEnabled = computed(() => {
		return envConfigModule.getEnv.FEATURE_ROOMS_DUPLICATION_ENABLED;
	});

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

		try {
			await delay(3000);
			showSuccess();
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
		isRoomDuplicationFeatureEnabled,
		isDuplicationInfoDialogOpen,
		openDuplicationInfoDialog,
		closeDuplicationInfoDialog,
		duplicate,
	};
};
