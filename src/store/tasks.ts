import { TaskApiFactory, TaskApiInterface } from "../serverApi/v3/api";
import { $axios } from "../utils/api";
import { TaskFilter } from "./task.filter";
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
import { finishedTasksModule } from "@/store";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
	name: "tasksModule",
	namespaced: true,
	stateFactory: true,
})
export default class TasksModule extends VuexModule {
	tasks: Task[] = [];

	courseFilter: string[] = [];

	substituteFilter = false;

	businessError: BusinessError = {
		statusCode: "",
		message: "",
	};

	status: Status = "";

	loading = false;

	tab = "";

	@Action
	async fetchAllTasks(): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");
		try {
			const tasks: Task[] = [];
			const backendLimit = 100;
			let skip = 0;
			let total: number;
			do {
				// use initial request to get default page size from api
				const response =
					skip === 0
						? await this.taskApi.taskControllerFindAll()
						: await this.taskApi.taskControllerFindAll(skip, backendLimit);
				tasks.push(...response.data.data);
				skip = skip + response.data.limit;
				total = response.data.total;
			} while (skip < total);
			this.setTasks(tasks);
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
	}

	@Action
	async finishTask(taskId: string): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");
		try {
			await this.taskApi.taskControllerFinish(taskId);

			await this.fetchAllTasks();
			if (finishedTasksModule.isInitialized) {
				await finishedTasksModule.refetchTasks();
			}

			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
	}

	@Action
	async revertPublishedTask(taskId: string): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");
		try {
			await this.taskApi.taskControllerRevertPublished(taskId);

			await this.fetchAllTasks();
			if (finishedTasksModule.isInitialized) {
				await finishedTasksModule.refetchTasks();
			}

			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
	}

	@Action
	async deleteTask(taskId: string): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");
		try {
			await this.taskApi.taskControllerDelete(taskId);

			await this.fetchAllTasks();
			if (finishedTasksModule.isInitialized) {
				await finishedTasksModule.refetchTasks();
			}

			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
	}

	@Mutation
	setTasks(tasks: Task[]): void {
		this.tasks = tasks;
	}

	@Mutation
	setCourseFilters(courseNames: string[]): void {
		this.courseFilter = courseNames;
	}

	@Mutation
	setActiveTab(tab: string): void {
		this.tab = tab;
	}

	@Mutation
	setSubstituteFilter(enabled: boolean): void {
		this.substituteFilter = enabled;

		// remove substitute course(s) from course filter when substitute filter is disabled
		if (!enabled) {
			const courseNamesWithoutSubstitutes = new TaskFilter(this.tasks).filterSubstituteForTeacher(false).courseNames();

			this.courseFilter = this.courseFilter.filter((courseName) => courseNamesWithoutSubstitutes.includes(courseName));
		}
	}

	@Mutation
	setStatus(status: Status): void {
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

	get getLoading(): boolean {
		return this.loading;
	}

	get getActiveTab(): string {
		return this.tab;
	}

	get getCourseFilters(): TaskCourseFilter[] {
		const filteredTasks = new TaskFilter(this.tasks).filterSubstituteForTeacher(this.substituteFilter).tasks;

		// map to filter objects (can still contain duplicates by courseName)
		const mappedToFilter: TaskCourseFilter[] = filteredTasks.map((task) => ({
			value: task.courseName,
			text: task.courseName,
			isSubstitution: task.status.isSubstitutionTeacher,
		}));

		// make the list unique by courseName
		const uniqueFilters = [...new Map(mappedToFilter.map((item) => [item.value, item])).values()];
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

	get openTasksForStudentIsEmpty(): boolean {
		const openTaskCount = new TaskFilter(this.tasks).byCourseNames(this.courseFilter).byOpenForStudent().count();

		return this.isReady && openTaskCount === 0;
	}

	get openTasksForTeacherIsEmpty(): boolean {
		const openTaskCount = new TaskFilter(this.tasks)
			.filterSubstituteForTeacher(this.substituteFilter)
			.byCourseNames(this.courseFilter)
			.byOpenForTeacher()
			.count();
		return this.isReady && openTaskCount === 0;
	}

	get completedTasksForStudentIsEmpty(): boolean {
		const completedTaskCount = new TaskFilter(this.tasks)
			.byCourseNames(this.courseFilter)
			.byCompletedForStudent()
			.count();

		return this.isReady && completedTaskCount === 0;
	}

	get draftsForTeacherIsEmpty(): boolean {
		const draftTaskCount = new TaskFilter(this.tasks)
			.filterSubstituteForTeacher(this.substituteFilter)
			.byCourseNames(this.courseFilter)
			.byDraftForTeacher(true)
			.count();

		return this.isReady && draftTaskCount === 0;
	}

	get getOpenTasksForStudent(): OpenTasksForStudent {
		const filter = new TaskFilter(this.tasks).byCourseNames(this.courseFilter).byOpenForStudent();

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
			.byDraftForTeacher(true)
			.tasks.sort((task1, task2) => new Date(task2.createdAt).getTime() - new Date(task1.createdAt).getTime());

		return draftTasks;
	}

	get getTasksCountPerCourseStudent(): TasksCountPerCourseStudent {
		const allCourseNames = new TaskFilter(this.tasks).courseNames();

		const openCounts = new TaskFilter(this.tasks).byOpenForStudent().countByCourseName(allCourseNames);

		const completedCounts = new TaskFilter(this.tasks).byCompletedForStudent().countByCourseName(allCourseNames);

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

	private get taskApi(): TaskApiInterface {
		return TaskApiFactory(undefined, "/v3", $axios);
	}
}
