import { useFolderState } from "./Folder.state";
import { ContentElementType, ParentNodeInfo, ParentNodeType } from "@/types/board/ContentElement";
import { HttpStatusCode } from "@/types/enum/http-status-code.enum";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { buildPageTitle } from "@/utils/pageTitle";
import {
	axiosErrorFactory,
	fileFolderElementResponseFactory,
	mockApi,
	parentNodeInfoFactory,
} from "@@/tests/test-utils";
import * as serverApi from "@api-server";
import { useAppStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { AxiosPromise } from "axios";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";

vi.mock("vue-i18n", () => ({
	useI18n: vi.fn().mockReturnValue({ t: (key: string) => key }),
}));

describe("useFolderState", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const setup = (props?: { element?: unknown; parentNodeInfos?: ParentNodeInfo[] }) => {
		const boardElementApi = mockApi<serverApi.BoardElementApiInterface>();
		const boardApi = mockApi<serverApi.BoardApiInterface>();
		const folderElement = fileFolderElementResponseFactory.build();
		const parentNodeInfos = parentNodeInfoFactory.build();

		boardElementApi.elementControllerGetElementWithParentHierarchy.mockReturnValueOnce({
			data: {
				element: props?.element ?? folderElement,
				parentHierarchy: props?.parentNodeInfos ?? parentNodeInfos,
			},
		} as unknown as AxiosPromise);

		vi.spyOn(serverApi, "BoardElementApiFactory").mockReturnValue(boardElementApi);
		vi.spyOn(serverApi, "BoardApiFactory").mockReturnValue(boardApi);

		return {
			testId: folderElement.id,
			title: folderElement.content.title,
			createdAt: folderElement.timestamps.createdAt,
			lastUpdatedAt: folderElement.timestamps.lastUpdatedAt,
			boardElementApi,
			boardApi,
		};
	};

	it("should initialize with default values", () => {
		const { breadcrumbs, fileFolderElement, folderName, pageTitle, parent } = useFolderState();

		expect(breadcrumbs.value).toEqual([]);
		expect(fileFolderElement.value).toBeUndefined();
		expect(folderName.value).toBe("pages.folder.untitled");
		expect(pageTitle.value).toBe(buildPageTitle("pages.folder.untitled", "pages.folder.title"));
		expect(parent.value).toBeUndefined();
	});

	describe("fetchFileFolderElement", () => {
		describe("when boardElementApi resolves", () => {
			describe("element is a file folder element", () => {
				it("should call boardElementApi with correct parameters", async () => {
					const { testId } = setup();

					const { fetchFileFolderElement } = useFolderState();

					await fetchFileFolderElement(testId);

					expect(
						serverApi.BoardElementApiFactory().elementControllerGetElementWithParentHierarchy
					).toHaveBeenCalledWith(testId);
				});
			});

			describe("when api call fails", () => {
				const setupWithError = (statusCode: HttpStatusCode) => {
					const boardElementApi = mockApi<serverApi.BoardElementApiInterface>();
					const boardApi = mockApi<serverApi.BoardApiInterface>();

					const axiosError = axiosErrorFactory.withStatusCode(statusCode).build();

					boardElementApi.elementControllerGetElementWithParentHierarchy.mockRejectedValueOnce(axiosError);

					vi.spyOn(serverApi, "BoardElementApiFactory").mockReturnValue(boardElementApi);
					vi.spyOn(serverApi, "BoardApiFactory").mockReturnValue(boardApi);
				};

				it("should create an application error", async () => {
					const expectedError = createApplicationError(HttpStatusCode.NotFound);

					setupWithError(expectedError.statusCode);

					const { fetchFileFolderElement } = useFolderState();

					await fetchFileFolderElement("invalid-id");
					expect(useAppStore().handleApplicationError).toHaveBeenCalledWith(HttpStatusCode.NotFound, "pages.folder.error.404");
				});
			});

			describe("when element is not a file folder element", () => {
				it("should map internal error to application error", async () => {
					const { testId } = setup({
						element: {
							...fileFolderElementResponseFactory.build(),
							type: ContentElementType.EXTERNAL_TOOL,
						},
					});

					const { fetchFileFolderElement } = useFolderState();

					await fetchFileFolderElement(testId);

					expect(useAppStore().handleUnknownError).toHaveBeenCalled();
				});
			});

			describe("when element is a file folder element", () => {
				it("should set fileFolderElement correctly", async () => {
					const { testId, title, createdAt, lastUpdatedAt } = setup();

					const { fetchFileFolderElement, fileFolderElement } = useFolderState();

					await fetchFileFolderElement(testId);

					expect(fileFolderElement.value).toEqual({
						id: testId,
						content: { title },
						type: "fileFolder",
						timestamps: { createdAt, lastUpdatedAt },
					});
				});

				describe("when file folder element has an empty title", () => {
					it("should return default title", async () => {
						const { testId } = setup({
							element: {
								...fileFolderElementResponseFactory.build(),
								content: { title: "" },
							},
						});

						const { fetchFileFolderElement, folderName } = useFolderState();

						await fetchFileFolderElement(testId);

						expect(folderName.value).toEqual("pages.folder.untitled");
					});
				});
			});

			describe("when root parent node is a course", () => {
				it("should set breadcrumps correctly", async () => {
					const { testId, title } = setup({
						parentNodeInfos: [
							{
								id: "course-id",
								name: "Course",
								type: ParentNodeType.COURSE,
							},
							{
								id: "column-board-id",
								name: "Column Board",
								type: ParentNodeType.BOARD,
							},
						],
					});

					const { fetchFileFolderElement, breadcrumbs } = useFolderState();

					await fetchFileFolderElement(testId);

					expect(breadcrumbs.value).toEqual([
						{
							title: "common.words.courses",
							to: "/rooms/courses-overview",
						},
						{
							title: "Course",
							to: "/courses/course-id",
						},
						{
							title: "Column Board",
							to: "/boards/column-board-id",
						},
						{
							disabled: true,
							title,
						},
					]);
				});
			});

			describe("when root parent node is a room", () => {
				it("should set breadcrumps correctly", async () => {
					const { testId, title } = setup({
						parentNodeInfos: [
							{
								id: "room-id",
								name: "Room",
								type: ParentNodeType.ROOM,
							},
						],
					});

					const { fetchFileFolderElement, breadcrumbs } = useFolderState();

					await fetchFileFolderElement(testId);

					expect(breadcrumbs.value).toEqual([
						{
							title: "pages.rooms.title",
							to: "/rooms",
						},
						{
							title: "Room",
							to: "/rooms/room-id",
						},
						{
							disabled: true,
							title,
						},
					]);
				});
			});

			describe("when root parent node is a user", () => {
				it("should throw", async () => {
					const { testId } = setup({
						parentNodeInfos: [
							{
								id: "user-id",
								name: "User",
								type: ParentNodeType.USER,
							},
						],
					});
					const userError = new Error(`Unknown node type: user`);

					const { fetchFileFolderElement, breadcrumbs } = useFolderState();

					await fetchFileFolderElement(testId);

					expect(() => breadcrumbs.value).toThrow(userError);
				});
			});

			describe("when parent hierarchy contains an empty slot", () => {
				it("should keep breadcrumbs with only the folder title", async () => {
					const parentNodeInfos = new Array(1) as ParentNodeInfo[];
					const { testId, title } = setup({ parentNodeInfos });

					const { fetchFileFolderElement, breadcrumbs } = useFolderState();

					await fetchFileFolderElement(testId);

					expect(breadcrumbs.value).toEqual([
						{
							disabled: true,
							title,
						},
					]);
				});
			});
		});
	});

	describe("renameFolder", () => {
		it("should update element and refetch folder", async () => {
			const { testId, boardElementApi } = setup();

			boardElementApi.elementControllerUpdateElement.mockResolvedValue(await ({} as AxiosPromise));
			boardElementApi.elementControllerGetElementWithParentHierarchy.mockResolvedValue(
				await ({
					data: {
						element: fileFolderElementResponseFactory.build(),
						parentHierarchy: parentNodeInfoFactory.build(),
					},
				} as unknown as AxiosPromise)
			);

			const { renameFolder } = useFolderState();

			await renameFolder("Updated Title", testId);

			expect(boardElementApi.elementControllerUpdateElement).toHaveBeenCalledWith(testId, {
				data: { content: { title: "Updated Title" }, type: ContentElementType.FILE_FOLDER },
			});
			expect(boardElementApi.elementControllerGetElementWithParentHierarchy).toHaveBeenCalledWith(testId);
		});

		it("should handle api errors", async () => {
			const { testId, boardElementApi } = setup();
			const axiosError = axiosErrorFactory.withStatusCode(HttpStatusCode.BadRequest).build();

			boardElementApi.elementControllerUpdateElement.mockRejectedValueOnce(axiosError);

			const { renameFolder } = useFolderState();

			await renameFolder("Updated Title", testId);

			expect(useAppStore().handleApplicationError).toHaveBeenCalledWith(HttpStatusCode.BadRequest, undefined);
		});
	});

	describe("removeFolder", () => {
		it("should delete folder by id", async () => {
			const { testId, boardElementApi } = setup();
			boardElementApi.elementControllerDeleteElement.mockResolvedValue(await ({} as AxiosPromise));

			const { removeFolder } = useFolderState();

			await removeFolder(testId);

			expect(boardElementApi.elementControllerDeleteElement).toHaveBeenCalledWith(testId);
		});
	});

	describe("fetchAllowedOperations", () => {
		it("should set allowed operations when returned by api", async () => {
			const { boardApi } = setup();
			const allowedOperations = { createFileElement: true } as serverApi.BoardResponseAllowedOperations;
			boardApi.boardControllerGetBoardSkeleton.mockResolvedValueOnce(
				await ({
					data: { allowedOperations },
				} as unknown as AxiosPromise)
			);

			const { fetchAllowedOperations: fetchOperations, allowedOperations: stateAllowedOperations } = useFolderState();

			await fetchOperations("parent-id");

			expect(stateAllowedOperations.value).toEqual(allowedOperations);
		});

		it("should keep fallback allowed operations when response has none", async () => {
			const { boardApi } = setup();
			boardApi.boardControllerGetBoardSkeleton.mockResolvedValueOnce(
				await ({
					data: {},
				} as unknown as AxiosPromise)
			);

			const { fetchAllowedOperations: fetchOperations, allowedOperations: stateAllowedOperations } = useFolderState();

			await fetchOperations("parent-id");

			expect(stateAllowedOperations.value.createFileElement).toBe(false);
		});

		it("should handle api errors", async () => {
			const { boardApi } = setup();
			const axiosError = axiosErrorFactory.withStatusCode(HttpStatusCode.Forbidden).build();
			boardApi.boardControllerGetBoardSkeleton.mockRejectedValueOnce(axiosError);

			const { fetchAllowedOperations: fetchOperations } = useFolderState();

			await fetchOperations("parent-id");

			expect(useAppStore().handleApplicationError).toHaveBeenCalledWith(HttpStatusCode.Forbidden, undefined);
		});
	});

	describe("parent", () => {
		it("should return the last parent node when parentNodeInfos is populated", async () => {
			const { testId } = setup({
				parentNodeInfos: [
					{ id: "parent-1", name: "Parent 1", type: ParentNodeType.ROOM },
					{ id: "parent-2", name: "Parent 2", type: ParentNodeType.COURSE },
				],
			});

			const { fetchFileFolderElement, parent } = useFolderState();

			await fetchFileFolderElement(testId);

			expect(parent.value).toEqual({
				id: "parent-2",
				name: "Parent 2",
				type: ParentNodeType.COURSE,
			});
		});

		it("should return undefined when parentNodeInfos is empty", async () => {
			const { testId } = setup({ parentNodeInfos: [] });

			const { fetchFileFolderElement, parent } = useFolderState();

			await fetchFileFolderElement(testId);

			expect(parent.value).toBeUndefined();
		});
	});

	describe("mapNodeTypeToPathType", () => {
		it('should return "courses" for ParentNodeType.Course', () => {
			const { mapNodeTypeToPathType } = useFolderState();
			expect(mapNodeTypeToPathType(ParentNodeType.COURSE)).toBe("courses");
		});

		it('should return "rooms" for ParentNodeType.Room', () => {
			const { mapNodeTypeToPathType } = useFolderState();
			expect(mapNodeTypeToPathType(ParentNodeType.ROOM)).toBe("rooms");
		});

		it('should return "boards" for ParentNodeType.Board', () => {
			const { mapNodeTypeToPathType } = useFolderState();
			expect(mapNodeTypeToPathType(ParentNodeType.BOARD)).toBe("boards");
		});

		it("should throw an error for an unknown node type", () => {
			const { mapNodeTypeToPathType } = useFolderState();
			expect(() => mapNodeTypeToPathType("unknown")).toThrow("Unknown node type: unknown");
		});
	});
});
