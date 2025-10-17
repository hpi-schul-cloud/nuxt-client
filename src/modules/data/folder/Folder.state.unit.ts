import { useFolderState } from "./Folder.state";
import * as serverApi from "@/serverApi/v3/api";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { ParentNodeInfo, ParentNodeType } from "@/types/board/ContentElement";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { axiosErrorFactory, fileFolderElementResponseFactory, parentNodeInfoFactory } from "@@/tests/test-utils";
import { useAppStore } from "@data-app";
import { createMock } from "@golevelup/ts-vitest";
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
		const boardApi = createMock<serverApi.BoardElementApiInterface>();
		const folderElement = fileFolderElementResponseFactory.build();
		const parentNodeInfos = parentNodeInfoFactory.build();

		boardApi.elementControllerGetElementWithParentHierarchy.mockReturnValueOnce({
			data: {
				element: props?.element ?? folderElement,
				parentHierarchy: props?.parentNodeInfos ?? parentNodeInfos,
			},
		} as unknown as AxiosPromise);

		vi.spyOn(serverApi, "BoardElementApiFactory").mockReturnValue(boardApi);

		return {
			testId: folderElement.id,
			title: folderElement.content.title,
			createdAt: folderElement.timestamps.createdAt,
			lastUpdatedAt: folderElement.timestamps.lastUpdatedAt,
		};
	};

	it("should initialize with default values", () => {
		const { breadcrumbs, fileFolderElement, folderName, parent } = useFolderState();

		expect(breadcrumbs.value).toEqual([]);
		expect(fileFolderElement.value).toBeUndefined();
		expect(folderName.value).toBe("pages.folder.untitled");
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

			describe("when element is not a file folder element", () => {
				const setupWithError = (statusCode: HttpStatusCode) => {
					const boardApi = createMock<serverApi.BoardElementApiInterface>();

					const axiosError = axiosErrorFactory.withStatusCode(statusCode).build();

					boardApi.elementControllerGetElementWithParentHierarchy.mockRejectedValueOnce(axiosError);

					vi.spyOn(serverApi, "BoardElementApiFactory").mockReturnValue(boardApi);
				};

				it("should create an application error", async () => {
					const expectedError = createApplicationError(HttpStatusCode.NotFound);

					setupWithError(expectedError.statusCode);

					const { fetchFileFolderElement } = useFolderState();

					await fetchFileFolderElement("invalid-id");
					expect(useAppStore().handleApplicationError).toHaveBeenCalledWith(HttpStatusCode.NotFound);
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
			});

			describe("when root parent node is a course", () => {
				it("should set breadcrumps correctly", async () => {
					const { testId, title } = setup({
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
								type: ParentNodeType.Room,
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
								type: ParentNodeType.User,
							},
						],
					});
					const userError = new Error(`Unknown node type: user`);

					const { fetchFileFolderElement, breadcrumbs } = useFolderState();

					await fetchFileFolderElement(testId);

					expect(() => breadcrumbs.value).toThrow(userError);
				});
			});
		});
	});

	describe("parent", () => {
		it("should return the last parent node when parentNodeInfos is populated", async () => {
			const { testId } = setup({
				parentNodeInfos: [
					{ id: "parent-1", name: "Parent 1", type: ParentNodeType.Room },
					{ id: "parent-2", name: "Parent 2", type: ParentNodeType.Course },
				],
			});

			const { fetchFileFolderElement, parent } = useFolderState();

			await fetchFileFolderElement(testId);

			expect(parent.value).toEqual({
				id: "parent-2",
				name: "Parent 2",
				type: ParentNodeType.Course,
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
			expect(mapNodeTypeToPathType(ParentNodeType.Course)).toBe("courses");
		});

		it('should return "rooms" for ParentNodeType.Room', () => {
			const { mapNodeTypeToPathType } = useFolderState();
			expect(mapNodeTypeToPathType(ParentNodeType.Room)).toBe("rooms");
		});

		it('should return "boards" for ParentNodeType.Board', () => {
			const { mapNodeTypeToPathType } = useFolderState();
			expect(mapNodeTypeToPathType(ParentNodeType.Board)).toBe("boards");
		});

		it("should throw an error for an unknown node type", () => {
			const { mapNodeTypeToPathType } = useFolderState();
			expect(() => mapNodeTypeToPathType("unknown")).toThrow("Unknown node type: unknown");
		});
	});
});
