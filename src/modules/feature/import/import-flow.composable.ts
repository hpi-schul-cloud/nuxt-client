import { ImportDestination } from "./types";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useAwaitableAction } from "@/composables/awaitable-action.composable";
import { $axios } from "@/utils/api";
import { getTranslationKeyForContentItem, mapShareTokenParentTypeToContentItemType } from "@/utils/content-item.utils";
import { ShareTokenApiFactory, ShareTokenInfoResponse, ShareTokenInfoResponseParentType } from "@api-server";
import { notifySuccess, useLoadingStore } from "@data-app";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useImportFlow = () => {
	const shareApi = ShareTokenApiFactory(undefined, "/v3", $axios);
	const { execute } = useSafeAxiosTask();
	const importAction = useAwaitableAction<{ newName: string; destination?: ImportDestination }>();
	const { withLoadingState } = useLoadingStore();
	const { t } = useI18n();

	const shareTokenInfo = ref<ShareTokenInfoResponse>();

	const isGenericImportDialogOpen = computed(
		() =>
			importAction.isActive.value &&
			!!shareTokenInfo.value &&
			!(shareTokenInfo.value?.parentType === ShareTokenInfoResponseParentType.CARD)
	);

	const isCardImportDialogOpen = computed(
		() =>
			importAction.isActive.value &&
			!!shareTokenInfo.value &&
			shareTokenInfo.value?.parentType === ShareTokenInfoResponseParentType.CARD
	);

	const validateShareToken = async (token: string) => {
		const { result, success, error } = await execute(
			() => shareApi.shareTokenControllerLookupShareToken(token),
			t("components.molecules.import.options.failure.backendError", { name: t("common.labels.link") })
		);
		return { result: result?.data, success, error };
	};

	const importShareToken = async (
		shareTokenInfo: ShareTokenInfoResponse,
		params: { newName: string; destinationId?: string }
	) => {
		const { result, success, error } = await execute(
			() => shareApi.shareTokenControllerImportShareToken(shareTokenInfo.token, params),
			t("common.notifications.errors.notImported", {
				type: t(getMessageKeyForImportFailure(shareTokenInfo.parentType)),
			})
		);

		return { result: result?.data, success, error };
	};

	const executeImport = async (token: string) => {
		const { result: validationResult } = await validateShareToken(token);

		if (!validationResult) {
			return { success: false, error: new Error("Validation failed") };
		}
		shareTokenInfo.value = validationResult;

		const { completed, data } = await importAction.start();
		if (!completed) return { success: false, error: new Error("Import cancelled") };

		const { result, success, error } = await withLoadingState(
			() => importShareToken(validationResult, { newName: data.newName, destinationId: data.destination?.id }),
			t("components.molecules.import.options.loadingMessage")
		);

		if (success) {
			notifySuccess(t("components.molecules.import.options.success", { name: data.newName }));
		}

		return {
			result: result ? { ...result, destination: data.destination } : result,
			success,
			error,
		};
	};

	const getMessageKeyForImportFailure = (parentType: ShareTokenInfoResponse["parentType"]) => {
		const key = getTranslationKeyForContentItem(mapShareTokenParentTypeToContentItemType(parentType));

		return key ?? "common.labels.link";
	};

	return {
		isCardImportDialogOpen,
		isGenericImportDialogOpen,
		shareTokenInfo,
		validateShareToken,
		importShareToken,
		executeImport,
		onConfirmImport: importAction.complete,
		onCancelImport: importAction.cancel,
	};
};
