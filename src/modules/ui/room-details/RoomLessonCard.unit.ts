import RoomLessonCard from "./RoomLessonCard.vue";
import { LessonData } from "./types";
import { ImportUserResponseRoleNamesEnum as Roles } from "@/serverApi/v3";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeAll } from "vitest";
import { VCard } from "vuetify/lib/components/index";

const baseTestLesson = {
	id: "123",
	name: "Test Name",
	courseName: "Mathe",
	createdAt: "2017-09-28T11:58:46.601Z",
	updatedAt: "2017-09-28T11:58:46.601Z",
	hidden: false,
	numberOfDraftTasks: 0,
	numberOfPlannedTasks: 0,
	numberOfPublishedTasks: 0,
};

const hiddenTestLesson = {
	id: "123",
	name: "Test Name",
	courseName: "Mathe",
	createdAt: "2017-09-28T11:58:46.601Z",
	updatedAt: "2017-09-28T11:58:46.601Z",
	hidden: true,
	numberOfDraftTasks: 0,
	numberOfPublishedTasks: 1,
	numberOfPlannedTasks: 0,
};

const setup = (
	props: {
		lesson: LessonData;
		userRole: Roles;
		dragInProgress?: boolean;
		keyDrag?: boolean;
	},
	options?: object
) => {
	const room = {
		roomId: "456",
		displayColor: "#54616e",
	};
	const ariaLabel = "lesson, Link, Test Thema (Mathe) - zum Öffnen die Eingabetaste drücken";

	const wrapper = mount(RoomLessonCard, {
		global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		props: {
			room,
			lesson: props.lesson,
			ariaLabel,
			keyDrag: props.keyDrag || false,
			dragInProgress: props.dragInProgress || false,
			lessonCardIndex: 0,
			userRole: props.userRole,
		},
		...options,
	});

	return { wrapper, room, ariaLabel };
};

