import { $axios } from "@/utils/api";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	ShareTokenApiFactory,
	ShareTokenApiInterface,
	ShareTokenBodyParams,
	ShareTokenBodyParamsParentTypeEnum,
	ShareTokenResponse,
} from "../serverApi/v3/api";
import { SharePayload } from "./share-course";

@Module({
	name: "share-lesson",
	namespaced: true,
	stateFactory: true,
})
export default class ShareLessonModule extends VuexModule {
	private isShareModalOpen: boolean = false;
	private lessonId: string = "";
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
			parentType: ShareTokenBodyParamsParentTypeEnum.Lessons,
			parentId: this.lessonId,
			expiresInDays: payload.hasExpiryDate ? 21 : null,
			schoolExclusive: payload.isSchoolInternal,
		};
		try {
			const shareTokenResult =
				await this.shareApi.shareTokenControllerCreateShareToken(
					shareTokenPayload
				);
			if (!shareTokenResult) return undefined;
			const shareUrl = `${window.location.origin}/rooms-overview?import=${shareTokenResult.data.token}`;
			this.setShareUrl(shareUrl);
			return shareTokenResult.data;
		} catch {
			return undefined;
		}
	}

	@Action
	startShareFlow(id: string): void {
		this.setLessonId(id);
		this.setShareModalOpen(true);
	}

	@Action
	resetShareFlow(): void {
		this.setLessonId("");
		this.setShareModalOpen(false);
		this.setShareUrl(undefined);
	}

	@Mutation
	setLessonId(id: string): void {
		this.lessonId = id;
	}

	@Mutation
	setShareModalOpen(open: boolean): void {
		this.isShareModalOpen = open;
	}

	@Mutation
	setShareUrl(url: string | undefined): void {
		this.shareUrl = url;
	}

	get getIsShareModalOpen(): boolean {
		return this.isShareModalOpen;
	}

	get getShareUrl(): string | undefined {
		return this.shareUrl;
	}
}
