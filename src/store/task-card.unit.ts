import TaskCardModule from "@store/task-card";
import * as serverApi from "../serverApi/v3/api";
import {
	CardElementResponseCardElementTypeEnum,
	CardRichTextElementResponseInputFormatEnum,
} from "../serverApi/v3";

const mockTaskCardData = {
	id: "123",
	cardElements: [
		{
			id: "456",
			cardElementType: CardElementResponseCardElementTypeEnum.Title,
			content: {
				value: "The Title",
			},
		},
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
	visibleAtDate: "",
	dueDate: "",
};

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
				const error = { statusCode: 418, message: "I'm a teapot", error: {} };

				const taskCardApiMock = {
					taskCardControllerFindOne: jest.fn(() =>
						Promise.reject({ ...error })
					),
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
					title: "abc",
					text: ["Lorem ipsum"],
				});

				expect(taskCardApiMock.taskCardControllerCreate).toHaveBeenCalledTimes(
					1
				);
				expect(setTaskCardDataMock).toHaveBeenCalledWith(mockTaskCardData);
			});

			it("should handle an error", async () => {
				const taskCardModule = new TaskCardModule({});
				const error = { statusCode: 418, message: "I'm a teapot", error: {} };

				const taskCardApiMock = {
					taskCardControllerCreate: jest.fn(() => Promise.reject({ ...error })),
				};
				jest
					.spyOn(serverApi, "CardsApiFactory")
					.mockReturnValue(
						taskCardApiMock as unknown as serverApi.CardsApiInterface
					);

				await taskCardModule.createTaskCard({
					title: "abc",
					text: ["Lorem ipsum"],
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
				await taskCardModule.updateTaskCard({ cardElements: [] });

				expect(taskCardApiMock.taskCardControllerUpdate).toHaveBeenCalledTimes(
					1
				);
				expect(taskCardApiMock.taskCardControllerUpdate).toHaveBeenCalledWith(
					mockTaskCardData.id,
					{
						cardElements: [],
					}
				);
				expect(setTaskCardDataMock).toHaveBeenCalledWith(mockTaskCardData);
			});

			it("should handle an error", async () => {
				const taskCardModule = new TaskCardModule({});
				const error = { statusCode: 418, message: "I'm a teapot", error: {} };

				const taskCardApiMock = {
					taskCardControllerUpdate: jest.fn(() => Promise.reject({ ...error })),
				};
				jest
					.spyOn(serverApi, "CardsApiFactory")
					.mockReturnValue(
						taskCardApiMock as unknown as serverApi.CardsApiInterface
					);

				taskCardModule.setTaskCardData(mockTaskCardData);
				await taskCardModule.updateTaskCard({ cardElements: [] });

				expect(taskCardApiMock.taskCardControllerUpdate).toHaveBeenCalledTimes(
					1
				);
				expect(taskCardModule.businessError).toStrictEqual(error);
			});
		});
	});

	describe("getters", () => {
		describe("getLoading", () => {
			it("should return loading state", () => {
				const taskCardModule = new TaskCardModule({});

				expect(taskCardModule.getLoading).toStrictEqual(false);
				taskCardModule.setLoading(true);
				expect(taskCardModule.getLoading).toStrictEqual(true);
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
});
