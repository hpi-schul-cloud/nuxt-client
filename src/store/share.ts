import {
	ShareTokenApiFactory,
	ShareTokenApiInterface,
	ShareTokenBodyParams,
	ShareTokenBodyParamsParentType,
	ShareTokenResponse,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

export interface ShareOptions {
	isSchoolInternal: boolean;
	hasExpiryDate: boolean;
}

export interface SharePayload extends ShareOptions {
	id: string;
}

export interface StartFlow {
	id: string;
	type: ShareTokenBodyParamsParentType;
}

@Module({
	name: "shareModule",
	namespaced: true,
	stateFactory: true,
})
export default class ShareModule extends VuexModule {
	private isShareModalOpen = false;
	private parentId = "";
	private shareUrl: string | undefined = undefined;
	private parentType = ShareTokenBodyParamsParentType.COURSES;

	private get shareApi(): ShareTokenApiInterface {
		return ShareTokenApiFactory(undefined, "v3", $axios);
	}

	@Action
	async createShareUrl(
		payload: SharePayload
	): Promise<ShareTokenResponse | undefined> {
		const shareTokenPayload: ShareTokenBodyParams = {
			parentType: this.parentType,
			parentId: this.parentId,
			expiresInDays: payload.hasExpiryDate ? 21 : null,
			schoolExclusive: payload.isSchoolInternal,
		};
		try {
			const shareTokenResult = await this.shareApi.createShareToken(
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
	startShareFlow({ id, type }: StartFlow): void {
		this.setParentId(id);
		this.setParentType(type);
		this.setShareModalOpen(true);
	}

	@Action
	resetShareFlow(): void {
		this.setParentId("");
		this.setShareModalOpen(false);
		this.setShareUrl(undefined);
	}

	@Mutation
	setParentId(id: string): void {
		this.parentId = id;
	}

	@Mutation
	setParentType(type: ShareTokenBodyParamsParentType): void {
		this.parentType = type;
	}

	@Mutation
	setShareModalOpen(open: boolean): void {
		this.isShareModalOpen = open;
	}

	@Mutation
	setShareUrl(url: string | undefined): void {
		this.shareUrl = url;
	}

	get getParentType(): ShareTokenBodyParamsParentType {
		return this.parentType;
	}

	get getIsShareModalOpen(): boolean {
		return this.isShareModalOpen;
	}

	get getShareUrl(): string | undefined {
		return this.shareUrl;
	}
}
