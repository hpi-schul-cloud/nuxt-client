import * as serverApi from "@/serverApi/v3/api";
import { BoardParentType } from "@/serverApi/v3/api";
import { applicationErrorModule, authModule } from "@/store";
import ApplicationErrorModule from "@/store/application-error";
import AuthModule from "@/store/auth";
import { initializeAxios } from "@/utils/api";
import { meResponseFactory } from "@@/tests/test-utils";
import { courseFactory } from "@@/tests/test-utils/factory";
import setupStores from "@@/tests/test-utils/setupStores";
import { AxiosError, AxiosInstance } from "axios";
import RoomModule from "./course";
import { HttpStatusCode } from "./types/http-status-code.enum";
import { Course } from "./types/room";

let receivedRequests: any[] = [];
let getRequestReturn: any = {};

const axiosInitializer = () => {
	initializeAxios({
		get: async (path: string, params: object) => {
			receivedRequests.push({ path });
			receivedRequests.push({ params });
			return getRequestReturn;
		},
		post: async (path: string) => {
			receivedRequests.push({ path });
			return getRequestReturn;
		},
		patch: async (path: string, params: object) => {
			receivedRequests.push({ path });
			receivedRequests.push({ params });
			return getRequestReturn;
		},
		delete: async (path: string) => {
			receivedRequests.push({ path });
			return getRequestReturn;
		},
	} as AxiosInstance);
};

axiosInitializer();

