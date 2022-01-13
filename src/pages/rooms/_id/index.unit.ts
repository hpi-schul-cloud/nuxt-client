import RoomModule from "@store/room";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount } from "@vue/test-utils";
import Room from "./index.vue";
import flushPromises from "flush-promises";

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

const $route = {
	params: {
		id: "123",
	},
	path: "/rooms/",
};

const $router = { push: jest.fn() };

describe("@pages/rooms-list.vue", () => {
	const getWrapper = () => {
		return mount(Room, {
			...createComponentMocks({
				i18n: true,
				//@ts-ignore
				vuetify: true,
				$router,
				//@ts-ignore
				$route,
			}),
		});
	};
	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
		RoomModule.setRoomData(mockData as any);
		window.location.pathname = "http://dummy-url/rooms/123";
	});

	it("should fetch data", async () => {
		const wrapper = getWrapper();
		await flushPromises();

		// @ts-ignore
		expect(wrapper.vm.roomData).toStrictEqual(mockData);
	});
});
