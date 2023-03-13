import { applicationErrorModule, authModule } from "@/store";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { AxiosError } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	SingleColumnBoardResponse,
	CoursesApiFactory,
	LessonApiFactory,
	LessonApiInterface,
	PatchOrderParams,
	PatchVisibilityParams,
	RoomsApiFactory,
	RoomsApiInterface,
	ApiValidationError,
} from "../serverApi/v3/api";
import { $axios } from "../utils/api";
import { BusinessError } from "./types/commons";
import { HttpStatusCode } from "./types/http-status-code.enum";

@Module({
	name: "roomModule",
	namespaced: true,
	stateFactory: true,
})
export default class RoomModule extends VuexModule {
	roomData: SingleColumnBoardResponse = {
		roomId: "",
		title: "",
		displayColor: "",
		elements: [],
	};
	scopePermissions: string[] = [];
	loading = false;
	error: null | object = null;
	businessError: BusinessError = {
		statusCode: "",
		message: "",
		error: {},
	};
	private courseShareToken = "";

	private get roomsApi(): RoomsApiInterface {
		return RoomsApiFactory(undefined, "/v3", $axios);
	}

	private get lessonApi(): LessonApiInterface {
		return LessonApiFactory(undefined, "/v3", $axios);
	}

	@Action
	async fetchContent(id: string): Promise<void> {
		this.setLoading(true);
		try {
			const { data } = await this.roomsApi.roomsControllerGetRoomBoard(id);
			this.setRoomData(data);
			this.setLoading(false);
		} catch (error: any) {
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
			await this.roomsApi.roomsControllerPatchElementVisibility(
				this.roomData.roomId,
				payload.elementId,
				visibilityParam
			);
			await this.fetchContent(this.roomData.roomId);

			this.setLoading(false);
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
		}
	}

	@Action
	async sortElements(payload: PatchOrderParams): Promise<void> {
		this.setLoading(true);
		try {
			await this.roomsApi.roomsControllerPatchOrderingOfElements(
				this.roomData.roomId,
				payload
			);
			await this.fetchContent(this.roomData.roomId);
			this.setLoading(false);
		} catch (error: any) {
			this.setBusinessError({
				statusCode: error?.response?.status,
				message: error?.response?.statusText,
				...error,
			});
			this.setLoading(false);
		}
	}

	@Action
	async confirmImportLesson(shareToken: string): Promise<void> {
		try {
			this.resetBusinessError();
			const lesson = await $axios.get("/v1/lessons", {
				params: { shareToken },
			});

			if (!lesson.data.data.length) {
				this.setBusinessError({
					statusCode: "400",
					message: "not-found",
				});
				return;
			}

			const copiedLesson = (
				await $axios.post("/v1/lessons/copy", {
					lessonId: lesson.data.data[0]._id,
					newCourseId: this.roomData.roomId,
					shareToken,
				})
			)?.data;

			if (!copiedLesson) {
				this.setBusinessError({
					statusCode: "400",
					message: "not-created",
				});
				return;
			}
			await this.fetchContent(this.roomData.roomId);
		} catch (error: any) {
			this.setBusinessError({
				statusCode: error?.response?.status,
				message: error?.response?.statusText,
				...error,
			});
		}
	}

	@Action
	async deleteLesson(lessonId: string): Promise<void> {
		this.resetBusinessError();
		try {
			await this.lessonApi.lessonControllerDelete(lessonId);

			await this.fetchContent(this.roomData.roomId);
		} catch (error: any) {
			this.setBusinessError({
				statusCode: error?.response?.status,
				message: error?.response?.statusText,
				...error,
			});
		}
	}

	@Action
	async downloadImsccCourse(): Promise<void> {
		this.resetBusinessError();
		try {
			const response = await CoursesApiFactory(
				undefined,
				"v3",
				$axios
			).courseControllerExportCourse(this.roomData.roomId, {
				responseType: "blob",
			});
			const link = document.createElement("a");
			link.href = URL.createObjectURL(
				new Blob([response.data as unknown as Blob])
			);
			link.download = `${
				this.roomData.title
			}-${new Date().toISOString()}.imscc`;
			link.click();
			URL.revokeObjectURL(link.href);
		} catch (error: any) {
			this.setBusinessError({
				statusCode: error?.response?.status,
				message: error?.response?.statusText,
				...error,
			});
		}
	}

	@Action
	async createCourseShareToken(courseId: string): Promise<void> {
		this.resetBusinessError();
		try {
			const data = (await $axios.get(`/v1/courses-share/${courseId}`)).data;
			if (!data.shareToken) {
				this.setBusinessError({
					statusCode: "400",
					message: "not-generated",
				});
			}
			this.setCourseShareToken(data.shareToken);
		} catch (error: any) {
			this.setBusinessError({
				statusCode: error?.response?.status,
				message: error?.response?.statusText,
				...error,
			});
		}
	}

	@Action
	async finishTask(payload: object | any): Promise<void> {
		this.resetBusinessError();
		const userId = authModule.getUser?.id;
		try {
			const requestUrl = `/v1/homework/${payload.itemId}`;
			const response = await $axios.get(requestUrl);
			const homework = response?.data;
			if (!homework.archived) {
				this.setBusinessError({
					statusCode: "400",
					message: "archived-not-found",
				});
				return;
			}
			let archived = [];
			if (payload.action === "finish") {
				archived = homework?.archived;
				archived.push(userId);
			}
			if (payload.action === "restore") {
				archived = homework?.archived.filter((item: string) => item !== userId);
			}

			const patchedData = (
				await $axios.patch(`/v1/homework/${payload.itemId}`, {
					archived,
				})
			).data;
			if (!patchedData._id) {
				this.setBusinessError({
					statusCode: "400",
					message: "archived-not-patched",
				});
				return;
			}

			await this.fetchContent(this.roomData.roomId);
		} catch (error: any) {
			this.setBusinessError({
				statusCode: error?.response?.status,
				message: error?.response?.statusText,
				...error,
			});
		}
	}

	@Action
	async fetchScopePermission(payload: {
		courseId: string;
		userId: string;
	}): Promise<void> {
		const requestUrl = `/v1/courses/${payload.courseId}/userPermissions?userId=${payload.userId}`;
		const ret_val = (await $axios.get(requestUrl)).data;
		this.setPermissionData(ret_val[payload.userId]);
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
	setError(error: object | null): void {
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

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const errorCode = error.response?.data.code;
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

	get getError(): object | null {
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
}
