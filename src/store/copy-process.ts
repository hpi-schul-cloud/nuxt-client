import { roomModule } from "@/store";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	RoomsApiFactory,
	RoomsApiInterface,
	TaskApiInterface,
	TaskApiFactory,
	CopyApiResponse,
	CopyApiResponseStatusEnum,
	CopyApiResponseTypeEnum,
} from "../serverApi/v3/api";
import { $axios } from "../utils/api";
import { BusinessError } from "./types/commons";

const checkIfEveryElementsAreSuccess = (
	data: CopyApiResponse | any
): boolean => {
	if (data.status !== "success") return false;
	return data.elements.every(({ elements = [], ...rest }) => {
		const item = { ...rest };
		if (item.status !== "success") return false;
		if (elements.length > 0) {
			return (item.elements = checkIfEveryElementsAreSuccess(elements));
		}
		return item.status === "success";
	});
};

const cleanupCopyStatus = (element: any): any => {
	if (element.status === "not-doing" && element.elements === undefined) {
		return undefined;
	}

	const result = {
		...element,
	};

	if (Array.isArray(result.elements)) {
		result.elements = result.elements
			.map(cleanupCopyStatus)
			.filter((el: any) => el !== undefined);
	}

	return result;
};

@Module({
	name: "copy-process",
	namespaced: true,
	stateFactory: true,
})
export default class CopyModule extends VuexModule {
	// private roomId: string = roomModule.getRoomId || "asda";
	private copyResult: CopyApiResponse = {
		id: "",
		title: "",
		type: CopyApiResponseTypeEnum.Task,
		status: CopyApiResponseStatusEnum.Success,
	};
	loading: boolean = false;
	error: null | {} = null;
	businessError: BusinessError = {
		statusCode: "",
		message: "",
		error: {},
	};

	private _roomsApi?: RoomsApiInterface;
	private get roomsApi(): RoomsApiInterface {
		if (!this._roomsApi) {
			this._roomsApi = RoomsApiFactory(undefined, "/v3", $axios);
		}
		return this._roomsApi;
	}

	private _taskApi?: TaskApiInterface;
	private get taskApi(): TaskApiInterface {
		if (!this._taskApi) {
			this._taskApi = TaskApiFactory(undefined, "/v3", $axios);
		}
		return this._taskApi;
	}

	@Action
	async copyTask(id: string): Promise<void> {
		this.resetBusinessError();
		this.setLoading(true);
		try {
			const copyResult = await this.taskApi.taskControllerCopyTask(id, {
				courseId: roomModule.getRoomId,
			});

			this.setCopyResult(copyResult.data || {});
			this.setLoading(false);
		} catch (error: any) {
			this.setError(error);
			this.setBusinessError({
				statusCode: error?.response?.status,
				message: error?.response?.statusText,
				...error,
			});
		}
	}

	@Action
	async copyRoom(courseId: string): Promise<void> {
		this.resetBusinessError();
		this.setLoading(true);
		try {
			const copyResult = await this.roomsApi.roomsControllerCopyCourse(
				courseId
			);

			this.setCopyResult(copyResult.data);
			this.setIsSuccess(copyResult.data);
			this.setLoading(false);
		} catch (error: any) {
			this.setError(error);
			this.setBusinessError({
				statusCode: error?.response?.status,
				message: error?.response?.statusText,
				...error,
			});
		}
	}

	isSuccess: boolean = false;
	result: any = {};

	@Mutation
	setIsSuccess(payload: CopyApiResponse | any) {
		this.result = cleanupCopyStatus(JSON.parse(JSON.stringify(payload)));
		this.isSuccess = checkIfEveryElementsAreSuccess(payload);
	}

	get getIsSuccess(): boolean {
		return this.loading;
	}

	////----------------------------------------------------------------

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
	setCopyResult(payload: CopyApiResponse | any): void {
		this.copyResult = payload;
	}

	get getLoading(): boolean {
		return this.loading;
	}

	get getError(): {} | null {
		return this.error;
	}

	get getBusinessError() {
		return this.businessError;
	}

	get getCopyResult(): CopyApiResponse {
		return this.copyResult;
	}
}
