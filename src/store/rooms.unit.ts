import { Rooms, RoomsData } from "./rooms";
import * as serverApi from "../serverApi/v3/api";
import { initializeAxios } from "../utils/api";
import { NuxtAxiosInstance } from "@nuxtjs/axios";

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
	],
};

axiosInitializer();

describe("rooms module", () => {
	describe("actions", () => {
		describe("fetch", () => {
			beforeEach(() => {
				receivedRequests = [];
			});
			it("should call backend and sets state correctly", async () => {
				const roomsModule = new Rooms({});

				const setRoomDataSpy = jest.spyOn(roomsModule, "setRoomData");
				const setLoadingSpy = jest.spyOn(roomsModule, "setLoading");

				await roomsModule.fetch("mobile");

				expect(receivedRequests.length).toBeGreaterThan(0);
				expect(receivedRequests[0].path).toStrictEqual("/v3/dashboard/");

				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[0][0]).toBe(true);
				expect(setRoomDataSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[0][0]).toBe(true);
			});
		});
		describe("align", () => {
			beforeEach(() => {
				receivedRequests = [];
			});
			it("should call server and 'setPosition' mutation", async () => {
				const roomsModule = new Rooms({});

				const setPositionSpy = jest.spyOn(roomsModule, "setPosition");
				const setLoadingSpy = jest.spyOn(roomsModule, "setLoading");

				const payload = {
					from: { x: 1, y: 1 },
					to: { x: 2, y: 2 },
					item: {},
				};

				const expectedParam = {
					from: { x: 1, y: 1 },
					to: { x: 2, y: 2 },
				};

				roomsModule.setRoomDataId("grid_id");
				await roomsModule.align(payload);

				expect(receivedRequests.length).toBeGreaterThan(0);
				expect(receivedRequests[0].path).toStrictEqual(
					"/v3/dashboard/grid_id/moveElement"
				);
				expect(receivedRequests[1].params).toStrictEqual(expectedParam);

				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[0][0]).toBe(true);
				expect(setPositionSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[0][0]).toBe(true);
			});
		});
		describe("delete", () => {
			beforeEach(() => {
				receivedRequests = [];
			});
			it("should call 'setPosition' mutation", async () => {
				// TODO: call server will be here when server ready
				const roomsModule = new Rooms({});

				const setRoomDataSpy = jest.spyOn(roomsModule, "setRoomData");
				const setLoadingSpy = jest.spyOn(roomsModule, "setLoading");

				await roomsModule.delete("id");

				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[0][0]).toBe(true);
				expect(setRoomDataSpy).toHaveBeenCalled();
			});
		});

		describe("update", () => {
			beforeEach(() => {
				receivedRequests = [];
			});
			it("should call the backend", async (done) => {
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
				const roomsModule = new Rooms({});

				const roomsData: RoomsData = {
					id: "dummyId",
					title: "dummy title",
					shortTitle: "dummy short title",
					xPosition: 3,
					yPosition: 3,
					displayColor: "#FF0000",
				};

				roomsModule.update(roomsData).then(() => {
					expect(roomsModule.getLoading).toBeFalsy();
					done();
				});
				expect(roomsModule.getLoading).toBeTruthy();
				expect(mockApi.dashboardControllerPatchGroup).toHaveBeenLastCalledWith(
					roomsData
				);
			});
		});
	});

	describe("mutations", () => {
		describe("setRoomData", () => {
			it("should set the room data", () => {
				const roomsModule = new Rooms({});
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
				expect(roomsModule.getRoomsData).not.toStrictEqual(
					roomsDataToBeChanged
				);
				roomsModule.setRoomData(roomsDataToBeChanged);
				expect(roomsModule.roomsData).toStrictEqual(roomsDataToBeChanged);
			});
		});

		describe("setRoomDataId", () => {
			it("should set the room data id", () => {
				const roomsModule = new Rooms({});
				const id = "sample_id";

				roomsModule.setRoomDataId(id);
				expect(roomsModule.gridElementsId).toStrictEqual(id);
			});
		});

		describe("setLoading", () => {
			it("should set loading", () => {
				const roomsModule = new Rooms({});
				const loadingValue = true;
				expect(roomsModule.getLoading).not.toBe(loadingValue);
				roomsModule.setLoading(loadingValue);
				expect(roomsModule.loading).toBe(loadingValue);
			});
		});

		describe("setError", () => {
			it("should set error", () => {
				const roomsModule = new Rooms({});
				const errorData = { message: "some error" };
				expect(roomsModule.getError).not.toBe(errorData);
				roomsModule.setError(errorData);
				expect(roomsModule.error).toBe(errorData);
			});
		});

		describe("setPosition", () => {
			it("should re-position the state", () => {
				const roomsModule = new Rooms({});
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
				};
				roomsModule.setRoomData(mockData.gridElements);
				roomsModule.setPosition(draggedObject);
				expect(roomsModule.roomsData[0]).toStrictEqual(expectedObject);
			});
		});
	});

	describe("getters", () => {
		describe("getRoomsData", () => {
			it("should return rooms state", () => {
				const roomsModule = new Rooms({});
				const expectedValue = mockData.gridElements;

				expect(roomsModule.getRoomsData).not.toStrictEqual(expectedValue);
				roomsModule.setRoomData(expectedValue);
				expect(roomsModule.getRoomsData).toStrictEqual(expectedValue);
			});
		});

		describe("getLoading", () => {
			it("should return loading state", () => {
				const roomsModule = new Rooms({});

				expect(roomsModule.getLoading).not.toStrictEqual(true);
				roomsModule.setLoading(true);
				expect(roomsModule.getLoading).toStrictEqual(true);
			});
		});

		describe("getError", () => {
			it("should return error state", () => {
				const roomsModule = new Rooms({});
				const errorData = { message: "some error" };
				expect(roomsModule.getError).toStrictEqual(null);
				roomsModule.setError(errorData);
				expect(roomsModule.getError).toStrictEqual(errorData);
			});
		});

		describe("getRoomsId", () => {
			it("should return rooms id state", () => {
				const roomsModule = new Rooms({});
				const sampleId = "sample_id";
				expect(roomsModule.getRoomsId).toStrictEqual("");
				roomsModule.setError(sampleId);
				expect(roomsModule.getError).toStrictEqual(sampleId);
			});
		});
	});
});
