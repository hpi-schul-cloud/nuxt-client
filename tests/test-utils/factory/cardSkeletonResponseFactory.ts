import { Factory } from "fishery";
import { CardSkeletonResponse } from "@/serverApi/v3";

export const cardSkeletonResponseFactory = Factory.define<CardSkeletonResponse>(
	({ sequence }) => ({
		cardId: `card${sequence}`,
		height: 200,
	})
);
