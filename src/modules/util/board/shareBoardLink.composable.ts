import { BoardMenuScope } from "@ui-board";
import { useI18n } from "vue-i18n";
import { notifyError, notifySuccess } from "@data-app";

export const useShareBoardLink = () => {
	const { t } = useI18n();

	const getShareLinkId = (nodeId: string, scope: BoardMenuScope) =>
		`${scope}-${nodeId}`;

	const copyShareLink = async (
		nodeId: string,
		scope: BoardMenuScope
	): Promise<void> => {
		const shareLink = new URL(window.location.pathname, window.location.origin);
		shareLink.hash = getShareLinkId(nodeId, scope);

		try {
			await navigator.clipboard.writeText(shareLink.toString());
			notifySuccess("common.words.copyLinkToClipboard.success");
		} catch {
			notifyError(t("common.words.copyLinkToClipboard.failure"));
		}
	};

	return {
		getShareLinkId,
		copyShareLink,
	};
};
