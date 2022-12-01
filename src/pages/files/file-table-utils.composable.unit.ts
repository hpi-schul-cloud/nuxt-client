import { DataTableHeader } from "vuetify";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import { Route } from "vue-router";
import { FileMetaListResponse } from "@/store/collaborative-files/file-meta-list.response";
import { FileTypeResponse } from "@/store/collaborative-files/file-meta.response";
import {
	CollaborativeFile,
	CollaborativeFileType,
	FileIcon,
} from "@/store/types/collaborative-file";
import { useFileTableUtils } from "@/pages/files/file-table-utils.composable";
import { FilesPageConfig } from "@/pages/files/file-page-config.type";
import { collaborativeFilesModule } from "@/store/store-accessor";

jest.mock("@/store/store-accessor", () => ({
	collaborativeFilesModule: {
		fetchFilesOverview: jest.fn(),
		fetchTeams: jest.fn(),
		fetchTeamFiles: jest.fn(),
	},
}));

describe("UseFileTableUtils", () => {
	function setup() {
		const expectedTranslation = "translated";
		const tMock = jest.fn().mockReturnValue(expectedTranslation);
		const {
			getHeaders,
			getFilesPageForRoute,
			getFileCategory,
			mapFileMetaListResponse,
			getDeepBreadcumbs,
		} = useFileTableUtils(collaborativeFilesModule, tMock);

		return {
			getHeaders,
			getFilesPageForRoute,
			getFileCategory,
			mapFileMetaListResponse,
			getDeepBreadcumbs,
			tMock,
			expectedTranslation,
		};
	}

	describe("getHeaders", () => {
		it("should return dataTableHeader array", () => {
			const { getHeaders, tMock, expectedTranslation } = setup();

			const headers: DataTableHeader[] = getHeaders();

			expect(headers.length).toEqual(4);

			const iconHeader = headers[0];
			expect(iconHeader.text).toEqual("");
			expect(iconHeader.value).toEqual("icon");
			expect(iconHeader.sortable).toBeFalsy();
			expect(iconHeader.width).toEqual(5);

			const nameHeader = headers[1];
			expect(nameHeader.text).toEqual(expectedTranslation);
			expect(nameHeader.value).toEqual("name");
			expect(nameHeader.class).toEqual("primary--text");
			expect(nameHeader.cellClass).toEqual("primary--text");
			expect(nameHeader.sortable).toBeUndefined();
			expect(nameHeader.width).toBeUndefined();
			expect(tMock).toHaveBeenCalledWith("common.labels.name");

			const sizeHeader = headers[2];
			expect(sizeHeader.text).toEqual(expectedTranslation);
			expect(sizeHeader.value).toEqual("size");
			expect(sizeHeader.class).toEqual("primary--text");
			expect(sizeHeader.sortable).toBeUndefined();
			expect(sizeHeader.width).toEqual("110");
			expect(tMock).toHaveBeenCalledWith("common.labels.size");

			const changedHeader = headers[3];
			expect(changedHeader.text).toEqual(expectedTranslation);
			expect(changedHeader.value).toEqual("lastChanged");
			expect(changedHeader.class).toEqual("primary--text");
			expect(changedHeader.sortable).toBeUndefined();
			expect(changedHeader.width).toEqual("140");
			expect(tMock).toHaveBeenCalledWith("common.labels.changed");

			expect(tMock).toBeCalledTimes(3);
		});
	});

	describe("getDeepBreadcumbs", () => {
		it("should return deepBreadcrumbs", () => {
			const { getDeepBreadcumbs } = setup();
			const class10 = "class10";
			const deepBreadcumbs: Breadcrumb[] = getDeepBreadcumbs([
				class10,
				"groupA",
			]);

			expect(deepBreadcumbs.length).toEqual(1);
			expect(deepBreadcumbs[0].text).toEqual(class10);
			expect(deepBreadcumbs[0].to).toEqual(`/cfiles/teams/${class10}`);
		});
	});

	describe("getFilesPageForRoute", () => {
		describe("getFileCategory", () => {
			it("should return the fileCategory teams when pathArray >= 2", () => {
				const { getFileCategory } = setup();
				const expectedCategory = "teams";

				const category: string = getFileCategory([
					"cfiles",
					expectedCategory,
					"class10",
					"anything",
				]);

				expect(category).toEqual(expectedCategory);
			});

			it("should return the fileCategory cfiles when pathArray < 2", () => {
				const { getFileCategory } = setup();
				const category: string = getFileCategory(["cfiles"]);

				expect(category).toEqual("cfiles");
			});
		});

		describe("getFilesOverview", () => {
			it("should return the filesOverview as filesPage", async () => {
				const { getFilesPageForRoute, tMock, expectedTranslation } = setup();
				const route: Route = {
					path: "/cfiles/",
					params: {},
				} as Route;

				const filesOverview: FilesPageConfig = getFilesPageForRoute(route);
				await filesOverview.loadFilesFunction();

				expect(filesOverview.title).toEqual(expectedTranslation);
				expect(filesOverview.breadcrumbs).toEqual([]);
				expect(tMock).toHaveBeenCalledWith("pages.files.overview.headline");
				expect(collaborativeFilesModule.fetchFilesOverview).toHaveBeenCalled();
			});
		});

		describe("getTeamsOverview", () => {
			it("should return the teamsOverview as filesPage", async () => {
				const { getFilesPageForRoute, tMock, expectedTranslation } = setup();
				const route: Route = {
					path: "/cfiles/teams",
					params: {},
				} as Route;

				const filesOverview: FilesPageConfig = getFilesPageForRoute(route);
				await filesOverview.loadFilesFunction();

				expect(filesOverview.breadcrumbs).toEqual([
					{ text: expectedTranslation, to: "/cfiles/" },
				]);
				expect(tMock).toHaveBeenCalledWith("pages.files.overview.headline");
				expect(tMock).toHaveBeenCalledWith("pages.files.overview.teamFiles");
				expect(collaborativeFilesModule.fetchTeams).toHaveBeenCalled();
			});
		});

		describe("getTeamsPage", () => {
			it("should return teamsPage as filesPage", async () => {
				const { getFilesPageForRoute, tMock, expectedTranslation } = setup();
				const route: Route = {
					path: "/cfiles/teams/testFolder1/testFolder2",
					params: { catchAll: "testFolder1/testFolder2" } as unknown,
				} as Route;

				const filesOverview: FilesPageConfig = getFilesPageForRoute(route);
				await filesOverview.loadFilesFunction();

				expect(filesOverview.breadcrumbs).toEqual([
					{ text: expectedTranslation, to: "/cfiles/" },
					{ text: expectedTranslation, to: "/cfiles/teams" },
					{ text: "testFolder1", to: "/cfiles/teams/testFolder1" },
				]);
				expect(tMock).toHaveBeenCalledWith("pages.files.overview.headline");
				expect(tMock).toHaveBeenCalledWith("pages.files.overview.teamFiles");
				expect(collaborativeFilesModule.fetchTeamFiles).toHaveBeenCalledWith(
					"/testFolder1/testFolder2"
				);
			});
		});

		it("should return error when currentCategory not exists", async () => {
			const { getFilesPageForRoute, tMock } = setup();
			const route: Route = {
				path: "/cfiles/unknown/anything",
				params: {},
			} as Route;

			expect(() => getFilesPageForRoute(route)).toThrowError("page not found");
		});
	});

	describe("mapFileMetaListResponse", () => {
		it("should map a fileMetaListResponse to collaborativeFile array", () => {
			const { mapFileMetaListResponse } = setup();
			const response: FileMetaListResponse = {
				data: [
					{
						id: "id",
						name: "FileName",
						size: 38383,
						type: FileTypeResponse.FILE,
						path: "/path/to/fileName",
						lastChanged: new Date(2022, 10, 11).toISOString(),
					},
					{
						id: "id2",
						name: "FileName2",
						size: 2112,
						type: FileTypeResponse.DIRECTORY,
						path: "/path/to/fileName2",
						lastChanged: new Date(2022, 10, 10).toISOString(),
					},
				],
				size: 2,
			};

			const collaborativeFiles: CollaborativeFile[] =
				mapFileMetaListResponse(response);

			expect(collaborativeFiles[0]).toEqual({
				name: "FileName",
				size: 38383,
				type: CollaborativeFileType.FILE,
				path: "/path/to/fileName",
				lastChanged: new Date(2022, 10, 11).toISOString(),
				icon: FileIcon.FILE,
				translationKey: undefined,
			});
		});
	});
});
