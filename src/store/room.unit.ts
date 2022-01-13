import { Room } from "./room";
import * as serverApi from "../serverApi/v3/api";
import { initializeAxios } from "../utils/api";
import { NuxtAxiosInstance } from "@nuxtjs/axios";
// import { RoomData } from "./types/room";

let receivedRequests: any[] = [];
let getRequestReturn: any = {};

const axiosInitializer = () => {
	initializeAxios({
		$get: async (path: string) => {
			receivedRequests.push({ path });
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
	roomId: "123",
	title: "Sample Course",
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
		{
			type: "task",
			content: {
				courseName: "Mathe",
				id: "59cce4c3c6abf042248e888e",
				name: "Private Aufgabe von Cord - mit Kurs, offen",
				createdAt: "2017-09-28T12:02:11.432Z",
				updatedAt: "2017-09-28T12:02:11.432Z",
				status: {
					submitted: 0,
					maxSubmissions: 2,
					graded: 0,
					isDraft: true,
					isSubstitutionTeacher: false,
				},
				availableDate: "2017-09-28T12:00:00.000Z",
				duedate: "2300-06-28T13:00:00.000Z",
				displayColor: "#54616e",
				description: "",
			},
		},
		{
			type: "task",
			content: {
				courseName: "",
				id: "59cce4ebc6abf042248e888f",
				name: "Private Aufgabe Cord - ohne Kurs",
				createdAt: "2017-09-28T12:02:51.562Z",
				updatedAt: "2017-09-28T12:02:51.562Z",
				status: {
					submitted: 0,
					maxSubmissions: 0,
					graded: 0,
					isDraft: true,
					isSubstitutionTeacher: false,
				},
				availableDate: "2017-09-28T12:02:51.553Z",
				duedate: "2026-09-28T12:02:51.553Z",
				displayColor: "#ACACAC",
				description: "",
			},
		},
		{
			type: "task",
			content: {
				courseName: "Mathe",
				id: "59cce352c6abf042248e888c",
				name: "zu archivierende Aufgabe von Marla",
				createdAt: "2017-09-28T11:56:02.897Z",
				updatedAt: "2017-09-28T11:56:02.897Z",
				status: {
					submitted: 0,
					maxSubmissions: 2,
					graded: 0,
					isDraft: true,
					isSubstitutionTeacher: false,
				},
				availableDate: "2017-09-28T12:00:00.000Z",
				duedate: "2020-09-29T13:00:00.000Z",
				displayColor: "#54616e",
				description: "",
			},
		},
		{
			type: "task",
			content: {
				courseName: "Mathe",
				id: "59cce2c61113d1132c98dc06",
				name: "Private Aufgabe von Marla - mit Kurs, abgelaufen",
				createdAt: "2017-09-28T11:49:39.924Z",
				updatedAt: "2017-09-28T11:49:39.924Z",
				status: {
					submitted: 0,
					maxSubmissions: 2,
					graded: 0,
					isDraft: true,
					isSubstitutionTeacher: false,
				},
				availableDate: "2016-09-20T11:00:00.000Z",
				duedate: "2017-07-28T13:00:00.000Z",
				displayColor: "#54616e",
				description: "",
			},
		},
	],
};

axiosInitializer();

describe("room module", () => {
	describe("actions", () => {
		describe("fetch", () => {
			beforeEach(() => {
				receivedRequests = [];
			});
			it("should call backend and sets state correctly", async () => {
				const mockApi = {
					dashboardControllerFindForUser: jest.fn(),
				};

				jest
					.spyOn(serverApi, "DashboardApiFactory")
					.mockReturnValue(
						mockApi as unknown as serverApi.DashboardApiInterface
					);

				const roomModule = new Room({});
				await roomModule.fetchTasks("123");
				// roomModule.fetchTasks("123").then(() => {
				// 	expect(roomModule.getLoading).toBe(false);
				// });

				//expect(roomModule.getLoading).toBe(true);
				expect(roomModule.roomData).toStrictEqual(mockData);
			});
		});
		// describe("align", () => {
		// 	beforeEach(() => {
		// 		receivedRequests = [];
		// 	});
		// 	it("should call server and 'setPosition' mutation", async () => {
		// 		const mockApi = {
		// 			dashboardControllerMoveElement: jest.fn((align) => ({
		// 				data: { ...align },
		// 			})),
		// 		};

		// 		jest
		// 			.spyOn(serverApi, "DashboardApiFactory")
		// 			.mockReturnValue(
		// 				mockApi as unknown as serverApi.DashboardApiInterface
		// 			);

		// 		const roomsModule = new Rooms({});

		// 		const payload = {
		// 			from: { x: 1, y: 1 },
		// 			to: { x: 2, y: 2 },
		// 			item: {},
		// 		};
		// 		const expectedParam = {
		// 			from: { x: 1, y: 1 },
		// 			to: { x: 2, y: 2 },
		// 		};

		// 		roomsModule.align(payload).then(() => {
		// 			expect(roomsModule.getLoading).toBe(false);
		// 		});

		// 		expect(roomsModule.getLoading).toBe(true);
		// 		expect(mockApi.dashboardControllerMoveElement).toHaveBeenLastCalledWith(
		// 			"",
		// 			expectedParam
		// 		);
		// 	});
		// });
		// describe("delete", () => {
		// 	beforeEach(() => {
		// 		receivedRequests = [];
		// 	});
		// 	it("should call 'setPosition' mutation", async () => {
		// 		// TODO: call server will be here when server ready
		// 		const roomsModule = new Rooms({});

		// 		const setRoomDataSpy = jest.spyOn(roomsModule, "setRoomData");
		// 		const setLoadingSpy = jest.spyOn(roomsModule, "setLoading");

		// 		await roomsModule.delete("id");

		// 		expect(setLoadingSpy).toHaveBeenCalled();
		// 		expect(setLoadingSpy.mock.calls[0][0]).toBe(true);
		// 		expect(setRoomDataSpy).toHaveBeenCalled();
		// 	});
		// });

		// describe("update", () => {
		// 	beforeEach(() => {
		// 		receivedRequests = [];
		// 	});
		// 	it("should call the backend", async (done) => {
		// 		const mockApi = {
		// 			dashboardControllerPatchGroup: jest.fn((groupToPatch) => ({
		// 				data: { ...groupToPatch },
		// 			})),
		// 		};
		// 		jest
		// 			.spyOn(serverApi, "DashboardApiFactory")
		// 			.mockReturnValue(
		// 				mockApi as unknown as serverApi.DashboardApiInterface
		// 			);
		// 		const roomsModule = new Rooms({});

		// 		const roomsData: RoomsData = {
		// 			id: "dummyId",
		// 			title: "dummy title",
		// 			shortTitle: "dummy short title",
		// 			xPosition: 3,
		// 			yPosition: 3,
		// 			displayColor: "#FF0000",
		// 		};

		// 		roomsModule.update(roomsData).then(() => {
		// 			expect(roomsModule.getLoading).toBe(false);
		// 			done();
		// 		});
		// 		expect(roomsModule.getLoading).toBe(true);
		// 		expect(mockApi.dashboardControllerPatchGroup).toHaveBeenLastCalledWith(
		// 			roomsData
		// 		);
		// 	});

		// 	it("should update the state", async (done) => {
		// 		const mockApi = {
		// 			dashboardControllerPatchGroup: jest.fn((groupToPatch) => ({
		// 				data: { ...groupToPatch },
		// 			})),
		// 		};
		// 		jest
		// 			.spyOn(serverApi, "DashboardApiFactory")
		// 			.mockReturnValue(
		// 				mockApi as unknown as serverApi.DashboardApiInterface
		// 			);
		// 		const roomsModule = new Rooms({});

		// 		const roomsData: RoomsData = {
		// 			id: "dummyId",
		// 			title: "dummy title",
		// 			shortTitle: "dummy short title",
		// 			xPosition: 3,
		// 			yPosition: 3,
		// 			displayColor: "#FF0000",
		// 		};

		// 		roomsModule.update(roomsData).then(() => {
		// 			expect(roomsModule.getLoading).toBe(false);
		// 			done();
		// 		});
		// 		expect(roomsModule.getLoading).toBe(true);
		// 		expect(mockApi.dashboardControllerPatchGroup).toHaveBeenLastCalledWith(
		// 			roomsData
		// 		);
		// 		expect(roomsModule.getRoomsData[3].title).toBe(roomsData.title);
		// 	});
		// 	it("handle error", async (done) => {
		// 		const error = { status: 418, statusText: "I'm a teapot" };
		// 		const mockApi = {
		// 			dashboardControllerPatchGroup: jest.fn(() =>
		// 				Promise.reject({ ...error })
		// 			),
		// 		};
		// 		jest
		// 			.spyOn(serverApi, "DashboardApiFactory")
		// 			.mockReturnValue(
		// 				mockApi as unknown as serverApi.DashboardApiInterface
		// 			);
		// 		const roomsModule = new Rooms({});

		// 		const roomsData: RoomsData = {
		// 			id: "dummyId",
		// 			title: "dummy title",
		// 			shortTitle: "dummy short title",
		// 			xPosition: 3,
		// 			yPosition: 3,
		// 			displayColor: "#FF0000",
		// 		};

		// 		roomsModule.update(roomsData).then(() => {
		// 			expect(roomsModule.getLoading).toBe(false);
		// 			expect(roomsModule.getError).toStrictEqual({ ...error });
		// 			done();
		// 		});
		// 		expect(roomsModule.getLoading).toBe(true);
		// 		expect(mockApi.dashboardControllerPatchGroup).toHaveBeenLastCalledWith(
		// 			roomsData
		// 		);
		// 	});
		// });
		// describe("fetchAllElements", () => {
		// 	beforeEach(() => {
		// 		receivedRequests = [];
		// 	});

		// 	it("should call the backend", async (done) => {
		// 		const mockApi = {
		// 			courseControllerFindForUser: jest.fn((fetchCourses) => ({
		// 				data: { ...fetchCourses },
		// 			})),
		// 		};
		// 		jest
		// 			.spyOn(serverApi, "CoursesApiFactory")
		// 			.mockReturnValue(mockApi as unknown as serverApi.CoursesApiInterface);
		// 		const roomsModule = new Rooms({});

		// 		roomsModule.fetchAllElements().then(() => {
		// 			expect(roomsModule.getLoading).toBe(false);
		// 			done();
		// 		});
		// 		expect(roomsModule.getLoading).toBe(true);
		// 		expect(mockApi.courseControllerFindForUser).toHaveBeenCalled();
		// 		expect(mockApi.courseControllerFindForUser.mock.calls[0]).toStrictEqual(
		// 			0
		// 		); // $skip: 0
		// 		expect(mockApi.courseControllerFindForUser.mock.calls[1]).toStrictEqual(
		// 			100
		// 		); // $limit: 100
		// 	});

		// 	it("handle error", async (done) => {
		// 		const error = { status: 418, statusText: "I'm not a teapot" };
		// 		const mockApi = {
		// 			courseControllerFindForUser: jest.fn(() =>
		// 				Promise.reject({ ...error })
		// 			),
		// 		};
		// 		jest
		// 			.spyOn(serverApi, "CoursesApiFactory")
		// 			.mockReturnValue(mockApi as unknown as serverApi.CoursesApiInterface);
		// 		const roomsModule = new Rooms({});

		// 		roomsModule.fetchAllElements().then(() => {
		// 			expect(roomsModule.getLoading).toBe(false);
		// 			expect(roomsModule.getError).toStrictEqual({ ...error });
		// 			done();
		// 		});

		// 		expect(roomsModule.getLoading).toBe(true);
		// 	});
		// });
	});

	describe("mutations", () => {
		describe("setRoomData", () => {
			it("should set the room data", () => {
				const roomModule = new Room({});
				const expectedData = {
					id: "123",
					courseName: "Sample Course",
					displayColor: "black",
					tasks: [
						{
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
					],
				};

				expect(roomModule.getRoomData).not.toStrictEqual(expectedData);
				roomModule.setRoomData(expectedData as any);
				expect(roomModule.roomData).toStrictEqual(expectedData);
			});
		});

		// describe("setRoomDataId", () => {
		// 	it("should set the room data id", () => {
		// 		const roomsModule = new Rooms({});
		// 		const id = "sample_id";

		// 		roomsModule.setRoomDataId(id);
		// 		expect(roomsModule.gridElementsId).toStrictEqual(id);
		// 	});
		// });

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

		// describe("setPosition", () => {
		// 	it("should re-position the state", () => {
		// 		const roomsModule = new Rooms({});
		// 		const draggedObject = {
		// 			from: { x: 6, y: 1 },
		// 			item: {
		// 				id: "123",
		// 				title: "Math 1a",
		// 				shortTitle: "Ma",
		// 				displayColor: "#f23f76",
		// 				xPosition: 6,
		// 				yPosition: 1,
		// 			},
		// 			to: { x: 5, y: 2 },
		// 		};
		// 		const expectedObject = {
		// 			id: "123",
		// 			title: "Math 1a",
		// 			shortTitle: "Ma",
		// 			displayColor: "#f23f76",
		// 			xPosition: 5,
		// 			yPosition: 2,
		// 			href: "/courses/123",
		// 		};
		// 		roomsModule.setRoomData(mockData.gridElements as any);
		// 		roomsModule.setPosition(draggedObject);
		// 		expect(roomsModule.roomsData[0]).toStrictEqual(expectedObject);
		// 	});
		// });

		// describe("setAllElements", () => {
		// 	it("should set the all elements data", () => {
		// 		const roomsModule = new Rooms({});
		// 		const itemsToBeSet = [
		// 			{
		// 				id: "123",
		// 				title: "Mathe",
		// 				shortTitle: "Ma",
		// 				displayColor: "#54616e",
		// 				startDate: "2019-12-07T23:00:00.000Z",
		// 				untilDate: "2020-12-16T23:00:00.000Z",
		// 			},
		// 			{
		// 				id: "234",
		// 				title: "History",
		// 				shortTitle: "Hi",
		// 				displayColor: "#EF6C00",
		// 				startDate: "2015-07-31T22:00:00.000Z",
		// 				untilDate: "2018-07-30T22:00:00.000Z",
		// 			},
		// 		];

		// 		const expectedData = [
		// 			{
		// 				id: "123",
		// 				title: "Mathe",
		// 				shortTitle: "Ma",
		// 				displayColor: "#54616e",
		// 				startDate: "2019-12-07T23:00:00.000Z",
		// 				untilDate: "2020-12-16T23:00:00.000Z",
		// 				titleDate: "2019/20",
		// 				searchText: "Mathe 2019/20",
		// 				isArchived: true,
		// 				href: "/courses/123",
		// 			},
		// 			{
		// 				id: "234",
		// 				title: "History",
		// 				shortTitle: "Hi",
		// 				displayColor: "#EF6C00",
		// 				startDate: "2015-07-31T22:00:00.000Z",
		// 				untilDate: "2018-07-30T22:00:00.000Z",
		// 				titleDate: "2015-2018",
		// 				searchText: "History 2015-2018",
		// 				isArchived: true,
		// 				href: "/courses/234",
		// 			},
		// 		];
		// 		roomsModule.setAllElements(itemsToBeSet);
		// 		expect(roomsModule.allElements).toStrictEqual(expectedData);
		// 	});
		// });
	});

	// describe("getters", () => {
	// 	describe("getRoomsData", () => {
	// 		it("should return rooms state", () => {
	// 			const roomsModule = new Rooms({});
	// 			const itemsToBeSet = [
	// 				{
	// 					id: "123",
	// 					title: "Mathe",
	// 					shortTitle: "Ma",
	// 					displayColor: "#54616e",
	// 					startDate: "2019-12-07T23:00:00.000Z",
	// 					untilDate: "2020-12-16T23:00:00.000Z",
	// 				},
	// 				{
	// 					id: "234",
	// 					title: "History",
	// 					shortTitle: "Hi",
	// 					displayColor: "#EF6C00",
	// 					startDate: "2015-07-31T22:00:00.000Z",
	// 					untilDate: "2018-07-30T22:00:00.000Z",
	// 				},
	// 			];

	// 			const expectedData = [
	// 				{
	// 					id: "123",
	// 					title: "Mathe",
	// 					shortTitle: "Ma",
	// 					displayColor: "#54616e",
	// 					startDate: "2019-12-07T23:00:00.000Z",
	// 					untilDate: "2020-12-16T23:00:00.000Z",
	// 					href: "/courses/123",
	// 				},
	// 				{
	// 					id: "234",
	// 					title: "History",
	// 					shortTitle: "Hi",
	// 					displayColor: "#EF6C00",
	// 					startDate: "2015-07-31T22:00:00.000Z",
	// 					untilDate: "2018-07-30T22:00:00.000Z",
	// 					href: "/courses/234",
	// 				},
	// 			];

	// 			roomsModule.setRoomData(itemsToBeSet as any);
	// 			expect(roomsModule.getRoomsData).toStrictEqual(expectedData);
	// 		});
	// 	});

	// 	describe("getLoading", () => {
	// 		it("should return loading state", () => {
	// 			const roomsModule = new Rooms({});

	// 			expect(roomsModule.getLoading).not.toStrictEqual(true);
	// 			roomsModule.setLoading(true);
	// 			expect(roomsModule.getLoading).toStrictEqual(true);
	// 		});
	// 	});

	// 	describe("getError", () => {
	// 		it("should return error state", () => {
	// 			const roomsModule = new Rooms({});
	// 			const errorData = { message: "some error" };
	// 			expect(roomsModule.getError).toStrictEqual(null);
	// 			roomsModule.setError(errorData);
	// 			expect(roomsModule.getError).toStrictEqual(errorData);
	// 		});
	// 	});

	// 	describe("getRoomsId", () => {
	// 		it("should return rooms id state", () => {
	// 			const roomsModule = new Rooms({});
	// 			const sampleId = "sample_id";
	// 			expect(roomsModule.getRoomsId).toStrictEqual("");
	// 			roomsModule.setRoomDataId(sampleId);
	// 			expect(roomsModule.getRoomsId).toStrictEqual(sampleId);
	// 		});
	// 	});

	// 	describe("getAllElements", () => {
	// 		it("should return rooms-list AllElements", () => {
	// 			const roomsModule = new Rooms({});
	// 			const itemsToBeSet = [
	// 				{
	// 					id: "123",
	// 					title: "Mathe",
	// 					shortTitle: "Ma",
	// 					displayColor: "#54616e",
	// 					startDate: "2019-12-07T23:00:00.000Z",
	// 					untilDate: "2020-12-16T23:00:00.000Z",
	// 				},
	// 				{
	// 					id: "234",
	// 					title: "History",
	// 					shortTitle: "Hi",
	// 					displayColor: "#EF6C00",
	// 					startDate: "2015-07-31T22:00:00.000Z",
	// 					untilDate: "2018-07-30T22:00:00.000Z",
	// 				},
	// 			];

	// 			const expectedData = [
	// 				{
	// 					id: "123",
	// 					title: "Mathe",
	// 					shortTitle: "Ma",
	// 					displayColor: "#54616e",
	// 					startDate: "2019-12-07T23:00:00.000Z",
	// 					untilDate: "2020-12-16T23:00:00.000Z",
	// 					titleDate: "2019/20",
	// 					searchText: "Mathe 2019/20",
	// 					isArchived: true,
	// 					href: "/courses/123",
	// 				},
	// 				{
	// 					id: "234",
	// 					title: "History",
	// 					shortTitle: "Hi",
	// 					displayColor: "#EF6C00",
	// 					startDate: "2015-07-31T22:00:00.000Z",
	// 					untilDate: "2018-07-30T22:00:00.000Z",
	// 					titleDate: "2015-2018",
	// 					searchText: "History 2015-2018",
	// 					isArchived: true,
	// 					href: "/courses/234",
	// 				},
	// 			];
	// 			expect(roomsModule.getAllElements).toStrictEqual([]);
	// 			roomsModule.setAllElements(itemsToBeSet);
	// 			expect(roomsModule.getAllElements).toStrictEqual(expectedData);
	// 		});
	// 	});
	// });
});
