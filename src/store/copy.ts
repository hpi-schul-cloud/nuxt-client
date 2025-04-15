import { CopyResultItem } from "@/components/copy-result-modal/types/CopyResultItem";
import { AxiosStatic } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	BoardApiFactory,
	BoardApiInterface,
	CopyApiResponse,
	CopyApiResponseStatusEnum,
	CopyApiResponseTypeEnum,
	CourseRoomsApiFactory,
	CourseRoomsApiInterface,
	RoomApiFactory,
	RoomApiInterface,
	ShareTokenApiFactory,
	ShareTokenApiInterface,
	ShareTokenInfoResponse,
	ShareTokenInfoResponseParentTypeEnum,
	TaskApiFactory,
	TaskApiInterface,
} from "../serverApi/v3/api";
import { $axios } from "../utils/api";

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
	Room = "room",
}

interface CopyByShareTokenPayload {
	type: ShareTokenInfoResponseParentTypeEnum;
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

	private get roomApi(): RoomApiInterface {
		return RoomApiFactory(undefined, "/v3", $axios);
	}

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
	async copy({
		id,
		courseId,
		type,
	}: CopyParams): Promise<CopyApiResponse | undefined> {
		let copyResult: CopyApiResponse | undefined = undefined;

		if (type === CopyParamsTypeEnum.Task) {
			copyResult = await this.taskApi
				.taskControllerCopyTask(id, { courseId })
				.then((response) => response.data);
		}

		if (type === CopyParamsTypeEnum.Lesson) {
			copyResult = await this.roomsApi
				.courseRoomsControllerCopyLesson(id, { courseId })
				.then((response) => response.data);
		}

		if (type === CopyParamsTypeEnum.Course) {
			copyResult = await this.roomsApi
				.courseRoomsControllerCopyCourse(id)
				.then((response) => response.data);

			if (copyResult && copyResult.elements) {
				this.checkDrawingChildren(copyResult.elements);
			}
		}

		if (type === CopyParamsTypeEnum.ColumnBoard) {
			copyResult = await this.boardApi
				.boardControllerCopyBoard(id)
				.then((response) => response.data);
		}

		// if (type === CopyParamsTypeEnum.Room) {
		// 	copyResult = await this.roomApi
		// 		.roomControllerCopyRoom(id)
		// 		.then((response) => response.data);
		// }

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
			if (element.type === CopyApiResponseTypeEnum.DrawingElement) {
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
		const shareTokenResponse =
			await this.shareApi.shareTokenControllerLookupShareToken(token);
		return shareTokenResponse.data;
	}

	@Action({ rawError: true })
	async copyByShareToken({
		token,
		type,
		newName,
		destinationId,
	}: CopyByShareTokenPayload): Promise<CopyResultItem[]> {
		let copyResult: CopyApiResponse | undefined = undefined;

		if (type === ShareTokenInfoResponseParentTypeEnum.Courses) {
			copyResult = await this.shareApi
				.shareTokenControllerImportShareToken(token, { newName })
				.then((response) => response.data);
		}
		if (
			type === ShareTokenInfoResponseParentTypeEnum.ColumnBoard ||
			type === ShareTokenInfoResponseParentTypeEnum.Lessons ||
			type === ShareTokenInfoResponseParentTypeEnum.Tasks
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
			if (type === CopyApiResponseTypeEnum.Columnboard) return true;
			return false;
		};

		const isFeedbackChild: (type: CopyApiResponseTypeEnum) => boolean = (
			type: CopyApiResponseTypeEnum
		) => {
			if (type === CopyApiResponseTypeEnum.LessonContentEtherpad) return true;
			if (type === CopyApiResponseTypeEnum.LessonContentGeogebra) return true;
			if (type === CopyApiResponseTypeEnum.LessonContentTask) return true;
			if (type === CopyApiResponseTypeEnum.LessonContentText) return true;
			if (type === CopyApiResponseTypeEnum.LessonContentLernstore) return true;
			if (type === CopyApiResponseTypeEnum.LernstoreMaterial) return true;
			if (type === CopyApiResponseTypeEnum.File) return true;
			if (type === CopyApiResponseTypeEnum.CoursegroupGroup) return true;
			if (type === CopyApiResponseTypeEnum.DrawingElement) return true;
			if (type === CopyApiResponseTypeEnum.CollaborativeTextEditorElement)
				return true;
			if (type === CopyApiResponseTypeEnum.ExternalToolElement) return true;
			return false;
		};

		const getUrl = (element: CopyApiResponse): string | undefined => {
			switch (element.type) {
				case CopyApiResponseTypeEnum.Task:
					return `/homework/${element.id}/edit?returnUrl=rooms/${element.destinationId}`;
				case CopyApiResponseTypeEnum.Lesson:
					return `/courses/${element.destinationId}/topics/${element.id}/edit?returnUrl=rooms/${element.destinationId}`;
				case CopyApiResponseTypeEnum.Course:
					return `/courses/${element.id}/edit`;
				case CopyApiResponseTypeEnum.Columnboard:
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
		if (rootUrl) {
			const result: CopyResultItem[] = getItemsFromBranch(
				payload,
				rootUrl
			).filter((item) => item.elements.length > 0);
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
