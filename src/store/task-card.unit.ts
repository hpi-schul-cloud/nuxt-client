import TaskCardModule from "@/store/task-card";
import * as serverApi from "../serverApi/v3/api";
import {
	CardElementResponseCardElementTypeEnum,
	CardRichTextElementResponseInputFormatEnum,
} from "../serverApi/v3";
import {
	RichTextCardElementParamInputFormatEnum,
	TaskCardResponse,
} from "../serverApi/v3/api";
import { AxiosError, InternalAxiosRequestConfig } from "axios";

const mockTaskCardData: TaskCardResponse = {
	id: "123",
	title: "the title",
	cardElements: [
		{
			id: "789",
			cardElementType: CardElementResponseCardElementTypeEnum.RichText,
			content: {
				value: "<p>some editor content</p>",
				inputFormat: CardRichTextElementResponseInputFormatEnum.RichtextCk5,
			},
		},
	],
	draggable: true,
	task: {
		id: "456",
		users: [
			{
				id: "user1",
				firstName: "firstname1",
				lastName: "lastname1",
			},
			{
				id: "user2",
				firstName: "firstname2",
				lastName: "lastname3",
			},
		],
		name: "task",
		courseName: "course",
		courseId: "789",
		createdAt: "",
		updatedAt: "",
		lessonHidden: false,
		status: {
			submitted: 0,
			maxSubmissions: 0,
			graded: 0,
			isDraft: true,
			isSubstitutionTeacher: true,
			isFinished: false,
		},
	},
	visibleAtDate: "2023-01-24T11:53:55.003Z",
	dueDate: "2023-07-31T00:00:00.000Z",
	courseName: "course",
	courseId: "789",
};

const APIError = new AxiosError(
	"I'm a teapot",
	"418",
	undefined,
	{},
	{
		data: { code: 418, title: "I'm a teapot" },
		status: 418,
		statusText: "I'm a teapot",
		headers: {},
		config: {} as InternalAxiosRequestConfig,
	}
);

