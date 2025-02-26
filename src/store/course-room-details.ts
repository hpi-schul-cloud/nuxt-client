import {
	BoardApiFactory,
	CreateBoardBodyParams,
	CreateBoardResponse,
	LessonApiFactory,
	LessonApiInterface,
	PatchOrderParams,
	PatchVisibilityParams,
	CourseRoomsApiFactory,
	CourseRoomsApiInterface,
	SingleColumnBoardResponse,
	TaskApiFactory,
	TaskApiInterface,
} from "@/serverApi/v3";
import { applicationErrorModule } from "@/store";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { BusinessError } from "./types/commons";
import { HttpStatusCode } from "./types/http-status-code.enum";
import { Course } from "./types/room";
import {
	CommonCartridgeApiFactory,
	CommonCartridgeApiInterface,
} from "@/commonCartridgeApi/v3";

@Module({
	name: "courseRoomDetailsModule",
	namespaced: true,
	stateFactory: true,
})
export default class CourseRoomDetailsModule extends VuexModule {
	roomData: SingleColumnBoardResponse = {
		roomId: "",
		title: "",
		displayColor: "",
		elements: [],
		isArchived: false,
		isSynchronized: false,
	};
	scopePermissions: string[] = [];
	loading = false;
	error: unknown = null;
	businessError: BusinessError = {
		statusCode: "",
		message: "",
		error: {},
	};
	private courseShareToken = "";

	private get roomsApi(): CourseRoomsApiInterface {
		return CourseRoomsApiFactory(undefined, "/v3", $axios);
	}

	private get lessonApi(): LessonApiInterface {
		return LessonApiFactory(undefined, "/v3", $axios);
	}

	public get commonCartridgeApi(): CommonCartridgeApiInterface {
		return CommonCartridgeApiFactory(undefined, "/v3", $axios);
	}

	@Action
	async fetchCourse(courseId: string): Promise<Course | null> {
		this.setLoading(true);

		try {
			const { data } = await $axios.get(`/v1/courses/${courseId}`);

			this.setLoading(false);

			return data;
		} catch (error: unknown) {
			this.setError(error);

			this.setLoading(false);
		}

		return null;
	}

	@Action
	async fetchContent(id: string): Promise<void> {
		this.setLoading(true);
		try {
			const { data } =
				await this.roomsApi.courseRoomsControllerGetRoomBoard(id);
			this.setRoomData(data);
			this.setLoading(false);
		} catch (error: unknown) {
			this.setError(error);
			this.setLoading(false);
		}
	}

	@Action
	async publishCard(payload: {
		elementId: string;
		visibility: boolean;
	}): Promise<void> {
		this.setLoading(true);
		const visibilityParam: PatchVisibilityParams = {
			visibility: payload.visibility,
		};
		try {
			await this.roomsApi.courseRoomsControllerPatchElementVisibility(
				this.roomData.roomId,
				payload.elementId,
				visibilityParam
			);
			await this.fetchContent(this.roomData.roomId);

			this.setLoading(false);
		} catch (error: unknown) {
			this.setError(error);
			this.setLoading(false);
		}
	}

	@Action
	async sortElements(payload: PatchOrderParams): Promise<void> {
		this.setLoading(true);
		try {
			await this.roomsApi.courseRoomsControllerPatchOrderingOfElements(
				this.roomData.roomId,
				payload
			);
			await this.fetchContent(this.roomData.roomId);
			this.setLoading(false);
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});

