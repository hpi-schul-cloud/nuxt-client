import { ImportDestination } from "./types";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useAwaitableAction } from "@/composables/awaitable-action.composable";
import { useImportItemName } from "@/composables/copy-content.composable";
import { $axios } from "@/utils/api";
import { ShareTokenApiFactory, ShareTokenInfoResponse, ShareTokenInfoResponseParentType } from "@api-server";
import { notifySuccess, useLoadingStore } from "@data-app";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useImportFlow = () => {
	const shareApi = ShareTokenApiFactory(undefined, "/v3", $axios);
	const { execute } = useSafeAxiosTask();
	const importDialogAction = useAwaitableAction<{ newName: string; destination?: ImportDestination }>();
	const { withLoadingState } = useLoadingStore();
	const { t } = useI18n();

	const shareTokenInfo = ref<ShareTokenInfoResponse>();

	const isImportActive = computed(() => importDialogAction.isActive.value);
	const isCardImport = computed(() => shareTokenInfo.value?.parentType === ShareTokenInfoResponseParentType.CARD);

	const isGenericImportDialogOpen = computed(() => isImportActive.value && !isCardImport.value);
	const isCardImportDialogOpen = computed(() => isImportActive.value && isCardImport.value);

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
				type: t(itemNameKey.value),
			})
		);

		return { result: result?.data, success, error };
	};

	const executeImport = async (token: string) => {
		const { result: validationResult, error: validationError } = await validateShareToken(token);

		if (!validationResult) {
			return { success: false, error: new Error("Validation failed", { cause: validationError }) };
		}
		shareTokenInfo.value = validationResult;

		const { completed, data } = await importDialogAction.start();
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
			error: error ? new Error("Import failed", { cause: error }) : undefined,
		};
	};

	const { itemNameKey } = useImportItemName(computed(() => shareTokenInfo.value?.parentType));

	return {
		isCardImportDialogOpen,
		isGenericImportDialogOpen,
		shareTokenInfo,
		executeImport,
		onConfirmImport: importDialogAction.complete,
		onCancelImport: importDialogAction.cancel,
	};
};
