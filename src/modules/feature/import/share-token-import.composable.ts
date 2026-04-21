import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { ShareTokenApiFactory, ShareTokenInfoResponse } from "@api-server";
import { notifySuccess } from "@data-app";
import { useI18n } from "vue-i18n";

export type DestinationType = "course" | "room";
export type DestinationItem = { id: string; name: string };

export const useShareTokenImport = () => {
	const shareApi = ShareTokenApiFactory(undefined, "/v3", $axios);

	const { execute, isRunning } = useSafeAxiosTask();

	const { t } = useI18n();

	const validateShareToken = async (token: string) => {
		const outcome = await execute(
			() => shareApi.shareTokenControllerLookupShareToken(token),
			t("components.molecules.import.options.failure.backendError", { name: t("common.labels.link") })
		);
		return { ...outcome, validationResult: outcome.result?.data };
	};

	const importShareToken = async (
		shareTokenInfo: ShareTokenInfoResponse,
		params: { newName: string; destinationId?: string }
	) => {
		const outcome = await execute(
			() => shareApi.shareTokenControllerImportShareToken(shareTokenInfo.token, params),
			t("common.notifications.errors.notImported", {
				type: t(getMessageKeyForImportFailure(shareTokenInfo.parentType)),
			})
		);

		if (outcome.success) {
			notifySuccess(t("components.molecules.import.options.success", { name: params.newName }));
		}

		return { ...outcome, importResult: outcome.result?.data };
	};

	const getMessageKeyForImportFailure = (parentType: ShareTokenInfoResponse["parentType"]) => {
		switch (parentType) {
			case "courses":
				return "common.labels.course";
			case "tasks":
				return "common.words.task";
			case "lessons":
				return "common.words.topic";
			case "columnBoard":
				return "components.board";
			case "room":
				return "common.labels.room";
			case "card":
				return "components.boardCard";
			default:
				return "common.labels.link";
		}
	};

	return {
		validateShareToken,
		importShareToken,
		isRunning,
	};
};
