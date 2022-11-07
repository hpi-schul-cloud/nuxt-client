import { File, FileType } from "@store/types/file";
import { FileTableItem } from "@pages/files/file-table-item";
import { filesModule } from "@utils/store-accessor";
import { Route } from "vue-router";
import { Breadcrumb } from "@components/templates/DefaultWireframe.vue";

export type FilesPage = {
	title: string;
	breadcumbs: Breadcrumb[];
	loadFilesFunction: () => Promise<void>;
};

export function getHeaders(t: (key: string) => string) {
	return [
		{ text: "", value: "icon", sortable: false, width: 5 },
		{
			text: t("common.labels.name"),
			value: "name",
			class: "primary--text",
			cellClass: "primary--text",
		},
		{
			text: t("common.labels.size"),
			value: "size",
			class: "primary--text",
			width: "110",
		},
		{
			text: t("common.labels.changed"),
			value: "lastChanged",
			class: "primary--text",
			width: "140",
		},
	];
}

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
	t: (key: string) => string
): FileTableItem => {
	return {
		name: file.translationKey ? t(file.translationKey) : file.name,
		path: file.path,
		icon: { name: file.icon, colored: file.type === FileType.FAVORITES },
		size: file.size.toString(),
		lastChanged: file.lastChanged,
	};
};

export function getFilesOverview(t: (key: string) => string): FilesPage {
	return {
		title: t("pages.files.overview.headline"),
		breadcumbs: [
			{
				text: t("pages.files.overview.headline"),
				to: "/cfiles/",
			},
		],
		loadFilesFunction: async () => filesModule.fetchFilesOverview(),
	};
}

export function getTeamsOverview(t: (key: string) => string): FilesPage {
	return {
		title: t("pages.files.overview.teamFiles"),
		breadcumbs: [
			{
				text: t("pages.files.overview.headline"),
				to: "/cfiles/",
			},
		],
		loadFilesFunction: async () => filesModule.fetchTeams(),
	};
}

export function getTeamsPage(
	t: (key: string) => string,
	route: Route
): FilesPage {
	const paramsArray: string[] = route.params.catchAll
		.split("/")
		.filter((element: string) => element !== "");
	const teamsPath: string = route.path.replace("/cfiles/teams", "");
	const deepBreadcrumbs: Breadcrumb[] = getDeepBreadcumbs(paramsArray);

	return {
		title: paramsArray.slice(-1)[0],
		breadcumbs: [
			{
				text: t("pages.files.overview.headline"),
				to: "/cfiles/",
			},
			{
				text: t("pages.files.overview.teamFiles"),
				to: "/cfiles/teams",
			},
			...deepBreadcrumbs,
		],
		loadFilesFunction: async () => filesModule.fetchTeamFiles(teamsPath),
	};
}

export function getFilesPageFromCategory(
	t: (key: string) => string,
	route: Route
): FilesPage {
	const pathArray: string[] = route.path
		.split("/")
		.filter((element: string) => element !== "");

	const currentCategory: string = getFileCategory(pathArray);

	switch (currentCategory) {
		case "cfiles":
			return getFilesOverview(t);
		case "teams":
			if (pathArray.length == 2) {
				return getTeamsOverview(t);
			} else {
				return getTeamsPage(t, route);
			}
		default:
			throw new Error("page not found");
	}
}
