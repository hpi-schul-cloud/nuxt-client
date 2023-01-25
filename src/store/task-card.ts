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
	name: "task-card",
	namespaced: true,
	stateFactory: true,
})
export default class TaskCardModule extends VuexModule {
	taskCardData: TaskCardResponse = {
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
		visibleAtDate: "",
		dueDate: "",
	};
	loading: boolean = false;
	businessError: BusinessError = {
		statusCode: "",
		message: "",
		error: {},
	};

	private _cardsApi?: CardsApiInterface;
	private get cardsApi(): CardsApiInterface {
		if (!this._cardsApi) {
			this._cardsApi = CardsApiFactory(undefined, "/v3", $axios);
		}
		return this._cardsApi;
	}

	@Action
	async findTaskCard(taskCardId: string): Promise<void> {
		this.resetBusinessError();
		this.setLoading(true);

		try {
			const { data } = await this.cardsApi.taskCardControllerFindOne(
				taskCardId
			);

			this.setTaskCardData(data);
			this.setLoading(false);
		} catch (error: any) {
			this.setLoading(false);
			this.setBusinessError(error);
		}
	}

	@Action
	async createTaskCard(params: CreateTaskCardParams): Promise<void> {
		this.resetBusinessError();
		this.setLoading(true);

		try {
			const { data } = await this.cardsApi.taskCardControllerCreate(params);

			this.setTaskCardData(data);
			this.setLoading(false);
		} catch (error: any) {
			this.setLoading(false);
			this.setBusinessError(error);
		}
	}

	@Action
	async updateTaskCard(params: UpdateTaskCardParams): Promise<void> {
		this.resetBusinessError();
		this.setLoading(true);

		try {
			const { data } = await this.cardsApi.taskCardControllerUpdate(
				this.taskCardData.id,
				params
			);
			this.setTaskCardData(data);
			this.setLoading(false);
		} catch (error: any) {
			this.setLoading(false);
			this.setBusinessError(error);
		}
	}

	@Mutation
	setTaskCardData(payload: any): void {
		this.taskCardData = payload;
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

	get getTaskCardData(): TaskCardResponse {
		return this.taskCardData;
	}

	get getBusinessError() {
		return this.businessError;
	}
}
