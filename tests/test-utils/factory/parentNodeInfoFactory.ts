import { ParentNodeInfo, ParentNodeType } from "@/types/board/ContentElement";
import { Factory } from "fishery";

export const parentNodeInfoFactory = Factory.define<ParentNodeInfo>(
	({ sequence }) => ({
		id: `id${sequence}`,
		name: `name ${sequence}`,
		type: ParentNodeType.Board,
	})
);
