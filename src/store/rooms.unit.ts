import RoomsModule from "./rooms";
import * as serverApi from "../serverApi/v3/api";
import { initializeAxios } from "../utils/api";
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { RoomsData } from "./types/rooms";

let receivedRequests: any[] = [];
let getRequestReturn: any = {};

const axiosInitializer = () => {
	initializeAxios({
		$get: async (path: string, data?: object) => {
			receivedRequests.push({ path });
			receivedRequests.push({ data });
			return getRequestReturn;
		},
		$post: async (path: string) => {},
		$patch: async (path: string, params: {}) => {
			receivedRequests.push({ path });
			receivedRequests.push({ params });
			return getRequestReturn;
		},
	} as NuxtAxiosInstance);
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
					dashboardControllerFindForUser: jest.fn(),
				};

				jest
					.spyOn(serverApi, "DashboardApiFactory")
					.mockReturnValue(
						mockApi as unknown as serverApi.DashboardApiInterface
					);

				const roomsModule = new RoomsModule({});

				roomsModule.fetch("mobile").then(() => {
					expect(roomsModule.getLoading).toBe(false);
				});

				expect(roomsModule.getLoading).toBe(true);
				expect(mockApi.dashboardControllerFindForUser).toHaveBeenCalled();
			});
		});

		describe("align", () => {
			it("should call server and 'setPosition' mutation", async () => {
				const mockApi = {
					dashboardControllerMoveElement: jest.fn((align) => ({
						data: { ...align },
					})),
				};

				jest
					.spyOn(serverApi, "DashboardApiFactory")
					.mockReturnValue(
						mockApi as unknown as serverApi.DashboardApiInterface
					);

				const roomsModule = new RoomsModule({});

				const payload = {
					from: { x: 1, y: 1 },
					to: { x: 2, y: 2 },
					item: {},
				};
				const expectedParam = {
					from: { x: 1, y: 1 },
					to: { x: 2, y: 2 },
				};

				roomsModule.align(payload).then(() => {
					expect(roomsModule.getLoading).toBe(false);
				});

				expect(roomsModule.getLoading).toBe(true);
				expect(mockApi.dashboardControllerMoveElement).toHaveBeenLastCalledWith(
					"",
					expectedParam
				);
			});
		});

		describe("delete", () => {
			it("should call 'setPosition' mutation", async () => {
				// TODO: call server will be here when server ready
				const roomsModule = new RoomsModule({});

				const setRoomDataSpy = jest.spyOn(roomsModule, "setRoomData");
				const setLoadingSpy = jest.spyOn(roomsModule, "setLoading");

				await roomsModule.delete("id");

				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[0][0]).toBe(true);
				expect(setRoomDataSpy).toHaveBeenCalled();
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

				const roomsModule = new RoomsModule({});
				const roomsData: RoomsData = {
					id: "dummyId",
					title: "dummy title",
					shortTitle: "dummy short title",
					xPosition: 3,
					yPosition: 3,
					displayColor: "#FF0000",
				};
				roomsModule.setRoomDataId(roomsData.id);
				await roomsModule.update(roomsData);

				expect(roomsModule.getLoading).toBe(false);
				expect(mockApi.dashboardControllerPatchGroup).toHaveBeenLastCalledWith(
					roomsData.id,
					roomsData.xPosition,
					roomsData.yPosition,
					{ title: roomsData.title }
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
				const roomsModule = new RoomsModule({});
				const roomsData: RoomsData = {
					id: "dummyId",
					title: "dummy title",
					shortTitle: "dummy short title",
					xPosition: 3,
					yPosition: 3,
					displayColor: "#FF0000",
				};
				roomsModule.setRoomDataId(roomsData.id);
				await roomsModule.update(roomsData);

				expect(roomsModule.getLoading).toBe(false);
				expect(roomsModule.getError).toStrictEqual({ ...error });
				expect(mockApi.dashboardControllerPatchGroup).toHaveBeenLastCalledWith(
					roomsData.id,
					roomsData.xPosition,
					roomsData.yPosition,
					{ title: roomsData.title }
				);
			});
		});

		describe("fetchAllElements", () => {
			it("should call the backend", async () => {
				const mockApi = { courseControllerFindForUser: jest.fn() };
				jest
					.spyOn(serverApi, "CoursesApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.CoursesApiInterface);
				const roomsModule = new RoomsModule({});
				await roomsModule.fetchAllElements();

				expect(roomsModule.getLoading).toBe(false);
				expect(mockApi.courseControllerFindForUser).toHaveBeenCalledTimes(1);

				expect(
					mockApi.courseControllerFindForUser.mock.calls[0][0]
				).toStrictEqual(0); // $skip: 0
				expect(
					mockApi.courseControllerFindForUser.mock.calls[0][1]
				).toStrictEqual(100); // $limit: 100
			});

			it("handle error", async (done) => {
				const error = { status: 418, statusText: "I'm not a teapot" };
				const mockApi = {
					courseControllerFindForUser: jest.fn(() =>
						Promise.reject({ ...error })
					),
				};
				jest
					.spyOn(serverApi, "CoursesApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.CoursesApiInterface);
				const roomsModule = new RoomsModule({});

				roomsModule.fetchAllElements().then(() => {
					expect(roomsModule.getLoading).toBe(false);
					expect(roomsModule.getError).toStrictEqual({ ...error });
					done();
				});

				expect(roomsModule.getLoading).toBe(true);
			});
		});
		describe("getSharedCourseData", () => {
			it("should call the backend", async () => {
				const roomsModule = new RoomsModule({});
				const getSharedCourseDataSpy = jest.spyOn(
					roomsModule,
					"getSharedCourseData"
				);
				await roomsModule.getSharedCourseData("sampleCode");

				expect(receivedRequests[0].path).toStrictEqual("/v1/courses-share");
				expect(receivedRequests[1].data.params.shareToken).toStrictEqual(
					"sampleCode"
				);
				expect(getSharedCourseDataSpy.mock.calls[0][0]).toStrictEqual(
					"sampleCode"
				);
			}, 1000);
		});

		describe("confirmSharedCourseData", () => {
			it("should call the backend", async () => {
				const sharedCourseData = {
					code: "123",
					courseName: "Mathe",
					status: "success",
					message: "",
				};
				const roomsModule = new RoomsModule({});
				const getSharedCourseDataSpy = jest.spyOn(
					roomsModule,
					"confirmSharedCourseData"
				);
				getSharedCourseDataSpy.mockImplementation();

				await roomsModule.confirmSharedCourseData(sharedCourseData);
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
				const roomsModule = new RoomsModule({});
				roomsModule.setBusinessError = setBusinessErrorMock;

				await roomsModule.confirmSharedCourseData(sharedCourseData);
				expect(setBusinessErrorMock).toHaveBeenCalled();
			});
		});
	});

	describe("mutations", () => {
		describe("setRoomData", () => {
			it("should set the room data", () => {
				const roomsModule = new RoomsModule({});
				const roomsDataToBeChanged = [
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
						href: "/courses/someId",
					},
				];
				expect(roomsModule.getRoomsData).not.toStrictEqual(
					roomsDataToBeChanged
				);
				roomsModule.setRoomData(roomsDataToBeChanged as any);
				expect(roomsModule.roomsData).toStrictEqual(expectedData);
			});
		});

		describe("setRoomDataId", () => {
			it("should set the room data id", () => {
				const roomsModule = new RoomsModule({});
				const id = "sample_id";

				roomsModule.setRoomDataId(id);
				expect(roomsModule.gridElementsId).toStrictEqual(id);
			});
		});

		describe("setLoading", () => {
			it("should set loading", () => {
				const roomsModule = new RoomsModule({});
				const loadingValue = true;
				expect(roomsModule.getLoading).not.toBe(loadingValue);
				roomsModule.setLoading(loadingValue);
				expect(roomsModule.loading).toBe(loadingValue);
			});
		});

		describe("setError", () => {
			it("should set error", () => {
				const roomsModule = new RoomsModule({});
				const errorData = { message: "some error" };
				expect(roomsModule.getError).not.toBe(errorData);
				roomsModule.setError(errorData);
				expect(roomsModule.error).toBe(errorData);
			});
		});

		describe("setPosition", () => {
			it("should re-position the state", () => {
				const roomsModule = new RoomsModule({});
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
					href: "/courses/123",
				};
				roomsModule.setRoomData(mockData.gridElements as any);
				roomsModule.setPosition(draggedObject);
				expect(roomsModule.roomsData[0]).toStrictEqual(expectedObject);
			});
		});

		describe("setAllElements", () => {
			it("should set the all elements data", () => {
				const roomsModule = new RoomsModule({});
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
						href: "/courses/123",
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
						href: "/courses/234",
					},
				];
				roomsModule.setAllElements(itemsToBeSet);
				expect(roomsModule.allElements).toStrictEqual(expectedData);
			});

			describe("setSharedCourseData, setImportedCourseId", () => {
				it("should set the state", () => {
					const roomsModule = new RoomsModule({});
					const sharedCourseData = {
						code: "123",
						courseName: "Mathe",
						status: "success",
						message: "",
					};
					const importedCourseId = "456789";

					roomsModule.setSharedCourseData(sharedCourseData);
					roomsModule.setImportedCourseId(importedCourseId);
					expect(roomsModule.sharedCourseData).toStrictEqual(sharedCourseData);
					expect(roomsModule.importedCourseId).toStrictEqual(importedCourseId);
				});
			});
		});

		describe("setBusinessError", () => {
			it("should set businessError", () => {
				const roomsModule = new RoomsModule({});
				const businessErrorData = {
					statusCode: "400",
					message: "error",
					error: { type: "BadRequest" },
				};
				expect(roomsModule.getBusinessError).not.toBe(businessErrorData);
				roomsModule.setBusinessError(businessErrorData);
				expect(roomsModule.businessError).toBe(businessErrorData);
			});
			it("should reset businessError", () => {
				const roomsModule = new RoomsModule({});
				roomsModule.businessError = {
					statusCode: "400",
					message: "error",
					error: {},
				};

				roomsModule.resetBusinessError();
				expect(roomsModule.businessError.statusCode).toStrictEqual("");
				expect(roomsModule.businessError.message).toStrictEqual("");
			});
		});
	});

	describe("getters", () => {
		describe("getRoomsData", () => {
			it("should return rooms state", () => {
				const roomsModule = new RoomsModule({});
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
						href: "/courses/123",
					},
					{
						id: "234",
						title: "History",
						shortTitle: "Hi",
						displayColor: "#EF6C00",
						startDate: "2015-07-31T22:00:00.000Z",
						untilDate: "2018-07-30T22:00:00.000Z",
						href: "/courses/234",
					},
				];

				roomsModule.setRoomData(itemsToBeSet as any);
				expect(roomsModule.getRoomsData).toStrictEqual(expectedData);
			});
		});

		describe("getLoading", () => {
			it("should return loading state", () => {
				const roomsModule = new RoomsModule({});

				expect(roomsModule.getLoading).not.toStrictEqual(true);
				roomsModule.setLoading(true);
				expect(roomsModule.getLoading).toStrictEqual(true);
			});
		});

		describe("getError", () => {
			it("should return error state", () => {
				const roomsModule = new RoomsModule({});
				const errorData = { message: "some error" };
				expect(roomsModule.getError).toStrictEqual(null);
				roomsModule.setError(errorData);
				expect(roomsModule.getError).toStrictEqual(errorData);
			});
		});

		describe("getRoomsId", () => {
			it("should return rooms id state", () => {
				const roomsModule = new RoomsModule({});
				const sampleId = "sample_id";
				expect(roomsModule.getRoomsId).toStrictEqual("");
				roomsModule.setRoomDataId(sampleId);
				expect(roomsModule.getRoomsId).toStrictEqual(sampleId);
			});
		});

		describe("getAllElements", () => {
			it("should return rooms-list AllElements", () => {
				const roomsModule = new RoomsModule({});
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
						href: "/courses/123",
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
						href: "/courses/234",
					},
				];
				expect(roomsModule.getAllElements).toStrictEqual([]);
				roomsModule.setAllElements(itemsToBeSet);
				expect(roomsModule.getAllElements).toStrictEqual(expectedData);
			});
		});
	});
});
