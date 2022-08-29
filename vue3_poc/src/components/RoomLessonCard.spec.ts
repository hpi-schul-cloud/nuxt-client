import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import RoomLessonCard from "./RoomLessonCard.vue";
import { aliases, mdi } from "vuetify/iconsets/mdi";
// import EnvConfigModule from "@/store/env-config";
// import setupStores from "@@/tests/test-utils/setupStores";
// import { envConfigModule } from "@/store";

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

const createComponentMocks = (options = {}) => {
	const vuetify = createVuetify({
		components,
		directives,
		icons: {
			defaultSet: "mdi",
			aliases,
			sets: {
				mdi,
			},
		},
	});

	const mocks = {
		global: {
			plugins: [vuetify],
			mocks: {
				$t: (key: string) => key,
			},
		},
		...options,
	};

	return mocks;
};

const getWrapper = (options = {}) => {
	const wrapper = mount(RoomLessonCard, {
		...createComponentMocks(),
		stubs: { MoreItemMenu: true },
		...options,
	});
	return wrapper;
};

describe("@/components/RoomLessonCard", () => {
	it("renders properly", () => {
		const wrapper = getWrapper({
			props: { ...baseTestProps, role: "teacher" },
		});
		expect(wrapper.text()).toContain("common.words.topicTest");
	});

	describe("common behaviors and actions", () => {
		it("should have correct props", () => {
			const wrapper = getWrapper({
				props: { ...baseTestProps, role: "teacher" },
			});

			expect(wrapper.vm.ariaLabel).toStrictEqual(baseTestProps.ariaLabel);
			expect(wrapper.vm.lesson).toStrictEqual(baseTestProps.lesson);
			expect(wrapper.vm.room).toStrictEqual(baseTestProps.room);
		});
	});
});

// declare let createComponentMocks: Function;

// const baseTestProps = {
// 	room: {
// 		roomId: "456",
// 		displayColor: "#54616e",
// 	},
// 	lesson: {
// 		id: "123",
// 		name: "Test Name",
// 		courseName: "Mathe",
// 		createdAt: "2017-09-28T11:58:46.601Z",
// 		updatedAt: "2017-09-28T11:58:46.601Z",
// 		hidden: false,
// 	},
// 	ariaLabel:
// 		"lesson, Link, Test Thema (Mathe) - zum Öffnen die Eingabetaste drücken",
// 	keyDrag: false,
// 	dragInProgress: false,
// };

// const hiddenTestProps = {
// 	room: {
// 		roomId: "456",
// 		displayColor: "#54616e",
// 	},
// 	lesson: {
// 		id: "123",
// 		name: "Test Name",
// 		courseName: "Mathe",
// 		createdAt: "2017-09-28T11:58:46.601Z",
// 		updatedAt: "2017-09-28T11:58:46.601Z",
// 		hidden: true,
// 	},
// 	ariaLabel:
// 		"lesson, Link, Test Thema (Mathe) - zum Öffnen die Eingabetaste drücken",
// 	keyDrag: false,
// 	dragInProgress: false,
// };
// const getWrapper: any = (props: object, options?: object) => {
// 	return mount(RoomLessonCard, {
// 		...createComponentMocks({
// 			i18n: true,
// 			vuetify: true,
// 		}),
// 		propsData: props,
// 		...options,
// 	});
// };

// describe("@components/molecules/RoomLessonCard", () => {
// 	beforeEach(() => {
// 		document.body.setAttribute("data-app", "true");
// 		window.location.pathname = "";
// 		setupStores({ "env-config": EnvConfigModule });
// 	});

// 	describe("common behaviors and actions", () => {
// 		const role = "teacher";
// 		it("should have correct props", () => {
// 			const wrapper = getWrapper({ ...baseTestProps, role });

// 			expect(wrapper.vm.ariaLabel).toStrictEqual(baseTestProps.ariaLabel);
// 			expect(wrapper.vm.lesson).toStrictEqual(baseTestProps.lesson);
// 			expect(wrapper.vm.room).toStrictEqual(baseTestProps.room);
// 		});

