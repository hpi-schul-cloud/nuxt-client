import { Factory } from "fishery";
import { BoardResponse } from "@/serverApi/v3";
import { timestampsResponseFactory } from "@@/tests/test-utils/factory";

export const boardResponseFactory = Factory.define<BoardResponse>(
	({ sequence }) => ({
		id: `board${sequence}`,
		title: `board #${sequence}`,
		columns: [],
		timestamps: timestampsResponseFactory.build(),
	})
);
