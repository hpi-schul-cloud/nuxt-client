import { useI18nGlobal } from "@/plugins/i18n";
import { notifyWarning } from "@data-app";

const MAX_FILE_LIST_CHARLENGTH = 150;
const SEPARATOR = ", ";

export const truncateFileNames = (
	fileNames: string[],
	maxLength = MAX_FILE_LIST_CHARLENGTH
): { list: string; remainingCount: number } => {
	const includedNames: string[] = [];
	let length = 0;

	for (const name of fileNames) {
		const addedLength = includedNames.length > 0 ? SEPARATOR.length + name.length : name.length;
		// the first name is always shown, even if it exceeds the limit
		if (includedNames.length > 0 && length + addedLength > maxLength) break;

		includedNames.push(name);
		length += addedLength;
	}

	return { list: includedNames.join(SEPARATOR), remainingCount: fileNames.length - includedNames.length };
};

export const useFailedFilesNotifier = () => {
	const notifyFailedFiles = (typeKey: string, fileNames: string[]) => {
		// global i18n, because this is triggered by socket events outside of a component setup
		const { t } = useI18nGlobal();
		const { list, remainingCount } = truncateFileNames(fileNames);
		const files = remainingCount > 0 ? t("common.notifications.listWithMore", { list, count: remainingCount }) : list;

		notifyWarning(t("common.notifications.warning.filesNotCopied", { type: t(typeKey), files }), false);
	};

	return { notifyFailedFiles };
};
