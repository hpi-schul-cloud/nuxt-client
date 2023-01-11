import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	TaskCardResponse,
	CardsApiFactory,
	CardsApiInterface,
	CreateTaskCardParams,
	UpdateTaskCardParams,
	CardElementResponseCardElementTypeEnum,
} from "../serverApi/v3";
import { $axios } from "../utils/api";
import { BusinessError } from "./types/commons";

@Module({
	name: "task",
	namespaced: true,
	stateFactory: true,
})
export default class TaskModule extends VuexModule {
	taskData: TaskCardResponse = {
		id: "",
		cardElements: [
			{
				id: "",
				cardElementType: CardElementResponseCardElementTypeEnum.Title,
				content: {
					value: "",
				},
			},
		],
		draggable: true,
		task: {
			id: "",
			name: "",
			courseName: "",
			courseId: "",
			createdAt: "",
			updatedAt: "",
			lessonHidden: false,
			status: {
				submitted: 0,
				maxSubmissions: 0,
				graded: 0,
				isDraft: true,
				isSubstitutionTeacher: true,
				isFinished: false,
			},
		},
	};
	loading: boolean = false;
	businessError: BusinessError = {
		statusCode: "",
		message: "",
		error: {},
	};

	private _taskApi?: CardsApiInterface;
	private get taskApi(): CardsApiInterface {
		if (!this._taskApi) {
			this._taskApi = CardsApiFactory(undefined, "/v3", $axios);
		}
		return this._taskApi;
	}

	@Action
	async findTask(taskId: string): Promise<void> {
		this.resetBusinessError();
		this.setLoading(true);

		try {
			const { data } = await this.taskApi.taskCardControllerFindOne(taskId);

			this.setTaskData(data);
			this.setLoading(false);
		} catch (error: any) {
			this.setLoading(false);
			this.setBusinessError(error);
		}
	}

	@Action
	async createTask(params: CreateTaskCardParams): Promise<void> {
		this.resetBusinessError();
		this.setLoading(true);

		try {
			const { data } = await this.taskApi.taskCardControllerCreate(params);

			this.setTaskData(data);
			this.setLoading(false);
		} catch (error: any) {
			this.setLoading(false);
			this.setBusinessError(error);
		}
	}

	@Action
	async updateTask(params: UpdateTaskCardParams): Promise<void> {
		this.resetBusinessError();
		this.setLoading(true);

		try {
			const { data } = await this.taskApi.taskCardControllerUpdate(
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

	get getTaskData(): TaskCardResponse {
		return this.taskData;
	}

	get getBusinessError() {
		return this.businessError;
	}
}
