import * as serverApi from "@/serverApi/v3/api";
import * as commonCartridgeApi from "@/commonCartridgeApi/v3/api/common-cartridge-api";
import { CommonCartridgeApiInterface } from "@/commonCartridgeApi/v3/api";
import { BoardParentType } from "@/serverApi/v3/api";
import { applicationErrorModule, authModule } from "@/store";
import ApplicationErrorModule from "@/store/application-error";
import AuthModule from "@/store/auth";
import { initializeAxios } from "@/utils/api";
import { meResponseFactory } from "@@/tests/test-utils";
import { courseFactory } from "@@/tests/test-utils/factory";
import setupStores from "@@/tests/test-utils/setupStores";
import { AxiosError, AxiosHeaders, AxiosInstance, AxiosPromise } from "axios";
import CourseRoomDetailsModule from "./course-room-details";
import { HttpStatusCode } from "./types/http-status-code.enum";
import { Course } from "./types/room";
import { ApiResponseError, ApiValidationError } from "./types/commons";

type ReceivedRequests = [
	{
		path: string;
	},
	{
		params: object | undefined;
	},
];

let receivedRequests: ReceivedRequests;
let getRequestReturn: Promise<{ data: Course } | AxiosError> | undefined;

const axiosInitializer = () => {
	initializeAxios({
		get: async (path: string, params: object) => {
			receivedRequests = [{ path }, { params }];
			return getRequestReturn;
		},
		post: async (path: string) => {
			receivedRequests = [{ path }, { params: undefined }];
			return getRequestReturn;
		},
		patch: async (path: string, params: object) => {
			receivedRequests = [{ path }, { params }];
			return getRequestReturn;
		},
		delete: async (path: string) => {
			receivedRequests = [{ path }, { params: undefined }];
			return getRequestReturn;
		},
	} as AxiosInstance);
};

axiosInitializer();

const badRequestError = new AxiosError<ApiResponseError | ApiValidationError>(
	"Bad Request",
	"ERR_BAD_REQUEST",
	undefined,
	null,
	{
		status: 400,
		statusText: "Bad Request",
		headers: {},
		config: {
			headers: new AxiosHeaders(),
		},
		data: {
			code: 400,
			type: "BAD_REQUEST",
			title: "Bad Request",
			message: "Bad Request",
		},
	}
);

const businessError = {
	statusCode: 400,
	message: "Bad Request",
	error: {
		code: 400,
		type: "BAD_REQUEST",
		title: "Bad Request",
		message: "Bad Request",
	},
};