describe("room module", () => {
	beforeEach(() => {
		setupStores({
			authModule: AuthModule,
			applicationErrorModule: ApplicationErrorModule,
		});
		receivedRequests = [];
		getRequestReturn = undefined;
	});

	describe("actions", () => {
		afterEach(() => {
			jest.clearAllMocks();
		});
		const mockApi = {
			roomsControllerGetRoomBoard: jest.fn(),
			roomsControllerPatchElementVisibility: jest.fn(),
			roomsControllerPatchOrderingOfElements: jest.fn(),
		};

		describe("fetchCourse", () => {
			describe("when the api returns a response", () => {
				const setup = () => {
					const roomModule = new RoomModule({});

					const course: Course = courseFactory.build();

					getRequestReturn = Promise.resolve({
						data: course,
					});

					return {
						roomModule,
						course,
					};
				};

				it("should call backend", async () => {
					const { roomModule } = setup();

					await roomModule.fetchCourse("courseId");

					expect(receivedRequests[0].path).toEqual("/v1/courses/courseId");
				});

				it("should return a course", async () => {
					const { roomModule, course } = setup();

					const result: Course | null =
						await roomModule.fetchCourse("courseId");

					expect(result).toEqual(course);
				});
			});

			describe("when the api returns an error", () => {
				const setup = () => {
					const roomModule = new RoomModule({});

					const error: AxiosError = new AxiosError();

					getRequestReturn = Promise.reject(error);

					return {
						roomModule,
						error,
					};
				};

				it("should set an error", async () => {
					const { roomModule, error } = setup();

					await roomModule.fetchCourse("courseId");

					expect(roomModule.getError).toEqual(error);
				});

				it("should return null", async () => {
					const { roomModule } = setup();

					const result: Course | null =
						await roomModule.fetchCourse("courseId");

					expect(result).toBeNull();
				});
			});
		});

		describe("fetch", () => {
			it("should call backend and sets state correctly", async () => {
				jest
					.spyOn(serverApi, "RoomsApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.RoomsApiInterface);

				const roomModule = new RoomModule({});
				await roomModule.fetchContent("123");

				expect(roomModule.getLoading).toBe(false);
				expect(mockApi.roomsControllerGetRoomBoard).toHaveBeenCalled();
				expect(
					mockApi.roomsControllerGetRoomBoard.mock.calls[0][0]
				).toStrictEqual("123");
			});
		});

		describe("publishCard", () => {
			it("'publishCard' action should call backend and 'fetchContent' method", async () => {
				jest
					.spyOn(serverApi, "RoomsApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.RoomsApiInterface);

				const roomModule = new RoomModule({});
				await roomModule.publishCard({ elementId: "54321", visibility: true });

				expect(roomModule.getLoading).toBe(false);
				expect(
					mockApi.roomsControllerPatchElementVisibility
				).toHaveBeenCalled();
				expect(
					mockApi.roomsControllerPatchElementVisibility.mock.calls[0]
				).toContain("54321");
				expect(mockApi.roomsControllerGetRoomBoard).toHaveBeenCalled();
			});
		});

		describe("sortElements", () => {
			it("'sortElements' action should call backend and 'fetchContent' method", async () => {
				jest
					.spyOn(serverApi, "RoomsApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.RoomsApiInterface);

				const roomModule = new RoomModule({});
				const payload = {
					elements: ["1234", "2345", "3456", "4567"],
				};
				await roomModule.sortElements(payload);

				expect(roomModule.getLoading).toBe(false);
				expect(
					mockApi.roomsControllerPatchOrderingOfElements
				).toHaveBeenCalled();
				expect(
					mockApi.roomsControllerPatchOrderingOfElements.mock.calls[0][1]
				).toStrictEqual(payload);
				expect(mockApi.roomsControllerGetRoomBoard).toHaveBeenCalled();
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

				const roomModule = new RoomModule({});

				await roomModule.deleteLesson("id");

				expect(mockApi.lessonControllerDelete).toHaveBeenCalledTimes(1);
				expect(mockApi.lessonControllerDelete).toHaveBeenCalledWith("id");

				spy.mockRestore();
			});

			it("should catch error in catch block", async () => {
				const error = { statusCode: 418, message: "I'm a teapot" };
				const mockApi = {
					lessonControllerDelete: jest.fn(() => Promise.reject({ ...error })),
				};
				const spy = jest
					.spyOn(serverApi, "LessonApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.LessonApiInterface);

				const roomModule = new RoomModule({});

				await roomModule.deleteLesson("id");

				expect(roomModule.businessError).toStrictEqual(error);

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

				const roomModule = new RoomModule({});

				await roomModule.deleteTask("id");

				expect(mockApi.taskControllerDelete).toHaveBeenCalledTimes(1);
				expect(mockApi.taskControllerDelete).toHaveBeenCalledWith("id");

				spy.mockRestore();
			});

			it("should catch error in catch block", async () => {
				const error = { statusCode: 418, message: "I'm a teapot" };
				const mockApi = {
					taskControllerDelete: jest.fn(() => Promise.reject({ ...error })),
				};
				const spy = jest
					.spyOn(serverApi, "TaskApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);

				const roomModule = new RoomModule({});

				await roomModule.deleteTask("id");

				expect(roomModule.businessError).toStrictEqual(error);

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

				const roomModule = new RoomModule({});
				const params = {
					title: "title",
					parentId: "parentId",
					parentType: BoardParentType.Course,
					layout: serverApi.BoardLayout.Columns,
				};
				await roomModule.createBoard(params);

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

				const roomModule = new RoomModule({});
				const params = {
					title: "title",
					parentId: "parentId",
					parentType: BoardParentType.Course,
					layout: serverApi.BoardLayout.List,
				};
				await roomModule.createBoard(params);

				expect(mockApi.boardControllerCreateBoard).toHaveBeenCalledTimes(1);
				expect(mockApi.boardControllerCreateBoard).toHaveBeenCalledWith(params);

				spy.mockRestore();
			});

			it("should catch error in catch block", async () => {
				const error = { statusCode: 418, message: "I'm a teapot" };
				const mockApi = {
					boardControllerCreateBoard: jest.fn().mockRejectedValue(error),
				};
				const spy = jest
					.spyOn(serverApi, "BoardApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.BoardApiInterface);

				const roomModule = new RoomModule({});

				const params = {
					title: "title",
					parentId: "parentId",
					parentType: BoardParentType.Course,
					layout: serverApi.BoardLayout.Columns,
				};
				await roomModule.createBoard(params);

				expect(roomModule.businessError).toStrictEqual(error);

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

				const roomModule = new RoomModule({});

				await roomModule.deleteBoard("id");

				expect(mockApi.boardControllerDeleteBoard).toHaveBeenCalledTimes(1);
				expect(mockApi.boardControllerDeleteBoard).toHaveBeenCalledWith("id");

				spy.mockRestore();
			});

			it("should catch error in catch block", async () => {
				const error = { statusCode: 418, message: "I'm a teapot" };
				const mockApi = {
					boardControllerDeleteBoard: jest.fn().mockRejectedValue(error),
				};
				const spy = jest
					.spyOn(serverApi, "BoardApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.BoardApiInterface);

				const roomModule = new RoomModule({});

				await roomModule.deleteBoard("id");

				expect(roomModule.businessError).toStrictEqual(error);

				spy.mockRestore();
			});
		});

		describe("downloadCommonCartridgeCourse", () => {
			it("should call backend api", async () => {
				const roomModule = new RoomModule({});
				const mockApi = {
					lessonControllerDelete: jest.fn(() => Promise.resolve()),
				};
				const spy = jest
					.spyOn(serverApi, "CoursesApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.CoursesApiInterface);

				await expect(
					roomModule.downloadCommonCartridgeCourse({
						version: "1.1.0",
						topics: [],
						tasks: [],
						columnBoards: [],
					})
				).resolves.not.toBeDefined();

				spy.mockRestore();
			});
			it("should catch error in catch block", async () => {
				const roomModule = new RoomModule({});
				const error = { statusCode: 418, message: "I'm a teapot" };
				const mockApi = {
					courseControllerExportCourse: jest.fn(() =>
						Promise.reject({ ...error })
					),
				};
				const spy = jest
					.spyOn(serverApi, "CoursesApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.CoursesApiInterface);

				await roomModule.downloadCommonCartridgeCourse({
					version: "1.1.0",
					topics: [],
					tasks: [],
					columnBoards: [],
				});

				expect(roomModule.businessError).toStrictEqual(error);

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
							receivedRequests.push({ path });
							receivedRequests.push({ params });
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

				const roomModule = new RoomModule({});
				const setBusinessErrorSpy = jest.spyOn(roomModule, "setBusinessError");
				const resetBusinessErrorSpy = jest.spyOn(
					roomModule,
					"resetBusinessError"
				);
				await roomModule.finishTask({ itemId: "finishId", action: "finish" });

				expect(resetBusinessErrorSpy).toHaveBeenCalled();
				expect(setBusinessErrorSpy).not.toHaveBeenCalled();
				expect(mockApi.taskControllerFinish).toBeCalledWith("finishId");
			});

			it("should catch error in catch block", async () => {
				(() => {
					initializeAxios({
						get: async (path: string, params: object) => {
							receivedRequests.push({ path });
							receivedRequests.push({ params });
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
						throw {
							response: { status: 404, statusText: "friendly error" },
						};
					},
				};
				jest
					.spyOn(serverApi, "TaskApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);

				const roomModule = new RoomModule({});
				const finishTaskSpy = jest.spyOn(roomModule, "finishTask");
				const setBusinessErrorSpy = jest.spyOn(roomModule, "setBusinessError");
				const resetBusinessErrorSpy = jest.spyOn(
					roomModule,
					"resetBusinessError"
				);
				await roomModule.finishTask({ itemId: "finishId", action: "finish" });

				expect(resetBusinessErrorSpy).toHaveBeenCalled();
				expect(finishTaskSpy).toHaveBeenCalled();
				expect(setBusinessErrorSpy).toHaveBeenCalled();
				expect(roomModule.businessError.statusCode).toStrictEqual(404);
				expect(roomModule.businessError.message).toStrictEqual(
					"friendly error"
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
							receivedRequests.push({ path });
							receivedRequests.push({ params });
							return {
								data: {
									userId: ["testScopedPermission"],
								},
							};
						},
					} as AxiosInstance);
				})();
				const roomModule = new RoomModule({});
				const fetchScopePermissionSpy = jest.spyOn(
					roomModule,
					"fetchScopePermission"
				);
				await roomModule.fetchScopePermission({
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
				const roomModule = new RoomModule({});
				const expectedData = {
					id: "123",
					courseName: "Sample Course",
					displayColor: "black",
					elements: [
						{
							type: "task",
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
								},
								availableDate: "2017-09-20T11:00:00.000Z",
								dueDate: "2300-09-28T13:00:00.000Z",
								displayColor: "#54616e",
								description: "",
							},
						},
					],
				};

				expect(roomModule.getRoomData).not.toStrictEqual(expectedData);
				roomModule.setRoomData(expectedData as any);
				expect(roomModule.roomData).toStrictEqual(expectedData);
			});
		});

		describe("setLoading", () => {
			it("should set loading", () => {
				const roomModule = new RoomModule({});
				const loadingValue = true;
				expect(roomModule.getLoading).not.toBe(loadingValue);
				roomModule.setLoading(loadingValue);
				expect(roomModule.loading).toBe(loadingValue);
			});
		});

		describe("setError", () => {
			it("should set error", () => {
				const roomModule = new RoomModule({});
				const errorData = { message: "some error" };
				expect(roomModule.getError).not.toBe(errorData);
				roomModule.setError(errorData);
				expect(roomModule.error).toBe(errorData);
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
				const roomModule = new RoomModule({});
				const errorData = { response: { data: { code } } };
				roomModule.setError(errorData);
				expect(setErrorSpy).toHaveBeenCalled();
			});
		});

		describe("setBusinessError", () => {
			it("should set businessError", () => {
				const roomModule = new RoomModule({});
				const businessErrorData = {
					statusCode: "400",
					message: "error",
					error: { type: "BadRequest" },
				};
				expect(roomModule.getBusinessError).not.toBe(businessErrorData);
				roomModule.setBusinessError(businessErrorData);
				expect(roomModule.businessError).toBe(businessErrorData);
			});
			it("should reset businessError", () => {
				const roomModule = new RoomModule({});
				roomModule.businessError = {
					statusCode: "400",
					message: "error",
					error: {},
				};

				roomModule.resetBusinessError();
				expect(roomModule.businessError.statusCode).toStrictEqual("");
				expect(roomModule.businessError.message).toStrictEqual("");
			});
		});

		describe("setCourseShareToken", () => {
			it("should set the state", () => {
				const roomModule = new RoomModule({});
				const payload = "token_test";

				roomModule.setCourseShareToken(payload);
				expect(roomModule.getCourseShareToken).toStrictEqual(payload);
			});
		});

		describe("setPermissionData", () => {
			it("should set the permission data", () => {
				const roomModule = new RoomModule({});
				const expectedPermissions = ["PERMISSION_ONE", "PERMISSION_TWO"];

				expect(roomModule.getPermissionData).toStrictEqual([]);
				roomModule.setPermissionData(expectedPermissions);
				expect(roomModule.getPermissionData).toStrictEqual(expectedPermissions);
			});
		});
	});

	describe("getters", () => {
		describe("getRoomsData", () => {
			it("should return rooms state", () => {
				const roomModule = new RoomModule({});
				const expectedData = {
					id: "123",
					courseName: "Sample Course",
					displayColor: "black",
					elements: [
						{
							type: "task",
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
								},
								availableDate: "2017-09-20T11:00:00.000Z",
								dueDate: "2300-09-28T13:00:00.000Z",
								displayColor: "#54616e",
								description: "",
							},
						},
					],
				};

				roomModule.setRoomData(expectedData as any);
				expect(roomModule.getRoomData).toStrictEqual(expectedData);
			});
		});

		describe("getLoading", () => {
			it("should return loading state", () => {
				const roomModule = new RoomModule({});

				expect(roomModule.getLoading).not.toStrictEqual(true);
				roomModule.setLoading(true);
				expect(roomModule.getLoading).toStrictEqual(true);
			});
		});

		describe("getError", () => {
			it("should return error state", () => {
				const roomModule = new RoomModule({});
				const errorData = { message: "some error" };
				expect(roomModule.getError).toStrictEqual(null);
				roomModule.setError(errorData);
				expect(roomModule.getError).toStrictEqual(errorData);
			});
		});

		describe("roomIsEmpty", () => {
			it("should return false if there are any elements in the room", () => {
				const roomModule = new RoomModule({});
				const testData = {
					id: "123",
					courseName: "Sample Course",
					displayColor: "black",
					elements: [
						{
							type: "task",
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
								},
								availableDate: "2017-09-20T11:00:00.000Z",
								dueDate: "2300-09-28T13:00:00.000Z",
								displayColor: "#54616e",
								description: "",
							},
						},
					],
				};
				roomModule.setRoomData(testData as any);
				const result = roomModule.roomIsEmpty;
				expect(result).toStrictEqual(false);
			});
			it("should return true if there are no elements in the room", () => {
				const roomModule = new RoomModule({});
				const testData = {
					id: "123",
					courseName: "Sample Course",
					displayColor: "black",
					elements: [],
				};
				roomModule.setRoomData(testData as any);
				const result = roomModule.roomIsEmpty;
				expect(result).toStrictEqual(true);
			});
		});

		describe("getPermissionData", () => {
			it("should return the permission data", () => {
				const roomModule = new RoomModule({});
				const expectedPermissions = ["THREE", "FOUR"];

				roomModule.setPermissionData(expectedPermissions);
				expect(roomModule.getPermissionData).toStrictEqual(expectedPermissions);
			});
		});
	});
});
