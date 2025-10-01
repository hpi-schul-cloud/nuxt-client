import NotifierModule from "@/store/notifier";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { BoardMenuScope } from "@ui-board";
import { useI18n } from "vue-i18n";

export const useShareBoardLink = () => {
	const notifierModule: NotifierModule = injectStrict(NOTIFIER_MODULE_KEY);
	const { t } = useI18n();

	const getShareLinkId = (nodeId: string, scope: BoardMenuScope) => `${scope}-${nodeId}`;

	const copyShareLink = async (nodeId: string, scope: BoardMenuScope): Promise<void> => {
		const shareLink = new URL(window.location.pathname, window.location.origin);
		shareLink.hash = getShareLinkId(nodeId, scope);

		try {
			await navigator.clipboard.writeText(shareLink.toString());

			notifierModule.show({
				status: "success",
				text: t("common.words.copyLinkToClipboard.success"),
				autoClose: true,
			});
		} catch {
			notifierModule.show({
				status: "error",
				text: t("common.words.copyLinkToClipboard.failure"),
				autoClose: true,
			});
		}
	};

	return {
		getShareLinkId,
		copyShareLink,
	};
};
