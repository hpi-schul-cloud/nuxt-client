import * as serverApi from "../serverApi/v3/api";
import {
	CopyApiResponse,
	CopyApiResponseStatusEnum,
	CopyApiResponseTypeEnum,
} from "../serverApi/v3/api";
import CopyModule, { CopyParams, CopyParamsTypeEnum } from "./copy";

const serverDataPartial: CopyApiResponse = {
	title: "Aufgabe",
	type: CopyApiResponseTypeEnum.Task,
	status: CopyApiResponseStatusEnum.Partial,
	id: "123",
	elements: [
		{
			type: CopyApiResponseTypeEnum.SubmissionGroup,
			status: CopyApiResponseStatusEnum.NotDoing,
		},
		{
			type: CopyApiResponseTypeEnum.File,
			status: CopyApiResponseStatusEnum.NotImplemented,
		},
		{
			type: CopyApiResponseTypeEnum.LessonContentEtherpad,
			status: CopyApiResponseStatusEnum.Failure,
		},
	],
};

const serverDataSuccess: CopyApiResponse = {
	title: "Thema X",
	type: CopyApiResponseTypeEnum.Lesson,
	destinationCourseId: "aCourseId",
	status: CopyApiResponseStatusEnum.Success,
	id: "123",
	elements: [
		{
			type: CopyApiResponseTypeEnum.SubmissionGroup,
			status: CopyApiResponseStatusEnum.NotDoing,
		},
		{
			type: CopyApiResponseTypeEnum.File,
			status: CopyApiResponseStatusEnum.NotImplemented,
		},
		{
			type: CopyApiResponseTypeEnum.LessonContentEtherpad,
			status: CopyApiResponseStatusEnum.Success,
		},
	],
};

