import {
	Module,
	VuexModule,
	Mutation,
	Action,
	getModule,
} from "vuex-module-decorators";
import { TaskFilter } from "./task.filter";
import { rootStore } from "./index";
import { $axios } from "../utils/api";
import { TaskApiFactory, TaskApiInterface } from "../serverApi/v3/api";
import { BusinessError, Status } from "./types/commons";
import {
	CompletedTasksForStudent,
	OpenTasksForStudent,
	OpenTasksForTeacher,
	Task,
	TaskCourseFilter,
	TasksCountPerCourseStudent,
	TasksCountPerCourseTeacher,
} from "./types/tasks";

@Module({
	name: "tasks",
	namespaced: true,
	dynamic: true,
	store: rootStore,
	stateFactory: true,
})
export class TaskModule extends VuexModule {
	tasks: Task[] = [];

	courseFilter: string[] = [];

	substituteFilter: boolean = false;

	businessError: BusinessError = {
		statusCode: "",
		message: "",
	};

	status: Status = "";

	_taskApi?: TaskApiInterface;

	@Action
	async getAllTasks(): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");
		try {
			const response = await this.taskApi.taskControllerFindAll();
			this.setTasks(response.data.data);
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
	}

	@Mutation
	setTasks(tasks: Task[]) {
		this.tasks = tasks;
	}

	@Mutation
	setCourseFilters(courseNames: string[]) {
		this.courseFilter = courseNames;
	}

	@Mutation
	setSubstituteFilter(enabled: boolean) {
		this.substituteFilter = enabled;
		this.courseFilter = new TaskFilter(this.tasks)
			.filterSubstituteForTeacher(enabled)
			.courseNames();
	}

	@Mutation
	setStatus(status: Status) {
		this.status = status;
	}

	@Mutation
	setBusinessError(businessError: BusinessError): void {
		this.businessError = businessError;
	}

	@Mutation
	resetBusinessError(): void {
		this.businessError = {
			statusCode: "",
			message: "",
		};
	}

	get getTasks(): Task[] {
		return this.tasks;
	}

	get getStatus(): Status {
		return this.status;
	}

	get getBusinessError(): BusinessError {
		return this.businessError;
	}

	get getCourseFilters(): TaskCourseFilter[] {
		const filteredTasks = new TaskFilter(this.tasks).filterSubstituteForTeacher(
			this.substituteFilter
		).tasks;

		// map to filter objects (can still contain duplicates by courseName)
		const mappedToFilter: TaskCourseFilter[] = filteredTasks.map((task) => {
			return {
				value: task.courseName,
				text: task.courseName,
				isSubstitution: task.status.isSubstitutionTeacher,
			};
		});

		// make the list unique by courseName
		const uniqueFilters = [
			...new Map(mappedToFilter.map((item) => [item.value, item])).values(),
		];
		return uniqueFilters;
	}

	get getSelectedCourseFilters(): string[] {
		return this.courseFilter;
	}

	get isSubstituteFilterEnabled(): boolean {
		return this.substituteFilter;
	}

	get hasFilterSelected(): boolean {
		return this.courseFilter.length > 0;
	}

	get hasTasks(): boolean {
		return this.isReady && this.tasks.length > 0;
	}

	get hasOpenTasksForStudent(): boolean {
		const openTaskCount = new TaskFilter(this.tasks)
			.byCourseNames(this.courseFilter)
			.byOpenForStudent()
			.count();

		return this.isReady && openTaskCount > 0;
	}

	get hasOpenTasksForTeacher(): boolean {
		const openTaskCount = new TaskFilter(this.tasks)
			.filterSubstituteForTeacher(this.substituteFilter)
			.byCourseNames(this.courseFilter)
			.byOpenForTeacher()
			.count();
		return this.isReady && openTaskCount > 0;
	}

	get hasCompletedTasksForStudent(): boolean {
		const completedTaskCount = new TaskFilter(this.tasks)
			.byCourseNames(this.courseFilter)
			.byCompletedForStudent()
			.count();

		return this.isReady && completedTaskCount > 0;
	}

	get hasDraftsForTeacher(): boolean {
		const draftTaskCount = new TaskFilter(this.tasks)
			.filterSubstituteForTeacher(this.substituteFilter)
			.byCourseNames(this.courseFilter)
			.byDraftForTeacher(true)
			.count();

		return this.isReady && draftTaskCount > 0;
	}

	get getOpenTasksForStudent(): OpenTasksForStudent {
		const filter = new TaskFilter(this.tasks)
			.byCourseNames(this.courseFilter)
			.byOpenForStudent();

		const result = {
			overdue: filter.byOverdue().tasks,
			noDueDate: filter.withoutDueDate().tasks,
			withDueDate: filter.withDueDate().tasks,
		};

		return result;
	}

	get getCompletedTasksForStudent(): CompletedTasksForStudent {
		const filter = new TaskFilter(this.tasks).byCourseNames(this.courseFilter);

		const result = {
			submitted: filter.bySubmittedForStudent().tasks,
			graded: filter.byGradedForStudent().tasks,
		};

		return result;
	}

	get getOpenTasksForTeacher(): OpenTasksForTeacher {
		const filter = new TaskFilter(this.tasks)
			.filterSubstituteForTeacher(this.substituteFilter)
			.byCourseNames(this.courseFilter)
			.byOpenForTeacher();

		const result = {
			overdue: filter.byOverdue().tasks,
			noDueDate: filter.withoutDueDate().tasks,
			withDueDate: filter.withDueDate().tasks,
		};

		return result;
	}

	get getDraftTasksForTeacher(): Task[] {
		const draftTasks = new TaskFilter(this.tasks)
			.filterSubstituteForTeacher(this.substituteFilter)
			.byCourseNames(this.courseFilter)
			.byDraftForTeacher(true).tasks;

		return draftTasks;
	}

	get getTasksCountPerCourseStudent(): TasksCountPerCourseStudent {
		const allCourseNames = new TaskFilter(this.tasks).courseNames();

		const openCounts = new TaskFilter(this.tasks)
			.byOpenForStudent()
			.countByCourseName(allCourseNames);

		const completedCounts = new TaskFilter(this.tasks)
			.byCompletedForStudent()
			.countByCourseName(allCourseNames);

		const tasksCount: TasksCountPerCourseStudent = {
			open: openCounts,
			completed: completedCounts,
		};

		return tasksCount;
	}

	get getTasksCountPerCourseForTeacher(): TasksCountPerCourseTeacher {
		const allCourseNames = new TaskFilter(this.tasks).courseNames();

		const openCounts = new TaskFilter(this.tasks)
			.filterSubstituteForTeacher(this.substituteFilter)
			.byOpenForTeacher()
			.countByCourseName(allCourseNames);

		const draftCounts = new TaskFilter(this.tasks)
			.filterSubstituteForTeacher(this.substituteFilter)
			.byDraftForTeacher(true)
			.countByCourseName(allCourseNames);

		const tasksCount: TasksCountPerCourseTeacher = {
			open: openCounts,
			drafts: draftCounts,
		};

		return tasksCount;
	}

	private get isReady(): boolean {
		return this.status === "completed";
	}

	private get taskApi() {
		if (!this._taskApi) {
			this._taskApi = TaskApiFactory(
				undefined,
				"/v3", //`${EnvConfigModule.getApiUrl}/v3`,
				$axios
			);
		}
		return this._taskApi;
	}
}

export default getModule(TaskModule);
