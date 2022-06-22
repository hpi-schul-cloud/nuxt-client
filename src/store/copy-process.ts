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

const cleanupCopyStatus = (item: any): any => {
	if (item.status === "not-doing" && item.elements === undefined) {
		return undefined;
	}

	const result = { ...item };

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
	private copyResult: CopyApiResponse = {
		id: "",
		title: "",
		type: CopyApiResponseTypeEnum.Board,
		status: CopyApiResponseStatusEnum.Success,
	};
	private filteredResult: CopyApiResponse = {
		id: "",
		title: "",
		type: CopyApiResponseTypeEnum.Board,
		status: CopyApiResponseStatusEnum.Success,
	};
	private businessError: BusinessError = {
		statusCode: "",
		message: "",
		error: {},
	};
	private loading: boolean = false;
	private error: null | {} = null;
	isSuccess: boolean = false;

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
	async copyTask(payload: object | any): Promise<void> {
		this.resetBusinessError();
		this.setLoading(true);
		try {
			const taskCopyParams =
				payload.courseId && payload.courseId !== ""
					? {
							courseId: payload.courseId,
					  }
					: {};

			const copyResult = await this.taskApi.taskControllerCopyTask(
				payload.id,
				taskCopyParams
			);

			this.setCopyResult(copyResult.data || {});
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

	@Mutation
	setIsSuccess(payload: CopyApiResponse | any) {
		this.filteredResult = cleanupCopyStatus(
			JSON.parse(JSON.stringify(payload))
		);
		this.isSuccess = checkIfEveryElementsAreSuccess(this.filteredResult);
	}

	get getIsSuccess(): boolean {
		return this.loading;
	}
	get getFilteredResult(): CopyApiResponse {
		return this.filteredResult;
	}

	get getIdAndTitle(): string | any {
		return {
			id: this.copyResult.id,
			title: this.copyResult.title,
		};
	}

	get getResponseTypes(): object {
		return CopyApiResponseTypeEnum;
	}

	get getResponseStatus(): object {
		return CopyApiResponseStatusEnum;
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

	@Mutation
	resetCopyResult(): void {
		const emptyData = {
			id: "",
			title: "",
			type: CopyApiResponseTypeEnum.Board,
			status: CopyApiResponseStatusEnum.Success,
		};
		this.copyResult = emptyData;
		this.filteredResult = emptyData;
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
