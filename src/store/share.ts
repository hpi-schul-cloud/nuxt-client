import { $axios } from "@/utils/api";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	BoardExternalReferenceType,
	ShareTokenApiFactory,
	ShareTokenApiInterface,
	ShareTokenBodyParams,
	ShareTokenBodyParamsParentTypeEnum,
	ShareTokenResponse,
} from "../serverApi/v3/api";

export interface ShareOptions {
	isSchoolInternal: boolean;
	hasExpiryDate: boolean;
}

export interface StartFlow {
	id: string;
	type: ShareTokenBodyParamsParentTypeEnum;
	destinationType?: BoardExternalReferenceType;
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
	private parentType = ShareTokenBodyParamsParentTypeEnum.Courses;
	private destinationType: BoardExternalReferenceType =
		BoardExternalReferenceType.Course;

	private get shareApi(): ShareTokenApiInterface {
		return ShareTokenApiFactory(undefined, "v3", $axios);
	}

	@Action
	async createShareUrl(
		payload: ShareOptions
	): Promise<ShareTokenResponse | undefined> {
		const shareTokenPayload: ShareTokenBodyParams = {
			parentType: this.parentType,
			parentId: this.parentId,
			expiresInDays: payload.hasExpiryDate ? 21 : null,
			schoolExclusive: payload.isSchoolInternal,
		};
		try {
			const shareTokenResult =
				await this.shareApi.shareTokenControllerCreateShareToken(
					shareTokenPayload
				);
			if (!shareTokenResult) return undefined;
			const sharePath =
				this.destinationType === BoardExternalReferenceType.Course
					? "rooms/courses-overview"
					: "rooms";
			const shareUrl = `${window.location.origin}/${sharePath}?import=${shareTokenResult.data.token}`;
			this.setShareUrl(shareUrl);
			return shareTokenResult.data;
		} catch {
			return undefined;
		}
	}

	@Action
	startShareFlow({ id, type, destinationType }: StartFlow): void {
		this.setParentId(id);
		this.setParentType(type);
		if (destinationType) {
			this.setDestinationType(destinationType);
		}
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
	setParentType(type: ShareTokenBodyParamsParentTypeEnum): void {
		this.parentType = type;
	}

	@Mutation
	setDestinationType(destinationType: BoardExternalReferenceType): void {
		this.destinationType = destinationType;
	}

	@Mutation
	setShareModalOpen(open: boolean): void {
		this.isShareModalOpen = open;
	}

	@Mutation
	setShareUrl(url: string | undefined): void {
		this.shareUrl = url;
	}

	get getParentType(): ShareTokenBodyParamsParentTypeEnum {
		return this.parentType;
	}

	get getIsShareModalOpen(): boolean {
		return this.isShareModalOpen;
	}

	get getShareUrl(): string | undefined {
		return this.shareUrl;
	}
}