describe("course-room module", () => {
	beforeEach(() => {
		setupStores({
			authModule: AuthModule,
			applicationErrorModule: ApplicationErrorModule,
		});
		receivedRequests = [{ path: "" }, { params: {} }];
		getRequestReturn = undefined;
	});

	describe("actions", () => {
		afterEach(() => {
			jest.clearAllMocks();
		});
		const mockApi = {
			courseRoomsControllerGetRoomBoard: jest.fn(),
			courseRoomsControllerPatchElementVisibility: jest.fn(),
			courseRoomsControllerPatchOrderingOfElements: jest.fn(),
		};

		describe("fetchCourse", () => {
			describe("when the api returns a response", () => {
				const setup = () => {
					const courseRoomDetailsModule = new CourseRoomDetailsModule({});

					const course: Course = courseFactory.build();

					getRequestReturn = Promise.resolve({
						data: course,
					});

					return {
						courseRoomDetailsModule,
						course,
					};
				};

				it("should call backend", async () => {
					const { courseRoomDetailsModule } = setup();

					await courseRoomDetailsModule.fetchCourse("courseId");

					expect(receivedRequests[0].path).toEqual("/v1/courses/courseId");
				});

				it("should return a course", async () => {
					const { courseRoomDetailsModule, course } = setup();

					const result: Course | null =
						await courseRoomDetailsModule.fetchCourse("courseId");

					expect(result).toEqual(course);
				});
			});

			describe("when the api returns an error", () => {
				const setup = () => {
					const courseRoomDetailsModule = new CourseRoomDetailsModule({});

					const error: AxiosError = new AxiosError();

					getRequestReturn = Promise.reject(error);

					return {
						courseRoomDetailsModule,
						error,
					};
				};

				it("should set an error", async () => {
					const { courseRoomDetailsModule, error } = setup();

					await courseRoomDetailsModule.fetchCourse("courseId");

					expect(courseRoomDetailsModule.getError).toEqual(error);
				});

				it("should return null", async () => {
					const { courseRoomDetailsModule } = setup();

					const result: Course | null =
						await courseRoomDetailsModule.fetchCourse("courseId");

					expect(result).toBeNull();
				});
			});
		});

		describe("fetch", () => {
			it("should call backend and sets state correctly", async () => {
				jest
					.spyOn(serverApi, "CourseRoomsApiFactory")
					.mockReturnValue(
						mockApi as unknown as serverApi.CourseRoomsApiInterface
					);

				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				await courseRoomDetailsModule.fetchContent("123");

				expect(courseRoomDetailsModule.getLoading).toBe(false);
				expect(mockApi.courseRoomsControllerGetRoomBoard).toHaveBeenCalled();
				expect(
					mockApi.courseRoomsControllerGetRoomBoard.mock.calls[0][0]
				).toStrictEqual("123");
			});
		});

		describe("publishCard", () => {
			it("'publishCard' action should call backend and 'fetchContent' method", async () => {
				jest
					.spyOn(serverApi, "CourseRoomsApiFactory")
					.mockReturnValue(
						mockApi as unknown as serverApi.CourseRoomsApiInterface
					);

				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				await courseRoomDetailsModule.publishCard({
					elementId: "54321",
					visibility: true,
				});

				expect(courseRoomDetailsModule.getLoading).toBe(false);
				expect(
					mockApi.courseRoomsControllerPatchElementVisibility
				).toHaveBeenCalled();
				expect(
					mockApi.courseRoomsControllerPatchElementVisibility.mock.calls[0]
				).toContain("54321");
				expect(mockApi.courseRoomsControllerGetRoomBoard).toHaveBeenCalled();
			});
		});

		describe("sortElements", () => {
			it("'sortElements' action should call backend and 'fetchContent' method", async () => {
				jest
					.spyOn(serverApi, "CourseRoomsApiFactory")
					.mockReturnValue(
						mockApi as unknown as serverApi.CourseRoomsApiInterface
					);

				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				const payload = {
					elements: ["1234", "2345", "3456", "4567"],
				};
				await courseRoomDetailsModule.sortElements(payload);

				expect(courseRoomDetailsModule.getLoading).toBe(false);
				expect(
					mockApi.courseRoomsControllerPatchOrderingOfElements
				).toHaveBeenCalled();
				expect(
					mockApi.courseRoomsControllerPatchOrderingOfElements.mock.calls[0][1]
				).toStrictEqual(payload);
				expect(mockApi.courseRoomsControllerGetRoomBoard).toHaveBeenCalled();
			});
		});

		describe("deleteLesson", () => {
			it("should call api to delete a lesson", async () => {
				const mockApi = {
					lessonControllerDelete: jest.fn(),
				};
				const spy = jest
					.spyOn(serverApi, "LessonApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.LessonApiInterface);

				const courseRoomDetailsModule = new CourseRoomDetailsModule({});

				await courseRoomDetailsModule.deleteLesson("id");

				expect(mockApi.lessonControllerDelete).toHaveBeenCalledTimes(1);
				expect(mockApi.lessonControllerDelete).toHaveBeenCalledWith("id");

				spy.mockRestore();
			});

			it("should catch error in catch block", async () => {
				const mockApi = {
					lessonControllerDelete: jest.fn(() =>
						Promise.reject(badRequestError)
					),
				};
				const spy = jest
					.spyOn(serverApi, "LessonApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.LessonApiInterface);

				const courseRoomDetailsModule = new CourseRoomDetailsModule({});

				await courseRoomDetailsModule.deleteLesson("id");

				expect(courseRoomDetailsModule.businessError).toStrictEqual(
					businessError
				);

				spy.mockRestore();
			});
		});

		describe("deleteTask", () => {
			it("should call api to delete a lesson", async () => {
				const mockApi = {
					taskControllerDelete: jest.fn(),
				};
				const spy = jest
					.spyOn(serverApi, "TaskApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);

				const courseRoomDetailsModule = new CourseRoomDetailsModule({});

				await courseRoomDetailsModule.deleteTask("id");

				expect(mockApi.taskControllerDelete).toHaveBeenCalledTimes(1);
				expect(mockApi.taskControllerDelete).toHaveBeenCalledWith("id");

				spy.mockRestore();
			});

			it("should catch error in catch block", async () => {
				const mockApi = {
					taskControllerDelete: jest.fn(() => Promise.reject(badRequestError)),
				};
				const spy = jest
					.spyOn(serverApi, "TaskApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);

				const courseRoomDetailsModule = new CourseRoomDetailsModule({});

				await courseRoomDetailsModule.deleteTask("id");

				expect(courseRoomDetailsModule.businessError).toStrictEqual(
					businessError
				);

				spy.mockRestore();
			});
		});

		describe("createBoard", () => {
			it("should call api to create a column board", async () => {
				const mockApi = {
					boardControllerCreateBoard: jest.fn(),
				};
				const spy = jest
					.spyOn(serverApi, "BoardApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.BoardApiInterface);

				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				const params = {
					title: "title",
					parentId: "parentId",
					parentType: BoardParentType.Course,
					layout: serverApi.BoardLayout.Columns,
				};
				await courseRoomDetailsModule.createBoard(params);

				expect(mockApi.boardControllerCreateBoard).toHaveBeenCalledTimes(1);
				expect(mockApi.boardControllerCreateBoard).toHaveBeenCalledWith(params);

				spy.mockRestore();
			});

			it("should call api to create a list board", async () => {
				const mockApi = {
					boardControllerCreateBoard: jest.fn(),
				};
				const spy = jest
					.spyOn(serverApi, "BoardApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.BoardApiInterface);

				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				const params = {
					title: "title",
					parentId: "parentId",
					parentType: BoardParentType.Course,
					layout: serverApi.BoardLayout.List,
				};
				await courseRoomDetailsModule.createBoard(params);

				expect(mockApi.boardControllerCreateBoard).toHaveBeenCalledTimes(1);
				expect(mockApi.boardControllerCreateBoard).toHaveBeenCalledWith(params);

				spy.mockRestore();
			});

			it("should catch error in catch block", async () => {
				const mockApi = {
					boardControllerCreateBoard: jest
						.fn()
						.mockRejectedValue(badRequestError),
				};
				const spy = jest
					.spyOn(serverApi, "BoardApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.BoardApiInterface);

				const courseRoomDetailsModule = new CourseRoomDetailsModule({});

				const params = {
					title: "title",
					parentId: "parentId",
					parentType: BoardParentType.Course,
					layout: serverApi.BoardLayout.Columns,
				};
				await courseRoomDetailsModule.createBoard(params);

				expect(courseRoomDetailsModule.businessError).toStrictEqual(
					businessError
				);

				spy.mockRestore();
			});
		});

		describe("deleteBoard", () => {
			it("should call api to delete a board", async () => {
				const mockApi = {
					boardControllerDeleteBoard: jest.fn(),
				};
				const spy = jest
					.spyOn(serverApi, "BoardApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.BoardApiInterface);

				const courseRoomDetailsModule = new CourseRoomDetailsModule({});

				await courseRoomDetailsModule.deleteBoard("id");

				expect(mockApi.boardControllerDeleteBoard).toHaveBeenCalledTimes(1);
				expect(mockApi.boardControllerDeleteBoard).toHaveBeenCalledWith("id");

				spy.mockRestore();
			});

			it("should catch error in catch block", async () => {
				const mockApi = {
					boardControllerDeleteBoard: jest
						.fn()
						.mockRejectedValue(badRequestError),
				};
				const spy = jest
					.spyOn(serverApi, "BoardApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.BoardApiInterface);

				const courseRoomDetailsModule = new CourseRoomDetailsModule({});

				await courseRoomDetailsModule.deleteBoard("id");

				expect(courseRoomDetailsModule.businessError).toStrictEqual(
					businessError
				);

				spy.mockRestore();
			});
		});

		describe("downloadCommonCartridgeCourse", () => {
			it("should call backend api", async () => {
				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				const mockApi: CommonCartridgeApiInterface = {
					commonCartridgeControllerExportCourse: jest.fn(
						() => Promise.resolve() as unknown as AxiosPromise<void>
					),
				};
				const spy = jest
					.spyOn(commonCartridgeApi, "CommonCartridgeApiFactory")
					.mockReturnValue(mockApi);

				await expect(
					courseRoomDetailsModule.downloadCommonCartridgeCourse({
						version: "1.1.0",
						topics: [],
						tasks: [],
						columnBoards: [],
					})
				).resolves.not.toBeDefined();

				expect(
					mockApi.commonCartridgeControllerExportCourse
				).toHaveBeenCalled();

				spy.mockRestore();
			});

			it("should catch error in catch block", async () => {
				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				const mockApi: CommonCartridgeApiInterface = {
					commonCartridgeControllerExportCourse: jest.fn(() =>
						Promise.reject(badRequestError)
					),
				};
				const spy = jest
					.spyOn(commonCartridgeApi, "CommonCartridgeApiFactory")
					.mockReturnValue(mockApi);

				await courseRoomDetailsModule.downloadCommonCartridgeCourse({
					version: "1.1.0",
					topics: [],
					tasks: [],
					columnBoards: [],
				});

				expect(courseRoomDetailsModule.businessError).toStrictEqual(
					businessError
				);

				spy.mockRestore();
			});
		});

		describe("finishTask", () => {
			beforeEach(() => {
				const mockMe = meResponseFactory.build();
				authModule.setMe(mockMe);
			});

			it("should make a 'PATCH' call to the backend", async () => {
				(() => {
					initializeAxios({
						get: async (path: string, params: object) => {
							receivedRequests = [{ path }, { params }];
							return {
								data: {
									archived: ["firstId"],
								},
							};
						},
					} as AxiosInstance);
				})();
				const mockApi = {
					taskControllerFinish: jest.fn(),
				};
				jest
					.spyOn(serverApi, "TaskApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);

				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				const setBusinessErrorSpy = jest.spyOn(
					courseRoomDetailsModule,
					"setBusinessError"
				);
				const resetBusinessErrorSpy = jest.spyOn(
					courseRoomDetailsModule,
					"resetBusinessError"
				);
				await courseRoomDetailsModule.finishTask({
					itemId: "finishId",
					action: "finish",
				});

				expect(resetBusinessErrorSpy).toHaveBeenCalled();
				expect(setBusinessErrorSpy).not.toHaveBeenCalled();
				expect(mockApi.taskControllerFinish).toBeCalledWith("finishId");
			});

			it("should catch error in catch block", async () => {
				(() => {
					initializeAxios({
						get: async (path: string, params: object) => {
							receivedRequests = [{ path }, { params }];
							return {
								data: {
									archived: ["firstId"],
								},
							};
						},
					} as AxiosInstance);
				})();
				const mockApi = {
					taskControllerFinish: () => {
						throw badRequestError;
					},
				};
				jest
					.spyOn(serverApi, "TaskApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);

				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				const finishTaskSpy = jest.spyOn(courseRoomDetailsModule, "finishTask");
				const setBusinessErrorSpy = jest.spyOn(
					courseRoomDetailsModule,
					"setBusinessError"
				);
				const resetBusinessErrorSpy = jest.spyOn(
					courseRoomDetailsModule,
					"resetBusinessError"
				);
				await courseRoomDetailsModule.finishTask({
					itemId: "finishId",
					action: "finish",
				});

				expect(resetBusinessErrorSpy).toHaveBeenCalled();
				expect(finishTaskSpy).toHaveBeenCalled();
				expect(setBusinessErrorSpy).toHaveBeenCalled();
				expect(courseRoomDetailsModule.businessError.statusCode).toStrictEqual(
					400
				);
				expect(courseRoomDetailsModule.businessError.message).toStrictEqual(
					"Bad Request"
				);
			});
		});

		describe("fetchScopePermission", () => {
			beforeEach(() => {
				const mockMe = meResponseFactory.build();
				authModule.setMe(mockMe);
			});

			it("should make a 'GET' call to the backend to fetch the scoped 'room' permissions", async () => {
				(() => {
					initializeAxios({
						get: async (path: string, params: object) => {
							receivedRequests = [{ path }, { params }];

							return {
								data: {
									userId: ["testScopedPermission"],
								},
							};
						},
					} as AxiosInstance);
				})();
				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				const fetchScopePermissionSpy = jest.spyOn(
					courseRoomDetailsModule,
					"fetchScopePermission"
				);
				await courseRoomDetailsModule.fetchScopePermission({
					courseId: "courseId",
					userId: "userId",
				});

				expect(receivedRequests[0].path).toStrictEqual(
					"/v3/courses/courseId/user-permissions"
				);
				expect(fetchScopePermissionSpy.mock.calls[0][0]).toStrictEqual({
					courseId: "courseId",
					userId: "userId",
				});
			});
		});
	});

	describe("mutations", () => {
		describe("setRoomData", () => {
			it("should set the room data", () => {
				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				const expectedData: serverApi.SingleColumnBoardResponse = {
					roomId: "123",
					title: "Sample Course",
					displayColor: "black",
					isArchived: false,
					isSynchronized: false,
					elements: [
						{
							type: serverApi.BoardElementResponseTypeEnum.Task,
							content: {
								courseName: "Mathe",
								id: "59cce1d381297026d02cdc4b",
								name: "Private Aufgabe von Marla - mit Kurs, offen",
								createdAt: "2017-09-28T11:49:39.924Z",
								updatedAt: "2017-09-28T11:49:39.924Z",
								status: {
									submitted: 0,
									maxSubmissions: 2,
									graded: 0,
									isDraft: false,
									isSubstitutionTeacher: false,
									isFinished: false,
								},
								availableDate: "2017-09-20T11:00:00.000Z",
								dueDate: "2300-09-28T13:00:00.000Z",
								displayColor: "#54616e",
								description: "",
							},
						},
					],
				};

				expect(courseRoomDetailsModule.getRoomData).not.toStrictEqual(
					expectedData
				);
				courseRoomDetailsModule.setRoomData(expectedData);
				expect(courseRoomDetailsModule.roomData).toStrictEqual(expectedData);
			});
		});

		describe("setLoading", () => {
			it("should set loading", () => {
				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				const loadingValue = true;
				expect(courseRoomDetailsModule.getLoading).not.toBe(loadingValue);
				courseRoomDetailsModule.setLoading(loadingValue);
				expect(courseRoomDetailsModule.loading).toBe(loadingValue);
			});
		});

		describe("setError", () => {
			it("should set error", () => {
				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				const errorData = { message: "some error" };
				expect(courseRoomDetailsModule.getError).not.toBe(errorData);
				courseRoomDetailsModule.setError(errorData);
				expect(courseRoomDetailsModule.error).toBe(errorData);
			});

			it.each([
				HttpStatusCode.BadRequest,
				HttpStatusCode.Unauthorized,
				HttpStatusCode.Forbidden,
				HttpStatusCode.NotFound,
				HttpStatusCode.RequestTimeout,
				HttpStatusCode.InternalServerError,
			])("should create an application-error for http-error(%p)", (code) => {
				const setErrorSpy = jest.spyOn(applicationErrorModule, "setError");
				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				const errorData = { response: { data: { code } } };
				courseRoomDetailsModule.setError(errorData);
				expect(setErrorSpy).toHaveBeenCalled();
			});
		});

		describe("setBusinessError", () => {
			it("should set businessError", () => {
				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				const businessErrorData = {
					statusCode: "400",
					message: "error",
					error: { type: "BadRequest" },
				};
				expect(courseRoomDetailsModule.getBusinessError).not.toBe(
					businessErrorData
				);
				courseRoomDetailsModule.setBusinessError(businessErrorData);
				expect(courseRoomDetailsModule.businessError).toBe(businessErrorData);
			});
			it("should reset businessError", () => {
				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				courseRoomDetailsModule.businessError = {
					statusCode: "400",
					message: "error",
					error: {},
				};

				courseRoomDetailsModule.resetBusinessError();
				expect(courseRoomDetailsModule.businessError.statusCode).toStrictEqual(
					""
				);
				expect(courseRoomDetailsModule.businessError.message).toStrictEqual("");
			});
		});

		describe("setCourseShareToken", () => {
			it("should set the state", () => {
				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				const payload = "token_test";

				courseRoomDetailsModule.setCourseShareToken(payload);
				expect(courseRoomDetailsModule.getCourseShareToken).toStrictEqual(
					payload
				);
			});
		});

		describe("setPermissionData", () => {
			it("should set the permission data", () => {
				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				const expectedPermissions = ["PERMISSION_ONE", "PERMISSION_TWO"];

				expect(courseRoomDetailsModule.getPermissionData).toStrictEqual([]);
				courseRoomDetailsModule.setPermissionData(expectedPermissions);
				expect(courseRoomDetailsModule.getPermissionData).toStrictEqual(
					expectedPermissions
				);
			});
		});
	});

	describe("getters", () => {
		describe("getRoomsData", () => {
			it("should return rooms state", () => {
				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				const expectedData: serverApi.SingleColumnBoardResponse = {
					roomId: "123",
					title: "Sample Course",
					displayColor: "black",
					elements: [
						{
							type: serverApi.BoardElementResponseTypeEnum.Task,
							content: {
								courseName: "Mathe",
								id: "59cce1d381297026d02cdc4b",
								name: "Private Aufgabe von Marla - mit Kurs, offen",
								createdAt: "2017-09-28T11:49:39.924Z",
								updatedAt: "2017-09-28T11:49:39.924Z",
								status: {
									submitted: 0,
									maxSubmissions: 2,
									graded: 0,
									isDraft: false,
									isSubstitutionTeacher: false,
									isFinished: false,
								},
								availableDate: "2017-09-20T11:00:00.000Z",
								dueDate: "2300-09-28T13:00:00.000Z",
								displayColor: "#54616e",
								description: "",
							},
						},
					],
					isArchived: false,
					isSynchronized: false,
				};

				courseRoomDetailsModule.setRoomData(expectedData);
				expect(courseRoomDetailsModule.getRoomData).toStrictEqual(expectedData);
			});
		});

		describe("getLoading", () => {
			it("should return loading state", () => {
				const courseRoomDetailsModule = new CourseRoomDetailsModule({});

				expect(courseRoomDetailsModule.getLoading).not.toStrictEqual(true);
				courseRoomDetailsModule.setLoading(true);
				expect(courseRoomDetailsModule.getLoading).toStrictEqual(true);
			});
		});

		describe("getError", () => {
			it("should return error state", () => {
				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				const errorData = { message: "some error" };
				expect(courseRoomDetailsModule.getError).toStrictEqual(null);
				courseRoomDetailsModule.setError(errorData);
				expect(courseRoomDetailsModule.getError).toStrictEqual(errorData);
			});
		});

		describe("roomIsEmpty", () => {
			it("should return false if there are any elements in the room", () => {
				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				const testData: serverApi.SingleColumnBoardResponse = {
					roomId: "123",
					title: "Sample Course",
					displayColor: "black",
					elements: [
						{
							type: serverApi.BoardElementResponseTypeEnum.Task,
							content: {
								courseName: "Mathe",
								id: "59cce1d381297026d02cdc4b",
								name: "Private Aufgabe von Marla - mit Kurs, offen",
								createdAt: "2017-09-28T11:49:39.924Z",
								updatedAt: "2017-09-28T11:49:39.924Z",
								status: {
									submitted: 0,
									maxSubmissions: 2,
									graded: 0,
									isDraft: false,
									isSubstitutionTeacher: false,
									isFinished: false,
								},
								availableDate: "2017-09-20T11:00:00.000Z",
								dueDate: "2300-09-28T13:00:00.000Z",
								displayColor: "#54616e",
								description: "",
							},
						},
					],
					isArchived: false,
					isSynchronized: false,
				};
				courseRoomDetailsModule.setRoomData(testData);
				const result = courseRoomDetailsModule.roomIsEmpty;
				expect(result).toStrictEqual(false);
			});
			it("should return true if there are no elements in the room", () => {
				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				const testData: serverApi.SingleColumnBoardResponse = {
					roomId: "123",
					title: "Sample Course",
					displayColor: "black",
					elements: [],
					isArchived: false,
					isSynchronized: false,
				};
				courseRoomDetailsModule.setRoomData(testData);
				const result = courseRoomDetailsModule.roomIsEmpty;
				expect(result).toStrictEqual(true);
			});
		});

		describe("getPermissionData", () => {
			it("should return the permission data", () => {
				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				const expectedPermissions = ["THREE", "FOUR"];

				courseRoomDetailsModule.setPermissionData(expectedPermissions);
				expect(courseRoomDetailsModule.getPermissionData).toStrictEqual(
					expectedPermissions
				);
			});
		});

		describe("getCommonCartridgeApi", () => {
			it("should return the CommonCartridgeApiInterface", () => {
				const courseRoomDetailsModule = new CourseRoomDetailsModule({});

				const result = courseRoomDetailsModule.commonCartridgeApi;

				expect(result).toBeInstanceOf(Object);
			});
		});
	});
});
