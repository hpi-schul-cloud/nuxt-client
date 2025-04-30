import * as serverApi from "@/serverApi/v3/api";
import { ParentNodeInfo, ParentNodeType } from "@/types/board/ContentElement";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { createMock } from "@golevelup/ts-jest";
import { describe, expect, it } from "@jest/globals";
import { AxiosPromise } from "axios";
import { useFolderState } from "./Folder.state";

jest.mock("vue-i18n", () => {
	return {
		...jest.requireActual("vue-i18n"),
		useI18n: jest.fn().mockReturnValue({ t: (key: string) => key }),
	};
});

describe("useFolderState", () => {
	it("should initialize with default values", () => {
		const { breadcrumbs, fileFolderElement, folderName } = useFolderState();

		expect(breadcrumbs.value).toEqual([]);
		expect(fileFolderElement.value).toBeUndefined();
		expect(folderName.value).toBe("pages.folder.untitled");
	});

	describe("fetchFileFolderElement", () => {
		describe("when boardElementApi resolves", () => {
			const setup = (props?: {
				element?: unknown;
				parentNodeInfos?: ParentNodeInfo[];
			}) => {
				const boardApi = createMock<serverApi.BoardElementApiInterface>();
				const testId = "test-id";
				const folderElement = {
					id: testId,
					content: { title: "Test Folder" },
					type: "fileFolder",
				};
				const boardId = "board-id";
				const parentNodeInfos = [
					{
						id: boardId,
						name: "Parent Folder",
						type: ParentNodeType.Board,
					},
					{
						id: "course-id",
						name: "Parent Folder",
						type: ParentNodeType.Course,
					},
				];

				const resolvePromise = jest.fn();
				const mockPromise = new Promise((resolve) => {
					resolvePromise.mockImplementation(() =>
						resolve({
							data: {
								element: props?.element ?? folderElement,
								parentHierarchy: props?.parentNodeInfos ?? parentNodeInfos,
							},
						})
					);
				});

				boardApi.elementControllerGetElementWithParentHierarchy.mockReturnValue(
					mockPromise as AxiosPromise
				);

				jest
					.spyOn(serverApi, "BoardElementApiFactory")
					.mockReturnValue(boardApi);

				return {
					testId,
					resolvePromise,
					boardId,
				};
			};

			describe("element is a file folder element", () => {
				it("should call boardElementApi with correct parameters", async () => {
					const { testId, resolvePromise } = setup();

					const { fetchFileFolderElement } = useFolderState();

					fetchFileFolderElement(testId);

					expect(
						serverApi.BoardElementApiFactory()
							.elementControllerGetElementWithParentHierarchy
					).toHaveBeenCalledWith(testId);
					resolvePromise(); // Resolve the promise manually
				});
			});

			describe("when element is not a file folder element", () => {
				it("should throw an error", async () => {
					const error = createApplicationError(404);
					const invalidElement = {
						id: "invalid-id",
						content: { title: "Invalid Element" },
						type: "invalidType",
					};
					const { testId, resolvePromise } = setup({
						element: invalidElement,
					});
					resolvePromise();

					const { fetchFileFolderElement } = useFolderState();

					await expect(fetchFileFolderElement(testId)).rejects.toThrow(error);
				});
			});

			describe("when element is a file folder element", () => {
				it("should set fileFolderElement correctly", async () => {
					const { testId, resolvePromise } = setup();

					const { fetchFileFolderElement, fileFolderElement } =
						useFolderState();
					resolvePromise();

					await fetchFileFolderElement(testId);

					expect(fileFolderElement.value).toEqual({
						id: testId,
						content: { title: "Test Folder" },
						type: "fileFolder",
					});
				});
			});

			describe("when root parent node is a course", () => {
				it("should set breadcrumps correctly", async () => {
					const { testId, resolvePromise } = setup({
						parentNodeInfos: [
							{
								id: "course-id",
								name: "Course",
								type: ParentNodeType.Course,
							},
							{
								id: "column-board-id",
								name: "Column Board",
								type: ParentNodeType.Board,
							},
						],
					});

					const { fetchFileFolderElement, breadcrumbs } = useFolderState();

					resolvePromise();

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
					]);
				});
			});

			describe("when root parent node is a room", () => {
				it("should set breadcrumps correctly", async () => {
					const { testId, resolvePromise } = setup({
						parentNodeInfos: [
							{
								id: "room-id",
								name: "Room",
								type: ParentNodeType.Room,
							},
						],
					});

					const { fetchFileFolderElement, breadcrumbs } = useFolderState();

					resolvePromise();

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
					]);
				});
			});

			describe("when root parent node is a user", () => {
				it("should throw", async () => {
					const { testId, resolvePromise } = setup({
						parentNodeInfos: [
							{
								id: "user-id",
								name: "User",
								type: ParentNodeType.User,
							},
						],
					});
					const userError = new Error(`Unknown node type: user`);

					const { fetchFileFolderElement, breadcrumbs } = useFolderState();

					resolvePromise();

					await fetchFileFolderElement(testId);

					expect(() => breadcrumbs.value).toThrow(userError);
				});
			});
		});
	});
});
