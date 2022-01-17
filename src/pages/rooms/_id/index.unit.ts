import RoomModule from "@store/room";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount } from "@vue/test-utils";
import Room from "./index.vue";

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
	],
};

const $route = {
	params: {
		id: "123",
	},
	path: "/rooms/",
};

const $router = { push: jest.fn() };

describe("@pages/rooms/index.vue", () => {
	const getWrapper = () => {
		return mount(Room, {
			...createComponentMocks({
				i18n: true,
				$router,
				$route,
			}),
		});
	};
	beforeEach(() => {
		RoomModule.setRoomData(mockData as any);
	});

	it("should fetch data", async () => {
		const wrapper = getWrapper();
		// @ts-ignore
		expect(wrapper.vm.roomData).toStrictEqual(mockData);
	});

	it("return to courses button should have correct path", async () => {
		const wrapper = getWrapper();
		const backButton = wrapper.find(".back-button");
		// @ts-ignore
		expect(backButton.vm.href).toStrictEqual("/courses/123");
	});
});
