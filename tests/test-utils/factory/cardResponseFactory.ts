import { Factory } from "fishery";
import { CardResponse } from "@api-server";
import { timestampsResponseFactory } from "./timestampsResponseFactory";

export const cardResponseFactory = Factory.define<CardResponse>(
	({ sequence }) => ({
		id: `card${sequence}`,
		title: `card${sequence}.title`,
		height: 120,
		elements: [],
		visibilitySettings: { publishedAt: new Date().toISOString() },
		timestamps: timestampsResponseFactory.build(),
	})
);
