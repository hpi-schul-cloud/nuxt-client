import { timestampsResponseFactory } from "./timestampsResponseFactory";
import { CardResponse } from "@api-server";
import { Factory } from "fishery";

export const cardResponseFactory = Factory.define<CardResponse>(({ sequence }) => ({
	id: `card${sequence}`,
	title: `card${sequence}.title`,
	height: 120,
	elements: [],
	visibilitySettings: { publishedAt: new Date().toISOString() },
	timestamps: timestampsResponseFactory.build(),
}));
