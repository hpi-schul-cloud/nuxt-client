import { provide } from "@vue/composition-api";
import { Route } from "vue-router";
import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import TaskForm from "./TaskForm.page.vue";
import setupStores from "@@/tests/test-utils/setupStores";
import TaskModule from "@/store/task";
import AuthModule from "@/store/auth";
import { authModule, taskModule } from "@/store";
import { User } from "@/store/types/auth";
import { createModuleMocks } from "@/utils/mock-store-module";

const $router = { go: jest.fn() };
const taskCreateRoute: Route = {
	path: "/tasks/new",
} as Route;
const taskEditRoute: Route = {
	path: "/tasks/new",
} as Route;

const mockAuthStoreDataStudent: User = {
	__v: 1,
	_id: "asdfg",
	id: "asdfg",
	firstName: "Peter",
	lastName: "Parker",
	email: "peter.parker@hitchhiker.org",
	roles: [{ name: "teacher" }],
	permissions: ["COURSE_CREATE", "COURSE_EDIT"],
} as User;
const mockAuthStoreDataTeacher: User = {
	__v: 1,
	_id: "asdfg",
	id: "asdfg",
	firstName: "Peter",
	lastName: "Parker",
	email: "peter.parker@hitchhiker.org",
	roles: [{ name: "teacher" }],
	permissions: ["COURSE_CREATE", "COURSE_EDIT"],
} as User;

const mockTaskStoreData = {
	id: "",
	courseId: "",
	name: "",
	description: "",
};

const taskModuleGetters: Partial<TaskModule> = {
	getTaskData: {
		id: "",
		courseId: "",
		name: "",
		description: "",
	},
};

const getWrapper = (
	props?: object,
	options?: object,
	$route: Route = taskCreateRoute
) => {
	return mount(TaskForm, {
		...createComponentMocks({
			i18n: true,
			$router,
			$route,
		}),
		setup() {
			provide("i18n", { t: (key: string) => key });
		},
		propsData: props,
		...options,
	});
};

describe("TaskForm", () => {
	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
		setupStores({
			task: TaskModule,
			auth: AuthModule,
		});
	});

	it("should render component page", () => {
		const wrapper = getWrapper();
		expect(wrapper.findComponent(TaskForm).exists()).toBe(true);
	});

	describe("permission check before mounting", () => {
		describe("when user does not have permission HOMEWORK_CREATE", () => {
			it("should redirect to the page before", () => {
				authModule.setUser(mockAuthStoreDataStudent);
				expect($router.go).toHaveBeenCalled();
				// QUESTION should not render TaskForm page?
			});
		});

		describe("when user does have permission HOMEWORK_CREATE", () => {
			it.todo("should do what?"); // QUESTION
		});
	});

	describe("getting data from store on mounting", () => {
		beforeEach(() => {
			authModule.setUser(mockAuthStoreDataTeacher);
		});

		describe("when route is /tasks/new", () => {
			it("should call getTaskData", () => {
				const taskModuleMock: TaskModule = createModuleMocks(TaskModule, {
					...taskModuleGetters,
				});
				const getTaskDataSpy = jest
					.spyOn(taskModule, "getTaskData", "get")
					.mockImplementation();

				const wrapper = getWrapper();

				// jest.spyOn(MyClass, "something", "get").mockReturnValue("bar");

				expect(getTaskDataSpy).toHaveBeenCalled();
			});

			it("should create one child with empty fields", () => {
				const taskModuleMock = createModuleMocks(TaskModule, {
					getTaskData: mockTaskStoreData,
				});

				const wrapper = getWrapper();
				//@ts-ignore
				console.log(wrapper.vm.children);

				expect(wrapper.findComponent(TaskForm).exists()).toBe(true);
			});
		});

		// describe("when user does have permission HOMEWORK_CREATE", () => {
		// 	it.todo("should do what?"); // QUESTION
		// });
	});
});
