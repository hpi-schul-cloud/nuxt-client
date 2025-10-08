import { Task } from "./types/tasks";

export class TaskFilter {
	constructor(public readonly tasks: Task[]) {}

	count(): number {
		return this.tasks.length;
	}

	/**
	 * Count filtered tasks by course name. Names not present in the task list are counted with zero.
	 * @param namesToCount restrict course names to be count. if not provided then all course names will be count.
	 * @returns
	 */
	countByCourseName(namesToCount?: string[]): Record<string, number> {
		const result: Record<string, number> = {};

		// initialize counts with zeros
		const matchList = namesToCount ? namesToCount : this.courseNames();
		matchList.forEach((courseName) => (result[courseName] = 0));

		this.tasks.forEach((task) => {
			if (matchList.includes(task.courseName)) {
				result[task.courseName] += 1;
			}
		});

		return result;
	}

	courseNames(): string[] {
		const courseNames = [...new Set(this.tasks.map((o) => o.courseName))];
		return courseNames;
	}

	byCourseNames(courseNames: string[]): TaskFilter {
		const filteredTasks =
			courseNames.length > 0 ? this.tasks.filter((task) => courseNames.includes(task.courseName)) : this.tasks;

		return new TaskFilter(filteredTasks);
	}

	byOpenForTeacher(): TaskFilter {
		const filteredTasks = this.tasks.filter((task) => task.status.isDraft === false);

		return new TaskFilter(filteredTasks);
	}

	byOpenForStudent(): TaskFilter {
		const filteredTasks = this.tasks.filter(
			(task) => task.status.isDraft === false && task.status.submitted === 0 && task.status.graded === 0
		);

		return new TaskFilter(filteredTasks);
	}

	withoutDueDate(): TaskFilter {
		const withoutDueDate = this.tasks.filter((task) => !task.dueDate);

		return new TaskFilter(withoutDueDate);
	}

	withDueDate(): TaskFilter {
		const withDueDate = this.tasks.filter((task) => task.dueDate && new Date(task.dueDate) > new Date());

		return new TaskFilter(withDueDate);
	}

	byOverdue(): TaskFilter {
		const overdue = this.tasks.filter((task) => task.dueDate && new Date(task.dueDate) < new Date());

		return new TaskFilter(overdue);
	}

	// it is a teacher based interpretation or and why or condition?
	byCompletedForStudent(): TaskFilter {
		const completed = this.tasks.filter((task) => task.status.submitted >= 1 || task.status.graded >= 1);

		return new TaskFilter(completed);
	}

	bySubmittedForStudent(): TaskFilter {
		const submitted = this.tasks.filter((task) => task.status.submitted > 0 && task.status.graded === 0);

		return new TaskFilter(submitted);
	}

	byGradedForStudent(): TaskFilter {
		const graded = this.tasks.filter((task) => task.status.graded > 0);

		return new TaskFilter(graded);
	}

	byDraftForTeacher(isDraft: boolean): TaskFilter {
		const filteredTasks = this.tasks.filter((task) => task.status.isDraft === isDraft);
		return new TaskFilter(filteredTasks);
	}

	filterSubstituteForTeacher(withSubstitute: boolean): TaskFilter {
		const filteredTasks = withSubstitute
			? this.tasks
			: this.tasks.filter((task) => task.status.isSubstitutionTeacher === false);

		return new TaskFilter(filteredTasks);
	}
}
