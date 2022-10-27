import { authModule } from "@/store";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	TaskApiFactory,
	TaskApiInterface,
	TaskCreateParams,
	TaskUpdateParams,
} from "../serverApi/v3/api";
import { $axios } from "../utils/api";
import { BusinessError } from "./types/commons";

@Module({
	name: "task",
	namespaced: true,
	stateFactory: true,
})
export default class RoomModule extends VuexModule {
	taskData: Object = {
		taskId: "",
		courseId: "",
		title: "",
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
	async createTask(params: TaskCreateParams): Promise<void> {
		// check for permission here or in page?
		// probably checked in server?

		this.setLoading(true);
		try {
			const { data } = await this.taskApi.taskControllerCreate(params);
			this.setTaskData(data);
			this.setLoading(false);
		} catch (error: any) {
			this.setLoading(false);
		}
	}

	@Action
	async updateTask(taskId: string, params: TaskUpdateParams): Promise<void> {
		// check for permission here or in page?
		// probably checked in server?

		this.setLoading(true);
		try {
			const { data } = await this.taskApi.taskControllerUpdate(taskId, params);
			this.setTaskData(data);
			this.setLoading(false);
		} catch (error: any) {
			this.setLoading(false);
		}
	}

	@Mutation
	setTaskData(payload: Object): void {
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
