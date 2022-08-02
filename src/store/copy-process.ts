import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	CopyApiResponse,
	CopyApiResponseStatusEnum,
	CopyApiResponseTypeEnum,
	RoomsApiFactory,
	RoomsApiInterface,
	TaskApiFactory,
	TaskApiInterface,
} from "../serverApi/v3/api";
import { $axios } from "../utils/api";
import { BusinessError } from "./types/commons";
import { CopyResultItem } from "@components/copy-result-modal/types/CopyResultItem";

const checkIfEveryElementsAreSuccess = (
	data: CopyApiResponse | any
): boolean => {
	return data.every(({ elements = [], ...rest }) => {
		const item = { ...rest };
		if (item.status !== CopyApiResponseStatusEnum.Success) return false;
		if (elements.length > 0) {
			return (item.elements = checkIfEveryElementsAreSuccess(elements));
		}
		return item.status === CopyApiResponseStatusEnum.Success;
	});
};

const cleanupCopyStatus = (item: any): void | any => {
	if (
		item.status === CopyApiResponseStatusEnum.NotDoing &&
		item.elements === undefined
	) {
		return undefined;
	}

	const result = { ...item };

	if (Array.isArray(result.elements)) {
		result.elements = result.elements
			.map((item: any) => {
				if (item.elements) {
					const isSuccess = item.elements.every(
						(ele: any) => ele.status === "success"
					);
					return {
						...item,
						status: isSuccess ? "success" : item.status,
					};
				}
				return item;
			})
			.map(cleanupCopyStatus)
			.filter((el: any) => el !== undefined);
	}

	if (result.elements) {
		const isParentSuccess = result.elements.every(
			(ele: any) => ele.status === "success"
		);
		return {
			...result,
			status: isParentSuccess ? "success" : result.status,
		};
	}

	return result;
};

export type CopyParams = {
	id: string;
	courseId: string;
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
	private filteredResult: CopyResultItem[] | {} = [];
	private businessError: BusinessError = {
		statusCode: "",
		message: "",
		error: {},
	};
	private loading: boolean = false;
	private error: null | {} = null;
	private isSuccess: boolean = false;

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
	async copyTask(payload: CopyParams): Promise<void> {
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

			this.setCopyResult(copyResult.data);
			this.setFilteredResult(copyResult.data);
			this.setLoading(false);
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
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
			this.setFilteredResult(copyResult.data);
			this.setLoading(false);
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
			this.setBusinessError({
				statusCode: error?.response?.status,
				message: error?.response?.statusText,
				...error,
			});
		}
	}

	@Action
	async copyLesson(payload: CopyParams): Promise<void> {
		this.resetBusinessError();
		this.setLoading(true);
		try {
			const lessonCopyParams =
				payload.courseId && payload.courseId !== ""
					? {
							courseId: payload.courseId,
					  }
					: {};
			const copyResult = await this.roomsApi.roomsControllerCopyLesson(
				payload.id,
				lessonCopyParams
			);

			this.setCopyResult(copyResult.data);
			this.setFilteredResult(copyResult.data);
			this.setLoading(false);
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
			this.setBusinessError({
				statusCode: error?.response?.status,
				message: error?.response?.statusText,
				...error,
			});
		}
	}

	@Mutation
	setFilteredResult(payload: CopyApiResponse): CopyResultItem[] {
		if (payload.status === CopyApiResponseStatusEnum.Success) {
			return [];
		}
		if (payload.elements === undefined) {
			return [];
		}

		/**
		 * Checks if element is relevant for frontend visualization
		 */
		const isHandledStatus: (status: CopyApiResponseStatusEnum) => boolean = (
			status
		) => {
			if (status === CopyApiResponseStatusEnum.Success) return false;
			if (status === CopyApiResponseStatusEnum.NotImplemented) return false;
			if (status === CopyApiResponseStatusEnum.NotDoing) return false;
			return true;
		};
		/**
		 * Finds Elements which represent a Headline in the FeedbackModal Structure
		 */
		const isParentCopyApiResponseType: (
			type: CopyApiResponseTypeEnum
		) => boolean = (status) => {
			if (status === CopyApiResponseTypeEnum.TaskGroup) return true;
			if (status === CopyApiResponseTypeEnum.Lesson) return true;
			return false;
		};
		/**
		 * Finds Elements which represent an element in the FeedbackModal Structure
		 */
		const isLeafCopyApiResponseType: (
			type: CopyApiResponseTypeEnum
		) => boolean = (status: CopyApiResponseTypeEnum) => {
			if (status === CopyApiResponseTypeEnum.Task) return true;
			if (status === CopyApiResponseTypeEnum.LessonContent) return true;
			return false;
		};

		/**
		 * Traverses the Tree and checks for Valid Parents of Leaves
		 *
		 * On Parent:
		 *  * Create a CopyResultItem and check for Leafs lower on the tree
		 *
		 * On Leaf:
		 *  * Append found leaf to the last known Parent
		 */
		const getItemsFromBranch: (
			element: CopyApiResponse,
			item: CopyResultItem[]
		) => CopyResultItem[] = (element, items = []) => {
			if (isParentCopyApiResponseType(element.type)) {
				items.push({
					title: element.title || "",
					elements: [],
					elementId: element.id || "",
				});
				element.elements?.forEach(
					(e) => (items = [...getItemsFromBranch(e, items)])
				);
				return items;
			}

			if (isLeafCopyApiResponseType(element.type)) {
				const parentItem = items[items.length - 1]; // get last inserted parent-node
				parentItem.elements = [
					...parentItem.elements,
					{ type: element.type, title: element.title || "" },
				];
				return items;
			}

			element.elements?.forEach(
				(e) => (items = [...getItemsFromBranch(e, items)])
			);

			return items;
		};

		const result: CopyResultItem[] = payload.elements
			.filter((e) => isHandledStatus(e.status))
			.reduce<CopyResultItem[]>((acc, curr) => {
				acc = [...acc, ...getItemsFromBranch(curr, acc)];
				return acc;
			}, []);
		return result;
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
		// this.filteredResult = emptyData; // WIP fix types to array
	}

	get getCopyResult(): CopyApiResponse {
		return this.copyResult;
	}

	get getIsSuccess(): boolean {
		return this.isSuccess;
	}

	get getFilteredResult(): {} | [] {
		return this.filteredResult;
	}

	get getTitle(): string {
		return this.copyResult.title || "";
	}

	get getId(): string {
		return this.copyResult.id || "";
	}

	get getResponseTypes(): object {
		return CopyApiResponseTypeEnum;
	}

	get getResponseStatus(): object {
		return CopyApiResponseStatusEnum;
	}

	get getLoading(): boolean {
		return this.loading;
	}

	get getError(): object | null {
		return this.error;
	}

	get getBusinessError(): BusinessError {
		return this.businessError;
	}
}
