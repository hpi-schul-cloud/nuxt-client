import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
// TODO adjust imports when interfaces below are not needed anymore (API includes title)
import {
	// TaskCardResponse,
	CardElementResponse,
	TaskResponse,
	CardElementParams,
	CardsApiFactory,
	CardsApiInterface,
	// TaskCardParams,
	CardElementResponseCardElementTypeEnum,
	CardRichTextElementResponseInputFormatEnum,
} from "../serverApi/v3";
import { $axios } from "../utils/api";
import { BusinessError } from "./types/commons";

// TODO remove when interfaces in generated API include title
interface TaskCardResponse {
	id: string;
	cardElements: Array<CardElementResponse>;
	courseName?: string;
	courseId?: string;
	draggable: boolean;
	task: TaskResponse;
	visibleAtDate: string;
	dueDate: string;
	title: string;
}
interface TaskCardParams {
	courseId?: string;
	visibleAtDate?: string;
	dueDate?: string;
	cardElements: Array<CardElementParams>;
	title: string;
}
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
		cardElements: [
			{
				id: "",
				cardElementType: CardElementResponseCardElementTypeEnum.RichText,
				content: {
					value: "",
					inputFormat: CardRichTextElementResponseInputFormatEnum.RichtextCk5,
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

	@Mutation
	setTaskCardData(payload: any): void {
		this.taskCardData = payload;
		// TODO remove when title is coming from API
		this.taskCardData.title = "Mock Title";
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
