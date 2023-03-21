import VueRouter from "vue-router";
import { createLocalVue, mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import TaskCard from "./TaskCard.page.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);

const authModuleMock = () => {
	return {
		getUserPermissions: ["TASK_CARD_EDIT"],
	};
};

const roomsModuleMock = () => {
	return {
		getAllElements: [],
	};
};

const taskCardModuleMock = () => {
	return { getTaskCardData: { cardElements: [] } };
};

jest.mock("@/store", () => ({
	authModule: authModuleMock(),
	roomsModule: roomsModuleMock(),
	taskCardModule: taskCardModuleMock(),
}));

const getWrapper = (
	userPermission: string,
	userCourse: object,
	props?: object,
	options?: object
) => {
	const componentOptions = createComponentMocks({ i18n: true });
	const { localVue } = componentOptions;
	localVue.use(VueRouter);
	const router = new VueRouter({
		routes: [{ name: "task-card-view-edit", path: "/task-cards" }],
	});

	return mount(TaskCard, {
		...componentOptions,
		provide: {
			i18n: { t: (key: string) => key },
			authModule: {
				getUserPermissions: [userPermission],
			},
			roomsModule: {
				getAllElements: [userCourse],
			},
		},
		localVue,
		router,
		propsData: props,
		...options,
	});
};

const mockCourse = {
	id: "123",
	title: "Mathe",
	shortTitle: "Ma",
	displayColor: "#54616e",
	startDate: "2019-12-07T23:00:00.000Z",
	untilDate: "2020-12-16T23:00:00.000Z",
	titleDate: "2019/20",
};

describe("TaskCard", () => {
	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
	});

	describe("when TASK_CARD_EDIT permission is present", () => {
		const wrapper = getWrapper("task_card_edit", mockCourse);

		it("should render component page", () => {
			expect(wrapper.findComponent(TaskCard).exists()).toBe(true);
		});

		it("should render cancel button", () => {
			const cancelBtn = wrapper.find('[data-testid="cancel-btn"]');

			expect(cancelBtn.exists()).toBe(true);
		});

		it("should render save button", () => {
			const saveBtn = wrapper.find('[data-testid="save-btn"]');

			expect(saveBtn.exists()).toBe(true);
		});
	});

	describe("when only TASK_CARD_VIEW permission is present", () => {
		const wrapper = getWrapper("task_card_view", mockCourse);

		it("should render component page", () => {
			expect(wrapper.findComponent(TaskCard).exists()).toBe(true);
		});

		it("should not render cancel button", () => {
			const cancelBtn = wrapper.find('[data-testid="cancel-btn"]');

			expect(cancelBtn.exists()).toBe(false);
		});

		it("should not render save button", () => {
			const saveBtn = wrapper.find('[data-testid="save-btn"]');

			expect(saveBtn.exists()).toBe(false);
		});
	});

	describe("permission check before mounting", () => {
		describe("when user does have permission TASK_CARD_EDIT", () => {
			it.todo("should do what?"); // QUESTION
		});
	});
});
