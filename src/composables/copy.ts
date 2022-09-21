import { CopyApiResponseStatusEnum } from "@/serverApi/v3";
import CopyModule, { CopyParams } from "@/store/copy";
import NotifierModule from "@/store/notifier";
import { inject, InjectionKey, Ref } from "@vue/composition-api";

export const USE_COPY: InjectionKey<typeof useCopy> = Symbol();

export function useCopy(
	isLoadingDialogOpen: Ref<boolean>,
	$t: (s: string) => string
) {
	const copyModule = inject<CopyModule>("copyModule");
	const notifierModule = inject<NotifierModule>("notifierModule");

	const openResultModal = () => copyModule?.setResultModalOpen(true);

	const showSuccess = () =>
		notifierModule?.show({
			text: $t("components.molecules.copyResult.successfullyCopied"),
			status: "success",
		});

	const showFailure = () =>
		notifierModule?.show({
			text: $t("components.molecules.copyResult.failedCopy"),
			status: "error",
			autoClose: false,
		});

	const showTimeout = () =>
		notifierModule?.show({
			text: $t("components.molecules.copyResult.timeoutCopy"),
			status: "error",
			autoClose: false,
		});

	const copy = async (copyParams: CopyParams) => {
		isLoadingDialogOpen.value = true;
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
			isLoadingDialogOpen.value = false;
		}
	};

	return {
		copy,
	};
}
