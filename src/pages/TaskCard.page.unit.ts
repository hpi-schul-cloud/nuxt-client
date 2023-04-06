import VueRouter from "vue-router";
import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import TaskCard from "./TaskCard.page.vue";
import { TaskCardResponse } from "@/serverApi/v3";
import { createModuleMocks } from "@/utils/mock-store-module";
import AuthModule from "@/store/auth";
import RoomModule from "@/store/room";
import RoomsModule from "@/store/rooms";
import SchoolsModule from "@/store/schools";
import TaskCardModule from "@/store/task-card";

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

let taskCardModuleMock = createModuleMocks(TaskCardModule);

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

	router = new VueRouter({
		routes: routes,
	});
	router.push(route);
	jest.spyOn(router, "go");

	taskCardModuleMock = createModuleMocks(TaskCardModule, {
		getTaskCardData: taskCardData,
	});

	return mount(TaskCard, {
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
			taskCardModule: taskCardModuleMock,
		},
		localVue,
		router,
		propsData: props,
		...options,
	});
};

const CREATE_EDIT_PERMISSION = "task_card_edit";
const VIEW_PERMISSION = "task_card_view";

const mockRoomData = {
	roomId: "123",
	title: "room",
	displayColor: "#ff00ff",
	elements: [],
};

const mockCurrentYear = {
	_id: "",
	name: "",
	startDate: "",
	endDate: "2300-01-01T00:00:00",
	__v: 0,
	years: {},
	isTeamCreationByStudentsEnabled: false,
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
	id: "642162cc44a17f1ce8939ddb",
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
		describe("when creating new beta task", () => {
			const wrapper = getWrapper(
				CREATE_EDIT_PERMISSION,
				emptyTaskCardData,
				createRoute
			);

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
		});

		describe("when editing existing beta task", () => {
			const wrapper = getWrapper(
				CREATE_EDIT_PERMISSION,
				mockTaskCardData,
				viewEditRoute
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

			// it("should delete beta task and redirect after confirming deletion", async () => {
			// 	const deleteTaskCardSpy = jest.spyOn(
			// 		taskCardModuleMock,
			// 		"deleteTaskCard"
			// 	);
			// 	const deleteDialog: any = wrapper.find({
			// 		ref: "delete-dialog",
			// 	});
			// 	deleteDialog.vm.$emit("dialog-confirmed");
			// 	await wrapper.vm.$nextTick();

			// 	expect(deleteTaskCardSpy).toHaveBeenCalledTimes(1);
			// 	expect(router.go).toHaveBeenCalledTimes(1);
			// });
		});
	});

	describe("when only TASK_CARD_VIEW permission is present", () => {
		const wrapper = getWrapper(
			VIEW_PERMISSION,
			emptyTaskCardData,
			viewEditRoute
		);

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
