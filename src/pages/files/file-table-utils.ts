import { Breadcrumb } from "@components/templates/DefaultWireframe.vue";
import { File, FileType } from "@store/types/file";
import { FileTableItem } from "@pages/files/file-table-item";
import { TranslationFunction } from "@utils/i18n-util";

export const getDeepBreadcumbs = (params: string[]): Breadcrumb[] => {
	let redirectTo = "/cfiles/teams";
	const deepBreadcumbs: Breadcrumb[] = [];

	params.forEach((param: string) => {
		redirectTo += `/${param}`;
		deepBreadcumbs.push({
			text: param,
			to: redirectTo,
		});
	});
	deepBreadcumbs.pop();

	return deepBreadcumbs;
};

export const getFileCategory = (pathArray: string[]): string => {
	return pathArray.length >= 2 ? pathArray[1] : pathArray[0];
};

export const mapFileToFileTableItem = (
	file: File,
	t: TranslationFunction
): FileTableItem => {
	return {
		name: file.translationKey ? t(file.translationKey) : file.name,
		path: file.path,
		icon: { name: file.icon, colored: file.type === FileType.FAVORITES },
		size: file.size.toString(),
		lastChanged: file.lastChanged,
	};
};
