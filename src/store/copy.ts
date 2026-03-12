import {
	BoardApiFactory,
	BoardApiInterface,
	CopyApiResponse,
	CopyApiResponseStatus,
	CopyApiResponseType,
	CourseRoomsApiFactory,
	CourseRoomsApiInterface,
	ShareTokenApiFactory,
	ShareTokenApiInterface,
	ShareTokenInfoResponse,
	ShareTokenInfoResponseParentType,
	TaskApiFactory,
	TaskApiInterface,
} from "../serverApi/v3/api";
import { $axios } from "../utils/api";
import { CopyResultItem } from "@/components/copy-result-modal/types/CopyResultItem";
import { AxiosStatic } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

export type CopyParams = {
	id: string;
	type: CopyParamsTypeEnum;
	courseId?: string;
};

export enum CopyParamsTypeEnum {
	Task = "task",
	Lesson = "lesson",
	Course = "course",
	ColumnBoard = "columnBoard",
}

interface CopyByShareTokenPayload {
	type: ShareTokenInfoResponseParentType;
	token: string;
	newName: string;
	destinationId?: string;
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
	private hasDrawingChild = false;

	private get roomsApi(): CourseRoomsApiInterface {
		return CourseRoomsApiFactory(undefined, "/v3", $axios);
	}

	private get taskApi(): TaskApiInterface {
		return TaskApiFactory(undefined, "/v3", $axios);
	}

	private get boardApi(): BoardApiInterface {
		return BoardApiFactory(undefined, "/v3", $axios);
	}

	private get shareApi(): ShareTokenApiInterface {
		const axiosWithoutErrorPage = ($axios as AxiosStatic)?.create();
		return ShareTokenApiFactory(undefined, "/v3", axiosWithoutErrorPage);
	}

	@Action
	async copy({ id, courseId, type }: CopyParams): Promise<CopyApiResponse | undefined> {
		let copyResult: CopyApiResponse | undefined = undefined;

		if (type === CopyParamsTypeEnum.Task) {
			copyResult = await this.taskApi.taskControllerCopyTask(id, { courseId }).then((response) => response.data);
		}

		if (type === CopyParamsTypeEnum.Lesson) {
			copyResult = await this.roomsApi
				.courseRoomsControllerCopyLesson(id, { courseId })
				.then((response) => response.data);
		}

		if (type === CopyParamsTypeEnum.Course) {
			copyResult = await this.roomsApi.courseRoomsControllerCopyCourse(id).then((response) => response.data);

			if (copyResult && copyResult.elements) {
				this.checkDrawingChildren(copyResult.elements);
			}
		}

		if (type === CopyParamsTypeEnum.ColumnBoard) {
			copyResult = await this.boardApi.boardControllerCopyBoard(id).then((response) => response.data);
		}

		if (copyResult === undefined) {
			throw new Error("CopyProcess unknown type: " + type);
		}

		await new Promise((resolve) => setTimeout(resolve, 300));

		this.setCopyResult(copyResult);
		this.setCopyResultFailedItems({ payload: copyResult });
		return copyResult;
	}

	@Action
	checkDrawingChildren(copyResultElementsTypes: CopyApiResponse[]): void {
		for (const element of copyResultElementsTypes) {
			if (element.type === CopyApiResponseType.DRAWING_ELEMENT) {
				this.setHasDrawingChild(true);
				return;
			}
			if (element.elements) {
				this.checkDrawingChildren(element.elements);
			}
		}
	}

	@Action({ rawError: true })
	async validateShareToken(token: string): Promise<ShareTokenInfoResponse> {
		const shareTokenResponse = await this.shareApi.shareTokenControllerLookupShareToken(token);
		return shareTokenResponse.data;
	}

