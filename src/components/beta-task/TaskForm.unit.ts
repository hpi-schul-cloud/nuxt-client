import Vue from "vue";
import VueRouter from "vue-router";
import { mount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import TaskForm from "@/components/beta-task/TaskForm.vue";
import { TaskCardResponse } from "@/serverApi/v3";
import { createModuleMocks } from "@/utils/mock-store-module";
import TaskCardModule from "@/store/task-card";
import NotifierModule from "@/store/notifier";
import {
	betaTaskFactory,
	courseMetadataFactory,
} from "@@/tests/test-utils/factory";
import { AllItems } from "@/store/types/rooms";
import { TaskCard } from "@/store/types/beta-task/beta-task";

type TaskFormProps = {
	courses?: AllItems;
	dueDateMax?: string;
	task: TaskCard;
};

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

const mockCourse = courseMetadataFactory();
const mockTaskCardData = betaTaskFactory();
const emptyTaskCardData = betaTaskFactory({
	id: "",
});

const getWrapper = (route: object, props: TaskFormProps, options?: object) => {
	const componentOptions = createComponentMocks({ i18n: true });
	const { localVue } = componentOptions;
	localVue.use(VueRouter);

	router = new VueRouter({
		routes: routes,
	});
	router.push(route);

	taskCardModuleMock = createModuleMocks(TaskCardModule, {
		getTaskCardData: props.task as TaskCardResponse,
	});

	return mount(TaskForm, {
		...componentOptions,
		provide: {
			i18n: { t: (key: string) => key },
			notifierModule: createModuleMocks(NotifierModule),
			taskCardModule: taskCardModuleMock,
		},
		localVue,
		router,
		propsData: {
			...props,
			courses: [mockCourse],
			dueDateMax: "2300-01-01T00:00:00",
		},
		...options,
	});
};

describe("TaskForm", () => {
	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
	});

	describe("when creating new beta task", () => {
		let wrapper: Wrapper<Vue>;

		beforeEach(() => {
			wrapper = getWrapper(createRoute, {
				task: emptyTaskCardData as TaskCard,
			});
		});

		it("should render component page", () => {
			expect(wrapper.findComponent(TaskForm).exists()).toBe(true);
		});

		it("should not render delete button for new beta task", () => {
			const deleteBtn = wrapper.find('[data-testid="delete-btn"]');

			expect(deleteBtn.exists()).toBe(false);
		});
	});

	describe("when editing existing beta task", () => {
		let wrapper: Wrapper<Vue>;

		beforeEach(() => {
			wrapper = getWrapper(viewEditRoute, {
				task: mockTaskCardData as TaskCard,
			});
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

			expect(taskCardModuleMock.deleteTaskCard).toHaveBeenCalledTimes(1);
			expect(router.go).toHaveBeenCalledTimes(1);
		});
	});
});
