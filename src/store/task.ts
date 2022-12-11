import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	TaskApiFactory,
	TaskApiInterface,
	TaskCreateParams,
	TaskUpdateParams,
} from "../serverApi/v3/api";
import { $axios } from "../utils/api";
import { BusinessError } from "./types/commons";

type TempTask = {
	id: string;
	courseId?: string;
	name: string;
	description: string;
};

@Module({
	name: "task",
	namespaced: true,
	stateFactory: true,
})
export default class TaskModule extends VuexModule {
	// TODO - implement/use proper type
	taskData: TempTask = {
		id: "",
		name: "",
		description: "",
	};
	loading: boolean = false;
	businessError: BusinessError = {
		statusCode: "",
		message: "",
		error: {},
	};

	private _taskApi?: TaskApiInterface;
	private get taskApi(): TaskApiInterface {
		if (!this._taskApi) {
			this._taskApi = TaskApiFactory(undefined, "/v3", $axios);
		}
		return this._taskApi;
	}

	@Action
	async findTask(taskId: string): Promise<void> {
		this.resetBusinessError();
		this.setLoading(true);

		try {
			const { data } = await this.taskApi.taskControllerFindTask(taskId);

			this.setTaskData(data);
			this.setLoading(false);
		} catch (error: any) {
			this.setLoading(false);
			this.setBusinessError(error);
		}
	}

	@Action
	async createTask(params: TaskCreateParams): Promise<void> {
		this.resetBusinessError();
		this.setLoading(true);

		try {
			const { data } = await this.taskApi.taskControllerCreate({
				name: params.name,
				description: params.description,
			});

			this.setTaskData(data);
			this.setLoading(false);
		} catch (error: any) {
			this.setLoading(false);
			this.setBusinessError(error);
		}
	}

	@Action
	async updateTask(params: TaskUpdateParams): Promise<void> {
		this.resetBusinessError();
		this.setLoading(true);

		try {
			const { data } = await this.taskApi.taskControllerUpdate(
				this.taskData.id,
				params
			);
			this.setTaskData(data);
			this.setLoading(false);
		} catch (error: any) {
			this.setLoading(false);
			this.setBusinessError(error);
		}
	}

	@Mutation
	setTaskData(payload: any): void {
		this.taskData = payload;
	}

	@Mutation
	setLoading(loading: boolean): void {
		this.loading = loading;
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
			error: {},
		};
	}

	get getLoading(): boolean {
		return this.loading;
	}

	get getTaskData(): Object {
		return this.taskData;
	}

	get getBusinessError() {
		return this.businessError;
	}
}
