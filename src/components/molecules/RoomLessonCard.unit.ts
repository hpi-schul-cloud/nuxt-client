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
import { nextTick } from "vue";
import { VCard } from "vuetify/lib/components/index.mjs";
import RoomLessonCard from "./RoomLessonCard.vue";

const baseTestProps = {
	room: {
		roomId: "456",
		displayColor: "#54616e",
	},
	lesson: {
		id: "123",
		name: "Test Name",
		courseName: "Mathe",
		createdAt: "2017-09-28T11:58:46.601Z",
		updatedAt: "2017-09-28T11:58:46.601Z",
		hidden: false,
	},
	ariaLabel:
		"lesson, Link, Test Thema (Mathe) - zum Öffnen die Eingabetaste drücken",
	keyDrag: false,
	dragInProgress: false,
};

const hiddenTestProps = {
	room: {
		roomId: "456",
		displayColor: "#54616e",
	},
	lesson: {
		id: "123",
		name: "Test Name",
		courseName: "Mathe",
		createdAt: "2017-09-28T11:58:46.601Z",
		updatedAt: "2017-09-28T11:58:46.601Z",
		hidden: true,
		numberOfDraftTasks: 0,
		numberOfPublishedTasks: 1,
	},
	ariaLabel:
		"lesson, Link, Test Thema (Mathe) - zum Öffnen die Eingabetaste drücken",
	keyDrag: false,
	dragInProgress: false,
};
const getWrapper: any = (props: object, options?: object) => {
	return mount(RoomLessonCard, {
		global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		props,
		...options,
	});
};

