import { CopyApiResponseStatusEnum } from "@/serverApi/v3";
import { CopyParams, CopyParamsTypeEnum } from "@/store/copy";
import { injectStrict } from "@/utils/inject";
import { COPY_MODULE_KEY } from "@/utils/inject/injection-keys";
import { Ref, ref } from "vue";
import { useI18n } from "vue-i18n";
import { notifyError, notifyInfo, notifySuccess } from "@data-app";

export function useCopy(isLoadingDialogOpen: Ref<boolean>) {
	const copyModule = injectStrict(COPY_MODULE_KEY);
	const { t } = useI18n();

	const backgroundCopyProcesses: Ref<CopyParams[]> = ref([]);

	const markBackgroundCopyProcess = (data: CopyParams) =>
		backgroundCopyProcesses.value.push(data);

	const isCopyProcessInBackground = (copyParams: CopyParams) =>
		backgroundCopyProcesses.value.includes(copyParams);

	const openResultModal = () => copyModule?.setResultModalOpen(true);

	const getNotifierMessage = (paramsType: CopyParamsTypeEnum) => {
		switch (paramsType) {
			case CopyParamsTypeEnum.ColumnBoard:
				return t("components.molecules.copyResult.board.successfullyCopied");
			case CopyParamsTypeEnum.Course:
				return t("components.molecules.copyResult.course.successfullyCopied");
			case CopyParamsTypeEnum.Lesson:
				return t("components.molecules.copyResult.lesson.successfullyCopied");
			case CopyParamsTypeEnum.Task:
				return t("components.molecules.copyResult.task.successfullyCopied");
			default:
				return "";
		}
	};

	const copy = async (copyParams: CopyParams) => {
		isLoadingDialogOpen.value = true;
		try {
			const copyResult = await copyModule?.copy(copyParams);
			if (
				copyParams.type !== CopyParamsTypeEnum.Course &&
				copyResult?.status === CopyApiResponseStatusEnum.Success
			) {
				notifySuccess(getNotifierMessage(copyParams.type));
			} else if (copyResult?.status === CopyApiResponseStatusEnum.Failure) {
				notifyError(t("components.molecules.copyResult.failedCopy"), false);
			} else {
				openResultModal();
			}
		} catch {
			markBackgroundCopyProcess(copyParams);
			notifyInfo(t("components.molecules.copyResult.timeoutCopy"), false);
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
