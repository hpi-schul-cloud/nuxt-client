import Vue from "vue";
import VueRouter from "vue-router";
import { mount, Wrapper, shallowMount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { TaskCardResponse } from "@/serverApi/v3";
import { createModuleMocks } from "@/utils/mock-store-module";
import AuthModule from "@/store/auth";
import RoomModule from "@/store/room";
import RoomsModule from "@/store/rooms";
import SchoolsModule from "@/store/schools";
import TaskCardModule from "@/store/task-card";
import {
	betaTaskFactory,
	courseMetadataFactory,
	roomFactory,
} from "@@/tests/test-utils/factory";
import TaskCard from "./TaskCard.page.vue";

const routes = [
	{
		name: "beta-task-view-edit",
		path: "/beta-task/:id()",
	},
	{
		name: "rooms-beta-task-new",
		path: "/rooms/:id/create-beta-task",
	},
];

const createRoute = {
	name: "rooms-beta-task-new",
	params: {
		id: "0000dcfbfb5c7a3f00bf21ab",
	},
};

const viewEditRoute = {
	name: "beta-task-view-edit",
	params: {
		id: "642162cc44a17f1ce8939ddb",
	},
};

const CREATE_EDIT_PERMISSION = "task_card_edit";
const VIEW_PERMISSION = "task_card_view";

const mockRoomData = roomFactory();
const mockCourse = courseMetadataFactory();
const mockTaskCardData = betaTaskFactory();
const emptyTaskCardData = betaTaskFactory({
	id: "",
});
const mockCurrentYear = {
	_id: "",
	name: "",
	startDate: "",
	endDate: "2300-01-01T00:00:00",
	__v: 0,
	years: {},
	isTeamCreationByStudentsEnabled: false,
};

const getWrapper = (
	userPermission: string,
	taskCardData: TaskCardResponse,
	route: object,
	props?: object,
	options?: object
) => {
	const componentOptions = createComponentMocks({ i18n: true });
	const { localVue } = componentOptions;
	localVue.use(VueRouter);

	const router = new VueRouter({
		routes: routes,
	});
	router.push(route);

	return shallowMount(TaskCard, {
		...componentOptions,
		provide: {
			i18n: { t: (key: string) => key },
			authModule: createModuleMocks(AuthModule, {
				getUserPermissions: [userPermission],
			}),
			roomModule: createModuleMocks(RoomModule, {
				getRoomData: mockRoomData,
			}),
			roomsModule: createModuleMocks(RoomsModule, {
				getAllElements: [mockCourse],
			}),
			schoolsModule: createModuleMocks(SchoolsModule, {
				getCurrentYear: mockCurrentYear,
			}),
			taskCardModule: createModuleMocks(TaskCardModule, {
				getTaskCardData: taskCardData,
			}),
		},
		localVue,
		router,
		propsData: props,
		...options,
	});
};

describe("TaskCard", () => {
	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
	});

	describe("when TASK_CARD_EDIT permission is NOT present", () => {
		let wrapper: Wrapper<Vue>;

		beforeEach(() => {
			wrapper = getWrapper(VIEW_PERMISSION, mockTaskCardData, viewEditRoute);
		});

		it("should render component page", () => {
			expect(wrapper.findComponent(TaskCard).exists()).toBe(true);
		});

		it("should render student view", () => {
			expect(wrapper.findComponent({ name: "TaskStudentView" }).exists()).toBe(
				true
			);
		});
	});

	describe("when TASK_CARD_EDIT permission is present", () => {
		let wrapper: Wrapper<Vue>;

		beforeEach(() => {
			wrapper = getWrapper(
				CREATE_EDIT_PERMISSION,
				emptyTaskCardData,
				createRoute
			);
		});

		describe("when creating a beta task", () => {
			it("should render component page", () => {
				expect(wrapper.findComponent(TaskCard).exists()).toBe(true);
			});

			it("should render task form", () => {
				expect(wrapper.findComponent({ name: "TaskForm" }).exists()).toBe(true);
			});
		});

		describe("when editing existing beta task", () => {
			it("should render component page", () => {
				expect(wrapper.findComponent(TaskCard).exists()).toBe(true);
			});

			it("should render task form", () => {
				expect(wrapper.findComponent({ name: "TaskForm" }).exists()).toBe(true);
			});
		});
	});
});
