import { Factory } from "fishery";
import { DeleteElementEventPayload } from "@/components/feature-board/types/ContentElement";

export const deleteElementEventPayloadFactory =
	Factory.define<DeleteElementEventPayload>(({ sequence }) => ({
		elementId: `id ${sequence}`,
		name: `name ${sequence}`,
	}));
