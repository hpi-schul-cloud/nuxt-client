import { Task } from "./tasks";
import { TaskFilter } from "./task.filter";

let sequence = 0;

const buildTask = (
	params: { name?: string; courseName?: string; isDraft?: boolean } = {}
): Task => {
	const task: Task = {
		id: "0123456789ab",
		name: params.name || `task #${sequence++}`,
		courseName: params.courseName || "course #1",
		status: {
			isDraft: params.isDraft || false,
			isSubstitutionTeacher: false,
		},
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};
	return task;
};

describe("task filter", () => {
	describe("count", () => {
		it("should count the tasks", () => {
			const tasks = [buildTask(), buildTask()];
			const count = new TaskFilter(tasks).count();
			expect(count).toBe(2);
		});
	});

	describe("byOneCourseName", () => {
		it("should filter all tasks with the given course name", () => {
			const task1 = buildTask({ courseName: "Mathe" });
			const task2 = buildTask({ courseName: "Deutsch" });
			const task3 = buildTask({ courseName: "Mathe" });
			const tasks = [task1, task2, task3];
			const filteredTasks = new TaskFilter(tasks).byOneCourseName(
				"Mathe"
			).tasks;
			expect(filteredTasks).toEqual([task1, task3]);
		});
	});

	describe("byCourseNames", () => {
		it("should filter all tasks that match the given list of course names", () => {
			const task1 = buildTask({ courseName: "Mathe" });
			const task2 = buildTask({ courseName: "Deutsch" });
			const task3 = buildTask({ courseName: "Mathe" });
			const task4 = buildTask({ courseName: "Physik" });
			const tasks = [task1, task2, task3, task4];
			const filteredTasks = new TaskFilter(tasks).byCourseNames([
				"Mathe",
				"Physik",
			]).tasks;
			expect(filteredTasks).toEqual([task1, task3, task4]);
		});
	});

	describe("byOpenForTeacher", () => {
		it("should filter all open tasks for teacher role", () => {
			const task1 = buildTask({ isDraft: false });
			const task2 = buildTask({ isDraft: false });
			const task3 = buildTask({ isDraft: true });
			const tasks = [task1, task2, task3];
			const filteredTasks = new TaskFilter(tasks).byOpenForTeacher().tasks;
			expect(filteredTasks).toEqual([task1, task2]);
		});
	});

	describe("byOpenForStudent", () => {
		it.todo("should filter all open tasks for student role");
	});
});
