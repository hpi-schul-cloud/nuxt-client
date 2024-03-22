import { envConfigModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import { envsFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { createMock } from "@golevelup/ts-jest";
import { mount } from "@vue/test-utils";
import RoomTaskCard from "./RoomTaskCard.vue";

const testProps = {
	room: {
		roomId: "456",
	},
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
		dueDate: "2300-09-28T15:00:00.000Z",
		displayColor: "#54616e",
		description: "some description here",
	},
	ariaLabel:
		"task, Link, Aufgabe an Marla (Mathe) - offen, zum Öffnen die Eingabetaste drücken",
	keyDrag: false,
	dragInProgress: false,
};

const draftTestProps = {
	room: {
		roomId: "456",
	},
	task: {
		id: "123",
		name: "Test Name",
		createdAt: "2017-09-28T11:58:46.601Z",
		updatedAt: "2017-09-28T11:58:46.601Z",
		status: {
			isDraft: true,
		},
		courseName: "Mathe",
		availableDate: "2017-09-28T08:00:00.000Z",
		dueDate: "2300-09-28T15:00:00.000Z",
		displayColor: "#54616e",
		description: "some description here",
	},
	ariaLabel:
		"task, Link, Aufgabe an Marla (Mathe) - offen, zum Öffnen die Eingabetaste drücken",
	keyDrag: false,
	dragInProgress: false,
};

const finishedTestProps = {
	room: {
		roomId: "456",
	},
	task: {
		id: "123",
		name: "Test Name",
		createdAt: "2017-09-28T11:58:46.601Z",
		updatedAt: "2017-09-28T11:58:46.601Z",
		status: {
			isFinished: true,
		},
		courseName: "Mathe",
		availableDate: "2017-09-28T08:00:00.000Z",
		dueDate: "2300-09-28T15:00:00.000Z",
		displayColor: "#54616e",
		description: "some description here",
	},
	ariaLabel:
		"task, Link, Aufgabe an Marla (Mathe) - abgeschlossen, zum Öffnen die Eingabetaste drücken",
	keyDrag: false,
	dragInProgress: false,
};

const overdueTestProps = {
	room: {
		roomId: "456",
	},
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
			isSubstitutionTeacher: false,
		},
		courseName: "Mathe",
		availableDate: "2017-09-28T08:00:00.000Z",
		dueDate: "2015-09-28T15:00:00.000Z",
		displayColor: "#54616e",
		description: "some description here",
	},
	ariaLabel:
		"task, Link, Aufgabe an Marla (Mathe) - offen, zum Öffnen die Eingabetaste drücken",
	keyDrag: false,
	dragInProgress: false,
};

const noDueTestProps = {
	room: {
		roomId: "456",
	},
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
		dueDate: null,
		displayColor: "#54616e",
		description: "some description here",
	},
	ariaLabel:
		"task, Link, Aufgabe an Marla (Mathe) - offen, zum Öffnen die Eingabetaste drücken",
	keyDrag: false,
	dragInProgress: false,
};

const plannedTestProps = {
	room: {
		roomId: "456",
	},
	task: {
		id: "123",
		name: "Test Name",
		createdAt: "2017-09-28T11:58:46.601Z",
		updatedAt: "2017-09-28T11:58:46.601Z",
		status: {
			isDraft: false,
		},
		courseName: "Mathe",
		availableDate: "2300-09-01T08:00:00.000Z",
		dueDate: "2300-09-28T15:00:00.000Z",
		displayColor: "#54616e",
		description: "some description here",
	},
	ariaLabel:
		"task, Link, Aufgabe an Marla (Mathe) - offen, zum Öffnen die Eingabetaste drücken",
	keyDrag: false,
	dragInProgress: false,
};

