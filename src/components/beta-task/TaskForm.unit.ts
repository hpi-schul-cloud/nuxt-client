import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
// import { createModuleMocks } from "@/utils/mock-store-module";
import {
	betaTaskFactory,
	courseMetadataFactory,
} from "@@/tests/test-utils/factory";
// import TaskCardModule from "@/store/task-card";
import TaskForm from "@/components/beta-task/TaskForm.vue";
import VueRouter from "vue-router";

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

let router = new VueRouter();

const mockCourse = courseMetadataFactory();
const mockBetaTaskData = betaTaskFactory();
const emptyTaskCardData = betaTaskFactory({
	id: "",
});

const getWrapper = (route: object, props?: object) => {
	const componentOptions = createComponentMocks({ i18n: true });
	const { localVue } = componentOptions;
	localVue.use(VueRouter);

	router = new VueRouter({
		routes: routes,
	});
	router.push(route);

	return mount(TaskForm, {
		...componentOptions,
		provide: {
			i18n: { t: (key: string) => key },
		},
		localVue,
		router,
		propsData: props,
	});
};

describe("TaskForm", () => {
	it("should render component", () => {
		const wrapper = getWrapper(createRoute, {
			task: mockBetaTaskData,
			courses: [mockCourse],
		});
		expect(wrapper.findComponent(TaskForm).exists()).toBe(true);
	});
});
