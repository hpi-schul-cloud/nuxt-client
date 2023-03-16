import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	TaskCardResponse,
	CardsApiFactory,
	CardsApiInterface,
	TaskCardParams,
	CardElementResponseCardElementTypeEnum,
	CardRichTextElementResponseInputFormatEnum,
} from "../serverApi/v3";
import { $axios } from "../utils/api";
import { BusinessError, Status } from "./types/commons";

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
		cardElements: [
			{
				id: "",
				cardElementType: CardElementResponseCardElementTypeEnum.Title,
				content: {
					value: "",
				},
			},
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
	status: Status = "";
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
		this.setStatus("pending");

		try {
			const { data } = await this.cardsApi.taskCardControllerFindOne(
				taskCardId
			);

			this.setTaskCardData(data);
			this.setStatus("completed");
		} catch (error: any) {
			this.setStatus("error");
			this.setBusinessError({
				error: error?.response?.data,
				statusCode: error?.response?.status,
				message: error?.response?.data.title,
			});
		}
	}

	@Action
	async createTaskCard(params: TaskCardParams): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");

		try {
			const { data } = await this.cardsApi.taskCardControllerCreate(params);

			this.setTaskCardData(data);
			this.setStatus("completed");
		} catch (error: any) {
			this.setStatus("error");
			this.setBusinessError({
				error: error?.response?.data,
				statusCode: error?.response?.status,
				message: error?.response?.data.title,
			});
		}
	}

	@Action
	async updateTaskCard(params: TaskCardParams): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");

		try {
			const { data } = await this.cardsApi.taskCardControllerUpdate(
				this.taskCardData.id,
				params
			);
			this.setTaskCardData(data);
			this.setStatus("completed");
		} catch (error: any) {
			this.setStatus("error");
			this.setBusinessError({
				error: error?.response?.data,
				statusCode: error?.response?.status,
				message: error?.response?.data.title,
			});
		}
	}

	@Mutation
	setTaskCardData(payload: TaskCardResponse): void {
		this.taskCardData = payload;
	}

	@Mutation
	setCourseId(id: string): void {
		this.taskCardData.courseId = id;
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
			error: {},
		};
	}

	get getStatus(): Status {
		return this.status;
	}

	get getTaskCardData(): TaskCardResponse {
		return this.taskCardData;
	}

	get getBusinessError(): BusinessError {
		return this.businessError;
	}
}
