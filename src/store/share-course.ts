import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

export interface ShareOptions {
	schoolInternally: boolean;
	expiresInSevenDays: boolean;
}

export interface SharePayload extends ShareOptions {
	id: string;
}

@Module({
	name: "share-course",
	namespaced: true,
	stateFactory: true,
})
export default class ShareCourseModule extends VuexModule {
	private isShareModalOpen: boolean = false;
	private courseId: string | undefined = undefined;
	private shareUrl: string | undefined = undefined;
	private hasQrCode: boolean = false;

	@Action
	createShareUrl(payload: SharePayload): void {
		this.setShareUrl("http://example.com");
	}

	@Action
	startShareFlow(id: string): void {
		this.setCourseId(id);
		this.setShareModalOpen(true);
	}

	@Action
	resetShareFlow(): void {
		this.setCourseId(undefined);
		this.setShareModalOpen(false);
		this.setShareUrl(undefined);
		this.setHasQrCode(false);
	}

	@Action
	generateQrCode(): void {
		this.setHasQrCode(true);
	}

	@Action
	clearQrCode(): void {
		this.setHasQrCode(false);
	}

	@Mutation
	setCourseId(id: string | undefined): void {
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

	@Mutation
	setHasQrCode(val: boolean): void {
		this.hasQrCode = val;
	}

	get getIsShareModalOpen(): boolean {
		return this.isShareModalOpen;
	}

	get getShareUrl(): string | undefined {
		return this.shareUrl;
	}
	get getHasQrCode(): boolean {
		return this.hasQrCode;
	}
}
