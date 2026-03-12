import { CardSkeletonResponse } from "@api-server";
import { Factory } from "fishery";

export const cardSkeletonResponseFactory = Factory.define<CardSkeletonResponse>(({ sequence }) => ({
	cardId: `card${sequence}`,
	height: 200,
}));
