import { VideoConferenceJoinResponse } from "@api-server";
import { Factory } from "fishery";

export const videoConferenceJoinResponseFactory = Factory.define<VideoConferenceJoinResponse>(() => ({
	url: "VideoConferenceUrl",
}));
