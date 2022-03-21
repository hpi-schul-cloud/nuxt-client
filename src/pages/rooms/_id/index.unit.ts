import RoomModule from "@store/room";
import AuthModule from "@/store/auth";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount } from "@vue/test-utils";
import Room from "./index.vue";
import { User } from "@/store/types/auth";
import EnvConfigModule from "@/store/env-config";

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
					isFinished: false,
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
					isFinished: false,
				},
				availableDate: "2017-09-28T12:00:00.000Z",
				duedate: "2300-06-28T13:00:00.000Z",
				displayColor: "#54616e",
				description: "",
			},
		},
	],
};

const mockAuthStoreDataStudentInvalid = {
	__v: 0,
	_id: "asdf",
	id: "asdf",
	firstName: "Arthur",
	lastName: "Dent",
	email: "arthur.dent@hitchhiker.org",
	roles: [{ name: "student" }],
	permissions: ["ABC", "DEF"],
};

const mockAuthStoreDataTeacher = {
	__v: 1,
	_id: "asdfg",
	id: "asdfg",
	firstName: "Peter",
	lastName: "Parker",
	email: "peter.parker@hitchhiker.org",
	roles: [{ name: "teacher" }],
	permissions: ["COURSE_CREATE", "COURSE_EDIT"],
};

const $route = {
	params: {
		id: "123",
	},
	path: "/rooms/",
};

const $router = { push: jest.fn() };
const getWrapper: any = () => {
	return mount(Room, {
		...createComponentMocks({
			i18n: true,
			$router,
			$route,
		}),
	});
};

describe("@pages/rooms/_id/index.vue", () => {
	beforeEach(() => {
		RoomModule.setRoomData(mockData as any);
		AuthModule.setUser(mockAuthStoreDataTeacher as User);
	});

	it("should fetch data", async () => {
		const wrapper = getWrapper();
		expect(wrapper.vm.roomData).toStrictEqual(mockData);
	});

	it("'return to courses' button should have correct path", async () => {
		const wrapper = getWrapper();
		const backButton = wrapper.find(".back-button");
		expect(backButton.vm.href).toStrictEqual("/courses/123");
	});

	it("title should be the course name", async () => {
		const wrapper = getWrapper();
		const title = wrapper.find(".course-title");
		expect(title.element.textContent).toContain("Sample Course");
	});

	it("should not show FAB if user does not have permission to create courses", () => {
		AuthModule.setUser(mockAuthStoreDataStudentInvalid as User);
		const wrapper = getWrapper();
		const fabComponent = wrapper.find(".wireframe-fab");
		expect(fabComponent.exists()).toBe(false);
	});

	it("should show FAB if user has permission to create courses", () => {
		const wrapper = getWrapper();
		const fabComponent = wrapper.find(".wireframe-fab");
		const actions = fabComponent.vm.actions.map((action: any) => {
			return action.label;
		});
		const hasNewTaskAction = actions.some((item: string) => {
			return item === wrapper.vm.$i18n.t("pages.rooms.fab.add.task");
		});
		const hasNewLessonAction = actions.some((item: string) => {
			return item === wrapper.vm.$i18n.t("pages.rooms.fab.add.lesson");
		});
		const hasImportLessonAction = actions.some((item: string) => {
			return item === wrapper.vm.$i18n.t("pages.rooms.fab.import.lesson");
		});
		expect(fabComponent.exists()).toBe(true);
		expect(hasNewTaskAction).toBe(true);
		expect(hasNewLessonAction).toBe(true);
		expect(hasImportLessonAction).toBe(false);
	});

	it("should show import lesson FAB if FEATURE_LESSON_SHARE is set", () => {
		// @ts-ignore
		EnvConfigModule.setEnvs({ FEATURE_LESSON_SHARE: true });
		const wrapper = getWrapper();
		const fabComponent = wrapper.find(".wireframe-fab");
		const actions = fabComponent.vm.actions.map((action: any) => {
			return action.label;
		});
		const hasImportLessonAction = actions.some((item: string) => {
			return item === wrapper.vm.$i18n.t("pages.rooms.fab.import.lesson");
		});
		expect(hasImportLessonAction).toBe(true);
	});
});
