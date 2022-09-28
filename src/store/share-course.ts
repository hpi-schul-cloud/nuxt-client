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

	@Action
	createShareToken(payload: SharePayload): void {
		console.log("--- payload", payload);
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
	}

	@Mutation
	setCourseId(id: string | undefined): void {
		this.courseId = id;
	}

	@Mutation
	setShareModalOpen(open: boolean): void {
		this.isShareModalOpen = open;
	}

	get getIsShareModalOpen(): boolean {
		return this.isShareModalOpen;
	}
}
