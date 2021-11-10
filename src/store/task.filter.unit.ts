import { Task } from "./tasks";
import { TaskFilter } from "./task.filter";

type TaskParams = {
	name?: string;
	courseName?: string;
	status?: {
		submitted?: number;
		maxSubmissions?: number;
		graded?: number;
		isDraft?: boolean;
		isSubstitutionTeacher?: boolean;
	};
};
class TaskFactory {
	sequence = 0;

	build(params: TaskParams = {}): Task {
		const task: Task = {
			id: "0123456789ab",
			name: params.name || `task #${this.sequence++}`,
			courseName: params.courseName || "course #1",
			status: {
				submitted: params.status?.submitted || 0,
				maxSubmissions: params.status?.maxSubmissions || 0,
				graded: params.status?.graded || 0,
				isDraft: params.status?.isDraft || false,
				isSubstitutionTeacher: params.status?.isSubstitutionTeacher || false,
			},
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
		return task;
	}

	buildList(number: number, params: TaskParams = {}): Task[] {
		let list: Task[] = [];
		for (let i = 0; i < number; i++) {
			list.push(this.build(params));
		}

		return list;
	}
}

export const taskFactory = new TaskFactory();

describe("task filter", () => {
	describe("count", () => {
		it("should count the tasks", () => {
			const tasks = [taskFactory.build(), taskFactory.build()];
			const count = new TaskFilter(tasks).count();
			expect(count).toBe(2);
		});
	});

	describe("byOneCourseName", () => {
		it("should filter all tasks with the given course name", () => {
			const task1 = taskFactory.build({ courseName: "Mathe" });
			const task2 = taskFactory.build({ courseName: "Deutsch" });
			const task3 = taskFactory.build({ courseName: "Mathe" });
			const tasks = [task1, task2, task3];
			const filteredTasks = new TaskFilter(tasks).byOneCourseName(
				"Mathe"
			).tasks;
			expect(filteredTasks).toEqual([task1, task3]);
		});
	});

	describe("byCourseNames", () => {
		it("should filter all tasks that match the given list of course names", () => {
			const task1 = taskFactory.build({ courseName: "Mathe" });
			const task2 = taskFactory.build({ courseName: "Deutsch" });
			const task3 = taskFactory.build({ courseName: "Mathe" });
			const task4 = taskFactory.build({ courseName: "Physik" });
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
			const task1 = taskFactory.build({ status: { isDraft: false } });
			const task2 = taskFactory.build({ status: { isDraft: false } });
			const task3 = taskFactory.build({ status: { isDraft: true } });
			const tasks = [task1, task2, task3];
			const filteredTasks = new TaskFilter(tasks).byOpenForTeacher().tasks;
			expect(filteredTasks).toEqual([task1, task2]);
		});
	});

	describe("byOpenForStudent", () => {
		it.todo("should filter all open tasks for student role");
	});
});
