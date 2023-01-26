import { CopyApiResponseStatusEnum } from "@/serverApi/v3";
import CopyModule, { CopyParams, CopyParamsTypeEnum } from "@/store/copy";
import NotifierModule from "@/store/notifier";
import { inject, InjectionKey, Ref, reactive } from "@vue/composition-api";
import VueI18n from "vue-i18n";

export const USE_COPY: InjectionKey<typeof useCopy> = Symbol();

export function useCopy(isLoadingDialogOpen: Ref<boolean>) {
	const copyModule = inject<CopyModule>("copyModule");
	const notifierModule = inject<NotifierModule>("notifierModule");
	const i18n = inject<VueI18n>("i18n");

	const t = (key: string) => {
		const translateResult = i18n?.t(key);
		if (typeof translateResult === "string") {
			return translateResult;
		}
		return "unknown translation-key:" + key;
	};

	const backgroundCopyProcesses: CopyParams[] = reactive([]);

	const markBackgroundCopyProcess = (data: CopyParams) =>
		backgroundCopyProcesses.push(data);

	const isCopyProcessInBackground = (copyParams: CopyParams) =>
		backgroundCopyProcesses.includes(copyParams);

	const openResultModal = () => copyModule?.setResultModalOpen(true);

	const showSuccess = () =>
		notifierModule?.show({
			text: t("components.molecules.copyResult.successfullyCopied"),
			status: "success",
			timeout: 10000,
		});

	const showFailure = () =>
		notifierModule?.show({
			text: t("components.molecules.copyResult.failedCopy"),
			status: "error",
			autoClose: false,
		});

	const showTimeout = () =>
		notifierModule?.show({
			text: t("components.molecules.copyResult.timeoutCopy"),
			status: "info",
			autoClose: false,
		});

	const copy = async (copyParams: CopyParams) => {
		isLoadingDialogOpen.value = true;
		try {
			const copyResult = await copyModule?.copy(copyParams);
			if (
				copyParams.type !== CopyParamsTypeEnum.Course &&
				copyResult?.status === CopyApiResponseStatusEnum.Success
			) {
				showSuccess();
			} else if (copyResult?.status === CopyApiResponseStatusEnum.Failure) {
				showFailure();
			} else {
				openResultModal();
			}
		} catch (error) {
			markBackgroundCopyProcess(copyParams);
			showTimeout();
		} finally {
			isLoadingDialogOpen.value = false;
		}
	};

	return {
		copy,
		isCopyProcessInBackground,
		backgroundCopyProcesses,
	};
}
