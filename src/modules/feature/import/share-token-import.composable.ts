import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { ShareTokenApiFactory, ShareTokenInfoResponse } from "@api-server";
import { notifySuccess } from "@data-app";
import { useI18n } from "vue-i18n";

export type DestinationType = "course" | "room";
export type DestinationItem = { id: string; name: string };

export const useShareTokenImport = () => {
	const shareApi = ShareTokenApiFactory(undefined, "/v3", $axios);
	const lookupShareTokenCall = useSafeAxiosTask();
	const importShareTokenCall = useSafeAxiosTask();

	const { t } = useI18n();

	const validateShareToken = async (token: string) => {
		const { result, success } = await lookupShareTokenCall.execute(
			() => shareApi.shareTokenControllerLookupShareToken(token),
			t("components.molecules.import.options.failure.backendError", {
				name: t("common.labels.link"),
			})
		);

		if (success) {
			return result.data;
		}
	};

	const importShareToken = async (
		shareTokenInfo: ShareTokenInfoResponse,
		params: { newName: string; destinationId?: string }
	) => {
		const { result, success, error } = await importShareTokenCall.execute(
			() => shareApi.shareTokenControllerImportShareToken(shareTokenInfo.token, params),
			t("common.notifications.errors.notImported", {
				type: t(getMessageKeyForImportFailure(shareTokenInfo.parentType)),
			})
		);

		if (success && result?.data.id !== undefined) {
			notifySuccess(
				t("components.molecules.import.options.success", {
					name: params.newName,
				})
			);
			const sanitizedId = result.data.id.replace(/[^a-z\d]/g, "");

			return {
				...result.data,
				id: sanitizedId,
			};
		}
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
	};
};
