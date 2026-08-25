import { NewsTargetModel } from "@api-server";
import type { NewsCardItem } from "@feature-news";
import { Factory } from "fishery";

export const newsCardItemFactory = Factory.define<NewsCardItem>(({ sequence }) => ({
	id: `news-${sequence}`,
	title: `News Title #${sequence}`,
	content: `<p>News Content #${sequence}</p>`,
	displayAt: new Date().toISOString(),
	targetModel: NewsTargetModel.SCHOOLS,
	target: { name: `Target #${sequence}` },
}));
