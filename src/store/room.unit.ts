import { Room } from "./room";
import * as serverApi from "../serverApi/v3/api";
import { initializeAxios } from "../utils/api";
import { NuxtAxiosInstance } from "@nuxtjs/axios";

let receivedRequests: any[] = [];
let getRequestReturn: any = {};

const axiosInitializer = () => {
	initializeAxios({
		$get: async (path: string, params: {}) => {
			receivedRequests.push({ path });
			receivedRequests.push({ params });
			return getRequestReturn;
		},
		$post: async (path: string) => {},
		$patch: async (path: string, params: {}) => {
			receivedRequests.push({ path });
			receivedRequests.push({ params });
			return getRequestReturn;
		},
		$delete: async (path: string) => {
			receivedRequests.push({ path });
			return getRequestReturn;
		},
	} as NuxtAxiosInstance);
};

axiosInitializer();

describe("room module", () => {
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
					.mockReturnValue(mockApi as serverApi.RoomsApiInterface);

				const roomModule = new Room({});
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
					.mockReturnValue(mockApi as serverApi.RoomsApiInterface);

				const roomModule = new Room({});
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
					.mockReturnValue(mockApi as serverApi.RoomsApiInterface);

				const roomModule = new Room({});
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
				const roomModule = new Room({});
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
				const roomModule = new Room({});
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

			it("should set businessError if server could't find any lesson", async () => {
				let received: any[] = [];
				let returned: any = {};

				(() => {
					initializeAxios({
						$get: async (path: string, params: {}) => {
							received.push({ path });
							received.push({ params });
							if (path === "/v1/lessons") {
								return (returned = { data: [] });
							}
						},
					} as NuxtAxiosInstance);
				})();

				const roomModule = new Room({});
				const fetchContentSpy = jest.spyOn(roomModule, "fetchContent");
				await roomModule.confirmImportLesson("123456");

				expect(roomModule.businessError).toStrictEqual({
					statusCode: "400",
					message: "not-found",
				});
				expect(fetchContentSpy).not.toHaveBeenCalled();
			});

			it("should set businessError if the server sends nothing after creating lesson ", async () => {
				let received: any[] = [];
				let returned: any = {};

				(() => {
					initializeAxios({
						$get: async (path: string, params: {}) => {
							received.push({ path });
							received.push({ params });
							if (path === "/v1/lessons") {
								return (returned = { data: ["123", "465"] });
							}
						},
						$post: async (path: string, params: {}) => {
							received.push({ path });
							received.push({ params });
							if (path === "/v1/lessons/copy") {
								return (returned = undefined);
							}
						},
					} as NuxtAxiosInstance);
				})();

				const roomModule = new Room({});
				const fetchContentSpy = jest.spyOn(roomModule, "fetchContent");
				await roomModule.confirmImportLesson("123456");

				expect(roomModule.businessError).toStrictEqual({
					statusCode: "400",
					message: "not-created",
				});
				expect(fetchContentSpy).not.toHaveBeenCalled();
			});

			it("should trigger fetchContent method after copying lesson", async () => {
				let received: any[] = [];
				let returned: any = {};

				(() => {
					initializeAxios({
						$get: async (path: string, params: {}) => {
							received.push({ path });
							received.push({ params });
							if (path === "/v1/lessons") {
								return (returned = { data: ["123", "465"] });
							}
						},
						$post: async (path: string, params: {}) => {
							received.push({ path });
							received.push({ params });
							if (path === "/v1/lessons/copy") {
								return (returned = { _id: "123456" });
							}
						},
					} as NuxtAxiosInstance);
				})();

				const roomModule = new Room({});
				const fetchContentSpy = jest.spyOn(roomModule, "fetchContent");
				await roomModule.confirmImportLesson("123456");

				expect(fetchContentSpy).toHaveBeenCalled();
			});

			it("should catch error in catch block", async () => {
				let received: any[] = [];
				let returned: any = {};
				const error = { statusCode: 404, message: "friendly error" };

				(() => {
					initializeAxios({
						$get: async (path: string, params: {}) => {
							received.push({ path });
							received.push({ params });
							if (path === "/v1/lessons") {
								return (returned = Promise.reject({ ...error }));
							}
						},
					} as NuxtAxiosInstance);
				})();

				const roomModule = new Room({});
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

			it("should call the backend", async () => {
				let received: any[] = [];
				let returned: any = {};
				(() => {
					initializeAxios({
						$delete: async (path: string) => {
							received.push({ path });
							if (path === "/v1/lessons/123456") {
								return (returned = { _id: "123456" });
							}
						},
					} as NuxtAxiosInstance);
				})();
				const roomModule = new Room({});
				const deleteLessonSpy = jest.spyOn(roomModule, "deleteLesson");
				const fetchContentSpy = jest.spyOn(roomModule, "fetchContent");
				const resetBusinessErrorSpy = jest.spyOn(
					roomModule,
					"resetBusinessError"
				);
				await roomModule.deleteLesson("123456");

				expect(received[0].path).toStrictEqual("/v1/lessons/123456");
				expect(deleteLessonSpy.mock.calls[0][0]).toStrictEqual("123456");
				expect(resetBusinessErrorSpy).toHaveBeenCalled();
				expect(fetchContentSpy).toHaveBeenCalled();
			});

			it("should set businessError if server response does not contain '_id'", async () => {
				let received: any[] = [];
				let returned: any = {};

				(() => {
					initializeAxios({
						$delete: async (path: string) => {
							received.push({ path });
							if (path === "/v1/lessons/123456") {
								return (returned = {});
							}
						},
					} as NuxtAxiosInstance);
				})();
				const roomModule = new Room({});
				const deleteLessonSpy = jest.spyOn(roomModule, "deleteLesson");
				const setBusinessErrorSpy = jest.spyOn(roomModule, "setBusinessError");
				const resetBusinessErrorSpy = jest.spyOn(
					roomModule,
					"resetBusinessError"
				);
				await roomModule.deleteLesson("123456");

				expect(roomModule.businessError).toStrictEqual({
					statusCode: "400",
					message: "not-deleted",
				});
				expect(setBusinessErrorSpy).toHaveBeenCalled();
				expect(resetBusinessErrorSpy).toHaveBeenCalled();
				expect(deleteLessonSpy).toHaveBeenCalled();
			});

			it("should catch error in catch block", async () => {
				let received: any[] = [];
				let returned: any = {};
				const error = { statusCode: 404, message: "friendly error" };

				(() => {
					initializeAxios({
						$delete: async (path: string) => {
							received.push({ path });
							if (path === "/v1/lessons/123456") {
								return (returned = Promise.reject({ ...error }));
							}
						},
					} as NuxtAxiosInstance);
				})();

				const roomModule = new Room({});
				const deleteLessonSpy = jest.spyOn(roomModule, "deleteLesson");
				const setBusinessErrorSpy = jest.spyOn(roomModule, "setBusinessError");
				const resetBusinessErrorSpy = jest.spyOn(
					roomModule,
					"resetBusinessError"
				);
				await roomModule.deleteLesson("123456");

				expect(resetBusinessErrorSpy).toHaveBeenCalled();
				expect(deleteLessonSpy).toHaveBeenCalled();
				expect(setBusinessErrorSpy).toHaveBeenCalled();
				expect(roomModule.businessError.statusCode).toStrictEqual(404);
				expect(roomModule.businessError.message).toStrictEqual(
					"friendly error"
				);
			});
		});

		describe("createCourseInvitation", () => {
			beforeEach(() => {
				receivedRequests = [];
			});

			it("should call the backend", async () => {
				let received: any[] = [];
				(() => {
					initializeAxios({
						$post: async (path: string, params: {}) => {
							received.push({ path });
							received.push({ params });
						},
					} as NuxtAxiosInstance);
				})();
				const roomModule = new Room({});
				const createCourseInvitationSpy = jest.spyOn(
					roomModule,
					"createCourseInvitation"
				);
				const resetBusinessErrorSpy = jest.spyOn(
					roomModule,
					"resetBusinessError"
				);
				await roomModule.createCourseInvitation("123456");

				expect(received[0].path).toStrictEqual("/v1/link");
				expect(received[1].params.target).toContain(
					"courses/123456/addStudent"
				);
				expect(createCourseInvitationSpy.mock.calls[0][0]).toStrictEqual(
					"123456"
				);
				expect(resetBusinessErrorSpy).toHaveBeenCalled();
			});

			it("should set businessError if server response does not contain '_id'", async () => {
				let received: any[] = [];
				let returned: any = {};

				(() => {
					initializeAxios({
						$post: async (path: string) => {
							received.push({ path });
							if (path === "/v1/link") {
								return (returned = {});
							}
						},
					} as NuxtAxiosInstance);
				})();
				const roomModule = new Room({});
				const createCourseInvitationSpy = jest.spyOn(
					roomModule,
					"createCourseInvitation"
				);
				const setBusinessErrorSpy = jest.spyOn(roomModule, "setBusinessError");
				const resetBusinessErrorSpy = jest.spyOn(
					roomModule,
					"resetBusinessError"
				);
				await roomModule.createCourseInvitation("123456");

				expect(roomModule.businessError).toStrictEqual({
					statusCode: "400",
					message: "not-generated",
				});
				expect(resetBusinessErrorSpy).toHaveBeenCalled();
				expect(setBusinessErrorSpy).toHaveBeenCalled();
				expect(createCourseInvitationSpy).toHaveBeenCalled();
			});

			it("should catch error in catch block", async () => {
				let received: any[] = [];
				let returned: any = {};
				const error = { statusCode: 404, message: "friendly error" };

				(() => {
					initializeAxios({
						$post: async (path: string) => {
							received.push({ path });
							if (path === "/v1/link") {
								return (returned = Promise.reject({ ...error }));
							}
						},
					} as NuxtAxiosInstance);
				})();

				const roomModule = new Room({});
				const createCourseInvitationSpy = jest.spyOn(
					roomModule,
					"createCourseInvitation"
				);
				const setBusinessErrorSpy = jest.spyOn(roomModule, "setBusinessError");
				const resetBusinessErrorSpy = jest.spyOn(
					roomModule,
					"resetBusinessError"
				);
				await roomModule.createCourseInvitation("123456");

				expect(resetBusinessErrorSpy).toHaveBeenCalled();
				expect(createCourseInvitationSpy).toHaveBeenCalled();
				expect(setBusinessErrorSpy).toHaveBeenCalled();
				expect(roomModule.businessError.statusCode).toStrictEqual(404);
				expect(roomModule.businessError.message).toStrictEqual(
					"friendly error"
				);
			});
		});

		describe("createCourseShareToken", () => {
			beforeEach(() => {
				receivedRequests = [];
			});

			it("should call the backend", async () => {
				let received: any[] = [];
				(() => {
					initializeAxios({
						$get: async (path: string, params: {}) => {
							received.push({ path });
						},
					} as NuxtAxiosInstance);
				})();
				const roomModule = new Room({});
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
				let received: any[] = [];
				let returned: any = {};

				(() => {
					initializeAxios({
						$get: async (path: string) => {
							received.push({ path });
							if (path === "/v1/courses-share/123456") {
								return (returned = {});
							}
						},
					} as NuxtAxiosInstance);
				})();
				const roomModule = new Room({});
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
				let received: any[] = [];
				let returned: any = {};
				const error = { statusCode: 404, message: "friendly error" };

				(() => {
					initializeAxios({
						$get: async (path: string) => {
							received.push({ path });
							if (path === "/v1/courses-share/123456") {
								return (returned = Promise.reject({ ...error }));
							}
						},
					} as NuxtAxiosInstance);
				})();

				const roomModule = new Room({});
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
	});

	describe("mutations", () => {
		describe("setRoomData", () => {
			it("should set the room data", () => {
				const roomModule = new Room({});
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
				const roomModule = new Room({});
				const loadingValue = true;
				expect(roomModule.getLoading).not.toBe(loadingValue);
				roomModule.setLoading(loadingValue);
				expect(roomModule.loading).toBe(loadingValue);
			});
		});

		describe("setError", () => {
			it("should set error", () => {
				const roomModule = new Room({});
				const errorData = { message: "some error" };
				expect(roomModule.getError).not.toBe(errorData);
				roomModule.setError(errorData);
				expect(roomModule.error).toBe(errorData);
			});
		});

		describe("setBusinessError", () => {
			it("should set businessError", () => {
				const roomModule = new Room({});
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
				const roomModule = new Room({});
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
				const roomModule = new Room({});
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

		describe("setCourseInvitationLink", () => {
			it("should set the state", () => {
				const roomModule = new Room({});
				const payload = "http://localhost:4000/link/123456";

				roomModule.setCourseInvitationLink(payload);
				expect(roomModule.getCourseInvitationLink).toStrictEqual(payload);
			});
		});

		describe("setCourseShareToken", () => {
			it("should set the state", () => {
				const roomModule = new Room({});
				const payload = "token_test";

				roomModule.setCourseShareToken(payload);
				expect(roomModule.getCourseShareToken).toStrictEqual(payload);
			});
		});
	});

	describe("getters", () => {
		describe("getRoomsData", () => {
			it("should return rooms state", () => {
				const roomModule = new Room({});
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
				const roomModule = new Room({});

				expect(roomModule.getLoading).not.toStrictEqual(true);
				roomModule.setLoading(true);
				expect(roomModule.getLoading).toStrictEqual(true);
			});
		});

		describe("getError", () => {
			it("should return error state", () => {
				const roomModule = new Room({});
				const errorData = { message: "some error" };
				expect(roomModule.getError).toStrictEqual(null);
				roomModule.setError(errorData);
				expect(roomModule.getError).toStrictEqual(errorData);
			});
		});
		describe("roomIsEmpty", () => {
			it("should return false if there are any elements in the room", () => {
				const roomModule = new Room({});
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
				const roomModule = new Room({});
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
	});
});
