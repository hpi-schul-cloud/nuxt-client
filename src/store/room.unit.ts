import { Room } from "./room";
// TODO: import * as serverApi from "../serverApi/v3/api";
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
				// TODO: use backend call
				// TODO: use openAPI

				const roomModule = new Room({});
				await roomModule.fetchTasks("123");
				expect(roomModule.roomData).toStrictEqual(mockData);
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
	});
});
