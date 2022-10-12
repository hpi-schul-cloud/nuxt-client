import { roomModule } from "@/store";
import { $axios } from "@/utils/api";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	ShareTokenApiFactory,
	ShareTokenApiInterface,
	ShareTokenBodyParams,
	ShareTokenBodyParamsParentTypeEnum,
	ShareTokenResponse,
} from "../serverApi/v3/api";

export interface ShareOptions {
	schoolInternally: boolean;
	expiresInSevenDays: boolean;
}

export interface SharePayload extends ShareOptions {
	id: string;
}

export interface ImportPayload {
	name: string;
	type: "course";
	token: string;
}

@Module({
	name: "share-course",
	namespaced: true,
	stateFactory: true,
})
export default class ShareCourseModule extends VuexModule {
	private isShareModalOpen: boolean = false;
	private isImportModalOpen: boolean = false;
	private importOptions: ImportPayload = {
		name: "",
		token: "",
		type: "course",
	};
	private courseId: string = "";
	private shareUrl: string | undefined = undefined;
	private _shareApi?: ShareTokenApiInterface;
	private get shareApi(): ShareTokenApiInterface {
		if (!this._shareApi) {
			this._shareApi = ShareTokenApiFactory(undefined, "v3", $axios);
		}
		return this._shareApi;
	}

	@Action
	async createShareUrl(
		payload: SharePayload
	): Promise<ShareTokenResponse | undefined> {
		const shareTokenPayload: ShareTokenBodyParams = {
			parentType: ShareTokenBodyParamsParentTypeEnum.Courses,
			parentId: this.courseId,
			expiresInDays: payload.expiresInSevenDays ? 7 : null,
			schoolExclusive: payload.schoolInternally,
		};
		try {
			const shareTokenResult =
				await this.shareApi.shareTokenControllerCreateShareToken(
					shareTokenPayload
				);
			if (!shareTokenResult) return undefined;
			const courseTitle = roomModule.getRoomData?.title || "";
			const shareUrl = `${window.location.origin}/rooms-overview?import=${shareTokenResult.data.token}&title=${courseTitle}`; // WIP decide which url will be used
			this.setShareUrl(shareUrl);
			return shareTokenResult.data;
		} catch {
			return undefined;
		}
	}

	@Action
	startShareFlow(id: string): void {
		this.setCourseId(id);
		this.setShareModalOpen(true);
	}

	@Action
	resetShareFlow(): void {
		this.setCourseId("");
		this.setShareModalOpen(false);
		this.setShareUrl(undefined);
	}

	@Action
	startImportFlow(options: ImportPayload): void {
		this.setImportOptions(options);
		this.setImportModalOpen(true);
	}

	@Action
	resetImportFlow(options: ImportPayload): void {
		this.setImportOptions({ name: "", type: "course", token: "" });
		this.setImportModalOpen(false);
	}

	@Action
	import(): void {}

	@Mutation
	setCourseId(id: string): void {
		this.courseId = id;
	}

	@Mutation
	setShareModalOpen(open: boolean): void {
		this.isShareModalOpen = open;
	}

	@Mutation
	setImportModalOpen(open: boolean): void {
		this.isImportModalOpen = open;
	}

	@Mutation
	setShareUrl(url: string | undefined): void {
		this.shareUrl = url;
	}

	@Mutation
	setImportOptions(importOptions: ImportPayload): void {
		this.importOptions = importOptions;
	}

	@Mutation
	setName(name: string): void {
		this.importOptions.name = name;
	}

	get getIsShareModalOpen(): boolean {
		return this.isShareModalOpen;
	}

	get getIsImportModalOpen(): boolean {
		return this.isImportModalOpen;
	}

	get getName(): string {
		return this.importOptions.name;
	}

	get getShareUrl(): string | undefined {
		return this.shareUrl;
	}
}
