import { VideoConferenceInfoResponse, VideoConferenceStateResponse } from "@api-server";
import { Factory } from "fishery";

export const videoConferenceInfoResponseFactory = Factory.define<VideoConferenceInfoResponse>(() => ({
	state: VideoConferenceStateResponse.NOT_STARTED,
	options: {
		everyAttendeeJoinsMuted: false,
		moderatorMustApproveJoinRequests: false,
		everybodyJoinsAsModerator: false,
	},
}));
