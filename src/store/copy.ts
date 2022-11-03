import { CopyResultItem } from "@/components/copy-result-modal/types/CopyResultItem";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	CopyApiResponse,
	CopyApiResponseStatusEnum,
	CopyApiResponseTypeEnum,
	RoomsApiFactory,
	RoomsApiInterface,
	ShareTokenApiFactory,
	ShareTokenApiInterface,
	ShareTokenInfoResponse,
	TaskApiFactory,
	TaskApiInterface,
} from "../serverApi/v3/api";
import { $axios } from "../utils/api";

export type CopyParams = {
	id: string;
	type: "task" | "lesson" | "course";
	courseId?: string;
};

interface ShareTokenValidationResult {
	payload: {
		parentType: "course";
		parentName: string;
	};
}

interface CopyByShareTokenPayload {
	type: string;
	token: string;
	newName: string;
}

@Module({
	name: "copyModule",
	namespaced: true,
	stateFactory: true,
})
export default class CopyModule extends VuexModule {
	private copyResult: CopyApiResponse | undefined = undefined;
	private copyResultFailedItems: CopyResultItem[] = [];
	private isResultModalOpen = false;

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

	private _shareApi?: ShareTokenApiInterface;
	private get shareApi(): ShareTokenApiInterface {
		if (!this._shareApi) {
			const axiosWithoutErrorPage = $axios?.create();
			this._shareApi = ShareTokenApiFactory(
				undefined,
				"/v3",
				axiosWithoutErrorPage
			);
		}
		return this._shareApi;
	}

	@Action
	async copy({
		id,
		courseId,
		type,
	}: CopyParams): Promise<CopyApiResponse | undefined> {
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

		this.setCopyResult(copyResult);
		this.setCopyResultFailedItems({ payload: copyResult });
		return copyResult;
	}

	@Action({ rawError: true })
	async validateShareToken(
		token: string
	): Promise<ShareTokenInfoResponse | undefined> {
		const shareTokenResponse =
			await this.shareApi.shareTokenControllerLookupShareToken(token);
		if (!shareTokenResponse) return undefined;
		return shareTokenResponse.data;
	}

	@Action({ rawError: true })
	async copyByShareToken({
		token,
		type,
		newName,
	}: CopyByShareTokenPayload): Promise<CopyResultItem[]> {
		let copyResult: CopyApiResponse | undefined = undefined;

		if (type === "course") {
			copyResult = await this.shareApi
				.shareTokenControllerImportShareToken(token, { newName })
				.then((response) => response.data);
		}

		if (copyResult === undefined) {
			throw new Error("CopyProcess unknown type: " + type);
		}

		await new Promise((resolve) => setTimeout(resolve, 300)); // wip - keep the loading open for at least 300ms
		this.setCopyResult(copyResult);
		this.setCopyResultFailedItems({ payload: copyResult });
		return this.copyResultFailedItems;
	}

	@Mutation
	setResultModalOpen(open: boolean) {
		this.isResultModalOpen = open;
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
	setCopyResult(payload: CopyApiResponse): void {
		this.copyResult = payload;
	}

	@Mutation
	reset(): void {
		this.copyResultFailedItems = [];
		this.copyResult = undefined;
		this.isResultModalOpen = false;
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

	get getIsResultModalOpen(): boolean {
		return this.isResultModalOpen;
	}
}
