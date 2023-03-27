import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	TaskCardResponse,
	CardsApiFactory,
	CardsApiInterface,
	TaskCardParams,
} from "../serverApi/v3";
import { $axios } from "../utils/api";
import { BusinessError } from "./types/commons";

@Module({
	name: "taskCardModule",
	namespaced: true,
	stateFactory: true,
})
export default class TaskCardModule extends VuexModule {
	taskCardData: TaskCardResponse = {
		id: "",
		courseId: "",
		courseName: "",
		title: "",
		cardElements: [],
		draggable: true,
		task: {
			id: "",
			users: [],
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
		dueDate: "",
		visibleAtDate: "",
	};
	loading = false;
	businessError: BusinessError = {
		statusCode: "",
		message: "",
		error: {},
	};

	private get cardsApi(): CardsApiInterface {
		return CardsApiFactory(undefined, "/v3", $axios);
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
	async createTaskCard(params: TaskCardParams): Promise<void> {
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
	async updateTaskCard(params: TaskCardParams): Promise<void> {
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

	@Action
	async deleteTaskCard(): Promise<void> {
		this.resetBusinessError();
		this.setLoading(true);

		try {
			await this.cardsApi.taskCardControllerDelete(this.taskCardData.id);
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
	setCourseId(id: string): void {
		this.taskCardData.courseId = id;
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
