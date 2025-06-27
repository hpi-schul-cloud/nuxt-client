import { ImportUserResponseRoleNamesEnum as Roles } from "@/serverApi/v3";
import { envConfigModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import { Task } from "@/store/types/room";
import { envsFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { createMock } from "@golevelup/ts-jest";
import { mount } from "@vue/test-utils";
import RoomTaskCard from "./RoomTaskCard.vue";
import { nextTick } from "vue";

const testTask = {
	id: "123",
	name: "Test Name",
	createdAt: "2017-09-28T11:58:46.601Z",
	updatedAt: "2017-09-28T11:58:46.601Z",
	status: {
		submitted: 0,
		maxSubmissions: 1,
		graded: 0,
		isDraft: false,
		isFinished: false,
		isSubstitutionTeacher: false,
	},
	courseId: "789",
	courseName: "Mathe",
	availableDate: "2017-09-28T08:00:00.000Z",
	dueDate: "2300-09-28T15:00:00.000Z",
	displayColor: "#54616e",
	description: "some description here",
};

const draftTestTask = {
	id: "123",
	name: "Test Name",
	createdAt: "2017-09-28T11:58:46.601Z",
	updatedAt: "2017-09-28T11:58:46.601Z",
	status: {
		submitted: 0,
		maxSubmissions: 1,
		graded: 0,
		isDraft: true,
		isFinished: false,
		isSubstitutionTeacher: false,
	},
	courseId: "789",
	courseName: "Mathe",
	availableDate: "2017-09-28T08:00:00.000Z",
	dueDate: "2300-09-28T15:00:00.000Z",
	displayColor: "#54616e",
	description: "some description here",
};

const finishedTestTask = {
	id: "123",
	name: "Test Name",
	createdAt: "2017-09-28T11:58:46.601Z",
	updatedAt: "2017-09-28T11:58:46.601Z",
	status: {
		submitted: 0,
		maxSubmissions: 1,
		graded: 0,
		isDraft: false,
		isSubstitutionTeacher: false,
		isFinished: true,
	},
	courseId: "789",
	courseName: "Mathe",
	availableDate: "2017-09-28T08:00:00.000Z",
	dueDate: "2300-09-28T15:00:00.000Z",
	displayColor: "#54616e",
	description: "some description here",
};

const overdueTestTask = {
	id: "123",
	name: "Test Name",
	createdAt: "2017-09-28T11:58:46.601Z",
	updatedAt: "2017-09-28T11:58:46.601Z",
	status: {
		submitted: 0,
		maxSubmissions: 1,
		graded: 0,
		isDraft: false,
		isSubstitutionTeacher: false,
		isFinished: false,
	},
	courseId: "789",
	courseName: "Mathe",
	availableDate: "2017-09-28T08:00:00.000Z",
	dueDate: "2015-09-28T15:00:00.000Z",
	displayColor: "#54616e",
	description: "some description here",
};

const noDueTestTask = {
	id: "123",
	name: "Test Name",
	createdAt: "2017-09-28T11:58:46.601Z",
	updatedAt: "2017-09-28T11:58:46.601Z",
	status: {
		submitted: 0,
		maxSubmissions: 1,
		graded: 0,
		isDraft: false,
		isFinished: false,
		isSubstitutionTeacher: false,
	},
	courseId: "789",
	courseName: "Mathe",
	availableDate: "2017-09-28T08:00:00.000Z",
	dueDate: undefined,
	displayColor: "#54616e",
	description: "some description here",
};

const plannedTestTask = {
	id: "123",
	name: "Test Name",
	createdAt: "2017-09-28T11:58:46.601Z",
	updatedAt: "2017-09-28T11:58:46.601Z",
	status: {
		submitted: 0,
		maxSubmissions: 1,
		graded: 0,
		isDraft: false,
		isFinished: false,
		isSubstitutionTeacher: false,
	},
	courseId: "789",
	courseName: "Mathe",
	availableDate: "2300-09-01T08:00:00.000Z",
	dueDate: "2300-09-28T15:00:00.000Z",
	displayColor: "#54616e",
	description: "some description here",
};

const studentFinishedTestTask = {
	id: "123",
	name: "Test Name",
	createdAt: "2017-09-28T11:58:46.601Z",
	updatedAt: "2017-09-28T11:58:46.601Z",
	status: {
		submitted: 0,
		maxSubmissions: 1,
		graded: 0,
		isDraft: false,
		isFinished: true,
		isSubstitutionTeacher: false,
	},
	courseId: "789",
	courseName: "Mathe",
	availableDate: "2017-09-28T08:00:00.000Z",
	dueDate: "2300-09-28T15:00:00.000Z",
	displayColor: "#54616e",
	description: "some description here",
};

const studentTestTask = {
	id: "123",
	name: "Test Name",
	createdAt: "2017-09-28T11:58:46.601Z",
	updatedAt: "2017-09-28T11:58:46.601Z",
	status: {
		submitted: 0,
		maxSubmissions: 1,
		graded: 0,
		isDraft: false,
		isFinished: false,
		isSubstitutionTeacher: false,
	},
	courseId: "789",
	courseName: "Mathe",
	availableDate: "2017-09-28T08:00:00.000Z",
	dueDate: "2300-09-28T15:00:00.000Z",
	displayColor: "#54616e",
	description: "some description here",
};

const mockRouter = {
	push: jest.fn(),
};

const getWrapper = (
	props: {
		task: Task;
		userRole: Roles;
		dragInProgress?: boolean;
		keyDrag?: boolean;
	},
	options?: object
) => {
	Object.defineProperty(window, "location", {
		configurable: true,
		value: { assign: jest.fn() },
	});

	return mount(RoomTaskCard, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
		},
		props: {
			room: {
				roomId: "456",
			},
			taskCardIndex: 0,
			ariaLabel: props.task.name,
			keyDrag: props.keyDrag || false,
			dragInProgress: props.dragInProgress || false,
			task: props.task,
			userRole: props.userRole,
		},
		...options,
		mocks: {
			$router: mockRouter,
		},
	});
};

