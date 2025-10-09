import { TaskApiFactory, TaskApiInterface } from "../serverApi/v3/api";
import { $axios } from "../utils/api";
import { BusinessError, Pagination, Status } from "./types/commons";
import { Task } from "./types/tasks";
import { tasksModule } from "@/store";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
	name: "finishedTasksModule",
	namespaced: true,
	stateFactory: true,
})
export default class FinishedTasksModule extends VuexModule {
	tasks: Task[] = [];

	pagination: Pagination = {
		limit: 50,
		skip: 0,
		total: 0,
	};

	businessError: BusinessError = {
		statusCode: "",
		message: "",
	};

	status: Status = "";

	isInitialized = false;

	@Action
	async fetchFinishedTasks(): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");
		try {
			const { skip, limit, total } = this.pagination;

			if (total <= skip && this.isInitialized) {
				this.setStatus("completed");
				return;
			}

			const response = await this.taskApi.taskControllerFindAllFinished(skip, limit);

			await new Promise((resolve) => setTimeout(resolve, 300));
			this.setTasks(this.tasks.concat(response.data.data));

			if (!this.isInitialized) {
				this.setInitialized(true);
			}

			this.setPagination({
				limit,
				skip: skip + limit,
				total: response.data.total,
			});

			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
	}

	@Action
	async refetchTasks(): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");
		try {
			const { limit } = this.pagination;

			const oldSkipValue = this.pagination.skip;
			let skip = 0;
			const tasks: Task[] = [];

			do {
				const response = await this.taskApi.taskControllerFindAllFinished(skip, limit);
				tasks.push(...response.data.data);

				skip += limit;
			} while (skip <= oldSkipValue);

			await new Promise((resolve) => setTimeout(resolve, 300));
			this.setTasks(tasks);

			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
	}

	@Action
	async restoreTask(taskId: string): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");
		try {
			await this.taskApi.taskControllerRestore(taskId);

			await this.refetchTasks();
			await tasksModule.fetchAllTasks();

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
	setStatus(status: Status) {
		this.status = status;
	}

	@Mutation
	setInitialized(isInitialized: boolean) {
		this.isInitialized = isInitialized;
	}

	@Mutation
	setPagination(pagination: Pagination) {
		this.pagination = pagination;
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

	get getIsInitialized(): boolean {
		return this.isInitialized;
	}

	get getBusinessError(): BusinessError {
		return this.businessError;
	}

	get tasksIsEmpty(): boolean {
		return this.isReady && this.tasks.length === 0;
	}

	private get isReady(): boolean {
		return this.status === "completed";
	}

	private get taskApi(): TaskApiInterface {
		return TaskApiFactory(undefined, "/v3", $axios);
	}
}
