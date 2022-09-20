import { CopyApiResponseStatusEnum } from "@/serverApi/v3";
import CopyModule, { CopyParams } from "@/store/copy";
import { injectComposable } from "@/utils/composable-dependency-injection";
import { inject, InjectionKey } from "@vue/composition-api";
import { useI18n } from "./i18n";
import { USE_LOADING_STATE } from "./loadingState";
import { USE_NOTIFIER } from "./notifier";

export const USE_COPY: InjectionKey<typeof useCopy> = Symbol();

export function useCopy() {
	const copyModule = inject<CopyModule>("copyModule");
	const { showNotifier } = injectComposable(USE_NOTIFIER);

	const { openLoadingDialog, closeLoadingDialog } =
		injectComposable(USE_LOADING_STATE);

	const { t } = useI18n();

	const openResultModal = () => copyModule?.setResultModalOpen(true);

	const showSuccess = () =>
		showNotifier({
			text: t("components.molecules.copyResult.successfullyCopied"),
			status: "success",
		});

	const showFailure = () =>
		showNotifier({
			text: t("components.molecules.copyResult.failedCopy"),
			status: "error",
			autoClose: false,
		});

	const showTimeout = () =>
		showNotifier({
			text: t("components.molecules.copyResult.timeoutCopy"),
			status: "error",
			autoClose: false,
		});

	const copy = async (copyParams: CopyParams, loadingText: string) => {
		openLoadingDialog(loadingText);
		try {
			const copyResult = await copyModule?.copy(copyParams);
			if (copyResult?.status === CopyApiResponseStatusEnum.Success) {
				showSuccess();
			} else if (copyResult?.status === CopyApiResponseStatusEnum.Failure) {
				showFailure();
			} else {
				openResultModal();
			}
		} catch (error) {
			showTimeout();
		} finally {
			closeLoadingDialog();
		}
	};

	return {
		copy,
	};
}