const studentFinishedTestProps = {
	task: {
		id: "123",
		name: "Test Name",
		createdAt: "2017-09-28T11:58:46.601Z",
		updatedAt: "2017-09-28T11:58:46.601Z",
		status: {
			isFinished: true,
		},
		courseName: "Mathe",
		availableDate: "2017-09-28T08:00:00.000Z",
		dueDate: "2300-09-28T15:00:00.000Z",
		displayColor: "#54616e",
		description: "some description here",
	},
	ariaLabel:
		"task, Link, Aufgabe an Marla (Mathe) - abgeschlossen, zum Öffnen die Eingabetaste drücken",
	keyDrag: false,
	dragInProgress: false,
};

const studentTestProps = {
	task: {
		id: "123",
		name: "Test Name",
		createdAt: "2017-09-28T11:58:46.601Z",
		updatedAt: "2017-09-28T11:58:46.601Z",
		status: {
			isFinished: false,
		},
		courseName: "Mathe",
		availableDate: "2017-09-28T08:00:00.000Z",
		dueDate: "2300-09-28T15:00:00.000Z",
		displayColor: "#54616e",
		description: "some description here",
	},
	ariaLabel:
		"task, Link, Aufgabe an Marla (Mathe) - offen, zum Öffnen die Eingabetaste drücken",
	keyDrag: false,
	dragInProgress: false,
};

const mockRouter = {
	push: jest.fn(),
};

