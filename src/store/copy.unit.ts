import * as serverApi from "../generated/serverApi/v3";
import { CopyApiResponse, CopyApiResponseStatus, CopyApiResponseType } from "../generated/serverApi/v3";
import CopyModule, { CopyParams, CopyParamsTypeEnum } from "./copy";

const serverDataPartial: CopyApiResponse = {
	title: "Aufgabe",
	type: CopyApiResponseType.TASK,
	status: CopyApiResponseStatus.PARTIAL,
	id: "123",
	elements: [
		{
			type: CopyApiResponseType.SUBMISSION_GROUP,
			status: CopyApiResponseStatus.NOT_DOING,
		},
		{
			type: CopyApiResponseType.FILE,
			status: CopyApiResponseStatus.NOT_IMPLEMENTED,
		},
		{
			type: CopyApiResponseType.LESSON_CONTENT_ETHERPAD,
			status: CopyApiResponseStatus.FAILURE,
		},
	],
};

const serverDataSuccess: CopyApiResponse = {
	title: "Thema X",
	type: CopyApiResponseType.LESSON,
	destinationId: "aCourseId",
	status: CopyApiResponseStatus.SUCCESS,
	id: "123",
	elements: [
		{
			type: CopyApiResponseType.SUBMISSION_GROUP,
			status: CopyApiResponseStatus.NOT_DOING,
		},
		{
			type: CopyApiResponseType.FILE,
			status: CopyApiResponseStatus.NOT_IMPLEMENTED,
		},
		{
			type: CopyApiResponseType.LESSON_CONTENT_ETHERPAD,
			status: CopyApiResponseStatus.SUCCESS,
		},
	],
};

