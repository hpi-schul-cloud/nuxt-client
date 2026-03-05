import { schoolResponseFactory } from "./schoolResponseFactory";
import { NewsResponse, NewsTargetModel } from "@/serverApi/v3";
import { Factory } from "fishery";

export const newsResponseFactory = Factory.define<NewsResponse>(({ sequence }) => ({
	id: `news #${sequence}`,
	title: `News Title #${sequence}`,
	content: `News Content #${sequence}`,
	displayAt: new Date().toISOString(),
	targetId: `targetId #${sequence}`,
	targetModel: NewsTargetModel.Schools,
	target: { id: `targetId #${sequence}`, name: `targetName #${sequence}` },
	school: schoolResponseFactory.build(),
	creator: { id: `creatorId #${sequence}` },
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
	permissions: [],
}));
