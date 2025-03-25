import { Factory } from "fishery";
import { BoardResponse, BoardLayout } from "@/serverApi/v3";
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
	})
);
