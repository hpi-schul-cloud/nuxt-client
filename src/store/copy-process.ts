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
	type: "task" | "lesson" | "course";
	courseId: string;
};

@Module({
	name: "copy-process",
	namespaced: true,
	stateFactory: true,
})
export default class CopyModule extends VuexModule {
	private copyResult: CopyApiResponse | undefined = undefined;
	private filteredResult: CopyResultItem[] = [];
	private businessError: BusinessError | undefined = undefined;
	private loading: boolean = false;
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
	async copy({ id, courseId, type }: CopyParams): Promise<void> {
		this.resetBusinessError();
		this.setLoading(true);
		try {
			let copyResult: CopyApiResponse | undefined = undefined;

			if (type === "task") {
				copyResult = await this.taskApi
					.taskControllerCopyTask(id, { courseId })
					.then((response) => response.data);
			}

			if (type === "lesson") {
				copyResult = await this.roomsApi
					.roomsControllerCopyLesson(id, { courseId })
					.then((response) => response.data);
			}

			if (type === "course") {
				copyResult = await this.roomsApi
					.roomsControllerCopyCourse(id)
					.then((response) => response.data);
			}

			if (copyResult === undefined) {
				throw new Error("CopyProcess unknown type: " + type);
			}

			this.setCopyResult(copyResult);
			this.setFilteredResult(copyResult);
			this.setLoading(false);
		} catch (error: any) {
			this.setLoading(false);
			this.setBusinessError({
				statusCode: error?.response?.status,
				message: error?.response?.statusText,
				...error,
			});
		}
	}

	@Mutation
	setFilteredResult(payload: CopyApiResponse): void {
		console.log(
			"before transformation",
			payload.status,
			JSON.stringify(payload.elements)
		);
		if (payload.status === CopyApiResponseStatusEnum.Success) {
			this.filteredResult = [];
			return;
		}
		if (payload.elements === undefined) {
			this.filteredResult = [];
			return;
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
		const isDesiredParent: (type: CopyApiResponseTypeEnum) => boolean = (
			status
		) => {
			// if (status === CopyApiResponseTypeEnum.TaskGroup) return true;
			// if (status === CopyApiResponseTypeEnum.FileGroup) return true;
			if (status === CopyApiResponseTypeEnum.Lesson) return true;
			// if (status === CopyApiResponseTypeEnum.LessonContentGroup) return true;
			if (status === CopyApiResponseTypeEnum.LernstoreMaterialGroup)
				return true;
			return false;
		};
		/**
		 * Finds Elements which represent an element in the FeedbackModal Structure
		 */
		const isDesiredLeaf: (type: CopyApiResponseTypeEnum) => boolean = (
			status: CopyApiResponseTypeEnum
		) => {
			if (status === CopyApiResponseTypeEnum.Task) return true;
			if (status === CopyApiResponseTypeEnum.LessonContentEtherpad) return true;
			if (status === CopyApiResponseTypeEnum.LessonContentGeogebra) return true;
			if (status === CopyApiResponseTypeEnum.LessonContentNexboard) return true;
			if (status === CopyApiResponseTypeEnum.LessonContentTask) return true;
			if (status === CopyApiResponseTypeEnum.LessonContentText) return true;
			if (status === CopyApiResponseTypeEnum.LessonContentLernstore)
				return true;
			if (status === CopyApiResponseTypeEnum.LernstoreMaterial) return true;
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
			if (isDesiredParent(element.type)) {
				items.push({
					title: element.title || "",
					elements: [],
					elementId: element.id || "",
					type: element.type,
				});
				element.elements?.forEach(
					(e) => (items = [...getItemsFromBranch(e, items)])
				);
				return items;
			}

			if (isDesiredLeaf(element.type)) {
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

		const result: CopyResultItem[] = [payload]
			.filter((e) => isHandledStatus(e.status))
			.reduce<CopyResultItem[]>((acc, curr) => {
				acc = [...acc, ...getItemsFromBranch(curr, acc)];
				return acc;
			}, []);
		console.log("Mapped items", result);
		this.filteredResult = result;
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
		this.businessError = undefined;
	}

	@Mutation
	setCopyResult(payload: CopyApiResponse): void {
		this.copyResult = payload;
	}

	@Mutation
	reset(): void {
		console.log("vuetify modal emitted dialog-closed");
		this.filteredResult = [];
		this.copyResult = undefined;
		this.businessError = undefined;
	}

	get getCopyResult(): CopyApiResponse | undefined {
		return this.copyResult;
	}

	get getIsSuccess(): boolean {
		return this.isSuccess;
	}

	get getFilteredResult(): CopyResultItem[] {
		return this.filteredResult;
	}

	get getTitle(): string {
		return this.copyResult?.title ?? "";
	}

	get getId(): string {
		return this.copyResult?.id ?? "";
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

	get getBusinessError(): BusinessError | undefined {
		return this.businessError;
	}
}
