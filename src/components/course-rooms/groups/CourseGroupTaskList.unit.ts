import CourseGroupTaskList from "./CourseGroupTaskList.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { CourseGroupTask } from "@data-course-group";
import { mount } from "@vue/test-utils";

describe("CourseGroupTaskList", () => {
	const task: CourseGroupTask = {
		homeworkId: "hw-1",
		name: "Essay",
		description: "Write an essay",
		date: "2026-11-10T10:00:00Z",
		url: "/homework/hw-1",
	};

	const setup = (props: { type?: "done" | "open"; tasks?: CourseGroupTask[]; color?: string } = {}) =>
		mount(CourseGroupTaskList, {
			props: { type: "open", title: "Open tasks", emptyText: "Nothing open", tasks: [task], ...props },
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

	it("should render the title and a card per task linking to the task", () => {
		const wrapper = setup();

		expect(wrapper.text()).toContain("Open tasks");
		const card = wrapper.find('[data-testid="course-group-task"]');
		expect(card.attributes("href")).toBe("/homework/hw-1");
		expect(card.text()).toContain("Write an essay");
	});

	it("should show the due date for open tasks", () => {
		expect(setup().text()).toContain("pages.courseRoomDetails.groups.details.tasks.dueTo");
	});

	it("should show the submission date for done tasks", () => {
		expect(setup({ type: "done" }).text()).toContain("pages.courseRoomDetails.groups.details.tasks.submittedOn");
	});

	it("should not show a date line without a date", () => {
		const wrapper = setup({ tasks: [{ ...task, date: undefined }] });

		expect(wrapper.text()).not.toContain("pages.courseRoomDetails.groups.details.tasks.dueTo");
	});

	it("should use the course color as card accent", () => {
		const card = setup({ color: "#ff0000" }).find('[data-testid="course-group-task"]');

		expect(card.attributes("style")).toContain("border-top");
	});

	it("should show the empty text without tasks", () => {
		const wrapper = setup({ tasks: [] });

		expect(wrapper.find('[data-testid="course-group-tasks-empty"]').text()).toBe("Nothing open");
	});
});
