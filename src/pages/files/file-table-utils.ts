import {
	CollaborativeFile,
	CollaborativeFileType,
} from "@store/types/collaborative-file";
import { FileTableItem } from "@pages/files/file-table-item";
import { collaborativeFilesModule } from "@utils/store-accessor";
import { Route } from "vue-router";
import { DataTableHeader } from "vuetify";
import { Breadcrumb } from "@components/templates/default-wireframe.types";

export type FilesPage = {
	title: string;
	breadcrumbs: Breadcrumb[];
	loadFilesFunction: () => Promise<void>;
};

export function getHeaders(t: (key: string) => string): DataTableHeader[] {
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
	const deepBreadcrumbs: Breadcrumb[] = [];

	params.forEach((param: string) => {
		redirectTo += `/${param}`;
		deepBreadcrumbs.push({
			text: param,
			to: redirectTo,
		});
	});
	deepBreadcrumbs.pop();

	return deepBreadcrumbs;
};

export const getFileCategory = (pathArray: string[]): string => {
	return pathArray.length >= 2 ? pathArray[1] : pathArray[0];
};

export const mapFileToFileTableItem = (
	file: CollaborativeFile,
	t: (key: string) => string
): FileTableItem => {
	return {
		name: file.translationKey ? t(file.translationKey) : file.name,
		path: file.path,
		icon: {
			name: file.icon,
			colored: file.type === CollaborativeFileType.FAVORITES,
		},
		size: file.size.toString(),
		lastChanged: file.lastChanged,
	};
};

function getFilesOverview(t: (key: string) => string): FilesPage {
	return {
		title: t("pages.files.overview.headline"),
		breadcrumbs: [],
		loadFilesFunction: async () =>
			collaborativeFilesModule.fetchFilesOverview(),
	};
}

function getTeamsOverview(t: (key: string) => string): FilesPage {
	return {
		title: t("pages.files.overview.teamFiles"),
		breadcrumbs: [
			{
				text: t("pages.files.overview.headline"),
				to: "/cfiles/",
			},
		],
		loadFilesFunction: async () => collaborativeFilesModule.fetchTeams(),
	};
}

function getTeamsPage(t: (key: string) => string, route: Route): FilesPage {
	const paramsArray: string[] = route.params.catchAll
		.split("/")
		.filter((element: string) => element !== "");
	const teamsPath: string = route.path.replace("/cfiles/teams", "");
	const deepBreadcrumbs: Breadcrumb[] = getDeepBreadcumbs(paramsArray);

	return {
		title: paramsArray.slice(-1)[0],
		breadcrumbs: [
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
		loadFilesFunction: async () =>
			collaborativeFilesModule.fetchTeamFiles(teamsPath),
	};
}

export function getFilesPageForRoute(
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
