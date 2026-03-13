import { timestampsResponseFactory } from "./timestampsResponseFactory";
import { ColumnResponse } from "@api-server";
import { Factory } from "fishery";

export const columnResponseFactory = Factory.define<ColumnResponse>(({ sequence }) => ({
	id: `column${sequence}`,
	title: `column #${sequence}`,
	cards: [],
	timestamps: timestampsResponseFactory.build(),
}));