			this.setLoading(false);
		}
	}

	@Action
	async deleteLesson(lessonId: string): Promise<void> {
		this.resetBusinessError();
		try {
			await this.lessonApi.lessonControllerDelete(lessonId);
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}
	}

	@Action
	async deleteTask(taskId: string): Promise<void> {
		this.resetBusinessError();
		try {
			await this.taskApi.taskControllerDelete(taskId);
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}
	}

	@Action
	async deleteBoard(boardId: string): Promise<void> {
		this.resetBusinessError();
		try {
			await this.boardApi.boardControllerDeleteBoard(boardId);
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}
	}

	@Action
	async createBoard(
		prams: CreateBoardBodyParams
	): Promise<CreateBoardResponse | undefined> {
		this.resetBusinessError();
		try {
			const { data } = await this.boardApi.boardControllerCreateBoard(prams);

			return data;
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}
	}

	@Action
	async downloadCommonCartridgeCourse(exportSettings: {
		version: "1.1.0" | "1.3.0";
		topics: string[];
		tasks: string[];
		columnBoards: string[];
	}): Promise<void> {
		this.resetBusinessError();
		try {
			const response =
				await this.commonCartridgeApi.commonCartridgeControllerExportCourse(
					this.roomData.roomId,
					exportSettings.version,
					{
						topics: exportSettings.topics,
						tasks: exportSettings.tasks,
						columnBoards: exportSettings.columnBoards,
					},
					{
						responseType: "blob",
					}
				);

			const link = document.createElement("a");
			link.href = URL.createObjectURL(
				new Blob([response.data as unknown as Blob])
			);
			link.download = `${
				this.roomData.title
			}-${new Date().toISOString()}.imscc`;
			link.click();
			URL.revokeObjectURL(link.href);
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}
	}

	@Action
	async finishTask(payload: {
		itemId: string;
		action: "finish" | "restore";
	}): Promise<void> {
		this.resetBusinessError();
		try {
			if (payload.action === "finish") {
				await this.taskApi.taskControllerFinish(payload.itemId);
			} else if (payload.action === "restore") {
				await this.taskApi.taskControllerRestore(payload.itemId);
			}
			await this.fetchContent(this.roomData.roomId);
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}
	}

	@Action
	async fetchScopePermission(payload: {
		courseId: string;
		userId: string;
	}): Promise<void> {
		const requestUrl = `/v3/courses/${payload.courseId}/user-permissions`;
		try {
			const ret_val = (await $axios.get(requestUrl)).data;
			this.setPermissionData(ret_val[payload.userId]);
		} catch (error: unknown) {
			this.setError(error);
			this.setLoading(false);
		}
	}

	@Mutation
	setRoomData(payload: SingleColumnBoardResponse): void {
		this.roomData = payload;
	}

	@Mutation
	setPermissionData(payload: string[]): void {
		this.scopePermissions = payload;
	}

	@Mutation
	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	@Mutation
	setError(error: unknown): void {
		this.error = error;
		const handledApplicationErrors: Array<HttpStatusCode> = [
			HttpStatusCode.BadRequest,
			HttpStatusCode.Unauthorized,
			HttpStatusCode.Forbidden,
			HttpStatusCode.NotFound,
			HttpStatusCode.RequestTimeout,
			HttpStatusCode.InternalServerError,
		];
		if (error === null) {
			applicationErrorModule.resetError();
			return;
		}

		const apiError = mapAxiosErrorToResponseError(error);

		const errorCode = apiError.code;
		if (errorCode && handledApplicationErrors.includes(errorCode))
			applicationErrorModule.setError(createApplicationError(errorCode));
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

	@Mutation
	setCourseShareToken(payload: string): void {
		this.courseShareToken = payload;
	}

	get getLoading(): boolean {
		return this.loading;
	}

	get getError(): unknown {
		return this.error;
	}

	get getRoomData(): SingleColumnBoardResponse {
		return this.roomData;
	}

	get getPermissionData(): string[] {
		return this.scopePermissions;
	}

	get getBusinessError() {
		return this.businessError;
	}

	get getCourseShareToken(): string {
		return this.courseShareToken;
	}

	get roomIsEmpty(): boolean {
		return this.finishedLoading && this.roomData.elements.length === 0;
	}

	get getRoomId(): string {
		return this.roomData.roomId;
	}

	private get finishedLoading(): boolean {
		return this.getLoading === false;
	}

	private get taskApi(): TaskApiInterface {
		return TaskApiFactory(undefined, "/v3", $axios);
	}

	private get boardApi() {
		return BoardApiFactory(undefined, "/v3", $axios);
	}
}
