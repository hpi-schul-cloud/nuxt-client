import Vue from "vue";
import VueRouter from "vue-router";
import { mount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import TaskCard from "./TaskCard.page.vue";
import { TaskCardResponse } from "@/serverApi/v3";
import { createModuleMocks } from "@/utils/mock-store-module";
import AuthModule from "@/store/auth";
import RoomModule from "@/store/room";
import RoomsModule from "@/store/rooms";
import SchoolsModule from "@/store/schools";
import TaskCardModule from "@/store/task-card";
import {
	taskCardResponseFactory,
	courseMetadataResponseFactory,
	singleColumnBoardResponseFactory,
} from "@@/tests/test-utils/factory";
import { AUTH_MODULE_KEY, I18N_KEY, ROOM_MODULE_KEY } from "@/utils/inject";

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

const CREATE_EDIT_PERMISSION = "task_card_edit";
const VIEW_PERMISSION = "task_card_view";

const mockSingleColumnBoardResponseData =
	singleColumnBoardResponseFactory.build();

const mockCourseMetadataResponseData = courseMetadataResponseFactory.build();

const emptyTaskCardData = taskCardResponseFactory.build({
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

const mockTaskCardData = taskCardResponseFactory.build();

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

	taskCardModuleMock = createModuleMocks(TaskCardModule, {
		getTaskCardData: taskCardData,
	});

	return mount(TaskCard, {
		...componentOptions,
		provide: {
			[I18N_KEY as symbol]: { t: (key: string) => key },
			[AUTH_MODULE_KEY.valueOf()]: createModuleMocks(AuthModule, {
				getUserPermissions: [userPermission],
			}),
			[ROOM_MODULE_KEY.valueOf()]: createModuleMocks(RoomModule, {
				getRoomData: mockSingleColumnBoardResponseData,
			}),
			roomsModule: createModuleMocks(RoomsModule, {
				getAllElements: [mockCourseMetadataResponseData],
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

describe("TaskCard", () => {
	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
	});

	describe("when TASK_CARD_EDIT permission is present", () => {
		describe("when creating new beta task", () => {
			let wrapper: Wrapper<Vue>;

			beforeEach(() => {
				wrapper = getWrapper(
					CREATE_EDIT_PERMISSION,
					emptyTaskCardData,
					createRoute
				);
			});

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
			let wrapper: Wrapper<Vue>;

			beforeEach(() => {
				wrapper = getWrapper(
					CREATE_EDIT_PERMISSION,
					mockTaskCardData,
					viewEditRoute
				);
				wrapper.setData({ isDeletable: !!mockTaskCardData.id });
			});

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
				jest.spyOn(router, "go");
				const deleteBtn = wrapper.find('[data-testid="delete-btn"]');
				const deleteDialog: any = wrapper.find({
					ref: "delete-dialog",
				});

				deleteBtn.trigger("click");
				await wrapper.vm.$nextTick();
				expect(deleteDialog.vm.isOpen).toEqual(true);
				deleteDialog.vm.$emit("dialog-confirmed");
				await wrapper.vm.$nextTick();

				expect(taskCardModuleMock.findTaskCard).toHaveBeenCalledTimes(1);
				expect(router.go).toHaveBeenCalledTimes(1);
			});
		});
	});

	describe("when only TASK_CARD_VIEW permission is present", () => {
		let wrapper: Wrapper<Vue>;

		beforeEach(() => {
			wrapper = getWrapper(VIEW_PERMISSION, emptyTaskCardData, viewEditRoute);
		});

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
