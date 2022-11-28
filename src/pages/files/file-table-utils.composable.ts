import {
	CollaborativeFile,
	CollaborativeFileType,
	FileTypeIconMapping,
} from "@/store/types/collaborative-file";
import { FileTableItem } from "@/pages/files/file-table-item";
import { Route } from "vue-router";
import { DataTableHeader } from "vuetify";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import { FileMetaListResponse } from "@/store/collaborative-files/file-meta-list.response";
import {
	FileMetaResponse,
	FileTypeResponse,
} from "@/store/collaborative-files/file-meta.response";
import { FilesPageConfig } from "@/pages/files/file-page-config.type";
import CollaborativeFilesModule from "@/store/collaborative-files";

export function useFileTableUtils(
	collaborativeFilesModule: CollaborativeFilesModule,
	t: (key: string) => string
) {
	const getHeaders = (): DataTableHeader[] => {
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
	};

	const getDeepBreadcumbs = (params: string[]): Breadcrumb[] => {
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

	const getFileCategory = (pathArray: string[]): string => {
		return pathArray.length >= 2 ? pathArray[1] : pathArray[0];
	};

	const mapFileToFileTableItem = (file: CollaborativeFile): FileTableItem => {
		return {
			name: file.translationKey ? t(file.translationKey) : file.name,
			path: file.path,
			icon: {
				name: file.icon || FileTypeIconMapping[file.type],
				colored: file.type === CollaborativeFileType.FAVORITES,
			},
			size: file.size.toString(),
			lastChanged: file.lastChanged,
		};
	};

	const getFilesOverview = (): FilesPageConfig => {
		return {
			title: t("pages.files.overview.headline"),
			breadcrumbs: [],
			loadFilesFunction: async () =>
				collaborativeFilesModule.fetchFilesOverview(),
		};
	};

	const getTeamsOverview = (): FilesPageConfig => {
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
	};

	const getTeamsPage = (route: Route): FilesPageConfig => {
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
	};

	const getFilesPageForRoute = (route: Route): FilesPageConfig => {
		const pathArray: string[] = route.path
			.split("/")
			.filter((element: string) => element !== "");

		const currentCategory: string = getFileCategory(pathArray);

		switch (currentCategory) {
			case "cfiles":
				return getFilesOverview();
			case "teams":
				if (pathArray.length == 2) {
					return getTeamsOverview();
				} else {
					return getTeamsPage(route);
				}
			default:
				throw new Error("page not found");
		}
	};

	const FileTypeMapping: Record<FileTypeResponse, CollaborativeFileType> = {
		[FileTypeResponse.FILE]: CollaborativeFileType.FILE,
		[FileTypeResponse.PDF]: CollaborativeFileType.PDF,
		[FileTypeResponse.SHARED_DIRECTORY]: CollaborativeFileType.SHARED_DIRECTORY,
		[FileTypeResponse.DIRECTORY]: CollaborativeFileType.DIRECTORY,
		[FileTypeResponse.FAVORITES]: CollaborativeFileType.FAVORITES,
	};

	const mapFileMetaListResponse = (
		response: FileMetaListResponse
	): CollaborativeFile[] => {
		const files: CollaborativeFile[] = response.data.map(
			(fileMeta: FileMetaResponse) => mapFileMetaResponse(fileMeta)
		);
		return files;
	};

	const mapFileMetaResponse = (
		fileMeta: FileMetaResponse
	): CollaborativeFile => {
		const fileType: CollaborativeFileType = FileTypeMapping[fileMeta.type];
		const file: CollaborativeFile = {
			path: fileMeta.path,
			type: fileType,
			size: fileMeta.size,
			name: fileMeta.name,
			lastChanged: fileMeta.lastChanged,
			icon: FileTypeIconMapping[fileType],
			translationKey: undefined,
		};
		return file;
	};

	return {
		mapFileMetaListResponse,
		getFilesPageForRoute,
		mapFileToFileTableItem,
		getFileCategory,
		getDeepBreadcumbs,
		getHeaders,
	};
}
