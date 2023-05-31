import { Factory } from "fishery";
import { ColumnResponse } from "@/serverApi/v3";
import { timestampsResponseFactory } from "./timestampsResponseFactory";

export const columnResponseFactory = Factory.define<ColumnResponse>(
	({ sequence }) => ({
		id: `column${sequence}`,
		title: `column #${sequence}`,
		cards: [],
		timestamps: timestampsResponseFactory.build(),
	})
);
