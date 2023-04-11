import VueRouter from "vue-router";
import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import TaskCard from "./TaskCard.page.vue";
import { TaskCardResponse } from "@/serverApi/v3";
import { taskCardModule } from "@/store";

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
		getTaskCardData: {},
		deleteTaskCard: jest.fn().mockReturnValue(Promise.resolve()),
	};
};

const schoolsModuleMock = () => {
	return { getCurrentYear: { endDate: "" } };
};

jest.mock("@/store", () => ({
	authModule: authModuleMock(),
	roomsModule: roomsModuleMock(),
	taskCardModule: taskCardModuleMock(),
	schoolsModule: schoolsModuleMock(),
}));

const router = new VueRouter({
	routes: [{ name: "beta-task-view-edit", path: "/beta-task" }],
});
const goSpy = jest.spyOn(router, "go");

const getWrapper = (
	userPermission: string,
	userCourse: object,
	taskCardData: object,
	props?: object,
	options?: object
) => {
	const componentOptions = createComponentMocks({ i18n: true });
	const { localVue } = componentOptions;
	localVue.use(VueRouter);

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
			taskCardModule: {
				getTaskCardData: taskCardData,
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

const emptyTaskCardData: TaskCardResponse = {
	id: "",
	courseId: "",
	courseName: "",
	title: "",
	cardElements: [],
	draggable: true,
	task: {
		id: "",
		users: [],
		name: "",
		courseName: "",
		courseId: "",
		createdAt: "",
		updatedAt: "",
		lessonHidden: false,
		status: {
			submitted: 0,
			maxSubmissions: 0,
			graded: 0,
			isDraft: true,
			isSubstitutionTeacher: true,
			isFinished: false,
		},
	},
	dueDate: "",
	visibleAtDate: "",
};

const mockTaskCardData: TaskCardResponse = {
	id: "842",
	courseId: "123",
	courseName: "Mathe",
	title: "Mathe Task",
	cardElements: [],
	draggable: true,
	task: {
		id: "248",
		users: [],
		name: "Mathe Task",
		courseName: "Mathe",
		courseId: "123",
		createdAt: "",
		updatedAt: "",
		lessonHidden: false,
		status: {
			submitted: 0,
			maxSubmissions: 0,
			graded: 0,
			isDraft: true,
			isSubstitutionTeacher: true,
			isFinished: false,
		},
	},
	dueDate: "",
	visibleAtDate: "",
};

describe("TaskCard", () => {
	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
	});

	describe("when TASK_CARD_EDIT permission is present", () => {
		const wrapper = getWrapper("task_card_edit", mockCourse, emptyTaskCardData);

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

		it("should not render delete button for new beta task", () => {
			const deleteBtn = wrapper.find('[data-testid="delete-btn"]');

			expect(deleteBtn.exists()).toBe(false);
		});

		describe("when editing existing beta task", () => {
			const wrapper = getWrapper(
				"task_card_edit",
				mockCourse,
				mockTaskCardData
			);
			wrapper.setData({ isDeletable: !!mockTaskCardData.id });

			it("should render delete button", () => {
				const deleteBtn = wrapper.find('[data-testid="delete-btn"]');

				expect(deleteBtn.exists()).toBe(true);
			});

			it("should not show delete dialog without the need to delete beta task", async () => {
				const deleteDialog: any = wrapper.find({
					ref: "delete-dialog",
				});
				expect(deleteDialog.vm.isOpen).toEqual(false);
			});

			it("should show delete dialog when beta task delete button is clicked", async () => {
				const deleteBtn = wrapper.find('[data-testid="delete-btn"]');
				const deleteDialog: any = wrapper.find({
					ref: "delete-dialog",
				});

				deleteBtn.trigger("click");
				await wrapper.vm.$nextTick();
				expect(deleteDialog.vm.isOpen).toEqual(true);
			});

			it("should delete beta task and redirect after confirming deletion", async () => {
				const deleteTaskCardMock = jest.fn();
				taskCardModule.deleteTaskCard = deleteTaskCardMock;
				const deleteDialog: any = wrapper.find({
					ref: "delete-dialog",
				});
				expect(deleteDialog.vm.isOpen).toEqual(true);

				deleteDialog.vm.$emit("dialog-confirmed");
				await wrapper.vm.$nextTick();

				expect(deleteTaskCardMock).toHaveBeenCalled();
				expect(goSpy).toHaveBeenCalledTimes(1);
			});
		});
	});

	describe("when only TASK_CARD_VIEW permission is present", () => {
		const wrapper = getWrapper("task_card_view", mockCourse, emptyTaskCardData);

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

		it("should not render delete button", () => {
			const deleteBtn = wrapper.find('[data-testid="delete-btn"]');

			expect(deleteBtn.exists()).toBe(false);
		});
	});

	describe("permission check before mounting", () => {
		describe("when user does have permission TASK_CARD_EDIT", () => {
			it.todo("should do what?"); // QUESTION
		});
	});
});
