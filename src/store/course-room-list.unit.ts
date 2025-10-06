import * as serverApi from "../serverApi/v3/api";
import CourseRoomListModule from "./course-room-list";
import { DroppedObject, RoomsData, SharingCourseObject } from "./types/rooms";
import { apiResponseErrorFactory, axiosErrorFactory, businessErrorFactory } from "@@/tests/test-utils";

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

const mockData: serverApi.DashboardResponse = {
	id: "id_1",
	gridElements: [
		{
			id: "123",
			title: "Math 1a",
			shortTitle: "Ma",
			displayColor: "#f23f76",
			xPosition: 6,
			yPosition: 1,
			groupId: "",
			groupElements: [],
			copyingSince: "",
			isSynchronized: false,
			isLocked: false,
		},
		{
			id: "456",
			title: "Bio 12c",
			shortTitle: "Bi",
			displayColor: "#ffffff",
			xPosition: 5,
			yPosition: 2,
			groupId: "",
			groupElements: [],
			copyingSince: "",
			isSynchronized: false,
			isLocked: false,
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
					isLocked: false,
				},
				{
					id: "645",
					title: "Chemistry",
					shortTitle: "Ch",
					displayColor: "#f23f76",
					isLocked: false,
				},
				{
					id: "321",
					title: "Physics",
					shortTitle: "Ph",
					displayColor: "#f23f76",
					isLocked: false,
				},
			],
			xPosition: 3,
			yPosition: 3,
			groupId: "",
			copyingSince: "",
			isSynchronized: false,
			isLocked: false,
		},
	],
};

