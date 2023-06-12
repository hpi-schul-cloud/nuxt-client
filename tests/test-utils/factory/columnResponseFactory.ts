import { Factory } from "fishery";
import { ColumnResponse } from "@/serverApi/v3";
import { timestampsResponseFactory } from "@@/tests/test-utils/factory";

export const columnResponseFactory = Factory.define<ColumnResponse>(
	({ sequence }) => ({
		id: `column${sequence}`,
		title: `column #${sequence}`,
		cards: [],
		timestamps: timestampsResponseFactory.build(),
	})
);