describe("copy module", () => {
	describe("actions", () => {
		afterEach(() => {
			jest.clearAllMocks();
		});
		const mockApi = {
			roomsControllerGetRoomBoard: jest.fn(),
			roomsControllerPatchElementVisibility: jest.fn(),
			roomsControllerPatchOrderingOfElements: jest.fn(),
		};

		describe("copy a task", () => {
			describe("should make a 'POST' request to the backend", () => {
				const taskMockApi = {
					taskControllerCopyTask: jest.fn(async () => ({ data: {} })),
				};
				jest
					.spyOn(serverApi, "TaskApiFactory")
					.mockReturnValue(
						taskMockApi as unknown as serverApi.TaskApiInterface
					);
				const copyModule = new CopyModule({});
				it("should send with courseId", async () => {
					const payload: CopyParams = {
						id: "taskId",
						type: CopyParamsTypeEnum.Task,
						courseId: "testCourseId",
					};
					await copyModule.copy(payload);

					expect(taskMockApi.taskControllerCopyTask).toHaveBeenCalledWith(
						"taskId",
						{ courseId: "testCourseId" }
					);
				});

				it("should send with NO courseId", async () => {
					const payload: CopyParams = {
						id: "taskId",
						type: CopyParamsTypeEnum.Task,
					};

					await copyModule.copy(payload);

					expect(taskMockApi.taskControllerCopyTask).toHaveBeenCalledWith(
						"taskId",
						{ courseId: undefined }
					);
				});
			});
		});

		describe("copy a course", () => {
			it("should make a 'POST' request to the backend", async () => {
				const roomCopyMockApi = {
					roomsControllerCopyCourse: jest.fn(async () => ({ data: {} })),
				};
				jest
					.spyOn(serverApi, "RoomsApiFactory")
					.mockReturnValue(
						roomCopyMockApi as unknown as serverApi.RoomsApiInterface
					);

				const copyModule = new CopyModule({});
				const payload: CopyParams = {
					id: "courseId-value",
					type: CopyParamsTypeEnum.Course,
					courseId: "courseId-value",
				};

				await copyModule.copy(payload);

				expect(roomCopyMockApi.roomsControllerCopyCourse).toHaveBeenCalledWith(
					"courseId-value"
				);
			});
		});

		describe("copy a lesson", () => {
			it("should make a 'POST' request to the backend", async () => {
				const roomCopyMockApi = {
					roomsControllerCopyLesson: jest.fn(async () => ({ data: {} })),
				};
				jest
					.spyOn(serverApi, "RoomsApiFactory")
					.mockReturnValue(
						roomCopyMockApi as unknown as serverApi.RoomsApiInterface
					);
				const copyModule = new CopyModule({});
				await copyModule.copy({
					id: "testLessonId",
					type: CopyParamsTypeEnum.Lesson,
					courseId: "testCourseId",
				});
				expect(roomCopyMockApi.roomsControllerCopyLesson).toHaveBeenCalledWith(
					"testLessonId",
					{ courseId: "testCourseId" }
				);
			});
		});

		describe("validate share token", () => {
			it("should validate share token by using the api", async () => {
				const shareApiMock = {
					shareTokenControllerLookupShareToken: jest.fn(async () => ({
						data: {},
					})),
				};
				jest
					.spyOn(serverApi, "ShareTokenApiFactory")
					.mockReturnValue(
						shareApiMock as unknown as serverApi.ShareTokenApiInterface
					);

				const copyModule = new CopyModule({});
				const token = "abc123a";

				await copyModule.validateShareToken(token);

				expect(
					shareApiMock.shareTokenControllerLookupShareToken
				).toHaveBeenCalledWith(token);
			});
		});

		describe("import a course", () => {
			it("should import a course by using the shareApi", async () => {
				const shareApiMock = {
					shareTokenControllerImportShareToken: jest.fn(async () => ({
						data: {},
					})),
				};
				jest
					.spyOn(serverApi, "ShareTokenApiFactory")
					.mockReturnValue(
						shareApiMock as unknown as serverApi.ShareTokenApiInterface
					);

				const copyModule = new CopyModule({});
				const token = "abc123a";
				const newName = "My Course";
				const payload = {
					token,
					type: "course",
					newName,
				};

				await copyModule.copyByShareToken(payload);

				expect(
					shareApiMock.shareTokenControllerImportShareToken
				).toHaveBeenCalledWith(token, { newName });
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
					type: CopyApiResponseTypeEnum.Task,
					destinationCourseId: "testCourseId",
					status: CopyApiResponseStatusEnum.Failure,
					id: "123",
					elements: [
						{
							type: CopyApiResponseTypeEnum.File,
							status: CopyApiResponseStatusEnum.Failure,
						},
					],
				};
				const expectedData = [
					{
						title: "Aufgabe",
						type: CopyApiResponseTypeEnum.Task,
						elementId: "123",
						url: "/homework/123/edit?returnUrl=rooms/testCourseId",
						elements: [
							{
								type: CopyApiResponseTypeEnum.File,
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

			it("should set filteredResult for failed lesson copy", () => {
				const serverData = {
					title: "Thema",
					type: CopyApiResponseTypeEnum.Lesson,
					destinationCourseId: "testCourseIdX",
					status: CopyApiResponseStatusEnum.Failure,
					id: "456",
					elements: [
						{
							type: CopyApiResponseTypeEnum.LessonContentText,
							status: CopyApiResponseStatusEnum.Failure,
						},
					],
				};
				const expectedData = [
					{
						title: "Thema",
						type: CopyApiResponseTypeEnum.Lesson,
						elementId: "456",
						url: "/courses/testCourseIdX/topics/456/edit?returnUrl=rooms/testCourseIdX",
						elements: [
							{
								title: "",
								type: CopyApiResponseTypeEnum.LessonContentText,
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
						type: CopyApiResponseTypeEnum.Course,
						status: CopyApiResponseStatusEnum.Partial,
						id: "12345",
						elements: [
							{
								type: CopyApiResponseTypeEnum.Metadata,
								status: CopyApiResponseStatusEnum.Success,
							},
							{
								type: CopyApiResponseTypeEnum.UserGroup,
								status: CopyApiResponseStatusEnum.NotDoing,
							},
							{
								type: CopyApiResponseTypeEnum.LessonContentGeogebra,
								status: CopyApiResponseStatusEnum.Partial,
							},
							{
								type: CopyApiResponseTypeEnum.FileGroup,
								status: CopyApiResponseStatusEnum.NotImplemented,
							},
						],
					},
				};
				const expectedData = [
					{
						title: "test course",
						type: CopyApiResponseTypeEnum.Course,
						elementId: "12345",
						elements: [
							{
								title: "",
								type: CopyApiResponseTypeEnum.LessonContentGeogebra,
							},
						],
						url: "/courses/12345/edit",
					},
				];
				const copyModule = new CopyModule({});
				copyModule.setCopyResultFailedItems(payload);
				expect(copyModule.getCopyResultFailedItems).toStrictEqual(expectedData);
			});

			it.skip("should set the state and change the statusses 'success'", () => {
				const payload = {
					payload: {
						title: "test course",
						type: CopyApiResponseTypeEnum.Course,
						status: CopyApiResponseStatusEnum.Partial,
						id: "12345",
						elements: [
							{
								type: CopyApiResponseTypeEnum.Metadata,
								status: CopyApiResponseStatusEnum.Success,
							},
							{
								type: CopyApiResponseTypeEnum.Board,
								status: CopyApiResponseStatusEnum.Partial,
								id: "345",
								elements: [
									{
										title: "Task 1",
										type: CopyApiResponseTypeEnum.Task,
										destinationCourseId: "aCourseId",
										status: CopyApiResponseStatusEnum.Partial,
										id: "567",
										elements: [
											{
												type: CopyApiResponseTypeEnum.Metadata,
												status: CopyApiResponseStatusEnum.Success,
											},
											{
												type: CopyApiResponseTypeEnum.SubmissionGroup,
												status: CopyApiResponseStatusEnum.NotDoing,
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
						type: CopyApiResponseTypeEnum.Course,
						elementId: "12345",
						elements: [],
						url: "/courses/12345/edit",
					},
					{
						elementId: "567",
						elements: [],
						title: "Task 1",
						type: CopyApiResponseTypeEnum.Task,
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
			expect(copyModule.getId).toBe("123");
			expect(copyModule.getTitle).toBe("Aufgabe");
		});
	});
});