// 		it("should redirect to lesson page", () => {
// 			const location = window.location;
// 			const wrapper = getWrapper({ ...baseTestProps, role });
// 			const lessonCard = wrapper.find(".lesson-card");
// 			lessonCard.trigger("click");

// 			expect(location.pathname).toStrictEqual("/courses/456/topics/123");
// 		});

// 		it("should NOT redirect to lesson page if dragging is in progress", () => {
// 			const location = window.location;
// 			const wrapper = getWrapper({
// 				...baseTestProps,
// 				role,
// 				dragInProgress: true,
// 			});
// 			const lessonCard = wrapper.find(".lesson-card");
// 			lessonCard.trigger("click");

// 			expect(location.pathname).toStrictEqual("");
// 		});

// 		it("should have correct title", () => {
// 			const wrapper = getWrapper({ ...baseTestProps, role });
// 			const title = wrapper.find(".title-section");

// 			expect(title.element.textContent).toContain(
// 				wrapper.vm.$i18n.t("common.words.topic")
// 			);
// 		});

// 		it("should use hidden lesson UI only for hidden lesson cards", async () => {
// 			const hiddenLessonWrapper = getWrapper({ ...hiddenTestProps, role });
// 			const hiddenLessonCard = hiddenLessonWrapper.find(".lesson-card");
// 			expect(hiddenLessonCard.element.className).toContain("hidden-lesson");

// 			const regularLessonWrapper = getWrapper({ ...baseTestProps, role });
// 			const lessonCard = regularLessonWrapper.find(".lesson-card");
// 			expect(lessonCard.element.className).not.toContain("hidden-lesson");
// 		});
// 	});

// 	describe("user role based behaviors and actions", () => {
// 		describe("teachers", () => {
// 			const role = "teacher";
// 			it("should have one action button if lesson is hidden", () => {
// 				const wrapper = getWrapper({ ...hiddenTestProps, role });
// 				const actionButtons = wrapper.findAll(".action-button");

// 				expect(actionButtons).toHaveLength(1);
// 				expect(actionButtons.wrappers[0].element.textContent).toContain(
// 					wrapper.vm.$i18n.t("common.action.publish")
// 				);
// 			});

// 			it("should have no action button when lesson is visible", () => {
// 				const wrapper = getWrapper({ ...baseTestProps, role });
// 				const actionButtons = wrapper.findAll(".action-button");

// 				expect(actionButtons).toHaveLength(0);
// 			});

// 			it("should trigger the 'redirectAction' method when 'more action' edit button is clicked", async () => {
// 				const redirectActionMock = jest.fn();
// 				const wrapper = getWrapper({ ...baseTestProps, role });
// 				wrapper.vm.redirectAction = redirectActionMock;

// 				const threeDotButton = wrapper.find(".three-dot-button");
// 				await threeDotButton.trigger("click");

// 				const moreActionButton = wrapper.findAll(".menu-action");
// 				await moreActionButton.wrappers[0].trigger("click");

// 				expect(redirectActionMock).toHaveBeenCalled();
// 				expect(redirectActionMock.mock.calls[0][0]).toStrictEqual(
// 					"/courses/456/topics/123/edit?returnUrl=rooms/456"
// 				);
// 			});

// 			it("should trigger the 'post' method when 'post' button is clicked", async () => {
// 				const postLessonMock = jest.fn();
// 				const wrapper = getWrapper({ ...hiddenTestProps, role });
// 				wrapper.vm.postLesson = postLessonMock;

// 				const actionButton = wrapper.find(".action-button");
// 				await actionButton.trigger("click");

// 				expect(postLessonMock).toHaveBeenCalled();
// 			});

// 			it("should have 'copy' more action if copying feature is enabled", async () => {
// 				// @ts-ignore
// 				envConfigModule.setEnvs({ FEATURE_COPY_SERVICE_ENABLED: true });
// 				const wrapper = getWrapper({ ...baseTestProps, role });

// 				const hasCopyMenuItem = wrapper.vm.moreActionsMenuItems.teacher.some(
// 					(item: any) => {
// 						return item.name === wrapper.vm.$i18n.t("common.actions.copy");
// 					}
// 				);
// 				expect(hasCopyMenuItem).toBe(true);
// 			});

