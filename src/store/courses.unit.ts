import { AxiosInstance } from "axios";
import * as serverApi from "../serverApi/v3/api";
import { initializeAxios } from "../utils/api";
import CoursesModule from "./courses";
import { AlertPayload } from "./types/alert-payload";
import { CoursesData } from "./types/courses";

let receivedRequests: any[] = [];
const getRequestReturn: any = {};

const axiosInitializer = () => {
	initializeAxios({
		get: async (path: string, data?: object) => {
			receivedRequests.push({ path });
			receivedRequests.push({ data });
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
	} as AxiosInstance);
};

const mockData = {
	id: "id_1",
	gridElements: [
		{
			id: "123",
			title: "Math 1a",
			shortTitle: "Ma",
			displayColor: "#f23f76",
			xPosition: 6,
			yPosition: 1,
		},
		{
			id: "456",
			title: "Bio 12c",
			shortTitle: "Bi",
			displayColor: "#ffffff",
			xPosition: 5,
			yPosition: 2,
		},
		{
			id: "789",
			title: "Science",
			shortTitle: "Sc",
			displayColor: "exampleColor",
			groupElements: [
				{
					id: "987",
					title: "Biology",
					shortTitle: "Bi",
					displayColor: "#f23f76",
				},
				{
					id: "645",
					title: "Chemistry",
					shortTitle: "Ch",
					displayColor: "#f23f76",
				},
				{
					id: "321",
					title: "Physics",
					shortTitle: "Ph",
					displayColor: "#f23f76",
				},
			],
			xPosition: 3,
			yPosition: 3,
		},
	],
};

axiosInitializer();

describe("rooms module", () => {
	describe("actions", () => {
		beforeEach(() => {
			receivedRequests = [];
		});

		describe("fetch", () => {
			it("should call backend and sets state correctly", async () => {
				const mockApi = {
					dashboardControllerFindForUser: jest
						.fn()
						.mockResolvedValue({ data: {} }),
				};

				jest
					.spyOn(serverApi, "DashboardApiFactory")
					.mockReturnValue(
						mockApi as unknown as serverApi.DashboardApiInterface
					);

				const coursesModule = new CoursesModule({});

				coursesModule
					.fetch({
						indicateLoading: true,
						device: "mobile",
					})
					.then(() => {
						expect(coursesModule.getLoading).toBe(false);
					});

				expect(coursesModule.getLoading).toBe(true);
				expect(mockApi.dashboardControllerFindForUser).toHaveBeenCalled();
			});
		});

		describe("align", () => {
			it("should call server and 'setPosition' mutation", async () => {
				const mockApi = {
					dashboardControllerMoveElement: jest.fn(() => ({
						data: { id: "42", gridElements: [] },
					})),
				};

				jest
					.spyOn(serverApi, "DashboardApiFactory")
					.mockReturnValue(
						mockApi as unknown as serverApi.DashboardApiInterface
					);

				const coursesModule = new CoursesModule({});

				const payload = {
					from: { x: 1, y: 1 },
					to: { x: 2, y: 2 },
					item: {},
				};
				const expectedParam = {
					from: { x: 1, y: 1 },
					to: { x: 2, y: 2 },
				};

				coursesModule.align(payload).then(() => {
					expect(coursesModule.getLoading).toBe(false);
				});

				expect(coursesModule.getLoading).toBe(true);
				expect(mockApi.dashboardControllerMoveElement).toHaveBeenLastCalledWith(
					"",
					expectedParam
				);
			});
		});

		describe("delete", () => {
			it("should call 'setPosition' mutation", async () => {
				// TODO: call server will be here when server ready
				const coursesModule = new CoursesModule({});

				const setCourseDataSpy = jest.spyOn(coursesModule, "setCourseData");
				const setLoadingSpy = jest.spyOn(coursesModule, "setLoading");

				await coursesModule.delete("id");

				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[0][0]).toBe(true);
				expect(setCourseDataSpy).toHaveBeenCalled();
			});
		});

		describe("update", () => {
			it("should call the backend", async () => {
				const mockApi = {
					dashboardControllerPatchGroup: jest.fn((groupToPatch) => ({
						data: { ...groupToPatch },
					})),
				};
				jest
					.spyOn(serverApi, "DashboardApiFactory")
					.mockReturnValue(
						mockApi as unknown as serverApi.DashboardApiInterface
					);

				const coursesModule = new CoursesModule({});
				const coursesData: CoursesData = {
					id: "dummyId",
					title: "dummy title",
					shortTitle: "dummy short title",
					xPosition: 3,
					yPosition: 3,
					displayColor: "#FF0000",
					isSynchronized: false,
				};
				coursesModule.setCourseDataId(coursesData.id);
				await coursesModule.update(coursesData);

				expect(coursesModule.getLoading).toBe(false);
				expect(mockApi.dashboardControllerPatchGroup).toHaveBeenLastCalledWith(
					coursesData.id,
					coursesData.xPosition,
					coursesData.yPosition,
					{ title: coursesData.title }
				);
			});

			it("handle error", async () => {
				const error = { status: 418, statusText: "I'm a teapot" };
				const mockApi = {
					dashboardControllerPatchGroup: jest.fn(() =>
						Promise.reject({ ...error })
					),
				};
				jest
					.spyOn(serverApi, "DashboardApiFactory")
					.mockReturnValue(
						mockApi as unknown as serverApi.DashboardApiInterface
					);
				const coursesModule = new CoursesModule({});
				const coursesData: CoursesData = {
					id: "dummyId",
					title: "dummy title",
					shortTitle: "dummy short title",
					xPosition: 3,
					yPosition: 3,
					displayColor: "#FF0000",
					isSynchronized: false,
				};
				coursesModule.setCourseDataId(coursesData.id);
				await coursesModule.update(coursesData);

				expect(coursesModule.getLoading).toBe(false);
				expect(coursesModule.getError).toStrictEqual({ ...error });
				expect(mockApi.dashboardControllerPatchGroup).toHaveBeenLastCalledWith(
					coursesData.id,
					coursesData.xPosition,
					coursesData.yPosition,
					{ title: coursesData.title }
				);
			});
		});

		describe("fetchAllElements", () => {
			it("should call the backend", async () => {
				const mockApi = { courseControllerFindForUser: jest.fn() };
				jest
					.spyOn(serverApi, "CoursesApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.CoursesApiInterface);
				const coursesModule = new CoursesModule({});
				await coursesModule.fetchAllElements();

				expect(coursesModule.getLoading).toBe(false);
				expect(mockApi.courseControllerFindForUser).toHaveBeenCalledTimes(1);

				expect(
					mockApi.courseControllerFindForUser.mock.calls[0][0]
				).toStrictEqual(0); // $skip: 0
				expect(
					mockApi.courseControllerFindForUser.mock.calls[0][1]
				).toStrictEqual(100); // $limit: 100
			});

			it("handle error", (done) => {
				const error = { status: 418, statusText: "I'm not a teapot" };
				const mockApi = {
					courseControllerFindForUser: jest.fn(() =>
						Promise.reject({ ...error })
					),
				};
				jest
					.spyOn(serverApi, "CoursesApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.CoursesApiInterface);
				const coursesModule = new CoursesModule({});

				coursesModule.fetchAllElements().then(() => {
					expect(coursesModule.getLoading).toBe(false);
					expect(coursesModule.getError).toStrictEqual({ ...error });
					done();
				});

				expect(coursesModule.getLoading).toBe(true);
			});
		});

		describe("confirmSharedCourseData", () => {
			it("should call the backend", async () => {
				const sharedCourseData = {
					code: "123",
					courseName: "Mathe",
					status: "success",
					message: "",
				};
				const coursesModule = new CoursesModule({});
				const getSharedCourseDataSpy = jest.spyOn(
					coursesModule,
					"confirmSharedCourseData"
				);
				getSharedCourseDataSpy.mockImplementation();

				await coursesModule.confirmSharedCourseData(sharedCourseData);
				expect(getSharedCourseDataSpy.mock.calls[0][0]).toStrictEqual(
					sharedCourseData
				);
			});

			it("should call the businessError mutation", async () => {
				const sharedCourseData = {
					code: "",
					courseName: "",
					status: "",
					message: "",
				};
				const setBusinessErrorMock = jest.fn();
				const coursesModule = new CoursesModule({});
				coursesModule.setBusinessError = setBusinessErrorMock;

				await coursesModule.confirmSharedCourseData(sharedCourseData);
				expect(setBusinessErrorMock).toHaveBeenCalled();
			});
		});
	});

	describe("mutations", () => {
		describe("setCourseData", () => {
			it("should set the room data", () => {
				const coursesModule = new CoursesModule({});
				const coursesDataToBeChanged = [
					{
						id: "someId",
						title: "exampletitle",
						shortTitle: "ex",
						displayColor: "#f23f76",
						xPosition: 2,
						yPosition: 5,
					},
				];

				const expectedData = [
					{
						id: "someId",
						title: "exampletitle",
						shortTitle: "ex",
						displayColor: "#f23f76",
						xPosition: 2,
						yPosition: 5,
						to: "/rooms/someId",
					},
				];
				expect(coursesModule.getCoursesData).not.toStrictEqual(
					coursesDataToBeChanged
				);
				coursesModule.setCourseData(coursesDataToBeChanged as any);
				expect(coursesModule.coursesData).toStrictEqual(expectedData);
			});
		});

		describe("setCourseDataId", () => {
			it("should set the room data id", () => {
				const coursesModule = new CoursesModule({});
				const id = "sample_id";

				coursesModule.setCourseDataId(id);
				expect(coursesModule.gridElementsId).toStrictEqual(id);
			});
		});

		describe("setLoading", () => {
			it("should set loading", () => {
				const coursesModule = new CoursesModule({});
				const loadingValue = true;
				expect(coursesModule.getLoading).not.toBe(loadingValue);
				coursesModule.setLoading(loadingValue);
				expect(coursesModule.loading).toBe(loadingValue);
			});
		});

		describe("setError", () => {
			it("should set error", () => {
				const coursesModule = new CoursesModule({});
				const errorData = { message: "some error" };
				expect(coursesModule.getError).not.toBe(errorData);
				coursesModule.setError(errorData);
				expect(coursesModule.error).toBe(errorData);
			});
		});

		describe("setPosition", () => {
			it("should re-position the state", () => {
				const coursesModule = new CoursesModule({});
				const draggedObject = {
					from: { x: 6, y: 1 },
					item: {
						id: "123",
						title: "Math 1a",
						shortTitle: "Ma",
						displayColor: "#f23f76",
						xPosition: 6,
						yPosition: 1,
					},
					to: { x: 5, y: 2 },
				};
				const expectedObject = {
					id: "123",
					title: "Math 1a",
					shortTitle: "Ma",
					displayColor: "#f23f76",
					xPosition: 5,
					yPosition: 2,
					to: "/rooms/123",
				};
				coursesModule.setCourseData(mockData.gridElements as any);
				coursesModule.setPosition(draggedObject);
				expect(coursesModule.coursesData[0]).toStrictEqual(expectedObject);
			});
		});

		describe("setAllElements", () => {
			it("should set the all elements data", () => {
				const coursesModule = new CoursesModule({});
				const itemsToBeSet = [
					{
						id: "123",
						title: "Mathe",
						shortTitle: "Ma",
						displayColor: "#54616e",
						startDate: "2019-12-07T23:00:00.000Z",
						untilDate: "2020-12-16T23:00:00.000Z",
					},
					{
						id: "234",
						title: "History",
						shortTitle: "Hi",
						displayColor: "#EF6C00",
						startDate: "2015-07-31T22:00:00.000Z",
						untilDate: "2300-07-30T22:00:00.000Z",
					},
				];

				const expectedData = [
					{
						id: "123",
						title: "Mathe",
						shortTitle: "Ma",
						displayColor: "#54616e",
						startDate: "2019-12-07T23:00:00.000Z",
						untilDate: "2020-12-16T23:00:00.000Z",
						titleDate: "2019/20",
						searchText: "Mathe 2019/20",
						isArchived: true,
						to: "/rooms/123",
					},
					{
						id: "234",
						title: "History",
						shortTitle: "Hi",
						displayColor: "#EF6C00",
						startDate: "2015-07-31T22:00:00.000Z",
						untilDate: "2300-07-30T22:00:00.000Z",
						searchText: "History",
						isArchived: false,
						to: "/rooms/234",
					},
				];
				coursesModule.setAllElements(itemsToBeSet);
				expect(coursesModule.allElements).toStrictEqual(expectedData);
			});
		});

		describe("setSharedCourseData, setImportedCourseId", () => {
			it("should set the state and imported course id", () => {
				const coursesModule = new CoursesModule({});
				const sharedCourseData = {
					code: "123",
					courseName: "Mathe",
					status: "success",
					message: "",
				};
				const importedCourseId = "456789";

				coursesModule.setSharedCourseData(sharedCourseData);
				coursesModule.setImportedCourseId(importedCourseId);
				expect(coursesModule.sharedCourseData).toStrictEqual(sharedCourseData);
				expect(coursesModule.importedCourseId).toStrictEqual(importedCourseId);
			});
		});

		describe("setBusinessError", () => {
			it("should set businessError", () => {
				const coursesModule = new CoursesModule({});
				const businessErrorData = {
					statusCode: "400",
					message: "error",
					error: { type: "BadRequest" },
				};
				expect(coursesModule.getBusinessError).not.toBe(businessErrorData);
				coursesModule.setBusinessError(businessErrorData);
				expect(coursesModule.businessError).toBe(businessErrorData);
			});
			it("should reset businessError", () => {
				const coursesModule = new CoursesModule({});
				coursesModule.businessError = {
					statusCode: "400",
					message: "error",
					error: {},
				};

				coursesModule.resetBusinessError();
				expect(coursesModule.businessError.statusCode).toStrictEqual("");
				expect(coursesModule.businessError.message).toStrictEqual("");
			});
		});
	});

	describe("getters", () => {
		describe("getCoursesData", () => {
			it("should return rooms state", () => {
				const coursesModule = new CoursesModule({});
				const itemsToBeSet = [
					{
						id: "123",
						title: "Mathe",
						shortTitle: "Ma",
						displayColor: "#54616e",
						startDate: "2019-12-07T23:00:00.000Z",
						untilDate: "2020-12-16T23:00:00.000Z",
					},
					{
						id: "234",
						title: "History",
						shortTitle: "Hi",
						displayColor: "#EF6C00",
						startDate: "2015-07-31T22:00:00.000Z",
						untilDate: "2018-07-30T22:00:00.000Z",
					},
				];

				const expectedData = [
					{
						id: "123",
						title: "Mathe",
						shortTitle: "Ma",
						displayColor: "#54616e",
						startDate: "2019-12-07T23:00:00.000Z",
						untilDate: "2020-12-16T23:00:00.000Z",
						to: "/rooms/123",
					},
					{
						id: "234",
						title: "History",
						shortTitle: "Hi",
						displayColor: "#EF6C00",
						startDate: "2015-07-31T22:00:00.000Z",
						untilDate: "2018-07-30T22:00:00.000Z",
						to: "/rooms/234",
					},
				];

				coursesModule.setCourseData(itemsToBeSet as any);
				expect(coursesModule.getCoursesData).toStrictEqual(expectedData);
			});
		});

		describe("getLoading", () => {
			it("should return loading state", () => {
				const coursesModule = new CoursesModule({});

				expect(coursesModule.getLoading).not.toStrictEqual(true);
				coursesModule.setLoading(true);
				expect(coursesModule.getLoading).toStrictEqual(true);
			});
		});

		describe("getError", () => {
			it("should return error state", () => {
				const coursesModule = new CoursesModule({});
				const errorData = { message: "some error" };
				expect(coursesModule.getError).toStrictEqual(null);
				coursesModule.setError(errorData);
				expect(coursesModule.getError).toStrictEqual(errorData);
			});
		});

		describe("getCoursesId", () => {
			it("should return rooms id state", () => {
				const coursesModule = new CoursesModule({});
				const sampleId = "sample_id";
				expect(coursesModule.getCoursesId).toStrictEqual("");
				coursesModule.setCourseDataId(sampleId);
				expect(coursesModule.getCoursesId).toStrictEqual(sampleId);
			});
		});

		describe("getCourseSharingStatus", () => {
			it("should return shared course data", () => {
				const coursesModule = new CoursesModule({});
				const sharedCourseData = {
					code: "123",
					courseName: "Mathe",
					status: "success",
					message: "",
				};

				coursesModule.setSharedCourseData(sharedCourseData);
				expect(coursesModule.getCourseSharingStatus).toStrictEqual(
					sharedCourseData
				);
			});
		});

		describe("getImportedCourseId", () => {
			it("should return imported course id", () => {
				const coursesModule = new CoursesModule({});
				const sampleId = "sample_id";
				expect(coursesModule.getImportedCourseId).toStrictEqual("");
				coursesModule.setImportedCourseId(sampleId);
				expect(coursesModule.getImportedCourseId).toStrictEqual(sampleId);
			});
		});

		describe("getAllElements", () => {
			it("should return rooms-list AllElements", () => {
				const coursesModule = new CoursesModule({});
				const itemsToBeSet = [
					{
						id: "123",
						title: "Mathe",
						shortTitle: "Ma",
						displayColor: "#54616e",
						startDate: "2019-12-07T23:00:00.000Z",
						untilDate: "2020-12-16T23:00:00.000Z",
					},
					{
						id: "234",
						title: "History",
						shortTitle: "Hi",
						displayColor: "#EF6C00",
						startDate: "2015-07-31T22:00:00.000Z",
						untilDate: "2018-07-30T22:00:00.000Z",
					},
				];

				const expectedData = [
					{
						id: "123",
						title: "Mathe",
						shortTitle: "Ma",
						displayColor: "#54616e",
						startDate: "2019-12-07T23:00:00.000Z",
						untilDate: "2020-12-16T23:00:00.000Z",
						titleDate: "2019/20",
						searchText: "Mathe 2019/20",
						isArchived: true,
						to: "/rooms/123",
					},
					{
						id: "234",
						title: "History",
						shortTitle: "Hi",
						displayColor: "#EF6C00",
						startDate: "2015-07-31T22:00:00.000Z",
						untilDate: "2018-07-30T22:00:00.000Z",
						titleDate: "2015-2018",
						searchText: "History 2015-2018",
						isArchived: true,
						to: "/rooms/234",
					},
				];
				expect(coursesModule.getAllElements).toStrictEqual([]);
				coursesModule.setAllElements(itemsToBeSet);
				expect(coursesModule.getAllElements).toStrictEqual(expectedData);
			});
		});

		describe("hasCourses", () => {
			it("should return true if rooms is empty", () => {
				const coursesModule = new CoursesModule({});

				expect(coursesModule.hasCourses).toStrictEqual(false);
				coursesModule.setAllElements([]);
				expect(coursesModule.hasCourses).toStrictEqual(false);
			});

			it("should return false if rooms is not empty", () => {
				const itemsToBeSet = [
					{
						id: "123",
						title: "Mathe",
						shortTitle: "Ma",
						displayColor: "#54616e",
						startDate: "2019-12-07T23:00:00.000Z",
						untilDate: "2020-12-16T23:00:00.000Z",
					},
					{
						id: "234",
						title: "History",
						shortTitle: "Hi",
						displayColor: "#EF6C00",
						startDate: "2015-07-31T22:00:00.000Z",
						untilDate: "2018-07-30T22:00:00.000Z",
					},
				];

				const coursesModule = new CoursesModule({});

				expect(coursesModule.hasCourses).toStrictEqual(false);
				coursesModule.setAllElements(itemsToBeSet);
				expect(coursesModule.hasCourses).toStrictEqual(true);
			});
		});

		describe("hasCurrentCourses", () => {
			it("should return true if rooms is empty", () => {
				const coursesModule = new CoursesModule({});

				expect(coursesModule.hasCurrentCourses).toStrictEqual(false);
				coursesModule.setCourseData([]);
				expect(coursesModule.hasCurrentCourses).toStrictEqual(false);
			});

			it("should return false if rooms is not empty", () => {
				const itemsToBeSet = [
					{
						id: "123",
						title: "Mathe",
						shortTitle: "Ma",
						displayColor: "#54616e",
						startDate: "2019-12-07T23:00:00.000Z",
						untilDate: "2020-12-16T23:00:00.000Z",
					},
					{
						id: "234",
						title: "History",
						shortTitle: "Hi",
						displayColor: "#EF6C00",
						startDate: "2015-07-31T22:00:00.000Z",
						untilDate: "2018-07-30T22:00:00.000Z",
					},
				];

				const coursesModule = new CoursesModule({});

				expect(coursesModule.hasCurrentCourses).toStrictEqual(false);
				coursesModule.setCourseData(itemsToBeSet as any);
				expect(coursesModule.hasCurrentCourses).toStrictEqual(true);
			});
		});

		describe("getAlertData", () => {
			it("should return alert data", () => {
				const coursesModule = new CoursesModule({});
				const alertData: AlertPayload = {
					status: "success",
					text: "pages.rooms.uploadCourse.success",
					autoClose: true,
				};

				coursesModule.setAlertData(alertData);
				expect(coursesModule.getAlertData).toStrictEqual(alertData);
			});
		});
	});
});
