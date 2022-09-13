import { CopyResultItem } from "@components/copy-result-modal/types/CopyResultItem";
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

export type CopyParams = {
	id: string;
	type: "task" | "lesson" | "course";
	courseId: string;
};

@Module({
	name: "copy",
	namespaced: true,
	stateFactory: true,
})
export default class CopyModule extends VuexModule {
	private copyResult: CopyApiResponse | undefined = undefined;
	private copyResultFailedItems: CopyResultItem[] = [];
	private businessError: BusinessError | undefined = undefined;
	private isCopying: boolean = false;
	private lastResultTimestamp: number = 0;

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
		try {
			this.setCopying(true);
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

			await new Promise((resolve) => setTimeout(resolve, 300)); // wip - keep the loading open for at least 300ms
			this.setCopying(false);

			this.setCopyResult(copyResult);
			this.setCopyResultFailedItems({ payload: copyResult });
			this.setLastResultTimestamp(Date.now());
		} catch (error: any) {
			this.setBusinessError({
				statusCode: error?.response?.status,
				message: error?.response?.statusText,
				...error,
			});
		}
	}

	@Mutation
	setCopying(on: boolean) {
		this.isCopying = on;
	}

	@Mutation
	setLastResultTimestamp(timestamp: number) {
		this.lastResultTimestamp = timestamp;
	}

	@Mutation
	setCopyResultFailedItems({ payload }: { payload: CopyApiResponse }): void {
		if (payload.status === CopyApiResponseStatusEnum.Success) {
			this.copyResultFailedItems = [];
			return;
		}
		if (payload.elements === undefined) {
			this.copyResultFailedItems = [];
			return;
		}

		const isFeedbackParent: (type: CopyApiResponseTypeEnum) => boolean = (
			type
		) => {
			if (type === CopyApiResponseTypeEnum.Course) return true;
			if (type === CopyApiResponseTypeEnum.Lesson) return true;
			if (type === CopyApiResponseTypeEnum.Task) return true;
			if (type === CopyApiResponseTypeEnum.LernstoreMaterialGroup) return true;
			return false;
		};

		const isFeedbackChild: (type: CopyApiResponseTypeEnum) => boolean = (
			type: CopyApiResponseTypeEnum
		) => {
			if (type === CopyApiResponseTypeEnum.LessonContentEtherpad) return true;
			if (type === CopyApiResponseTypeEnum.LessonContentGeogebra) return true;
			if (type === CopyApiResponseTypeEnum.LessonContentNexboard) return true;
			if (type === CopyApiResponseTypeEnum.LessonContentTask) return true;
			if (type === CopyApiResponseTypeEnum.LessonContentText) return true;
			if (type === CopyApiResponseTypeEnum.LessonContentLernstore) return true;
			if (type === CopyApiResponseTypeEnum.LernstoreMaterial) return true;
			if (type === CopyApiResponseTypeEnum.File) return true;
			if (type === CopyApiResponseTypeEnum.CoursegroupGroup) return true;
			return false;
		};

		const getUrl = (element: CopyApiResponse): string | undefined => {
			switch (element.type) {
				case CopyApiResponseTypeEnum.Task:
					return `/homework/${element.id}/edit?returnUrl=rooms/${element.destinationCourseId}`;
				case CopyApiResponseTypeEnum.Lesson:
					return `/courses/${element.destinationCourseId}/topics/${element.id}/edit?returnUrl=rooms/${element.destinationCourseId}`;
				case CopyApiResponseTypeEnum.Course:
					return `/courses/${element.id}/edit`;
			}
			return undefined;
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
			parentUrl: string,
			parents?: CopyResultItem[]
		) => CopyResultItem[] = (element, parentUrl, parents = []) => {
			const currentParentUrl = getUrl(element) ?? parentUrl;
			if (isFeedbackChild(element.type)) {
				const parentItem = parents[parents.length - 1]; // get last inserted parent-node
				parentItem.elements = [
					...parentItem.elements,
					{ type: element.type, title: element.title || "" },
				];
				return parents;
			}

			if (isFeedbackParent(element.type)) {
				parents.push({
					title: element.title || "",
					elements: [],
					elementId: element.id || "",
					type: element.type,
					url: currentParentUrl,
				});
			}

			element.elements?.forEach(
				(e) => (parents = [...getItemsFromBranch(e, currentParentUrl, parents)])
			);
			return parents;
		};

		const rootUrl = getUrl(payload);
		const result: CopyResultItem[] = getItemsFromBranch(
			payload,
			rootUrl!
		).filter((item) => item.elements.length > 0);
		this.copyResultFailedItems = result;
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
		this.copyResultFailedItems = [];
		this.copyResult = undefined;
		this.businessError = undefined;
	}

	get getCopyResult(): CopyApiResponse | undefined {
		return this.copyResult;
	}

	get getCopyResultFailedItems(): CopyResultItem[] {
		return this.copyResultFailedItems;
	}

	get getTitle(): string {
		return this.copyResult?.title ?? "";
	}

	get getId(): string {
		return this.copyResult?.id ?? "";
	}

	get getBusinessError(): BusinessError | undefined {
		return this.businessError;
	}

	get getCopying(): boolean {
		return this.isCopying;
	}

	get getLastResultTimestamp(): number {
		return this.lastResultTimestamp;
	}
}
