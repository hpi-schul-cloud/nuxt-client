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

@Module({
	name: "shareCourseModule",
	namespaced: true,
	stateFactory: true,
})
export default class ShareCourseModule extends VuexModule {
	private isShareModalOpen: boolean = false;
	private courseId: string = "";
	private shareUrl: string | undefined = undefined;

	private get shareApi(): ShareTokenApiInterface {
		return ShareTokenApiFactory(undefined, "v3", $axios);
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
			const shareUrl = `${window.location.origin}/rooms-overview?import=${shareTokenResult.data.token}`;
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

	@Mutation
	setCourseId(id: string): void {
		this.courseId = id;
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
