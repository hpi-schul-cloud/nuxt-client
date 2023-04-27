import { AxiosError } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { authModule } from "@/store";
import {
	TaskCardResponse,
	CardsApiFactory,
	CardsApiInterface,
	TaskCardParams,
} from "../serverApi/v3";
import { $axios } from "../utils/api";
import { ApiValidationError, BusinessError, Status } from "./types/commons";

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
		completedBy: [],
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
		} catch (error: unknown) {
			this.setStatus("error");
			if (error instanceof AxiosError) {
				const validationError = error?.response?.data as ApiValidationError;
				this.setBusinessError({
					error: validationError,
					statusCode: validationError.code,
					message: validationError.title,
				});
			}
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
		} catch (error: unknown) {
			this.setStatus("error");

			if (error instanceof AxiosError) {
				const validationError = error?.response?.data as ApiValidationError;
				this.setBusinessError({
					error: validationError,
					statusCode: validationError.code,
					message: validationError.title,
				});
			}
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
		} catch (error: unknown) {
			this.setStatus("error");
			if (error instanceof AxiosError) {
				const validationError = error?.response?.data as ApiValidationError;
				this.setBusinessError({
					error: validationError,
					statusCode: validationError.code,
					message: validationError.title,
				});
			}
		}
	}

	@Action
	async deleteTaskCard(taskCardId: string): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");

		try {
			await this.cardsApi.taskCardControllerDelete(taskCardId);
			this.setStatus("completed");
		} catch (error: unknown) {
			this.setStatus("error");

			if (error instanceof AxiosError) {
				this.setBusinessError({
					error: error?.response?.data,
					statusCode: error?.response?.data.code,
					message: error?.response?.data.title,
				});
			}
		}
	}

	@Action
	async completeTaskCard(taskCardId: string): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");

		try {
			await this.cardsApi.taskCardControllerCompleteForUser(taskCardId);
			this.setStatus("completed");
		} catch (error: unknown) {
			this.setStatus("error");

			if (error instanceof AxiosError) {
				this.setBusinessError({
					error: error?.response?.data,
					statusCode: error?.response?.data.code,
					message: error?.response?.data.title,
				});
			}
		}
	}

	@Action
	async undoCompletionForTaskCard(taskCardId: string): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");

		try {
			await this.cardsApi.taskCardControllerUndoCompletionForUser(taskCardId);
			this.setStatus("completed");
		} catch (error: unknown) {
			this.setStatus("error");

			if (error instanceof AxiosError) {
				this.setBusinessError({
					error: error?.response?.data,
					statusCode: error?.response?.data.code,
					message: error?.response?.data.title,
				});
			}
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

	get getCompletedForStudent(): boolean {
		if (this.taskCardData.completedBy.length === 0) return false;
		const user = authModule.getUser;
		return user ? this.taskCardData.completedBy.includes(user.id) : false;
	}

	get isExpired(): boolean {
		return new Date(this.taskCardData.dueDate) < new Date();
	}
}
