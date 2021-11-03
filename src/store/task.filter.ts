import { Task, TaskStatus } from "./tasks";

export class TaskFilter {
	constructor(public readonly tasks: Task[]) {}

	count(): number {
		return this.tasks.length;
	}

	countByCourseName(): Record<string, number> {
		const result: Record<string, number> = {};

		this.tasks.forEach((task) => {
			if (result[task.courseName] === undefined) {
				result[task.courseName] = 0;
			}
			result[task.courseName] += 1;
		});

		return result;
	}

	byOneCourseName(courseName: string): TaskFilter {
		const filteredTasks = this.tasks.filter(
			(task) => task.courseName === courseName
		);
		return new TaskFilter(filteredTasks);
	}

	byCourseNames(courseNames: string[]): TaskFilter {
		const filteredTasks =
			courseNames.length > 0
				? this.tasks.filter((task) => courseNames.includes(task.courseName))
				: this.tasks;

		return new TaskFilter(filteredTasks);
	}

	byOpenForTeacher(): TaskFilter {
		const filteredTasks = this.tasks.filter(
			(task) => task.status.isDraft === false
		);

		return new TaskFilter(filteredTasks);
	}

	byOpenForStudent(): TaskFilter {
		const filteredTasks = this.tasks.filter(
			(task) =>
				task.status.isDraft === false &&
				task.status.submitted === 0 &&
				task.status.graded === 0
		);

		return new TaskFilter(filteredTasks);
	}

	withoutDueDate(): TaskFilter {
		const withoutDueDate = this.tasks.filter((task) => !task.duedate);

		return new TaskFilter(withoutDueDate);
	}

	withDueDate(): TaskFilter {
		const withDueDate = this.tasks.filter(
			(task) => task.duedate && new Date(task.duedate) > new Date()
		);

		return new TaskFilter(withDueDate);
	}

	byOverdue(): TaskFilter {
		const overdue = this.tasks.filter(
			(task) => task.duedate && new Date(task.duedate) < new Date()
		);

		return new TaskFilter(overdue);
	}

	// it is a teacher based interpretation or and why or condition?
	byCompleted(): TaskFilter {
		const completed = this.tasks.filter(
			(task) =>
				(task.status.submitted && task.status.submitted >= 1) ||
				(task.status.graded && task.status.graded >= 1)
		);

		return new TaskFilter(completed);
	}

	bySubmitted(): TaskFilter {
		const submitted = this.tasks.filter(
			(task) =>
				task.status.submitted &&
				task.status.submitted > 0 &&
				task.status.graded === 0
		);

		return new TaskFilter(submitted);
	}

	byGraded(): TaskFilter {
		const graded = this.tasks.filter(
			(task) => task.status.graded && task.status.graded > 0
		);

		return new TaskFilter(graded);
	}

	byDraft(isDraft: boolean): TaskFilter {
		const filteredTasks = this.tasks.filter(
			(task) => task.status.isDraft === isDraft
		);
		return new TaskFilter(filteredTasks);
	}

	filterSubstitute(withSubstitute: boolean): TaskFilter {
		const filteredTasks = withSubstitute
			? this.tasks
			: this.tasks.filter(
					(task) => task.status.isSubstitutionTeacher === false
			  );

		return new TaskFilter(filteredTasks);
	}
}
