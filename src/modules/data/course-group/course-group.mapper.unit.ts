import {
	filterOpenTasks,
	isCourseArchived,
	mapCourse,
	mapCourseGroup,
	mapDoneTask,
	mapOpenTask,
	toPlainText,
	unwrapList,
} from "./course-group.mapper";
import { V1Homework, V1Submission } from "./types";

describe("course-group.mapper", () => {
	describe("unwrapList", () => {
		it("should return the data of a paginated response", () => {
			expect(unwrapList({ data: [1, 2] })).toEqual([1, 2]);
		});

		it("should return an unpaginated response as is", () => {
			expect(unwrapList([1, 2])).toEqual([1, 2]);
		});
	});

	describe("mapCourseGroup", () => {
		it("should map populated members and the course id", () => {
			const group = mapCourseGroup({
				_id: "group-1",
				name: "Group A",
				courseId: { _id: "course-1" },
				userIds: [{ _id: "user-1", firstName: "Ada", lastName: "Lovelace" }, "user-2"],
			});

			expect(group).toEqual({
				id: "group-1",
				name: "Group A",
				courseId: "course-1",
				members: [{ id: "user-1", firstName: "Ada", lastName: "Lovelace", fullName: "Ada Lovelace" }],
			});
		});

		it("should accept an unpopulated course id and missing members", () => {
			const group = mapCourseGroup({ _id: "group-1", name: "Group A", courseId: "course-1" });

			expect(group.courseId).toBe("course-1");
			expect(group.members).toEqual([]);
		});
	});

	describe("isCourseArchived", () => {
		const now = new Date("2026-11-19T12:00:00Z").getTime();

		it("should use isArchived when the response contains it", () => {
			expect(isCourseArchived({ _id: "c", name: "c", isArchived: true }, now)).toBe(true);
		});

		it("should be archived when untilDate is more than one day in the past", () => {
			expect(isCourseArchived({ _id: "c", name: "c", untilDate: "2026-11-17T12:00:00Z" }, now)).toBe(true);
		});

		it("should not be archived when untilDate is in the future or missing", () => {
			expect(isCourseArchived({ _id: "c", name: "c", untilDate: "2026-12-01T00:00:00Z" }, now)).toBe(false);
			expect(isCourseArchived({ _id: "c", name: "c" }, now)).toBe(false);
		});
	});

	describe("mapCourse", () => {
		it("should map students and teachers", () => {
			const course = mapCourse({
				_id: "course-1",
				name: "Math",
				color: "#ff0000",
				userIds: [{ _id: "student-1", firstName: "Sam", lastName: "Student" }],
				teacherIds: [{ _id: "teacher-1", firstName: "Tess", lastName: "Teacher" }],
			});

			expect(course).toEqual({
				id: "course-1",
				name: "Math",
				color: "#ff0000",
				isArchived: false,
				students: [{ id: "student-1", firstName: "Sam", lastName: "Student", fullName: "Sam Student" }],
				teachers: [{ id: "teacher-1", firstName: "Tess", lastName: "Teacher", fullName: "Tess Teacher" }],
			});
		});
	});

	describe("toPlainText", () => {
		it("should strip html and cut the text", () => {
			expect(toPlainText("<p>Hello <b>world</b></p>", 8)).toBe("Hello wo");
		});

		it("should return an empty string without input", () => {
			expect(toPlainText()).toBe("");
		});
	});

	describe("tasks", () => {
		const homework = (id: string, values: Partial<V1Homework> = {}): V1Homework => ({
			_id: id,
			name: `Task ${id}`,
			description: "<p>Description</p>",
			dueDate: "2026-12-01T10:00:00Z",
			teamSubmissions: true,
			maxTeamMembers: 3,
			...values,
		});
		const submission = (homeworkId: string): V1Submission => ({
			_id: `submission-${homeworkId}`,
			updatedAt: "2026-11-10T10:00:00Z",
			homeworkId: homework(homeworkId),
		});

		it("should map a done task with a link to the submission tab", () => {
			expect(mapDoneTask(submission("hw-1"))).toEqual({
				homeworkId: "hw-1",
				name: "Task hw-1",
				description: "Description",
				date: "2026-11-10T10:00:00Z",
				url: "/homework/hw-1/#activetabid=submission",
			});
		});

		it("should map an open task with its due date", () => {
			expect(mapOpenTask(homework("hw-1"))).toEqual({
				homeworkId: "hw-1",
				name: "Task hw-1",
				description: "Description",
				date: "2026-12-01T10:00:00Z",
				url: "/homework/hw-1",
			});
		});

		it("should only keep team tasks that fit the group and are not submitted yet", () => {
			const homeworks = [
				homework("open"),
				homework("submitted"),
				homework("no-team", { teamSubmissions: false }),
				homework("too-small", { maxTeamMembers: 1 }),
				homework("no-limit", { maxTeamMembers: null }),
			];

			const result = filterOpenTasks(homeworks, [submission("submitted")], 2);

			expect(result.map((task) => task._id)).toEqual(["open"]);
		});
	});
});
