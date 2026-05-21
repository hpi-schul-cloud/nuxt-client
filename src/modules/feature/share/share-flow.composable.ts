import { ShareOptions, ShareParams } from "./types";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useShareContent } from "@/composables/copy-content.composable";
import { $axios } from "@/utils/api";
import { BoardExternalReferenceType, ShareTokenApiFactory, ShareTokenBodyParamsParentType } from "@api-server";
import { openDialog } from "@feature-dialog";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export const useShareFlow = () => {
	const shareApi = ShareTokenApiFactory(undefined, "/v3", $axios);
	const { execute } = useSafeAxiosTask();
	const { t } = useI18n();

	const shareItemType = ref<ShareTokenBodyParamsParentType>();
	const { itemNameKey } = useShareContent(shareItemType);

	const generateShareToken = async (params: ShareParams, options: ShareOptions) => {
		shareItemType.value = params.type;
		const { result, success, error } = await execute(
			() =>
				shareApi.shareTokenControllerCreateShareToken({
					parentId: params.id,
					parentType: params.type,
					expiresInDays: options.hasExpiryDate ? 21 : null,
					schoolExclusive: options.isSchoolInternal,
				}),
			t("common.notifications.errors.notShared", { type: t(itemNameKey.value) })
		);

		return { result: result?.data, success, error };
	};

	const buildSharePath = (parentType: ShareTokenBodyParamsParentType, destinationType?: BoardExternalReferenceType) => {
		if (
			parentType === ShareTokenBodyParamsParentType.COLUMN_BOARD ||
			parentType === ShareTokenBodyParamsParentType.CARD
		) {
			if (destinationType === BoardExternalReferenceType.ROOM) {
				return "rooms";
			}
			return "rooms/courses-overview";
		}

		if (parentType === ShareTokenBodyParamsParentType.ROOM) {
			return "rooms";
		}

		return "rooms/courses-overview";
	};

	const executeShare = async ({ id, type, destinationType }: ShareParams) => {
		let tokenResult: Awaited<ReturnType<typeof generateShareToken>> | undefined;

		const { completed } = await openDialog("share", {
			shareItemType: type,
			onConfirm: async (options: ShareOptions) => {
				tokenResult = await generateShareToken({ id, type, destinationType }, options);
				if (!tokenResult.success) throw new Error("Share failed", { cause: tokenResult.error });
				const sharePath = buildSharePath(type, destinationType);
				return `${window.location.origin}/${sharePath}?import=${tokenResult.result!.token}`;
			},
		});

		if (!completed) {
			return tokenResult
				? { success: false as const, error: new Error("Share failed", { cause: tokenResult.error }) }
				: { success: false as const, error: new Error("Share cancelled") };
		}
		return { success: true, result: tokenResult!.result };
	};

	return { executeShare };
};
