import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount } from "@vue/test-utils";
import RoomDashboard from "./RoomDashboard.vue";

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

const getWrapper = () => {
	return mount(RoomDashboard, {
		...createComponentMocks({
			i18n: true,
			// @ts-ignore
			vuetify: true,
		}),
		propsData: {
			items: mockData.elements,
		},
	});
};

describe("@components/templates/RoomDashboard.vue", () => {
	beforeEach(() => {});

	it("should have props", async () => {
		const wrapper = getWrapper();

		// @ts-ignore
		expect(wrapper.vm.items[1]).toStrictEqual(mockData.elements[1]);
	});

	it("should list 'v-list-component'", async () => {
		const wrapper = getWrapper();

		const listItems = wrapper.findAll(".v-list-item");
		expect(listItems).toHaveLength(2);
	});
});
