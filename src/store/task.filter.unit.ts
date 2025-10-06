import { TaskFilter } from "./task.filter";
import { Task } from "./types/tasks";
import { taskResponseFactory } from "@@/tests/test-utils/factory";

type TaskParams = {
	name?: string;
	courseName?: string;
	courseId?: string;
	dueDate?: string;
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
		return taskResponseFactory.build(params);
	}

	buildList(number: number, params: TaskParams = {}): Task[] {
		const list: Task[] = [];
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

	describe("byCourseNames", () => {
		it("should filter all tasks that match the given list of course names", () => {
			const task1 = taskFactory.build({ courseName: "Mathe" });
			const task2 = taskFactory.build({ courseName: "Deutsch" });
			const task3 = taskFactory.build({ courseName: "Mathe" });
			const task4 = taskFactory.build({ courseName: "Physik" });
			const tasks = [task1, task2, task3, task4];
			const filteredTasks = new TaskFilter(tasks).byCourseNames(["Mathe", "Physik"]).tasks;
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
		it("should filter all open tasks for student role", () => {
			const task1 = taskFactory.build({
				status: { isDraft: false, submitted: 0, graded: 0 },
			});
			const task2 = taskFactory.build({
				status: { isDraft: false, submitted: 1, graded: 0 },
			});
			const task3 = taskFactory.build({
				status: { isDraft: false, submitted: 0, graded: 1 },
			});
			const task4 = taskFactory.build({
				status: { isDraft: false, submitted: 1 },
			});
			const task5 = taskFactory.build({
				status: { isDraft: true, submitted: 0, graded: 0 },
			});
			const task6 = taskFactory.build({
				status: { isDraft: true, submitted: 1, graded: 0 },
			});
			const tasks = [task1, task2, task3, task4, task5, task6];
			const filteredTasks = new TaskFilter(tasks).byOpenForStudent().tasks;
			expect(filteredTasks).toEqual([task1]);
		});
	});

	const getTodayOffset = (days: number): Date => {
		const date = new Date();
		date.setDate(new Date().getDate() + days);
		return date;
	};

	describe("withoutDueDate", () => {
		it("should filter all tasks without a due date", () => {
			const tomorrow = getTodayOffset(1);
			const task1 = taskFactory.build({ dueDate: tomorrow.toISOString() });
			const task2 = taskFactory.build();
			const tasks = [task1, task2];
			const filteredTasks = new TaskFilter(tasks).withoutDueDate().tasks;
			expect(filteredTasks).toEqual([task2]);
		});
	});

	describe("withDueDate", () => {
		it("should filter all tasks that have a due date", () => {
			const tomorrow = getTodayOffset(1);
			const task1 = taskFactory.build({ dueDate: tomorrow.toISOString() });
			const task2 = taskFactory.build();
			const tasks = [task1, task2];
			const filteredTasks = new TaskFilter(tasks).withDueDate().tasks;
			expect(filteredTasks).toEqual([task1]);
		});
	});

	describe("byOverdue", () => {
		it("should filter all overdue tasks", () => {
			const yesterday = getTodayOffset(-1);
			const task1 = taskFactory.build({ dueDate: yesterday.toISOString() });
			const task2 = taskFactory.build();
			const tasks = [task1, task2];
			const filteredTasks = new TaskFilter(tasks).byOverdue().tasks;
			expect(filteredTasks).toEqual([task1]);
		});
	});

	describe("byCompleted", () => {
		it("should filter all completed tasks", () => {
			const task1 = taskFactory.build({ status: { submitted: 1, graded: 1 } });
			const task2 = taskFactory.build({ status: { submitted: 4, graded: 1 } });
			const task3 = taskFactory.build({ status: { submitted: 1, graded: 2 } });
			const task4 = taskFactory.build({ status: { submitted: 0, graded: 3 } });
			const task5 = taskFactory.build({ status: { submitted: 0, graded: 0 } });
			const task6 = taskFactory.build({ status: { submitted: 2, graded: 0 } });
			const task7 = taskFactory.build();
			const tasks = [task1, task2, task3, task4, task5, task6, task7];
			const filteredTasks = new TaskFilter(tasks).byCompletedForStudent().tasks;
			expect(filteredTasks).toEqual([task1, task2, task3, task4, task6]);
		});
	});

	describe("bySubmitted", () => {
		it("should filter all submitted tasks", () => {
			const task1 = taskFactory.build({ status: { submitted: 1, graded: 1 } });
			const task2 = taskFactory.build({ status: { submitted: 4, graded: 0 } });
			const task3 = taskFactory.build({ status: { submitted: 1, graded: 2 } });
			const task4 = taskFactory.build({ status: { submitted: 0, graded: 3 } });
			const task5 = taskFactory.build({ status: { submitted: 0, graded: 0 } });
			const task6 = taskFactory.build({ status: { submitted: 2, graded: 0 } });
			const task7 = taskFactory.build();
			const tasks = [task1, task2, task3, task4, task5, task6, task7];
			const filteredTasks = new TaskFilter(tasks).bySubmittedForStudent().tasks;
			expect(filteredTasks).toEqual([task2, task6]);
		});
	});

	describe("byGraded", () => {
		it("should filter all graded tasks", () => {
			const task1 = taskFactory.build({ status: { submitted: 1, graded: 1 } });
			const task2 = taskFactory.build({ status: { submitted: 4, graded: 0 } });
			const task3 = taskFactory.build({ status: { submitted: 1, graded: 2 } });
			const task4 = taskFactory.build({ status: { submitted: 0, graded: 3 } });
			const task5 = taskFactory.build({ status: { submitted: 0, graded: 0 } });
			const task6 = taskFactory.build({ status: { submitted: 2, graded: 0 } });
			const task7 = taskFactory.build();
			const tasks = [task1, task2, task3, task4, task5, task6, task7];
			const filteredTasks = new TaskFilter(tasks).byGradedForStudent().tasks;
			expect(filteredTasks).toEqual([task1, task3, task4]);
		});
	});

	describe("byDraft", () => {
		it("should filter all draft tasks", () => {
			const task1 = taskFactory.build({ status: { isDraft: true } });
			const task2 = taskFactory.build({ status: { isDraft: true } });
			const task3 = taskFactory.build();
			const tasks = [task1, task2, task3];
			const filteredTasks = new TaskFilter(tasks).byDraftForTeacher(true).tasks;
			expect(filteredTasks).toEqual([task1, task2]);
		});

		it("should filter all published tasks", () => {
			const task1 = taskFactory.build({ status: { isDraft: true } });
			const task2 = taskFactory.build({ status: { isDraft: false } });
			const task3 = taskFactory.build();
			const tasks = [task1, task2, task3];
			const filteredTasks = new TaskFilter(tasks).byDraftForTeacher(false).tasks;
			expect(filteredTasks).toEqual([task2, task3]);
		});
	});

	describe("filterSubstitute", () => {
		it("should return all tasks if true is provided as parameter", () => {
			const task1 = taskFactory.build({
				status: { isSubstitutionTeacher: true },
			});
			const task2 = taskFactory.build({
				status: { isSubstitutionTeacher: false },
			});
			const tasks = [task1, task2];
			const filteredTasks = new TaskFilter(tasks).filterSubstituteForTeacher(true).tasks;
			expect(filteredTasks).toEqual([task1, task2]);
		});

		it("should return only non-substitution teacher tasks if false is provided as parameter", () => {
			const task1 = taskFactory.build({
				status: { isSubstitutionTeacher: true },
			});
			const task2 = taskFactory.build({
				status: { isSubstitutionTeacher: false },
			});
			const tasks = [task1, task2];
			const filteredTasks = new TaskFilter(tasks).filterSubstituteForTeacher(false).tasks;
			expect(filteredTasks).toEqual([task2]);
		});
	});

	describe("count", () => {
		it("should count the filtered tasks", () => {
			const count = new TaskFilter(taskFactory.buildList(5)).count();
			expect(count).toBe(5);
		});
	});

	describe("countByCourseName", () => {
		it("should count the filtered tasks by course name", () => {
			const tasksMathe = taskFactory.buildList(5, { courseName: "Mathe" });
			const tasksDeutsch = taskFactory.buildList(3, { courseName: "Deutsch" });
			const countedByCourseName = new TaskFilter([...tasksMathe, ...tasksDeutsch]).countByCourseName();
			expect(countedByCourseName).toEqual({
				Mathe: 5,
				Deutsch: 3,
			});
		});

		it("should be able to provide the list of course names", () => {
			const tasksMathe = taskFactory.buildList(5, { courseName: "Mathe" });
			const tasksDeutsch = taskFactory.buildList(3, { courseName: "Deutsch" });
			const countedByCourseName = new TaskFilter([...tasksMathe, ...tasksDeutsch]).countByCourseName([
				"Mathe",
				"Deutsch",
				"Englisch",
			]);
			expect(countedByCourseName).toEqual({
				Mathe: 5,
				Deutsch: 3,
				Englisch: 0,
			});
		});
	});

	describe("courseNames", () => {
		it("should return the unique list of course names of the tasks", () => {
			const filter = new TaskFilter([
				...taskFactory.buildList(2, { courseName: "Mathe" }),
				...taskFactory.buildList(4, { courseName: "" }),
				...taskFactory.buildList(1, { courseName: "Englisch" }),
				...taskFactory.buildList(3, { courseName: "Deutsch" }),
			]);

			const courseNames = filter.courseNames();
			expect(courseNames).toEqual(["Mathe", "", "Englisch", "Deutsch"]);
		});
	});
});