describe("@/components/molecules/RoomLessonCard", () => {
	beforeAll(() => {
		window.location.pathname = "";
		setActivePinia(createPinia());
	});

	describe("common behaviors and actions", () => {
		const userRole = Roles.Teacher;

		it("should have correct props", () => {
			const { wrapper, room, ariaLabel } = setup({
				lesson: baseTestLesson,
				userRole,
			});

			expect(wrapper.vm.ariaLabel).toStrictEqual(ariaLabel);
			expect(wrapper.vm.lesson).toStrictEqual(baseTestLesson);
			expect(wrapper.vm.room).toStrictEqual(room);
		});

		it("should redirect to lesson page", async () => {
			Object.defineProperty(window, "location", {
				value: { href: "" },
				writable: true,
			});

			const { wrapper } = setup({ lesson: baseTestLesson, userRole });

			const lessonCard = wrapper.findComponent(VCard);
			await lessonCard.trigger("click");

			expect(window.location.href).toStrictEqual("/courses/456/topics/123");
		});

		it("should NOT redirect to lesson page if dragging is in progress", async () => {
			const { wrapper } = setup({
				lesson: baseTestLesson,
				userRole,
				dragInProgress: true,
			});

			Object.defineProperty(window, "location", {
				set: vi.fn(),
				get: () => createMock<Location>(),
			});

			const locationSpy = vi.spyOn(window, "location", "set");

			const lessonCard = wrapper.find(".lesson-card");
			await lessonCard.trigger("click");

			expect(locationSpy).not.toHaveBeenCalled();
		});

		it("should have correct title", () => {
			const { wrapper } = setup({ lesson: baseTestLesson, userRole });
			const title = wrapper.find(".title-section");

			expect(title.element.textContent).toContain("common.words.topic");
		});

		it("should use hidden lesson UI only for hidden lesson cards", async () => {
			const hiddenLessonWrapper = setup({
				lesson: hiddenTestLesson,
				userRole,
			}).wrapper;

			const hiddenLessonCard = hiddenLessonWrapper.find(".lesson-card");
			expect(hiddenLessonCard.element.className).toContain("hidden-lesson");

			const regularLessonWrapper = setup({
				lesson: baseTestLesson,
				userRole,
			}).wrapper;
			const lessonCard = regularLessonWrapper.find(".lesson-card");
			expect(lessonCard.element.className).not.toContain("hidden-lesson");
		});

		it("should show information about the visibility of tasks for hidden lesson card", async () => {
			const { wrapper } = setup({ lesson: hiddenTestLesson, userRole });
			const chipElement = wrapper.find(".chip-value");
			expect(chipElement.element.textContent).toContain("pages.room.lessonCard.label.notVisible");
		});
	});

	describe("user role based behaviors and actions", () => {
		describe("teachers", () => {
			const userRole = Roles.Teacher;

			afterEach(() => {
				window.location.href = "";
			});

			it("should have one action button if lesson is hidden", () => {
				const { wrapper } = setup({ lesson: hiddenTestLesson, userRole });
				const actionButtons = wrapper.findAll(".action-button");

				expect(actionButtons).toHaveLength(1);
				expect(actionButtons[0].html()).toContain("common.action.publish");
			});

			it("should have no action button when lesson is visible", () => {
				const { wrapper } = setup({ lesson: baseTestLesson, userRole });
				const actionButtons = wrapper.findAll(".action-button");

				expect(actionButtons).toHaveLength(0);
			});

			it("should trigger the 'redirectAction' method when 'more action' edit button is clicked", async () => {
				Object.defineProperty(window, "location", {
					value: { href: "" },
					writable: true,
				});

				const { wrapper, room } = setup({ lesson: baseTestLesson, userRole });
				const url = `/courses/${room.roomId}/topics/${baseTestLesson.id}/edit?returnUrl=rooms/${room.roomId}`;

				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findComponent(`[data-testid="lesson-card-menu-action-edit-0"]`);
				await moreActionButton.trigger("click");

				expect(window.location.href).toEqual(url);
			});

			it("should trigger the 'publishLesson' method when 'publish' button is clicked", async () => {
				const { wrapper } = setup({ lesson: hiddenTestLesson, userRole });

				const actionButton = wrapper.find(".action-button");
				await actionButton.trigger("click");

				expect(wrapper.emitted("update-visibility")).toStrictEqual([[true]]);
			});

			it("should have 'copy' more action if copying feature is enabled", async () => {
				createTestEnvStore({ FEATURE_COPY_SERVICE_ENABLED: true });
				const { wrapper } = setup({ lesson: baseTestLesson, userRole });

				const threeDotButton = wrapper.findComponent("[data-testid=lesson-card-menu-0]");
				await threeDotButton.trigger("click");

				const copyItem = wrapper.findComponent("[data-testid=lesson-card-menu-action-copy-0]");
				expect(copyItem.exists()).toBe(true);
			});

			it("should not have 'copy' more action if copying feature is not enabled", async () => {
				createTestEnvStore({ FEATURE_COPY_SERVICE_ENABLED: false });
				const { wrapper } = setup({ lesson: baseTestLesson, userRole });

				const threeDotButton = wrapper.findComponent("[data-testid=lesson-card-menu-0]");
				await threeDotButton.trigger("click");

				const copyItem = wrapper.findComponent("[data-testid=lesson-card-menu-action-copy-0]");
				expect(copyItem.exists()).toBe(false);
			});

			it("should trigger the 'copyCard' method when 'more action' copy button is clicked", async () => {
				createTestEnvStore({ FEATURE_COPY_SERVICE_ENABLED: true });
				const { wrapper } = setup({ lesson: baseTestLesson, userRole });

				const threeDotButton = wrapper.findComponent("[data-testid=lesson-card-menu-0]");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findComponent(`[data-testid="lesson-card-menu-action-copy-0"]`);
				await moreActionButton.trigger("click");

				expect(wrapper.emitted("copy-lesson")).toHaveLength(1);
			});

			it("should trigger the 'unPublishCard' method when 'more action' unpublish button is clicked", async () => {
				const { wrapper } = setup({ lesson: baseTestLesson, userRole });

				const threeDotButton = wrapper.findComponent("[data-testid=lesson-card-menu-0]");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findComponent(`[data-testid="lesson-card-menu-action-revert-0"]`);
				await moreActionButton.trigger("click");

				expect(wrapper.emitted("update-visibility")).toStrictEqual([[false]]);
			});

			it("should have 'share' more action if env flag is set", async () => {
				createTestEnvStore({ FEATURE_LESSON_SHARE: true });
				const { wrapper } = setup({ lesson: baseTestLesson, userRole });

				const threeDotButton = wrapper.findComponent("[data-testid=lesson-card-menu-0]");
				await threeDotButton.trigger("click");

				const shareButton = wrapper.findComponent(`[data-testid="lesson-card-menu-action-share-0"]`);
				expect(shareButton.exists()).toBe(true);
			});

			it("should emit 'delete-lesson' when delete action button clicked'", async () => {
				const { wrapper } = setup({ lesson: baseTestLesson, userRole });

				const threeDotButton = wrapper.findComponent("[data-testid=lesson-card-menu-0]");
				await threeDotButton.trigger("click");

				const removeButton = wrapper.findComponent(`[data-testid="lesson-card-menu-action-remove-0"]`);
				await removeButton.trigger("click");

				expect(wrapper.emitted("delete-lesson")).toHaveLength(1);
			});

			it("should have the proper string in the chip element (all the 3 numbers are available)", () => {
				const lessonObject = {
					id: "123",
					name: "Test Name",
					courseName: "Mathe",
					createdAt: "2017-09-28T11:58:46.601Z",
					updatedAt: "2017-09-28T11:58:46.601Z",
					hidden: false,
					numberOfPublishedTasks: 3,
					numberOfPlannedTasks: 4,
					numberOfDraftTasks: 2,
				};

				const { wrapper } = setup({ lesson: lessonObject, userRole });
				const expectedString = `common.words.tasks: 3 common.words.published / 4 common.words.planned / 2 common.words.drafts`;
				const chipElement = wrapper.find(".chip-value");

				expect(chipElement.element.innerHTML).toContain(expectedString);
			});

			it("should have the proper string in the chip element for published tasks when lesson is a draft)", () => {
				const lessonObject = {
					id: "123",
					name: "Test Name",
					courseName: "Mathe",
					createdAt: "2017-09-28T11:58:46.601Z",
					updatedAt: "2017-09-28T11:58:46.601Z",
					hidden: true,
					numberOfPublishedTasks: 3,
					numberOfPlannedTasks: 4,
					numberOfDraftTasks: 2,
				};

				const { wrapper } = setup({ lesson: lessonObject, userRole });
				const expectedString = `common.words.tasks: 3 common.words.ready / 4 common.words.planned / 2 common.words.drafts`;
				const chipElement = wrapper.find(".chip-value");

				expect(chipElement.element.innerHTML).toContain(expectedString);
			});

			it("should have the proper string in the chip element (not all the 3 numbers are available)", () => {
				const lessonObject = {
					id: "123",
					name: "Test Name",
					courseName: "Mathe",
					createdAt: "2017-09-28T11:58:46.601Z",
					updatedAt: "2017-09-28T11:58:46.601Z",
					hidden: false,
					numberOfPublishedTasks: 3,
					numberOfPlannedTasks: 0,
					numberOfDraftTasks: 2,
				};

				const { wrapper } = setup({ lesson: lessonObject, userRole });
				const expectedString = `common.words.tasks: 3 common.words.published / 2 common.words.drafts`;

				const chipElement = wrapper.find(".chip-value");

				expect(chipElement.element.innerHTML).toContain(expectedString);
			});

			it("should not show the chip section if 'numberOf' properties are '0'", async () => {
				const lessonObject = {
					id: "123",
					name: "Test Name",
					courseName: "Mathe",
					createdAt: "2017-09-28T11:58:46.601Z",
					updatedAt: "2017-09-28T11:58:46.601Z",
					hidden: false,
					numberOfPublishedTasks: 0,
					numberOfPlannedTasks: 0,
					numberOfDraftTasks: 0,
				};
				const { wrapper } = setup({ lesson: lessonObject, userRole });
				const chipElement = wrapper.findAll(".chip-value");

				expect(chipElement).toHaveLength(0);
			});

			it("should not show the chip section if 'numberOf' properties are undefined", async () => {
				const lessonObject = {
					id: "123",
					name: "Test Name",
					courseName: "Mathe",
					createdAt: "2017-09-28T11:58:46.601Z",
					updatedAt: "2017-09-28T11:58:46.601Z",
					hidden: false,
					numberOfPublishedTasks: 0,
					numberOfPlannedTasks: 0,
					numberOfDraftTasks: 0,
				};
				const { wrapper } = setup({ lesson: lessonObject, userRole });
				const chipElement = wrapper.findAll(".chip-value");

				expect(chipElement).toHaveLength(0);
			});
		});
		describe("students", () => {
			const userRole = Roles.Student;
			it("should have no action button", () => {
				const { wrapper } = setup({ lesson: baseTestLesson, userRole });
				const actionButtons = wrapper.findAll(".action-button");

				expect(actionButtons).toHaveLength(0);
			});
		});
	});

	describe("keypress events", () => {
		const userRole = Roles.Teacher;

		it("should call 'handleClick' event when 'enter' key is pressed", async () => {
			Object.defineProperty(window, "location", {
				value: { href: "" },
				writable: true,
			});

			const { wrapper } = setup({ lesson: baseTestLesson, userRole });

			await wrapper.trigger("keydown.enter");

			expect(window.location.href).toStrictEqual("/courses/456/topics/123");
		});

		describe("when keydrag is true", () => {
			it("should call 'onKeyPress' event when 'up, down, space' keys are pressed", async () => {
				const { wrapper } = setup({
					lesson: baseTestLesson,
					userRole,
					dragInProgress: false,
					keyDrag: true,
				});

				await wrapper.trigger("keydown", { key: "ArrowUp" });

				expect(wrapper.emitted("move-element")).toHaveLength(1);
				expect(wrapper.emitted("move-element")).toStrictEqual([
					[
						{
							id: baseTestLesson.id,
							moveIndex: -1,
						},
					],
				]);

				await wrapper.trigger("keydown", { key: "ArrowDown" });

				expect(wrapper.emitted("move-element")).toHaveLength(2);
				expect(wrapper.emitted("move-element")).toStrictEqual([
					[
						{
							id: baseTestLesson.id,
							moveIndex: -1,
						},
					],
					[
						{
							id: baseTestLesson.id,
							moveIndex: 1,
						},
					],
				]);

				await wrapper.trigger("keydown", { key: " " });
				expect(wrapper.emitted("on-drag")).toHaveLength(1);
			});
		});

		it("should emit 'tab-pressed' event when 'tab' key is pressed", async () => {
			const { wrapper } = setup({ lesson: baseTestLesson, userRole });

			await wrapper.trigger("keydown.tab");

			const emitted = wrapper.emitted();
			expect(emitted["tab-pressed"]).toHaveLength(1);
		});
	});
});
