import VueRouter from "vue-router";
import { createLocalVue, mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { taskCardModule } from "@/store";
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
	return {
		getTaskCardData: {
			cardElements: [],
			task: {
				status: {
					isDraft: false,
				},
			},
		},
		findTaskCard: jest.fn(),
	};
};
const findTaskCardSpy = jest.spyOn(taskCardModule, "findTaskCard");

const schoolsModuleMock = () => {
	return {
		getCurrentYear: { endDate: new Date() },
	};
};

jest.mock("@/store", () => ({
	authModule: authModuleMock(),
	roomsModule: roomsModuleMock(),
	taskCardModule: taskCardModuleMock(),
	schoolsModule: schoolsModuleMock(),
}));

const getWrapper = (
	userPermission: string,
	userCourse: object,
	route: object,
	props?: object,
	options?: object
) => {
	const componentOptions = createComponentMocks({ i18n: true });
	const { localVue } = componentOptions;
	localVue.use(VueRouter);
	const router = new VueRouter({
		routes: [
			{
				name: "beta-task-view-edit",
				path: "/beta-task/:id()",
			},
		],
	});
	router.push(route);

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

	describe("view or edit task card", () => {
		const route = {
			name: "beta-task-view-edit",
			params: {
				id: "64215f5944a17f1ce8939dd3",
			},
		};
		describe("when TASK_CARD_EDIT permission is present", () => {
			const wrapper = getWrapper("task_card_edit", mockCourse, route);

			it("should render component page", () => {
				expect(wrapper.findComponent(TaskCard).exists()).toBe(true);
			});

			it("should fetch task card", () => {
				expect(findTaskCardSpy).toHaveBeenCalled();
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
			const wrapper = getWrapper("task_card_view", mockCourse, route);

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
	});
});
