import {
	Module,
	VuexModule,
	Mutation,
	Action,
	getModule,
} from "vuex-module-decorators";
import { rootStore } from "./index";
import { $axios } from "../utils/api";
import { TaskApiFactory, TaskApiInterface } from "../serverApi/v3/api";

export interface Task {
	id: string;
	name: string;
	description?: string;
	availableDate?: string;
	duedate?: string;
	courseName?: string;
	displayColor?: string;
	createdAt: string;
	updatedAt: string;
}

type Pagination = {
	limit: number;
	skip: number;
	total: number;
};

type BusinessError = {
	statusCode: string;
	message: string;
};

type Status = "pending" | "completed" | "error" | "";

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
		limit: 0,
		skip: 0,
		total: 0,
	};

	businessError: BusinessError = {
		statusCode: "",
		message: "",
	};

	status: Status = "";

	_taskApi?: TaskApiInterface;

	@Action
	async fetchTasks(): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");
		try {
			const response = await this.taskApi.taskControllerFindAllFinished();
			
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

	get hasTasks(): boolean {
		return this.isReady && this.tasks.length > 0;
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
