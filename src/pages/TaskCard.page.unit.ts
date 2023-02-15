import VueRouter from "vue-router";
import { createLocalVue, mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import TaskCard from "./TaskCard.page.vue";

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
