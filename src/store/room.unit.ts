import RoomModule from "./room";
import * as serverApi from "../serverApi/v3/api";
import { initializeAxios } from "../utils/api";
import AuthModule from "@/store/auth";
import setupStores from "@@/tests/test-utils/setupStores";

import { AxiosInstance } from "axios";
import { authModule } from "@/store";

let receivedRequests: any[] = [];
const getRequestReturn: any = {};

const axiosInitializer = () => {
	initializeAxios({
		get: async (path: string, params: {}) => {
			receivedRequests.push({ path });
			receivedRequests.push({ params });
			return getRequestReturn;
		},
		post: async (path: string) => {},
		patch: async (path: string, params: {}) => {
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
		setupStores({ authModule: AuthModule });
	});
	describe("actions", () => {
		beforeEach(() => {
			receivedRequests = [];
		});
		afterEach(() => {
			jest.clearAllMocks();
		});
		const mockApi = {
			roomsControllerGetRoomBoard: jest.fn(),
			roomsControllerPatchElementVisibility: jest.fn(),
			roomsControllerPatchOrderingOfElements: jest.fn(),
		};
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

		describe("getSharedLesson", () => {
			beforeEach(() => {
				receivedRequests = [];
			});

			it("should call the backend", async () => {
				const roomModule = new RoomModule({});
				const fetchSharedLessonSpy = jest.spyOn(
					roomModule,
					"fetchSharedLesson"
				);
				await roomModule.fetchSharedLesson("123456");

				expect(receivedRequests[0].path).toStrictEqual("/v1/lessons/123456");
				expect(fetchSharedLessonSpy.mock.calls[0][0]).toStrictEqual("123456");
			});
		});

		describe("confirmImportLesson", () => {
			beforeEach(() => {
				receivedRequests = [];
			});

			it("should call the backend", async () => {
				const roomModule = new RoomModule({});
				const confirmImportLessonSpy = jest.spyOn(
					roomModule,
					"confirmImportLesson"
				);
				await roomModule.confirmImportLesson("123456");

				expect(receivedRequests[0].path).toStrictEqual("/v1/lessons");
				expect(receivedRequests[1].params.params).toStrictEqual({
					shareToken: "123456",
				});
				expect(confirmImportLessonSpy.mock.calls[0][0]).toStrictEqual("123456");
			});

			it("should set businessError if server couldn't find any lesson", async () => {
				const received: any[] = [];
				let returned: any = {};

				(() => {
					initializeAxios({
						get: async (path: string, params: {}) => {
							received.push({ path });
							received.push({ params });
							if (path === "/v1/lessons") {
								return (returned = { data: { data: [] } });
							}
						},
					} as AxiosInstance);
				})();

				const roomModule = new RoomModule({});
				const fetchContentSpy = jest.spyOn(roomModule, "fetchContent");
				await roomModule.confirmImportLesson("123456");

				expect(roomModule.businessError).toStrictEqual({
					statusCode: "400",
					message: "not-found",
				});
				expect(fetchContentSpy).not.toHaveBeenCalled();
			});

			it("should set businessError if the server sends nothing after creating lesson ", async () => {
				const received: any[] = [];
				let returned: any = {};

				(() => {
					initializeAxios({
						get: async (path: string, params: {}) => {
							received.push({ path });
							received.push({ params });
							if (path === "/v1/lessons") {
								return (returned = { data: { data: ["123", "465"] } });
							}
						},
						post: async (path: string, params: {}) => {
							received.push({ path });
							received.push({ params });
							if (path === "/v1/lessons/copy") {
								return (returned = undefined);
							}
						},
					} as AxiosInstance);
				})();

				const roomModule = new RoomModule({});
				const fetchContentSpy = jest.spyOn(roomModule, "fetchContent");
				await roomModule.confirmImportLesson("123456");

				expect(roomModule.businessError).toStrictEqual({
					statusCode: "400",
					message: "not-created",
				});
				expect(fetchContentSpy).not.toHaveBeenCalled();
			});

			it("should trigger fetchContent method after copying lesson", async () => {
				const received: any[] = [];
				const returned: any = {};

				(() => {
					initializeAxios({
						get: async (path: string, params: {}) => {
							received.push({ path });
							received.push({ params });
							if (path === "/v1/lessons") {
								return { data: { data: ["123", "465"] } };
							}
						},
						post: async (path: string, params: {}) => {
							received.push({ path });
							received.push({ params });
							if (path === "/v1/lessons/copy") {
								return { data: { _id: "123456" } };
							}
						},
					} as AxiosInstance);
				})();

				const roomModule = new RoomModule({});
				const fetchContentSpy = jest.spyOn(roomModule, "fetchContent");
				await roomModule.confirmImportLesson("123456");

				expect(fetchContentSpy).toHaveBeenCalled();
			});

			it("should catch error in catch block", async () => {
				const received: any[] = [];
				let returned: any = {};
				const error = { statusCode: 404, message: "friendly error" };

				(() => {
					initializeAxios({
						get: async (path: string, params: {}) => {
							received.push({ path });
							received.push({ params });
							if (path === "/v1/lessons") {
								return (returned = Promise.reject({ ...error }));
							}
						},
					} as AxiosInstance);
				})();

				const roomModule = new RoomModule({});
				await roomModule.confirmImportLesson("123456");

				expect(roomModule.businessError.statusCode).toStrictEqual(404);
				expect(roomModule.businessError.message).toStrictEqual(
					"friendly error"
				);
			});
		});

		describe("deleteLesson", () => {
			beforeEach(() => {
				receivedRequests = [];
			});

			it("should call api to delete a lesson", async () => {
				const mockApi = {
					lessonControllerDelete: jest.fn(),
				};
				const spy = jest
					.spyOn(serverApi, "LessonApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.LessonApiInterface);

				const roomModule = new RoomModule({});
				const fetchContentSpy = jest.spyOn(roomModule, "fetchContent");

				await roomModule.deleteLesson("id");

				expect(mockApi.lessonControllerDelete).toHaveBeenCalledTimes(1);
				expect(mockApi.lessonControllerDelete).toHaveBeenCalledWith("id");
				expect(fetchContentSpy).toHaveBeenCalledTimes(1);

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

		describe("createCourseShareToken", () => {
			beforeEach(() => {
				receivedRequests = [];
			});

			it("should call the backend", async () => {
				const received: any[] = [];
				(() => {
					initializeAxios({
						get: async (path: string, params: {}) => {
							received.push({ path });
						},
					} as AxiosInstance);
				})();
				const roomModule = new RoomModule({});
				const createCourseShareTokenSpy = jest.spyOn(
					roomModule,
					"createCourseShareToken"
				);
				const resetBusinessErrorSpy = jest.spyOn(
					roomModule,
					"resetBusinessError"
				);
				await roomModule.createCourseShareToken("123456");

				expect(received[0].path).toStrictEqual("/v1/courses-share/123456");
				expect(createCourseShareTokenSpy.mock.calls[0][0]).toStrictEqual(
					"123456"
				);
				expect(resetBusinessErrorSpy).toHaveBeenCalled();
			});

			it("should set businessError if server response does not contain 'shareToken'", async () => {
				(() => {
					initializeAxios({
						get: async (path: string) => {
							if (path === "/v1/courses-share/123456") {
								return { data: {} };
							}
						},
					} as AxiosInstance);
				})();
				const roomModule = new RoomModule({});
				const createCourseShareTokenSpy = jest.spyOn(
					roomModule,
					"createCourseShareToken"
				);
				const setBusinessErrorSpy = jest.spyOn(roomModule, "setBusinessError");
				const resetBusinessErrorSpy = jest.spyOn(
					roomModule,
					"resetBusinessError"
				);
				await roomModule.createCourseShareToken("123456");

				expect(roomModule.businessError).toStrictEqual({
					statusCode: "400",
					message: "not-generated",
				});
				expect(resetBusinessErrorSpy).toHaveBeenCalled();
				expect(setBusinessErrorSpy).toHaveBeenCalled();
				expect(createCourseShareTokenSpy).toHaveBeenCalled();
			});

			it("should catch error in catch block", async () => {
				const error = { statusCode: 404, message: "friendly error" };

				(() => {
					initializeAxios({
						get: async (path: string) => {
							if (path === "/v1/courses-share/123456") {
								return Promise.reject({ ...error });
							}
						},
					} as AxiosInstance);
				})();

				const roomModule = new RoomModule({});
				const createCourseShareTokenSpy = jest.spyOn(
					roomModule,
					"createCourseShareToken"
				);
				const setBusinessErrorSpy = jest.spyOn(roomModule, "setBusinessError");
				const resetBusinessErrorSpy = jest.spyOn(
					roomModule,
					"resetBusinessError"
				);
				await roomModule.createCourseShareToken("123456");

				expect(resetBusinessErrorSpy).toHaveBeenCalled();
				expect(createCourseShareTokenSpy).toHaveBeenCalled();
				expect(setBusinessErrorSpy).toHaveBeenCalled();
				expect(roomModule.businessError.statusCode).toStrictEqual(404);
				expect(roomModule.businessError.message).toStrictEqual(
					"friendly error"
				);
			});
		});

		describe("downloadImsccCourse", () => {
			it("should call backend api", async () => {
				const roomModule = new RoomModule({});
				const mockApi = {
					lessonControllerDelete: jest.fn(() => Promise.resolve()),
				};
				const spy = jest
					.spyOn(serverApi, "CoursesApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.CoursesApiInterface);

				await expect(
					roomModule.downloadImsccCourse()
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

				await roomModule.downloadImsccCourse();

				expect(roomModule.businessError).toStrictEqual(error);

				spy.mockRestore();
			});
		});

		describe("finishTask", () => {
			beforeEach(() => {
				// @ts-ignore
				authModule.setUser({ id: "testUser" });
			});

			it("should make a 'GET' call to the backend to fetch the 'homework' data", async () => {
				const received: any[] = [];
				(() => {
					initializeAxios({
						patch: async (path: string, params: {}) => {
							return { data: { _id: "returnId" } };
						},
						get: async (path: string, params: {}) => {
							received.push({ path });
							received.push({ params });
							return {
								data: {
									archived: ["testUserId"],
								},
							};
						},
					} as AxiosInstance);
				})();
				const roomModule = new RoomModule({});
				const finishTaskSpy = jest.spyOn(roomModule, "finishTask");
				const setBusinessErrorSpy = jest.spyOn(roomModule, "setBusinessError");
				const resetBusinessErrorSpy = jest.spyOn(
					roomModule,
					"resetBusinessError"
				);
				await roomModule.finishTask({ itemId: "finishId", action: "finish" });

				expect(resetBusinessErrorSpy).toHaveBeenCalled();
				expect(setBusinessErrorSpy).not.toHaveBeenCalled();
				expect(received[0].path).toStrictEqual("/v1/homework/finishId");
				expect(finishTaskSpy.mock.calls[0][0]).toStrictEqual({
					itemId: "finishId",
					action: "finish",
				});
			});

			it("should set the 'BusinessError' when 'GET' call returns nothing", async () => {
				const received: any[] = [];
				(() => {
					initializeAxios({
						patch: async (path: string, params: {}) => {
							return { data: { _id: "returnId" } };
						},
						get: async (path: string, params: {}) => {
							received.push({ path });
							received.push({ params });
							return {
								data: {
									incorrectResponse: [],
								},
							};
						},
					} as AxiosInstance);
				})();
				const roomModule = new RoomModule({});
				const setBusinessErrorSpy = jest.spyOn(roomModule, "setBusinessError");
				const resetBusinessErrorSpy = jest.spyOn(
					roomModule,
					"resetBusinessError"
				);
				await roomModule.finishTask({ itemId: "finishId", action: "finish" });

				expect(resetBusinessErrorSpy).toHaveBeenCalled();
				expect(setBusinessErrorSpy).toHaveBeenCalled();
				expect(setBusinessErrorSpy.mock.calls[0][0].statusCode).toStrictEqual(
					"400"
				);
				expect(setBusinessErrorSpy.mock.calls[0][0].message).toStrictEqual(
					"archived-not-found"
				);
			});

			it("should make a 'PATCH' call to the backend with archived list", async () => {
				const received: any[] = [];
				(() => {
					initializeAxios({
						patch: async (path: string, params: {}) => {
							received.push({ path });
							received.push({ params });
							return { data: { _id: "returnId" } };
						},
						get: async (path: string, params: {}) => {
							return {
								data: {
									archived: ["firstId"],
								},
							};
						},
					} as AxiosInstance);
				})();
				const roomModule = new RoomModule({});
				const setBusinessErrorSpy = jest.spyOn(roomModule, "setBusinessError");
				const resetBusinessErrorSpy = jest.spyOn(
					roomModule,
					"resetBusinessError"
				);
				await roomModule.finishTask({ itemId: "finishId", action: "finish" });

				expect(resetBusinessErrorSpy).toHaveBeenCalled();
				expect(setBusinessErrorSpy).not.toHaveBeenCalled();
				expect(received[0].path).toStrictEqual("/v1/homework/finishId");
				expect(received[1].params).toStrictEqual({
					archived: ["firstId", "testUser"],
				});
			});

			it("should set the 'BusinessError' when 'PATCH' call returns nothing", async () => {
				const received: any[] = [];
				(() => {
					initializeAxios({
						patch: async (path: string, params: {}) => {
							received.push({ path });
							received.push({ params });
							return { data: { someValue: "some value for error case" } };
						},
						get: async (path: string, params: {}) => {
							return {
								data: {
									archived: ["firstId"],
								},
							};
						},
					} as AxiosInstance);
				})();
				const roomModule = new RoomModule({});
				const setBusinessErrorSpy = jest.spyOn(roomModule, "setBusinessError");
				const resetBusinessErrorSpy = jest.spyOn(
					roomModule,
					"resetBusinessError"
				);
				await roomModule.finishTask({ itemId: "finishId", action: "finish" });

				expect(resetBusinessErrorSpy).toHaveBeenCalled();
				expect(setBusinessErrorSpy).toHaveBeenCalled();
				expect(setBusinessErrorSpy.mock.calls[0][0].statusCode).toStrictEqual(
					"400"
				);
				expect(setBusinessErrorSpy.mock.calls[0][0].message).toStrictEqual(
					"archived-not-patched"
				);
			});

			it("should catch error in catch block", async () => {
				const received: any[] = [];
				const returned: any = {};
				const error = { statusCode: 404, message: "friendly error" };

				(() => {
					initializeAxios({
						patch: async (path: string, params: {}) => {
							received.push({ path });
							received.push({ params });
							return Promise.reject({ ...error });
						},
						get: async (path: string, params: {}) => {
							return {
								data: {
									archived: ["firstId"],
								},
							};
						},
					} as AxiosInstance);
				})();

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
				// @ts-ignore
				authModule.setUser({ id: "testUser" });
			});

			it("should make a 'GET' call to the backend to fetch the scoped 'room' permissions", async () => {
				const received: any[] = [];
				(() => {
					initializeAxios({
						get: async (path: string, params: {}) => {
							received.push({ path });
							received.push({ params });
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

				expect(received[0].path).toStrictEqual(
					"/v1/courses/courseId/userPermissions?userId=userId"
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
								duedate: "2300-09-28T13:00:00.000Z",
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

		describe("setSharedLessonData", () => {
			it("should set the state", () => {
				const roomModule = new RoomModule({});
				const shareLessonData = {
					code: "123",
					lessonName: "Lesson_1",
					status: "success",
					message: "",
				};

				roomModule.setSharedLessonData(shareLessonData);
				expect(roomModule.sharedLessonData).toStrictEqual(shareLessonData);
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
								duedate: "2300-09-28T13:00:00.000Z",
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
								duedate: "2300-09-28T13:00:00.000Z",
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