const getWrapper: any = (props: object, options?: object) => {
	return mount(RoomTaskCard, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
		},
		props,
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
		const userRole = "teacher";
		it("should have correct props", () => {
			const wrapper = getWrapper({ ...testProps, userRole });

			expect(wrapper.vm.task).toStrictEqual(testProps.task);
			expect(wrapper.vm.ariaLabel).toStrictEqual(testProps.ariaLabel);
		});

		it("should redirect to homework page", async () => {
			Object.defineProperty(window, "location", {
				set: jest.fn(),
				get: () => createMock<Location>(),
			});
			const locationSpy = jest.spyOn(window, "location", "set");

			const wrapper = getWrapper({ ...testProps, userRole });
			const taskCard = wrapper.find(".task-card");

			await taskCard.trigger("click");

			expect(locationSpy).toHaveBeenCalledWith("/homework/123");
		});

		it("should NOT redirect to homework page if dragging is in progress", async () => {
			Object.defineProperty(window, "location", {
				set: jest.fn(),
				get: () => createMock<Location>(),
			});
			const locationSpy = jest.spyOn(window, "location", "set");

			const wrapper = getWrapper({
				...testProps,
				userRole,
				dragInProgress: true,
			});
			const taskCard = wrapper.find(".task-card");

			await taskCard.trigger("click");

			expect(locationSpy).toHaveBeenCalledTimes(0);
		});

		it("should have correct combined title for published task with due date ", () => {
			const wrapper = getWrapper({ ...testProps, userRole });
			const tagline = wrapper.find("[data-testid='tagline']");

			expect(tagline.element.textContent).toContain(
				"common.words.task – pages.room.taskCard.label.due 28.09.00"
			);
		});

		it("should have correct combined title for published task with no due date ", () => {
			const wrapper = getWrapper({ ...noDueTestProps, userRole });
			const tagline = wrapper.find("[data-testid='tagline']");

			expect(tagline.element.textContent).toContain(
				"common.words.task – pages.room.taskCard.label.noDueDate"
			);
		});

		it("should have correct combined title for planned task", () => {
			const wrapper = getWrapper({ ...plannedTestProps, userRole });
			const tagline = wrapper.find("[data-testid='tagline']");

			expect(tagline.element.textContent).toContain(
				"common.words.task – pages.tasks.labels.planned 01.09.00"
			);
		});

		it("should have correct combined title for draft", () => {
			const wrapper = getWrapper({ ...draftTestProps, userRole });
			const tagline = wrapper.find("[data-testid='tagline']");

			expect(tagline.element.textContent).toContain(
				"common.words.task – common.words.draft"
			);
		});

		it("should show or hide description area", async () => {
			const wrapper = getWrapper({ ...testProps, userRole });
			const descElement = wrapper.findAll(".text-description");

			expect(descElement.length).toStrictEqual(0);
			wrapper.setData({ canShowDescription: true });

			await wrapper.vm.$nextTick();

			const descElementAfter = wrapper.findAll(".text-description");
			expect(descElementAfter.length).toStrictEqual(1);
		});

		it("should use hidden UI only for unfinished task draft cards and task planned cards", async () => {
			const taskDraftWrapper = getWrapper({ ...draftTestProps, userRole });
			const taskDraftCard = taskDraftWrapper.find(".task-card");
			expect(taskDraftCard.element.className).toContain("task-hidden");

			const plannedTaskWrapper = getWrapper({ ...plannedTestProps, userRole });
			const plannedCard = plannedTaskWrapper.find(".task-card");
			expect(plannedCard.element.className).toContain("task-hidden");

			const regularTaskWrapper = getWrapper({ ...testProps, userRole });
			const taskCard = regularTaskWrapper.find(".task-card");
			expect(taskCard.element.className).not.toContain("task-hidden");
		});
	});

	describe("user role based behaviors and actions", () => {
		describe("teachers", () => {
			const userRole = "teacher";

			it("should not have submitted and graded section if task is a draft or finished or planned", () => {
				const draftWrapper = getWrapper({ ...draftTestProps, userRole });
				const draftSubmitSection = draftWrapper.findAll(".v-chip");

				expect(draftSubmitSection).toHaveLength(0);

				const finishedWrapper = getWrapper({ ...finishedTestProps, userRole });
				const finsihedSubmitSection = finishedWrapper.findAll(".v-chip");

				expect(finsihedSubmitSection).toHaveLength(0);

				const plannedWrapper = getWrapper({ ...plannedTestProps, userRole });
				const plannedSubmitSection = plannedWrapper.findAll(".v-chip");

				expect(plannedSubmitSection).toHaveLength(0);
			});

			it("should have submitted and graded section if task is not a draft and not finished", () => {
				const wrapper = getWrapper({ ...testProps, userRole });
				const submitSection = wrapper.findAllComponents(".v-chip");

				expect(submitSection).toHaveLength(2);
				expect(submitSection[0].element.textContent).toContain("0/1");
				expect(submitSection[1].element.textContent).toContain("0/1");
			});

			it("should have one 'finish' action button if task is not a draft and not finished", () => {
				const wrapper = getWrapper({ ...testProps, userRole });
				const actionButtons = wrapper.findAllComponents(".action-button");

				expect(actionButtons).toHaveLength(1);
				expect(actionButtons[0].element.textContent).toContain(
					"pages.room.taskCard.label.done"
				);
			});

			it("should have one 'post' action button if task is a draft", () => {
				const wrapper = getWrapper({ ...draftTestProps, userRole });
				const actionButtons = wrapper.findAllComponents(".action-button");

				expect(actionButtons).toHaveLength(1);
				expect(actionButtons[0].element.textContent).toContain(
					"common.action.publish"
				);
			});

			it("should have one 'post' action button if task is planned", () => {
				const wrapper = getWrapper({ ...plannedTestProps, userRole });
				const actionButtons = wrapper.findAllComponents(".action-button");

				expect(actionButtons).toHaveLength(1);
				expect(actionButtons[0].element.textContent).toContain(
					"common.action.publish"
				);
			});

			it("should have no action button if task is finished", () => {
				const wrapper = getWrapper({ ...finishedTestProps, userRole });
				const actionButtons = wrapper.findAll(".action-button");

				expect(actionButtons).toHaveLength(0);
			});

			it("should trigger the 'redirectAction' method when 'more action' edit button is clicked", async () => {
				const redirectAction = jest.fn();
				const wrapper = getWrapper({ ...testProps, userRole });
				wrapper.vm.redirectAction = redirectAction;

				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findComponent(
					`[data-testid="content-card-task-menu-edit"]`
				);
				await moreActionButton.trigger("click");

				expect(redirectAction).toHaveBeenCalled();
				expect(redirectAction.mock.calls[0][0]).toStrictEqual(
					"/homework/123/edit?returnUrl=rooms/456"
				);
			});

			it("should trigger the 'unPublishCard' method when 'more action' unpublish button is clicked", async () => {
				const unPublishCardMock = jest.fn();
				const wrapper = getWrapper({ ...testProps, userRole });
				wrapper.vm.unPublishCard = unPublishCardMock;

				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findComponent(
					`[data-testid="content-card-task-menu-revert"]`
				);
				await moreActionButton.trigger("click");

				expect(unPublishCardMock).toHaveBeenCalled();
			});

			it("should trigger the 'restoreCard' method when 'more action' restore button is clicked", async () => {
				const restoreCardMock = jest.fn();
				const wrapper = getWrapper({ ...finishedTestProps, userRole });
				wrapper.vm.restoreCard = restoreCardMock;

				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findComponent(
					`[data-testid="content-card-task-menu-restore"]`
				);
				await moreActionButton.trigger("click");

				expect(restoreCardMock).toHaveBeenCalled();
			});

			it("should emit 'delete-task' when 'more menu' delete action button clicked'", async () => {
				const wrapper = getWrapper({ ...testProps, userRole });
				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findComponent(
					`[data-testid="content-card-task-menu-remove"]`
				);
				await moreActionButton.trigger("click");

				const emitted = wrapper.emitted("delete-task");
				expect(emitted).toHaveLength(1);
			});

			it("should trigger the 'publishCard' method when 'Publish' button is clicked on a draft", async () => {
				const publishCardMock = jest.fn();
				const wrapper = getWrapper({ ...draftTestProps, userRole });
				wrapper.vm.publishCard = publishCardMock;

				const actionButton = wrapper.findComponent(
					`[data-testid="room-detail-task-action-publish"]`
				);
				await actionButton.trigger("click");

				expect(publishCardMock).toHaveBeenCalled();
			});

			it("should trigger the 'publishCard' method when 'Publish' button is clicked on a planned task", async () => {
				const publishCardMock = jest.fn();
				const wrapper = getWrapper({ ...plannedTestProps, userRole });
				wrapper.vm.publishCard = publishCardMock;

				const actionButton = wrapper.find(
					`[data-testid="room-detail-task-action-publish"]`
				);
				await actionButton.trigger("click");

				expect(publishCardMock).toHaveBeenCalled();
			});

			it("should trigger the 'finishCard' method when 'Finish' button is clicked", async () => {
				const finishCardMock = jest.fn();
				const wrapper = getWrapper({ ...testProps, userRole });
				wrapper.vm.finishCard = finishCardMock;

				const actionButton = wrapper.find(
					`[data-testid="room-detail-task-action-done"]`
				);
				await actionButton.trigger("click");

				expect(finishCardMock).toHaveBeenCalled();
			});

			it("should overdue chip is visible if the task overdued", async () => {
				const wrapper = getWrapper({ ...overdueTestProps, userRole });
				const overrdueElement = wrapper.find(".overdue");
				expect(overrdueElement.element.innerHTML).toContain(
					"pages.room.taskCard.teacher.label.overdue"
				);
			});

			it("should return false value after calculated isPlanned() method", () => {
				const availableDate = new Date();
				const localProps = {
					...testProps,
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
				jest.useFakeTimers("modern").setSystemTime(new Date()); // this line sets a permanent fake time
				const inFutureDate = new Date(Date.now() + 5001);
				const localProps = {
					...testProps,
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
						const copyCard = jest.fn();
						const wrapper = getWrapper({ ...testProps, userRole });
						wrapper.vm.copyCard = copyCard;

						const threeDotButton = wrapper.find(".three-dot-button");
						await threeDotButton.trigger("click");

						const moreActionButton = wrapper.findComponent(
							`[data-testid="content-card-task-menu-copy"]`
						);
						await moreActionButton.trigger("click");

						expect(copyCard).toHaveBeenCalled();
					});
				});

				describe("when FEATURE_COPY_SERVICE_ENABLED is set to false", () => {
					it("should not find the copy option in the 'more action' menu", async () => {
						const envs = envsFactory.build({
							FEATURE_COPY_SERVICE_ENABLED: false,
						});
						envConfigModule.setEnvs(envs);
						const wrapper = getWrapper({ ...testProps, userRole });

						const threeDotButton = wrapper.find(".three-dot-button");
						await threeDotButton.trigger("click");

						const moreActionButton = wrapper.findAll(
							`[data-testid="content-card-task-menu-copy"]`
						);

						expect(moreActionButton).toHaveLength(0);
					});
				});
			});
		});

		describe("students", () => {
			const userRole = "student";
			it("should have no button if task is finished", async () => {
				const wrapper = getWrapper({ ...studentFinishedTestProps, userRole });
				const actionButtons = wrapper.findAll(".action-button");

				expect(actionButtons).toHaveLength(0);
			});

			it("should have finish button if task is not marked as finished", async () => {
				const finishCardMock = jest.fn();
				const wrapper = getWrapper({ ...studentTestProps, userRole });
				wrapper.vm.finishCard = finishCardMock;
				const actionButton = wrapper.findComponent(
					`[data-testid="room-detail-task-action-done"]`
				);

				expect(actionButton.element.textContent).toContain(
					"pages.room.taskCard.label.done"
				);

				await actionButton.trigger("click");
				expect(finishCardMock).toHaveBeenCalled();
			});

			it("should trigger the 'restoreCard' method when 'more action' restore button is clicked", async () => {
				const restoreCardMock = jest.fn();
				const wrapper = getWrapper({ ...studentFinishedTestProps, userRole });
				wrapper.vm.restoreCard = restoreCardMock;

				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findComponent(
					`[data-testid="content-card-task-menu-restore"]`
				);
				await moreActionButton.trigger("click");

				expect(restoreCardMock).toHaveBeenCalled();
			});

			it("should have time-remaining chip if task has due date, expires in less then 24 hours and not submitted", () => {
				const dueDate = new Date();
				dueDate.setHours(dueDate.getHours() + 3);

				const localProps = {
					...testProps,
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
					...testProps,
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
					...testProps,
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
					...testProps,
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
				const finishedWrapper = getWrapper({ ...finishedTestProps, userRole });
				const chips = finishedWrapper.findAll(".v-chip");

				expect(chips).toHaveLength(0);

				expect(
					finishedWrapper.find("[data-test-id='dueDateHintLabel']").exists()
				).toBe(false);
			});
		});
	});

	describe("keypress events", () => {
		const userRole = "teacher";
		it("should call 'handleClick' event when 'enter' key is pressed", async () => {
			const wrapper = getWrapper({ ...testProps, userRole });

			Object.defineProperty(window, "location", {
				set: jest.fn(),
				get: () => createMock<Location>(),
			});

			const locationSpy = jest.spyOn(window, "location", "set");

			await wrapper.trigger("keydown.enter");

			expect(locationSpy).toHaveBeenCalledWith("/homework/123");
		});

		it("should call 'onKeyPress' event when 'up, down, space' keys are pressed", async () => {
			const wrapper = getWrapper({ ...testProps, keyDrag: true, userRole });

			await wrapper.trigger("keydown.up");

			expect(wrapper.emitted("move-element")).toHaveLength(1);
			expect(wrapper.emitted("move-element")[0][0]).toStrictEqual({
				id: testProps.task.id,
				moveIndex: -1,
			});

			await wrapper.trigger("keydown.down");

			expect(wrapper.emitted("move-element")).toHaveLength(2);
			expect(wrapper.emitted("move-element")[1][0]).toStrictEqual({
				id: testProps.task.id,
				moveIndex: 1,
			});

			await wrapper.trigger("keydown.space");

			expect(wrapper.emitted("on-drag")).toHaveLength(1);
		});

		it("should emit 'tab-pressed' event when 'tab' key is pressed", async () => {
			const wrapper = getWrapper({ ...testProps, userRole });

			await wrapper.trigger("keydown", { key: "tab" });

			const emitted = wrapper.emitted();
			expect(emitted["tab-pressed"]).toHaveLength(1);
		});
	});
});
