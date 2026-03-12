import { Factory } from "fishery";
import { VideoConferenceElementContent } from "@api-server";

export const videoConferenceElementContentFactory =
	Factory.define<VideoConferenceElementContent>(({ sequence }) => ({
		title: `name${sequence}`,
	}));
