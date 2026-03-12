import { Factory } from "fishery";
import { CardSkeletonResponse } from "@api-server";

export const cardSkeletonResponseFactory = Factory.define<CardSkeletonResponse>(
	({ sequence }) => ({
		cardId: `card${sequence}`,
		height: 200,
	})
);
