import { ImportDestinationItem } from "./types";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useImportContent } from "@/composables/copy-content.composable";
import { $axios } from "@/utils/api";
import { ShareTokenApiFactory, ShareTokenInfoResponse, ShareTokenInfoResponseParentType } from "@api-server";
import { notifySuccess, useLoadingStore } from "@data-app";
import { openDialog } from "@feature-dialog";
import type { MaybeRefOrGetter } from "vue";
import { computed, ref, toValue } from "vue";
import { useI18n } from "vue-i18n";

export const useImportFlow = () => {
	const shareApi = ShareTokenApiFactory(undefined, "/v3", $axios);
	const { execute } = useSafeAxiosTask();
	const { withLoadingState } = useLoadingStore();
	const { t } = useI18n();

	const shareTokenInfo = ref<ShareTokenInfoResponse>();

	const { itemNameKey } = useImportContent(computed(() => shareTokenInfo.value?.parentType));

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

	const executeImport = async (token: string, availableDestinations: MaybeRefOrGetter<ImportDestinationItem[]>) => {
		const { result: validationResult, error: validationError } = await validateShareToken(token);

		if (!validationResult) {
			return { success: false, error: new Error("Validation failed", { cause: validationError }) };
		}
		shareTokenInfo.value = validationResult;

		const destinations = toValue(availableDestinations);
		const isCard = validationResult.parentType === ShareTokenInfoResponseParentType.CARD;
		const { completed, data } = await (isCard
			? openDialog("importCard", {
					shareTokenInfo: validationResult,
					availableDestinations: destinations,
					destinationType: "column",
				})
			: openDialog("import", {
					shareTokenInfo: validationResult,
					availableDestinations: destinations,
					destinationType: validationResult.parentType === ShareTokenInfoResponseParentType.ROOM ? "room" : "course",
				}));

		if (!completed) return { success: false, error: new Error("Import cancelled") };
		const { newName, destination } = data;

		const { result, success, error } = await withLoadingState(
			() => importShareToken(validationResult, { newName, destinationId: destination?.id }),
			t("components.molecules.import.options.loadingMessage")
		);

		if (success) {
			notifySuccess(t("components.molecules.import.options.success", { name: newName }));
		}

		return {
			result: result ? { ...result, destination } : result,
			success,
			error: error ? new Error("Import failed", { cause: error }) : undefined,
		};
	};

	return {
		executeImport,
	};
};
