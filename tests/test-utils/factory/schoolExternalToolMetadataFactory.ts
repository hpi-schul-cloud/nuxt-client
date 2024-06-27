import { Factory } from "fishery";
import { SchoolExternalToolMetadata } from "@/store/external-tool";

export const schoolExternalToolMetadataFactory: Factory<SchoolExternalToolMetadata> =
	Factory.define<SchoolExternalToolMetadata>(() => ({
		course: 5,
		boardElement: 6,
		mediaBoard: 0,
	}));