describe("@/components/molecules/RoomLessonCard", () => {
	beforeEach(() => {
		window.location.pathname = "";
		setupStores({ envConfigModule: EnvConfigModule });
	});

	describe("common behaviors and actions", () => {
		const userRole = "teacher";
		it("should have correct props", () => {
			const wrapper = getWrapper({ ...baseTestProps, userRole });

			expect(wrapper.vm.ariaLabel).toStrictEqual(baseTestProps.ariaLabel);
			expect(wrapper.vm.lesson).toStrictEqual(baseTestProps.lesson);
			expect(wrapper.vm.room).toStrictEqual(baseTestProps.room);
		});

		it("should redirect to lesson page", async () => {
			const wrapper = getWrapper({ ...baseTestProps, userRole });

			Object.defineProperty(window, "location", {
				set: jest.fn(),
				get: () => createMock<Location>(),
			});

			const locationSpy = jest.spyOn(window, "location", "set");

			const lessonCard = wrapper.findComponent(VCard);
			await lessonCard.trigger("click");
			await nextTick();

			expect(locationSpy).toHaveBeenCalledWith("/courses/456/topics/123");
		});

		it("should NOT redirect to lesson page if dragging is in progress", () => {
			const wrapper = getWrapper({
				...baseTestProps,
				userRole,
				dragInProgress: true,
			});

			Object.defineProperty(window, "location", {
				set: jest.fn(),
				get: () => createMock<Location>(),
			});

			const locationSpy = jest.spyOn(window, "location", "set");

			const lessonCard = wrapper.find(".lesson-card");
			lessonCard.trigger("click");

			expect(locationSpy).not.toHaveBeenCalled();
		});

		it("should have correct title", () => {
			const wrapper = getWrapper({ ...baseTestProps, userRole });
			const title = wrapper.find(".title-section");

			expect(title.element.textContent).toContain("common.words.topic");
		});

		it("should use hidden lesson UI only for hidden lesson cards", async () => {
			const hiddenLessonWrapper = getWrapper({ ...hiddenTestProps, userRole });
			const hiddenLessonCard = hiddenLessonWrapper.find(".lesson-card");
			expect(hiddenLessonCard.element.className).toContain("hidden-lesson");

			const regularLessonWrapper = getWrapper({ ...baseTestProps, userRole });
			const lessonCard = regularLessonWrapper.find(".lesson-card");
			expect(lessonCard.element.className).not.toContain("hidden-lesson");
		});

		it("should show information about the visibility of tasks for hidden lesson card", async () => {
			const wrapper = getWrapper({ ...hiddenTestProps, userRole });
			const chipElement = wrapper.find(".chip-value");
			expect(chipElement.element.textContent).toContain(
				"pages.room.lessonCard.label.notVisible"
			);
		});
	});

	describe("user role based behaviors and actions", () => {
		describe("teachers", () => {
			const userRole = "teacher";
			it("should have one action button if lesson is hidden", () => {
				const wrapper = getWrapper({ ...hiddenTestProps, userRole });
				const actionButtons = wrapper.findAll(".action-button");

				expect(actionButtons).toHaveLength(1);
				expect(actionButtons[0].html()).toContain("common.action.publish");
			});

			it("should have no action button when lesson is visible", () => {
				const wrapper = getWrapper({ ...baseTestProps, userRole });
				const actionButtons = wrapper.findAll(".action-button");

				expect(actionButtons).toHaveLength(0);
			});

			it("should trigger the 'redirectAction' method when 'more action' edit button is clicked", async () => {
				const redirectActionMock = jest.fn();
				const wrapper = getWrapper({ ...baseTestProps, userRole });
				wrapper.vm.redirectAction = redirectActionMock;

				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findComponent(
					`[data-testid="content-card-lesson-menu-edit"]`
				);
				await moreActionButton.trigger("click");

				expect(redirectActionMock).toHaveBeenCalled();
				expect(redirectActionMock.mock.calls[0][0]).toStrictEqual(
					"/courses/456/topics/123/edit?returnUrl=rooms/456"
				);
			});

			it("should trigger the 'publishLesson' method when 'publish' button is clicked", async () => {
				const publishLessonMock = jest.fn();
				const wrapper = getWrapper({ ...hiddenTestProps, userRole });
				wrapper.vm.publishLesson = publishLessonMock;

				const actionButton = wrapper.find(".action-button");
				await actionButton.trigger("click");

				expect(publishLessonMock).toHaveBeenCalled();
			});

			it("should have 'copy' more action if copying feature is enabled", async () => {
				const envs = envsFactory.build({ FEATURE_COPY_SERVICE_ENABLED: true });
				envConfigModule.setEnvs(envs);
				const wrapper = getWrapper({ ...baseTestProps, userRole });

				const hasCopyMenuItem = wrapper.vm.moreActionsMenuItems.teacher.some(
					(item: any) => {
						return item.name === "common.actions.copy";
					}
				);
				expect(hasCopyMenuItem).toBe(true);
			});

			it("should not have 'copy' more action if copying feature is not enabled", async () => {
				const envs = envsFactory.build({ FEATURE_COPY_SERVICE_ENABLED: false });
				envConfigModule.setEnvs(envs);
				const wrapper = getWrapper({ ...baseTestProps, userRole });

				const hasCopyMenuItem = wrapper.vm.moreActionsMenuItems.teacher.some(
					(item: any) => {
						return item.name === "common.actions.copy";
					}
				);
				expect(hasCopyMenuItem).toBe(false);
			});

			it("should trigger the 'copyCard' method when 'more action' copy button is clicked", async () => {
				const envs = envsFactory.build({ FEATURE_COPY_SERVICE_ENABLED: true });
				envConfigModule.setEnvs(envs);
				const copyCard = jest.fn();
				const wrapper = getWrapper({ ...baseTestProps, userRole });
				wrapper.vm.copyCard = copyCard;

				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findComponent(
					`[data-testid="content-card-lesson-menu-copy"]`
				);
				await moreActionButton.trigger("click");

				expect(copyCard).toHaveBeenCalled();
			});

			it("should trigger the 'unPublishCard' method when 'more action' unpublish button is clicked", async () => {
				const unPublishCardMock = jest.fn();
				const wrapper = getWrapper({ ...baseTestProps, userRole });
				wrapper.vm.unPublishCard = unPublishCardMock;
				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findComponent(
					`[data-testid="content-card-lesson-menu-revert"]`
				);
				await moreActionButton.trigger("click");

				await wrapper.vm.$nextTick();

				expect(unPublishCardMock).toHaveBeenCalled();
			});

			it("should have 'share' more action if env flag is set", async () => {
				const envs = envsFactory.build({ FEATURE_LESSON_SHARE: true });
				envConfigModule.setEnvs(envs);
				const wrapper = getWrapper({ ...baseTestProps, userRole });

				const hasShareMenuItem = wrapper.vm.moreActionsMenuItems.teacher.some(
					(item: any) => {
						return item.name === "pages.room.lessonCard.label.shareLesson";
					}
				);
				expect(hasShareMenuItem).toBe(true);
			});

			it("should emit 'delete-lesson' when delete action button clicked'", async () => {
				const wrapper = getWrapper({ ...baseTestProps, userRole });
				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findComponent(
					`[data-testid="content-card-lesson-menu-remove"]`
				);
				await moreActionButton.trigger("click");
				await wrapper.vm.$nextTick();
				const emitted = wrapper.emitted("delete-lesson");
				expect(emitted).toHaveLength(1);
			});

			it("should have the proper string in the chip element (all the 3 numbers are available)", () => {
				const lessonObject = {
					room: {
						roomId: "456",
						displayColor: "#54616e",
					},
					lesson: {
						id: "123",
						name: "Test Name",
						courseName: "Mathe",
						createdAt: "2017-09-28T11:58:46.601Z",
						updatedAt: "2017-09-28T11:58:46.601Z",
						hidden: false,
						numberOfPublishedTasks: 3,
						numberOfPlannedTasks: 4,
						numberOfDraftTasks: 2,
					},
					ariaLabel:
						"lesson, Link, Test Thema (Mathe) - zum Öffnen die Eingabetaste drücken",
					keyDrag: false,
					dragInProgress: false,
				};

				const wrapper = getWrapper({ ...lessonObject, userRole });
				const expectedString = `common.words.tasks: 3 common.words.published / 4 common.words.planned / 2 common.words.drafts`;
				const chipElement = wrapper.find(".chip-value");

				expect(chipElement.element.innerHTML).toContain(expectedString);
			});

			it("should have the proper string in the chip element for published tasks when lesson is a draft)", () => {
				const lessonObject = {
					room: {
						roomId: "456",
						displayColor: "#54616e",
					},
					lesson: {
						id: "123",
						name: "Test Name",
						courseName: "Mathe",
						createdAt: "2017-09-28T11:58:46.601Z",
						updatedAt: "2017-09-28T11:58:46.601Z",
						hidden: true,
						numberOfPublishedTasks: 3,
						numberOfPlannedTasks: 4,
						numberOfDraftTasks: 2,
					},
					ariaLabel:
						"lesson, Link, Test Thema (Mathe) - zum Öffnen die Eingabetaste drücken",
					keyDrag: false,
					dragInProgress: false,
				};

				const wrapper = getWrapper({ ...lessonObject, userRole });
				const expectedString = `common.words.tasks: 3 common.words.ready / 4 common.words.planned / 2 common.words.drafts`;
				const chipElement = wrapper.find(".chip-value");

				expect(chipElement.element.innerHTML).toContain(expectedString);
			});

			it("should have the proper string in the chip element (not all the 3 numbers are available)", () => {
				const lessonObject = {
					room: {
						roomId: "456",
						displayColor: "#54616e",
					},
					lesson: {
						id: "123",
						name: "Test Name",
						courseName: "Mathe",
						createdAt: "2017-09-28T11:58:46.601Z",
						updatedAt: "2017-09-28T11:58:46.601Z",
						hidden: false,
						numberOfPublishedTasks: 3,
						numberOfPlannedTasks: 0,
						numberOfDraftTasks: 2,
					},
					ariaLabel:
						"lesson, Link, Test Thema (Mathe) - zum Öffnen die Eingabetaste drücken",
					keyDrag: false,
					dragInProgress: false,
				};

				const wrapper = getWrapper({ ...lessonObject, userRole });
				const expectedString = `common.words.tasks: 3 common.words.published / 2 common.words.drafts`;

				const chipElement = wrapper.find(".chip-value");

				expect(chipElement.element.innerHTML).toContain(expectedString);
			});

			it("should not show the chip section if 'numberOf' properties are '0'", async () => {
				const lessonObject = {
					room: {
						roomId: "456",
						displayColor: "#54616e",
					},
					lesson: {
						id: "123",
						name: "Test Name",
						courseName: "Mathe",
						createdAt: "2017-09-28T11:58:46.601Z",
						updatedAt: "2017-09-28T11:58:46.601Z",
						hidden: false,
						numberOfPublishedTasks: 0,
						numberOfPlannedTasks: 0,
						numberOfDraftTasks: 0,
					},
					ariaLabel:
						"lesson, Link, Test Thema (Mathe) - zum Öffnen die Eingabetaste drücken",
					keyDrag: false,
					dragInProgress: false,
				};
				const wrapper = getWrapper({ ...lessonObject, userRole });
				const chipElement = wrapper.findAll(".chip-value");

				expect(chipElement).toHaveLength(0);
			});

			it("should not show the chip section if 'numberOf' properties are undefined", async () => {
				const lessonObject = {
					room: {
						roomId: "456",
						displayColor: "#54616e",
					},
					lesson: {
						id: "123",
						name: "Test Name",
						courseName: "Mathe",
						createdAt: "2017-09-28T11:58:46.601Z",
						updatedAt: "2017-09-28T11:58:46.601Z",
						hidden: false,
					},
					ariaLabel:
						"lesson, Link, Test Thema (Mathe) - zum Öffnen die Eingabetaste drücken",
					keyDrag: false,
					dragInProgress: false,
				};
				const wrapper = getWrapper({ ...lessonObject, userRole });
				const chipElement = wrapper.findAll(".chip-value");

				expect(chipElement).toHaveLength(0);
			});
		});
		describe("students", () => {
			const userRole = "student";
			it("should have no action button", () => {
				const wrapper = getWrapper({ ...baseTestProps, userRole });
				const actionButtons = wrapper.findAll(".action-button");

				expect(actionButtons).toHaveLength(0);
			});
		});
	});

	describe("keypress events", () => {
		const userRole = "teacher";
		it("should call 'handleClick' event when 'enter' key is pressed", async () => {
			const wrapper = getWrapper({ ...baseTestProps, userRole });

			Object.defineProperty(window, "location", {
				set: jest.fn(),
				get: () => createMock<Location>(),
			});

			const locationSpy = jest.spyOn(window, "location", "set");

			await wrapper.trigger("keydown.enter");

			expect(locationSpy).toHaveBeenCalledWith("/courses/456/topics/123");
		});

		describe("when keydrag is true", () => {
			it("should call 'onKeyPress' event when 'up, down, space' keys are pressed", async () => {
				const wrapper = getWrapper({
					...baseTestProps,
					keyDrag: true,
					userRole,
				});

				await wrapper.trigger("keydown.up");

				expect(wrapper.emitted("move-element")).toHaveLength(1);
				expect(wrapper.emitted("move-element")[0][0]).toStrictEqual({
					id: baseTestProps.lesson.id,
					moveIndex: -1,
				});

				await wrapper.trigger("keydown.down");
				expect(wrapper.emitted("move-element")).toHaveLength(2);
				expect(wrapper.emitted("move-element")[1][0]).toStrictEqual({
					id: baseTestProps.lesson.id,
					moveIndex: 1,
				});

				await wrapper.trigger("keydown.space");
				expect(wrapper.emitted("on-drag")).toHaveLength(1);
			});
		});

		it("should emit 'tab-pressed' event when 'tab' key is pressed", async () => {
			const wrapper = getWrapper({ ...baseTestProps, userRole });

			await wrapper.trigger("keydown.tab");

			const emitted = wrapper.emitted();
			expect(emitted["tab-pressed"]).toHaveLength(1);
		});
	});
});