// 			it("should not have 'copy' more action if copying feature is not enabled", async () => {
// 				// @ts-ignore
// 				envConfigModule.setEnvs({ FEATURE_COPY_SERVICE_ENABLED: false });
// 				const wrapper = getWrapper({ ...baseTestProps, role });

// 				const hasCopyMenuItem = wrapper.vm.moreActionsMenuItems.teacher.some(
// 					(item: any) => {
// 						return item.name === wrapper.vm.$i18n.t("common.actions.copy");
// 					}
// 				);
// 				expect(hasCopyMenuItem).toBe(false);
// 			});

// 			it("should trigger the 'copyCard' method when 'more action' copy button is clicked", async () => {
// 				// @ts-ignore
// 				envConfigModule.setEnvs({ FEATURE_COPY_SERVICE_ENABLED: true });
// 				const copyCard = jest.fn();
// 				const wrapper = getWrapper({ ...baseTestProps, role });
// 				wrapper.vm.copyCard = copyCard;
// 				const buttonClassName = `.menu-action-${wrapper.vm.$i18n.t(
// 					"common.actions.copy"
// 				)}`;

// 				const threeDotButton = wrapper.find(".three-dot-button");
// 				await threeDotButton.trigger("click");

// 				const moreActionButton = wrapper.find(buttonClassName);
// 				await moreActionButton.trigger("click");

// 				expect(copyCard).toHaveBeenCalled();
// 			});

// 			it("should trigger the 'revertPublishedCard' method when 'more action' revert button is clicked", async () => {
// 				const revertPublishedCardMock = jest.fn();
// 				const wrapper = getWrapper({ ...baseTestProps, role });
// 				wrapper.vm.revertPublishedCard = revertPublishedCardMock;
// 				const threeDotButton = wrapper.find(".three-dot-button");
// 				await threeDotButton.trigger("click");

// 				const moreActionButton = wrapper.findAll(".menu-action");
// 				await moreActionButton.wrappers[1].trigger("click");
// 				await wrapper.vm.$nextTick();
// 				expect(revertPublishedCardMock).toHaveBeenCalled();
// 			});

// 			it("should have 'share' more action if env flag is set", async () => {
// 				// @ts-ignore
// 				envConfigModule.setEnvs({ FEATURE_LESSON_SHARE: true });
// 				const wrapper = getWrapper({ ...baseTestProps, role });

// 				const hasShareMenuItem = wrapper.vm.moreActionsMenuItems.teacher.some(
// 					(item: any) => {
// 						return (
// 							item.name ===
// 							wrapper.vm.$i18n.t("pages.room.lessonCard.label.share")
// 						);
// 					}
// 				);
// 				expect(hasShareMenuItem).toBe(true);
// 			});

// 			it("should emit 'delete-lesson' when delete action button clicked'", async () => {
// 				const wrapper = getWrapper({ ...baseTestProps, role });
// 				const threeDotButton = wrapper.find(".three-dot-button");
// 				await threeDotButton.trigger("click");
// 				const selectorName = `.menu-action-${wrapper.vm.$i18n.t(
// 					"common.actions.remove"
// 				)}`;

// 				const moreActionButton = wrapper.find(selectorName);
// 				await moreActionButton.trigger("click");
// 				await wrapper.vm.$nextTick();
// 				const emitted = wrapper.emitted("delete-lesson");
// 				expect(emitted).toHaveLength(1);
// 			});

// 			it("should have the proper string in the chip element (all the 3 numbers are available)", () => {
// 				const lessonObject = {
// 					room: {
// 						roomId: "456",
// 						displayColor: "#54616e",
// 					},
// 					lesson: {
// 						id: "123",
// 						name: "Test Name",
// 						courseName: "Mathe",
// 						createdAt: "2017-09-28T11:58:46.601Z",
// 						updatedAt: "2017-09-28T11:58:46.601Z",
// 						hidden: false,
// 						numberOfPublishedTasks: 3,
// 						numberOfPlannedTasks: 4,
// 						numberOfDraftTasks: 2,
// 					},
// 					ariaLabel:
// 						"lesson, Link, Test Thema (Mathe) - zum Öffnen die Eingabetaste drücken",
// 					keyDrag: false,
// 					dragInProgress: false,
// 				};