describe("rooms module", () => {
	describe("actions", () => {
		describe("fetch", () => {
			it("should call backend and sets state correctly", async () => {
				const mockApi = {
					dashboardControllerFindForUser: vi.fn().mockResolvedValue({ data: {} }),
				};

				vi.spyOn(serverApi, "DashboardApiFactory").mockReturnValue(
					mockApi as unknown as serverApi.DashboardApiInterface
				);

				const courseRoomListModule = new CourseRoomListModule({});

				courseRoomListModule
					.fetch({
						indicateLoading: true,
						device: "mobile",
					})
					.then(() => {
						expect(courseRoomListModule.getLoading).toBe(false);
					});

				expect(courseRoomListModule.getLoading).toBe(true);
				expect(mockApi.dashboardControllerFindForUser).toHaveBeenCalled();
			});
		});

		describe("align", () => {
			it("should call server and 'setPosition' mutation", async () => {
				const mockApi = {
					dashboardControllerMoveElement: vi.fn(() => ({
						data: { id: "42", gridElements: [] },
					})),
				};

				vi.spyOn(serverApi, "DashboardApiFactory").mockReturnValue(
					mockApi as unknown as serverApi.DashboardApiInterface
				);

				const courseRoomListModule = new CourseRoomListModule({});

				const payload: DroppedObject = {
					from: { x: 1, y: 1 },
					to: { x: 2, y: 2 },
					item: {
						id: "123",
						title: "Math 1a",
						shortTitle: "Ma",
						displayColor: "#f23f76",
						xPosition: 6,
						yPosition: 1,
						isSynchronized: false,
						groupId: "",
						groupElements: [],
						copyingSince: "",
						isLocked: false,
					},
				};
				const expectedParam = {
					from: { x: 1, y: 1 },
					to: { x: 2, y: 2 },
				};

				courseRoomListModule.align(payload).then(() => {
					expect(courseRoomListModule.getLoading).toBe(false);
				});

				expect(courseRoomListModule.getLoading).toBe(true);
				expect(mockApi.dashboardControllerMoveElement).toHaveBeenLastCalledWith("", expectedParam);
			});
		});

		describe("delete", () => {
			it("should call 'setPosition' mutation", async () => {
				// TODO: call server will be here when server ready
				const courseRoomListModule = new CourseRoomListModule({});

				const setRoomDataSpy = vi.spyOn(courseRoomListModule, "setRoomData");
				const setLoadingSpy = vi.spyOn(courseRoomListModule, "setLoading");

				await courseRoomListModule.delete("id");

				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[0][0]).toBe(true);
				expect(setRoomDataSpy).toHaveBeenCalled();
			});
		});

		describe("update", () => {
			it("should call the backend", async () => {
				const mockApi = {
					dashboardControllerPatchGroup: vi.fn((groupToPatch) => ({
						data: { ...groupToPatch },
					})),
				};
				vi.spyOn(serverApi, "DashboardApiFactory").mockReturnValue(
					mockApi as unknown as serverApi.DashboardApiInterface
				);

				const courseRoomListModule = new CourseRoomListModule({});
				const roomsData: RoomsData = {
					id: "dummyId",
					title: "dummy title",
					shortTitle: "dummy short title",
					xPosition: 3,
					yPosition: 3,
					displayColor: "#FF0000",
					isSynchronized: false,
				};
				courseRoomListModule.setRoomDataId(roomsData.id);
				await courseRoomListModule.update(roomsData);

				expect(courseRoomListModule.getLoading).toBe(false);
				expect(mockApi.dashboardControllerPatchGroup).toHaveBeenLastCalledWith(
					roomsData.id,
					roomsData.xPosition,
					roomsData.yPosition,
					{ title: roomsData.title }
				);
			});

			it("handle error", async () => {
				const mockApi = {
					dashboardControllerPatchGroup: vi.fn(() => Promise.reject(badRequestError)),
				};
				vi.spyOn(serverApi, "DashboardApiFactory").mockReturnValue(
					mockApi as unknown as serverApi.DashboardApiInterface
				);
				const courseRoomListModule = new CourseRoomListModule({});
				const roomsData: RoomsData = {
					id: "dummyId",
					title: "dummy title",
					shortTitle: "dummy short title",
					xPosition: 3,
					yPosition: 3,
					displayColor: "#FF0000",
					isSynchronized: false,
				};
				courseRoomListModule.setRoomDataId(roomsData.id);
				await courseRoomListModule.update(roomsData);

				expect(courseRoomListModule.getLoading).toBe(false);
				expect(courseRoomListModule.getBusinessError).toStrictEqual(businessError);
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
				const mockApi = { courseControllerFindForUser: vi.fn() };
				vi.spyOn(serverApi, "CoursesApiFactory").mockReturnValue(mockApi as unknown as serverApi.CoursesApiInterface);
				const courseRoomListModule = new CourseRoomListModule({});
				await courseRoomListModule.fetchAllElements();

				expect(courseRoomListModule.getLoading).toBe(false);
				expect(mockApi.courseControllerFindForUser).toHaveBeenCalledTimes(1);

				expect(mockApi.courseControllerFindForUser.mock.calls[0][0]).toStrictEqual(0); // $skip: 0
				expect(mockApi.courseControllerFindForUser.mock.calls[0][1]).toStrictEqual(100); // $limit: 100
			});

			it("handle error", () =>
				new Promise<void>((done) => {
					const mockApi = {
						courseControllerFindForUser: vi.fn(() => Promise.reject(badRequestError)),
					};
					vi.spyOn(serverApi, "CoursesApiFactory").mockReturnValue(mockApi as unknown as serverApi.CoursesApiInterface);
					const courseRoomListModule = new CourseRoomListModule({});

					courseRoomListModule.fetchAllElements().then(() => {
						expect(courseRoomListModule.getLoading).toBe(false);
						expect(courseRoomListModule.getBusinessError).toStrictEqual(businessError);
						done();
					});

					expect(courseRoomListModule.getLoading).toBe(true);
				}));
		});

		describe("confirmSharedCourseData", () => {
			it("should call the backend", async () => {
				const sharedCourseData = {
					code: "123",
					courseName: "Mathe",
					status: "success",
					message: "",
				};
				const courseRoomListModule = new CourseRoomListModule({});
				const getSharedCourseDataSpy = vi.spyOn(courseRoomListModule, "confirmSharedCourseData");
				getSharedCourseDataSpy.mockImplementation(vi.fn());

				await courseRoomListModule.confirmSharedCourseData(sharedCourseData);
				expect(getSharedCourseDataSpy.mock.calls[0][0]).toStrictEqual(sharedCourseData);
			});

			it("should call the businessError mutation", async () => {
				const sharedCourseData = {
					code: "",
					courseName: "",
					status: "",
					message: "",
				};
				const setBusinessErrorMock = vi.fn();
				const courseRoomListModule = new CourseRoomListModule({});
				courseRoomListModule.setBusinessError = setBusinessErrorMock;

				await courseRoomListModule.confirmSharedCourseData(sharedCourseData);
				expect(setBusinessErrorMock).toHaveBeenCalled();
			});
		});
	});

	describe("mutations", () => {
		describe("setRoomData", () => {
			it("should set the room data", () => {
				const courseRoomListModule = new CourseRoomListModule({});
				const roomsDataToBeChanged: serverApi.DashboardGridElementResponse[] = [
					{
						id: "someId",
						title: "exampletitle",
						shortTitle: "ex",
						displayColor: "#f23f76",
						xPosition: 2,
						yPosition: 5,
						groupId: "",
						groupElements: [],
						copyingSince: "",
						isSynchronized: false,
						isLocked: false,
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
						groupId: "",
						groupElements: [],
						copyingSince: "",
						isSynchronized: false,
						isLocked: false,
					},
				];
				expect(courseRoomListModule.getRoomsData).not.toStrictEqual(roomsDataToBeChanged);
				courseRoomListModule.setRoomData(roomsDataToBeChanged);
				expect(courseRoomListModule.roomsData).toStrictEqual(expectedData);
			});
		});

		describe("setRoomDataId", () => {
			it("should set the room data id", () => {
				const courseRoomListModule = new CourseRoomListModule({});
				const id = "sample_id";

				courseRoomListModule.setRoomDataId(id);
				expect(courseRoomListModule.gridElementsId).toStrictEqual(id);
			});
		});

		describe("setLoading", () => {
			it("should set loading", () => {
				const courseRoomListModule = new CourseRoomListModule({});
				const loadingValue = true;
				expect(courseRoomListModule.getLoading).not.toBe(loadingValue);
				courseRoomListModule.setLoading(loadingValue);
				expect(courseRoomListModule.loading).toBe(loadingValue);
			});
		});

		describe("setError", () => {
			it("should set error", () => {
				const courseRoomListModule = new CourseRoomListModule({});
				const errorData = { message: "some error" };
				expect(courseRoomListModule.getBusinessError).not.toBe(errorData);
				courseRoomListModule.setError(errorData);
				expect(courseRoomListModule.error).toBe(errorData);
			});
		});

		describe("setPosition", () => {
			it("should re-position the state", () => {
				const courseRoomListModule = new CourseRoomListModule({});
				const draggedObject: DroppedObject = {
					from: { x: 6, y: 1 },
					item: {
						id: "123",
						title: "Math 1a",
						shortTitle: "Ma",
						displayColor: "#f23f76",
						xPosition: 6,
						yPosition: 1,
						isSynchronized: false,
						groupId: "",
						groupElements: [],
						copyingSince: "",
						isLocked: false,
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
					groupId: "",
					groupElements: [],
					copyingSince: "",
					isSynchronized: false,
					isLocked: false,
				};
				courseRoomListModule.setRoomData(mockData.gridElements);
				courseRoomListModule.setPosition(draggedObject);
				expect(courseRoomListModule.roomsData[0]).toStrictEqual(expectedObject);
			});
		});

		describe("setAllElements", () => {
			it("should set the all elements data", () => {
				const courseRoomListModule = new CourseRoomListModule({});
				const itemsToBeSet: serverApi.CourseMetadataResponse[] = [
					{
						id: "123",
						title: "Mathe",
						shortTitle: "Ma",
						displayColor: "#54616e",
						startDate: "2019-12-07T23:00:00.000Z",
						untilDate: "2020-12-16T23:00:00.000Z",
						isLocked: false,
					},
					{
						id: "234",
						title: "History",
						shortTitle: "Hi",
						displayColor: "#EF6C00",
						startDate: "2015-07-31T22:00:00.000Z",
						untilDate: "2300-07-30T22:00:00.000Z",
						isLocked: false,
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
						isLocked: false,
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
						isLocked: false,
					},
				];
				courseRoomListModule.setAllElements(itemsToBeSet);
				expect(courseRoomListModule.allElements).toStrictEqual(expectedData);
			});
		});

		describe("setSharedCourseData, setImportedCourseId", () => {
			it("should set the state and imported course id", () => {
				const courseRoomListModule = new CourseRoomListModule({});
				const sharedCourseData: SharingCourseObject = {
					code: "123",
					courseName: "Mathe",
					status: "success",
					message: "",
				};
				const importedCourseId = "456789";

				courseRoomListModule.setSharedCourseData(sharedCourseData);
				courseRoomListModule.setImportedCourseId(importedCourseId);
				expect(courseRoomListModule.sharedCourseData).toStrictEqual(sharedCourseData);
				expect(courseRoomListModule.importedCourseId).toStrictEqual(importedCourseId);
			});
		});

		describe("setBusinessError", () => {
			it("should set businessError", () => {
				const courseRoomListModule = new CourseRoomListModule({});
				const businessErrorData = {
					statusCode: "400",
					message: "error",
					error: { type: "BadRequest" },
				};
				expect(courseRoomListModule.getBusinessError).not.toBe(businessErrorData);
				courseRoomListModule.setBusinessError(businessErrorData);
				expect(courseRoomListModule.businessError).toBe(businessErrorData);
			});
			it("should reset businessError", () => {
				const courseRoomListModule = new CourseRoomListModule({});
				courseRoomListModule.businessError = {
					statusCode: "400",
					message: "error",
					error: {},
				};

				courseRoomListModule.resetBusinessError();
				expect(courseRoomListModule.businessError.statusCode).toStrictEqual("");
				expect(courseRoomListModule.businessError.message).toStrictEqual("");
			});
		});
	});

	describe("getters", () => {
		describe("getRoomsData", () => {
			it("should return rooms state", () => {
				const courseRoomListModule = new CourseRoomListModule({});
				const itemsToBeSet: serverApi.DashboardGridElementResponse[] = [
					{
						id: "123",
						title: "Mathe",
						shortTitle: "Ma",
						displayColor: "#54616e",
						xPosition: 0,
						yPosition: 0,
						groupId: "",
						groupElements: [],
						copyingSince: "",
						isSynchronized: false,
						isLocked: false,
					},
					{
						id: "234",
						title: "History",
						shortTitle: "Hi",
						displayColor: "#EF6C00",
						yPosition: 0,
						groupId: "",
						groupElements: [],
						copyingSince: "",
						isSynchronized: false,
						xPosition: 0,
						isLocked: false,
					},
				];

				const expectedData = [
					{
						id: "123",
						title: "Mathe",
						shortTitle: "Ma",
						displayColor: "#54616e",
						to: "/rooms/123",
						xPosition: 0,
						yPosition: 0,
						groupId: "",
						groupElements: [],
						copyingSince: "",
						isSynchronized: false,
						isLocked: false,
					},
					{
						id: "234",
						title: "History",
						shortTitle: "Hi",
						displayColor: "#EF6C00",
						to: "/rooms/234",
						xPosition: 0,
						yPosition: 0,
						groupId: "",
						groupElements: [],
						copyingSince: "",
						isSynchronized: false,
						isLocked: false,
					},
				];

				courseRoomListModule.setRoomData(itemsToBeSet);
				expect(courseRoomListModule.getRoomsData).toStrictEqual(expectedData);
			});
		});

		describe("getLoading", () => {
			it("should return loading state", () => {
				const courseRoomListModule = new CourseRoomListModule({});

				expect(courseRoomListModule.getLoading).not.toStrictEqual(true);
				courseRoomListModule.setLoading(true);
				expect(courseRoomListModule.getLoading).toStrictEqual(true);
			});
		});

		describe("getError", () => {
			it("should return error state", () => {
				const courseRoomListModule = new CourseRoomListModule({});
				const errorData = { message: "some error" };
				expect(courseRoomListModule.getError).toStrictEqual(null);
				courseRoomListModule.setError(errorData);
				expect(courseRoomListModule.getError).toStrictEqual(errorData);
			});
		});

		describe("getRoomsId", () => {
			it("should return rooms id state", () => {
				const courseRoomListModule = new CourseRoomListModule({});
				const sampleId = "sample_id";
				expect(courseRoomListModule.getRoomsId).toStrictEqual("");
				courseRoomListModule.setRoomDataId(sampleId);
				expect(courseRoomListModule.getRoomsId).toStrictEqual(sampleId);
			});
		});

		describe("getCourseSharingStatus", () => {
			it("should return shared course data", () => {
				const courseRoomListModule = new CourseRoomListModule({});
				const sharedCourseData = {
					code: "123",
					courseName: "Mathe",
					status: "success",
					message: "",
				};

				courseRoomListModule.setSharedCourseData(sharedCourseData);
				expect(courseRoomListModule.getCourseSharingStatus).toStrictEqual(sharedCourseData);
			});
		});

		describe("getImportedCourseId", () => {
			it("should return imported course id", () => {
				const courseRoomListModule = new CourseRoomListModule({});
				const sampleId = "sample_id";
				expect(courseRoomListModule.getImportedCourseId).toStrictEqual("");
				courseRoomListModule.setImportedCourseId(sampleId);
				expect(courseRoomListModule.getImportedCourseId).toStrictEqual(sampleId);
			});
		});

		describe("getAllElements", () => {
			it("should return courses-list AllElements", () => {
				const courseRoomListModule = new CourseRoomListModule({});
				const itemsToBeSet: serverApi.CourseMetadataResponse[] = [
					{
						id: "123",
						title: "Mathe",
						shortTitle: "Ma",
						displayColor: "#54616e",
						startDate: "2019-12-07T23:00:00.000Z",
						untilDate: "2020-12-16T23:00:00.000Z",
						isLocked: false,
					},
					{
						id: "234",
						title: "History",
						shortTitle: "Hi",
						displayColor: "#EF6C00",
						startDate: "2015-07-31T22:00:00.000Z",
						untilDate: "2018-07-30T22:00:00.000Z",
						isLocked: false,
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
						isLocked: false,
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
						isLocked: false,
					},
				];
				expect(courseRoomListModule.getAllElements).toStrictEqual([]);
				courseRoomListModule.setAllElements(itemsToBeSet);
				expect(courseRoomListModule.getAllElements).toStrictEqual(expectedData);
			});
		});

		describe("hasRooms", () => {
			it("should return true if rooms is empty", () => {
				const courseRoomListModule = new CourseRoomListModule({});

				expect(courseRoomListModule.hasRooms).toStrictEqual(false);
				courseRoomListModule.setAllElements([]);
				expect(courseRoomListModule.hasRooms).toStrictEqual(false);
			});

			it("should return false if rooms is not empty", () => {
				const itemsToBeSet: serverApi.CourseMetadataResponse[] = [
					{
						id: "123",
						title: "Mathe",
						shortTitle: "Ma",
						displayColor: "#54616e",
						startDate: "2019-12-07T23:00:00.000Z",
						untilDate: "2020-12-16T23:00:00.000Z",
						isLocked: false,
					},
					{
						id: "234",
						title: "History",
						shortTitle: "Hi",
						displayColor: "#EF6C00",
						startDate: "2015-07-31T22:00:00.000Z",
						untilDate: "2018-07-30T22:00:00.000Z",
						isLocked: false,
					},
				];

				const courseRoomListModule = new CourseRoomListModule({});

				expect(courseRoomListModule.hasRooms).toStrictEqual(false);
				courseRoomListModule.setAllElements(itemsToBeSet);
				expect(courseRoomListModule.hasRooms).toStrictEqual(true);
			});
		});

		describe("hasCurrentRooms", () => {
			it("should return true if rooms is empty", () => {
				const courseRoomListModule = new CourseRoomListModule({});

				expect(courseRoomListModule.hasCurrentRooms).toStrictEqual(false);
				courseRoomListModule.setRoomData([]);
				expect(courseRoomListModule.hasCurrentRooms).toStrictEqual(false);
			});

			it("should return false if rooms is not empty", () => {
				const itemsToBeSet: serverApi.DashboardGridElementResponse[] = [
					{
						id: "123",
						title: "Mathe",
						shortTitle: "Ma",
						displayColor: "#54616e",
						xPosition: 0,
						yPosition: 0,
						groupId: "",
						groupElements: [],
						copyingSince: "",
						isSynchronized: false,
						isLocked: false,
					},
					{
						id: "234",
						title: "History",
						shortTitle: "Hi",
						displayColor: "#EF6C00",
						xPosition: 0,
						yPosition: 0,
						groupId: "",
						groupElements: [],
						copyingSince: "",
						isSynchronized: false,
						isLocked: false,
					},
				];

				const courseRoomListModule = new CourseRoomListModule({});

				expect(courseRoomListModule.hasCurrentRooms).toStrictEqual(false);
				courseRoomListModule.setRoomData(itemsToBeSet);
				expect(courseRoomListModule.hasCurrentRooms).toStrictEqual(true);
			});
		});
	});
});
