// import LoadingStateModule from "@/store/loading-state";
// import { Ref, unref, watch } from "vue";
import { useLoadingState } from "@/composables/loadingState";
import { CopyParams } from "@/store/copy";
import { inject, ref } from "vue";
import { useI18n } from "vue-i18n";

// const isLoadingDialogOpen = ref(false);

export const useRoomDuplication = () => {
	const { t } = useI18n();
	const { isLoadingDialogOpen } = useLoadingState(
		t("pages.roomDetails.duplication.loading")
	);

	const isDuplicationInfoDialogOpen = ref(false);

	const openDuplicationInfoDialog = () => {
		isDuplicationInfoDialogOpen.value = true;
	};

	// const duplicate = async (duplicationData: CopyParams) => {
	// 	isLoadingDialogOpen.value = true;
	// 	try {
	// 		const copyResult = await copyModule?.copy(copyParams);
	// 		if (
	// 			copyParams.type !== CopyParamsTypeEnum.Course &&
	// 			copyResult?.status === CopyApiResponseStatusEnum.Success
	// 		) {
	// 			showSuccess(copyParams);
	// 		} else if (copyResult?.status === CopyApiResponseStatusEnum.Failure) {
	// 			showFailure();
	// 		} else {
	// 			openResultModal();
	// 		}
	// 	} catch {
	// 		markBackgroundCopyProcess(copyParams);
	// 		showTimeout();
	// 	} finally {
	// 		isLoadingDialogOpen.value = false;
	// 	}
	// };

	return {
		isDuplicationInfoDialogOpen,
		openDuplicationInfoDialog,
	};
};
