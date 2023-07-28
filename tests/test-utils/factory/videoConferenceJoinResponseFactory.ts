import { VideoConferenceJoinResponse } from "@/serverApi/v3";
import { Factory } from "fishery";

export const videoConferenceJoinResponseFactory =
	Factory.define<VideoConferenceJoinResponse>(() => ({
		url: "VideoConferenceUrl",
	}));
