import { CopyApiResponseStatusEnum } from "@/serverApi/v3";
import { CopyParams, CopyParamsTypeEnum } from "@/store/copy";
import { AlertPayload } from "@/store/types/alert-payload";
import { injectStrict } from "@/utils/inject";
import { COPY_MODULE_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject/injection-keys";
import { Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

export function useCopy(isLoadingDialogOpen: Ref<boolean>) {
	const copyModule = injectStrict(COPY_MODULE_KEY);
	const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
	const { t } = useI18n();

	const backgroundCopyProcesses: Ref<CopyParams[]> = ref([]);

	const markBackgroundCopyProcess = (data: CopyParams) => backgroundCopyProcesses.value.push(data);

	const isCopyProcessInBackground = (copyParams: CopyParams) => backgroundCopyProcesses.value.includes(copyParams);

	const openResultModal = () => copyModule?.setResultModalOpen(true);

	const showSuccess = (copyParams: CopyParams) => {
		const notifierMessage = setNotifierMessage(copyParams.type);
		notifierModule.show(notifierMessage);
	};

	const setNotifierMessage = (paramsType: CopyParamsTypeEnum) => {
		const status = "success";
		let text = "";

		if (paramsType === CopyParamsTypeEnum.ColumnBoard) {
			text = t("components.molecules.copyResult.board.successfullyCopied");
		}

		if (paramsType === CopyParamsTypeEnum.Course) {
			text = t("components.molecules.copyResult.course.successfullyCopied");
		}

		if (paramsType === CopyParamsTypeEnum.Lesson) {
			text = t("components.molecules.copyResult.lesson.successfullyCopied");
		}

		if (paramsType === CopyParamsTypeEnum.Task) {
			text = t("components.molecules.copyResult.task.successfullyCopied");
		}

		const notifierMessage: AlertPayload = {
			text,
			status,
		};

		return notifierMessage;
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
			if (copyParams.type !== CopyParamsTypeEnum.Course && copyResult?.status === CopyApiResponseStatusEnum.Success) {
				showSuccess(copyParams);
			} else if (copyResult?.status === CopyApiResponseStatusEnum.Failure) {
				showFailure();
			} else {
				openResultModal();
			}
		} catch {
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