describe("copy module", () => {
	beforeEach(() => {
		vi.stubGlobal("setTimeout", (fn: () => unknown) => fn());
	});

	describe("actions", () => {
		afterEach(() => {
			vi.clearAllMocks();
		});

		describe("copy", () => {
			it("should throw an error if copyResult is undefined", async () => {
				const roomCopyMockApi = {
					courseRoomsControllerCopyCourse: vi.fn(async () => ({})),
				};
				vi.spyOn(serverApi, "CourseRoomsApiFactory").mockReturnValue(
					roomCopyMockApi as unknown as serverApi.CourseRoomsApiInterface
				);

				const copyModule = new CopyModule({});
				const payload: CopyParams = {
					id: "courseId-value",
					type: CopyParamsTypeEnum.Course,
					courseId: "courseId-value",
				};

				await expect(() => copyModule.copy(payload)).rejects.toThrow(`CopyProcess unknown type: ${payload.type}`);
			});

			describe("copy a task", () => {
				describe("should make a 'POST' request to the backend", () => {
					const setup = () => {
						const taskMockApi = {
							taskControllerCopyTask: vi.fn(async () => ({ data: {} })),
						};
						vi.spyOn(serverApi, "TaskApiFactory").mockReturnValue(taskMockApi as unknown as serverApi.TaskApiInterface);
						const copyModule = new CopyModule({});

						return { copyModule, taskMockApi };
					};

					it("should send with courseId", async () => {
						const { copyModule, taskMockApi } = setup();

						const payload: CopyParams = {
							id: "taskId",
							type: CopyParamsTypeEnum.Task,
							courseId: "testCourseId",
						};
						await copyModule.copy(payload);

						expect(taskMockApi.taskControllerCopyTask).toHaveBeenCalledWith("taskId", { courseId: "testCourseId" });
					});

					it("should send with NO courseId", async () => {
						const { copyModule, taskMockApi } = setup();

						const payload: CopyParams = {
							id: "taskId",
							type: CopyParamsTypeEnum.Task,
						};

						await copyModule.copy(payload);

						expect(taskMockApi.taskControllerCopyTask).toHaveBeenCalledWith("taskId", { courseId: undefined });
					});
				});
			});

			describe("copy a course", () => {
				it("should make a 'POST' request to the backend", async () => {
					const roomCopyMockApi = {
						courseRoomsControllerCopyCourse: vi.fn(async () => ({
							data: {},
						})),
					};
					vi.spyOn(serverApi, "CourseRoomsApiFactory").mockReturnValue(
						roomCopyMockApi as unknown as serverApi.CourseRoomsApiInterface
					);

					const copyModule = new CopyModule({});
					const payload: CopyParams = {
						id: "courseId-value",
						type: CopyParamsTypeEnum.Course,
						courseId: "courseId-value",
					};

					await copyModule.copy(payload);

					expect(roomCopyMockApi.courseRoomsControllerCopyCourse).toHaveBeenCalledWith("courseId-value");
				});
			});

			describe("copy a lesson", () => {
				it("should make a 'POST' request to the backend", async () => {
					const roomCopyMockApi = {
						courseRoomsControllerCopyLesson: vi.fn(async () => ({
							data: {},
						})),
					};
					vi.spyOn(serverApi, "CourseRoomsApiFactory").mockReturnValue(
						roomCopyMockApi as unknown as serverApi.CourseRoomsApiInterface
					);
					const copyModule = new CopyModule({});
					await copyModule.copy({
						id: "testLessonId",
						type: CopyParamsTypeEnum.Lesson,
						courseId: "testCourseId",
					});
					expect(roomCopyMockApi.courseRoomsControllerCopyLesson).toHaveBeenCalledWith("testLessonId", {
						courseId: "testCourseId",
					});
				});
			});

			describe("copy a board", () => {
				it("should make a 'POST' request to the backend", async () => {
					const boardCopyMockApi = {
						boardControllerCopyBoard: vi.fn(async () => ({ data: {} })),
					};
					vi.spyOn(serverApi, "BoardApiFactory").mockReturnValue(
						boardCopyMockApi as unknown as serverApi.BoardApiInterface
					);
					const copyModule = new CopyModule({});
					await copyModule.copy({
						id: "testBoardId",
						type: CopyParamsTypeEnum.ColumnBoard,
						courseId: "testCourseId",
					});
					expect(boardCopyMockApi.boardControllerCopyBoard).toHaveBeenCalledWith("testBoardId");
				});
			});
		});

		describe("validate share token", () => {
			it("should validate share token by using the api", async () => {
				const shareApiMock = {
					shareTokenControllerLookupShareToken: vi.fn(async () => ({
						data: {},
					})),
				};
				vi.spyOn(serverApi, "ShareTokenApiFactory").mockReturnValue(
					shareApiMock as unknown as serverApi.ShareTokenApiInterface
				);

				const copyModule = new CopyModule({});
				const token = "abc123a";

				await copyModule.validateShareToken(token);

				expect(shareApiMock.shareTokenControllerLookupShareToken).toHaveBeenCalledWith(token);
			});
		});

		describe("import a course", () => {
			it("should import a course by using the shareApi", async () => {
				const shareApiMock = {
					shareTokenControllerImportShareToken: vi.fn(async () => ({
						data: {},
					})),
				};
				vi.spyOn(serverApi, "ShareTokenApiFactory").mockReturnValue(
					shareApiMock as unknown as serverApi.ShareTokenApiInterface
				);

				const copyModule = new CopyModule({});
				const token = "abc123a";
				const newName = "My Course";
				const payload = {
					token,
					type: serverApi.ShareTokenInfoResponseParentType.COURSES,
					newName,
				};

				await copyModule.copyByShareToken(payload);

				expect(shareApiMock.shareTokenControllerImportShareToken).toHaveBeenCalledWith(token, { newName });
			});

			it("should throw an error if copyResult is undefined", async () => {
				const shareApiMock = {
					shareTokenControllerImportShareToken: vi.fn(async () => ({})),
				};
				vi.spyOn(serverApi, "ShareTokenApiFactory").mockReturnValue(
					shareApiMock as unknown as serverApi.ShareTokenApiInterface
				);

				const copyModule = new CopyModule({});
				const payload = {
					token: "abc123a",
					type: serverApi.ShareTokenInfoResponseParentType.COURSES,
					newName: "My Course",
				};

				await expect(() => copyModule.copyByShareToken(payload)).rejects.toThrow(
					`CopyProcess unknown type: ${payload.type}`
				);
			});
		});

		describe("import a lesson", () => {
			it("should import a lesson by using the shareApi", async () => {
				const shareApiMock = {
					shareTokenControllerImportShareToken: vi.fn(async () => ({
						data: {},
					})),
				};
				vi.spyOn(serverApi, "ShareTokenApiFactory").mockReturnValue(
					shareApiMock as unknown as serverApi.ShareTokenApiInterface
				);

				const copyModule = new CopyModule({});
				const token = "abc123a";
				const newName = "My Lesson";
				const payload = {
					token,
					type: serverApi.ShareTokenInfoResponseParentType.LESSONS,
					newName,
				};

				await copyModule.copyByShareToken(payload);

				expect(shareApiMock.shareTokenControllerImportShareToken).toHaveBeenCalledWith(token, { newName });
			});

			it("should throw an error if copyResult is undefined", async () => {
				const shareApiMock = {
					shareTokenControllerImportShareToken: vi.fn(async () => ({})),
				};
				vi.spyOn(serverApi, "ShareTokenApiFactory").mockReturnValue(
					shareApiMock as unknown as serverApi.ShareTokenApiInterface
				);

				const copyModule = new CopyModule({});
				const payload = {
					token: "abc123a",
					type: serverApi.ShareTokenInfoResponseParentType.LESSONS,
					newName: "My Lesson",
				};

				await expect(() => copyModule.copyByShareToken(payload)).rejects.toThrow(
					`CopyProcess unknown type: ${payload.type}`
				);
			});
		});
	});

	describe("mutations", () => {
		describe("setCopyResult", () => {
			it("should set copyResult", () => {
				const copyModule = new CopyModule({});
				copyModule.setCopyResult(serverDataPartial);
				expect(copyModule.getCopyResult).toStrictEqual(serverDataPartial);
			});

			it("should reset copyResult and filteredResult", () => {
				const copyModule = new CopyModule({});
				copyModule.setCopyResult(serverDataPartial);
				expect(copyModule.getCopyResult).toStrictEqual(serverDataPartial);
				copyModule.reset();
				expect(copyModule.getCopyResult).toBeUndefined();
				expect(copyModule.getCopyResultFailedItems).toStrictEqual([]);
			});
		});

		describe("setCopyResultFailedItems", () => {
			it("should set filteredResult for failed task copy", () => {
				const serverData = {
					title: "Aufgabe",
					type: CopyApiResponseType.TASK,
					destinationId: "testCourseId",
					status: CopyApiResponseStatus.FAILURE,
					id: "123",
					elements: [
						{
							type: CopyApiResponseType.FILE,
							status: CopyApiResponseStatus.FAILURE,
						},
					],
				};
				const expectedData = [
					{
						title: "Aufgabe",
						type: CopyApiResponseType.TASK,
						elementId: "123",
						url: "/homework/123/edit?returnUrl=rooms/testCourseId",
						elements: [
							{
								type: CopyApiResponseType.FILE,
								title: "",
							},
						],
					},
				];
				const copyModule = new CopyModule({});
				copyModule.reset();
				copyModule.setCopyResultFailedItems({
					payload: serverData,
				});
				expect(copyModule.getCopyResultFailedItems).toStrictEqual(expectedData);
			});

			describe("setCopyResultFailedItems", () => {
				it("should set filteredResult for failed columnBoard copy", () => {
					const serverData = {
						title: "ColumnBoard",
						type: CopyApiResponseType.COLUMNBOARD,
						destinationId: "testCourseId",
						status: CopyApiResponseStatus.FAILURE,
						id: "123",
						elements: [
							{
								type: CopyApiResponseType.DRAWING_ELEMENT,
								status: CopyApiResponseStatus.FAILURE,
							},
						],
					};
					const expectedData = [
						{
							title: "ColumnBoard",
							type: CopyApiResponseType.COLUMNBOARD,
							elementId: "123",
							url: "/boards/123",
							elements: [
								{
									type: CopyApiResponseType.DRAWING_ELEMENT,
									title: "",
								},
							],
						},
					];
					const copyModule = new CopyModule({});
					copyModule.reset();
					copyModule.setCopyResultFailedItems({
						payload: serverData,
					});
					expect(copyModule.getCopyResultFailedItems).toStrictEqual(expectedData);
				});
			});

			it("should set filteredResult for failed lesson copy", () => {
				const serverData = {
					title: "Thema",
					type: CopyApiResponseType.LESSON,
					destinationId: "testCourseIdX",
					status: CopyApiResponseStatus.FAILURE,
					id: "456",
					elements: [
						{
							type: CopyApiResponseType.LESSON_CONTENT_TEXT,
							status: CopyApiResponseStatus.FAILURE,
						},
					],
				};
				const expectedData = [
					{
						title: "Thema",
						type: CopyApiResponseType.LESSON,
						elementId: "456",
						url: "/courses/testCourseIdX/topics/456/edit?returnUrl=rooms/testCourseIdX",
						elements: [
							{
								title: "",
								type: CopyApiResponseType.LESSON_CONTENT_TEXT,
							},
						],
					},
				];
				const copyModule = new CopyModule({});
				copyModule.reset();
				copyModule.setCopyResultFailedItems({
					payload: serverData,
				});
				expect(copyModule.getCopyResultFailedItems).toStrictEqual(expectedData);
			});

			it("should set the state with all-success data", () => {
				const copyModule = new CopyModule({});
				copyModule.setCopyResultFailedItems({
					payload: serverDataSuccess,
				});
				expect(copyModule.getCopyResultFailedItems).toStrictEqual([]);
			});

			it("should set the state with filtering 'not-doing' elements", () => {
				const payload = {
					payload: {
						title: "test course",
						type: CopyApiResponseType.COURSE,
						status: CopyApiResponseStatus.PARTIAL,
						id: "12345",
						elements: [
							{
								type: CopyApiResponseType.METADATA,
								status: CopyApiResponseStatus.SUCCESS,
							},
							{
								type: CopyApiResponseType.USER_GROUP,
								status: CopyApiResponseStatus.NOT_DOING,
							},
							{
								type: CopyApiResponseType.LESSON_CONTENT_GEOGEBRA,
								status: CopyApiResponseStatus.PARTIAL,
							},
							{
								type: CopyApiResponseType.FILE_GROUP,
								status: CopyApiResponseStatus.NOT_IMPLEMENTED,
							},
						],
					},
				};
				const expectedData = [
					{
						title: "test course",
						type: CopyApiResponseType.COURSE,
						elementId: "12345",
						elements: [
							{
								title: "",
								type: CopyApiResponseType.LESSON_CONTENT_GEOGEBRA,
							},
						],
						url: "/courses/12345/edit",
					},
				];
				const copyModule = new CopyModule({});
				copyModule.setCopyResultFailedItems(payload);
				expect(copyModule.getCopyResultFailedItems).toStrictEqual(expectedData);
			});

			// TODO - Why is this being skipped? Test should be fixed or deleted
			it.skip("should set the state and change the statusses 'success'", () => {
				const payload = {
					payload: {
						title: "test course",
						type: CopyApiResponseType.COURSE,
						status: CopyApiResponseStatus.PARTIAL,
						id: "12345",
						elements: [
							{
								type: CopyApiResponseType.METADATA,
								status: CopyApiResponseStatus.SUCCESS,
							},
							{
								type: CopyApiResponseType.BOARD,
								status: CopyApiResponseStatus.PARTIAL,
								id: "345",
								elements: [
									{
										title: "Task 1",
										type: CopyApiResponseType.TASK,
										destinationCourseId: "aCourseId",
										status: CopyApiResponseStatus.PARTIAL,
										id: "567",
										elements: [
											{
												type: CopyApiResponseType.METADATA,
												status: CopyApiResponseStatus.SUCCESS,
											},
											{
												type: CopyApiResponseType.SUBMISSION_GROUP,
												status: CopyApiResponseStatus.NOT_DOING,
											},
										],
									},
								],
							},
						],
					},
				};
				const expectedData = [
					{
						title: "test course",
						type: CopyApiResponseType.COURSE,
						elementId: "12345",
						elements: [],
						url: "/courses/12345/edit",
					},
					{
						elementId: "567",
						elements: [],
						title: "Task 1",
						type: CopyApiResponseType.TASK,
						url: "/homework/567/edit?returnUrl=rooms/aCourseId",
					},
				];
				const copyModule = new CopyModule({});
				copyModule.setCopyResultFailedItems(payload);
				expect(copyModule.getCopyResultFailedItems).toStrictEqual(expectedData);
			});
		});
	});

	describe("getters", () => {
		it("should have correct getters results", () => {
			const copyModule = new CopyModule({});
			copyModule.setCopyResult(serverDataPartial);
			copyModule.setResultModalOpen(true);
			copyModule.setHasDrawingChild(true);
			expect(copyModule.getId).toBe("123");
			expect(copyModule.getTitle).toBe("Aufgabe");
			expect(copyModule.getIsResultModalOpen).toBe(true);
		});
	});
});
