import { ImportDestination, ImportDestinationItem, ImportDestinationType } from "./types";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useImportContent } from "@/composables/copy-content.composable";
import { $axios } from "@/utils/api";
import { ShareTokenApiFactory, ShareTokenInfoResponse, ShareTokenInfoResponseParentType } from "@api-server";
import { notifySuccess } from "@data-app";
import { openDialog, withGlobalLoadingState } from "@feature-dialog";
import type { MaybeRefOrGetter } from "vue";
import { computed, ref, toValue } from "vue";
import { useI18n } from "vue-i18n";

export const useImportFlow = () => {
	const shareApi = ShareTokenApiFactory(undefined, "/v3", $axios);
	const { execute } = useSafeAxiosTask();
	const { t } = useI18n();

	const shareTokenInfo = ref<ShareTokenInfoResponse>();

	const { itemNameKey } = useImportContent(computed(() => shareTokenInfo.value?.parentType));

	const destinationTypeTranslation: Record<ImportDestinationType, string> = {
		room: t("common.labels.room"),
		course: t("common.labels.course"),
		column: t("components.boardColumn"),
		board: t("components.board"),
	};

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

	const importWithoutDestination = async (tokenInfo: ShareTokenInfoResponse, newName: string) => {
		const { success, error, result } = await withGlobalLoadingState(
			() => importShareToken(tokenInfo, { newName }),
			t("components.molecules.import.options.loadingMessage")
		);

		if (success) {
			notifySuccess(t("components.molecules.import.options.success", { type: t(itemNameKey.value), name: newName }));
		}

		return {
			result: result ? [result] : undefined,
			destinations: success ? ([] as ImportDestination[]) : undefined,
			success,
			error: error ? new Error("Import failed", { cause: error }) : undefined,
		};
	};

	const importToDestinations = async (
		tokenInfo: ShareTokenInfoResponse,
		newName: string,
		destinations: ImportDestination[],
		availableItems: ImportDestinationItem[],
		destinationType: ImportDestinationType
	) => {
		const importResults = await withGlobalLoadingState(
			() =>
				Promise.all(
					destinations.map(
						async (destination) =>
							await importShareToken(tokenInfo, {
								newName,
								destinationId: destination.id,
							})
					)
				),
			t("components.molecules.import.options.loadingMessage")
		);

		for (const importResult of importResults) {
			if (!importResult.success) continue;

			const destinationName = availableItems.find((d) => d.id === importResult.result?.destinationId)?.name;
			const message = destinationName
				? t("components.molecules.import.options.successWithDestination", {
						type: t(itemNameKey.value),
						name: newName,
						destinationType: destinationTypeTranslation[destinationType],
						destinationName,
					})
				: t("components.molecules.import.options.success", { type: t(itemNameKey.value), name: newName });
			notifySuccess(message);
		}

		const importedElements = importResults.flatMap((r) => (r.result ? [r.result] : []));

		const allSuccessful = importResults.every((r) => r.success);
		return {
			result: allSuccessful ? importedElements : undefined,
			destinations: allSuccessful ? destinations : undefined,
			success: allSuccessful,
			error: allSuccessful ? undefined : new Error("Some imports failed"),
		};
	};

	const executeImport = async (
		token: string,
		availableDestinations: MaybeRefOrGetter<ImportDestinationItem[]>,
		destinationType = "room"
	) => {
		const { result: validationResult, error: validationError } = await validateShareToken(token);

		if (!validationResult) {
			return {
				result: undefined,
				destinations: undefined,
				success: false,
				error: new Error("Validation failed", { cause: validationError }),
			};
		}
		shareTokenInfo.value = validationResult;

		const availableDestinationItems = toValue(availableDestinations);
		const isCard = validationResult.parentType === ShareTokenInfoResponseParentType.CARD;
		const isColumn = validationResult.parentType === ShareTokenInfoResponseParentType.COLUMN;
		let actualDestinationType: ImportDestinationType;
		let dialogResult: Awaited<ReturnType<typeof openDialog>>;

		if (isCard) {
			actualDestinationType = "column";
			dialogResult = await openDialog("importCard", {
				shareTokenInfo: validationResult,
				availableDestinations: availableDestinationItems,
				destinationType: "column",
			});
		} else if (isColumn) {
			actualDestinationType = "board";
			dialogResult = await openDialog("importColumn", {
				shareTokenInfo: validationResult,
				availableDestinations: availableDestinationItems,
			});
		} else {
			actualDestinationType = destinationType === "room" ? "room" : "course";
			dialogResult = await openDialog("import", {
				shareTokenInfo: validationResult,
				availableDestinations: availableDestinationItems,
				destinationType: actualDestinationType,
			});
		}

		const { completed, data } = dialogResult;

		if (!completed)
			return { result: undefined, destinations: undefined, success: false, error: new Error("Import cancelled") };
		const { newName, destinations } = data;

		if (destinations.length === 0) {
			return importWithoutDestination(validationResult, newName);
		}
		return importToDestinations(
			validationResult,
			newName,
			destinations,
			availableDestinationItems,
			actualDestinationType
		);
	};

	return {
		executeImport,
	};
};
