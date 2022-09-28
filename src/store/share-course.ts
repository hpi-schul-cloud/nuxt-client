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

	@Action
	createShareUrl(payload: SharePayload): void {
		console.log("--- payload", payload);
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

	get getIsShareModalOpen(): boolean {
		return this.isShareModalOpen;
	}

	get getShareUrl(): string | undefined {
		return this.shareUrl;
	}
}