// 				const wrapper = getWrapper({ ...lessonObject, role });
// 				const expectedString = `${wrapper.vm.$i18n.t(
// 					"common.words.tasks"
// 				)}: 3 ${wrapper.vm.$i18n.t(
// 					"common.words.published"
// 				)} / 4 ${wrapper.vm.$i18n.t(
// 					"common.words.planned"
// 				)} / 2 ${wrapper.vm.$i18n.t("common.words.drafts")}`;
// 				const chipElement = wrapper.find(".chip-value");

// 				expect(chipElement.element.innerHTML).toContain(expectedString);
// 			});

// 			it("should have the proper string in the chip element for published tasks when lesson is a draft)", () => {
// 				const lessonObject = {
// 					room: {
// 						roomId: "456",
// 						displayColor: "#54616e",
// 					},
// 					lesson: {
// 						id: "123",
// 						name: "Test Name",
// 						courseName: "Mathe",
// 						createdAt: "2017-09-28T11:58:46.601Z",
// 						updatedAt: "2017-09-28T11:58:46.601Z",
// 						hidden: true,
// 						numberOfPublishedTasks: 3,
// 						numberOfPlannedTasks: 4,
// 						numberOfDraftTasks: 2,
// 					},
// 					ariaLabel:
// 						"lesson, Link, Test Thema (Mathe) - zum Öffnen die Eingabetaste drücken",
// 					keyDrag: false,
// 					dragInProgress: false,
// 				};

// 				const wrapper = getWrapper({ ...lessonObject, role });
// 				const expectedString = `${wrapper.vm.$i18n.t(
// 					"common.words.tasks"
// 				)}: 3 ${wrapper.vm.$i18n.t(
// 					"common.words.ready"
// 				)} / 4 ${wrapper.vm.$i18n.t(
// 					"common.words.planned"
// 				)} / 2 ${wrapper.vm.$i18n.t("common.words.drafts")}`;
// 				const chipElement = wrapper.find(".chip-value");

// 				expect(chipElement.element.innerHTML).toContain(expectedString);
// 			});

// 			it("should have the proper string in the chip element (not all the 3 numbers are available)", () => {
// 				const lessonObject = {
// 					room: {
// 						roomId: "456",
// 						displayColor: "#54616e",
// 					},
// 					lesson: {
// 						id: "123",
// 						name: "Test Name",
// 						courseName: "Mathe",
// 						createdAt: "2017-09-28T11:58:46.601Z",
// 						updatedAt: "2017-09-28T11:58:46.601Z",
// 						hidden: false,
// 						numberOfPublishedTasks: 3,
// 						numberOfPlannedTasks: 0,
// 						numberOfDraftTasks: 2,
// 					},
// 					ariaLabel:
// 						"lesson, Link, Test Thema (Mathe) - zum Öffnen die Eingabetaste drücken",
// 					keyDrag: false,
// 					dragInProgress: false,
// 				};

// 				const wrapper = getWrapper({ ...lessonObject, role });
// 				const expectedString = `${wrapper.vm.$i18n.t(
// 					"common.words.tasks"
// 				)}: 3 ${wrapper.vm.$i18n.t(
// 					"common.words.published"
// 				)} / 2 ${wrapper.vm.$i18n.t("common.words.drafts")}`;
// 				const chipElement = wrapper.find(".chip-value");

// 				expect(chipElement.element.innerHTML).toContain(expectedString);
// 			});

// 			it("should not show the chip section if 'numberOf' properties are '0'", async () => {
// 				const lessonObject = {
// 					room: {
// 						roomId: "456",
// 						displayColor: "#54616e",
// 					},
// 					lesson: {
// 						id: "123",
// 						name: "Test Name",
// 						courseName: "Mathe",
// 						createdAt: "2017-09-28T11:58:46.601Z",
// 						updatedAt: "2017-09-28T11:58:46.601Z",
// 						hidden: false,
// 						numberOfPublishedTasks: 0,
// 						numberOfPlannedTasks: 0,
// 						numberOfDraftTasks: 0,
// 					},
// 					ariaLabel:
// 						"lesson, Link, Test Thema (Mathe) - zum Öffnen die Eingabetaste drücken",
// 					keyDrag: false,
// 					dragInProgress: false,
// 				};
// 				const wrapper = getWrapper({ ...lessonObject, role });
// 				const chipElement = wrapper.findAll(".chip-value");

