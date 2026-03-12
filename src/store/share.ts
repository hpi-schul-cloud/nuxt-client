import {
	BoardExternalReferenceType,
	ShareTokenApiFactory,
	ShareTokenApiInterface,
	ShareTokenBodyParams,
	ShareTokenBodyParamsParentType,
	ShareTokenResponse,
} from "../serverApi/v3";
import { $axios } from "@/utils/api";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

export interface ShareOptions {
	isSchoolInternal: boolean;
	hasExpiryDate: boolean;
}

export interface StartFlow {
	id: string;
	type: ShareTokenBodyParamsParentType;
	destinationType?: BoardExternalReferenceType;
}

const getSharePath = (parentType: ShareTokenBodyParamsParentType, destinationType: BoardExternalReferenceType) => {
	if (
		parentType === ShareTokenBodyParamsParentType.COLUMN_BOARD ||
		parentType === ShareTokenBodyParamsParentType.CARD
	) {
		if (destinationType === BoardExternalReferenceType.ROOM) {
			return "rooms";
		}
		return "rooms/courses-overview";
	}

	if (parentType === ShareTokenBodyParamsParentType.ROOM) {
		return "rooms";
	}

	return "rooms/courses-overview";
};

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
	private destinationType: BoardExternalReferenceType = BoardExternalReferenceType.COURSE;

	private get shareApi(): ShareTokenApiInterface {
		return ShareTokenApiFactory(undefined, "v3", $axios);
	}

	@Action
	async createShareUrl(payload: ShareOptions): Promise<ShareTokenResponse | undefined> {
		const shareTokenPayload: ShareTokenBodyParams = {
			parentType: this.parentType,
			parentId: this.parentId,
			expiresInDays: payload.hasExpiryDate ? 21 : null,
			schoolExclusive: payload.isSchoolInternal,
		};
		try {
			const shareTokenResult = await this.shareApi.shareTokenControllerCreateShareToken(shareTokenPayload);
			if (!shareTokenResult) return undefined;

			const sharePath = getSharePath(this.parentType, this.destinationType);
			const shareUrl = `${window.location.origin}/${sharePath}?import=${shareTokenResult.data.token}&importedType=${this.parentType}`;
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
	setParentType(type: ShareTokenBodyParamsParentType): void {
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