describe("task-card store", () => {
	describe("actions", () => {
		describe("findTaskCard", () => {
			afterEach(() => {
				jest.clearAllMocks();
			});

			it("should call backend with correct payload", async () => {
				const taskCardModule = new TaskCardModule({});
				const setTaskCardDataMock = jest.spyOn(
					taskCardModule,
					"setTaskCardData"
				);

				const taskCardApiMock = {
					taskCardControllerFindOne: jest.fn(async () => ({
						data: mockTaskCardData,
					})),
				};
				jest
					.spyOn(serverApi, "CardsApiFactory")
					.mockReturnValue(
						taskCardApiMock as unknown as serverApi.CardsApiInterface
					);

				await taskCardModule.findTaskCard(mockTaskCardData.id);

				expect(taskCardApiMock.taskCardControllerFindOne).toHaveBeenCalledTimes(
					1
				);
				expect(taskCardApiMock.taskCardControllerFindOne).toHaveBeenCalledWith(
					mockTaskCardData.id
				);
				expect(setTaskCardDataMock).toHaveBeenCalledWith(mockTaskCardData);
			});

			it("should handle an error", async () => {
				const taskCardModule = new TaskCardModule({});
				const error = {
					statusCode: 418,
					message: "I'm a teapot",
					error: { code: 418, title: "I'm a teapot" },
				};

				const taskCardApiMock = {
					taskCardControllerFindOne: jest.fn(() => Promise.reject(APIError)),
				};
				jest
					.spyOn(serverApi, "CardsApiFactory")
					.mockReturnValue(
						taskCardApiMock as unknown as serverApi.CardsApiInterface
					);

				await taskCardModule.findTaskCard("123");

				expect(taskCardApiMock.taskCardControllerFindOne).toHaveBeenCalledTimes(
					1
				);
				expect(taskCardModule.businessError).toStrictEqual(error);
			});
		});

		describe("createTaskCard", () => {
			afterEach(() => {
				jest.clearAllMocks();
			});

			it("should call backend", async () => {
				const taskCardModule = new TaskCardModule({});
				const setTaskCardDataMock = jest.spyOn(
					taskCardModule,
					"setTaskCardData"
				);

				const taskCardApiMock = {
					taskCardControllerCreate: jest.fn(async () => ({
						data: mockTaskCardData,
					})),
				};
				jest
					.spyOn(serverApi, "CardsApiFactory")
					.mockReturnValue(
						taskCardApiMock as unknown as serverApi.CardsApiInterface
					);

				await taskCardModule.createTaskCard({
					title: "some title",
					cardElements: [
						{
							content: {
								type: "richtext",
								inputFormat:
									RichTextCardElementParamInputFormatEnum.RichtextCk5,
								value: "Lorem ipsum",
							},
						},
					],
					dueDate: "2023-07-31T00:00:00.000Z",
					courseId: "789",
				});

				expect(taskCardApiMock.taskCardControllerCreate).toHaveBeenCalledTimes(
					1
				);
				expect(setTaskCardDataMock).toHaveBeenCalledWith(mockTaskCardData);
			});

			it("should handle an error", async () => {
				const taskCardModule = new TaskCardModule({});
				const error = {
					statusCode: 418,
					message: "I'm a teapot",
					error: { code: 418, title: "I'm a teapot" },
				};

				const taskCardApiMock = {
					taskCardControllerCreate: jest.fn(() => Promise.reject(APIError)),
				};
				jest
					.spyOn(serverApi, "CardsApiFactory")
					.mockReturnValue(
						taskCardApiMock as unknown as serverApi.CardsApiInterface
					);

				await taskCardModule.createTaskCard({
					title: "some title",
					cardElements: [],
					dueDate: "2023-07-31T00:00:00.000Z",
					courseId: "789",
				});

				expect(taskCardApiMock.taskCardControllerCreate).toHaveBeenCalledTimes(
					1
				);
				expect(taskCardModule.businessError).toStrictEqual(error);
			});
		});

		describe("updateTaskCard", () => {
			it("should call backend with correct payload", async () => {
				const taskCardModule = new TaskCardModule({});
				const setTaskCardDataMock = jest.spyOn(
					taskCardModule,
					"setTaskCardData"
				);

				const taskCardApiMock = {
					taskCardControllerUpdate: jest.fn(async () => ({
						data: mockTaskCardData,
					})),
				};
				jest
					.spyOn(serverApi, "CardsApiFactory")
					.mockReturnValue(
						taskCardApiMock as unknown as serverApi.CardsApiInterface
					);

				taskCardModule.setTaskCardData(mockTaskCardData);
				await taskCardModule.updateTaskCard({
					title: mockTaskCardData.title,
					cardElements: [],
					dueDate: "2023-07-31T00:00:00.000Z",
					courseId: "789",
				});

				expect(taskCardApiMock.taskCardControllerUpdate).toHaveBeenCalledTimes(
					1
				);
				expect(taskCardApiMock.taskCardControllerUpdate).toHaveBeenCalledWith(
					mockTaskCardData.id,
					{
						title: mockTaskCardData.title,
						cardElements: [],
						dueDate: "2023-07-31T00:00:00.000Z",
						courseId: "789",
					}
				);
				expect(setTaskCardDataMock).toHaveBeenCalledWith(mockTaskCardData);
			});

			it("should handle an error", async () => {
				const taskCardModule = new TaskCardModule({});
				const error = {
					statusCode: 418,
					message: "I'm a teapot",
					error: { code: 418, title: "I'm a teapot" },
				};

				const taskCardApiMock = {
					taskCardControllerUpdate: jest.fn(() => Promise.reject(APIError)),
				};
				jest
					.spyOn(serverApi, "CardsApiFactory")
					.mockReturnValue(
						taskCardApiMock as unknown as serverApi.CardsApiInterface
					);

				taskCardModule.setTaskCardData(mockTaskCardData);
				await taskCardModule.updateTaskCard({
					title: "",
					cardElements: [],
					dueDate: "2023-07-31T00:00:00.000Z",
					courseId: "789",
				});

				expect(taskCardApiMock.taskCardControllerUpdate).toHaveBeenCalledTimes(
					1
				);
				expect(taskCardModule.businessError).toStrictEqual(error);
			});
		});

		describe("deleteTaskCard", () => {
			it("should call backend with correct payload", async () => {
				const taskCardModule = new TaskCardModule({});
				const setTaskCardDataMock = jest.spyOn(
					taskCardModule,
					"setTaskCardData"
				);

				const taskCardApiMock = {
					taskCardControllerDelete: jest.fn(async () => ({
						data: mockTaskCardData,
					})),
				};
				jest
					.spyOn(serverApi, "CardsApiFactory")
					.mockReturnValue(
						taskCardApiMock as unknown as serverApi.CardsApiInterface
					);

				taskCardModule.setTaskCardData(mockTaskCardData);
				await taskCardModule.deleteTaskCard(mockTaskCardData.id);

				expect(taskCardApiMock.taskCardControllerDelete).toHaveBeenCalledTimes(
					1
				);
				expect(taskCardApiMock.taskCardControllerDelete).toHaveBeenCalledWith(
					mockTaskCardData.id
				);
				expect(setTaskCardDataMock).toHaveBeenCalledWith(mockTaskCardData);
			});

			it("should handle an error", async () => {
				const taskCardModule = new TaskCardModule({});
				const error = {
					statusCode: 418,
					message: "I'm a teapot",
					error: { code: 418, title: "I'm a teapot" },
				};

				const taskCardApiMock = {
					taskCardControllerDelete: jest.fn(() => Promise.reject(APIError)),
				};
				jest
					.spyOn(serverApi, "CardsApiFactory")
					.mockReturnValue(
						taskCardApiMock as unknown as serverApi.CardsApiInterface
					);

				taskCardModule.setTaskCardData(mockTaskCardData);
				await taskCardModule.deleteTaskCard(mockTaskCardData.id);

				expect(taskCardApiMock.taskCardControllerDelete).toHaveBeenCalledTimes(
					1
				);
				expect(taskCardModule.businessError).toStrictEqual(error);
			});
		});
	});

	describe("getters", () => {
		describe("getStatus", () => {
			it("should return status", () => {
				const taskCardModule = new TaskCardModule({});

				expect(taskCardModule.getStatus).toStrictEqual("");
				taskCardModule.setStatus("pending");
				expect(taskCardModule.getStatus).toStrictEqual("pending");
			});
		});

		describe("getBusinessError", () => {
			it("should return business error", () => {
				const taskCardModule = new TaskCardModule({});
				taskCardModule.businessError = {
					statusCode: "404",
					message: "not found",
				};

				expect(taskCardModule.getBusinessError).toBe(
					taskCardModule.businessError
				);
			});

			describe("getTaskData", () => {
				it("should return task data", () => {
					const taskCardModule = new TaskCardModule({});
					taskCardModule.taskCardData = mockTaskCardData;

					expect(taskCardModule.getTaskCardData).toStrictEqual(
						mockTaskCardData
					);
				});
			});
		});
	});

	describe("mutations", () => {
		it("should set setCourseId", () => {
			const taskCardModule = new TaskCardModule({});
			const courseId = "courseId_test";
			taskCardModule.setCourseId(courseId);

			expect(taskCardModule.taskCardData.courseId).toStrictEqual(courseId);
		});
	});
});
