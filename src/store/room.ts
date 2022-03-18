import {
	Module,
	VuexModule,
	Mutation,
	Action,
	getModule,
} from "vuex-module-decorators";
import { rootStore } from "./index";
import { $axios } from "../utils/api";
import {
	RoomsApiInterface,
	RoomsApiFactory,
	BoardResponse,
	PatchVisibilityParams,
	PatchOrderParams,
} from "../serverApi/v3/api";
import { BusinessError } from "./types/commons";
import { SharedLessonObject } from "./types/room";
import { nanoid } from "nanoid";

@Module({
	name: "room",
	namespaced: true,
	dynamic: true,
	store: rootStore,
	stateFactory: true,
})
export class Room extends VuexModule {
	roomData: BoardResponse = {
		roomId: "",
		title: "",
		displayColor: "",
		elements: [],
	};
	loading: boolean = false;
	error: null | {} = null;
	businessError: BusinessError = {
		statusCode: "",
		message: "",
		error: {},
	};
	sharedLessonData: SharedLessonObject = {
		code: "",
		lessonName: "",
		status: "",
		message: "",
	};

	private _roomsApi?: RoomsApiInterface;
	private get roomsApi(): RoomsApiInterface {
		if (!this._roomsApi) {
			this._roomsApi = RoomsApiFactory(undefined, "/v3", $axios);
		}
		return this._roomsApi;
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
	async fetchSharedLesson(lessonId: string): Promise<void> {
		try {
			const lessonShareResult = await $axios.$get(`/v1/lessons/${lessonId}`);
			if (!lessonShareResult.shareToken) {
				lessonShareResult.shareToken = nanoid(9);
				await $axios.$patch(
					`/v1/lessons/${lessonShareResult._id}`,
					lessonShareResult
				);
			}
			this.setSharedLessonData({
				code: lessonShareResult.shareToken,
				lessonName: lessonShareResult.name,
				status: "",
				message: "",
			});
		} catch (error: any) {
			this.setBusinessError({
				statusCode: error?.response?.status,
				message: error?.response?.statusText,
				...error,
			});
		}
	}

	@Action
	async confirmImportLesson(shareToken: string): Promise<void> {
		try {
			this.resetBusinessError();
			const lesson = await $axios.$get("/v1/lessons", {
				params: { shareToken },
			});

			if (!lesson.data.length) {
				this.setBusinessError({
					statusCode: "400",
					message: "not-found",
				});
				return;
			}

			const copiedLesson = await $axios.$post("/v1/lessons/copy", {
				lessonId: lesson.data[0]._id,
				newCourseId: this.roomData.roomId,
				shareToken,
			});

			if (!copiedLesson.data.length) {
				this.setBusinessError({
					statusCode: "400",
					message: "not-created",
				});
				return;
			}
		} catch (error: any) {
			this.setBusinessError({
				statusCode: error?.response?.status,
				message: error?.response?.statusText,
				...error,
			});
		}
	}

	@Mutation
	setRoomData(payload: BoardResponse): void {
		this.roomData = payload;
	}

	@Mutation
	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	@Mutation
	setError(error: {}): void {
		this.error = error;
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
	setSharedLessonData(payload: SharedLessonObject): void {
		this.sharedLessonData = payload;
	}

	get getLoading(): boolean {
		return this.loading;
	}

	get getError(): {} | null {
		return this.error;
	}

	get getRoomData(): BoardResponse {
		return this.roomData;
	}

	get getBusinessError() {
		return this.businessError;
	}

	get getSharedLessonData(): SharedLessonObject {
		return this.sharedLessonData;
	}
}

export default getModule(Room);
