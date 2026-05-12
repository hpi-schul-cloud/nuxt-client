import { ShareOptions, ShareParams } from "./types";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useAwaitableAction } from "@/composables/awaitable-action.composable";
import { useShareContent } from "@/composables/copy-content.composable";
import { $axios } from "@/utils/api";
import { BoardExternalReferenceType, ShareTokenApiFactory, ShareTokenBodyParamsParentType } from "@api-server";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useShareFlow = () => {
	const shareApi = ShareTokenApiFactory(undefined, "/v3", $axios);
	const { execute } = useSafeAxiosTask();
	const askOptionsAction = useAwaitableAction<ShareOptions>();
	const resultAction = useAwaitableAction<boolean>();
	const { t } = useI18n();

	const isDialogOpen = ref(false);
	const shareItemType = ref<ShareTokenBodyParamsParentType>();
	const shareUrl = ref<string>();

	const generateShareToken = async (params: ShareParams, options: ShareOptions) => {
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

	const openDialog = (type: ShareTokenBodyParamsParentType) => {
		shareItemType.value = type;
		isDialogOpen.value = true;
	};

	const closeDialog = () => {
		shareItemType.value = undefined;
		shareUrl.value = undefined;
		isDialogOpen.value = false;
	};

	const executeShare = async ({ id, type, destinationType }: ShareParams) => {
		openDialog(type);
		const { completed: confirmed, data: options } = await askOptionsAction.start();

		if (!confirmed) {
			closeDialog();
			return { success: false, error: new Error("Share cancelled") };
		}

		const { result, success, error } = await generateShareToken({ id, type, destinationType }, options);
		if (!success) {
			closeDialog();
			return { success, error: new Error("Share failed", { cause: error }) };
		}

		const sharePath = buildSharePath(type, destinationType);
		shareUrl.value = `${window.location.origin}/${sharePath}?import=${result?.token}`;

		await resultAction.start();
		closeDialog();

		return { success, result };
	};

	const { itemNameKey } = useShareContent(computed(() => shareItemType.value));

	return {
		isDialogOpen,
		shareItemType,
		shareUrl,
		executeShare,
		onConfirm: askOptionsAction.complete,
		onCancel: askOptionsAction.cancel,
		onDone: resultAction.cancel,
	};
};
