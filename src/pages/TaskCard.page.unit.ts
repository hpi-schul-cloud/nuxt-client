import VueRouter from "vue-router";
import { createLocalVue, mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { User } from "@/store/types/auth";
import TaskCard from "./TaskCard.page.vue";
import setupStores from "@@/tests/test-utils/setupStores";
import TaskCardModule from "@/store/task-card";
import AuthModule from "@/store/auth";

const localVue = createLocalVue();
localVue.use(VueRouter);

const authModuleMock = () => {
	return {
		getUserPermissions: ["HOMEWORK_CREATE"],
	};
};

const taskCardModuleMock = () => {
	return { getTaskCardData: { cardElements: [] } };
};

jest.mock("@/store", () => ({
	authModule: authModuleMock(),
	taskCardModule: taskCardModuleMock(),
}));

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

const getWrapper = (props?: object, options?: object) => {
	const componentOptions = createComponentMocks({ i18n: true });
	const { localVue } = componentOptions;
	localVue.use(VueRouter);
	const router = new VueRouter({ routes: [{ path: "/tasks/new" }] });

	return mount(TaskCard, {
		...componentOptions,
		provide: {
			i18n: { t: (key: string) => key },
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
		setupStores({
			taskCardModule: TaskCardModule,
			auth: AuthModule,
		});
	});

	it("should render component page", () => {
		const wrapper = getWrapper();
		expect(wrapper.findComponent(TaskCard).exists()).toBe(true);
	});

	describe("permission check before mounting", () => {
		describe("when user does have permission HOMEWORK_CREATE", () => {
			it.todo("should do what?"); // QUESTION
		});
	});
});
