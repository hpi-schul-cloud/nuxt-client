import { VideoConferenceElementContent } from "@api-server";
import { Factory } from "fishery";

export const videoConferenceElementContentFactory = Factory.define<VideoConferenceElementContent>(({ sequence }) => ({
	title: `name${sequence}`,
}));
