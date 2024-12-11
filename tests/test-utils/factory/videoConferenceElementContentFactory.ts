import { Factory } from "fishery";
import { VideoConferenceElementContent } from "@/serverApi/v3";

export const videoConferenceElementContentFactory =
	Factory.define<VideoConferenceElementContent>(({ sequence }) => ({
		title: `name${sequence}`,
		url: "https://de.wikipedia.org/wiki/Meeresschildkr%C3%B6ten",
	}));
