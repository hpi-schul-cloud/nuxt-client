import { SchoolExternalToolMetadata } from "@/store/external-tool";
import { Factory } from "fishery";

export const schoolExternalToolMetadataFactory: Factory<SchoolExternalToolMetadata> =
	Factory.define<SchoolExternalToolMetadata>(() => ({
		course: 5,
		boardElement: 6,
		mediaBoard: 0,
	}));