	@Action({ rawError: true })
	async copyByShareToken({ token, type, newName, destinationId }: CopyByShareTokenPayload): Promise<CopyResultItem[]> {
		let copyResult: CopyApiResponse | undefined = undefined;

		if (type === ShareTokenInfoResponseParentType.COURSES || type === ShareTokenInfoResponseParentType.ROOM) {
			copyResult = await this.shareApi
				.shareTokenControllerImportShareToken(token, { newName })
				.then((response) => response.data);
		}
		if (
			type === ShareTokenInfoResponseParentType.COLUMN_BOARD ||
			type === ShareTokenInfoResponseParentType.LESSONS ||
			type === ShareTokenInfoResponseParentType.TASKS ||
			type === ShareTokenInfoResponseParentType.CARD
		) {
			copyResult = await this.shareApi
				.shareTokenControllerImportShareToken(token, {
					newName,
					destinationId,
				})
				.then((response) => response.data);
		}

		if (copyResult && copyResult.elements) {
			this.checkDrawingChildren(copyResult.elements);
		}

		if (copyResult === undefined) {
			throw new Error("CopyProcess unknown type: " + type);
		}

		await new Promise((resolve) => setTimeout(resolve, 300));
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
		if (payload.status === CopyApiResponseStatus.SUCCESS) {
			this.copyResultFailedItems = [];
			return;
		}
		if (payload.elements === undefined) {
			this.copyResultFailedItems = [];
			return;
		}

		const isFeedbackParent: (type: CopyApiResponseType) => boolean = (type) => {
			if (type === CopyApiResponseType.COURSE) return true;
			if (type === CopyApiResponseType.LESSON) return true;
			if (type === CopyApiResponseType.TASK) return true;
			if (type === CopyApiResponseType.LERNSTORE_MATERIAL_GROUP) return true;
			if (type === CopyApiResponseType.COLUMNBOARD) return true;
			return false;
		};

		const isFeedbackChild: (type: CopyApiResponseType) => boolean = (type: CopyApiResponseType) => {
			if (type === CopyApiResponseType.LESSON_CONTENT_ETHERPAD) return true;
			if (type === CopyApiResponseType.LESSON_CONTENT_GEOGEBRA) return true;
			if (type === CopyApiResponseType.LESSON_CONTENT_TASK) return true;
			if (type === CopyApiResponseType.LESSON_CONTENT_TEXT) return true;
			if (type === CopyApiResponseType.LESSON_CONTENT_LERNSTORE) return true;
			if (type === CopyApiResponseType.LERNSTORE_MATERIAL) return true;
			if (type === CopyApiResponseType.FILE) return true;
			if (type === CopyApiResponseType.COURSEGROUP_GROUP) return true;
			if (type === CopyApiResponseType.DRAWING_ELEMENT) return true;
			if (type === CopyApiResponseType.COLLABORATIVE_TEXT_EDITOR_ELEMENT) return true;
			if (type === CopyApiResponseType.EXTERNAL_TOOL_ELEMENT) return true;
			return false;
		};

		const getUrl = (element: CopyApiResponse): string | undefined => {
			switch (element.type) {
				case CopyApiResponseType.TASK:
					return `/homework/${element.id}/edit?returnUrl=rooms/${element.destinationId}`;
				case CopyApiResponseType.LESSON:
					return `/courses/${element.destinationId}/topics/${element.id}/edit?returnUrl=rooms/${element.destinationId}`;
				case CopyApiResponseType.COURSE:
					return `/courses/${element.id}/edit`;
				case CopyApiResponseType.COLUMNBOARD:
					return `/boards/${element.id}`;
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
				parentItem.elements = [...parentItem.elements, { type: element.type, title: element.title || "" }];
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

			element.elements?.forEach((e) => (parents = [...getItemsFromBranch(e, currentParentUrl, parents)]));
			return parents;
		};

		const rootUrl = getUrl(payload);
		if (rootUrl) {
			const result: CopyResultItem[] = getItemsFromBranch(payload, rootUrl).filter((item) => item.elements.length > 0);
			this.copyResultFailedItems = result;
		}
	}

	@Mutation
	setCopyResult(payload: CopyApiResponse): void {
		this.copyResult = payload;
	}

	@Mutation
	setHasDrawingChild(hasDrawingChild: boolean): void {
		this.hasDrawingChild = hasDrawingChild;
	}

	@Mutation
	reset(): void {
		this.copyResultFailedItems = [];
		this.copyResult = undefined;
		this.isResultModalOpen = false;
		this.hasDrawingChild = false;
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
