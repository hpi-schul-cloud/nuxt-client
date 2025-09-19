import * as serverApi from "@/serverApi/v3/api";
import * as commonCartridgeApi from "@/commonCartridgeApi/v3/api/common-cartridge-api";
import { CommonCartridgeApiInterface } from "@/commonCartridgeApi/v3/api";
import { BoardParentType } from "@/serverApi/v3/api";
import { applicationErrorModule } from "@/store";
import ApplicationErrorModule from "@/store/application-error";
import { initializeAxios } from "@/utils/api";
import {
	apiResponseErrorFactory,
	axiosErrorFactory,
	businessErrorFactory,
	courseFactory,
} from "@@/tests/test-utils/factory";
import setupStores from "@@/tests/test-utils/setupStores";
import { AxiosError, AxiosInstance, AxiosPromise } from "axios";
import CourseRoomDetailsModule from "./course-room-details";
import { HttpStatusCode } from "./types/http-status-code.enum";
import { Course } from "./types/room";

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
		get: (path: string, params: object) => {
			receivedRequests = [{ path }, { params }];
			return getRequestReturn;
		},
		post: (path: string) => {
			receivedRequests = [{ path }, { params: undefined }];
			return getRequestReturn;
		},
		patch: (path: string, params: object) => {
			receivedRequests = [{ path }, { params }];
			return getRequestReturn;
		},
		delete: (path: string) => {
			receivedRequests = [{ path }, { params: undefined }];
			return getRequestReturn;
		},
	} as AxiosInstance);
};

axiosInitializer();

const badRequestError = axiosErrorFactory.build({
	response: {
		data: apiResponseErrorFactory.build({
			message: "BAD_REQUEST",
			code: 400,
		}),
	},
});

const businessError = businessErrorFactory.build({
	error: {
		code: 400,
		type: "ApiResponseError",
		title: "ApiResponseError # 1",
		message: "BAD_REQUEST",
	},
	message: "BAD_REQUEST",
	statusCode: 400,
});

describe("course-room module", () => {
	beforeEach(() => {
		setupStores({
			applicationErrorModule: ApplicationErrorModule,
		});
		receivedRequests = [{ path: "" }, { params: {} }];
		getRequestReturn = undefined;
	});

	describe("actions", () => {
		afterEach(() => {
			vi.clearAllMocks();
		});
		const mockApi = {
			courseRoomsControllerGetRoomBoard: vi.fn(),
			courseRoomsControllerPatchElementVisibility: vi.fn(),
			courseRoomsControllerPatchOrderingOfElements: vi.fn(),
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

		describe("fetchContent", () => {
			it("should call backend and sets state correctly", async () => {
				vi.spyOn(serverApi, "CourseRoomsApiFactory").mockReturnValue(
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

			describe("when the course is locked", () => {
				it("should set isLocked", async () => {
					const lockedError = axiosErrorFactory.build({
						response: {
							data: {
								type: "LOCKED_COURSE",
								message: "Locked Course",
							},
						},
					});

					mockApi.courseRoomsControllerGetRoomBoard.mockRejectedValue(
						lockedError
					);
					vi.spyOn(serverApi, "CourseRoomsApiFactory").mockReturnValue(
						mockApi as unknown as serverApi.CourseRoomsApiInterface
					);

					const courseRoomDetailsModule = new CourseRoomDetailsModule({});
					await courseRoomDetailsModule.fetchContent("123");

					expect(courseRoomDetailsModule.getLoading).toBe(false);
					expect(mockApi.courseRoomsControllerGetRoomBoard).toHaveBeenCalled();
					expect(
						mockApi.courseRoomsControllerGetRoomBoard.mock.calls[0][0]
					).toStrictEqual("123");
					expect(courseRoomDetailsModule.getIsLocked).toBe(true);
					expect(courseRoomDetailsModule.roomData.title).toBe("Locked Course");
				});
			});
		});

		describe("publishCard", () => {
			it("'publishCard' action should call backend and 'fetchContent' method", async () => {
				vi.spyOn(serverApi, "CourseRoomsApiFactory").mockReturnValue(
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
				vi.spyOn(serverApi, "CourseRoomsApiFactory").mockReturnValue(
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
					lessonControllerDelete: vi.fn(),
				};
				const spy = vi
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
					lessonControllerDelete: vi.fn(() => Promise.reject(badRequestError)),
				};
				const spy = vi
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
					taskControllerDelete: vi.fn(),
				};
				const spy = vi
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
					taskControllerDelete: vi.fn(() => Promise.reject(badRequestError)),
				};
				const spy = vi
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
					boardControllerCreateBoard: vi.fn(),
				};
				const spy = vi
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
					boardControllerCreateBoard: vi.fn(),
				};
				const spy = vi
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
					boardControllerCreateBoard: vi
						.fn()
						.mockRejectedValue(badRequestError),
				};
				const spy = vi
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
					boardControllerDeleteBoard: vi.fn(),
				};
				const spy = vi
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
					boardControllerDeleteBoard: vi
						.fn()
						.mockRejectedValue(badRequestError),
				};
				const spy = vi
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
					commonCartridgeControllerExportCourse: vi.fn(
						() => Promise.resolve() as unknown as AxiosPromise<void>
					),
					commonCartridgeControllerImportCourse: vi.fn(
						() => Promise.resolve() as unknown as AxiosPromise<void>
					),
				};
				const spy = vi
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
					commonCartridgeControllerExportCourse: vi.fn(() =>
						Promise.reject(badRequestError)
					),
					commonCartridgeControllerImportCourse: vi.fn(() =>
						Promise.reject(badRequestError)
					),
				};
				const spy = vi
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
					taskControllerFinish: vi.fn(),
				};
				vi.spyOn(serverApi, "TaskApiFactory").mockReturnValue(
					mockApi as unknown as serverApi.TaskApiInterface
				);

				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				const setBusinessErrorSpy = vi.spyOn(
					courseRoomDetailsModule,
					"setBusinessError"
				);
				const resetBusinessErrorSpy = vi.spyOn(
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
				vi.spyOn(serverApi, "TaskApiFactory").mockReturnValue(
					mockApi as unknown as serverApi.TaskApiInterface
				);

				const courseRoomDetailsModule = new CourseRoomDetailsModule({});
				const finishTaskSpy = vi.spyOn(courseRoomDetailsModule, "finishTask");
				const setBusinessErrorSpy = vi.spyOn(
					courseRoomDetailsModule,
					"setBusinessError"
				);
				const resetBusinessErrorSpy = vi.spyOn(
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
					"BAD_REQUEST"
				);
			});
		});

		describe("fetchScopePermission", () => {
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
				const fetchScopePermissionSpy = vi.spyOn(
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
				const setErrorSpy = vi.spyOn(applicationErrorModule, "setError");
				const courseRoomDetailsModule = new CourseRoomDetailsModule({});

				const errorData = axiosErrorFactory.build({
					response: {
						data: apiResponseErrorFactory.build({
							message: "FORBIDDEN",
							code,
						}),
					},
				});

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