describe("@/components/molecules/RoomTaskCard", () => {
	beforeEach(() => {
		window.location.pathname = "";
		setupStores({ envConfigModule: EnvConfigModule });
	});

	describe("common behaviors and actions", () => {
		const userRole = Roles.Teacher;
		it("should have correct props", () => {
			const wrapper = getWrapper({ task: testTask, userRole });

			expect(wrapper.vm.task).toStrictEqual(testTask);
			expect(wrapper.vm.ariaLabel).toStrictEqual(testTask.name);
		});

		it("should redirect to homework page", async () => {
			const wrapper = getWrapper({ task: testTask, userRole });
			const taskCard = wrapper.find(".task-card");

			await taskCard.trigger("click");

			expect(window.location.assign).toHaveBeenCalledWith("/homework/123");
		});

		it("should NOT redirect to homework page if dragging is in progress", async () => {
			const wrapper = getWrapper({
				task: testTask,
				userRole,
				dragInProgress: true,
			});
			const taskCard = wrapper.find(".task-card");

			await taskCard.trigger("click");

			expect(window.location.assign).toHaveBeenCalledTimes(0);
		});

		it("should have correct combined title for published task with due date ", () => {
			const wrapper = getWrapper({ task: testTask, userRole });
			const tagline = wrapper.find("[data-testid='task-card-title-0']");

			expect(tagline.element.textContent).toContain(
				"common.words.task – pages.room.taskCard.label.due 28.09.00"
			);
		});

		it("should have correct combined title for published task with no due date ", () => {
			const wrapper = getWrapper({ task: noDueTestTask, userRole });
			const tagline = wrapper.find("[data-testid='task-card-title-0']");

			expect(tagline.element.textContent).toContain(
				"common.words.task – pages.room.taskCard.label.noDueDate"
			);
		});

		it("should have correct combined title for planned task", () => {
			const wrapper = getWrapper({ task: plannedTestTask, userRole });
			const tagline = wrapper.find("[data-testid='task-card-title-0']");

			expect(tagline.element.textContent).toContain(
				"common.words.task – pages.tasks.labels.planned 01.09.00"
			);
		});

		it("should have correct combined title for draft", () => {
			const wrapper = getWrapper({ task: draftTestTask, userRole });
			const tagline = wrapper.find("[data-testid='task-card-title-0']");

			expect(tagline.element.textContent).toContain(
				"common.words.task – common.words.draft"
			);
		});

		it("should show or hide description area", async () => {
			const wrapper = getWrapper({ task: testTask, userRole });
			wrapper.vm.canShowDescription = true;
			const descElement = wrapper.findAll(".text-description");

			expect(descElement.length).toStrictEqual(0);

			await wrapper.vm.$nextTick();

			const descElementAfter = wrapper.findAll(".text-description");
			expect(descElementAfter.length).toStrictEqual(1);
		});

		it("should use hidden UI only for unfinished task draft cards and task planned cards", async () => {
			const taskDraftWrapper = getWrapper({
				task: draftTestTask,
				userRole,
			});
			const taskDraftCard = taskDraftWrapper.find(".task-card");
			expect(taskDraftCard.element.className).toContain("task-hidden");

			const plannedTaskWrapper = getWrapper({
				task: plannedTestTask,
				userRole,
			});
			const plannedCard = plannedTaskWrapper.find(".task-card");
			expect(plannedCard.element.className).toContain("task-hidden");

			const regularTaskWrapper = getWrapper({
				task: testTask,
				userRole,
			});
			const taskCard = regularTaskWrapper.find(".task-card");
			expect(taskCard.element.className).not.toContain("task-hidden");
		});
	});

	describe("user role based behaviors and actions", () => {
		describe("teachers", () => {
			const userRole = Roles.Teacher;

			it("should not have submitted and graded section if task is a draft or finished or planned", () => {
				const draftWrapper = getWrapper({
					task: draftTestTask,
					userRole,
				});
				const draftSubmitSection = draftWrapper.findAll(".v-chip");

				expect(draftSubmitSection).toHaveLength(0);

				const finishedWrapper = getWrapper({
					task: finishedTestTask,
					userRole,
				});
				const finsihedSubmitSection = finishedWrapper.findAll(".v-chip");

				expect(finsihedSubmitSection).toHaveLength(0);

				const plannedWrapper = getWrapper({
					task: plannedTestTask,
					userRole,
				});
				const plannedSubmitSection = plannedWrapper.findAll(".v-chip");

				expect(plannedSubmitSection).toHaveLength(0);
			});

			it("should have submitted and graded section if task is not a draft and not finished", () => {
				const wrapper = getWrapper({ task: testTask, userRole });
				const submitSection = wrapper.findAllComponents(".v-chip");

				expect(submitSection).toHaveLength(2);
				expect(submitSection[0].element.textContent).toContain("0/1");
				expect(submitSection[1].element.textContent).toContain("0/1");
			});

			it("should have one 'finish' action button if task is not a draft and not finished", () => {
				const wrapper = getWrapper({ task: testTask, userRole });
				const actionButtons = wrapper.findAllComponents(".action-button");

				expect(actionButtons).toHaveLength(1);
				expect(actionButtons[0].element.textContent).toContain(
					"pages.room.taskCard.label.done"
				);
			});

			it("should have one 'post' action button if task is a draft", () => {
				const wrapper = getWrapper({ task: draftTestTask, userRole });
				const actionButtons = wrapper.findAllComponents(".action-button");

				expect(actionButtons).toHaveLength(1);
				expect(actionButtons[0].element.textContent).toContain(
					"common.action.publish"
				);
			});

			it("should have one 'post' action button if task is planned", () => {
				const wrapper = getWrapper({ task: plannedTestTask, userRole });
				const actionButtons = wrapper.findAllComponents(".action-button");

				expect(actionButtons).toHaveLength(1);
				expect(actionButtons[0].element.textContent).toContain(
					"common.action.publish"
				);
			});

			it("should have no action button if task is finished", () => {
				const wrapper = getWrapper({ task: finishedTestTask, userRole });
				const actionButtons = wrapper.findAll(".action-button");

				expect(actionButtons).toHaveLength(0);
			});

			it("should trigger the 'redirectAction' method when 'more action' edit button is clicked", async () => {
				const wrapper = getWrapper({ task: testTask, userRole });

				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findComponent(
					`[data-testid="room-task-card-menu-edit-0"]`
				);
				await moreActionButton.trigger("click");

				expect(window.location.assign).toHaveBeenCalledWith(
					"/homework/123/edit?returnUrl=rooms/456"
				);
			});

			it("should trigger the 'unPublishCard' method when 'more action' unpublish button is clicked", async () => {
				const wrapper = getWrapper({ task: testTask, userRole });

				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findComponent(
					`[data-testid="room-task-card-menu-revert-0"]`
				);
				await moreActionButton.trigger("click");

				const emitted = wrapper.emitted("update-visibility");

				expect(emitted).toBeDefined();
				expect(emitted && emitted[0][0]).toBe(false);
			});

			it("should trigger the 'restoreCard' method when 'more action' restore button is clicked", async () => {
				const wrapper = getWrapper({
					task: finishedTestTask,
					userRole,
				});

				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findComponent(
					`[data-testid="room-task-card-menu-restore-0"]`
				);
				await moreActionButton.trigger("click");

				expect(wrapper.emitted("restore-task")).toBeDefined();
			});

			it("should emit 'delete-task' when 'more menu' delete action button clicked'", async () => {
				const wrapper = getWrapper({ task: testTask, userRole });
				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findComponent(
					`[data-testid="room-task-card-menu-remove-0"]`
				);
				await moreActionButton.trigger("click");

				const emitted = wrapper.emitted("delete-task");
				expect(emitted).toHaveLength(1);
			});

			it("should trigger the 'publishCard' method when 'Publish' button is clicked on a draft", async () => {
				const wrapper = getWrapper({
					task: draftTestTask,
					userRole,
				});

				const actionButton = wrapper.findComponent(
					`[data-testid="task-card-action-publish-0"]`
				);
				await actionButton.trigger("click");

				const emitted = wrapper.emitted("update-visibility");
				expect(emitted).toBeDefined();
				expect(emitted && emitted[0][0]).toBe(true);
			});

			it("should trigger the 'publishCard' method when 'Publish' button is clicked on a planned task", async () => {
				const wrapper = getWrapper({
					task: plannedTestTask,
					userRole,
				});

				const actionButton = wrapper.find(
					`[data-testid="task-card-action-publish-0"]`
				);
				await actionButton.trigger("click");

				const emitted = wrapper.emitted("update-visibility");
				expect(emitted).toBeDefined();
				expect(emitted && emitted[0][0]).toBe(true);
			});

			it("should trigger the 'finishCard' method when 'Finish' button is clicked", async () => {
				const wrapper = getWrapper({ task: testTask, userRole });

				const actionButton = wrapper.find(
					`[data-testid="task-card-action-done-0"]`
				);
				await actionButton.trigger("click");

				expect(wrapper.emitted("finish-task")).toBeDefined();
			});

			it("should overdue chip is visible if the task overdued", async () => {
				const wrapper = getWrapper({ task: overdueTestTask, userRole });
				const overrdueElement = wrapper.find(".overdue");
				expect(overrdueElement.element.innerHTML).toContain(
					"pages.room.taskCard.teacher.label.overdue"
				);
			});

			it("should return false value after calculated isPlanned() method", () => {
				const availableDate = new Date();
				const localProps = {
					...testTask,
					task: {
						id: "123",
						name: "Test Name",
						createdAt: "2017-09-28T11:58:46.601Z",
						updatedAt: "2017-09-28T11:58:46.601Z",
						status: {
							submitted: 0,
							maxSubmissions: 1,
							graded: 0,
							isDraft: false,
							isFinished: false,
							isSubstitutionTeacher: false,
						},
						courseName: "Mathe",
						availableDate: availableDate.toISOString(),
						dueDate: "2300-09-28T15:00:00.000Z",
						displayColor: "#54616e",
						description: "some description here",
					},
				};
				const wrapper = getWrapper({ ...localProps, userRole });
				const { vm } = wrapper;
				expect(vm.isPlanned).toBe(false);
			});

			it("should return true value after calculated isPlanned() method", () => {
				jest.useFakeTimers().setSystemTime(new Date()); // this line sets a permanent fake time
				const inFutureDate = new Date(Date.now() + 5001);
				const localProps = {
					...testTask,
					task: {
						id: "123",
						name: "Test Name",
						createdAt: "2017-09-28T11:58:46.601Z",
						updatedAt: "2017-09-28T11:58:46.601Z",
						status: {
							submitted: 0,
							maxSubmissions: 1,
							graded: 0,
							isDraft: false,
							isFinished: false,
							isSubstitutionTeacher: false,
						},
						courseName: "Mathe",
						availableDate: inFutureDate.toISOString(),
						dueDate: "2300-09-28T15:00:00.000Z",
						displayColor: "#54616e",
						description: "some description here",
					},
				};
				const wrapper = getWrapper({ ...localProps, userRole });
				const { vm } = wrapper;
				expect(vm.isPlanned).toBe(true);
			});

			describe("test FEATURE_COPY_SERVICE_ENABLED feature flag", () => {
				describe("when FEATURE_COPY_SERVICE_ENABLED is set to true", () => {
					it("should trigger the 'copyCard' method when 'more action' copy button is clicked", async () => {
						const envs = envsFactory.build({
							FEATURE_COPY_SERVICE_ENABLED: true,
						});
						envConfigModule.setEnvs(envs);
						const wrapper = getWrapper({
							task: testTask,
							userRole,
						});

						const threeDotButton = wrapper.find(".three-dot-button");
						await threeDotButton.trigger("click");

						const moreActionButton = wrapper.findComponent(
							`[data-testid="room-task-card-menu-copy-0"]`
						);
						await moreActionButton.trigger("click");
						await nextTick();
						expect(wrapper.emitted("copy-task")).toBeDefined();
					});
				});

				describe("when FEATURE_COPY_SERVICE_ENABLED is set to false", () => {
					it("should not find the copy option in the 'more action' menu", async () => {
						const envs = envsFactory.build({
							FEATURE_COPY_SERVICE_ENABLED: false,
						});
						envConfigModule.setEnvs(envs);
						const wrapper = getWrapper({ task: testTask, userRole });

						const threeDotButton = wrapper.find(".three-dot-button");
						await threeDotButton.trigger("click");

						const moreActionButton = wrapper.findAll(
							`[data-testid="room-task-card-menu-copy-0"]`
						);

						expect(moreActionButton).toHaveLength(0);
					});
				});
			});
		});

		describe("students", () => {
			const userRole = Roles.Student;
			it("should have no button if task is finished", async () => {
				const wrapper = getWrapper({
					task: studentFinishedTestTask,
					userRole,
				});
				const actionButtons = wrapper.findAll(".action-button");

				expect(actionButtons).toHaveLength(0);
			});

			it("should have finish button if task is not marked as finished", async () => {
				const wrapper = getWrapper({
					task: studentTestTask,
					userRole,
				});

				const actionButton = wrapper.findComponent(
					`[data-testid="task-card-action-done-0"]`
				);

				expect(actionButton.element.textContent).toContain(
					"pages.room.taskCard.label.done"
				);

				await actionButton.trigger("click");
				expect(wrapper.emitted("finish-task")).toBeDefined();
			});

			it("should trigger the 'restoreCard' method when 'more action' restore button is clicked", async () => {
				const wrapper = getWrapper({
					task: studentFinishedTestTask,
					userRole,
				});

				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findComponent(
					`[data-testid="room-task-card-menu-restore-0"]`
				);
				await moreActionButton.trigger("click");

				expect(wrapper.emitted("restore-task")).toBeDefined();
			});

			it("should have time-remaining chip if task has due date, expires in less then 24 hours and not submitted", () => {
				const dueDate = new Date();
				dueDate.setHours(dueDate.getHours() + 3);

				const localProps = {
					...testTask,
					task: {
						id: "123",
						name: "Test Name",
						createdAt: "2017-09-28T11:58:46.601Z",
						updatedAt: "2017-09-28T11:58:46.601Z",
						status: {
							submitted: 0,
							maxSubmissions: 1,
							graded: 0,
							isDraft: false,
							isFinished: false,
							isSubstitutionTeacher: false,
						},
						courseName: "Mathe",
						availableDate: "2017-09-28T08:00:00.000Z",
						dueDate: dueDate.toISOString(),
						displayColor: "#54616e",
						description: "some description here",
					},
				};
				const wrapper = getWrapper({ ...localProps, userRole });

				expect(wrapper.find("[data-test-id='dueDateHintLabel']").exists()).toBe(
					true
				);
			});

			it("should have missed chip if task has due date, is expired and not submitted", () => {
				const localProps = {
					...testTask,
					task: {
						id: "123",
						name: "Test Name",
						createdAt: "2017-09-28T11:58:46.601Z",
						updatedAt: "2017-09-28T11:58:46.601Z",
						status: {
							submitted: 0,
							maxSubmissions: 1,
							graded: 0,
							isDraft: false,
							isFinished: false,
							isSubstitutionTeacher: false,
						},
						courseName: "Mathe",
						availableDate: "2017-09-28T08:00:00.000Z",
						dueDate: "2000-01-01T00:00:00.000Z",
						displayColor: "#54616e",
						description: "some description here",
					},
				};
				const wrapper = getWrapper({ ...localProps, userRole });
				const chips = wrapper.find(".overdue");

				expect(chips.element.textContent).toContain(
					"pages.room.taskCard.student.label.overdue"
				);
			});

			it("should have submitted chip if task is submitted", () => {
				const localProps = {
					...testTask,
					task: {
						id: "123",
						name: "Test Name",
						createdAt: "2017-09-28T11:58:46.601Z",
						updatedAt: "2017-09-28T11:58:46.601Z",
						status: {
							submitted: 1,
							maxSubmissions: 1,
							graded: 0,
							isDraft: false,
							isFinished: false,
							isSubstitutionTeacher: false,
						},
						courseName: "Mathe",
						availableDate: "2017-09-28T08:00:00.000Z",
						dueDate: "2000-01-01T00:00:00.000Z",
						displayColor: "#54616e",
						description: "some description here",
					},
				};
				const wrapper = getWrapper({ ...localProps, userRole });
				const chips = wrapper.find(".submitted");

				expect(chips.element.textContent).toContain(
					"pages.room.taskCard.student.label.submitted"
				);
			});

			it("should have graded chip if task is graded", () => {
				const localProps = {
					...testTask,
					task: {
						id: "123",
						name: "Test Name",
						createdAt: "2017-09-28T11:58:46.601Z",
						updatedAt: "2017-09-28T11:58:46.601Z",
						status: {
							submitted: 1,
							maxSubmissions: 1,
							graded: 1,
							isDraft: false,
							isFinished: false,
							isSubstitutionTeacher: false,
						},
						courseName: "Mathe",
						availableDate: "2017-09-28T08:00:00.000Z",
						dueDate: "2000-01-01T00:00:00.000Z",
						displayColor: "#54616e",
						description: "some description here",
					},
				};
				const wrapper = getWrapper({ ...localProps, userRole });
				const chips = wrapper.find(".graded");

				expect(chips.element.textContent).toContain(
					"pages.room.taskCard.label.graded"
				);
			});

			it("should have no chips if task is finished", () => {
				const finishedWrapper = getWrapper({
					task: finishedTestTask,
					userRole,
				});
				const chips = finishedWrapper.findAll(".v-chip");

				expect(chips).toHaveLength(0);

				expect(
					finishedWrapper.find("[data-test-id='dueDateHintLabel']").exists()
				).toBe(false);
			});
		});
	});

	describe("keypress events", () => {
		const userRole = Roles.Teacher;
		it("should call 'handleClick' event when 'enter' key is pressed", async () => {
			const wrapper = getWrapper({ task: testTask, userRole });

			await wrapper.trigger("keydown.enter");
			await nextTick();

			expect(window.location.assign).toHaveBeenCalledWith("/homework/123");
		});

		it("should call 'onKeyPress' event when 'up, down, space' keys are pressed", async () => {
			const wrapper = getWrapper({
				task: testTask,
				userRole,
				dragInProgress: false,
				keyDrag: true,
			});

			await wrapper.trigger("keydown.up");

			expect(wrapper.emitted("move-element")).toHaveLength(1);
			expect(wrapper.emitted("move-element")).toStrictEqual([
				[
					{
						id: testTask.id,
						moveIndex: -1,
					},
				],
			]);

			await wrapper.trigger("keydown.down");

			expect(wrapper.emitted("move-element")).toHaveLength(2);
			expect(wrapper.emitted("move-element")).toStrictEqual([
				[
					{
						id: testTask.id,
						moveIndex: -1,
					},
				],
				[
					{
						id: testTask.id,
						moveIndex: 1,
					},
				],
			]);

			await wrapper.trigger("keydown.space");

			expect(wrapper.emitted("on-drag")).toHaveLength(1);
		});

		it("should emit 'tab-pressed' event when 'tab' key is pressed", async () => {
			const wrapper = getWrapper({ task: testTask, userRole });

			await wrapper.trigger("keydown", { key: "tab" });

			const emitted = wrapper.emitted();
			expect(emitted["tab-pressed"]).toHaveLength(1);
		});
	});
});
