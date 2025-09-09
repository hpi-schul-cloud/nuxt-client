import { BoardLayout, BoardResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { timestampsResponseFactory } from "./timestampsResponseFactory";

export const boardResponseFactory = Factory.define<BoardResponse>(
	({ sequence }) => ({
		id: `board${sequence}`,
		title: `board #${sequence}`,
		columns: [],
		timestamps: timestampsResponseFactory.build(),
		isVisible: false,
		layout: BoardLayout.Columns,
		features: [],
		permissions: [],
		readersCanEdit: false,
	})
);
