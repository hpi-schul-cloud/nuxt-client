import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import { ShareTokenBodyParamsParentTypeEnum } from "../serverApi/v3/api";

export interface DownloadOptions {
	isV_1_1: boolean;
	isV_1_3: boolean;
}

export interface DownloadPayload extends DownloadOptions {
	id: string;
}

@Module({
	name: "downloadModule",
	namespaced: true,
	stateFactory: true,
})
export default class DownloadModule extends VuexModule {
	private isDownloadModalOpen = false;
	private parentType = ShareTokenBodyParamsParentTypeEnum.Courses;

	@Mutation
	setParentType(type: ShareTokenBodyParamsParentTypeEnum): void {
		this.parentType = type;
	}

	@Mutation
	setDownloadModalOpen(open: boolean): void {
		this.isDownloadModalOpen = open;
	}

	get getParentType(): ShareTokenBodyParamsParentTypeEnum {
		return this.parentType;
	}

	get getIsDownloadModalOpen(): boolean {
		return this.isDownloadModalOpen;
	}
}
