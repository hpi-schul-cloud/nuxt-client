import { mount } from "@vue/test-utils";
import RoomTaskCard from "./RoomTaskCard.vue";
import EnvConfigModule from "@/store/env-config";
import setupStores from "@@/tests/test-utils/setupStores";
import { envConfigModule } from "@/store";

declare var createComponentMocks: Function;

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
		duedate: "2300-09-28T15:00:00.000Z",
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
		duedate: "2300-09-28T15:00:00.000Z",
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
		duedate: "2300-09-28T15:00:00.000Z",
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
		duedate: "2015-09-28T15:00:00.000Z",
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
		duedate: null,
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
		duedate: "2300-09-28T15:00:00.000Z",
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
		duedate: "2300-09-28T15:00:00.000Z",
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
		duedate: "2300-09-28T15:00:00.000Z",
		displayColor: "#54616e",
		description: "some description here",
	},
	ariaLabel:
		"task, Link, Aufgabe an Marla (Mathe) - offen, zum Öffnen die Eingabetaste drücken",
	keyDrag: false,
	dragInProgress: false,
};

const getWrapper: any = (props: object, options?: object) => {
	return mount(RoomTaskCard, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("@/components/molecules/RoomTaskCard", () => {
	beforeEach(() => {
		document.body.setAttribute("data-app", "true");
		window.location.pathname = "";
		setupStores({ envConfigModule: EnvConfigModule });
	});

	describe("common behaviors and actions", () => {
		const role = "teacher";
		it("should have correct props", () => {
			const wrapper = getWrapper({ ...testProps, role });

			expect(wrapper.vm.task).toStrictEqual(testProps.task);
			expect(wrapper.vm.ariaLabel).toStrictEqual(testProps.ariaLabel);
		});

		it("should redirect to homework page", () => {
			const { location } = window;
			const wrapper = getWrapper({ ...testProps, role });
			const taskCard = wrapper.find(".task-card");
			taskCard.trigger("click");

			expect(location.pathname).toStrictEqual("/homework/123");
		});

		it("should NOT redirect to homework page if dragging is in progress", () => {
			const { location } = window;
			const wrapper = getWrapper({ ...testProps, role, dragInProgress: true });
			const taskCard = wrapper.find(".task-card");
			taskCard.trigger("click");

			expect(location.pathname).toStrictEqual("");
		});

		it("should have correct combined title for published task with due date ", () => {
			const wrapper = getWrapper({ ...testProps, role });
			const title = wrapper.find(".title-section");

			expect(title.element.textContent).toContain("Aufgabe – Abgabe 28.09.00");
		});

		it("should have correct combined title for published task with no due date ", () => {
			const wrapper = getWrapper({ ...noDueTestProps, role });
			const title = wrapper.find(".title-section");

			expect(title.element.textContent).toContain("Aufgabe – Kein Abgabedatum");
		});

		it("should have correct combined title for planned task", () => {
			const wrapper = getWrapper({ ...plannedTestProps, role });
			const title = wrapper.find(".title-section");

			expect(title.element.textContent).toContain("Aufgabe – Geplant 01.09.00");
		});

		it("should have correct combined title for draft", () => {
			const wrapper = getWrapper({ ...draftTestProps, role });
			const title = wrapper.find(".title-section");

			expect(title.element.textContent).toContain("Aufgabe – Entwurf");
		});

		it("should show or hide description area", async () => {
			const wrapper = getWrapper({ ...testProps, role });
			const descElement = wrapper.findAll(".text-description");

			expect(descElement.length).toStrictEqual(0);
			wrapper.setData({ canShowDescription: true });
			await wrapper.vm.$nextTick();
			const descElementAfter = wrapper.findAll(".text-description");
			expect(descElementAfter).toHaveLength(1);
			expect(descElementAfter.wrappers[0].element.innerHTML).toStrictEqual(
				"some description here"
			);
		});

		it("should use hidden UI only for unfinished task draft cards and task planned cards", async () => {
			const taskDraftWrapper = getWrapper({ ...draftTestProps, role });
			const taskDraftCard = taskDraftWrapper.find(".task-card");
			expect(taskDraftCard.element.className).toContain("task-hidden");

			const plannedTaskWrapper = getWrapper({ ...plannedTestProps, role });
			const plannedCard = plannedTaskWrapper.find(".task-card");
			expect(plannedCard.element.className).toContain("task-hidden");

			const regularTaskWrapper = getWrapper({ ...testProps, role });
			const taskCard = regularTaskWrapper.find(".task-card");
			expect(taskCard.element.className).not.toContain("task-hidden");
		});
	});

	describe("user role based behaviors and actions", () => {
		describe("teachers", () => {
			const role = "teacher";
			it("should not have submitted and graded section if task is a draft or finished or planned", () => {
				const draftWrapper = getWrapper({ ...draftTestProps, role });
				const draftSubmitSection = draftWrapper.findAll(".v-chip");

				expect(draftSubmitSection).toHaveLength(0);

				const finishedWrapper = getWrapper({ ...finishedTestProps, role });
				const finsihedSubmitSection = finishedWrapper.findAll(".v-chip");

				expect(finsihedSubmitSection).toHaveLength(0);

				const plannedWrapper = getWrapper({ ...plannedTestProps, role });
				const plannedSubmitSection = plannedWrapper.findAll(".v-chip");

				expect(plannedSubmitSection).toHaveLength(0);
			});

			it("should have submitted and graded section if task is not a draft and not finished", () => {
				const wrapper = getWrapper({ ...testProps, role });
				const submitSection = wrapper.findAll(".v-chip");

				expect(submitSection).toHaveLength(2);
				expect(submitSection.wrappers[0].element.textContent).toContain("0/1");
				expect(submitSection.wrappers[1].element.textContent).toContain("0/1");
			});

			it("should have one 'finish' action button if task is not a draft and not finished", () => {
				const wrapper = getWrapper({ ...testProps, role });
				const actionButtons = wrapper.findAll(".action-button");

				expect(actionButtons).toHaveLength(1);
				expect(actionButtons.wrappers[0].element.textContent).toContain(
					wrapper.vm.$i18n.t("pages.room.taskCard.label.done")
				);
			});

			it("should have one 'post' action button if task is a draft", () => {
				const wrapper = getWrapper({ ...draftTestProps, role });
				const actionButtons = wrapper.findAll(".action-button");

				expect(actionButtons).toHaveLength(1);
				expect(actionButtons.wrappers[0].element.textContent).toContain(
					wrapper.vm.$i18n.t("common.action.publish")
				);
			});

			it("should have one 'post' action button if task is planned", () => {
				const wrapper = getWrapper({ ...plannedTestProps, role });
				const actionButtons = wrapper.findAll(".action-button");

				expect(actionButtons).toHaveLength(1);
				expect(actionButtons.wrappers[0].element.textContent).toContain(
					wrapper.vm.$i18n.t("common.action.publish")
				);
			});

			it("should have no action button if task is finished", () => {
				const wrapper = getWrapper({ ...finishedTestProps, role });
				const actionButtons = wrapper.findAll(".action-button");

				expect(actionButtons).toHaveLength(0);
			});

			it("should trigger the 'redirectAction' method when 'more action' edit button is clicked", async () => {
				const redirectAction = jest.fn();
				const wrapper = getWrapper({ ...testProps, role });
				wrapper.vm.redirectAction = redirectAction;
				const buttonClassName = `.menu-action-${wrapper.vm.$i18n.t(
					"pages.room.taskCard.label.edit"
				)}`;

				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.find(buttonClassName);
				await moreActionButton.trigger("click");

				expect(redirectAction).toHaveBeenCalled();
				expect(redirectAction.mock.calls[0][0]).toStrictEqual(
					"/homework/123/edit?returnUrl=rooms/456"
				);
			});

			it("should trigger the 'revertPublishedCard' method when 'more action' revert button is clicked", async () => {
				const revertPublishedCardMock = jest.fn();
				const wrapper = getWrapper({ ...testProps, role });
				wrapper.vm.revertPublishedCard = revertPublishedCardMock;
				const buttonClassName = `.menu-action-${wrapper.vm.$i18n
					.t("pages.room.cards.label.revert")
					.split(" ")
					.join("-")}`;
				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.find(buttonClassName);
				await moreActionButton.trigger("click");

				expect(revertPublishedCardMock).toHaveBeenCalled();
			});

			it("should trigger the 'restoreCard' method when 'more action' restore button is clicked", async () => {
				const restoreCardMock = jest.fn();
				const wrapper = getWrapper({ ...finishedTestProps, role });
				wrapper.vm.restoreCard = restoreCardMock;
				const buttonClassName = `.menu-action-${wrapper.vm.$i18n.t(
					"common.labels.restore"
				)}`;
				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.find(buttonClassName);
				await moreActionButton.trigger("click");

				expect(restoreCardMock).toHaveBeenCalled();
			});

			it("should emit 'delete-task' when 'more menu' delete action button clicked'", async () => {
				const wrapper = getWrapper({ ...testProps, role });
				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");
				const buttonClassName = `.menu-action-${wrapper.vm.$i18n.t(
					"common.actions.remove"
				)}`;

				const moreActionButton = wrapper.find(buttonClassName);
				await moreActionButton.trigger("click");

				const emitted = wrapper.emitted("delete-task");
				expect(emitted).toHaveLength(1);
			});

			it("should trigger the 'publishCard' method when 'Post' button is clicked on a draft", async () => {
				const publishCardMock = jest.fn();
				const wrapper = getWrapper({ ...draftTestProps, role });
				wrapper.vm.publishCard = publishCardMock;
				const buttonClassName = `.action-button-${wrapper.vm.$i18n.t(
					"common.action.publish"
				)}`;

				const actionButton = wrapper.find(buttonClassName);
				await actionButton.trigger("click");

				expect(publishCardMock).toHaveBeenCalled();
			});

			it("should trigger the 'publishCard' method when 'Post' button is clicked on a planned task", async () => {
				const publishCardMock = jest.fn();
				const wrapper = getWrapper({ ...plannedTestProps, role });
				wrapper.vm.publishCard = publishCardMock;
				const buttonClassName = `.action-button-${wrapper.vm.$i18n.t(
					"common.action.publish"
				)}`;

				const actionButton = wrapper.find(buttonClassName);
				await actionButton.trigger("click");

				expect(publishCardMock).toHaveBeenCalled();
			});

			it("should trigger the 'finishCard' method when 'Finish' button is clicked", async () => {
				const finishCardMock = jest.fn();
				const wrapper = getWrapper({ ...testProps, role });
				wrapper.vm.finishCard = finishCardMock;
				const buttonClassName = `.action-button-${wrapper.vm.$i18n.t(
					"pages.room.taskCard.label.done"
				)}`;

				const actionButton = wrapper.find(buttonClassName);
				await actionButton.trigger("click");

				expect(finishCardMock).toHaveBeenCalled();
			});

			it("should overdue chip is visible if the task overdued", async () => {
				const wrapper = getWrapper({ ...overdueTestProps, role });
				const overrdueElement = wrapper.find(".overdue");
				expect(overrdueElement.element.innerHTML).toContain(
					wrapper.vm.$i18n.t("pages.room.taskCard.teacher.label.overdue")
				);
			});

			describe("test FEATURE_COPY_SERVICE_ENABLED feature flag", () => {
				describe("when FEATURE_COPY_SERVICE_ENABLED is set to true", () => {
					it("should trigger the 'copyCard' method when 'more action' copy button is clicked", async () => {
						// @ts-ignore
						envConfigModule.setEnvs({ FEATURE_COPY_SERVICE_ENABLED: true });
						const copyCard = jest.fn();
						const wrapper = getWrapper({ ...testProps, role });
						wrapper.vm.copyCard = copyCard;
						const buttonClassName = `.menu-action-${wrapper.vm.$i18n.t(
							"common.actions.copy"
						)}`;

						const threeDotButton = wrapper.find(".three-dot-button");
						await threeDotButton.trigger("click");

						const moreActionButton = wrapper.find(buttonClassName);
						await moreActionButton.trigger("click");

						expect(copyCard).toHaveBeenCalled();
					});
				});

				describe("when FEATURE_COPY_SERVICE_ENABLED is set to false", () => {
					it("should not find the copy option in the 'more action' menu", async () => {
						// @ts-ignore
						envConfigModule.setEnvs({ FEATURE_COPY_SERVICE_ENABLED: false });
						const wrapper = getWrapper({ ...testProps, role });
						const buttonClassName = `.menu-action-${wrapper.vm.$i18n.t(
							"common.actions.copy"
						)}`;

						const threeDotButton = wrapper.find(".three-dot-button");
						await threeDotButton.trigger("click");

						const moreActionButton = wrapper.findAll(buttonClassName);

						expect(moreActionButton).toHaveLength(0);
					});
				});
			});
		});
		describe("students", () => {
			const role = "student";
			it("should have no button if task is finished", async () => {
				const wrapper = getWrapper({ ...studentFinishedTestProps, role });
				const actionButtons = wrapper.findAll(".action-button");

				expect(actionButtons).toHaveLength(0);
			});

			it("should have finish button if task is not marked as finished", async () => {
				const finishCardMock = jest.fn();
				const wrapper = getWrapper({ ...studentTestProps, role });
				wrapper.vm.finishCard = finishCardMock;
				const buttonClassName = `.action-button-${wrapper.vm.$i18n
					.t("pages.room.taskCard.label.done")
					.split(" ")
					.join("-")}`;

				const actionButton = wrapper.find(buttonClassName);
				expect(actionButton.element.textContent).toContain(
					wrapper.vm.$i18n.t("pages.room.taskCard.label.done")
				);

				await actionButton.trigger("click");
				expect(finishCardMock).toHaveBeenCalled();
			});

			it("should trigger the 'restoreCard' method when 'more action' restore button is clicked", async () => {
				const restoreCardMock = jest.fn();
				const wrapper = getWrapper({ ...studentFinishedTestProps, role });
				wrapper.vm.restoreCard = restoreCardMock;
				const buttonClassName = `.menu-action-${wrapper.vm.$i18n.t(
					"common.labels.restore"
				)}`;
				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.find(buttonClassName);
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
						duedate: dueDate.toISOString(),
						displayColor: "#54616e",
						description: "some description here",
					},
				};
				const wrapper = getWrapper({ ...localProps, role });

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
						duedate: "2000-01-01T00:00:00.000Z",
						displayColor: "#54616e",
						description: "some description here",
					},
				};
				const wrapper = getWrapper({ ...localProps, role });
				const chips = wrapper.find(".overdue");

				expect(chips.element.textContent).toContain(
					wrapper.vm.$i18n.t("pages.room.taskCard.student.label.overdue")
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
						duedate: "2000-01-01T00:00:00.000Z",
						displayColor: "#54616e",
						description: "some description here",
					},
				};
				const wrapper = getWrapper({ ...localProps, role });
				const chips = wrapper.find(".submitted");

				expect(chips.element.textContent).toContain(
					wrapper.vm.$i18n.t("pages.room.taskCard.student.label.submitted")
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
						duedate: "2000-01-01T00:00:00.000Z",
						displayColor: "#54616e",
						description: "some description here",
					},
				};
				const wrapper = getWrapper({ ...localProps, role });
				const chips = wrapper.find(".graded");

				expect(chips.element.textContent).toContain(
					wrapper.vm.$i18n.t("pages.room.taskCard.label.graded")
				);
			});

			it("should have no chips if task is finished", () => {
				const finishedWrapper = getWrapper({ ...finishedTestProps, role });
				const chips = finishedWrapper.findAll(".v-chip");

				expect(chips).toHaveLength(0);

				expect(
					finishedWrapper.find("[data-test-id='dueDateHintLabel']").exists()
				).toBe(false);
			});
		});
	});

	describe("keypress events", () => {
		const role = "teacher";
		it("should call 'handleClick' event when 'enter' key is pressed", async () => {
			const handleClickMock = jest.fn();
			const wrapper = getWrapper({ ...testProps, role });

			wrapper.vm.handleClick = handleClickMock;

			await wrapper.trigger("keydown.enter");
			expect(handleClickMock).toHaveBeenCalled();
			expect(handleClickMock.mock.calls[0][0].keyCode).toStrictEqual(13);
			expect(handleClickMock.mock.calls[0][0].key).toStrictEqual("Enter");
		});

		it("should call 'onKeyPress' event when 'up, down, space' keys are pressed", async () => {
			const onKeyPressMock = jest.fn();
			const wrapper = getWrapper({ ...testProps, role });

			wrapper.vm.onKeyPress = onKeyPressMock;

			await wrapper.trigger("keydown.up");
			expect(onKeyPressMock).toHaveBeenCalled();
			expect(onKeyPressMock.mock.calls[0][0].keyCode).toStrictEqual(38);
			expect(onKeyPressMock.mock.calls[0][0].key).toStrictEqual("Up");

			jest.clearAllMocks();
			await wrapper.trigger("keydown.down");
			expect(onKeyPressMock).toHaveBeenCalled();
			expect(onKeyPressMock.mock.calls[0][0].keyCode).toStrictEqual(40);
			expect(onKeyPressMock.mock.calls[0][0].key).toStrictEqual("Down");

			jest.clearAllMocks();
			await wrapper.trigger("keydown.space");
			expect(onKeyPressMock).toHaveBeenCalled();
			expect(onKeyPressMock.mock.calls[0][0].keyCode).toStrictEqual(32);
			expect(onKeyPressMock.mock.calls[0][0].key).toStrictEqual(" ");
			jest.clearAllMocks();
		});

		it("should emit 'tab-pressed' event when 'tab' key is pressed", async () => {
			const wrapper = getWrapper({ ...testProps, role });

			await wrapper.trigger("keydown.tab");

			const emitted = wrapper.emitted();
			expect(emitted["tab-pressed"]).toHaveLength(1);
		});
	});
});
