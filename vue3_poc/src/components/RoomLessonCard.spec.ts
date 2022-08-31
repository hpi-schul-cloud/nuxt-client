import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import RoomLessonCard from "./RoomLessonCard.vue";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { ImportUserResponseRoleNamesEnum } from "@/serverApi/v3";
// import EnvConfigModule from "@/store/env-config";
// import setupStores from "@@/tests/test-utils/setupStores";
// import { envConfigModule } from "@/store";

const createTestProps = () => {
	return {
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
		role: ImportUserResponseRoleNamesEnum.Teacher,
	};
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
	beforeEach(() => {
		vi.stubGlobal("location", { assign: vi.fn() });
		vi.stubGlobal(
			"ResizeObserver",
			vi.fn().mockImplementation(() => ({
				disconnect: vi.fn(),
				observe: vi.fn(),
				unobserve: vi.fn(),
			}))
		);
	});

	it("renders properly", () => {
		const wrapper = getWrapper({
			props: {
				...createTestProps(),
			},
		});
		expect(wrapper.text()).toContain("common.words.topicTest");
	});

	describe("common behaviors and actions", () => {
		it("should have correct props", () => {
			const props = createTestProps();
			const wrapper = getWrapper({ props });

			expect(wrapper.vm.ariaLabel).toStrictEqual(props.ariaLabel);
			expect(wrapper.vm.lesson).toStrictEqual(props.lesson);
			expect(wrapper.vm.room).toStrictEqual(props.room);
		});

		it("should redirect to lesson page", () => {
			const wrapper = getWrapper({ props: createTestProps() });
			const lessonCard = wrapper.find(".lesson-card");
			lessonCard.trigger("click");

			expect(window.location.assign).toBeCalledWith("/courses/456/topics/123");
		});

		it("should NOT redirect to lesson page if dragging is in progress", () => {
			const wrapper = getWrapper({
				props: { ...createTestProps(), dragInProgress: true },
			});
			const lessonCard = wrapper.find(".lesson-card");
			lessonCard.trigger("click");

			expect(window.location.assign).not.toBeCalled();
		});

		it("should have correct title", () => {
			const wrapper = getWrapper({
				props: { ...createTestProps(), dragInProgress: true },
			});
			const title = wrapper.find(".title-section");

			expect(title.element.textContent).toContain("common.words.topic");
		});

		it("should use hidden lesson UI for hidden lesson cards", () => {
			const hiddenTestProps = createTestProps();
			hiddenTestProps.lesson.hidden = true;
			const hiddenLessonWrapper = getWrapper({ props: hiddenTestProps });
			const hiddenLessonCard = hiddenLessonWrapper.find(".lesson-card");
			expect(hiddenLessonCard.element.className).toContain("hidden-lesson");
		});

		it("should NOT use hidden lesson UI for visible lesson cards", () => {
			const wrapper = getWrapper({
				props: createTestProps(),
			});
			const lessonCard = wrapper.find(".lesson-card");
			expect(lessonCard.element.className).not.toContain("hidden-lesson");
		});
	});

	describe("user role based behaviors and actions", () => {
		describe("teachers", () => {
			it("should have one action button if lesson is hidden", () => {
				const hiddenTestProps = createTestProps();
				hiddenTestProps.lesson.hidden = true;

				const wrapper = getWrapper({ props: hiddenTestProps });
				const actionButtons = wrapper.findAll(".action-button");

				expect(actionButtons).toHaveLength(1);
				expect(actionButtons.at(0)?.element.textContent).toContain(
					"common.action.publish"
				);
			});

			it("should have no action button when lesson is visible", () => {
				const wrapper = getWrapper({ props: createTestProps() });
				const actionButtons = wrapper.findAll(".action-button");

				expect(actionButtons).toHaveLength(0);
			});

			it("should trigger the 'redirectAction' method when 'more action' edit button is clicked", async () => {
				const wrapper = getWrapper({ props: createTestProps() });

				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findAll(".menu-action");
				await moreActionButton.at(0)?.trigger("click");

				expect(window.location.assign).toBeCalledWith(
					"/courses/456/topics/123/edit?returnUrl=rooms/456"
				);
			});

			it("should trigger the 'post' method when 'post' button is clicked", async () => {
				const hiddenTestProps = createTestProps();
				hiddenTestProps.lesson.hidden = true;

				const wrapper = getWrapper({ props: hiddenTestProps });

				const actionButton = wrapper.find(".action-button");
				await actionButton.trigger("click");

				expect(wrapper.emitted("post-lesson")).toBeDefined();
			});

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

			it("should trigger the 'revertPublishedCard' method when 'more action' revert button is clicked", async () => {
				const wrapper = getWrapper({ props: createTestProps() });
				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findAll(".menu-action");
				await moreActionButton.at(1)?.trigger("click");
				expect(wrapper.emitted("revert-lesson")).toBeDefined();
			});

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

			it("should emit 'delete-lesson' when delete action button clicked'", async () => {
				const wrapper = getWrapper({ props: createTestProps() });
				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findAll(".menu-action");
				await moreActionButton.at(2)?.trigger("click");
				expect(wrapper.emitted("delete-lesson")).toHaveLength(1);
			});

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
			describe("students", () => {
				it("should have no action button", () => {
					const wrapper = getWrapper({
						props: { ...createTestProps(), role: "student" },
					});
					const actionButtons = wrapper.findAll(".action-button");

					expect(actionButtons).toHaveLength(0);
				});
			});
		});
	});

	describe("keypress events", () => {
		it("should call 'handleClick' event when 'enter' key is pressed", async () => {
			const wrapper = getWrapper({ props: createTestProps() });
			await wrapper.trigger("keydown.enter");
			expect(window.location.assign).toBeCalledWith("/courses/456/topics/123");
		});

		it("should emit 'on-drag' event when space key is pressed`", async () => {
			const wrapper = getWrapper({ props: createTestProps() });
			await wrapper.trigger("keydown.space");
			expect(wrapper.emitted("on-drag")).toHaveLength(1);
		});

		it("should call 'onKeyPress' event when 'up, down, space' keys are pressed", async () => {
			const props = createTestProps();
			props.keyDrag = true;

			const wrapper = getWrapper({ props });
			await wrapper.trigger("keydown.up");
			expect(wrapper.emitted("move-element")?.at(0)).toStrictEqual([
				{
					id: props.lesson.id,
					moveIndex: -1,
				},
			]);

			await wrapper.trigger("keydown.down");
			expect(wrapper.emitted("move-element")?.at(1)).toStrictEqual([
				{
					id: props.lesson.id,
					moveIndex: 1,
				},
			]);

			await wrapper.trigger("keydown.space");
			expect(wrapper.emitted("on-drag")).toHaveLength(1);
		});

		it("should emit 'tab-pressed' event when 'tab' key is pressed", async () => {
			const props = createTestProps();
			const wrapper = getWrapper({ props });
			await wrapper.trigger("keydown.tab");

			expect(wrapper.emitted("tab-pressed")).toBeDefined();
		});
	});
});
