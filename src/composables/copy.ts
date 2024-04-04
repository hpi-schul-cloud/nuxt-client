import { CopyApiResponseStatusEnum } from "@/serverApi/v3";
import { CopyParams, CopyParamsTypeEnum } from "@/store/copy";
import { injectStrict } from "@/utils/inject";
import {
	COPY_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject/injection-keys";
import { Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

export function useCopy(isLoadingDialogOpen: Ref<boolean>) {
	const copyModule = injectStrict(COPY_MODULE_KEY);
	const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
	const { t } = useI18n();

	const backgroundCopyProcesses: Ref<CopyParams[]> = ref([]);

	const markBackgroundCopyProcess = (data: CopyParams) =>
		backgroundCopyProcesses.value.push(data);

	const isCopyProcessInBackground = (copyParams: CopyParams) =>
		backgroundCopyProcesses.value.includes(copyParams);

	const openResultModal = () => copyModule?.setResultModalOpen(true);

	const showSuccess = (copyParams: CopyParams) => {
		if (copyParams.type === CopyParamsTypeEnum.ColumnBoard) {
			notifierModule.show({
				text: t("components.molecules.copyResult.board.successfullyCopied"),
				status: "success",
			});
		}

		if (copyParams.type === CopyParamsTypeEnum.Course) {
			notifierModule.show({
				text: t("components.molecules.copyResult.successfullyCopied"),
				status: "success",
			});
		}

		if (copyParams.type === CopyParamsTypeEnum.Lesson) {
			notifierModule.show({
				text: t("components.molecules.copyResult.lesson.successfullyCopied"),
				status: "success",
			});
		}

		if (copyParams.type === CopyParamsTypeEnum.Task) {
			notifierModule.show({
				text: t("components.molecules.copyResult.task.successfullyCopied"),
				status: "success",
			});
		}
	};

	const showFailure = () =>
		notifierModule.show({
			text: t("components.molecules.copyResult.failedCopy"),
			status: "error",
			autoClose: false,
		});

	const showTimeout = () =>
		notifierModule.show({
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
				showSuccess(copyParams);
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
