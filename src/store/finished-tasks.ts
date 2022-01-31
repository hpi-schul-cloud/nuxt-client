import {
	Module,
	VuexModule,
	Mutation,
	Action,
	getModule,
} from "vuex-module-decorators";
import AuthModule from "@/store/auth";
import TasksModule from "@/store/tasks";
import { rootStore } from "./index";
import { $axios } from "../utils/api";
import { TaskApiFactory, TaskApiInterface } from "../serverApi/v3/api";
import { BusinessError, Status, Pagination } from "./types/commons";
import { Task } from "./types/tasks";

@Module({
	name: "finished-tasks",
	namespaced: true,
	dynamic: true,
	store: rootStore,
	stateFactory: true,
})
export class FinishedTaskModule extends VuexModule {
	tasks: Task[] = [];

	pagination: Pagination = {
		limit: 11,
		skip: 0,
		total: 0,
	};

	businessError: BusinessError = {
		statusCode: "",
		message: "",
	};

	status: Status = "";

	isInitialized: boolean = false;

	_taskApi?: TaskApiInterface;

	@Action
	async fetchInitialTasks(): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");
		try {
			const { skip, limit } = this.pagination;

			const response = await this.taskApi.taskControllerFindAllFinished(
				skip,
				limit
			);

			this.setTasks(response.data.data);

			this.setPagination({
				limit,
				skip: limit,
				total: response.data.total,
			});
			this.setStatus("completed");
			this.setInitialized(true);
		} catch (error) {
			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
	}

	@Action
	async fetchMoreTasks(): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");
		try {
			const { skip, limit, total } = this.pagination;

			if (total <= skip) {
				this.setStatus("completed");
				return;
			}

			const response = await this.taskApi.taskControllerFindAllFinished(
				skip,
				limit
			);

			await new Promise((resolve) => setTimeout(resolve, 300));

			this.setTasks(this.tasks.concat(response.data.data));
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

	/* 	@Action
	async fetchTasks(): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");
		try {
			const { skip, limit, total } = this.pagination;

			if (this.tasks.length >= total && this.isInitialized) {
				this.setStatus("completed");
				return;
			}

			const response = await this.taskApi.taskControllerFindAllFinished(
				skip,
				limit
			);

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
	} */

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
				const response = await this.taskApi.taskControllerFindAllFinished(
					skip,
					limit
				);
				tasks.push(...response.data.data);

				skip += limit;
			} while (skip !== oldSkipValue);

			await new Promise((resolve) => setTimeout(resolve, 300));
			this.setTasks(tasks);

			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
	}

	@Action
	async restoreTask(taskId: String): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");
		try {
			const task = await $axios.$get(`/v1/homework/${taskId}`);
			const userId = AuthModule.getUser?.id;

			const archived = task.archived.filter((id: String) => id !== userId);
			await $axios.$patch(`/v1/homework/${taskId}`, { archived });

			await this.refetchTasks();
			await TasksModule.fetchAllTasks();

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

export default getModule(FinishedTaskModule);