// 				expect(chipElement).toHaveLength(0);
// 			});

// 			it("should not show the chip section if 'numberOf' properties are undefined", async () => {
// 				const lessonObject = {
// 					room: {
// 						roomId: "456",
// 						displayColor: "#54616e",
// 					},
// 					lesson: {
// 						id: "123",
// 						name: "Test Name",
// 						courseName: "Mathe",
// 						createdAt: "2017-09-28T11:58:46.601Z",
// 						updatedAt: "2017-09-28T11:58:46.601Z",
// 						hidden: false,
// 					},
// 					ariaLabel:
// 						"lesson, Link, Test Thema (Mathe) - zum Öffnen die Eingabetaste drücken",
// 					keyDrag: false,
// 					dragInProgress: false,
// 				};
// 				const wrapper = getWrapper({ ...lessonObject, role });
// 				const chipElement = wrapper.findAll(".chip-value");

// 				expect(chipElement).toHaveLength(0);
// 			});
// 		});
// 		describe("students", () => {
// 			const role = "student";
// 			it("should have no action button", () => {
// 				const wrapper = getWrapper({ ...baseTestProps, role });
// 				const actionButtons = wrapper.findAll(".action-button");

// 				expect(actionButtons).toHaveLength(0);
// 			});
// 		});
// 	});

// 	describe("keypress events", () => {
// 		const role = "teacher";
// 		it("should call 'handleClick' event when 'enter' key is pressed", async () => {
// 			const handleClickMock = jest.fn();
// 			const wrapper = getWrapper({ ...baseTestProps, role });

// 			wrapper.vm.handleClick = handleClickMock;

// 			await wrapper.trigger("keydown.enter");
// 			expect(handleClickMock).toHaveBeenCalled();
// 			expect(handleClickMock.mock.calls[0][0].keyCode).toStrictEqual(13);
// 			expect(handleClickMock.mock.calls[0][0].key).toStrictEqual("Enter");
// 		});

// 		it("should call 'onKeyPress' event when 'up, down, space' keys are pressed", async () => {
// 			const onKeyPressMock = jest.fn();
// 			const wrapper = getWrapper({ ...baseTestProps, role });

// 			wrapper.vm.onKeyPress = onKeyPressMock;

// 			await wrapper.trigger("keydown.up");
// 			expect(onKeyPressMock).toHaveBeenCalled();
// 			expect(onKeyPressMock.mock.calls[0][0].keyCode).toStrictEqual(38);
// 			expect(onKeyPressMock.mock.calls[0][0].key).toStrictEqual("Up");

// 			jest.clearAllMocks();
// 			await wrapper.trigger("keydown.down");
// 			expect(onKeyPressMock).toHaveBeenCalled();
// 			expect(onKeyPressMock.mock.calls[0][0].keyCode).toStrictEqual(40);
// 			expect(onKeyPressMock.mock.calls[0][0].key).toStrictEqual("Down");

// 			jest.clearAllMocks();
// 			await wrapper.trigger("keydown.space");
// 			expect(onKeyPressMock).toHaveBeenCalled();
// 			expect(onKeyPressMock.mock.calls[0][0].keyCode).toStrictEqual(32);
// 			expect(onKeyPressMock.mock.calls[0][0].key).toStrictEqual(" ");
// 			jest.clearAllMocks();
// 		});

// 		it("should emit 'tab-pressed' event when 'tab' key is pressed", async () => {
// 			const wrapper = getWrapper({ ...baseTestProps, role });

// 			await wrapper.trigger("keydown.tab");

// 			const emitted = wrapper.emitted();
// 			expect(emitted["tab-pressed"]).toHaveLength(1);
// 		});
// 	});
// });
