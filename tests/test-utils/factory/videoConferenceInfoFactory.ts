import { VideoConferenceInfoResponse, VideoConferenceStateResponse } from "@api-server";
import { Factory } from "fishery";

export const videoConferenceInfoFactory = Factory.define<VideoConferenceInfoResponse>(() => ({
	state: VideoConferenceStateResponse.NOT_STARTED,
	options: {
		everyAttendeeJoinsMuted: false,
		moderatorMustApproveJoinRequests: false,
		everybodyJoinsAsModerator: false,
	},
}));
